"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { profile } from "@/content/profile";

const LINKS = [
  ["#about", "01 / About"],
  ["#architecture", "02 / AI Systems"],
  ["#experience", "03 / Experience"],
  ["#work", "04 / Work"],
];

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const el = document.documentElement;
    setTheme((el.getAttribute("data-theme") as "dark" | "light") || "dark");

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try { stored = localStorage.getItem("theme"); } catch {}
      if (stored) return; // an explicit choice always wins
      const next = e.matches ? "light" : "dark";
      el.setAttribute("data-theme", next);
      setTheme(next);
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  const toggle = () => {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "light" ? "dark" : "light";
    el.classList.add("theming");
    el.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
    window.dispatchEvent(new CustomEvent("themechange"));
    setTimeout(() => el.classList.remove("theming"), 520);
  };

  return { theme, toggle };
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return <motion.div className="prog" style={{ scaleX: x }} />;
}

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      const hot = (e.target as HTMLElement)?.closest?.("a,button,.wc,.n-box,.xp-i,.num");
      ring.current?.classList.toggle("on", !!hot);
    };
    const loop = () => {
      cx += (x - cx) * 0.16; cy += (y - cy) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move, { passive: true });
    loop();
    return () => { removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (<><div className="cur" ref={ring} /><div className="cur-d" ref={dot} /></>);
}

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [clock, setClock] = useState("");
  const { toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setStuck(scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour12: false, timeZone: profile.timezone,
        }) + ` ${profile.tzLabel}`
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => { removeEventListener("scroll", onScroll); clearInterval(id); };
  }, []);

  return (
    <nav className={`nav${stuck ? " stuck" : ""}`}>
      <div className="nav-in">
        <a className="brand" href="#top"><i />{profile.name}</a>
        <div className="nav-l">
          {LINKS.map(([href, label]) => (<a key={href} href={href}>{label}</a>))}
        </div>
        <div className="nav-r">
          <span className="nav-clock" suppressHydrationWarning>{clock || "—"}</span>
          <button className="tgl" onClick={toggle} aria-label="Toggle colour theme">
            <i className="m">☾</i><i className="s">☀</i><b />
          </button>
          <a className="nav-cta" href="#contact">Hire me</a>
        </div>
      </div>
    </nav>
  );
}
