import { useEffect, useRef, useState } from "react";
import { draw, resizeScene, seedScene, step, type Scene, type SceneConfig } from "./starfield/engine";

type Props = {
  density?: number;
  speed?: number;
  links?: boolean;
  reducedMotion?: boolean;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Page-wide animated background: real constellations whose stars are
// glyphs, plus a drifting glyph field. GSAP handles twinkle / drift tweens
// and the frame ticker; movement itself is plain per-frame math.
export function StarfieldBackground({ density = 1, speed = 1, links = true, reducedMotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Same initial value on server and client → no hydration mismatch.
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const reduced = reducedMotion ?? prefersReduced;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let cancelled = false;
    let cleanupGsap: (() => void) | undefined;

    const cfg: SceneConfig = {
      density,
      speed,
      links,
      narrow: window.innerWidth < 760,
      lowPower: (navigator.hardwareConcurrency ?? 8) <= 4,
    };
    const scene: Scene = seedScene(window.innerWidth, window.innerHeight, cfg);

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resizeScene(scene, w, h);
    };
    const renderStatic = () => {
      fit();
      step(scene, 0, cfg);
      draw(ctx, scene, cfg);
    };

    let resizeT: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(reduced ? renderStatic : fit, 120);
    };
    const onScroll = () => {
      scene.scrollFade = 1 - 0.55 * Math.min(1, window.scrollY / (1.6 * scene.h));
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (reduced) {
      // Single static frame; gsap is never loaded.
      for (const g of scene.glyphs) g.alpha = g.baseAlpha;
      for (const gr of scene.groups) for (const s of gr.stars) s.alpha = s.baseAlpha;
      renderStatic();
      document.fonts.ready.then(() => {
        if (!cancelled) renderStatic();
      });
    } else {
      Promise.all([import("gsap"), document.fonts.ready]).then(([{ gsap }]) => {
        if (cancelled) return;
        fit();

        const gctx = gsap.context(() => {
          for (const g of scene.glyphs) {
            gsap.to(g, {
              alpha: g.baseAlpha,
              duration: rand(1.6, 4.4),
              delay: rand(0, 3),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
          for (const gr of scene.groups) {
            gsap.to(gr, {
              dx: rand(-18, 18),
              dy: rand(-12, 12),
              rot: (rand(-3, 3) * Math.PI) / 180,
              duration: rand(26, 40),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            for (const s of gr.stars) {
              gsap.to(s, {
                alpha: s.baseAlpha,
                duration: rand(2, 5),
                delay: rand(0, 3),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            }
          }
          scene.blobs.forEach((b, i) => {
            gsap.to(b, { alpha: 0.06, duration: i ? 24 : 19, repeat: -1, yoyo: true, ease: "sine.inOut" });
          });
        });

        let acc = 0;
        const tick = (_time: number, deltaMs: number) => {
          const dt = Math.min(deltaMs, 48);
          if (cfg.lowPower) {
            acc += dt;
            if (acc < 1000 / 30) return;
            acc = 0;
          }
          step(scene, dt / 16.67, cfg);
          draw(ctx, scene, cfg);
        };
        gsap.ticker.add(tick);

        const onVisibility = () => {
          if (document.hidden) {
            gsap.ticker.remove(tick);
            gsap.globalTimeline.pause();
          } else {
            gsap.globalTimeline.resume();
            gsap.ticker.add(tick);
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        cleanupGsap = () => {
          document.removeEventListener("visibilitychange", onVisibility);
          gsap.ticker.remove(tick);
          gctx.revert();
        };
      });
    }

    return () => {
      cancelled = true;
      clearTimeout(resizeT);
      cleanupGsap?.();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [density, speed, links, reduced]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 78% at 50% 42%, rgba(243,244,247,0) 34%, rgba(243,244,247,0.82) 100%)",
        }}
      />
    </div>
  );
}
