import Link from "next/link";
import { deletePostAction } from "@/app/actions/postActions";
import type { Post } from "@/domain/post";

type PostCardProps = {
  post: Post;
  variant?: "default" | "featured";
};

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`panel group relative overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:border-sky-300/70 hover:shadow-[0_28px_90px_rgba(2,6,23,0.55)] sm:p-6 ${
        isFeatured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-sky-300/60 to-transparent opacity-60" />

      <div
        className={`relative flex gap-6 ${
          isFeatured
            ? "flex-col lg:flex-row lg:items-end lg:justify-between"
            : "flex-col"
        }`}
      >
        <div className={`space-y-4 ${isFeatured ? "max-w-3xl" : ""}`}>
          <div className="space-y-2">
            <p className="eyebrow">Articulo</p>
            <h2
              className={`section-title ${
                isFeatured ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
              }`}
            >
              <Link
                href={`/posts/${post.slug}`}
                className="transition-colors duration-150 group-hover:text-sky-200"
              >
                {post.title}
              </Link>
            </h2>
            <p className="muted-text text-sm">{post.date}</p>
          </div>

          <p
            className={`text-slate-200 ${
              isFeatured
                ? "max-w-2xl text-base leading-8 sm:text-lg"
                : "text-sm leading-7 sm:text-base"
            }`}
          >
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link key={t} href={`/tags/${encodeURIComponent(t)}`}>
                <span className="tag-chip">{t}</span>
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`flex items-end justify-between gap-4 ${
            isFeatured
              ? "border-t border-white/10 pt-5 lg:min-w-56 lg:flex-col lg:items-end lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-6 lg:pt-0"
              : ""
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-sm font-semibold text-slate-300 transition-colors duration-150 group-hover:text-sky-200 hover:border-sky-300/70"
            >
              Leer
            </Link>
            <Link
              href={`/posts/${post.slug}/edit`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-sky-300/70 hover:text-sky-200"
            >
              Editar
            </Link>
            <form action={deletePostAction}>
              <input type="hidden" name="slug" value={post.slug} />
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-red-300/55 px-3 py-1.5 text-sm font-semibold text-red-200 transition-colors duration-150 hover:border-red-300 hover:bg-red-500/10 hover:text-red-100"
              >
                Eliminar
              </button>
            </form>
          </div>
          {isFeatured && (
            <p className="max-w-56 text-right text-xs uppercase tracking-[0.18em] text-slate-500">
              Nota destacada
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
