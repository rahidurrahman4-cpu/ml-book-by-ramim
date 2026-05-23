import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Shield, Play, Brain, Sparkles, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import startData from './start.json';

export default function BookStart() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="flex-1 bg-[#0b0f19] text-slate-200 p-4 sm:p-6 md:p-10 overflow-y-auto h-screen custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pb-16 space-y-10 md:space-y-12"
        >
          {/* --- Narrative Header Section --- */}
          <motion.div variants={itemVariants} className="pt-4 space-y-4 md:space-y-6 md:pt-0">
            <div className="flex items-center gap-2 text-[#00daf3]">
              <Sparkles size={16} className="animate-[spin_4s_linear_infinite]" />
              <span className="text-xs font-semibold tracking-wider uppercase md:text-sm">
                বইয়ের সূচনাপর্ব (Introduction)
              </span>
            </div>
            <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {startData.title}
            </h1>
            <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#4f46e5] to-[#00daf3] rounded-full" />
          </motion.div>

          {/* --- Story Paragraphs --- */}
          <motion.div variants={itemVariants} className="space-y-5 md:space-y-6 text-[#c6c5d4] font-sans text-base sm:text-lg md:text-xl lg:text-[21px] leading-relaxed md:leading-relaxed text-justify md:text-left">
            <p className="first-letter:text-5xl md:first-letter:text-6xl first-letter:font-extrabold first-letter:text-[#00daf3] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
              {startData.paragraphs[0]}
            </p>
            
            {startData.paragraphs.slice(1, 4).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            {/* Dynamic Father-Daughter Quote Card */}
            <div className="p-5 md:p-8 my-6 md:my-8 rounded-xl md:rounded-2xl border border-[#00daf3]/20 bg-[#0d1117]/60 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] md:opacity-[0.04]">
                <Brain className="w-24 h-24 md:w-40 md:h-40 text-[#00daf3]" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl italic font-medium text-[#bdf4ff] leading-relaxed mb-4 md:mb-6 font-serif text-center md:text-left">
                "{startData.paragraphs[4]}"
              </p>
              <div className="text-right md:text-left">
                <span className="text-sm md:text-lg text-[#00daf3] font-bold">
                  — রায়ান সাহেব <span className="text-xs font-normal text-slate-400 md:text-sm">(রিমিশার বাবা)</span>
                </span>
              </div>
            </div>

            {startData.paragraphs.slice(5).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </motion.div>

          {/* --- Rimisha's Engineering Diary Logbook --- */}
          <motion.div variants={itemVariants} className="mt-10 space-y-6 font-sans bg-transparent md:mt-16">
            {/* Header / Meta Info */}
            <div className="flex flex-col items-start justify-between gap-4 pb-5 border-b md:pb-6 sm:flex-row sm:items-center border-white/10">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-extrabold text-[#00daf3] tracking-widest uppercase mb-1.5 md:mb-2">
                  <PenTool size={14} className="text-[#00daf3] drop-shadow-[0_0_3px_#00daf3]" />
                  রিমিশার ইঞ্জিনিয়ারিং লগবুক
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00daf3] leading-tight tracking-wide">
                  {startData.logbook.title}
                </h2>
                <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#00daf3] to-[#d846ef] rounded-full mt-3 md:mt-4" />
              </div>

              {/* Date & Mission Tags */}
              <div className="flex flex-row flex-wrap items-start w-full gap-2 mt-2 sm:flex-col sm:items-end sm:w-auto sm:mt-0">
                <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-3.5 md:py-1 rounded-full bg-[#0d1117]/80 border border-white/10 text-[10px] md:text-sm text-[#8080a0] font-bold shadow-sm">
                  <Calendar size={12} className="text-[#00daf3] md:w-3.5 md:h-3.5" /> 
                  {startData.logbook.date}
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-3.5 md:py-1 rounded-full bg-[#0d1117]/80 border border-white/10 text-[10px] md:text-sm text-[#8080a0] font-bold shadow-sm">
                  <Shield size={12} className="text-[#d846ef] md:w-3.5 md:h-3.5" /> 
                  {startData.logbook.mission}
                </div>
              </div>
            </div>

            {/* Diary Content */}
            <div className="relative pl-4 md:pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00daf3] to-[#d846ef] rounded-full opacity-60 shadow-[0_0_8px_#00daf3]" />
              <div className="bg-[#161b22]/50 border border-white/10 hover:bg-[#161b22]/80 hover:border-[#00daf3]/30 transition-all rounded-xl md:rounded-2xl p-5 md:p-8 shadow-xl">
                <div className="text-base sm:text-lg md:text-xl lg:text-[21px] text-[#d8b4fe] leading-relaxed md:leading-relaxed whitespace-pre-line font-serif italic text-justify md:text-left">
                  {startData.logbook.content}
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- Start Reading CTA Section --- */}
          <motion.div variants={itemVariants} className="flex justify-center pt-8 border-t md:pt-10 border-white/5">
            <Link to="/word/artificial-intelligence" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#00daf3] text-white font-extrabold text-sm md:text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(0,227,253,0.5)] transition-all hover:scale-[1.02] active:scale-95 group">
                <Play size={18} className="fill-current md:w-5 md:h-5" />
                <span className="truncate">প্রথম অধ্যায়: {startData.getting_started_cta}</span>
              </button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
