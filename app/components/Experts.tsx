import { motion } from "framer-motion";

const experts = [
  {
    name: "권수정",
    nameEn: "Kwon, Sue-jeong",
    role: "CEO & Founder",
    bio: "서울대학교 산업공학 박사. 파생상품 가격결정 엔진 개발, 핀테크 스타트업 공동창업 및 합병 경험. 대학교 연구교수 역임. 현재 from-insight를 이끌며 새로운 AI 기준을 세우고 있습니다.",
    tags: ["PhD SNU", "FinTech Founder", "Quant", "AI Educator"],
    href: "https://suekwon.github.io/about/",
  },
  {
    name: "정원준",
    nameEn: "Jung, Won-jun",
    role: "CPA & Pioneer",
    bio: "공인회계사이자 개발자. 금융 수치의 언어와 소프트웨어 공학 두 가지를 동시에 구사하며, 실무와 기술의 간극을 좁히는 교육 커리큘럼을 함께 설계합니다.",
    tags: ["CPA", "Software Engineer", "FinTech", "Curriculum Design"],
    href: "#",
  },
];

export function Experts() {
  return (
    <section
      id="experts"
      style={{
        padding: "8rem 5vw",
        background: "transparent",
        borderTop: "1px solid #ecdcd5",
      }}
    >
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
            color: "#f44250",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          The Experts
        </p>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            color: "#201815",
            lineHeight: 1.1,
          }}
        >
          현장 경험을 가진
          <br />
          전문가
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1px",
          background: "#ecdcd5",
          border: "1px solid #ecdcd5",
          maxWidth: "900px",
        }}
      >
        {experts.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{
              background: "rgba(255,255,255,0.78)",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(244,66,80,0.12), rgba(255,138,122,0.18))",
                border: "1px solid #ecdcd5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  background: "linear-gradient(135deg, #f44250, #ff8a7a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {member.name[0]}
              </span>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  letterSpacing: "-0.02em",
                  color: "#201815",
                  marginBottom: "0.2rem",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.7rem",
                  color: "#f44250",
                  letterSpacing: "0.05em",
                }}
              >
                {member.role}
              </p>
            </div>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                color: "#6f625c",
                lineHeight: 1.7,
              }}
            >
              {member.bio}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.65rem",
                    color: "#8a7771",
                    border: "1px solid #ecdcd5",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {member.href !== "#" && (
              <a
                href={member.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8rem",
                  color: "#8a7771",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#201815")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a7771")}
              >
                프로필 보기 →
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
