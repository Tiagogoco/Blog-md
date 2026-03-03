import type { Post } from "@/domain/post";
import type { PostRepository } from "@/domain/postRepository";
import { sortPostsByDate } from "@/application/sortPostsByDate";

export async function getPostsByTag(
  repo: PostRepository,
  tag: string,
): Promise<Post[]> {
  const all = await repo.list();
  const t = tag.toLowerCase();
  return sortPostsByDate(
    all.filter((p) => p.tags.some((x) => x.toLowerCase() === t)),
  );
}
