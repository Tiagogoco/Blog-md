import Link from "next/link";
import { getPostsByTag } from "@/application/getPostsByTag";
import { PostCard } from "@/components/PostCard";
import { createPostRepository } from "@/infrastructure/createPostRepository";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const repo = createPostRepository();
  const posts = await getPostsByTag(repo, decodeURIComponent(tag));
  const decodedTag = decodeURIComponent(tag);

  return (
    <main className="main-shell">
      <section className="panel px-6 py-8 sm:px-10 sm:py-10">
        <Link href="/" className="eyebrow inline-block">
          Volver al inicio
        </Link>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Etiqueta</p>
            <h1 className="page-title mt-2">#{decodedTag}</h1>
          </div>
          <p className="text-sm text-slate-400">
            {posts.length} post{posts.length === 1 ? "" : "s"} relacionado
            {posts.length === 1 ? "" : "s"}.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
        {posts.length === 0 && (
          <div className="panel px-6 py-8 text-center text-slate-300">
            No hay posts con este tag.
          </div>
        )}
      </section>
    </main>
  );
}
