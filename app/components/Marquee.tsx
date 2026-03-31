const tags = [
  "Frontend Development",
  "React · TypeScript",
  "FinTech Practice",
  "Machine Learning",
  "Data Analysis",
  "Generative AI",
  "LLM Consulting",
  "Python · PyTorch",
  "Algorithmic Trading",
  "Derivatives Pricing",
  "Enterprise AI",
  "Prompt Engineering",
];

export function Marquee() {
  const doubled = [...tags, ...tags];

  return (
    <div
      style={{
        borderTop: "1px solid #ecdcd5",
        borderBottom: "1px solid #ecdcd5",
        padding: "1rem 0",
        overflow: "hidden",
        background: "rgba(255,255,255,0.55)",
      }}
    >
      <div
        className="animate-marquee"
        style={{
          display: "flex",
          gap: "0",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "0 2rem",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#8f7d77",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
            <span style={{ color: "#d9bdb6", fontSize: "1rem" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
