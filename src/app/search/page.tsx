import Link from "next/link";
import { searchPosts } from "@/application/searchPosts";
import { PostCard } from "@/components/PostCard";
import { createPostRepository } from "@/infrastructure/createPostRepository";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").toString();

  const repo = createPostRepository();
  const results = query ? await searchPosts(repo, query) : [];

  return (
    <main className="main-shell">
      <section className="panel px-6 py-8 sm:px-10 sm:py-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Link href="/" className="eyebrow inline-block">
              Volver al inicio
            </Link>
            <h1 className="page-title">Buscar</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Encuentra publicaciones por título, etiqueta o palabras clave.
            </p>
          </div>
        </header>

        <form className="mt-8">
          <input
            name="q"
            defaultValue={query}
            placeholder="Ej: arquitectura, clean code, react..."
            className="w-full rounded-2xl border border-white/60 bg-slate-950/80 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 sm:text-base"
          />
        </form>

        {query ? (
          <p className="mt-4 text-sm text-slate-400">
            {results.length} resultado{results.length === 1 ? "" : "s"} para{" "}
            <span className="text-sky-300">&quot;{query}&quot;</span>.
          </p>
        ) : (
          <p className="mt-4 text-sm text-slate-400">
            Escribe una búsqueda para ver coincidencias.
          </p>
        )}
      </section>

      <section className="mt-8 grid gap-5">
        {query && results.map((p) => <PostCard key={p.slug} post={p} />)}
        {query && results.length === 0 && (
          <div className="panel px-6 py-8 text-center text-slate-300">
            Sin resultados.
          </div>
        )}
      </section>
    </main>
  );
}
