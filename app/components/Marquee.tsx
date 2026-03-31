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
        borderTop: "1px solid #1f1f1f",
        borderBottom: "1px solid #1f1f1f",
        padding: "1rem 0",
        overflow: "hidden",
        background: "#0d0d0d",
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
              color: "#444444",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
            <span style={{ color: "#1f1f1f", fontSize: "1rem" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
