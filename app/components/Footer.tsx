import logoImage from "~/welcome/frominsight_ci.png";

export function Footer() {
  return (
    <footer
      style={{
        padding: "1.7rem 4vw",
        borderTop: "1px solid #DDE0E4",
        background: "#FFFFFF",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
      }}
    >
      <div>
        <a
          href="#hero"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.55rem",
          }}
        >
          <img
            src={logoImage}
            alt="from-insight"
            style={{
              display: "block",
              height: "26px",
              width: "auto",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#191E28",
            }}
          >
            from<span style={{ color: "#696E76" }}>-</span>insight
          </span>
        </a>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#696E76",
            marginTop: "0.4rem",
          }}
        >
          &copy; 2026 from-insight corp. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            color: "#9BA1AA",
            marginTop: "0.25rem",
          }}
        >
          프롬인사이트 · from-insight · from insight · frominsight
        </p>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {[
          { label: "In Practice", href: "#services"  },
          { label: "Proven", href: "#story" },
          { label: "Keep in Touch", href: "https://discord.com/invite/TKQn6RWaGX" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#696E76",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#191E28")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#696E76")}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
