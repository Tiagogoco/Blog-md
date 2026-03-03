import Image from "next/image";
import Link from "next/link";
import headerImage from "@/img/Diagramas Login.docx.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/80 shadow-[0_10px_30px_rgba(2,6,23,0.45)]">
            <Image
              src={headerImage}
              alt="Logo del blog"
              fill
              className="object-cover"
              sizes="48px"
            />
          </span>
          <span>
            <span className="block font-[family:var(--font-display)] text-2xl leading-none text-sky-200">
              blog-md
            </span>
            <span className="eyebrow mt-1 block">Notas y articulos</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="action-link">
            Inicio
          </Link>
          <Link href="/search" className="action-link">
            Buscar
          </Link>
        </nav>
      </div>
    </header>
  );
}
