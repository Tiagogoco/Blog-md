import type { Post } from "./post";

export interface PostRepository {
  list(): Promise<Post[]>;
  getBySlug(slug: string): Promise<Post | null>;
}
