import Link from "next/link";
import { createPostAction } from "@/app/actions/postActions";

export default function NewPostPage() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="main-shell">
      <section className="panel px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Editor</p>
            <h1 className="page-title mt-2">Nueva nota</h1>
          </div>
          <Link href="/" className="action-link">
            Volver
          </Link>
        </div>

        <form action={createPostAction} className="grid gap-4">
          <label className="grid gap-2 text-sm text-slate-300">
            Titulo
            <input
              name="title"
              required
              placeholder="Mi nueva nota"
              className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Fecha
              <input
                name="date"
                required
                defaultValue={today}
                className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Slug (opcional)
              <input
                name="slug"
                placeholder="mi-nueva-nota"
                className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm text-slate-300">
            Tags (separados por coma)
            <input
              name="tags"
              placeholder="arquitectura, markdown, notas"
              className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-300">
            Extracto
            <input
              name="excerpt"
              required
              placeholder="Resumen corto del contenido."
              className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-300">
            Contenido Markdown
            <textarea
              name="content"
              required
              rows={18}
              placeholder="# Titulo del post&#10;&#10;Empieza a escribir aqui..."
              className="w-full rounded-xl border border-white/60 bg-slate-950/80 px-4 py-3 font-[family:var(--font-geist-mono)] text-sm leading-7 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </label>

          <div className="mt-2 flex flex-wrap gap-3">
            <button type="submit" className="action-link cursor-pointer">
              Crear nota
            </button>
            <Link href="/" className="action-link">
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
