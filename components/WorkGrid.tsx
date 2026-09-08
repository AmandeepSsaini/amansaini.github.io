"use client";

import { motion } from "motion/react";
import { work } from "@/content/work";
import { rise } from "./Motion";

export function WorkGrid() {
  const spotlight = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="wg">
      {work.map((p, i) => (
        <motion.article
          key={p.id}
          className="wc"
          onMouseMove={spotlight}
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: (i % 2) * 0.08 }}
        >
          <div>
            <div className="wc-n">{p.kicker}</div>
            <h3>{p.title}</h3>
            <p>{p.blurb}</p>
          </div>
          <div className="wc-f">
            <span className="wc-n">{p.stack}</span>
            <span className="wc-at">{p.at}</span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
