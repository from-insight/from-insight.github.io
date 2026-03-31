import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logoImage from "~/welcome/frominsight_ci.png";

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
        backgroundColor: scrolled ? "rgba(255,250,246,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #ecdcd5" : "1px solid transparent",
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
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#6f625c", 
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#201815")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6f625c")}
          >
            {label}
          </a>
        ))}
        {/* <a
          href="https://discord.com/invite/TKQn6RWaGX"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#201815",
            textDecoration: "none",
            padding: "0.4rem 1rem",
            border: "1px solid #ecdcd5",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.72)",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f44250";
            e.currentTarget.style.background = "rgba(244,66,80,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#ecdcd5";
            e.currentTarget.style.background = "rgba(255,255,255,0.72)";
          }}
        >
          Join Discord
        </a> */}
      </div>
    </motion.nav>
  );
}
