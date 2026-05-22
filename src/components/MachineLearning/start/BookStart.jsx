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
    <div className="flex-1 bg-[#0b0f19] text-slate-200 p-6 md:p-10 overflow-y-auto h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pb-16 space-y-12"
        >
          {/* Narrative Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-2 text-[#00daf3]">
              <Sparkles size={18} className="animate-[spin_4s_linear_infinite]" />
              <span className="text-sm font-semibold tracking-wider uppercase">বইয়ের সূচনাপর্ব (Introduction)</span>
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
              {startData.title}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-[#4f46e5] to-[#00daf3] rounded-full" />
          </motion.div>

          {/* Story Paragraphs */}
          <motion.div variants={itemVariants} className="space-y-6 text-[#c6c5d4] font-sans text-lg md:text-xl lg:text-[21px] leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#00daf3] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
              {startData.paragraphs[0]}
            </p>
            
            {startData.paragraphs.slice(1, 4).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            {/* Dynamic Father-Daughter Quote Card */}
            <div className="p-6 md:p-8 my-8 rounded-xl border border-[#00daf3]/20 bg-[#0d1117]/60 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                <Brain size={160} className="text-[#00daf3]" />
              </div>
              <p className="text-xl md:text-2xl italic font-medium text-[#bdf4ff] leading-relaxed mb-4 font-serif">
                {startData.paragraphs[4]}
              </p>
              <span className="text-base md:text-lg text-[#00daf3] font-bold">— রায়ান সাহেব (রিমিশার বাবা)</span>
            </div>

            {startData.paragraphs.slice(5).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </motion.div>

          {/* Rimisha's Engineering Diary Logbook */}
          <motion.div variants={itemVariants} className="mt-12 space-y-6 font-sans bg-transparent">
            <div className="flex flex-col items-start justify-between gap-4 pb-6 border-b sm:flex-row sm:items-center border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#00daf3] tracking-widest uppercase mb-2">
                  <PenTool size={14} className="text-[#00daf3] drop-shadow-[0_0_3px_#00daf3]" />
                  রিমিশার ইঞ্জিনিয়ারিং লগবুক
                </div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00daf3] leading-none tracking-wide">
                  {startData.logbook.title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#00daf3] to-[#d846ef] rounded-full mt-4" />
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1117]/80 border border-white/10 text-xs md:text-sm text-[#8080a0] font-bold shadow-lg">
                  <Calendar size={14} className="text-[#00daf3]" /> 
                  {startData.logbook.date}
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1117]/80 border border-white/10 text-xs md:text-sm text-[#8080a0] font-bold shadow-lg">
                  <Shield size={14} className="text-[#d846ef]" /> 
                  {startData.logbook.mission}
                </div>
              </div>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00daf3] to-[#d846ef] rounded-full opacity-60 shadow-[0_0_10px_#00daf3]" />
              <div className="bg-[#161b22]/50 border border-white/10 hover:bg-[#161b22]/80 hover:border-[#00daf3]/30 transition-all rounded-xl p-6 md:p-8 shadow-xl">
                <div className="text-lg md:text-xl lg:text-[21px] text-[#d8b4fe] leading-relaxed whitespace-pre-line font-serif italic text-justify">
                  {startData.logbook.content}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Start Reading CTA Section */}
          <motion.div variants={itemVariants} className="flex justify-center pt-6 border-t border-white/5">
            {/* লিংকটিকে আমাদের বর্তমান রাউটিং অনুযায়ী সেট করা হয়েছে */}
            <Link to="/word/artificial-intelligence">
              <button className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#00daf3] text-white font-extrabold text-lg shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(0,227,253,0.5)] transition-all hover:scale-105 active:scale-95 group">
                <Play size={20} className="fill-current" />
                প্রথম অধ্যায়: {startData.getting_started_cta}
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}