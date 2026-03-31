export function Footer() {
  return (
    <footer
      style={{
        padding: "3rem 5vw",
        borderTop: "1px solid #1f1f1f",
        background: "#080808",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
      }}
    >
      <div>
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            color: "#f5f5f5",
          }}
        >
          from<span style={{ color: "#7c3aed" }}>-</span>insight
        </span>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            color: "#444",
            marginTop: "0.4rem",
          }}
        >
          © 2025 from-insight corp. All rights reserved.
        </p>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {[
          { label: "About", href: "#story"  },
          { label: "Services", href: "#services" },
          { label: "Discord", href: "https://discord.com/invite/TKQn6RWaGX" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8rem",
              color: "#555",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
