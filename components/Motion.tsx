"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Editorial wipe — used on section headings. */
export const wipe: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0% 0 0)", opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

/* Standard rise — used on body blocks. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export function Reveal({
  children, variant = "rise", delay = 0, className, as = "div",
}: {
  children: ReactNode;
  variant?: "rise" | "wipe";
  delay?: number;
  className?: string;
  as?: "div" | "h2" | "p" | "span";
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      variants={variant === "wipe" ? wipe : rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}

/* Count-up that only runs when scrolled into view. */
export function Counter({
  to, prefix = "", suffix = "",
}: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0, t0 = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const k = Math.min((ts - t0) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{n.toLocaleString("en-US")}{suffix}</span>;
}

/* Section heading with the scramble-on-hover effect. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

export function Chapter({
  num, label, children,
}: { num: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const busy = useRef(false);

  const scramble = () => {
    const el = ref.current;
    if (!el || busy.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    busy.current = true;
    const original = el.innerHTML;
    const text = el.textContent ?? "";
    let f = 0;
    const id = setInterval(() => {
      f++;
      el.textContent = [...text]
        .map((c, i) => (c === " " ? c : i < f * 1.7 ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      if (f * 1.7 > text.length) {
        clearInterval(id);
        el.innerHTML = original;
        busy.current = false;
      }
    }, 28);
  };

  return (
    <div className="chap">
      <div className="chap-n"><b>{num}</b> — {label}</div>
      <motion.h2
        ref={ref}
        onMouseEnter={scramble}
        variants={wipe}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.h2>
    </div>
  );
}

/* Magnetic hover for buttons. */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform =
        `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    };
    const out = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", out);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", out); };
  }, []);
  return ref;
}
