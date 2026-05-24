import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Sparkles, BookOpen, FlaskConical, Target, Layers, Heart, Compass, ArrowRight, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

import patternData from './pattern.json';
import SimulationLab from './SimulationLab';
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';
import WordNavigation from '../../UI/WordNavigation';

export default function PatternDetailsPage() {
  const [activeTab, setActiveTab] = useState('reading');
  const [pollSelected, setPollSelected] = useState(null);
  const [sequenceGuess, setSequenceGuess] = useState('');
  const [sequenceFeedback, setSequenceFeedback] = useState(null);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  const handleSequenceCheck = (e) => {
    e.preventDefault();
    setSequenceFeedback(sequenceGuess === '10' || sequenceGuess === '১০' ? 'correct' : 'incorrect');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-4 md:py-8 space-y-6 md:space-y-8 text-slate-300 bg-[#070b12]">
      
      {/* --- Tab Switcher Header --- */}
      <div className="flex flex-col gap-3 pb-3 border-b sm:flex-row sm:items-center sm:justify-between border-white/10 md:pb-2">
        <div className="flex w-full gap-2 sm:gap-4 sm:w-auto">
          <button onClick={() => setActiveTab('reading')} className={`flex-1 sm:flex-none relative flex items-center justify-center sm:justify-start gap-2 pb-2 font-bold text-xs sm:text-sm transition-colors ${activeTab === 'reading' ? 'text-slate-100' : 'text-slate-500 hover:text-slate-300'}`}>
            <BookOpen size={16} className="shrink-0" /> <span className="whitespace-nowrap">📖 পাঠ্যক্রম (Lesson)</span>
            {activeTab === 'reading' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-500" />}
          </button>
          <button onClick={() => setActiveTab('lab')} className={`flex-1 sm:flex-none relative flex items-center justify-center sm:justify-start gap-2 pb-2 font-bold text-xs sm:text-sm transition-colors ${activeTab === 'lab' ? 'text-slate-100' : 'text-slate-500 hover:text-slate-300'}`}>
            <FlaskConical size={16} className="shrink-0" /> <span className="whitespace-nowrap">🔬 ল্যাব সিমুলেটর</span>
            {activeTab === 'lab' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-500" />}
          </button>
        </div>
        <div className="hidden sm:block text-[10px] md:text-xs font-mono tracking-widest text-slate-500 uppercase">
          {patternData.chapter} • {patternData.part}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reading' ? (
          <motion.div key="reading" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} className="space-y-10 md:space-y-12 font-sans text-base sm:text-lg md:text-xl lg:text-[21px] leading-relaxed text-slate-300">
            
            {/* --- Header --- */}
            <motion.div variants={itemVariants} className="pb-3 space-y-1 font-sans border-b md:pb-4 md:space-y-2 border-white/5">
              <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold text-slate-500 tracking-wide uppercase">
                <span className="hidden sm:inline">{patternData.part}</span>
              </div>
              <h1 className="flex flex-col items-start gap-2 text-2xl font-extrabold sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:text-3xl lg:text-4xl text-slate-100">
                <Fingerprint className="w-6 h-6 text-slate-400 md:w-8 md:h-8 shrink-0" />
                <span className="flex flex-wrap items-center gap-2 leading-tight">
                  {patternData.word_bn} <span className="font-sans text-sm font-normal sm:text-lg text-slate-500">({patternData.word_en})</span>
                </span>
              </h1>
            </motion.div>

            {/* --- Real World Flash & Simulator --- */}
            <motion.div variants={itemVariants} className="grid items-start grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-7 md:space-y-4">
                <div className="flex items-center gap-2 font-sans text-slate-400">
                  <Sparkles size={16} className="shrink-0" /> 
                  <span className="text-sm font-bold leading-snug tracking-wider text-white uppercase sm:text-base md:text-lg">{patternData.real_world_flash.title}</span>
                </div>
                {patternData.real_world_flash.paragraphs.map((p, i) => <p key={i} className="text-justify indent-6">{p}</p>)}
              </div>
              
              {/* Sequence Guesser Simulator */}
              <div className="flex justify-center pt-2 lg:col-span-5">
                <div className="relative w-full max-w-[320px] rounded-3xl bg-[#0b111b] border border-white/10 p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center mx-auto overflow-hidden">
                  <div className="absolute top-0 w-24 h-3 -translate-x-1/2 bg-[#030712] rounded-b-xl left-1/2" />
                  
                  <p className="mb-5 text-sm font-bold text-slate-300">পরবর্তী সংখ্যাটি অনুমান করুন:</p>
                  
                  <div className="text-2xl sm:text-3xl font-black tracking-widest text-slate-200 bg-white/[0.02] py-4 px-4 sm:px-6 rounded-2xl border border-white/10 font-mono mb-6 w-full shadow-inner">
                    ২, ৪, ৬, ৮, <span className="text-slate-500 animate-pulse">?</span>
                  </div>
                  
                  <form onSubmit={handleSequenceCheck} className="flex w-full gap-2">
                    <input 
                      type="text" 
                      value={sequenceGuess} 
                      onChange={(e) => {setSequenceGuess(e.target.value); setSequenceFeedback(null);}} 
                      placeholder="উত্তর" 
                      className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-center font-bold text-slate-200 focus:border-slate-500 outline-none transition-all shadow-inner" 
                    />
                    <button type="submit" className="px-5 font-bold transition-all shadow-md text-slate-100 bg-slate-600 hover:bg-slate-500 rounded-xl active:scale-95">
                      Check
                    </button>
                  </form>
                  
                  <div className="h-6 mt-4">
                    {sequenceFeedback === 'correct' && (
                      <motion.span initial={{scale:0}} animate={{scale:1}} className="flex items-center justify-center gap-1 text-sm font-bold text-green-400">
                        <CheckCircle size={14}/> চমৎকার! এটাই প্যাটার্ন (+২)
                      </motion.span>
                    )}
                    {sequenceFeedback === 'incorrect' && (
                      <motion.span initial={{scale:0}} animate={{scale:1}} className="flex items-center justify-center gap-1 text-sm font-bold text-red-400">
                        <XCircle size={14}/> আবার চেষ্টা করুন!
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <StoryDialogue title={patternData.story_prose.title} dialogues={patternData.story_prose.paragraphs.map(p => ({text: p}))} itemVariants={itemVariants} />
            <ComparisonTable tableData={patternData.comparison_table} itemVariants={itemVariants} />

            <LogbookContainer title={patternData.word_bn} subtitle={patternData.word_en} date={patternData.engineering_logbook.date} itemVariants={itemVariants}>
              {patternData.engineering_logbook.points.map((pt, i) => (
                <LogbookItem key={i} number={pt.id} title={pt.title} icon={i === 3 ? Heart : i === 0 ? Target : Layers} isHighlight={i === 3}>
                  <p className={i === 3 ? 'font-serif italic text-slate-300 leading-relaxed' : 'text-justify'}>{pt.description}</p>
                </LogbookItem>
              ))}
            </LogbookContainer>

            {/* --- Readers Reflection Poll (Premium Styled) --- */}
            <motion.div variants={itemVariants} className="p-5 md:p-8 rounded-[2.5rem] border border-white/5 bg-[#0b111b] shadow-2xl space-y-6 font-sans relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-500/10 blur-3xl" />
              
              <h3 className="relative z-10 flex items-start gap-3 text-base font-bold text-slate-100 md:text-xl">
                <Sparkles className="mt-1 text-slate-400 shrink-0" size={20}/>
                <span className="leading-snug">{patternData.readers_reflection.title}</span>
              </h3>
              
              <p className="relative z-10 font-serif text-base italic leading-relaxed text-justify md:text-lg text-slate-300">
                {patternData.readers_reflection.question}
              </p>
              
              <div className="relative z-10 grid grid-cols-1 gap-4 pt-2 md:gap-5 sm:grid-cols-2">
                {patternData.readers_reflection.options.map((option, idx) => {
                  const displayId = idx === 0 ? '১' : '২';
                  return (
                    <button 
                      key={idx} 
                      onClick={() => setPollSelected(option.id)} 
                      className={`group p-4 md:p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                        pollSelected === option.id 
                          ? (option.isCorrect ? 'bg-green-500/10 border-green-500/40 text-slate-100' : 'bg-red-500/10 border-red-500/40 text-slate-100') 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full border flex items-center justify-center font-black text-xs transition-colors ${
                        pollSelected === option.id 
                          ? (option.isCorrect ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white') 
                          : 'border-white/20 group-hover:border-white/40'
                      }`}>
                        {pollSelected === option.id ? (option.isCorrect ? <CheckCircle size={14}/> : <XCircle size={14}/>) : displayId}
                      </div>
                      <div>
                        <span className="block mb-1 text-sm font-black tracking-widest uppercase opacity-50">Option {displayId}</span>
                        <span className="text-sm font-bold md:text-base">{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {pollSelected && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="p-4 md:p-5 rounded-2xl border bg-white/[0.02] border-white/10 text-slate-300 mt-4 shadow-inner relative z-10"
                  >
                    {patternData.readers_reflection.options.map(option => pollSelected === option.id && (
                      <div key={option.id} className="space-y-2">
                        <div className={`flex items-center gap-2 font-black text-sm uppercase tracking-widest ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {option.isCorrect ? 'Excellent!' : 'Try Again!'}
                        </div>
                        <p className="text-sm leading-relaxed text-justify md:text-base">{option.explanation}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* --- Next Chapter Teaser (Premium Styled) --- */}
            <motion.div variants={itemVariants} className="p-6 md:p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#0b111b] to-[#070b12] font-sans relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 blur-[100px] rounded-full group-hover:bg-slate-500/10 transition-all duration-700" />
              
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] text-slate-500 uppercase flex items-center gap-2 mb-2">
                  <Compass size={14} className="text-slate-400 animate-spin-slow" /> THE FINAL PRODUCT
                </span>
                <p className="max-w-3xl text-base italic leading-relaxed md:text-lg text-slate-400">
                  {patternData.next_intro?.text || "ডেটা থেকে প্যাটার্ন শেখার পর মেশিন চূড়ান্তভাবে যে জিনিসটি তৈরি করে, সেটিই হলো পরের শব্দ: মডেল (Model)।"}
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => { setActiveTab('lab'); document.querySelector("[data-reader-scroll]")?.scrollTo?.({ top: 0, behavior: 'smooth' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#070b12] font-black text-sm hover:bg-slate-200 transition-all group active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    ল্যাব সিমুলেটরে প্যাটার্ন খুঁজুন 
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* --- Bottom Navigation --- */}
            <motion.div variants={itemVariants} className="pt-4">
              <WordNavigation fallbackPath="pattern" />
            </motion.div>

          </motion.div>
        ) : (
          <motion.div key="lab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-2 pb-10 md:pt-4">
            <SimulationLab />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}