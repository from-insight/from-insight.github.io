import logoImage from "~/welcome/frominsight_ci.png";

export function Footer() {
  return (
    <footer
      style={{
        padding: "1.7rem 4vw",
        borderTop: "1px solid #ecdcd5",
        background: "rgba(255,255,255,0.55)",
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
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#201815",
            }}
          >
            from<span style={{ color: "#f44250" }}>-</span>insight
          </span>
        </a>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            color: "#8a7771",
            marginTop: "0.4rem",
          }}
        >
          &copy; 2026 from-insight corp. All rights reserved.
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
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#8a7771",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#201815")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8a7771")}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
