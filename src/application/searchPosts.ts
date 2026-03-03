import type { Post } from "@/domain/post";
import type { PostRepository } from "@/domain/postRepository";
import { sortPostsByDate } from "@/application/sortPostsByDate";

export async function searchPosts(
  repo: PostRepository,
  query: string,
): Promise<Post[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await repo.list();
  return sortPostsByDate(
    all.filter((p) => {
      const hay = `${p.title} ${p.excerpt}`.toLowerCase();
      return hay.includes(q);
    }),
  );
}
