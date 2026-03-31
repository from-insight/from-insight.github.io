import { motion } from "framer-motion";

const team = [
  {
    name: "권수정",
    nameEn: "Kwon, Sue-jeong",
    role: "CEO & Founder",
    bio: "서울대학교 산업공학 박사. 파생상품 가격결정 엔진 개발, 핀테크 스타트업 공동창업 및 합병 경험. 성신여대 강사, 한국산업기술대 연구교수 역임. 현재 from-insight를 이끌며 AI 교육의 새로운 기준을 세우고 있습니다.",
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

export function Team() {
  return (
    <section
      id="team"
      style={{
        padding: "8rem 5vw",
        background: "#080808",
        borderTop: "1px solid #1f1f1f",
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
            color: "#7c3aed",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          The Team
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
          현장 경험을 가진
          <br />
          두 사람
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1px",
          background: "#1f1f1f",
          border: "1px solid #1f1f1f",
          maxWidth: "900px",
        }}
      >
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{
              background: "#080808",
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
                background: "linear-gradient(135deg, #7c3aed22, #06b6d422)",
                border: "1px solid #1f1f1f",
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
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
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
                  color: "#f5f5f5",
                  marginBottom: "0.2rem",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.7rem",
                  color: "#7c3aed",
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
                color: "#888888",
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

            {member.href !== "#" && (
              <a
                href={member.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8rem",
                  color: "#555",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
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
