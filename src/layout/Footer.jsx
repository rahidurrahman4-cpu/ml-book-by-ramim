import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 h-14 flex items-center justify-between px-6 bg-[#0b0f19]/90 border-t border-slate-800 text-slate-400">
      <div className="text-sm">© {year} শব্দে শব্দে — Machine Learning Book</div>
      <div className="text-sm opacity-80">Built with ❤️ — <a href="https://github.com/" className="text-[#5b5dfa] hover:underline">GitHub</a></div>
    </footer>
  );
}
