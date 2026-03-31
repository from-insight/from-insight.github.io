import { useEffect, useState } from "react";

/**
 * Pretext-style canvas measureText hook.
 *
 * Uses an offscreen canvas's measureText API to compute the exact font-size
 * (integer px) that makes `text` fill `targetRatio` of the viewport width,
 * without touching the DOM or causing reflows.
 *
 * Technique mirrors chenglou/pretext: decouple measurement from rendering.
 * - prepare() phase: canvas measureText (done once per resize)
 * - layout() phase: pure arithmetic on cached measurements (instant)
 */
export function useViewportText(
  text: string,
  fontFamily: string = "Syne",
  fontWeight: string = "900",
  targetRatio: number = 0.9
): number {
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function calculate() {
      if (!ctx) return;
      const targetWidth = window.innerWidth * targetRatio;

      // Binary search for the largest fontSize whose measured width <= targetWidth
      let lo = 8;
      let hi = 1200;

      while (lo < hi - 1) {
        const mid = Math.floor((lo + hi) / 2);
        ctx.font = `${fontWeight} ${mid}px "${fontFamily}", sans-serif`;
        const measured = ctx.measureText(text).width;
        if (measured <= targetWidth) {
          lo = mid;
        } else {
          hi = mid;
        }
      }

      setFontSize(lo);
    }

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [text, fontFamily, fontWeight, targetRatio]);

  return fontSize;
}
