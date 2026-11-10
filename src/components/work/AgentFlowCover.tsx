/**
 * Cover for the outreach agent.
 *
 * A drawn diagram rather than a stock image of a glowing brain: it shows
 * the actual pipeline, and the one thing that matters about it — the
 * approval gate sitting between the draft and anything leaving the
 * building — is the element the accent is spent on.
 */
export default function AgentFlowCover({ tall }: { tall: boolean }) {
  const nodes = [
    { x: 24, label: "INBOX", sub: "+ web form" },
    { x: 148, label: "ENRICH", sub: "identify" },
    { x: 272, label: "DRAFT", sub: "past emails" },
    { x: 396, label: "APPROVE", sub: "a person", gate: true },
    { x: 520, label: "SEND", sub: "outbound" },
    { x: 644, label: "RECORD", sub: "logged" },
  ]
  const W = 760
  const H = 300
  const boxW = 100
  const boxH = 52
  const y = 112

  return (
    <div
      className={`relative overflow-hidden border-b border-line bg-sunken ${
        tall ? "aspect-[16/8]" : "aspect-[16/10]"
      }`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Pipeline diagram: inbox and web form, enrich, draft in the tone of the company's past emails, a human approval gate, send, and record. Each record feeds back into the drafts so the tone keeps improving."
      >
        {/* graticule */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line
            key={`v${i}`}
            x1={i * 95}
            y1="0"
            x2={i * 95}
            y2={H}
            stroke="var(--color-line)"
            strokeWidth="0.5"
          />
        ))}

        {/* connectors */}
        {nodes.slice(0, -1).map((n, i) => (
          <g key={`c${i}`}>
            <line
              x1={n.x + boxW}
              y1={y + boxH / 2}
              x2={nodes[i + 1]!.x}
              y2={y + boxH / 2}
              stroke="var(--color-line-strong)"
              strokeWidth="1.4"
            />
            <polygon
              points={`${nodes[i + 1]!.x - 6},${y + boxH / 2 - 3.6} ${nodes[i + 1]!.x},${y + boxH / 2} ${nodes[i + 1]!.x - 6},${y + boxH / 2 + 3.6}`}
              fill="var(--color-line-strong)"
            />
          </g>
        ))}

        {/* the learning loop, record back into retrieval */}
        <path
          d={`M ${nodes[5]!.x + boxW / 2} ${y + boxH} V 232 H ${nodes[2]!.x + boxW / 2} V ${y + boxH}`}
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <polygon
          points={`${nodes[2]!.x + boxW / 2 - 3.6},${y + boxH + 7} ${nodes[2]!.x + boxW / 2},${y + boxH} ${nodes[2]!.x + boxW / 2 + 3.6},${y + boxH + 7}`}
          fill="var(--color-line-strong)"
        />
        <text
          x={nodes[3]!.x + boxW / 2 + 14}
          y="246"
          textAnchor="middle"
          fill="var(--color-ink-subtle)"
          fontSize="11"
          fontFamily="var(--font-jetbrains), monospace"
          letterSpacing="1.4"
        >
          LEARNS THE TONE FROM WHAT WAS SENT
        </text>

        {/* nodes */}
        {nodes.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y={y}
              width={boxW}
              height={boxH}
              rx="4"
              fill={n.gate ? "var(--color-accent)" : "var(--color-card)"}
              stroke={n.gate ? "var(--color-accent)" : "var(--color-line-strong)"}
              strokeWidth="1.3"
            />
            <text
              x={n.x + boxW / 2}
              y={y + 22}
              textAnchor="middle"
              fill={n.gate ? "#FFFFFF" : "var(--color-ink)"}
              fontSize="13"
              fontWeight="600"
              fontFamily="var(--font-inter-tight), sans-serif"
              letterSpacing="0.6"
            >
              {n.label}
            </text>
            <text
              x={n.x + boxW / 2}
              y={y + 38}
              textAnchor="middle"
              fill={n.gate ? "rgba(255,255,255,0.85)" : "var(--color-ink-subtle)"}
              fontSize="10"
              fontFamily="var(--font-jetbrains), monospace"
            >
              {n.sub}
            </text>
          </g>
        ))}

        {/* the point of the whole thing */}
        <text
          x={nodes[3]!.x + boxW / 2}
          y={y - 16}
          textAnchor="middle"
          fill="var(--color-accent)"
          fontSize="11"
          fontFamily="var(--font-jetbrains), monospace"
          letterSpacing="1.6"
        >
          NOTHING SENDS ITSELF
        </text>

        <text
          x="24"
          y="40"
          fill="var(--color-ink-subtle)"
          fontSize="11"
          fontFamily="var(--font-jetbrains), monospace"
          letterSpacing="2"
        >
          LEAD → OUTREACH, WITH A HUMAN IN THE LOOP
        </text>
      </svg>
    </div>
  )
}
