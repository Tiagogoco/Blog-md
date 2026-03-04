import Link from "next/link";
import { getPostBySlug } from "@/application/getPostBySlug";
import { updatePostAction } from "@/app/actions/postActions";
import { createPostRepository } from "@/infrastructure/createPostRepository";

export default async function EditPostPage({
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

  return (
    <main className="main-shell">
      <section className="panel px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Editor</p>
            <h1 className="page-title mt-2">Editar post</h1>
          </div>
          <Link href={`/posts/${post.slug}`} className="action-link">
            Cancelar
          </Link>
        </div>

        <form action={updatePostAction} className="grid gap-4">
          <input type="hidden" name="slug" value={post.slug} />

          <label className="grid gap-2 text-sm text-slate-300">
            Titulo
            <input
              name="title"
              required
              defaultValue={post.title}
              className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Fecha
              <input
                name="date"
                required
                defaultValue={post.date}
                className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Tags (separados por coma)
              <input
                name="tags"
                defaultValue={post.tags.join(", ")}
                className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm text-slate-300">
            Extracto
            <input
              name="excerpt"
              defaultValue={post.excerpt}
              className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-300">
            Contenido Markdown
            <textarea
              name="content"
              required
              defaultValue={post.content}
              rows={18}
              className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 font-[family:var(--font-geist-mono)] text-sm leading-7 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </label>

          <div className="mt-2 flex flex-wrap gap-3">
            <button type="submit" className="action-link cursor-pointer">
              Guardar cambios
            </button>
            <Link href={`/posts/${post.slug}`} className="action-link">
              Volver al post
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
