import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "@/domain/post";
import type { PostRepository } from "@/domain/postRepository";

type Frontmatter = {
  title?: unknown;
  date?: unknown;
  tags?: unknown;
  excerpt?: unknown;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function ensureString(v: unknown, field: string): string {
  if (typeof v !== "string" || v.trim().length === 0) {
    throw new Error(
      `Invalid frontmatter: "${field}" must be a non-empty string`,
    );
  }
  return v.trim();
}

function ensureStringArray(v: unknown, field: string): string[] {
  if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) {
    throw new Error(`Invalid frontmatter: "${field}" must be string[]`);
  }
  return v.map((s) => s.trim()).filter(Boolean);
}

function toSlug(filename: string): string {
  return filename.replace(/\.md$/i, "");
}

function parsePost(slug: string, raw: string): Post {
  const parsed = matter(raw);
  const fm = parsed.data as Frontmatter;

  const title = ensureString(fm.title, "title");
  const date = ensureString(fm.date, "date");
  const tags = fm.tags === undefined ? [] : ensureStringArray(fm.tags, "tags");
  const excerpt =
    fm.excerpt === undefined ? "" : ensureString(fm.excerpt, "excerpt");

  return {
    slug,
    title,
    date,
    tags,
    excerpt,
    content: parsed.content.trim(),
  };
}

export class FileSystemPostRepository implements PostRepository {
  async list(): Promise<Post[]> {
    const files = await fs.readdir(POSTS_DIR);
    const mdFiles = files.filter((f) => f.toLowerCase().endsWith(".md"));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = toSlug(file);
        const fullPath = path.join(POSTS_DIR, file);
        const raw = await fs.readFile(fullPath, "utf8");
        return parsePost(slug, raw);
      }),
    );
    return posts;
  }

  async getBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(POSTS_DIR, `${slug}.md`);
    try {
      const raw = await fs.readFile(fullPath, "utf8");
      return parsePost(slug, raw);
    } catch {
      return null;
    }
  }
}
