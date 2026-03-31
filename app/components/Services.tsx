import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Frontend\nDevelopment",
    titleKo: "프론트엔드 개발 교육",
    desc: "React, TypeScript, 최신 웹 기술 스택을 실무 프로젝트 중심으로 교육합니다. 이론이 아닌 실제 코드로 배웁니다.",
    tags: ["React", "TypeScript", "Vite", "Next.js"],
  },
  {
    num: "02",
    title: "FinTech\nPractice",
    titleKo: "핀테크 실무 교육",
    desc: "파생상품 가격결정, 알고리즘 트레이딩, 리스크 관리까지 — 창업 경험에서 나온 실전 핀테크 교육입니다.",
    tags: ["Derivatives", "Quant Finance", "Risk Mgmt"],
  },
  {
    num: "03",
    title: "ML / Data\nAnalysis",
    titleKo: "머신러닝 데이터 분석",
    desc: "파이썬 기반 머신러닝부터 실전 데이터 분석 파이프라인 구축까지, 금융·비즈니스 맥락에서 배웁니다.",
    tags: ["Python", "PyTorch", "Pandas", "ML Ops"],
  },
  {
    num: "04",
    title: "Generative AI\nConsulting",
    titleKo: "기업 생성형 AI 컨설팅",
    desc: "LLM 도입 전략부터 사내 AI 워크플로 구축까지, 기업이 생성형 AI를 실질적으로 활용하도록 돕습니다.",
    tags: ["LLM", "Prompt Eng.", "RAG", "Enterprise AI"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function Services() {
  return (
    <section
      id="services"
      style={{ padding: "8rem 5vw", background: "#080808" }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "4rem" }}
      >
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
            color: "#7c3aed",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          What We Teach
        </p>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            color: "#f5f5f5",
            lineHeight: 1.1,
          }}
        >
          실전 중심의
          <br />
          AI 교육 프로그램
        </h2>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1px",
          background: "#1f1f1f",
          border: "1px solid #1f1f1f",
        }}
      >
        {services.map((s) => (
          <motion.div
            key={s.num}
            variants={cardVariants}
            style={{
              background: "#080808",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              cursor: "default",
              transition: "background 0.2s",
            }}
            whileHover={{ backgroundColor: "#111111" }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.7rem",
                color: "#444",
                letterSpacing: "0.1em",
              }}
            >
              {s.num}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  letterSpacing: "-0.02em",
                  color: "#f5f5f5",
                  lineHeight: 1.1,
                  whiteSpace: "pre-line",
                  marginBottom: "0.4rem",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8rem",
                  color: "#7c3aed",
                  fontWeight: 500,
                }}
              >
                {s.titleKo}
              </p>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                color: "#888888",
                lineHeight: 1.7,
                flexGrow: 1,
              }}
            >
              {s.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.65rem",
                    color: "#555",
                    border: "1px solid #1f1f1f",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
