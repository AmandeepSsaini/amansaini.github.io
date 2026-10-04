import type { Metadata } from "next";
import { Nav, Cursor, ScrollProgress } from "@/components/Chrome";
import { Chapter, Reveal } from "@/components/Motion";
import { Footer } from "@/components/Footer";
import { getAllArticles, formatDate } from "@/content/articles";
import { SITE_URL } from "@/content/site";

const description = "Writing on LLM agents, retrieval, and front-end architecture.";

export const metadata: Metadata = {
  title: "Articles",
  description,
  alternates: { canonical: `${SITE_URL}/articles/` },
  openGraph: { title: "Articles", description, url: `${SITE_URL}/articles/` },
};

export default function ArticlesIndex() {
  const articles = getAllArticles();
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <section className="art-top">
        <div className="wrap">
          <Chapter num="05" label="Writing">
            Notes from<br /><span className="acc">the work</span>
          </Chapter>
          <Reveal as="p" className="lede">{description}</Reveal>
          <div className="art-list">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={Math.min(i * 0.05, 0.2)}>
                <a className="art-i" href={`/articles/${a.slug}/`}>
                  <div className="xp-y">{formatDate(a.date)}<br />{a.readingMinutes} min read</div>
                  <div>
                    <h3>{a.title}</h3>
                    {a.description && <p>{a.description}</p>}
                  </div>
                  <div className="tags">
                    {a.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
