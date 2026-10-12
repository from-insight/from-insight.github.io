# from-insight 홈페이지 디자인 시스템 전환 계획 — 그레이 스톡

## Context

기존 홈페이지는 코랄(#f44250 → #ff8a7a) 그라디언트와 따뜻한 베이지 바탕, Syne + Inter 폰트 조합을 쓰고 있었다.
Claude Design 캔버스에서 만든 **그레이 스톡(Gray Stock)** 디자인 시스템을 홈페이지 전체에 그대로 적용한다.

- **원본**: https://claude.ai/artifact/FnsDSki3oirwf3ZLKQWxJL (캔버스 제목: "arXiv 크롤러 화면 설계")
- **적용 범위**: `System`(디자인 시스템), `Components`(위젯 매핑) 보드의 색상·타이포·버튼 규칙
- **적용하지 않은 것**: `Main`, `Mobile`, `Hero` 보드는 arXiv 크롤러 앱 화면이므로 레이아웃은 가져오지 않음. 홈페이지의 섹션 구조와 문구는 그대로 유지

**원칙**: 바탕은 흰색과 회색 사이의 #F3F4F7 한 칸. 카드는 순백으로 떠오르고, 버튼은 같은 회색축의 가장 어두운 끝(ink)을 써서 대비를 최대로 가져간다. 색은 대비를 만드는 데만 쓰고, 의미는 네 가지로 묶는다.

---

## 1. 색상 토큰

### Neutral ramp — 하나의 회색축 (명암비는 바탕 #F3F4F7 기준)

| 토큰 | 값 | 명암비 | 용도 |
|---|---|---|---|
| `surface` | `#FFFFFF` | 1.1:1 | 카드 · 패널 바닥 |
| `bg` | `#F3F4F7` | 1.0:1 | 앱 바탕 — 기준색 |
| `sunken` | `#E9EBEF` | 1.09:1 | 트랙 · 눌린 면 · hover 면 |
| `hairline` | `#DDE0E4` | 1.2:1 | 카드 테두리 |
| `divider` | `#CED1D7` | 1.39:1 | 구분선 · 비활성 막대 · secondary 버튼 테두리 |
| `muted` | `#696E76` | 4.67:1 | 라벨 · 보조 설명 |
| `body` | `#424852` | 8.37:1 | 본문 |
| `ink` | `#191E28` | 15.18:1 | 제목 · 주요 버튼 |
| `ink-hover` | `#2C333F` | — | 주요 버튼 hover |
| `disabled` | `#9BA1AA` | — | 비활성 글자 |

### Semantic — oklch(0.51 0.15 H), 밝기와 채도는 고정하고 색상각만 다름

| 토큰 | 기본 | tint 바탕 | 테두리 | strong 글자 | 명암비 | 용도 |
|---|---|---|---|---|---|---|
| `accent` (H 258) | `#2763BA` | `#E7F5FF` | `#C0D9FE` | `#174A92` | 5.33:1 | 링크 · 선택 상태 |
| `success` (H 152) | `#007D37` | `#E5FAEA` | `#BCE3C5` | `#006025` | 4.79:1 | 완료 알림 |
| `warning` (H 72) | `#995200` | `#FFF1DE` | `#F0D2AE` | `#773C00` | 5.36:1 | 주의 알림 |
| `danger` (H 26) | `#AB3935` | `#FFECE9` | `#FCCAC4` | `#862724` | 5.67:1 | 오류 알림 |

- 알림은 **tint 바탕 + strong 글자 + 기본색 점(dot)** 조합으로 쓴다.
- 파랑(accent)은 **링크와 선택 상태에만** 쓴다. 주요 버튼에 쓰면 명암비가 5.33:1로 떨어지기 때문.

---

## 2. 타이포그래피

| 역할 | 폰트 | 굵기 / 크기 | 색 |
|---|---|---|---|
| 대제목 | DM Sans | 700 / 34px, letter-spacing -0.02em | ink |
| 섹션 제목 | DM Sans | 700 / 19–26px, letter-spacing -0.02em | ink |
| 본문 | DM Sans | 400 / 13.5–14px, line-height 1.5–1.6 | body |
| 라벨 · 코드 · 메타 | JetBrains Mono | 400–500 / 10.5–12px, letter-spacing 0.06–0.14em | muted |

- Google Fonts: `DM Sans` (opsz 9..40, wght 400/500/700) + `JetBrains Mono` (400/500)
- DM Sans에는 한글 글리프가 없으므로 한글은 시스템 폰트(macOS: Apple SD Gothic Neo)로 대체된다.
- DM Sans는 700까지만 불러오므로 기존 Syne 800/900 굵기는 모두 700으로 맞춘다.

---

## 3. 컴포넌트 규칙

### 버튼 — 바탕에서 파생한 대비 쌍

| 종류 | 바탕 | 테두리 | 글자 | 명암비 |
|---|---|---|---|---|
| Primary | `#191E28` | `#191E28` | `#FFFFFF` | 16.7:1 |
| Primary hover | `#2C333F` | `#2C333F` | `#FFFFFF` | 12.9:1 |
| Secondary | `#FFFFFF` | `#CED1D7` | `#424852` | 9.2:1 |
| Ghost | transparent | transparent | `#424852` | 8.37:1 |
| Disabled | `#E9EBEF` | `#DDE0E4` | `#9BA1AA` | — |

- 높이 46px 기준, 좌우 패딩 22px, **모서리 7px**, 굵기 500, 크기 14.5px
- 기존 알약형(999px) 버튼은 7px로 바꾼다.

### 카드 · 패널
- 바탕 `#FFFFFF`, 테두리 `1px solid #DDE0E4`, 모서리 9–11px
- 카드 안의 메트릭 칸은 `#F3F4F7` 바탕 + `#DDE0E4` 테두리
- 그리드형 카드 묶음은 `gap: 1px` + `#DDE0E4` 배경으로 구분선을 만든다.

### 링크
- 기본 `#2763BA`, hover `#174A92` + 밑줄

---

## 4. 기존 값 → 그레이 스톡 매핑

| 기존 | 역할 | 변경 후 |
|---|---|---|
| `#fffaf6`, 베이지 그라디언트 바탕 | 페이지 바탕 | `#F3F4F7` 단색 |
| `rgba(255,255,255,0.55–0.78)` | 반투명 카드 · 바 | `#FFFFFF` |
| `rgba(255,250,246,0.9)` | 스크롤 시 Nav 바탕 | `rgba(243,244,247,0.9)` |
| `#ecdcd5` | 테두리 · 구분선 | `#DDE0E4` (hairline) |
| `#f1c9c3` | 보조 버튼 테두리 | `#CED1D7` (divider) |
| `#201815` | 제목 · 강조 글자 | `#191E28` (ink) |
| `#6f625c` | 본문 | `#424852` (body) |
| `#8a7771`, `#7d6d67`, `#8f7d77`, `#9d8a83` | 보조 글자 | `#696E76` (muted) |
| `#a18f88`, `#d9bdb6` | 약한 글자 · 구분점 | `#9BA1AA` (disabled) |
| `#f44250` | 아이브로 라벨 · 로고 하이픈 · 역할 라벨 | `#696E76` (muted) |
| `#f44250` | 서비스 한글 부제 | `#424852` (body) |
| `#f44250` (hover 테두리) | 버튼 hover | `#191E28` (ink) |
| `rgba(244,66,80,0.06–0.08)` | 버튼 hover 바탕 | `#E9EBEF` (sunken) |
| 코랄 그라디언트 텍스트 | 강조 헤드라인 · 숫자 | `#191E28` 단색 |
| 보라 그라디언트 (`#592e94 → #9053e6`) | Community 헤드라인 | `#191E28` 단색 |
| 보라 그라디언트 버튼 | Discord 버튼 | Primary 버튼 (`#191E28`, hover `#2C333F`) |
| `#9053e6` | Community 라벨 | `#696E76` (muted) |
| 코랄 radial glow | Hero · Community 배경 장식 | 제거 (`none`) |
| `rgba(236,220,213,0.75)` | Hero 격자선 | `rgba(206,209,215,0.6)` |
| `#fff3ef` | 서비스 카드 hover | `#F3F4F7` |
| `Syne`, `Inter` | 제목 · 본문 폰트 | `DM Sans` |

---

## 5. 적용 파일

| 파일 | 변경 내용 |
|---|---|
| `app/app.css` | `@theme`에 그레이 스톡 토큰 정의, body 바탕·글자색·폰트, 링크 색, `.gradient-text`를 ink 단색으로 |
| `app/root.tsx` | Google Fonts 링크를 DM Sans + JetBrains Mono로 교체 |
| `app/components/Nav.tsx` | 로고 하이픈, 메뉴 글자색, 스크롤 바탕, 버튼 hover |
| `app/components/Hero.tsx` | 격자선·glow, 헤드라인 단색, Primary/Secondary 버튼 |
| `app/components/Marquee.tsx` | 바탕 · 테두리 · 글자색 |
| `app/components/Services.tsx` | 카드 바탕 · hover, 라벨 · 부제 색 |
| `app/components/Story.tsx` | 통계 숫자 단색, 카드 바탕, 라벨 색 |
| `app/components/Experts.tsx` | 아바타 바탕, 이름 단색, 역할 라벨 색 |
| `app/components/Community.tsx` | 보라 그라디언트 제거, Discord 버튼을 Primary 버튼으로 |
| `app/components/Footer.tsx` | 로고 하이픈, 글자색 |

Tailwind 유틸리티로도 쓸 수 있도록 `@theme`에 다음 토큰을 정의했다.

```css
--color-surface:   #ffffff;
--color-bg:        #f3f4f7;
--color-sunken:    #e9ebef;
--color-hairline:  #dde0e4;
--color-divider:   #ced1d7;
--color-muted:     #696e76;
--color-body:      #424852;
--color-ink:       #191e28;
--color-ink-hover: #2c333f;
--color-disabled:  #9ba1aa;

--color-accent:        #2763ba;
--color-accent-strong: #174a92;
--color-success:       #007d37;
--color-warning:       #995200;
--color-danger:        #ab3935;
```

예: `text-ink`, `text-muted`, `bg-sunken`, `border-hairline`

> 컴포넌트는 기존처럼 인라인 `style`에 hex 값을 직접 쓴다. framer-motion의 `whileHover` 색 애니메이션은 CSS 변수 사이를 보간하지 못하므로, 애니메이션이 걸린 색은 hex 리터럴로 둔다.

---

## 6. 결정이 필요한 사항

1. **포인트 색 유지 여부** — 디자인 시스템을 그대로 따르면 사이트에 강조색이 거의 남지 않아 브랜드 인상이 크게 바뀐다. 로고 하이픈 등 한두 곳에만 포인트 색을 남길지 정해야 한다.
-> O 포인트 색 유지
-> F 폰트만 크고, ROM은 폰트를 줄이고 F 위에 맞춤 정렬하기
2. **한글 폰트** — DM Sans는 한글을 지원하지 않는다. 한글 웹폰트(예: Pretendard)를 따로 지정할지 정해야 한다.
3. **dark 모드** — 이번 시스템은 LIGHT만 정의되어 있다.

---

## 7. 검증

- [x] `tsc --noEmit` 타입 체크 통과
- [x] `react-router build` 빌드 통과
- [ ] 데스크톱(1440px) 화면 육안 확인
- [ ] 모바일(390px) 화면 육안 확인 — Story 섹션 반응형 포함
- [ ] 버튼 hover 상태 확인 (Nav, Hero, Community)
- [ ] 한글 폰트 대체 렌더링 확인

---

## 변경사항

### 2026-10-12 · 움직이는 별자리 배경 추가

**목적** — 그레이 스톡은 강조색이 거의 없어 정적인 인상이 강하다. 배경에 천천히 움직이는 별자리를 깔아 깊이감을 주되, 노드를 점 대신 글자(한글·영문·숫자·동아랍 숫자·그리스/수학 기호)로 그려 "전문 과학" 분위기를 만든다.
참고: Claude Design 캔버스의 "움직이는 배경 (GSAP)" 아트보드.

**라이브러리** — GSAP 3 코어 (`gsap`, 3.15). 글자 twinkle 트윈, 별자리 묶음의 느린 드리프트, 프레임 ticker에만 쓴다. 글자 이동은 아트보드처럼 직접 계산. 기존 framer-motion 등장 애니메이션은 그대로 둔다. 서버 렌더링을 피하기 위해 `useEffect` 안에서 `import("gsap")`.

**구성 (Canvas 2D, DPR ≤ 2)**
| 레이어 | 내용 | 색 | 알파 상한 |
|---|---|---|---|
| 별자리 | 오리온·북두칠성·카시오페이아·백조·전갈. 별 = 글자, 별 사이 고정 선. 묶음 단위로 ±18px 드리프트 + ±3° 회전(26–40초 yoyo), 별마다 twinkle | 글자 ink `#191E28` / 선 muted `#696E76` | 글자 0.38, 선 0.22 |
| 떠다니는 글자 | 아트보드 방식. 오른쪽·위로 느리게 흐르고 가장자리에서 되돌아옴. 70px 안의 글자끼리 옅은 선 | 89 % ink, 5 % muted, 6 % accent `#2763BA` | 글자 0.28, 선 0.14 |
| 글로우 | 파랑·보라 radial blob 2개, 19/24초 yoyo | rgb(39,99,186), rgb(90,70,170) | 0.06 |
| 비네트 | 캔버스 위 `radial-gradient(120% 78% at 50% 42%, rgba(243,244,247,0) 34%, rgba(243,244,247,0.82) 100%)` | bg | — |
| 스크롤 페이드 | 1.6 화면 높이를 내려가면 전체 알파가 45 %까지 줄어 아래 섹션은 조용해짐 | — | — |

**글자 풀 (단일 글자, 가중 추출)**
- 떠다니는 레이어: 숫자 0–9 (28 %) · 영문 a g e n t L M c s A I x y z f (22 %) · 한글 자모 ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅎ (18 %) · 기호 . : / + - · ∙ × ▪ — (14 %) · 그리스/수학 α β γ λ μ π ≈ ≠ ± (10 %) · 동아랍 숫자 ٠١٢٣٤٥٦٧٨٩ (8 %) — 크기 8–13px
- 별자리 별: 그리스 대문자 Σ Δ Ω Λ Π Φ Ψ (40 %) · 한글 음절 양 자 함 수 빛 학 인 지 통 계 결 흐 름 (35 %) · ∫ ∂ ∇ ∞ (15 %) · A I M L N (10 %) — 밝기에 따라 13/15/18px
- 폰트: JetBrains Mono (영문·숫자·그리스·기호) → 한글은 Apple SD Gothic Neo / Malgun Gothic, 아랍 숫자는 시스템 아랍 폰트로 fallback. 웹폰트 추가 없음 (배경 장식이라 폰트 차이가 보이지 않고, Noto KR+Arabic은 300KB 이상).

**별자리 좌표** — `app/components/starfield/constellations.ts`에 0–1 정규화 좌표와 선 목록. 박스 크기는 뷰포트 비율(`w = anchor.w × vw`). 데스크톱: 오리온은 헤드라인 오른쪽(ax .78), 북두칠성 왼쪽 위(ax .17), 카시오페이아 왼쪽 아래, 백조·전갈은 오른쪽 아래에 작게. 모바일(<760px)은 오리온·북두칠성·카시오페이아만.

**적용 범위** — `position: fixed; inset: 0; z-index: 0; pointer-events: none` 캔버스를 `home.tsx`에서 섹션 wrapper의 **형제**로 마운트. wrapper는 `position: relative; z-index: 1` (같은 스태킹 컨텍스트 안에 넣으면 투명 섹션 글자 위로 캔버스가 올라옴). Hero의 격자선·빈 glow div, Community의 빈 장식 div는 제거.

**성능·접근성**
- `prefers-reduced-motion: reduce` → gsap을 불러오지 않고 정지 화면 1프레임만 그림
- 탭이 숨겨지면 ticker 제거 + 타임라인 일시정지, 다시 보이면 재개
- 폭 < 760px → 떠다니는 글자 60개, 별자리 3개 · `hardwareConcurrency ≤ 4` → 글자 수 ×0.7, 30fps
- 데스크톱: 떠다니는 글자 140개, 별 36개, DPR 2 상한, 목표 스크립트 < 8ms/프레임
- 알파 예산: 배경 요소가 `#F3F4F7` 위에서 0.4를 넘지 않아 본문 `#424852`(7.9:1) AA 유지

**파일**
- `app/components/StarfieldBackground.tsx` (신규) — 캔버스·GSAP·리사이즈·정리
- `app/components/starfield/engine.ts` (신규) — DOM 없는 순수 시뮬레이션/그리기 (reduced-motion 정지 프레임과 공유)
- `app/components/starfield/constellations.ts` (신규) — 별 좌표·선·배치
- `app/components/starfield/glyphs.ts` (신규) — 글자 풀·가중 추출·폰트 캐시
- `app/routes/home.tsx` — 배경 마운트, wrapper z-index
- `app/components/Hero.tsx`, `app/components/Community.tsx` — 빈 장식 div 제거
- `package.json` — `gsap` 추가

**검증**
- `npm run typecheck`, `npm run build` → `npm run start`로 `/`가 200이고 `window is not defined` 없음
- 1440×900 / 390×844에서 별자리 식별, 한글·아랍·그리스 tofu 없음, CTA와 겹치지 않음
- DevTools reduced-motion 에뮬레이션 시 정지 프레임, gsap 청크 미로딩
- 탭 전환 후 복귀 시 튐 없음, Performance 패널 프레임당 < 8ms

### 2026-10-12 · §6 결정 반영

- **포인트 색 유지** — 코랄 `#f44250`을 두 곳에만 남긴다: 섹션 아이브로 라벨(PROVEN DEPTH 등 작은 모노 라벨), Hero 헤드라인 FROM의 "O". 버튼·링크·본문에는 쓰지 않는다. `@theme`에 `--color-point: #f44250` 추가.
- **FROM 헤드라인** — F만 뷰포트 폭 기준 크기를 유지하고, ROM은 약 42 % 크기로 줄여 F의 윗선(캡 높이)에 맞춰 오른쪽에 둔다. INSIGHT는 그대로.
- 한글 웹폰트, dark 모드는 미결로 둔다.
