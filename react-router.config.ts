import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

// Vercel 환경(VERCEL=1)에서만 preset 적용 → 표준 빌드 경로 유지
// Docker/K8s: build/server/index.js
// Vercel:     build/server/nodejs_.../index.js (preset이 관리)
const isVercel = process.env.VERCEL === "1";

export default {
  ssr: true,
  presets: isVercel ? [vercelPreset()] : [],
} satisfies Config;
