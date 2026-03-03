export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-slate-200">blog-md</span> ·
          Espacio para contenido en Markdown.
        </p>
        <p>{currentYear} </p>
      </div>
    </footer>
  );
}
