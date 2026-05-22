import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDigit, Sparkles, BookOpen, ChevronRight, CheckCircle, XCircle, FlaskConical, Table, Eye, Database, Zap, Heart, SlidersHorizontal } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import inputDataContent from './inputData.json';
import SimulationLab from './SimulationLab';
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';

export default function InputDataDetailsPage() {
  const { bookSlug: urlBookSlug } = useParams();
  const bookSlug = urlBookSlug || 'ml-by-ramim';
  
  const [activeTab, setActiveTab] = useState('reading');
  const [pollSelected, setPollSelected] = useState(null);
  const [blenderRunning, setBlenderRunning] = useState(false);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-6 md:py-8 space-y-8 text-[#dfe0ff]">
      
      {/* Header Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('reading')} className={`relative flex items-center gap-2 pb-2 font-bold text-sm transition-colors ${activeTab === 'reading' ? 'text-[#00daf3]' : 'text-[#8080a0]'}`}>
            <BookOpen size={16} /> 📖 পাঠ্যক্রম (Lesson)
            {activeTab === 'reading' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00daf3]" />}
          </button>
          <button onClick={() => setActiveTab('lab')} className={`relative flex items-center gap-2 pb-2 font-bold text-sm transition-colors ${activeTab === 'lab' ? 'text-teal-400' : 'text-[#8080a0]'}`}>
            <FlaskConical size={16} /> 🔬 ল্যাব সিমুলেটর
            {activeTab === 'lab' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400" />}
          </button>
        </div>
        <div className="hidden sm:block text-xs font-mono tracking-widest text-[#8080a0]">
          ML WORD BY WORD • CHAPTER 1
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reading' ? (
          <motion.div key="reading" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} className="space-y-12 text-[#c6c5d4]">
            
            <motion.div variants={itemVariants} className="pb-4 space-y-2 border-b border-white/5">
              <div className="text-xs font-bold text-[#00daf3] tracking-wide uppercase">{inputDataContent.chapter} / {inputDataContent.part}</div>
              <h1 className="flex items-center gap-2 text-3xl font-extrabold text-white">
                <FileDigit className="text-[#00daf3]" size={28} /> {inputDataContent.word_bn} <span className="text-lg font-normal text-[#8080a0]">({inputDataContent.word_en})</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="grid items-start grid-cols-1 gap-8 md:grid-cols-12">
              <div className="space-y-4 md:col-span-7">
                <div className="flex items-center gap-2 text-[#d846ef] font-bold text-xs uppercase tracking-wider"><Sparkles size={16} />{inputDataContent.real_world_flash.title}</div>
                {inputDataContent.real_world_flash.paragraphs.map((p, idx) => <p key={idx} className="text-lg text-justify indent-6">{p}</p>)}
              </div>
              <div className="flex justify-center pt-2 md:col-span-5">
                <div className="w-full max-w-[280px] rounded-2xl bg-[#070512] border border-white/5 p-5 shadow-xl flex flex-col items-center">
                  <div className="w-28 h-28 border border-dashed border-[#00daf3]/30 flex flex-col items-center justify-center p-2 rounded-xl mb-4 transition-all">
                    <motion.div
                      animate={blenderRunning ? { rotate: 360 } : { rotate: 0 }}
                      transition={blenderRunning ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                      className="text-[#00daf3]"
                    >
                      <SlidersHorizontal size={44} />
                    </motion.div>
                    <span className="text-[10px] uppercase font-mono mt-3 text-white block tracking-widest">
                      {blenderRunning ? "PROCESSING INPUT" : "WAITING FOR RAW"}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold text-center whitespace-pre-line leading-relaxed mb-4 h-8 ${blenderRunning ? 'text-[#d846ef]' : 'text-[#00daf3]'}`}>
                    {blenderRunning ? "Feed: Raw Mango + Milk\nOutput: Mango Shake ✓" : "Dataset: Total Grocery Store\nInput: Targeted Slice"}
                  </span>
                  <button onClick={() => setBlenderRunning(!blenderRunning)} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-colors w-full">
                    {blenderRunning ? "Stop Model Processing" : "Feed Input Data"}
                  </button>
                </div>
              </div>
            </motion.div>

            <StoryDialogue title={inputDataContent.story_prose.title} dialogues={inputDataContent.story_prose.paragraphs.map(p => ({text: p}))} itemVariants={itemVariants} />
            <ComparisonTable tableData={inputDataContent.comparison_table} itemVariants={itemVariants} />

            <LogbookContainer title={inputDataContent.word_bn} subtitle={inputDataContent.word_en} date={inputDataContent.engineering_logbook.date} itemVariants={itemVariants}>
              <LogbookItem number="১" icon={FileDigit} title={inputDataContent.engineering_logbook.points[0].title}><p>{inputDataContent.engineering_logbook.points[0].description}</p></LogbookItem>
              <LogbookItem number="২" icon={Database} title={inputDataContent.engineering_logbook.points[1].title}><p>{inputDataContent.engineering_logbook.points[1].description}</p></LogbookItem>
              <LogbookItem number="৩" icon={Table} title={inputDataContent.engineering_logbook.points[2].title}>
                <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2">
                  {inputDataContent.engineering_logbook.points[2].description.split('\n').map((listItem, i) => (
                    <div key={i} className="bg-[#0d1117]/60 border border-white/10 rounded-lg p-4 shadow-sm">
                      <strong className={`text-sm block mb-1.5 ${i === 0 ? 'text-[#00daf3]' : 'text-[#d846ef]'}`}>
                        {listItem.split(':')[0].replace('• ', '')}
                      </strong> 
                      <span className="text-sm text-[#c6c5d4]">{listItem.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
              </LogbookItem>
              <LogbookItem number="৪" icon={Heart} title={inputDataContent.engineering_logbook.points[3].title} isHighlight={true}><p className="italic font-serif text-[#d8b4fe]">"{inputDataContent.engineering_logbook.points[3].description}"</p></LogbookItem>
            </LogbookContainer>

            {/* Inline Reflection Poll */}
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#4f46e5]/3 to-[#d846ef]/3 shadow-md space-y-4">
              <h3 className="flex gap-2 text-lg font-bold text-white"><Sparkles className="text-[#d846ef]" size={18}/>{inputDataContent.readers_reflection.title}</h3>
              <p className="font-serif italic leading-relaxed whitespace-pre-line">{inputDataContent.readers_reflection.question}</p>
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                {inputDataContent.readers_reflection.options.map((option, idx) => (
                  <button key={idx} onClick={() => setPollSelected(option.id)} className={`p-4 rounded-xl border text-left flex gap-2.5 ${pollSelected === option.id ? (option.isCorrect ? 'bg-green-500/10 border-green-500/40 text-white animate-pulse' : 'bg-red-500/10 border-red-500/40 text-white') : 'bg-white/5 border-white/10 text-slate-400'}`}>
                    <div className="mt-0.5">{pollSelected === option.id ? (option.isCorrect ? <CheckCircle className="text-green-500" size={18}/> : <XCircle className="text-red-500" size={18}/>) : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">{idx === 0 ? '১' : '২'}</div>}</div>
                    <div><span className="font-bold block text-white mb-0.5">অপশন {idx === 0 ? '১' : '২'}</span>{option.text}</div>
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {pollSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-lg border bg-white/[0.01] border-white/10 text-[#c6c5d4] mt-4 text-sm leading-relaxed">
                    {inputDataContent.readers_reflection.options.map(option => pollSelected === option.id && (
                      <div key={option.id} className="space-y-1">
                        <span className={`flex items-center gap-1 font-bold ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{option.isCorrect ? <CheckCircle size={14}/> : <XCircle size={14}/>} {option.isCorrect ? 'একদম ফাটাফাটি! সঠিক উত্তর!' : 'উত্তরটি সঠিক হয়নি!'}</span>
                        <p>{option.explanation}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Teaser CTA */}
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#00daf3]/20 bg-[#1c0c35]">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00daf3] uppercase flex items-center gap-1 mb-2">
                <SlidersHorizontal size={12} className="text-[#00daf3]" /> NEXT STEP INGREDIENT
              </span>
              <p className="text-[#c6c5d4] mb-3 italic">{inputDataContent.next_intro.text}</p>
              <button onClick={() => { setActiveTab('lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-5 py-2.5 bg-[#00daf3] text-[#001f24] rounded-lg text-sm font-bold flex gap-2 shadow-[0_0_12px_rgba(0,227,253,0.3)] hover:bg-[#9cf0ff] transition-all">
                ল্যাব সিমুলেটরে ডেটা ইনপুট দিন <ChevronRight size={14}/>
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