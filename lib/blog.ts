import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content", "blog");

type QA = { q: string; a: string };
export type Post = {
  slug: string;
  lang: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  cover: string;
  tags: string[];
  answer: string;
  faq: QA[];
  content: string;
};

export async function getAllSlugs(): Promise<{ slug: string; date: string }[]> {
  const dir = path.join(ROOT, "en"); // slugs identiques EN/FR → une langue de référence suffit
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return []; // dossier absent → blog vide, on ne casse pas le build
  }
  const out = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const { data } = matter(await fs.readFile(path.join(dir, f), "utf8"));
        return { slug: f.replace(/\.mdx$/, ""), date: data.date as string };
      })
  );
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(locale: string, slug: string): Promise<Post> {
  const file = path.join(ROOT, locale, `${slug}.mdx`);
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, ...(data as Omit<Post, "slug" | "content">), content };
}

export async function listPosts(locale: string): Promise<Post[]> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(
    slugs.map(({ slug }) => getPost(locale, slug).catch(() => null))
  );
  return posts.filter((p): p is Post => p !== null);
}
