import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllWords } from '../data/wordsIndex';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const mobileSearchRef = useRef(null);
  
  const allWords = getAllWords();
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allWords.filter(word => 
        word.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );

  useEffect(() => {
    if (showMobileSearch) mobileSearchRef.current?.focus();
  }, [showMobileSearch]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d1222] border-b border-slate-800/80 flex items-center justify-between px-4 sm:px-6 h-20 shrink-0">
      
      {/* Left: Mobile Menu Button & Brand Logo */}
      <div className="flex items-center flex-shrink-0 gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 transition-colors md:hidden text-slate-400 hover:text-white"
        >
          <Menu size={24} />
        </button>

        <div 
          className="flex items-center gap-3 transition-opacity cursor-pointer hover:opacity-80" 
          onClick={() => navigate('/')}
        >
          <div className="p-2.5 bg-gradient-to-br from-[#5b5dfa] to-[#d846ef] rounded-xl text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 blur-[2px] animate-pulse"></div>
            <BrainCircuit size={22} className="relative z-10" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-[20px] font-extrabold leading-tight tracking-wide text-white">
              শব্দে শব্দে মেশিন লার্নিং
            </h1>
            <p className="text-[11px] md:text-xs text-slate-400 font-medium mt-0.5">রামীম আহমেদ</p>
          </div>
        </div>
      </div>

      {/* Center search moved to right actions on desktop (see below) */}

      {/* Right: Actions & Profile Section */}
      <div className="flex items-center justify-end flex-shrink-0 gap-4 sm:gap-6">
        {/* Desktop search (right side) */}
        <div className="hidden md:flex items-center max-w-xl w-full md:w-[420px] px-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বইয়ের যেকোনো শব্দ খুঁজুন..."
              className="w-full bg-[#161d30] text-sm text-slate-300 pl-11 pr-4 py-2.5 rounded-full border border-slate-800 focus:outline-none focus:border-[#5b5dfa] transition-all shadow-sm"
            />
            <Search size={16} className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-500" />

            {searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 w-full mt-2 bg-[#161d30] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto custom-scrollbar">
                {searchResults.length > 0 ? (
                  <div className="flex flex-col">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          navigate(`/word/${result.path}`);
                          setSearchQuery('');
                        }}
                        className="flex flex-col px-5 py-3.5 text-left transition-colors border-b hover:bg-slate-800/80 border-slate-800/50 last:border-0 group"
                      >
                        <span className="text-[14px] font-bold text-white mb-1 group-hover:text-[#5b5dfa] transition-colors line-clamp-1">
                          {result.title}
                        </span>
                        <span className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">
                          {result.summary}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-sm font-medium text-center text-slate-400">কোনো ফলাফল পাওয়া যায়নি! 😞</div>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowMobileSearch((s) => !s)}
          className="transition-colors md:hidden text-slate-400 hover:text-white"
          aria-label="open mobile search"
        >
          <Search size={22} />
        </button>

        {/* notification and profile removed per request */}
      </div>

      {/* Mobile Search Panel (appears under navbar on small screens) */}
      {showMobileSearch && (
        <div className="absolute left-0 right-0 top-full md:hidden px-4 pb-3 bg-[#0d1222] z-40">
          <div className="relative w-full">
            <input
              ref={mobileSearchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বইয়ের যেকোনো শব্দ খুঁজুন..."
              className="w-full bg-[#161d30] text-sm text-slate-300 pl-11 pr-4 py-2.5 rounded-full border border-slate-800 focus:outline-none focus:border-[#5b5dfa] transition-all shadow-sm"
            />
            <Search size={16} className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-500" />

            {searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 w-full mt-2 bg-[#161d30] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto custom-scrollbar">
                {searchResults.length > 0 ? (
                  <div className="flex flex-col">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          navigate(`/word/${result.path}`);
                          setSearchQuery('');
                          setShowMobileSearch(false);
                        }}
                        className="flex flex-col px-5 py-3.5 text-left transition-colors border-b hover:bg-slate-800/80 border-slate-800/50 last:border-0 group"
                      >
                        <span className="text-[14px] font-bold text-white mb-1 group-hover:text-[#5b5dfa] transition-colors line-clamp-1">
                          {result.title}
                        </span>
                        <span className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">
                          {result.summary}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-sm font-medium text-center text-slate-400">কোনো ফলাফল পাওয়া যায়নি! 😞</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
}