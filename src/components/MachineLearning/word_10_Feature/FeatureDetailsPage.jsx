import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Sparkles, Filter, Smartphone, CheckCircle, XCircle, FlaskConical, BookOpen, ChevronRight, Zap, HelpCircle, Layers, Heart, Fingerprint, Database } from 'lucide-react';

import featureData from './feature.json';
import SimulationLab from './SimulationLab';
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';

export default function FeatureDetailsPage() {
  const [activeTab, setActiveTab] = useState('reading'); 
  const [pollSelected, setPollSelected] = useState(null); 
  const [filterNoise, setFilterNoise] = useState(false);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-4 md:py-8 space-y-6 md:space-y-8 text-[#dfe0ff]">
      
      {/* Header Tabs */}
      <div className="flex flex-col gap-3 pb-3 border-b sm:flex-row sm:items-center sm:justify-between border-white/10 md:pb-2">
        <div className="flex w-full gap-2 sm:gap-4 sm:w-auto">
          <button onClick={() => setActiveTab('reading')} className={`flex-1 sm:flex-none relative flex items-center justify-center sm:justify-start gap-2 pb-2 font-bold text-xs sm:text-sm transition-colors ${activeTab === 'reading' ? 'text-[#00daf3]' : 'text-[#8080a0]'}`}>
            <BookOpen size={16} className="shrink-0" /> 📖 পাঠ্যক্রম (Lesson)
            {activeTab === 'reading' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00daf3]" />}
          </button>
          <button onClick={() => setActiveTab('lab')} className={`flex-1 sm:flex-none relative flex items-center justify-center sm:justify-start gap-2 pb-2 font-bold text-xs sm:text-sm transition-colors ${activeTab === 'lab' ? 'text-indigo-400' : 'text-[#8080a0]'}`}>
            <FlaskConical size={16} className="shrink-0" /> 🔬 ল্যাব সিমুলেটর
            {activeTab === 'lab' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400" />}
          </button>
        </div>
        <div className="hidden sm:block text-[11px] font-mono tracking-widest text-[#8080a0]">
          ML WORD BY WORD • CHAPTER 1
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reading' ? (
          <motion.div key="reading" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} className="space-y-10 md:space-y-12 font-sans text-base sm:text-lg md:text-xl lg:text-[21px] leading-relaxed text-[#c6c5d4]">
            
            <motion.div variants={itemVariants} className="pb-4 space-y-2 border-b border-white/5">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-[#00daf3] tracking-wide uppercase">
                <span>{featureData.chapter}</span> / <span>{featureData.part}</span>
              </div>
              <h1 className="flex flex-col items-start gap-2 text-2xl sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:text-3xl font-extrabold text-white">
                <SlidersHorizontal className="text-[#00daf3]" size={22} />
                <span className="flex flex-wrap items-center gap-2 leading-tight">{featureData.word_bn} <span className="text-sm sm:text-lg font-normal text-[#8080a0]">({featureData.word_en})</span></span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="grid items-start grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-7">
                <div className="flex items-center gap-2 min-w-0 text-[#d846ef] font-bold text-[11px] sm:text-xs uppercase tracking-wider"><Sparkles size={15} /> {featureData.real_world_flash.title}</div>
                {featureData.real_world_flash.paragraphs.map((p, i) => <p key={i} className="text-[14px] sm:text-lg text-justify leading-relaxed indent-5 sm:indent-6">{p}</p>)}
              </div>
              <div className="flex justify-center pt-2 lg:col-span-5">
                <div className="relative w-full max-w-[280px] rounded-2xl border border-white/10 bg-[#070512] flex flex-col items-center justify-center p-4 sm:p-5 shadow-xl">
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 border border-dashed border-[#00daf3]/30 flex flex-col items-center justify-center rounded-xl bg-white/[0.02] mb-4">
                    {filterNoise ? <Filter size={36} className="text-[#00daf3] animate-pulse sm:text-[40px]" /> : <Smartphone size={36} className="text-amber-400 sm:text-[40px]" />}
                    <span className="mt-3 px-2 text-center font-mono text-[9px] uppercase text-white sm:text-[10px]">{filterNoise ? "EXTRACTING FEATURES" : "RAW INPUT DATA"}</span>
                  </div>
                  <button onClick={() => setFilterNoise(!filterNoise)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white sm:text-[11px]">
                    {filterNoise ? "Reset" : "Run Feature Engineering"}
                  </button>
                </div>
              </div>
            </motion.div>

            <StoryDialogue title={featureData.story_prose.title} dialogues={featureData.story_prose.paragraphs.map(p => ({text: p}))} itemVariants={itemVariants} />
            <ComparisonTable tableData={featureData.comparison_table} itemVariants={itemVariants} />

            <LogbookContainer title={featureData.word_bn} subtitle={featureData.word_en} date={featureData.engineering_logbook.date} itemVariants={itemVariants}>
              <LogbookItem number="১" icon={HelpCircle} title={featureData.engineering_logbook.points[0].title}><p>{featureData.engineering_logbook.points[0].description}</p></LogbookItem>
              <LogbookItem number="২" icon={Database} title={featureData.engineering_logbook.points[1].title}><p>{featureData.engineering_logbook.points[1].description}</p></LogbookItem>
              <LogbookItem number="৩" icon={Layers} title={featureData.engineering_logbook.points[2].title}><p>{featureData.engineering_logbook.points[2].description}</p></LogbookItem>
              <LogbookItem number="৪" icon={Heart} title={featureData.engineering_logbook.points[3].title} isHighlight={true}><p className="italic font-serif text-[#d8b4fe]">"{featureData.engineering_logbook.points[3].description}"</p></LogbookItem>
            </LogbookContainer>

            {/* Inline Reflection Poll */}
            <motion.div variants={itemVariants} className="p-4 sm:p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#4f46e5]/3 to-[#d846ef]/3 shadow-md space-y-4">
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-white"><Zap className="text-[#d846ef]" size={17}/> {featureData.readers_reflection.title}</h3>
              <p className="font-serif italic leading-relaxed whitespace-pre-line text-[14px] sm:text-base">{featureData.readers_reflection.question}</p>
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 sm:gap-4">
                {featureData.readers_reflection.options.map((option, idx) => (
                  <button key={idx} onClick={() => setPollSelected(option.id)} className={`rounded-xl border p-3 text-left flex flex-col gap-2 sm:flex-row sm:gap-2.5 sm:p-3.5 ${pollSelected === option.id ? (option.isCorrect ? 'bg-green-500/10 border-green-500/40 text-white animate-pulse' : 'bg-red-500/10 border-red-500/40 text-white') : 'bg-white/5 border-white/10 text-slate-400'}`}>
                    <div className="mt-0.5">{pollSelected === option.id ? (option.isCorrect ? <CheckCircle className="text-green-500" size={18}/> : <XCircle className="text-red-500" size={18}/>) : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">{idx === 0 ? '১' : '২'}</div>}</div>
                    <div className="text-[13px] sm:text-sm"><span className="font-bold block text-white mb-0.5">অপশন {idx === 0 ? '১' : '২'}</span>{option.text}</div>
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {pollSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-lg border bg-white/[0.01] border-white/10 text-[#c6c5d4] mt-4 text-[13px] sm:text-sm leading-relaxed">
                    {featureData.readers_reflection.options.map(option => pollSelected === option.id && (
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
                <Fingerprint size={12} className="text-[#00daf3]" /> NEXT STEP INGREDIENT
              </span>
              <p className="text-[13px] sm:text-base text-[#c6c5d4] mb-3 italic leading-relaxed">{featureData.next_intro.text}</p>
              <button onClick={() => { setActiveTab('lab'); document.querySelector("[data-reader-scroll]")?.scrollTo?.({ top: 0, behavior: 'smooth' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00daf3] px-4 py-2.5 text-[13px] font-bold text-[#001f24] shadow-[0_0_12px_rgba(0,227,253,0.3)] transition-all hover:bg-[#9cf0ff] sm:w-auto sm:px-5 sm:text-sm">
                ল্যাব সিমুলেটরে ফেস আইডি টেস্ট করুন <ChevronRight size={14}/>
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

