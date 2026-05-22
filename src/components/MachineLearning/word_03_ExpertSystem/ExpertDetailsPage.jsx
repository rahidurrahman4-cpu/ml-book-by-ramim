import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, BookOpen, ChevronRight, CheckCircle, XCircle, FlaskConical, HelpCircle, Target, MessageSquare, ShieldAlert, Heart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import expertData from './expert_system.json';
import SimulationLab from './SimulationLab';
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';

export default function ExpertDetailsPage() {
  const { bookSlug: urlBookSlug } = useParams();
  const bookSlug = urlBookSlug || 'ml-by-ramim';
  
  const [activeTab, setActiveTab] = useState('reading');
  const [pollSelected, setPollSelected] = useState(null);

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
              <div className="text-xs font-bold text-[#00daf3] tracking-wide uppercase">{expertData.chapter} / {expertData.part}</div>
              <h1 className="flex items-center gap-2 text-3xl font-extrabold text-white">
                <Brain className="text-[#00daf3]" size={28} /> {expertData.word_bn} <span className="text-lg font-normal text-[#8080a0]">({expertData.word_en})</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 text-[#d846ef] font-bold text-xs uppercase tracking-wider mb-4"><Sparkles size={16} />{expertData.real_world_flash.title}</div>
              {expertData.real_world_flash.paragraphs.map((p, idx) => <p key={idx} className="mb-4 text-lg text-justify indent-6">{p}</p>)}
            </motion.div>

            <StoryDialogue title={expertData.story_prose.title} dialogues={expertData.story_prose.paragraphs.map(p => ({ text: p }))} itemVariants={itemVariants} />
            
            <ComparisonTable tableData={expertData.comparison_table} itemVariants={itemVariants} />

            <LogbookContainer title={expertData.word_bn} subtitle={expertData.word_en} date={expertData.engineering_logbook.date} itemVariants={itemVariants}>
              <LogbookItem number="১" icon={HelpCircle} title={expertData.engineering_logbook.points[0].title}><p>{expertData.engineering_logbook.points[0].description}</p></LogbookItem>
              <LogbookItem number="২" icon={Target} title={expertData.engineering_logbook.points[1].title}><p className="whitespace-pre-line">{expertData.engineering_logbook.points[1].description}</p></LogbookItem>
              <LogbookItem number="৩" icon={MessageSquare} title={expertData.engineering_logbook.points[2].title}><p>{expertData.engineering_logbook.points[2].description}</p></LogbookItem>
              <LogbookItem number="৪" icon={ShieldAlert} title={expertData.engineering_logbook.points[3].title}><p>{expertData.engineering_logbook.points[3].description}</p></LogbookItem>
              <LogbookItem number="৫" icon={Heart} title={expertData.engineering_logbook.points[4].title} isHighlight={true}><p className="italic font-serif text-[#d8b4fe]">"{expertData.engineering_logbook.points[4].description}"</p></LogbookItem>
            </LogbookContainer>

            {/* Inline Reflection Poll */}
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#4f46e5]/3 to-[#d846ef]/3 shadow-md space-y-4">
              <h3 className="flex gap-2 text-lg font-bold text-white"><Sparkles className="text-[#d846ef]" size={18}/>{expertData.readers_reflection.title}</h3>
              <p className="font-serif italic">{expertData.readers_reflection.question}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button onClick={() => setPollSelected('A')} className={`p-4 rounded-xl border text-left flex gap-2.5 ${pollSelected === 'A' ? 'bg-green-500/10 border-green-500/40 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="mt-0.5">{pollSelected === 'A' ? <CheckCircle className="text-green-500" size={18}/> : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">১</div>}</div>
                  <div><span className="block font-bold text-white">অপশন ১ (সঠিক)</span>হ্যাঁ, এটি একটি এক্সপার্ট সিস্টেম।</div>
                </button>
                <button onClick={() => setPollSelected('B')} className={`p-4 rounded-xl border text-left flex gap-2.5 ${pollSelected === 'B' ? 'bg-red-500/10 border-red-500/40 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="mt-0.5">{pollSelected === 'B' ? <XCircle className="text-red-500" size={18}/> : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">২</div>}</div>
                  <div><span className="block font-bold text-white">অপশন ২</span>না, এটি মেশিন লার্নিং।</div>
                </button>
              </div>
              
              <AnimatePresence>
                {pollSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-lg border bg-white/[0.01] border-white/10 text-[#c6c5d4] mt-4 text-sm">
                    {pollSelected === 'A' ? (
                      <div className="space-y-1"><span className="flex items-center gap-1 font-bold text-green-400"><CheckCircle size={14} /> একদম ঠিক!</span><p>কারণ এখানে ধাপে ধাপে আগে থেকে ঠিক করে রাখা IF-ELSE কন্ডিশন চেক করে সমস্যার সমাধান দেওয়া হচ্ছে।</p></div>
                    ) : (
                      <div className="space-y-1"><span className="flex items-center gap-1 font-bold text-red-400"><XCircle size={14} /> উত্তরটি সঠিক হয়নি।</span><p>কারণ এটি ডেটা থেকে নিজে নিজে শেখে না, বরং প্রোগ্রামাররা আগে থেকেই নিয়মগুলো (rules) লিখে দিয়েছে।</p></div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Teaser CTA */}
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#d846ef]/20 bg-[#1c0c35]">
              <p className="text-[#c6c5d4]">উপরে থাকা <strong>"🔬 ল্যাব সিমুলেটর"</strong> ট্যাবে ক্লিক করে নিজে দেখুন কীভাবে এক্সপার্ট সিস্টেম কাজ করে!</p>
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