import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Brain, Rocket, 
  Code2, CheckCircle2, User, TerminalSquare, Database, 
  GraduationCap, Quote, ArrowRight, Network, LibraryBig
} from 'lucide-react';
import { getAllWords, bookStructure } from '../data/wordsIndex'; 

export default function Home() {
  
  // ডাইনামিক স্ট্যাটস দেখানোর জন্য শব্দগুলো গুনে নেওয়া হচ্ছে
  const allWords = getAllWords();

  return (
    <div className="flex-1 bg-[#0b0f19] text-slate-200 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto h-screen custom-scrollbar font-sans">
      
      {/* --- HERO SECTION & STATS GRID --- */}
      <div className="grid grid-cols-1 gap-6 mb-12 lg:grid-cols-12">
        {/* Hero Card */}
        <div className="lg:col-span-8 xl:col-span-9 bg-gradient-to-r from-[#171e36] to-[#0f1424] border border-indigo-500/20 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-center shadow-2xl">
          {/* Background Decorations */}
          <div className="absolute -right-20 -top-20 w-72 h-72 md:w-96 md:h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute right-0 -translate-y-1/2 pointer-events-none top-1/2 opacity-5 md:opacity-10">
            <Brain size={250} className="md:w-[300px] md:h-[300px]" />
          </div>

          <div className="relative z-10 max-w-xl">
            <h1 className="mb-3 text-3xl font-black tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-white to-slate-400">
              শব্দে শব্দে মেশিন লার্নিং
            </h1>
            <p className="text-[#00daf3] font-bold tracking-wide mb-6 text-sm md:text-base">
              মেশিন লার্নিং এর খুঁটিনাটি শব্দের সহজ গল্প
            </p>
            <p className="max-w-md mb-8 text-sm leading-relaxed text-slate-400 md:text-base">
              মেশিন লার্নিং এর খুঁটিনাটি শব্দের সহজ পাঠ। এই বইটি তৈরি করা হয়েছে যারা নতুন প্রযুক্তি শিখতে চান তাদের জন্য, কঠিন সব ধারণাকে সহজ ও সাবলীল ভাষায় উপস্থাপন করা হয়েছে এখানে।
            </p>
            <Link to="/start">
              <button className="flex items-center justify-center w-full sm:w-auto gap-3 bg-white hover:bg-slate-200 text-indigo-950 px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <BookOpen size={18} />
                বই পড়া শুরু করুন <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-4 xl:col-span-3">
          <div className="bg-[#161d30] border border-slate-800 rounded-3xl p-6 flex-1 flex flex-col justify-center shadow-lg">
            <p className="mb-2 text-sm font-bold text-slate-400">অধ্যায়</p>
            <h3 className="mb-1 text-5xl font-black text-white md:text-6xl">{bookStructure.length}</h3>
            <p className="text-xs font-medium text-slate-500">মোট অধ্যায়</p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-4">
            <div className="bg-[#161d30] border border-slate-800 rounded-3xl p-5 flex flex-col justify-center shadow-lg">
              <p className="mb-2 text-xs font-bold text-slate-400">শব্দ</p>
              <h3 className="mb-1 text-3xl font-black text-white md:text-4xl">{allWords.length}</h3>
              <p className="text-[10px] text-slate-500 font-medium">মোট শব্দ</p>
            </div>
            <div className="bg-[#161d30] border border-slate-800 rounded-3xl p-5 flex flex-col justify-center shadow-lg">
              <p className="mb-2 text-xs font-bold text-slate-400">পঠিত</p>
              <h3 className="text-3xl md:text-4xl font-black text-[#5b5dfa] mb-1">০</h3>
              <p className="text-[10px] text-slate-500 font-medium">শব্দ</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- DYNAMIC CHAPTERS SECTION --- */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6 border-l-4 border-[#5b5dfa] pl-3">
          <h2 className="text-lg font-bold tracking-wide text-white md:text-xl">আপনার অধ্যায়সমূহ</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {bookStructure.map((chapter, index) => {
            // ডাইনামিক ডেটা ক্যালকুলেশন
            const totalParts = chapter.parts.length;
            const totalWordsInChapter = chapter.parts.reduce((count, part) => count + part.words.length, 0);
            const firstWordPath = chapter.parts[0]?.words[0]?.path;
            
            // কালার থিম নির্ধারণ
            const isEven = index % 2 !== 0;
            const colorClass = isEven ? 'text-emerald-500 bg-emerald-500' : 'text-[#5b5dfa] bg-[#5b5dfa]';

            return (
              <div key={chapter.chapterId} className="bg-[#161d30] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 md:p-8 transition-all shadow-lg relative overflow-hidden flex flex-col justify-between group h-full">
                
                {/* Background Watermark Icon */}
                <div className={`absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform duration-500 ${isEven ? 'text-emerald-500' : 'text-[#5b5dfa]'}`}>
                  <LibraryBig size={140} className="md:w-[160px] md:h-[160px]" />
                </div>

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center">
                    <div className={`w-10 h-10 shrink-0 rounded-full text-white flex items-center justify-center font-bold text-lg shadow-lg ${colorClass}`}>
                      {chapter.chapterNo}
                    </div>
                    <div>
                      <h3 className="text-base font-bold leading-snug text-white md:text-lg">অধ্যায়-{chapter.chapterNo}: {chapter.chapterTitle}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-400">{totalParts} টি পর্ব • {totalWordsInChapter} টি শব্দ</p>
                    </div>
                  </div>
                  
                  <p className="flex-1 w-full mb-6 text-sm leading-relaxed sm:max-w-sm text-slate-400">
                    এই অধ্যায়ে আপনি {chapter.chapterTitle}-এর সাথে সম্পর্কিত {totalWordsInChapter}টি গুরুত্বপূর্ণ শব্দ এবং তাদের গাণিতিক ও বাস্তব প্রয়োগ সম্পর্কে জানবেন।
                  </p>

                  <div className="pt-5 mt-auto border-t border-slate-800">
                    <Link to={firstWordPath ? `/word/${firstWordPath}` : '/'}>
                      <button className={`w-full sm:w-fit justify-center px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-lg ${isEven ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-[#4f46e5] hover:bg-[#5b5dfa] text-white'}`}>
                        চালিয়ে যান <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- LEARNING PATH SECTION --- */}
      <div className="bg-[#161d30] border border-slate-800 rounded-3xl p-6 md:p-10 mb-12 shadow-xl">
        <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-white md:text-xl">
          <GraduationCap className="text-[#5b5dfa]" /> শিক্ষার পথ (Learning Path)
        </h2>
        <p className="max-w-2xl mb-10 text-sm leading-relaxed text-slate-400">
          এই বইটি মেশিন লার্নিং এর মৌলিক ধারণা থেকে শুরু করে উন্নত ধারণাগুলি পর্যন্ত ধাপে ধাপে সাজানো হয়েছে যাতে যেকোনো শিক্ষার্থী সহজে শিখতে ও বাস্তবে প্রয়োগ করতে পারেন।
        </p>

        <div className="relative flex flex-col items-center justify-between gap-8 md:gap-4 md:flex-row">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-slate-800 z-0"></div>

          {[
            { icon: <BookOpen size={24} />, title: "মৌলিক ধারণা", desc: "এআই ও মেশিন লার্নিং এর পরিচয়", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: <Network size={24} />, title: "মূল ধারণা", desc: "প্রয়োজনীয় তত্ত্ব ও অ্যালগরিদম", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: <Code2 size={24} />, title: "প্র্যাকটিস", desc: "ল্যাব ও কেস স্টাডির মাধ্যমে অনুশীলন", color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { icon: <Rocket size={24} />, title: "প্রয়োগ", desc: "বাস্তব সমস্যা সমাধানে প্রয়োগ", color: "text-rose-400", bg: "bg-rose-500/10" }
          ].map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center w-full text-center md:w-1/4">
              <div className={`w-20 h-20 rounded-full ${step.bg} ${step.color} flex items-center justify-center mb-4 border border-slate-700/50 shadow-lg`}>
                {step.icon}
              </div>
              <h4 className="mb-1 text-sm font-bold text-white">{step.title}</h4>
              <p className="px-2 text-xs text-slate-500 max-w-[200px] mx-auto">{step.desc}</p>
              {/* Arrow for mobile view */}
              {idx < 3 && <div className="mt-6 md:hidden text-slate-700"><ArrowRight size={24} className="rotate-90" /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* --- FEATURES & AUDIENCE SECTION --- */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <div className="bg-[#161d30] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
          <h3 className="mb-6 text-xl font-bold text-white">আপনি যা পাবেন</h3>
          <ul className="space-y-5">
            {["সহজ ও পরিষ্কার ভাষায় ব্যাখ্যা", "ধাপে ধাপে লেসন", "বাস্তব উদাহরণ ও কেস স্টাডি", "কুইজ ও রিয়েল-টাইম অনুশীলন"].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#161d30] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute pointer-events-none -right-10 -bottom-10 opacity-5">
             <User size={250} />
          </div>
          <div className="relative z-10">
            <h3 className="mb-6 text-xl font-bold text-white">কাদের জন্য এই বই?</h3>
            <ul className="space-y-5">
              {[
                { icon: <GraduationCap size={18} />, text: "শুরুয়াতি শিক্ষার্থী" },
                { icon: <TerminalSquare size={18} />, text: "প্রোগ্রামার ও ডেভেলপার" },
                { icon: <Database size={18} />, text: "ডেটা সায়েন্সে আগ্রহীরা" },
                { icon: <Brain size={18} />, text: "গবেষক ও শিক্ষার্থী" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- FOOTER QUOTE --- */}
      <div className="bg-[#161d30] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 shadow-lg mb-8">
        <div className="text-indigo-400 shrink-0"><Quote size={28} /></div>
        <p className="pt-1 text-sm font-medium leading-relaxed text-slate-300">
          শেখা হোক সহজ, গভীর ও উপভোগ্য। চলুন, একসাথে মেশিন লার্নিং-এর জগতে যাত্রা শুরু করি!
        </p>
      </div>

    </div>
  );
}