import type { PostRepository } from "@/domain/postRepository";
import { FileSystemPostRepository } from "@/infrastructure/fileSystemPostRepository";

export function createPostRepository(): PostRepository {
  return new FileSystemPostRepository();
}
