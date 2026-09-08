"use client";

import { motion } from "motion/react";
import { AgentGraph } from "./AgentGraph";
import { useMagnetic } from "./Motion";
import { profile } from "@/content/profile";

function Line({ text, className, offset }: { text: string; className?: string; offset: number }) {
  return (
    <span className={`ln ${className ?? ""}`}>
      {[...text].map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="ch"
          initial={{ y: "112%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: offset * 0.09 + i * 0.03 }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const primary = useMagnetic<HTMLAnchorElement>();
  const secondary = useMagnetic<HTMLAnchorElement>();

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-top">
          <span>Portfolio — 2026</span>
          <span className="av"><i />{profile.available}</span>
          <span>{profile.locationShort}</span>
        </div>
      </div>

      <div className="wrap">
        <div className="hero-grid">
          {/* ---- identity ---- */}
          <div>
            <motion.div
              className="h-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Hello — I&apos;m
            </motion.div>

            <h1 className="big">
              <Line text="AMANDEEP" offset={0} />
              <Line text="SINGH SAINI" offset={1} className="out" />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-role">
                <strong>{profile.role}</strong>
                <span className="at">building agent platforms in SaaS</span>
              </div>

              <p className="h-copy">
                I build and orchestrate <em>multi-agent AI systems.</em> Ten-plus years shipping
                full-stack platforms across SaaS, fintech and enterprise — now designing the agent
                runtimes, MCP tool servers and RAG pipelines that put them into production.
              </p>

              <div className="h-btns">
                <a href="#work" className="btn fill" ref={primary}>
                  <span>Selected work</span><span>→</span>
                </a>
                <a href={profile.resume} className="btn" ref={secondary} download>
                  <span>Résumé</span>
                </a>
                <a href="#contact" className="btn"><span>Hire me</span></a>
              </div>
            </motion.div>
          </div>

          {/* ---- live architecture ---- */}
          <motion.div
            className="graph-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gp-bar">
              <span>Agent Orchestration</span>
              <span className="live"><i />Live</span>
            </div>
            <AgentGraph />
            <div className="gp-foot">Hub-and-spoke runtime · shipped in production</div>
          </motion.div>
        </div>
      </div>

      <div className="wrap">
        <div className="hero-bot">
          <span><b>10+</b> years shipping</span>
          <span><b>React · Vue 3 · TypeScript · Python</b></span>
          <span><b>LLM agents · MCP · RAG</b></span>
          <span>{profile.locationShort} — open to remote</span>
        </div>
      </div>
    </header>
  );
}
