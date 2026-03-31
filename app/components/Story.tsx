import { motion } from "framer-motion";

const stats = [
  { value: "SNU", label: "공학박사\nSeoul Nat'l Univ." },
  { value: "Expert", label: "핀테크 스타트업\n 창업, 합병 경력" },
  { value: "15+", label: "년 금융 IT\n업계 경력" },
  { value: "AI", label: "교육 전문\n신생 스타트업" },
];

export function Story() {
  return (
    <section
      id="story"
      style={{
        padding: "8rem 5vw",
        background: "#0d0d0d",
        borderTop: "1px solid #1f1f1f",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            Why From-Insight
          </p>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "-0.03em",
              color: "#f5f5f5",
              lineHeight: 1.15,
              marginBottom: "2rem",
            }}
          >
            경험에서 비롯된
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              진짜 교육
            </span>
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {[
              "from-insight는 핀테크 스타트업을 창업하고 합병하는 과정에서 체득한 실전 경험을 교육으로 나누기 위해 만들어진 회사입니다.",
              "서울대학교 공학박사 출신의 대표가 파생상품 가격결정 엔진 개발, 퀀트 운용, 기업 리스크 관리를 직접 경험하며 쌓은 지식을 커리큘럼에 담았습니다.",
              "회계사인 정원준 파이어니어와 함께, 금융과 기술이 만나는 지점에서 실질적으로 쓰이는 기술을 가르칩니다.",
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  color: "#888888",
                  lineHeight: 1.75,
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Right: stats */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "#1f1f1f",
            border: "1px solid #1f1f1f",
          }}
        >
          {stats.map(({ value, label }) => (
            <div
              key={value}
              style={{
                background: "#0d0d0d",
                padding: "2.5rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8rem",
                  color: "#666",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
