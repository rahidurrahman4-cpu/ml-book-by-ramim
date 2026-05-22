import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cog, Sparkles, Sliders, BookOpen, ChevronRight, CheckCircle, XCircle, FlaskConical, Target, Layers, Activity, Heart, Compass } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import automationData from './Automation.json';
import SimulationLab from './SimulationLab';
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';

export default function AutomationDetailsPage() {
  const { bookSlug: urlBookSlug } = useParams();
  const bookSlug = urlBookSlug || 'ml-by-ramim';
  
  const [activeTab, setActiveTab] = useState('reading');
  const [pollSelected, setPollSelected] = useState(null);
  const [isSmartMode, setIsSmartMode] = useState(false);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-5 md:px-16 py-5 md:py-8 space-y-6 md:space-y-8 text-[#dfe0ff]">
      
      {/* Header Tabs */}
      <div className="flex flex-col gap-3 pb-2 border-b border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button onClick={() => setActiveTab('reading')} className={`relative flex items-center gap-2 pb-2 font-bold text-[13px] sm:text-sm transition-colors ${activeTab === 'reading' ? 'text-[#00daf3]' : 'text-[#8080a0]'}`}>
            <BookOpen size={16} /> 📖 পাঠ্যক্রম (Lesson)
            {activeTab === 'reading' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00daf3]" />}
          </button>
          <button onClick={() => setActiveTab('lab')} className={`relative flex items-center gap-2 pb-2 font-bold text-[13px] sm:text-sm transition-colors ${activeTab === 'lab' ? 'text-sky-400' : 'text-[#8080a0]'}`}>
            <FlaskConical size={16} /> 🔬 ল্যাব সিমুলেটর
            {activeTab === 'lab' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />}
          </button>
        </div>
        <div className="hidden sm:block text-[11px] font-mono tracking-widest text-[#8080a0]">
          ML WORD BY WORD • CHAPTER 1
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reading' ? (
          <motion.div key="reading" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} className="space-y-10 md:space-y-12 text-[#c6c5d4]">
            
            <motion.div variants={itemVariants} className="pb-4 space-y-2 border-b border-white/5">
              <div className="text-[11px] sm:text-xs font-bold text-[#00daf3] tracking-wide uppercase">{automationData.chapter} / {automationData.part}</div>
              <h1 className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
                <Cog className="text-[#00daf3] animate-[spin_4s_linear_infinite]" size={24} /> 
                {automationData.word_bn} <span className="text-sm sm:text-lg font-normal text-[#8080a0]">({automationData.word_en})</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="grid items-start grid-cols-1 gap-6 md:gap-8 md:grid-cols-12">
              <div className="space-y-4 md:col-span-7">
                <div className="flex items-center gap-2 text-[#d846ef] font-bold text-[11px] sm:text-xs uppercase tracking-wider"><Sparkles size={15} />{automationData.real_world_flash.title}</div>
                {automationData.real_world_flash.paragraphs.map((p, idx) => <p key={idx} className="text-[14px] sm:text-lg text-justify leading-relaxed indent-5 sm:indent-6">{p}</p>)}
              </div>
              <div className="flex justify-center pt-2 md:col-span-5">
                <div className="w-full max-w-[280px] rounded-2xl bg-[#070512] border border-white/5 p-4 sm:p-5 shadow-xl flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-[#00daf3]/30 flex flex-col items-center justify-center p-2 text-center mb-4 transition-all">
                    <Sliders size={32} className={`${isSmartMode ? "text-[#d846ef]" : "text-[#00daf3]"} transition-colors`} />
                    <span className="text-[10px] uppercase font-mono mt-1 text-white block">
                      {isSmartMode ? "Intelligent" : "Fixed Timer"}
                    </span>
                  </div>
                  <span className={`text-[11px] sm:text-xs font-mono font-bold text-center whitespace-pre-wrap leading-relaxed mb-4 h-8 ${isSmartMode ? "text-[#d846ef]" : "text-[#00daf3]"}`}>
                    {isSmartMode ? "REACTION: \nAdapts to environment" : "ACTION: \nRuns strictly by rule"}
                  </span>
                  <button onClick={() => setIsSmartMode(!isSmartMode)} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-colors w-full">
                    Switch to {isSmartMode ? "Fixed Automation" : "AI Automation"}
                  </button>
                </div>
              </div>
            </motion.div>

            <StoryDialogue title={automationData.story_prose.title} dialogues={automationData.story_prose.paragraphs.map(p => ({text: p}))} itemVariants={itemVariants} />
            <ComparisonTable tableData={automationData.comparison_table} itemVariants={itemVariants} />

            <LogbookContainer title={automationData.word_bn} subtitle={automationData.word_en} date={automationData.engineering_logbook.date} itemVariants={itemVariants}>
              <LogbookItem number="১" icon={Target} title={automationData.engineering_logbook.points[0].title}><p>{automationData.engineering_logbook.points[0].description}</p></LogbookItem>
              <LogbookItem number="২" icon={Layers} title={automationData.engineering_logbook.points[1].title}>
                <ul className="space-y-3">
                  <li className="bg-[#0d1117]/60 border border-white/5 rounded-lg p-4 text-base md:text-lg text-[#c6c5d4] leading-relaxed">
                    <strong className="text-[#00daf3] block mb-1">▪️ ফিক্সড অটোমেশন (Fixed):</strong> 
                    {automationData.engineering_logbook.points[1].description.split('• ইন্টেলিজেন্ট অটোমেশন (Intelligent Automation):')[0].replace('• ফিক্সড অটোমেশন (Fixed Automation):', '').trim()}
                  </li>
                  <li className="bg-[#0d1117]/60 border border-white/5 rounded-lg p-4 text-base md:text-lg text-[#c6c5d4] leading-relaxed">
                    <strong className="text-[#d846ef] block mb-1">▪️ ইন্টেলিজেন্ট অটোমেশন (Intelligent):</strong> 
                    {automationData.engineering_logbook.points[1].description.split('• ইন্টেলিজেন্ট অটোমেশন (Intelligent Automation):')[1].trim()}
                  </li>
                </ul>
              </LogbookItem>
              <LogbookItem number="৩" icon={Activity} title={automationData.engineering_logbook.points[2].title}><p>{automationData.engineering_logbook.points[2].description}</p></LogbookItem>
              <LogbookItem number="৪" icon={Heart} title={automationData.engineering_logbook.points[3].title} isHighlight={true}><p className="italic font-serif text-[#d8b4fe]">"{automationData.engineering_logbook.points[3].description}"</p></LogbookItem>
            </LogbookContainer>

            {/* Inline Reflection Poll */}
            <motion.div variants={itemVariants} className="p-4 sm:p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#4f46e5]/3 to-[#d846ef]/3 shadow-md space-y-4">
              <h3 className="flex gap-2 text-base sm:text-lg font-bold text-white"><Sparkles className="text-[#d846ef] mt-0.5" size={17}/>{automationData.readers_reflection.title}</h3>
              <p className="font-serif italic whitespace-pre-line text-[14px] sm:text-base leading-relaxed">{automationData.readers_reflection.question}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {automationData.readers_reflection.options.map((option, idx) => (
                  <button key={idx} onClick={() => setPollSelected(option.id)} className={`p-3.5 sm:p-4 rounded-xl border text-left flex gap-2.5 ${pollSelected === option.id ? (option.isCorrect ? 'bg-green-500/10 border-green-500/40 text-white animate-pulse' : 'bg-red-500/10 border-red-500/40 text-white') : 'bg-white/5 border-white/10 text-slate-400'}`}>
                    <div className="mt-0.5">{pollSelected === option.id ? (option.isCorrect ? <CheckCircle className="text-green-500" size={18}/> : <XCircle className="text-red-500" size={18}/>) : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">{idx === 0 ? '১' : '২'}</div>}</div>
                    <div className="text-[13px] sm:text-sm"><span className="block font-bold text-white">অপশন {idx === 0 ? '১' : '২'}</span>{option.text}</div>
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {pollSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-lg border bg-white/[0.01] border-white/10 text-[#c6c5d4] mt-4 text-[13px] sm:text-sm leading-relaxed">
                    {automationData.readers_reflection.options.map(option => pollSelected === option.id && (
                      <div key={option.id} className="space-y-1">
                        <span className={`flex items-center gap-1 font-bold ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{option.isCorrect ? <CheckCircle size={14}/> : <XCircle size={14}/>} {option.isCorrect ? 'একদম সঠিক উত্তর!' : 'উত্তরটি সঠিক হয়নি!'}</span>
                        <p>{option.explanation}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Teaser CTA */}
            <motion.div variants={itemVariants} className="p-4 sm:p-6 rounded-xl border border-[#00daf3]/20 bg-[#1c0c35]">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00daf3] uppercase flex items-center gap-1 mb-2">
                <Compass size={12} className="animate-[spin_3s_linear_infinite]" /> ENTERING CHAPTER 2: THE MACHINE ENGINE
              </span>
              <p className="text-[13px] sm:text-base text-[#c6c5d4] mb-3 italic leading-relaxed">{automationData.next_intro.text}</p>
              <button onClick={() => { setActiveTab('lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-[#00daf3] text-[#001f24] rounded-lg text-[13px] sm:text-sm font-bold shadow-[0_0_12px_rgba(0,227,253,0.3)] hover:bg-[#9cf0ff]">
                ল্যাব সিমুলেটরে পাম্প টেস্ট করুন <ChevronRight size={14}/>
              </button>
            </motion.div>

          </motion.div>
        ) : (
          <motion.div key="lab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-2 pb-10">
            <SimulationLab />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}