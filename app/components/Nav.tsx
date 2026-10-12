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
        backgroundColor: scrolled ? "rgba(243,244,247,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #DDE0E4" : "1px solid transparent",
        transition: "background-color 0.3s, backdrop-filter 0.3s, border-color 0.3s",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.55rem",
        }}
      >
        
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "1rem",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#191E28",
          }}
        >
          from<span style={{ color: "#696E76" }}>-</span>insight
        </span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {[
          { label: "In Practice", href: "#services" },
          { label: "Proven", href: "#story" },
          { label: "Experts", href: "#experts" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#424852", 
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#191E28")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#424852")}
          >
            {label}
          </a>
        ))}
        {/* <a
          href="https://discord.com/invite/TKQn6RWaGX"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#191E28",
            textDecoration: "none",
            padding: "0.4rem 1rem",
            border: "1px solid #DDE0E4",
            borderRadius: "7px",
            background: "#FFFFFF",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#191E28";
            e.currentTarget.style.background = "#E9EBEF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#DDE0E4";
            e.currentTarget.style.background = "#FFFFFF";
          }}
        >
          Join Discord
        </a> */}
      </div>
    </motion.nav>
  );
}
