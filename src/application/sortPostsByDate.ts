import type { Post } from "@/domain/post";

export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}
