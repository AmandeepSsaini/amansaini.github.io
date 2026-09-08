import { Nav, Cursor, ScrollProgress } from "@/components/Chrome";
import { Hero } from "@/components/Hero";
import { Architecture } from "@/components/Architecture";
import { WorkGrid } from "@/components/WorkGrid";
import { Chapter, Counter, Reveal } from "@/components/Motion";
import { profile, stats, marquee } from "@/content/profile";
import { experience, education, certifications } from "@/content/experience";
import { skillGroups } from "@/content/skills";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <Hero />

      {/* MARQUEE */}
      <div className="mq">
        <div className="mq-t">
          {[...marquee, ...marquee].map((m, i) => (<span key={i}>{m}</span>))}
        </div>
      </div>

      {/* NUMBERS */}
      <section style={{ padding: 0 }}>
        <div className="wrap">
          <div className="nums">
            {stats.map((s, i) => (
              <Reveal key={s.label} className="num" delay={i * 0.08}>
                <h3>
                  <Counter to={s.value} prefix={"prefix" in s ? s.prefix : ""} />
                  <sup>{s.suffix}</sup>
                </h3>
                <p>{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <Chapter num="01" label="Colophon">
            Who is<br /><span className="out">writing this</span>
          </Chapter>
          <div className="ab">
            <Reveal className="ab-l">
              <h3>
                Engineer first.<br />
                Architect by <i>necessity.</i><br />
                Tech lead by choice.
              </h3>
            </Reveal>
            <Reveal className="ab-r" delay={0.1}>
              {profile.summary.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: i === 0 ? boldFirst(p) : p }} />
              ))}
              <div className="facts">
                {profile.facts.map((f) => (
                  <div className="fact" key={f.k}><b>{f.k}</b><span>{f.v}</span></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture">
        <div className="wrap">
          <Chapter num="02" label="AI systems">
            The agents I<br /><span className="acc">actually shipped</span>
          </Chapter>
          <Reveal as="p" className="lede">
            The agent orchestration platform I architected at Thryv — a multi-tenant service where
            product teams register and run their own LLM agents. <em>Hover any node</em> to see what
            it does.
          </Reveal>
          <Reveal><Architecture /></Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="wrap">
          <Chapter num="03" label="Curriculum">
            Ten years,<br /><span className="out">abbreviated</span>
          </Chapter>
          <div className="xp">
            {experience.map((r, i) => (
              <Reveal key={r.company + r.period} className="xp-i" delay={Math.min(i * 0.05, 0.2)}>
                <div>
                  <div className="xp-y">{r.period}</div>
                  <div className="xp-loc">{r.location}</div>
                </div>
                <div>
                  <h3>{r.title}</h3>
                  <div className="xp-c">
                    {r.company}{r.note ? ` — ${r.note}` : ""}
                  </div>
                  <ul>{r.bullets.map((b, k) => (<li key={k}>{b}</li>))}</ul>
                </div>
                <div className="tags">
                  {r.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="edu">
            {education.map((e, i) => (
              <Reveal key={i} className="edu-i" delay={i * 0.08}>
                <h4>{e.degree}</h4>
                {e.school && <p>{e.school}</p>}
                <span>{e.year}</span>
              </Reveal>
            ))}
            {certifications.map((c) => (
              <Reveal key={c} className="edu-i" delay={0.16}>
                <h4>Certification</h4>
                <p>{c}</p>
                <span>LinkedIn Learning</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="wrap">
          <Chapter num="04" label="Selected work">
            Things I built<br /><span className="acc">and shipped</span>
          </Chapter>
          <WorkGrid />
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Chapter num="05" label="Apparatus">
            Tools of<br />the trade
          </Chapter>
          <div className="sk">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} className="sk-g" delay={Math.min(i * 0.05, 0.2)}>
                <b>{g.label}</b>
                <div className="sk-l">
                  {g.items.map((s) => (<span key={s}>{s}</span>))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="cta">
        <div className="wrap">
          <div className="chap-n" style={{ marginBottom: 28 }}><b>06</b> — Correspondence</div>
          <h2>
            <Reveal as="span" variant="wipe">Let&apos;s build</Reveal>
            <Reveal as="span" variant="wipe" delay={0.1} className="out">something</Reveal>
            <Reveal as="span" variant="wipe" delay={0.2} className="acc">hard.</Reveal>
          </h2>
          <div className="cta-r">
            <a className="cta-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span></a>
              <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span></a>
              <a className="btn fill" href={profile.resume} download><span>Download résumé</span></a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap f-in">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.locationShort} · {profile.role}</span>
          <span><a href="#top">Back to top ↑</a></span>
        </div>
      </footer>
    </>
  );
}

/* Bold the opening clause of the first paragraph, editorial-style. */
function boldFirst(text: string) {
  const cut = text.indexOf("—");
  if (cut < 0) return text;
  return `<strong>${text.slice(0, cut)}</strong>${text.slice(cut)}`;
}
