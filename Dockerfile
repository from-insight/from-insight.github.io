# ──────────────────────────────────────────────
# Stage 1: 개발 의존성 설치
# ──────────────────────────────────────────────
FROM node:20-alpine AS dev-deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts

# ──────────────────────────────────────────────
# Stage 2: 프로덕션 의존성 설치
# ──────────────────────────────────────────────
FROM node:20-alpine AS prod-deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# ──────────────────────────────────────────────
# Stage 3: 빌드
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
COPY --from=dev-deps /app/node_modules ./node_modules
RUN npm run build

# ──────────────────────────────────────────────
# Stage 4: 런타임 (최소 이미지)
# ──────────────────────────────────────────────
FROM node:20-alpine AS runner

# 보안: 비root 사용자로 실행
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

RUN chown -R appuser:appgroup /app
USER appuser

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# react-router-serve: SSR 서버 실행
CMD ["npm", "run", "start"]
