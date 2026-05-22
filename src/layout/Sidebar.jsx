import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { bookStructure } from '../data/wordsIndex';
import { 
  ChevronDown, ChevronRight, ChevronLeft, Home, BookOpen, 
  BrainCircuit, Settings, HelpCircle, Award 
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  // সাইডবার মিনিমাইজ/ম্যাক্সিমাইজ স্টেট
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [openChapter, setOpenChapter] = useState("chapter_01");
  const [openPart, setOpenPart] = useState("part_01");

  const toggleChapter = (chapterId) => {
    if (isCollapsed) setIsCollapsed(false); // মিনিমাইজ থাকলে চ্যাপ্টার ক্লিক করলে ম্যাক্সিমাইজ হবে
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const togglePart = (partId) => {
    setOpenPart(openPart === partId ? null : partId);
  };

  const isActive = (path) => location.pathname === path;

  // মোট লেকচার বা শব্দ কয়টি তা ডাইনামিকভাবে বের করা
  const totalWords = bookStructure.reduce((count, chapter) => {
    return count + chapter.parts.reduce((partCount, part) => partCount + part.words.length, 0);
  }, 0);

  return (
    <aside 
     
      className={`h-screen bg-[#0d1222] text-slate-300 flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300 relative ${
        isCollapsed ? 'w-20' : 'w-96' 
      }`}
    >
      {/* Minimize/Maximize Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#161d30] border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-[#5b5dfa] hover:border-[#5b5dfa] z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Top Header / Logo Section */}
      <div 
        className={`flex items-center p-6 mt-2 transition-opacity border-b cursor-pointer hover:opacity-80 border-slate-800/50 ${isCollapsed ? 'justify-center px-0' : 'gap-4'}`} 
        onClick={() => navigate('/')}
      >
        <div className="p-3 bg-gradient-to-br from-[#5b5dfa] to-[#d846ef] rounded-xl text-white shadow-lg relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-white/20 blur-[2px] animate-pulse"></div>
          <BrainCircuit size={26} className="relative z-10" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-[22px] font-extrabold leading-tight tracking-wide text-white">শব্দে শব্দে মেশিন লার্নিং</h1>
            <p className="mt-1 text-sm font-medium text-slate-400">রামীম আহমেদ</p>
          </div>
        )}
      </div>

      {/* Scrollable Navigation Section */}
      <div className="flex-1 p-5 overflow-x-hidden overflow-y-auto custom-scrollbar">
        
        {/* Main Menu Items */}
        <nav className="pb-8 mb-8 space-y-2 border-b border-slate-800/50">
          <Link 
            to="/" 
            title="বইয়ের হোম পেজ"
            className={`w-full flex items-center py-3.5 rounded-lg text-[15px] font-bold transition-all ${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'
            } ${
              isActive('/') 
                ? 'bg-[#5b5dfa] text-white shadow-md' 
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home size={20} className="shrink-0" /> 
            {!isCollapsed && <span className="whitespace-nowrap">বইয়ের হোম পেজ</span>}
          </Link>

          <Link 
            to="/start" 
            title="বইয়ের সূচনালগ্নে"
            className={`w-full flex items-center py-3.5 rounded-lg text-[15px] font-bold transition-all ${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'
            } ${
              isActive('/start') 
                ? 'bg-[#5b5dfa] text-white shadow-md' 
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen size={20} className="shrink-0" /> 
            {!isCollapsed && <span className="whitespace-nowrap">বইয়ের সূচনালগ্নে</span>}
          </Link>
        </nav>

        {/* Chapters Section */}
        <div>
          {!isCollapsed && (
            <p className="px-2 mb-5 text-xs font-bold tracking-widest uppercase text-slate-500 whitespace-nowrap">
              অধ্যায়সমূহ
            </p>
          )}
          
          <div className="space-y-4">
            {bookStructure.map((chapter) => (
              <div key={chapter.chapterId} className="space-y-2">
                
                {/* Chapter Button */}
                <button 
                  onClick={() => toggleChapter(chapter.chapterId)}
                  title={`অধ্যায়-${chapter.chapterNo}: ${chapter.chapterTitle}`}
                  className={`w-full flex items-center py-3 rounded-xl transition-all ${
                    isCollapsed ? 'justify-center px-0' : 'justify-between px-2'
                  } ${
                    openChapter === chapter.chapterId ? 'bg-slate-800/30' : 'hover:bg-slate-800/30'
                  }`}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black transition-colors shrink-0 ${
                      openChapter === chapter.chapterId ? 'bg-[#5b5dfa] text-white shadow-md' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {chapter.chapterNo}
                    </span>
                    {!isCollapsed && (
                      <span className={`text-[16px] text-left font-bold truncate max-w-[220px] ${
                        openChapter === chapter.chapterId ? 'text-white' : 'text-slate-300'
                      }`}>
                        অধ্যায়-{chapter.chapterNo}ঃ {chapter.chapterTitle}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-500 transition-transform duration-300 shrink-0 ${openChapter === chapter.chapterId ? 'rotate-180' : ''}`} 
                    />
                  )}
                </button>

                {/* Parts & Words (If Chapter is open & Sidebar is not collapsed) */}
                {openChapter === chapter.chapterId && !isCollapsed && (
                  <div className="pl-3 mt-3 mb-6 ml-4 space-y-3 overflow-hidden border-l-2 border-slate-800/60">
                    {chapter.parts.map((part) => (
                      <div key={part.partId} className="space-y-1">
                        
                        {/* Part Button (Dropdown) */}
                        <button 
                          onClick={() => togglePart(part.partId)}
                          className="flex items-center justify-between w-full px-3 py-2 transition-colors rounded-lg hover:bg-slate-800/30 group"
                        >
                          <span className={`text-[16px] font-bold tracking-wide text-left truncate ${
                            openPart === part.partId ? 'text-[#d846ef]' : 'text-slate-400 group-hover:text-slate-300'
                          }`}>
                            পর্ব-{part.partNo}: {part.partTitle}
                          </span>
                          <ChevronRight 
                            size={16} 
                            className={`text-slate-500 shrink-0 transition-transform duration-200 ${openPart === part.partId ? 'rotate-90 text-[#d846ef]' : ''}`} 
                          />
                        </button>
                        
                        {/* Words inside the Part (If Part is open) */}
                        {openPart === part.partId && (
                          <div className="space-y-1.5 pl-3 py-2">
                            {part.words.map((word) => {
                              const wordPath = `/word/${word.path}`;
                              const isWordActive = isActive(wordPath);

                              return (
                                <Link
                                  key={word.id}
                                  to={wordPath}
                                  className={`block text-left py-2.5 px-4 rounded-xl text-[14px] transition-all relative ${
                                    isWordActive 
                                      ? 'bg-gradient-to-r from-[#5b5dfa]/15 to-transparent text-[#5b5dfa] font-bold shadow-sm' 
                                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium'
                                  }`}
                                >
                                  {isWordActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#5b5dfa] rounded-r-md"></span>
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
    </aside>
  );
}