"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPostFile,
  deletePostFile,
  postFileExists,
  updatePostFile,
} from "@/infrastructure/fileSystemPostStorage";

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 70);
}

async function uniqueSlug(base: string): Promise<string> {
  const safeBase = base || "nota";
  let candidate = safeBase;
  let suffix = 2;

  while (await postFileExists(candidate)) {
    candidate = `${safeBase}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export async function createPostAction(formData: FormData): Promise<void> {
  const title = formData.get("title");
  const date = formData.get("date");
  const tags = formData.get("tags");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  const inputSlug = formData.get("slug");

  if (
    typeof title !== "string" ||
    typeof date !== "string" ||
    typeof tags !== "string" ||
    typeof excerpt !== "string" ||
    typeof content !== "string" ||
    typeof inputSlug !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  const requestedSlug = slugify(inputSlug);
  const generatedSlug = slugify(title);
  const slug = await uniqueSlug(requestedSlug || generatedSlug);

  await createPostFile({
    slug,
    title,
    date,
    tags: parseTags(tags),
    excerpt,
    content,
  });

  revalidatePath("/", "layout");
  redirect(`/posts/${slug}`);
}

export async function deletePostAction(formData: FormData): Promise<void> {
  const slug = formData.get("slug");
  if (typeof slug !== "string" || slug.trim().length === 0) {
    throw new Error("Missing slug");
  }

  await deletePostFile(slug.trim());

  revalidatePath("/", "layout");
  redirect("/");
}

export async function updatePostAction(formData: FormData): Promise<void> {
  const slug = formData.get("slug");
  const title = formData.get("title");
  const date = formData.get("date");
  const tags = formData.get("tags");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");

  if (
    typeof slug !== "string" ||
    typeof title !== "string" ||
    typeof date !== "string" ||
    typeof tags !== "string" ||
    typeof excerpt !== "string" ||
    typeof content !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await updatePostFile({
    slug: slug.trim(),
    title,
    date,
    tags: parseTags(tags),
    excerpt,
    content,
  });

  revalidatePath("/", "layout");
  redirect(`/posts/${slug.trim()}`);
}
