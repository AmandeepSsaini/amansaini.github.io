import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/* Articles are Markdown files in content/articles/, written either by hand or
 * through the Sveltia CMS dashboard at /admin (see public/admin/config.yml),
 * which commits them to the repo. Each push redeploys the static site. */
const DIR = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  description: string;
  tags: string[];
  cover?: string;
  readingMinutes: number;
};

export type Article = ArticleMeta & { html: string };

function load(file: string): (Article & { draft: boolean }) | null {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (!data.title) return null;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date: new Date(data.date ?? Date.now()).toISOString(),
    description: data.description ? String(data.description) : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(words / 230)),
    html: marked.parse(content, { gfm: true, async: false }) as string,
  };
}

function published() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .filter((a): a is NonNullable<typeof a> => !!a && !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllArticles(): ArticleMeta[] {
  return published().map(({ html: _html, draft: _draft, ...meta }) => meta);
}

export function getArticle(slug: string): Article | undefined {
  return published().find((a) => a.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
