import { useViewportText } from "~/hooks/useViewportText";
import { motion } from "framer-motion";

export function Hero() {
  const fromSize = useViewportText("FROM", "Syne", "900", 0.88);
  const insightSize = useViewportText("INSIGHT", "Syne", "900", 0.88);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 5vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(31,31,31,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,31,31,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Canvas-fill headline — each word fills viewport width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 900,
              fontSize: `${fromSize}px`,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#f5f5f5",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            FROM
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
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
              userSelect: "none",
            }}
          >
            INSIGHT
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          style={{ marginTop: "2.5rem", maxWidth: "640px" }}
        >
          <p
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: "0.5rem",
            }}
          >
            인사이트에서 인텔리전스로
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "#888888",
              lineHeight: 1.7,
            }}
          >
            실전 핀테크 창업 경험과 학문적 깊이를 결합한 AI 교육.
            <br />
            현장에서 쓰이는 기술을 직접 가르칩니다.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}
        >
          <a
            href="https://discord.com/invite/TKQn6RWaGX"
            target="_blank"
            rel="noreferrer"
            style={{
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
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            커뮤니티 참여하기 →
          </a>
          <a
            href="#services"
            style={{
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
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#888888";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1f1f1f";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            프로그램 살펴보기
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.7rem",
            color: "#444",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, #444, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
