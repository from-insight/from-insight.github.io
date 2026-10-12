import { useHeadlineFit } from "~/hooks/useHeadlineFit";
import { motion } from "framer-motion";
import logoImage from "~/welcome/frominsight_ci.png";

export function Hero() {
  // "FROM INSIGHT" fills the viewport width the way "JOIN US" does: one line
  // on web, wrapping to two centered lines on narrow screens.
  const romScale = 0.42; // ROM and INSIGHT share this smaller size
  const gapEm = 0.34; // space between ROM and INSIGHT, in small-type em
  const { rowRef, line1Ref, line2Ref, size, twoLine } = useHeadlineFit(
    romScale,
    0.86,
    760,
    gapEm
  );
  // DM Sans: cap top sits ~0.141em below a line-height:1 box top. Offset the
  // smaller type so its cap line meets F's, expressed in its own em so it
  // scales with the row.
  const capOffsetEm = (0.141 * (1 - romScale)) / romScale;

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
        
        
        {/* One line on web; wraps to two centered lines below 760px. */}
        <div
          ref={rowRef}
          role="img"
          aria-label="FROM INSIGHT"
          style={{
            display: "flex",
            // Line count follows the breakpoint, not the measured fit, so a
            // sub-pixel drift can never wrap the web layout.
            flexWrap: twoLine ? "wrap" : "nowrap",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            fontSize: `${size}px`,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#191E28",
            userSelect: "none",
          }}
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexBasis: twoLine ? "100%" : "auto",
            }}
          >
            {/* Shrinks to content so the fit hook can measure it. */}
            <span
              ref={line1Ref}
              style={{ display: "flex", alignItems: "flex-start", whiteSpace: "nowrap" }}
            >
              <span style={{ fontSize: "1em" }}>F</span>
              <span
                style={{
                  fontSize: `${romScale}em`,
                  marginTop: `${capOffsetEm}em`,
                  marginLeft: "0.04em",
                }}
              >
                R<span style={{ color: "#f44250" }}>O</span>M
              </span>
            </span>
          </motion.span>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexBasis: twoLine ? "100%" : "auto",
              fontSize: `${romScale}em`,
              marginTop: twoLine ? "0.1em" : `${capOffsetEm}em`,
              marginLeft: twoLine ? 0 : `${gapEm}em`,
            }}
          >
            <span ref={line2Ref} style={{ whiteSpace: "nowrap" }}>
              INSIGHT
            </span>
          </motion.span>
        </div>        

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          style={{ marginTop: "2.5rem", maxWidth: "640px" }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontWeight: 700,
              color: "#191E28",
              marginBottom: "0.5rem",
            }}
          >
            프롬인사이트, 인사이트에서 인텔리전스로
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "#424852",
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
              border: "1px solid #CED1D7",
              color: "#191E28",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              borderRadius: "7px",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#191E28";
              e.currentTarget.style.background = "#E9EBEF";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#CED1D7";
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
              background: "#191E28",
              border: "1px solid transparent",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              borderRadius: "7px",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2C333F";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#191E28";
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
