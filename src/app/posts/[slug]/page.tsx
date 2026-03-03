import Link from "next/link";
import { getPostBySlug } from "@/application/getPostBySlug";
import { createPostRepository } from "@/infrastructure/createPostRepository";
import { markdownToHtml } from "@/infrastructure/markdowntoHtml";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repo = createPostRepository();
  const post = await getPostBySlug(repo, slug);

  if (!post) {
    return (
      <main className="main-shell">
        <section className="panel px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="section-title text-2xl">Post no encontrado.</p>
          <div className="mt-5">
            <Link href="/" className="action-link">
              Volver
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const html = await markdownToHtml(post.content);

  return (
    <main className="main-shell">
      <section className="panel px-6 py-8 sm:px-10 sm:py-10">
        <Link href="/" className="eyebrow inline-block">
          Volver al inicio
        </Link>
        <header className="mt-5 border-b border-white/10 pb-6">
          <p className="eyebrow">Publicacion</p>
          <h1 className="page-title mt-3">{post.title}</h1>
          <p className="muted-text mt-4 text-sm">{post.date}</p>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link key={t} href={`/tags/${encodeURIComponent(t)}`}>
              <span className="tag-chip">{t}</span>
            </Link>
          ))}
        </div>

        <article
          className="markdown-content mt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </main>
  );
}
