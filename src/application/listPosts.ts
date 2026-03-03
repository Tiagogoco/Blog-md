import type { Post } from "@/domain/post";
import type { PostRepository } from "@/domain/postRepository";
import { sortPostsByDate } from "@/application/sortPostsByDate";

export async function listPosts(repo: PostRepository): Promise<Post[]> {
  return sortPostsByDate(await repo.list());
}
