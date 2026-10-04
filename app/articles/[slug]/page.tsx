import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav, Cursor, ScrollProgress } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { getAllArticles, getArticle, formatDate } from "@/content/articles";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const url = `${SITE_URL}/articles/${a.slug}/`;
  const images = a.cover ? [`${SITE_URL}${a.cover}`] : [`${SITE_URL}/og.png`];
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: a.title, description: a.description, publishedTime: a.date, images },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images },
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    url: `${SITE_URL}/articles/${a.slug}/`,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    ...(a.cover && { image: `${SITE_URL}${a.cover}` }),
  };

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <section className="art-top">
        <div className="wrap">
          <header className="art-h">
            <a className="art-back" href="/articles/">← All articles</a>
            <h1>{a.title}</h1>
            {a.description && <p className="art-dek">{a.description}</p>}
            <div className="art-meta">
              <span>{formatDate(a.date)}</span>
              <span>{a.readingMinutes} min read</span>
              {a.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}
            </div>
          </header>
          {a.cover && <img className="art-cover" src={a.cover} alt="" />}
          <article className="prose-a" dangerouslySetInnerHTML={{ __html: a.html }} />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer />
    </>
  );
}
