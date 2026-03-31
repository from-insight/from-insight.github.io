# from-insight Corp. 홈페이지 구축 계획

## Context

from-insight corp.는 AI 교육 전문 신생 스타트업으로, 현재 홈페이지는 링크 두 개만 존재하는 플레이스홀더 상태. 핀테크 창업/합병 경험의 대표(권수정, SNU 공학박사)와 회계사+개발자 동업자가 운영하는 실전 경험 기반 AI 교육 회사의 정체성을 담은 임팩트 있는 홈페이지 구축 필요.

**목표**: Midjourney 스타일의 Bold/Dark/유니크한 디자인 + Pretext 방식의 Canvas 뷰포트-fill 타이포그래피로 차별화.

---

## 1. 디자인 시스템 (Figma 기획)

### 색상 팔레트
```
Background:  #080808 (near-black)
Surface:     #111111 (card bg)
Border:      #1F1F1F (subtle divider)
Primary:     #F5F5F5 (text)
Secondary:   #888888 (muted text)
Accent:      #7C3AED → #06B6D4 (violet→cyan gradient, AI feel)
Accent Alt:  #7C3AED (solid violet)
```

### 타이포그래피
- **Display**: Syne 900 (Google Font) — Hero 대형 헤드라인, Canvas fill
- **Heading**: Syne 700 — 섹션 제목
- **Body**: Inter — 본문, UI
- **Code**: JetBrains Mono — 강조 태그

### 반응형 브레이크포인트
- Mobile: < 768px
- Tablet: 768–1280px
- Desktop: > 1280px

---

## 2. 페이지 구조 (와이어프레임)

```
┌─────────────────────────────────────────────────────────┐
│  NAV  [from-insight]         Services  About  Community │  ← fixed, blur backdrop
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│   FROM                          ← canvas-fill, 90vw    │
│   INSIGHT                       ← 뷰포트 너비 동적 맞춤  │
│                                                         │
│   인사이트에서 인텔리전스로                                │
│   Turn Insight Into Intelligence                        │
│                                                         │
│   [커뮤니티 참여 →]   [프로그램 살펴보기]                  │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ← MARQUEE → Frontend Dev · FinTech · ML · GenAI · ... │  ← 무한 스크롤 태그
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  SERVICES                                               │
│  ┌────────────────────┐  ┌────────────────────┐        │
│  │ 01 Frontend Dev    │  │ 02 FinTech Practice │        │
│  │ Education          │  │ Education           │        │
│  └────────────────────┘  └────────────────────┘        │
│  ┌────────────────────┐  ┌────────────────────┐        │
│  │ 03 ML / Data       │  │ 04 GenAI Consulting │        │
│  │ Analysis           │  │                    │        │
│  └────────────────────┘  └────────────────────┘        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  STORY — 왜 from-insight인가                             │
│  핀테크 창업→합병 경험 / SNU 공학박사 / 실전 기반 교육 철학  │
│  텍스트 + 수치 강조 (예: 15년 업계 경력, 2개 창업 이력)     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  TEAM                                                   │
│  ┌────────────────────┐  ┌────────────────────┐        │
│  │ CEO — 권수정(Bom)  │  │ Co-Founder         │        │
│  │ PhD SNU / FinTech  │  │ CPA + Developer    │        │
│  │ Entrepreneur       │  │                    │        │
│  └────────────────────┘  └────────────────────┘        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COMMUNITY                                              │
│  Large bold CTA → Discord 입장                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  FOOTER: © 2025 from-insight corp. | 링크들             │
└─────────────────────────────────────────────────────────┘
```

---

## 3. 핵심 기술 구현

### Pretext 방식 Canvas 타이포그래피 훅
파일: `app/hooks/useViewportText.ts`

```typescript
// canvas measureText로 DOM reflow 없이 정확한 폰트 크기 계산
// Binary search: targetWidth(= 90vw)를 채우는 최대 fontSize 탐색
// resize 이벤트에 반응하여 재계산
```

### 애니메이션
- `framer-motion` 사용: 섹션 스크롤 진입 시 fade-in + slide-up
- Hero 텍스트: stagger reveal (글자 단위)
- Service 카드: hover lift effect

---

## 4. 프로젝트 구조

**위치**: `/Users/newbom/Documents/codes/3_from-insight/frominhome/`

```
frominhome/
├── app/
│   ├── components/
│   │   ├── Nav.tsx              ← sticky nav, blur backdrop
│   │   ├── Hero.tsx             ← canvas viewport-fill 타이포
│   │   ├── Marquee.tsx          ← 무한 스크롤 기술 태그
│   │   ├── Services.tsx         ← 2×2 서비스 카드
│   │   ├── Story.tsx            ← 창업 스토리 / 철학
│   │   ├── Team.tsx             ← 팀 소개
│   │   ├── Community.tsx        ← Discord CTA
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useViewportText.ts   ← pretext-style canvas 훅
│   ├── routes/
│   │   └── home.tsx
│   ├── app.css                  ← Tailwind v4 + 커스텀 테마
│   ├── root.tsx
│   └── routes.ts
├── public/
│   └── (assets)
├── package.json
├── vite.config.ts
├── react-router.config.ts
└── tsconfig.json
```

---

## 5. 의존성

```json
{
  "react": "^19",
  "react-router": "^7",
  "framer-motion": "^11",
  "@tailwindcss/vite": "^4",
  "typescript": "^5",
  "vite": "^6"
}
```

Google Fonts 추가: Syne (900, 700), JetBrains Mono

---

## 6. 구현 단계

1. **프로젝트 초기화** — `frominhome/`에 React Router v7 + TypeScript + Tailwind v4 세팅
2. **디자인 토큰** — `app.css`에 색상/폰트 CSS 변수 정의
3. **`useViewportText` 훅** — canvas measureText 바이너리 서치 구현
4. **Nav** — 로고 + 링크, scroll-aware blur
5. **Hero** — canvas-fill 타이포 + stagger animation
6. **Marquee** — CSS animation 무한 스크롤
7. **Services** — 4개 카드, hover effects
8. **Story** — 수치 강조 레이아웃
9. **Team** — 2인 프로필
10. **Community** — Discord CTA
11. **Footer**

---

## 7. 검증

- `npm run dev` 로컬 실행 후 브라우저에서 전체 섹션 확인
- Hero 텍스트 창 너비 조절 시 동적 리사이즈 확인
- 모바일(375px), 태블릿(768px), 데스크탑(1440px) 브레이크포인트 확인
- Discord 링크 클릭 확인 (`https://discord.com/invite/TKQn6RWaGX`)
- About 링크 확인 (`https://suekwon.github.io/about/`)
