import { motion } from "framer-motion";

const stats = [
  { value: "Expert", label: "핀테크 스타트업\n 창업, 합병 경력" },
  { value: "AI", label: "컨설팅 전문\n신생 스타트업" },
  { value: "15+", label: "년 금융 IT\n업계 경력" },  
  { value: "SNU", label: "공학박사\nSeoul Nat'l Univ." },  
];

export function Story() {
  return (
    <section
      id="story"
      style={{
        padding: "8rem 5vw",
        background: "transparent",
        borderTop: "1px solid #ecdcd5",
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
              color: "#f44250",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Proven Depth 
          </p>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "-0.03em",
              color: "#201815",
              lineHeight: 1.15,
              marginBottom: "2rem",
            }}
          >
            경험에서 비롯한
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f44250, #ff8a7a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              생생한 경험
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
              "from-insight는 핀테크 스타트업을 창업하고 합병하는 과정에서 체득한 실전 경험을 다양한 그룹과 나누기 위해 만들어진 회사입니다.",
              "회계사 개발자 파이어니어와 함께, 금융과 기술이 만나는 지점에서 실질적으로 쓰이는 기술을 연구합니다.",
              "서울대학교 공학박사 출신 대표가 다양한 산업과 기술을 깊이있게 접목한 경험을 기반으로 전문지식을 - 파생상품 가격결정 엔진, 퀀트 기반 기업 리스크 관리 - 누구나 다가가기 쉽게 다룹니다.",
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  color: "#6f625c",
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
            background: "#ecdcd5",
            border: "1px solid #ecdcd5",
          }}
        >
          {stats.map(({ value, label }) => (
            <div
              key={value}
              style={{
                background: "rgba(255,255,255,0.76)",
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
                  background: "linear-gradient(135deg, #f44250, #ff8a7a)",
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
                  color: "#7d6d67",
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
