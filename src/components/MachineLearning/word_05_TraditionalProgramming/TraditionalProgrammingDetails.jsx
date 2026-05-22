import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Binary, Sparkles, CreditCard, BookOpen, ChevronRight, CheckCircle, XCircle, FlaskConical, Target, Code2, ShieldAlert, Heart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import traditionalData from './traditionalProgramming.json';
import SimulationLab from './SimulationLab';
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';

export default function TraditionalProgrammingDetails() {
  const { bookSlug: urlBookSlug } = useParams();
  const bookSlug = urlBookSlug || 'ml-by-ramim';
  
  const [activeTab, setActiveTab] = useState('reading');
  const [pollSelected, setPollSelected] = useState(null);
  const [pinMatched, setPinMatched] = useState(true);

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
          <button onClick={() => setActiveTab('lab')} className={`relative flex items-center gap-2 pb-2 font-bold text-sm transition-colors ${activeTab === 'lab' ? 'text-amber-400' : 'text-[#8080a0]'}`}>
            <FlaskConical size={16} /> 🔬 ল্যাব সিমুলেটর
            {activeTab === 'lab' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
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
              <div className="text-xs font-bold text-[#00daf3] tracking-wide uppercase">{traditionalData.chapter} / {traditionalData.part}</div>
              <h1 className="flex items-center gap-2 text-3xl font-extrabold text-white">
                <Binary className="text-[#00daf3]" size={28} /> {traditionalData.word_bn} <span className="text-lg font-normal text-[#8080a0]">({traditionalData.word_en})</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="grid items-start grid-cols-1 gap-8 md:grid-cols-12">
              <div className="space-y-4 md:col-span-7">
                <div className="flex items-center gap-2 text-[#d846ef] font-bold text-xs uppercase tracking-wider"><Sparkles size={16} />{traditionalData.real_world_flash.title}</div>
                {traditionalData.real_world_flash.paragraphs.map((p, idx) => <p key={idx} className="text-lg text-justify indent-6">{p}</p>)}
              </div>
              <div className="flex justify-center pt-2 md:col-span-5">
                <div className="w-full max-w-[280px] rounded-2xl bg-[#070512] border border-white/5 p-5 shadow-xl flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border border-dashed border-[#00daf3]/30 flex items-center justify-center relative mb-4">
                    <CreditCard size={36} className="text-[#00daf3] opacity-80" />
                    {pinMatched ? <div className="absolute -bottom-2 bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/30">PIN Valid</div> : <div className="absolute -bottom-2 bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded border border-red-500/30">Wrong PIN</div>}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00daf3] text-center whitespace-pre-wrap leading-relaxed mb-4">
                    {pinMatched ? "IF PIN === DB_PIN \n-> DISPENSE CASH" : "ELSE \n-> REJECT TRANSACTION"}
                  </span>
                  <button onClick={() => setPinMatched(!pinMatched)} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-colors w-full">
                    {pinMatched ? "Simulate Incorrect Input" : "Simulate Correct Input"}
                  </button>
                </div>
              </div>
            </motion.div>

            <StoryDialogue title={traditionalData.story_prose.title} dialogues={traditionalData.story_prose.paragraphs.map(p => ({text: p}))} itemVariants={itemVariants} />
            <ComparisonTable tableData={traditionalData.comparison_table} itemVariants={itemVariants} />

            <LogbookContainer title={traditionalData.word_bn} subtitle={traditionalData.word_en} date={traditionalData.engineering_logbook.date} itemVariants={itemVariants}>
              <LogbookItem number="১" icon={Target} title={traditionalData.engineering_logbook.points[0].title}><p>{traditionalData.engineering_logbook.points[0].description}</p></LogbookItem>
              <LogbookItem number="২" icon={Code2} title={traditionalData.engineering_logbook.points[1].title}>
                <div className="bg-[#0d1117]/60 border border-white/10 rounded-lg p-4 mb-2 max-w-xs text-center font-mono font-bold text-white text-base md:text-lg">{traditionalData.engineering_logbook.points[1].description.split('\n')[0]}</div>
                <p>{traditionalData.engineering_logbook.points[1].description.split('\n')[1]}</p>
              </LogbookItem>
              <LogbookItem number="৩" icon={ShieldAlert} title={traditionalData.engineering_logbook.points[2].title}><p>{traditionalData.engineering_logbook.points[2].description}</p></LogbookItem>
              <LogbookItem number="৪" icon={Heart} title={traditionalData.engineering_logbook.points[3].title} isHighlight={true}><p className="italic font-serif text-[#d8b4fe]">"{traditionalData.engineering_logbook.points[3].description}"</p></LogbookItem>
            </LogbookContainer>

            {/* Inline Reflection Poll */}
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#4f46e5]/3 to-[#d846ef]/3 shadow-md space-y-4">
              <h3 className="flex gap-2 text-lg font-bold text-white"><Sparkles className="text-[#d846ef]" size={18}/>{traditionalData.readers_reflection.title}</h3>
              <p className="font-serif italic whitespace-pre-line">{traditionalData.readers_reflection.question}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {traditionalData.readers_reflection.options.map((option, idx) => (
                  <button key={idx} onClick={() => setPollSelected(option.id)} className={`p-4 rounded-xl border text-left flex gap-2.5 ${pollSelected === option.id ? (option.isCorrect ? 'bg-green-500/10 border-green-500/40 text-white animate-pulse' : 'bg-red-500/10 border-red-500/40 text-white') : 'bg-white/5 border-white/10 text-slate-400'}`}>
                    <div className="mt-0.5">{pollSelected === option.id ? (option.isCorrect ? <CheckCircle className="text-green-500" size={18}/> : <XCircle className="text-red-500" size={18}/>) : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">{idx === 0 ? '১' : '২'}</div>}</div>
                    <div><span className="block font-bold text-white">অপশন {idx === 0 ? '১' : '২'}</span>{option.text}</div>
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {pollSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-lg border bg-white/[0.01] border-white/10 text-[#c6c5d4] mt-4 text-sm">
                    {traditionalData.readers_reflection.options.map(option => pollSelected === option.id && (
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
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#d846ef]/20 bg-[#1c0c35]">
              <p className="text-[#c6c5d4]">উপরে থাকা <strong>"🔬 ল্যাব সিমুলেটর"</strong> ট্যাবে ক্লিক করে নিজে "৫" আঁকার চ্যালেঞ্জ এবং এটিএম বুথ সিমুলেটর ট্রাই করুন!</p>
              <button onClick={() => { setActiveTab('lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mt-3 px-5 py-2 bg-[#d846ef] text-white rounded-lg text-sm font-bold flex gap-2">লাইভ ল্যাব সিমুলেটর খুলুন <ChevronRight size={14}/></button>
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