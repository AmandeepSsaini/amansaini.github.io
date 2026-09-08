"use client";

import { useEffect, useState } from "react";
import { archNodes, archEdges, logLines, type NodeSpec } from "@/content/work";

const byId = Object.fromEntries(archNodes.map((n) => [n.id, n])) as Record<string, NodeSpec>;

function edgePath(a: NodeSpec, b: NodeSpec) {
  const A = { r: a.x + a.w, cx: a.x + a.w / 2, cy: a.y + a.h / 2, t: a.y, b: a.y + a.h };
  const B = { l: b.x, cx: b.x + b.w / 2, cy: b.y + b.h / 2, t: b.y, b: b.y + b.h };
  const rightward = B.cx > A.cx;
  const x1 = rightward ? A.r : A.cx;
  const y1 = rightward ? A.cy : B.cy > A.cy ? A.b : A.t;
  const x2 = rightward ? B.l : B.cx;
  const y2 = rightward ? B.cy : B.cy > A.cy ? B.t : B.b;
  const mid = (x1 + x2) / 2;
  return `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`;
}

export function Architecture() {
  const [active, setActive] = useState<string>("orch");
  const [lines, setLines] = useState<string[]>([]);
  const node = byId[active];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(logLines.slice(0, 5).map(([a, b], i) =>
        `<b>[${String(i + 1).padStart(4, "0")}]</b> ${a.padEnd(5, " ")} · ${b}`));
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      const [a, b] = logLines[i % logLines.length];
      const row = `<b>[${String(++i).padStart(4, "0")}]</b> ${a.padEnd(5, " ")} · ${b}`;
      setLines((prev) => [...prev, row].slice(-6));
    }, 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="arch">
      <div className="arch-bar">
        <span className="dot g" /><span className="dot" /><span className="dot" />
        <span style={{ marginLeft: 12 }}>
          agent-orchestration-service · multi-tenant · <span style={{ color: "var(--ac)" }}>healthy</span>
        </span>
      </div>

      <div className="arch-body">
        <div className="arch-svg">
          <svg viewBox="0 0 760 380" role="img" aria-label="Architecture of the agent orchestration service">
            <g>
              {archEdges.map(([a, b], i) => {
                const d = edgePath(byId[a], byId[b]);
                return (
                  <g key={`${a}-${b}`}>
                    <path className="ed" d={d} />
                    <path className="ed-f" d={d} style={{ animationDelay: `${(i * 0.29).toFixed(2)}s` }} />
                  </g>
                );
              })}
            </g>
            <g>
              {archNodes.map((n) => (
                <g
                  key={n.id}
                  className={`n-box${active === n.id ? " act" : ""}`}
                  onClick={() => setActive(n.id)}
                  onMouseEnter={() => setActive(n.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={n.title}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(n.id); }}
                >
                  <rect className="n-rect" x={n.x} y={n.y} width={n.w} height={n.h} rx={4} />
                  <text className="n-t" x={n.x + n.w / 2} y={n.y + n.h / 2 + (n.h > 48 ? -1 : 4)} textAnchor="middle">
                    {n.title.toUpperCase()}
                  </text>
                  {n.h > 48 && (
                    <text className="n-s" x={n.x + n.w / 2} y={n.y + n.h / 2 + 13} textAnchor="middle">
                      {n.kind.toUpperCase()}
                    </text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>

        <aside className="arch-info">
          <h4>{node.title}</h4>
          <div className="sub">{node.kind}</div>
          <p>{node.detail}</p>
          <ul>{node.points.map((p) => (<li key={p}>{p}</li>))}</ul>
        </aside>
      </div>

      <div className="log" aria-hidden="true">
        {lines.map((l, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: l }} />
        ))}
      </div>
    </div>
  );
}
