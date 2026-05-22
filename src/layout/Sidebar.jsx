import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { bookStructure } from '../data/wordsIndex';
import { 
  ChevronDown, ChevronRight, ChevronLeft, Home, BookOpen, X 
} from 'lucide-react';

export default function Sidebar({ isMobileOpen, closeMobileMenu }) {
  const location = useLocation(); 
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openChapter, setOpenChapter] = useState("chapter_01");
  const [openPart, setOpenPart] = useState("part_01");

  const toggleChapter = (chapterId) => {
    if (isCollapsed) setIsCollapsed(false); 
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const togglePart = (partId) => {
    setOpenPart(openPart === partId ? null : partId);
  };

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (isMobileOpen) {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* --- Mobile Overlay Backdrop --- */}
      {isMobileOpen && (
        <div 
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 transition-opacity md:hidden bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* --- Sidebar Container --- */}
      <aside 
        className={`bg-[#0d1222] text-slate-300 flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300 
          fixed md:relative z-40 top-20 md:top-0 left-0 h-full
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          ${isCollapsed ? 'md:w-20' : 'md:w-80 lg:w-96'} 
          w-[85vw] sm:w-80
        `}
      >
        {/* Mobile Close Button (X icon) */}
        <button 
          onClick={closeMobileMenu}
          className="absolute transition-colors md:hidden top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Desktop Minimize/Maximize Toggle Button (Absolutely Centered) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#161d30] border border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-[#5b5dfa] hover:border-[#5b5dfa] z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Scrollable Navigation Section */}
        <div className="flex-1 p-5 pt-8 pb-20 overflow-x-hidden overflow-y-auto custom-scrollbar md:pb-5">
          
          {/* Main Menu Items */}
          <nav className="pb-8 mb-8 space-y-2 border-b border-slate-800/50">
            <Link 
              to="/" 
              onClick={handleLinkClick}
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
              <span className={isCollapsed ? 'block md:hidden whitespace-nowrap' : 'whitespace-nowrap'}>বইয়ের হোম পেজ</span>
            </Link>

            <Link 
              to="/start" 
              onClick={handleLinkClick}
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
              <span className={isCollapsed ? 'block md:hidden whitespace-nowrap' : 'whitespace-nowrap'}>বইয়ের সূচনালগ্নে</span>
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
                      <span className={isCollapsed ? `block md:hidden text-[15px] md:text-[16px] text-left font-bold truncate max-w-[200px] md:max-w-[220px] ${openChapter === chapter.chapterId ? 'text-white' : 'text-slate-300'}` : `text-[15px] md:text-[16px] text-left font-bold truncate max-w-[200px] md:max-w-[220px] ${openChapter === chapter.chapterId ? 'text-white' : 'text-slate-300'}`}>
                        অধ্যায়-{chapter.chapterNo}ঃ {chapter.chapterTitle}
                      </span>
                    </div>
                    {!isCollapsed && (
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-500 transition-transform duration-300 shrink-0 ${openChapter === chapter.chapterId ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </button>

                  {/* Parts & Words */}
                  {openChapter === chapter.chapterId && !isCollapsed && (
                    <div className="pl-3 mt-3 mb-6 ml-4 space-y-3 overflow-hidden border-l-2 border-slate-800/60">
                      {chapter.parts.map((part) => (
                        <div key={part.partId} className="space-y-1">
                          <button 
                            onClick={() => togglePart(part.partId)}
                            className="flex items-center justify-between w-full px-3 py-2 transition-colors rounded-lg hover:bg-slate-800/30 group"
                          >
                            <span className={`text-[14px] md:text-[16px] font-bold tracking-wide text-left truncate ${
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
                                    onClick={handleLinkClick}
                                    className={`block text-left py-2.5 px-4 rounded-xl text-[13px] md:text-[14px] transition-all relative ${
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
    </>
  );
}