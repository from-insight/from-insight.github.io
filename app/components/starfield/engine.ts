// Pure simulation + drawing for the starfield. No DOM access at module
// level so it is safe to import during SSR; the reduced-motion static
// frame and the animated path share this code.

import { CONSTELLATIONS, type ConstellationDef } from "./constellations";
import { AMBIENT_POOL, STAR_POOL, fontFor, makePicker, pickHue } from "./glyphs";

export type Glyph = {
  ch: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
};

export type Star = {
  ch: string;
  nx: number;
  ny: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  px: number; // scratch: screen position computed in step()
  py: number;
};

export type Group = {
  def: ConstellationDef;
  cx: number;
  cy: number;
  w: number;
  h: number;
  dx: number; // tween targets
  dy: number;
  rot: number;
  stars: Star[];
};

export type Blob = {
  nx: number;
  ny: number;
  x: number;
  y: number;
  r: number;
  alpha: number;
  rgb: string;
  gradient?: CanvasGradient;
};

export type Scene = {
  w: number;
  h: number;
  glyphs: Glyph[];
  groups: Group[];
  blobs: Blob[];
  scrollFade: number;
};

export type SceneConfig = {
  density: number;
  speed: number;
  links: boolean;
  narrow: boolean;
  lowPower: boolean;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

const LINK_RADIUS = 70;
const LINK_RADIUS_SQ = LINK_RADIUS * LINK_RADIUS;
const STAR_SIZE = [13, 15, 18] as const;
const STAR_SIZE_NARROW = [12, 13, 15] as const;
const STAR_ALPHA = [0.32, 0.42, 0.55] as const;

const pickAmbient = makePicker(AMBIENT_POOL);
const pickStar = makePicker(STAR_POOL);

export function seedScene(w: number, h: number, cfg: SceneConfig): Scene {
  let count = Math.round((cfg.narrow ? 60 : 140) * cfg.density);
  if (cfg.lowPower) count = Math.round(count * 0.7);

  const glyphs: Glyph[] = [];
  for (let i = 0; i < count; i++) {
    const base = rand(0.22, 0.52);
    glyphs.push({
      ch: pickAmbient(),
      x: rand(-60, w + 60),
      y: rand(-40, h + 40),
      vx: rand(0.06, 0.34) * cfg.speed,
      vy: rand(-0.16, -0.03) * cfg.speed,
      size: rand(13, 20),
      alpha: base * 0.45,
      baseAlpha: base,
      color: pickHue(),
    });
  }
  // Sorted by size bucket so ctx.font changes only a handful of times per frame.
  glyphs.sort((a, b) => Math.round(a.size) - Math.round(b.size));

  const sizes = cfg.narrow ? STAR_SIZE_NARROW : STAR_SIZE;
  const groups: Group[] = [];
  for (const def of CONSTELLATIONS) {
    if (cfg.narrow && !def.mobile) continue;
    groups.push({
      def,
      cx: 0,
      cy: 0,
      w: 0,
      h: 0,
      dx: 0,
      dy: 0,
      rot: 0,
      stars: def.stars.map(([nx, ny, weight]) => ({
        ch: pickStar(),
        nx,
        ny,
        size: sizes[weight],
        alpha: STAR_ALPHA[weight] * 0.5,
        baseAlpha: STAR_ALPHA[weight],
        color: weight === 2 ? "#191E28" : pickHue(),
        px: 0,
        py: 0,
      })),
    });
  }

  const blobs: Blob[] = [
    { nx: 0.3, ny: 0.39, x: 0, y: 0, r: 0, alpha: 0, rgb: "39, 99, 186" },
    { nx: 0.7, ny: 0.58, x: 0, y: 0, r: 0, alpha: 0, rgb: "90, 70, 170" },
  ];

  const scene: Scene = { w, h, glyphs, groups, blobs, scrollFade: 1 };
  resizeScene(scene, w, h);
  return scene;
}

export function resizeScene(s: Scene, w: number, h: number): void {
  const sx = s.w > 0 ? w / s.w : 1;
  const sy = s.h > 0 ? h / s.h : 1;
  for (const g of s.glyphs) {
    g.x *= sx;
    g.y *= sy;
  }
  s.w = w;
  s.h = h;

  const narrow = w < 760;
  for (const gr of s.groups) {
    const anchor = (narrow && gr.def.mobile) || gr.def.desktop;
    gr.w = anchor.w * w;
    gr.h = gr.w * gr.def.aspect;
    gr.cx = anchor.ax * w;
    gr.cy = anchor.ay * h;
  }

  for (const b of s.blobs) {
    b.x = b.nx * w;
    b.y = b.ny * h;
    b.r = 0.32 * Math.min(w, h);
    b.gradient = undefined; // rebuilt lazily in draw()
  }
}

// k = dt / 16.67 (frame-rate independent); k = 0 just projects stars.
export function step(s: Scene, k: number, _cfg: SceneConfig): void {
  const { w, h } = s;
  for (const g of s.glyphs) {
    g.x += g.vx * k;
    g.y += g.vy * k;
    if (g.x > w + 70) g.x = -70;
    if (g.y < -60) g.y = h + 60;
  }
  for (const gr of s.groups) {
    const cos = Math.cos(gr.rot);
    const sin = Math.sin(gr.rot);
    const ox = gr.cx + gr.dx;
    const oy = gr.cy + gr.dy;
    for (const st of gr.stars) {
      const lx = (st.nx - 0.5) * gr.w;
      const ly = (st.ny - 0.5) * gr.h;
      st.px = ox + lx * cos - ly * sin;
      st.py = oy + lx * sin + ly * cos;
    }
  }
}

export function draw(ctx: CanvasRenderingContext2D, s: Scene, cfg: SceneConfig): void {
  const { w, h, glyphs, groups, blobs } = s;
  const fade = s.scrollFade;
  ctx.clearRect(0, 0, w, h);

  // Glow blobs
  for (const b of blobs) {
    if (b.alpha <= 0.001) continue;
    if (!b.gradient) {
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, b.r);
      grad.addColorStop(0, `rgba(${b.rgb}, 1)`);
      grad.addColorStop(0.55, `rgba(${b.rgb}, 0.38)`);
      grad.addColorStop(1, `rgba(${b.rgb}, 0)`);
      b.gradient = grad;
    }
    ctx.globalAlpha = b.alpha * fade;
    ctx.translate(b.x, b.y);
    ctx.fillStyle = b.gradient;
    ctx.fillRect(-b.r, -b.r, b.r * 2, b.r * 2);
    ctx.translate(-b.x, -b.y);
  }
  ctx.globalAlpha = 1;

  // Ambient proximity links
  if (cfg.links) {
    ctx.lineWidth = 0.5;
    const n = glyphs.length;
    for (let i = 0; i < n; i++) {
      const a = glyphs[i];
      for (let j = i + 1; j < n; j++) {
        const b = glyphs[j];
        const ddx = a.x - b.x;
        if (ddx > LINK_RADIUS || ddx < -LINK_RADIUS) continue;
        const ddy = a.y - b.y;
        if (ddy > LINK_RADIUS || ddy < -LINK_RADIUS) continue;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 >= LINK_RADIUS_SQ) continue;
        ctx.strokeStyle = `rgba(105,110,118,${(0.22 * (1 - d2 / LINK_RADIUS_SQ) * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // Ambient glyphs
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  let currentFont = "";
  for (const g of glyphs) {
    const f = fontFor(g.size);
    if (f !== currentFont) {
      ctx.font = f;
      currentFont = f;
    }
    ctx.globalAlpha = Math.max(0, Math.min(1, g.alpha * fade));
    ctx.fillStyle = g.color;
    ctx.fillText(g.ch, g.x, g.y);
  }

  // Constellation edges
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = `rgba(105,110,118,${(0.22 * fade).toFixed(3)})`;
  ctx.globalAlpha = 1;
  for (const gr of groups) {
    ctx.beginPath();
    for (const [a, b] of gr.def.edges) {
      const sa = gr.stars[a];
      const sb = gr.stars[b];
      ctx.moveTo(sa.px, sa.py);
      ctx.lineTo(sb.px, sb.py);
    }
    ctx.stroke();
  }

  // Constellation stars
  for (const gr of groups) {
    for (const st of gr.stars) {
      const f = fontFor(st.size);
      if (f !== currentFont) {
        ctx.font = f;
        currentFont = f;
      }
      ctx.globalAlpha = Math.max(0, Math.min(1, st.alpha * fade));
      ctx.fillStyle = st.color;
      ctx.fillText(st.ch, st.px, st.py);
    }
  }
  ctx.globalAlpha = 1;
}
