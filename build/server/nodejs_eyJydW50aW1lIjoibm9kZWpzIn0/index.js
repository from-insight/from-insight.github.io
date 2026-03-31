import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs(
    motion.nav,
    {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6, ease: "easeOut" },
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1f1f1f" : "1px solid transparent",
        transition: "background-color 0.3s, backdrop-filter 0.3s, border-color 0.3s"
      },
      children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#hero",
            style: {
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "-0.02em",
              color: "#f5f5f5",
              textDecoration: "none"
            },
            children: [
              "from",
              /* @__PURE__ */ jsx("span", { style: { color: "#7c3aed" }, children: "-" }),
              "insight"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "2rem", alignItems: "center" }, children: [
          [
            { label: "Services", href: "#services" },
            { label: "About", href: "#story" },
            { label: "Community", href: "#community" }
          ].map(({ label, href }) => /* @__PURE__ */ jsx(
            "a",
            {
              href,
              style: {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                color: "#888888",
                textDecoration: "none",
                transition: "color 0.2s"
              },
              onMouseEnter: (e) => e.currentTarget.style.color = "#f5f5f5",
              onMouseLeave: (e) => e.currentTarget.style.color = "#888888",
              children: label
            },
            href
          )),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://discord.com/invite/TKQn6RWaGX",
              target: "_blank",
              rel: "noreferrer",
              style: {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#f5f5f5",
                textDecoration: "none",
                padding: "0.4rem 1rem",
                border: "1px solid #1f1f1f",
                borderRadius: "999px",
                background: "transparent",
                transition: "border-color 0.2s, background 0.2s"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.borderColor = "#7c3aed";
                e.currentTarget.style.background = "rgba(124,58,237,0.1)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.borderColor = "#1f1f1f";
                e.currentTarget.style.background = "transparent";
              },
              children: "Join Discord"
            }
          )
        ] })
      ]
    }
  );
}
function useViewportText(text, fontFamily = "Syne", fontWeight = "900", targetRatio = 0.9) {
  const [fontSize, setFontSize] = useState(100);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    function calculate() {
      if (!ctx) return;
      const targetWidth = window.innerWidth * targetRatio;
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
function Hero() {
  const fromSize = useViewportText("FROM", "Syne", "900", 0.88);
  const insightSize = useViewportText("INSIGHT", "Syne", "900", 0.88);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "hero",
      style: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 5vw",
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(rgba(31,31,31,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,31,31,0.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "600px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 1, width: "100%" }, children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 900,
                    fontSize: `${fromSize}px`,
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    color: "#f5f5f5",
                    whiteSpace: "nowrap",
                    userSelect: "none"
                  },
                  children: "FROM"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 900,
                    fontSize: `${insightSize}px`,
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    whiteSpace: "nowrap",
                    userSelect: "none"
                  },
                  children: "INSIGHT"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.3, ease: "easeOut" },
              style: { marginTop: "2.5rem", maxWidth: "640px" },
              children: [
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "Syne, sans-serif",
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      fontWeight: 700,
                      color: "#f5f5f5",
                      marginBottom: "0.5rem"
                    },
                    children: "인사이트에서 인텔리전스로"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "p",
                  {
                    style: {
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                      color: "#888888",
                      lineHeight: 1.7
                    },
                    children: [
                      "실전 핀테크 창업 경험과 학문적 깊이를 결합한 AI 교육.",
                      /* @__PURE__ */ jsx("br", {}),
                      "현장에서 쓰이는 기술을 직접 가르칩니다."
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              style: { display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" },
              children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://discord.com/invite/TKQn6RWaGX",
                    target: "_blank",
                    rel: "noreferrer",
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.75rem",
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      transition: "opacity 0.2s, transform 0.2s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.opacity = "0.85";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "translateY(0)";
                    },
                    children: "커뮤니티 참여하기 →"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#services",
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.75rem 1.75rem",
                      border: "1px solid #1f1f1f",
                      color: "#f5f5f5",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      transition: "border-color 0.2s, transform 0.2s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.borderColor = "#888888";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.borderColor = "#1f1f1f";
                      e.currentTarget.style.transform = "translateY(0)";
                    },
                    children: "프로그램 살펴보기"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.2, duration: 0.8 },
            style: {
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem"
            },
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.7rem",
                    color: "#444",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  },
                  children: "scroll"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: { y: [0, 6, 0] },
                  transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
                  style: {
                    width: "1px",
                    height: "32px",
                    background: "linear-gradient(to bottom, #444, transparent)"
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const tags = [
  "Frontend Development",
  "React · TypeScript",
  "FinTech Practice",
  "Machine Learning",
  "Data Analysis",
  "Generative AI",
  "LLM Consulting",
  "Python · PyTorch",
  "Algorithmic Trading",
  "Derivatives Pricing",
  "Enterprise AI",
  "Prompt Engineering"
];
function Marquee() {
  const doubled = [...tags, ...tags];
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        borderTop: "1px solid #1f1f1f",
        borderBottom: "1px solid #1f1f1f",
        padding: "1rem 0",
        overflow: "hidden",
        background: "#0d0d0d"
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "animate-marquee",
          style: {
            display: "flex",
            gap: "0",
            width: "max-content",
            willChange: "transform"
          },
          children: doubled.map((tag, i) => /* @__PURE__ */ jsxs(
            "span",
            {
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "0 2rem",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "#444444",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap"
              },
              children: [
                tag,
                /* @__PURE__ */ jsx("span", { style: { color: "#1f1f1f", fontSize: "1rem" }, children: "·" })
              ]
            },
            i
          ))
        }
      )
    }
  );
}
const services = [
  {
    num: "01",
    title: "Frontend\nDevelopment",
    titleKo: "프론트엔드 개발 교육",
    desc: "React, TypeScript, 최신 웹 기술 스택을 실무 프로젝트 중심으로 교육합니다. 이론이 아닌 실제 코드로 배웁니다.",
    tags: ["React", "TypeScript", "Vite", "Next.js"]
  },
  {
    num: "02",
    title: "FinTech\nPractice",
    titleKo: "핀테크 실무 교육",
    desc: "파생상품 가격결정, 알고리즘 트레이딩, 리스크 관리까지 — 창업 경험에서 나온 실전 핀테크 교육입니다.",
    tags: ["Derivatives", "Quant Finance", "Risk Mgmt"]
  },
  {
    num: "03",
    title: "ML / Data\nAnalysis",
    titleKo: "머신러닝 데이터 분석",
    desc: "파이썬 기반 머신러닝부터 실전 데이터 분석 파이프라인 구축까지, 금융·비즈니스 맥락에서 배웁니다.",
    tags: ["Python", "PyTorch", "Pandas", "ML Ops"]
  },
  {
    num: "04",
    title: "Generative AI\nConsulting",
    titleKo: "기업 생성형 AI 컨설팅",
    desc: "LLM 도입 전략부터 사내 AI 워크플로 구축까지, 기업이 생성형 AI를 실질적으로 활용하도록 돕습니다.",
    tags: ["LLM", "Prompt Eng.", "RAG", "Enterprise AI"]
  }
];
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
function Services() {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "services",
      style: { padding: "8rem 5vw", background: "#080808" },
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            style: { marginBottom: "4rem" },
            children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.75rem",
                    color: "#7c3aed",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "1rem"
                  },
                  children: "What We Teach"
                }
              ),
              /* @__PURE__ */ jsxs(
                "h2",
                {
                  style: {
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    letterSpacing: "-0.03em",
                    color: "#f5f5f5",
                    lineHeight: 1.1
                  },
                  children: [
                    "실전 중심의",
                    /* @__PURE__ */ jsx("br", {}),
                    "AI 교육 프로그램"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            variants: containerVariants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-80px" },
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              background: "#1f1f1f",
              border: "1px solid #1f1f1f"
            },
            children: services.map((s) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: cardVariants,
                style: {
                  background: "#080808",
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  cursor: "default",
                  transition: "background 0.2s"
                },
                whileHover: { backgroundColor: "#111111" },
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.7rem",
                        color: "#444",
                        letterSpacing: "0.1em"
                      },
                      children: s.num
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        style: {
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 800,
                          fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                          letterSpacing: "-0.02em",
                          color: "#f5f5f5",
                          lineHeight: 1.1,
                          whiteSpace: "pre-line",
                          marginBottom: "0.4rem"
                        },
                        children: s.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.8rem",
                          color: "#7c3aed",
                          fontWeight: 500
                        },
                        children: s.titleKo
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        color: "#888888",
                        lineHeight: 1.7,
                        flexGrow: 1
                      },
                      children: s.desc
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.4rem" }, children: s.tags.map((tag) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.65rem",
                        color: "#555",
                        border: "1px solid #1f1f1f",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "4px",
                        letterSpacing: "0.05em"
                      },
                      children: tag
                    },
                    tag
                  )) })
                ]
              },
              s.num
            ))
          }
        )
      ]
    }
  );
}
const stats = [
  { value: "SNU", label: "공학박사\nSeoul Nat'l Univ." },
  { value: "Expert", label: "핀테크 스타트업\n 창업, 합병 경력" },
  { value: "15+", label: "년 금융 IT\n업계 경력" },
  { value: "AI", label: "교육 전문\n신생 스타트업" }
];
function Story() {
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "story",
      style: {
        padding: "8rem 5vw",
        background: "#0d0d0d",
        borderTop: "1px solid #1f1f1f"
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start"
          },
          children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -32 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                children: [
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.75rem",
                        color: "#7c3aed",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "1rem"
                      },
                      children: "Why From-Insight"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "h2",
                    {
                      style: {
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                        letterSpacing: "-0.03em",
                        color: "#f5f5f5",
                        lineHeight: 1.15,
                        marginBottom: "2rem"
                      },
                      children: [
                        "경험에서 비롯된",
                        /* @__PURE__ */ jsx("br", {}),
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            style: {
                              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text"
                            },
                            children: "진짜 교육"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem"
                      },
                      children: [
                        "from-insight는 핀테크 스타트업을 창업하고 합병하는 과정에서 체득한 실전 경험을 교육으로 나누기 위해 만들어진 회사입니다.",
                        "서울대학교 공학박사 출신의 대표가 파생상품 가격결정 엔진 개발, 퀀트 운용, 기업 리스크 관리를 직접 경험하며 쌓은 지식을 커리큘럼에 담았습니다.",
                        "회계사인 정원준 파이어니어와 함께, 금융과 기술이 만나는 지점에서 실질적으로 쓰이는 기술을 가르칩니다."
                      ].map((text, i) => /* @__PURE__ */ jsx(
                        "p",
                        {
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "1rem",
                            color: "#888888",
                            lineHeight: 1.75
                          },
                          children: text
                        },
                        i
                      ))
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, x: 32 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1px",
                  background: "#1f1f1f",
                  border: "1px solid #1f1f1f"
                },
                children: stats.map(({ value, label }) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      background: "#0d0d0d",
                      padding: "2.5rem 1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 900,
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            letterSpacing: "-0.04em",
                            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                          },
                          children: value
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.8rem",
                            color: "#666",
                            lineHeight: 1.5,
                            whiteSpace: "pre-line"
                          },
                          children: label
                        }
                      )
                    ]
                  },
                  value
                ))
              }
            )
          ]
        }
      )
    }
  );
}
const team = [
  {
    name: "권수정",
    nameEn: "Kwon, Sue-jeong",
    role: "CEO & Founder",
    bio: "서울대학교 산업공학 박사. 파생상품 가격결정 엔진 개발, 핀테크 스타트업 공동창업 및 합병 경험. 성신여대 강사, 한국산업기술대 연구교수 역임. 현재 from-insight를 이끌며 AI 교육의 새로운 기준을 세우고 있습니다.",
    tags: ["PhD SNU", "FinTech Founder", "Quant", "AI Educator"],
    href: "https://suekwon.github.io/about/"
  },
  {
    name: "정원준",
    nameEn: "Jung, Won-jun",
    role: "CPA & Pioneer",
    bio: "공인회계사이자 개발자. 금융 수치의 언어와 소프트웨어 공학 두 가지를 동시에 구사하며, 실무와 기술의 간극을 좁히는 교육 커리큘럼을 함께 설계합니다.",
    tags: ["CPA", "Software Engineer", "FinTech", "Curriculum Design"],
    href: "#"
  }
];
function Team() {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "team",
      style: {
        padding: "8rem 5vw",
        background: "#080808",
        borderTop: "1px solid #1f1f1f"
      },
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            style: { marginBottom: "4rem" },
            children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.75rem",
                    color: "#7c3aed",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "1rem"
                  },
                  children: "The Team"
                }
              ),
              /* @__PURE__ */ jsxs(
                "h2",
                {
                  style: {
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    letterSpacing: "-0.03em",
                    color: "#f5f5f5",
                    lineHeight: 1.1
                  },
                  children: [
                    "현장 경험을 가진",
                    /* @__PURE__ */ jsx("br", {}),
                    "두 사람"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1px",
              background: "#1f1f1f",
              border: "1px solid #1f1f1f",
              maxWidth: "900px"
            },
            children: team.map((member, i) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 32 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: i * 0.15 },
                style: {
                  background: "#080808",
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7c3aed22, #06b6d422)",
                        border: "1px solid #1f1f1f",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 800,
                            fontSize: "1.2rem",
                            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                          },
                          children: member.name[0]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        style: {
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 800,
                          fontSize: "1.4rem",
                          letterSpacing: "-0.02em",
                          color: "#f5f5f5",
                          marginBottom: "0.2rem"
                        },
                        children: member.name
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "0.7rem",
                          color: "#7c3aed",
                          letterSpacing: "0.05em"
                        },
                        children: member.role
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#888888",
                        lineHeight: 1.7
                      },
                      children: member.bio
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.4rem" }, children: member.tags.map((tag) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.65rem",
                        color: "#555",
                        border: "1px solid #1f1f1f",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "4px",
                        letterSpacing: "0.05em"
                      },
                      children: tag
                    },
                    tag
                  )) }),
                  member.href !== "#" && /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: member.href,
                      target: "_blank",
                      rel: "noreferrer",
                      style: {
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.8rem",
                        color: "#555",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        transition: "color 0.2s"
                      },
                      onMouseEnter: (e) => e.currentTarget.style.color = "#f5f5f5",
                      onMouseLeave: (e) => e.currentTarget.style.color = "#555",
                      children: "프로필 보기 →"
                    }
                  )
                ]
              },
              member.name
            ))
          }
        )
      ]
    }
  );
}
function Community() {
  const joinSize = useViewportText("JOIN US", "Syne", "900", 0.7);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "community",
      style: {
        padding: "8rem 5vw",
        background: "#0d0d0d",
        borderTop: "1px solid #1f1f1f",
        position: "relative",
        overflow: "hidden",
        textAlign: "center"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.75rem",
                color: "#06b6d4",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem"
              },
              children: "Community"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 32 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              style: { overflow: "hidden" },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 900,
                    fontSize: `${joinSize}px`,
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    userSelect: "none"
                  },
                  children: "JOIN US"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.p,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.2 },
              style: {
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "#888888",
                lineHeight: 1.7,
                maxWidth: "480px",
                margin: "2rem auto"
              },
              children: [
                "Discord 커뮤니티에서 질문하고, 스터디하고, 함께 성장하세요.",
                /* @__PURE__ */ jsx("br", {}),
                "강의 외에도 실시간으로 소통할 수 있습니다."
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: "https://discord.com/invite/TKQn6RWaGX",
              target: "_blank",
              rel: "noreferrer",
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.35 },
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.9rem 2.5rem",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s"
              },
              whileHover: { scale: 1.03 },
              whileTap: { scale: 0.98 },
              children: [
                /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" }) }),
                "Discord 커뮤니티 입장"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      style: {
        padding: "3rem 5vw",
        borderTop: "1px solid #1f1f1f",
        background: "#080808",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "span",
            {
              style: {
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#f5f5f5"
              },
              children: [
                "from",
                /* @__PURE__ */ jsx("span", { style: { color: "#7c3aed" }, children: "-" }),
                "insight"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                color: "#444",
                marginTop: "0.4rem"
              },
              children: "© 2025 from-insight corp. All rights reserved."
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "2rem", flexWrap: "wrap" }, children: [
          { label: "About", href: "#story" },
          { label: "Services", href: "#services" },
          { label: "Discord", href: "https://discord.com/invite/TKQn6RWaGX" }
        ].map(({ label, href }) => /* @__PURE__ */ jsx(
          "a",
          {
            href,
            target: href.startsWith("http") ? "_blank" : void 0,
            rel: href.startsWith("http") ? "noreferrer" : void 0,
            style: {
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8rem",
              color: "#555",
              textDecoration: "none",
              transition: "color 0.2s"
            },
            onMouseEnter: (e) => e.currentTarget.style.color = "#f5f5f5",
            onMouseLeave: (e) => e.currentTarget.style.color = "#555",
            children: label
          },
          label
        )) })
      ]
    }
  );
}
function meta({}) {
  return [{
    title: "from-insight corp. — AI Education & Consulting"
  }, {
    name: "description",
    content: "실전 핀테크 창업 경험과 학문적 깊이를 결합한 AI 교육. 프론트엔드, 핀테크, 머신러닝, 생성형 AI 컨설팅."
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    style: {
      background: "#080808",
      minHeight: "100vh"
    },
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(Marquee, {}), /* @__PURE__ */ jsx(Services, {}), /* @__PURE__ */ jsx(Story, {}), /* @__PURE__ */ jsx(Team, {}), /* @__PURE__ */ jsx(Community, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-qDkKCGQ3.js", "imports": ["/assets/chunk-UVKPFVEO-BwactrwG.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": true, "module": "/assets/root-BHOrMbmM.js", "imports": ["/assets/chunk-UVKPFVEO-BwactrwG.js"], "css": ["/assets/root-BK5-mjZp.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-BiBo40qN.js", "imports": ["/assets/chunk-UVKPFVEO-BwactrwG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-34d448ce.js", "version": "34d448ce", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_passThroughRequests": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
