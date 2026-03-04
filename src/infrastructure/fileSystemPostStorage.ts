import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SLUG_PATTERN = /^[a-z0-9-]+$/i;

type EditablePostInput = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
};

function assertValidSlug(slug: string): void {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error("Invalid slug");
  }
}

function toPostPath(slug: string): string {
  assertValidSlug(slug);
  return path.join(POSTS_DIR, `${slug}.md`);
}

export async function deletePostFile(slug: string): Promise<void> {
  const postPath = toPostPath(slug);
  await fs.unlink(postPath);
}

export async function postFileExists(slug: string): Promise<boolean> {
  const postPath = toPostPath(slug);
  try {
    await fs.access(postPath);
    return true;
  } catch {
    return false;
  }
}

export async function updatePostFile(input: EditablePostInput): Promise<void> {
  const postPath = toPostPath(input.slug);
  const nextFile = matter.stringify(input.content.trim(), {
    title: input.title.trim(),
    date: input.date.trim(),
    tags: input.tags,
    excerpt: input.excerpt.trim(),
  });
  await fs.writeFile(postPath, nextFile, "utf8");
}

export async function createPostFile(input: EditablePostInput): Promise<void> {
  const postPath = toPostPath(input.slug);
  const nextFile = matter.stringify(input.content.trim(), {
    title: input.title.trim(),
    date: input.date.trim(),
    tags: input.tags,
    excerpt: input.excerpt.trim(),
  });
  await fs.writeFile(postPath, nextFile, { encoding: "utf8", flag: "wx" });
}
