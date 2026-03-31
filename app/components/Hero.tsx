import { useViewportText } from "~/hooks/useViewportText";
import { motion } from "framer-motion";
import logoImage from "~/welcome/frominsight_ci.png";

export function Hero() {
  const fromSize = useViewportText("FROM", "Syne", "900", 0.88);
  const insightSize = useViewportText("INSIGHT", "Syne", "900", 0.88);

  return (
    <section
      id="hero"
      style={{
        minHeight: "clamp(680px, 84vh, 920px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "5.5rem 5vw 2.5rem",
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
            "linear-gradient(rgba(236,220,213,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(236,220,213,0.75) 1px, transparent 1px)",
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
            "radial-gradient(ellipse, rgba(244,66,80,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Canvas-fill headline — each word fills viewport width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          style={{
            marginTop: "1.25rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logoImage}
            alt="from-insight corporate identity"
            style={{
              display: "block",
              width: "clamp(88px, 10vw, 132px)",
              height: "auto",              
            }}
          />
        </motion.div>
        
        
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
              color: "#201815",
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
              display: "inline-block",
              width: "max-content",
              fontFamily: "Syne, sans-serif",
              fontWeight: 900,
              fontSize: `${insightSize}px`,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #f44250 0%, #ff8a7a 100%)",
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
              color: "#201815",
              marginBottom: "0.5rem",
            }}
          >
            프롬인사이트, 인사이트에서 인텔리전스로
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "#6f625c",
              lineHeight: 1.7,
            }}
          >
            실전 핀테크 창업 경험과 학문적 깊이를 결합한 AI 컨설팅
            <br />
            현장에서 쓰이는 기술을 직접 알려드립니다.
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
            href="#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.75rem 1.75rem",
              border: "1px solid #f1c9c3",
              color: "#201815",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f44250";
              e.currentTarget.style.background = "rgba(244,66,80,0.06)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#f1c9c3";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            프로그램 살펴보기
          </a>

          <a
            href="https://discord.com/invite/TKQn6RWaGX"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              background: "linear-gradient(135deg, #f44250, #ff8a7a)",
              border: "1px solid transparent",
              color: "#fffdfb",
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
        </motion.div>
      </div>
      
    </section>
  );
}
