export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 border-t border-slate-800/80 bg-[#0b0f19]/95 px-5 py-3 text-slate-300 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-400">© {year} শব্দে শব্দে মেশিন লার্নিং - রামীম আহমদ</div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="opacity-80">Built with ❤️</span>
          <a
            href="https://www.linkedin.com/in/ramim-ahmed/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-300"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.87 0-2.16 1.46-2.16 2.94v5.67H9.31V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.62 0 4.29 2.38 4.29 5.46v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100069728434533"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-300"
            aria-label="Facebook"
            title="Facebook"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
              <path d="M13.5 22v-8.2h2.76l.41-3.2h-3.17V8.55c0-.93.26-1.56 1.6-1.56h1.7V4.13c-.83-.09-1.66-.13-2.5-.13-2.5 0-4.22 1.52-4.22 4.3v2.38H7.07v3.2h2.99V22h3.44Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
