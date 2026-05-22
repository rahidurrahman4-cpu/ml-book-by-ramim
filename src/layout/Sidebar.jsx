import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { bookStructure } from '../data/wordsIndex';
import { ChevronDown, ChevronRight, Home, BookOpen, Lightbulb, Settings, HelpCircle, Award } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  // কোন অধ্যায় (Chapter) খোলা আছে তা ট্র্যাক করা
  const [openChapter, setOpenChapter] = useState("chapter_01");
  // কোন পর্ব (Part) খোলা আছে তা ট্র্যাক করা (ডিফল্টভাবে প্রথম পার্ট খোলা রাখছি)
  const [openPart, setOpenPart] = useState("part_01");

  const toggleChapter = (chapterId) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const togglePart = (partId) => {
    setOpenPart(openPart === partId ? null : partId);
  };

  // কোন পেজটি অ্যাক্টিভ আছে তা চেক করার ফাংশন
  const isActive = (path) => location.pathname === path;

  // মোট লেকচার বা শব্দ কয়টি তা ডাইনামিকভাবে বের করা
  const totalWords = bookStructure.reduce((count, chapter) => {
    return count + chapter.parts.reduce((partCount, part) => partCount + part.words.length, 0);
  }, 0);

  return (
    <aside className="w-72 h-screen bg-[#0d1222] text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      
      {/* Top Header / Logo Section */}
      <div 
        className="flex items-center gap-3 p-5 transition-opacity border-b cursor-pointer hover:opacity-80 border-slate-800/50" 
        onClick={() => navigate('/')}
      >
        <div className="p-2.5 bg-gradient-to-br from-[#5b5dfa] to-[#d846ef] rounded-lg text-white shadow-lg">
          <Lightbulb size={20} />
        </div>
        <div>
          <h1 className="text-sm font-extrabold leading-tight tracking-wide text-white">শব্দে শব্দে<br/>মেশিন লার্নিং</h1>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">রামিম আহমেদ</p>
        </div>
      </div>

      {/* Scrollable Navigation Section */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        
        {/* Main Menu Items */}
        <nav className="space-y-1.5 mb-8 border-b border-slate-800/50 pb-6">
          <Link 
            to="/" 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
              isActive('/') 
                ? 'bg-[#5b5dfa] text-white shadow-md' 
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home size={16} /> <span>বইয়ের হোম পেজ</span>
          </Link>

          <Link 
            to="/start" 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
              isActive('/start') 
                ? 'bg-[#5b5dfa] text-white shadow-md' 
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen size={16} /> <span>বইয়ের সূচনালগ্নে</span>
          </Link>
        </nav>

        {/* Chapters Section */}
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">
            অধ্যায়সমূহ
          </p>
          
          <div className="space-y-2">
            {bookStructure.map((chapter) => (
              <div key={chapter.chapterId} className="space-y-1">
                
                {/* Chapter Button */}
                <button 
                  onClick={() => toggleChapter(chapter.chapterId)}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all ${
                    openChapter === chapter.chapterId ? 'bg-slate-800/30' : 'hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-black transition-colors ${
                      openChapter === chapter.chapterId ? 'bg-[#5b5dfa] text-white shadow-md' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {chapter.chapterNo}
                    </span>
                    <span className={`text-[13px] text-left font-bold truncate max-w-[160px] ${
                      openChapter === chapter.chapterId ? 'text-white' : 'text-slate-300'
                    }`}>
                      অধ্যায়-{chapter.chapterNo}ঃ {chapter.chapterTitle}
                    </span>
                  </div>
                  <ChevronDown 
                    size={14} 
                    className={`text-slate-500 transition-transform duration-300 ${openChapter === chapter.chapterId ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Parts & Words (If Chapter is open) */}
                {openChapter === chapter.chapterId && (
                  <div className="pl-2 mt-2 mb-4 ml-5 space-y-2 border-l-2 border-slate-800/60">
                    {chapter.parts.map((part) => (
                      <div key={part.partId} className="space-y-1">
                        
                        {/* Part Button (Dropdown) */}
                        <button 
                          onClick={() => togglePart(part.partId)}
                          className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-slate-800/30 transition-colors group"
                        >
                          <span className={`text-[11px] font-bold tracking-wide text-left ${
                            openPart === part.partId ? 'text-[#d846ef]' : 'text-slate-400 group-hover:text-slate-300'
                          }`}>
                            পর্ব-{part.partNo}: {part.partTitle}
                          </span>
                          <ChevronRight 
                            size={12} 
                            className={`text-slate-500 transition-transform duration-200 ${openPart === part.partId ? 'rotate-90 text-[#d846ef]' : ''}`} 
                          />
                        </button>
                        
                        {/* Words inside the Part (If Part is open) */}
                        {openPart === part.partId && (
                          <div className="space-y-0.5 pl-2 py-1">
                            {part.words.map((word) => {
                              const wordPath = `/word/${word.path}`;
                              const isWordActive = isActive(wordPath);

                              return (
                                <Link
                                  key={word.id}
                                  to={wordPath}
                                  className={`block text-left py-2 px-3 rounded-lg text-[12px] transition-all relative ${
                                    isWordActive 
                                      ? 'bg-gradient-to-r from-[#5b5dfa]/15 to-transparent text-[#5b5dfa] font-bold' 
                                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium'
                                  }`}
                                >
                                  {isWordActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#5b5dfa] rounded-r-md"></span>
                                  )}
                                  <span className="leading-relaxed line-clamp-2">{word.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Progress Section */}
      <div className="p-4 border-t border-slate-800 bg-[#0d1222] shrink-0">
        {/* Progress Card */}
        <div className="bg-[#161d30] p-3.5 rounded-xl border border-slate-800/80 mb-4 shadow-lg">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">আপনার অগ্রগতি</p>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#5b5dfa]/10 border-2 border-[#5b5dfa]/30 text-[#5b5dfa]">
              <Award size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white mb-0.5">০ / {totalWords} শব্দ</p>
              <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-[#5b5dfa] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex justify-between px-2">
          <button className="flex items-center gap-2 text-xs font-bold transition-colors text-slate-500 hover:text-slate-300">
            <Settings size={14} /> সেটিংস
          </button>
          <button className="flex items-center gap-2 text-xs font-bold transition-colors text-slate-500 hover:text-slate-300">
            <HelpCircle size={14} /> সহায়তা
          </button>
        </div>
      </div>
      
    </aside>
  );
}