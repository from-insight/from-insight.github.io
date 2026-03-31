import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1f1f1f" : "1px solid transparent",
        transition: "background-color 0.3s, backdrop-filter 0.3s, border-color 0.3s",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "1.1rem",
          letterSpacing: "-0.02em",
          color: "#f5f5f5",
          textDecoration: "none",
        }}
      >
        from<span style={{ color: "#7c3aed" }}>-</span>insight
      </a>

      {/* Links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {[
          { label: "Services", href: "#services" },
          { label: "About", href: "#story" },
          { label: "Community", href: "#community" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              color: "#888888",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
          >
            {label}
          </a>
        ))}
        <a
          href="https://discord.com/invite/TKQn6RWaGX"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#f5f5f5",
            textDecoration: "none",
            padding: "0.4rem 1rem",
            border: "1px solid #1f1f1f",
            borderRadius: "999px",
            background: "transparent",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7c3aed";
            e.currentTarget.style.background = "rgba(124,58,237,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1f1f1f";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Join Discord
        </a>
      </div>
    </motion.nav>
  );
}
