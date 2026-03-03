import Link from "next/link";
import { listPosts } from "@/application/listPosts";
import { PostCard } from "@/components/PostCard";
import { createPostRepository } from "@/infrastructure/createPostRepository";

export default async function HomePage() {
  const repo = createPostRepository();
  const posts = await listPosts(repo);
  const [featuredPost, ...otherPosts] = posts;

  return (
    <main className="main-shell">
      <header className="panel relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
        <div className="absolute -right-20 top-8 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute left-10 top-1/3 h-40 w-40 rounded-full bg-white/4 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.7fr)] lg:items-end">
          <div className="space-y-4">
            <p className="eyebrow">Markdown Notes</p>
            <h1 className="page-title max-w-4xl">Blog de notas personal</h1>
            <p className="max-w-2xl py-1 text-base leading-8 text-slate-300 sm:text-lg">
              Espacio para compartir mis pensamientos, aprendizajes y proyectos
              relacionados con la arquitectura de software, desarrollo web y
              tecnologia en general. Un lugar para ordenar ideas y compartir
              recursos utiles con la comunidad.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/search" className="action-link w-fit">
                Buscar posts
              </Link>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                {posts.length} articulos publicados
              </span>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <div>
              <p className="eyebrow">Enfoque</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Contenido tecnico, notas de trabajo y aprendizajes con una
                interfaz pensada para leer sin ruido.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold text-sky-300">
                  {posts.length}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                  Posts
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold text-sky-300">
                  {new Set(posts.flatMap((post) => post.tags)).size}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                  Tags
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Ultimos articulos</p>
            <h2 className="section-title mt-2 text-3xl sm:text-4xl">
              Lecturas recientes
            </h2>
          </div>
          <p className="hidden max-w-md text-right text-sm leading-6 text-slate-400 md:block">
            Una mezcla de notas cortas y articulos mas desarrollados para probar
            lectura, filtros y navegacion.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredPost && (
            <PostCard
              key={featuredPost.slug}
              post={featuredPost}
              variant="featured"
            />
          )}
          {otherPosts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
