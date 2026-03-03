import type { Post } from "@/domain/post";
import type { PostRepository } from "@/domain/postRepository";

export async function getPostBySlug(
  repo: PostRepository,
  slug: string,
): Promise<Post | null> {
  return repo.getBySlug(slug);
}
