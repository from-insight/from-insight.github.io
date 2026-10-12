// Glyph pools for the starfield background. Single characters only —
// a mix of Hangul, Latin, digits, Eastern Arabic digits and Greek/math
// symbols so the nodes read as "science" rather than dots.

export type WeightedPool = { chars: readonly string[]; weight: number }[];

// Drifting layer: small, numeric/latin heavy (arXiv-id fragments feel).
export const AMBIENT_POOL: WeightedPool = [
  { chars: [..."0123456789"], weight: 0.28 },
  { chars: [..."agentLMcsAIxyzf"], weight: 0.22 },
  { chars: [..."ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅎ"], weight: 0.18 },
  { chars: [".", ":", "/", "+", "-", "·", "∙", "×", "▪", "—"], weight: 0.14 },
  { chars: [..."αβγλμπ≈≠±"], weight: 0.1 },
  { chars: [..."٠١٢٣٤٥٦٧٨٩"], weight: 0.08 },
];

// Constellation stars: heavier glyphs, drawn larger.
export const STAR_POOL: WeightedPool = [
  { chars: [..."ΣΔΩΛΠΦΨ"], weight: 0.4 },
  { chars: ["양", "자", "함", "수", "빛", "학", "인", "지", "통", "계", "결", "흐", "름"], weight: 0.35 },
  { chars: [..."∫∂∇∞"], weight: 0.15 },
  { chars: [..."AIMLN"], weight: 0.1 },
];

export function makePicker(pool: WeightedPool): () => string {
  const total = pool.reduce((s, p) => s + p.weight, 0);
  const cumulative: number[] = [];
  let acc = 0;
  for (const p of pool) {
    acc += p.weight / total;
    cumulative.push(acc);
  }
  return () => {
    const r = Math.random();
    let i = 0;
    while (i < cumulative.length - 1 && r > cumulative[i]) i++;
    const chars = pool[i].chars;
    return chars[(Math.random() * chars.length) | 0];
  };
}

// 89% ink / 5% muted / 6% accent — same ratios as the artboard.
export function pickHue(): string {
  const roll = Math.random();
  if (roll > 0.94) return "#2763BA";
  if (roll > 0.89) return "#696E76";
  return "#191E28";
}

// JetBrains Mono covers Latin/digits/Greek/symbols; Hangul and Arabic
// digits fall through to system faces.
export const FONT_STACK =
  '"JetBrains Mono", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", ui-monospace, Menlo, monospace';

const fontCache = new Map<number, string>();

export function fontFor(size: number): string {
  const key = Math.round(size);
  let f = fontCache.get(key);
  if (!f) {
    f = `${key}px ${FONT_STACK}`;
    fontCache.set(key, f);
  }
  return f;
}
