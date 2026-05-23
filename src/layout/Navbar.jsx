import { useEffect, useMemo, useRef, useState } from 'react';
import { BrainCircuit, ChevronDown, Menu, Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllWords } from '../data/wordsIndex';

const navLinks = [
  { label: 'হোম', path: '/' },
  { label: 'বই', path: '/dashboard' },
  { label: 'এমএল শব্দ', path: '/ml-topics' },
  { label: 'আমাদের সম্পর্কে', path: '/about' },
  { label: 'যোগাযোগ', path: '/contact' },
];

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const allWords = useMemo(() => getAllWords(), []);
  const searchRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const showSidebarButton = location.pathname === '/dashboard' || location.pathname.startsWith('/word/');
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return allWords
      .filter(
        (word) =>
          word.title.toLowerCase().includes(query) ||
          word.summary.toLowerCase().includes(query) ||
          word.partTitle.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [allWords, searchQuery]);

  useEffect(() => {
    setShowMenu(false);
    setShowSearch(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  const goToWord = (path) => {
    navigate(`/word/${path}`);
    setSearchQuery('');
    setShowSearch(false);
    setShowMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-cyan-100/[0.08] bg-[#050b12]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:h-18 sm:px-6 lg:h-20">
        {showSidebarButton && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open lesson sidebar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyan-100/[0.08] bg-[#071521] text-slate-300 transition hover:border-teal-300/30 hover:text-teal-200 md:hidden"
          >
            <Menu size={20} />
          </button>
        )}

        <Link to="/" className="flex min-w-0 shrink items-center gap-3 transition hover:opacity-90">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-teal-300 text-[#06111d] shadow-[0_0_24px_rgba(45,212,191,0.2)] sm:h-11 sm:w-11">
            <span className="absolute inset-0 bg-white/20 blur-[2px]" />
            <BrainCircuit size={22} className="relative z-10" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black leading-tight text-white sm:text-base lg:text-lg">
              শব্দে শব্দে মেশিন লার্নিং
            </span>
            <span className="mt-0.5 hidden truncate text-[11px] font-semibold text-slate-500 sm:block">
              রামীম আহমেদ
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                isActiveLink(link.path)
                  ? 'bg-teal-300/10 text-teal-300'
                  : 'text-slate-400 hover:bg-white/[0.035] hover:text-teal-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-3">
          <div className="relative hidden md:block">
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              results={searchResults}
              onSelect={goToWord}
              placeholder="শব্দ খুঁজুন..."
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setShowSearch((value) => !value);
              setShowMenu(false);
            }}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-100/[0.08] bg-[#071521] text-slate-300 transition hover:border-teal-300/30 hover:text-teal-200 md:hidden"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            onClick={() => {
              setShowMenu((value) => !value);
              setShowSearch(false);
            }}
            aria-expanded={showMenu}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-cyan-100/[0.08] bg-[#071521] px-3 text-sm font-bold text-slate-300 transition hover:border-teal-300/30 hover:text-teal-200 xl:hidden"
          >
            <span className="hidden sm:inline">মেনু</span>
            {showMenu ? <X size={17} /> : <ChevronDown size={17} />}
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="border-t border-cyan-100/[0.06] bg-[#050b12] px-4 py-3 md:hidden">
          <SearchBox
            refEl={searchRef}
            value={searchQuery}
            onChange={setSearchQuery}
            results={searchResults}
            onSelect={goToWord}
            placeholder="যেকোনো শব্দ খুঁজুন..."
            wide
          />
        </div>
      )}

      {showMenu && (
        <div className="border-t border-cyan-100/[0.06] bg-[#050b12] px-4 py-4 shadow-2xl xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-md border px-4 py-3 text-sm font-bold transition ${
                  isActiveLink(link.path)
                    ? 'border-teal-300/35 bg-teal-300/10 text-teal-200'
                    : 'border-cyan-100/[0.08] bg-[#071521] text-slate-300 hover:border-teal-300/30 hover:text-teal-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function SearchBox({ refEl, value, onChange, results, onSelect, placeholder, wide = false }) {
  return (
    <div className={`relative ${wide ? 'w-full' : 'w-[230px] lg:w-[260px]'}`}>
      <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-300/70" />
      <input
        ref={refEl}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-cyan-100/[0.08] bg-[#071521] pl-10 pr-3 text-sm font-semibold text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-teal-300/50 focus:ring-2 focus:ring-teal-300/10"
      />

      {value.trim() !== '' && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-md border border-cyan-100/[0.08] bg-[#071521] shadow-2xl custom-scrollbar">
          {results.length > 0 ? (
            results.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => onSelect(result.path)}
                className="block w-full border-b border-cyan-100/[0.06] px-4 py-3 text-left transition last:border-0 hover:bg-white/[0.035]"
              >
                <span className="block text-sm font-black text-white">{result.title}</span>
                <span className="mt-1 block truncate text-xs text-slate-500">{result.summary}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-5 text-center text-xs font-bold text-slate-500">কোনো ফলাফল পাওয়া যায়নি</div>
          )}
        </div>
      )}
    </div>
  );
}
