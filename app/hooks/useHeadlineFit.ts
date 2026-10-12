import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const BASE = 100;

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type HeadlineFit = {
  /** Attach to the flex row that owns the headline font-size. */
  rowRef: React.RefObject<HTMLDivElement | null>;
  /** Attach to the shrink-to-content span holding "F" + "ROM". */
  line1Ref: React.RefObject<HTMLSpanElement | null>;
  /** Attach to the shrink-to-content span holding "INSIGHT". */
  line2Ref: React.RefObject<HTMLSpanElement | null>;
  /** Root font size (px) for the row; every part is sized in em from it. */
  size: number;
  /** True when the headline is laid out as two centered lines. */
  twoLine: boolean;
};

/**
 * Fits the composite "FROM INSIGHT" headline to `ratio` of the viewport width.
 *
 * Rather than predicting glyph metrics with canvas measureText — which silently
 * measures a fallback face until the webfont lands, and ignores CSS
 * letter-spacing and margins — this measures the laid-out DOM. Every part is
 * sized in em from the row's font-size, so width scales linearly with it and a
 * single corrective pass lands exactly on target.
 *
 * Above `breakpoint` the parts sit on one line; below it the headline wraps to
 * two centered lines and is fitted against the wider line, so the type stays
 * large instead of shrinking to fit one cramped line.
 */
export function useHeadlineFit(
  romScale: number,
  ratio: number,
  breakpoint: number,
  gapEm: number
): HeadlineFit {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const [size, setSize] = useState(BASE);
  const [twoLine, setTwoLine] = useState(false);

  const measure = useCallback(() => {
    const row = rowRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!row || !line1 || !line2) return;

    const current = parseFloat(getComputedStyle(row).fontSize);
    if (!current) return;

    const w1 = line1.getBoundingClientRect().width;
    const w2 = line2.getBoundingClientRect().width;
    if (!w1 || !w2) return;

    const wrap = window.innerWidth < breakpoint;
    // The gap is set in the small type's own em, so it scales with the row.
    const natural = wrap ? Math.max(w1, w2) : w1 + gapEm * romScale * current + w2;
    const next = current * ((window.innerWidth * ratio) / natural);

    setTwoLine(wrap);
    // Width is linear in font-size, so one pass is exact; the guard just stops
    // sub-pixel feedback between render and measure.
    setSize((prev) => (Math.abs(next - prev) > 0.5 ? next : prev));
  }, [romScale, ratio, breakpoint, gapEm]);

  useIsomorphicLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);

    // The first pass can read fallback-font widths, and document.fonts.ready
    // is not a reliable signal that DM Sans has swapped in. Watching the two
    // lines instead re-fits on any real width change — font swap, late layout
    // or viewport change. Each pass is linear and the 0.5px guard in measure()
    // stops it, so this settles rather than oscillating.
    const observer = new ResizeObserver(measure);
    if (line1Ref.current) observer.observe(line1Ref.current);
    if (line2Ref.current) observer.observe(line2Ref.current);

    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [measure]);

  return { rowRef, line1Ref, line2Ref, size, twoLine };
}
