"use client";

import { useEffect, useRef } from "react";

type Node = {
  id: string; l: string; x: number; y: number;
  bx: number; by: number; px: number; py: number;
  ox: number; oy: number; ph: number; pulse: number;
};
type Edge = { a: number; b: number; mx: number; my: number };
type Packet = { e: Edge; t: number; sp: number; c: "p1" | "p2"; dead?: boolean };

/* Hub-and-spoke view of the agent-orchestration service: the orchestrator at the
   centre, every capability it coordinates arranged around it. */
const LAYOUT = [
  { id: "orch", x: 0.50, y: 0.50, l: "ORCHESTRATOR" },
  { id: "chat", x: 0.50, y: 0.19, l: "AI CHAT" },
  { id: "reg", x: 0.80, y: 0.29, l: "REGISTRY" },
  { id: "mcp", x: 0.87, y: 0.56, l: "MCP" },
  { id: "rag", x: 0.71, y: 0.80, l: "MEMORY RAG" },
  { id: "llm", x: 0.29, y: 0.80, l: "LLM" },
  { id: "obs", x: 0.13, y: 0.56, l: "TRACING" },
  { id: "res", x: 0.20, y: 0.29, l: "RESPONSE" },
];
const EDGES: [string, string][] = [
  ["chat", "orch"], ["orch", "reg"], ["orch", "mcp"], ["orch", "rag"],
  ["orch", "llm"], ["orch", "obs"], ["orch", "res"],
  ["mcp", "rag"], ["rag", "llm"], ["res", "chat"], ["reg", "mcp"],
];

export function AgentGraph() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, t = 0, acc = 0, visible = true;
    let nodes: Node[] = [], edges: Edge[] = [], packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };

    const theme = {
      line: "", node: "", stroke: "", label: "",
      p1: "", p2: "", halo: "", blur: 12, ac: "",
    };
    const readTheme = () => {
      const s = getComputedStyle(document.documentElement);
      const g = (k: string) => s.getPropertyValue(k).trim();
      theme.line = g("--canvas-line");
      theme.node = g("--canvas-node");
      theme.stroke = g("--canvas-node-stroke");
      theme.label = g("--canvas-label");
      theme.p1 = g("--canvas-p1");
      theme.p2 = g("--canvas-p2");
      theme.halo = g("--canvas-halo");
      theme.blur = parseFloat(g("--canvas-blur")) || 10;
      theme.ac = g("--ac");
    };
    readTheme();

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = LAYOUT.map((n, i) => ({
        ...n, bx: n.x * W, by: n.y * H, px: n.x * W, py: n.y * H,
        ox: 0, oy: 0, ph: i * 1.3, pulse: 0,
      }));
      edges = EDGES.map(([a, b]) => ({
        a: nodes.findIndex((n) => n.id === a),
        b: nodes.findIndex((n) => n.id === b),
        mx: 0, my: 0,
      }));
      packets = [];
    };
    size();

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += 0.01;
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.ox = Math.sin(t * 0.8 + n.ph) * 6;
        n.oy = Math.cos(t * 0.62 + n.ph) * 5;
        const dx = n.bx + n.ox - mouse.x, dy = n.by + n.oy - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) {
          const f = ((120 - d) / 120) * 20;
          n.ox += (dx / d) * f; n.oy += (dy / d) * f;
        }
        n.px = n.bx + n.ox; n.py = n.by + n.oy;
        n.pulse *= 0.94;
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = theme.line;
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        e.mx = (a.px + b.px) / 2;
        e.my = (a.py + b.py) / 2 - Math.abs(b.px - a.px) * 0.06;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.quadraticCurveTo(e.mx, e.my, b.px, b.py);
        ctx.stroke();
      }

      if (!reduce) {
        acc++;
        if (acc % 14 === 0 && edges.length) {
          packets.push({
            e: edges[Math.floor(Math.random() * edges.length)],
            t: 0, sp: 0.006 + Math.random() * 0.006,
            c: Math.random() > 0.72 ? "p2" : "p1",
          });
          if (packets.length > 46) packets.shift();
        }
      }

      for (const p of packets) {
        p.t += p.sp;
        const a = nodes[p.e.a], b = nodes[p.e.b], k = p.t;
        if (k >= 1) { p.dead = true; b.pulse = 1; continue; }
        const u = 1 - k;
        const x = u * u * a.px + 2 * u * k * p.e.mx + k * k * b.px;
        const y = u * u * a.py + 2 * u * k * p.e.my + k * k * b.py;
        const col = p.c === "p1" ? theme.p1 : theme.p2;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.shadowColor = col; ctx.shadowBlur = theme.blur;
        ctx.fill(); ctx.shadowBlur = 0;
      }
      packets = packets.filter((p) => !p.dead);

      ctx.textAlign = "center";
      ctx.font = '9px var(--font-jetbrains), monospace';
      for (const n of nodes) {
        const r = 6 + n.pulse * 7;
        ctx.beginPath();
        ctx.arc(n.px, n.py, r + 11, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${theme.halo},${(0.045 + n.pulse * 0.13).toFixed(3)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx.fillStyle = theme.node; ctx.fill();
        ctx.strokeStyle = n.pulse > 0.15 ? theme.ac : theme.stroke;
        ctx.lineWidth = 1.2; ctx.stroke();
        ctx.fillStyle = theme.label;
        ctx.fillText(n.l, n.px, n.py - 16);
      }
    };
    draw();

    const ro = new ResizeObserver(size);
    ro.observe(cv);
    const iox = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    iox.observe(cv);

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("mouseout", onLeave);
    addEventListener("themechange", readTheme);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); iox.disconnect();
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onLeave);
      removeEventListener("themechange", readTheme);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
