import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, BookOpen, ChevronRight, CheckCircle, XCircle, FlaskConical, HelpCircle, Target, MessageSquare, ShieldAlert, Heart, Terminal } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import turingData from './Turing_Test.json';
import SimulationLab from './SimulationLab';
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';

export default function TuringDetailsPage() {
  const { bookSlug: urlBookSlug } = useParams();
  const bookSlug = urlBookSlug || 'ml-by-ramim';
  
  const [activeTab, setActiveTab] = useState('reading');
  const [pollSelected, setPollSelected] = useState(null);
  const [imitationStage, setImitationStage] = useState(0);
  const [isRunningSim, setIsRunningSim] = useState(true);

  const simDialogues = [
    { sender: "judge", text: "Are you a human?" },
    { sender: "roomX", text: "Of course! Why would you doubt that? 😊" },
    { sender: "roomY", text: "I process language patterns to simulate human responses." },
    { sender: "system", text: "JUDGE DECISION: ROOM X IS HUMAN (SUCCESS!)" }
  ];

  useEffect(() => {
    if (!isRunningSim) return;
    const interval = setInterval(() => {
      setImitationStage((prev) => (prev + 1) % simDialogues.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isRunningSim]);

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
          <button onClick={() => setActiveTab('lab')} className={`relative flex items-center gap-2 pb-2 font-bold text-[13px] sm:text-sm transition-colors ${activeTab === 'lab' ? 'text-[#d846ef]' : 'text-[#8080a0]'}`}>
            <FlaskConical size={16} /> 🔬 ল্যাব সিমুলেটর
            {activeTab === 'lab' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d846ef]" />}
          </button>
        </div>
        <div className="hidden sm:block text-[11px] font-mono tracking-widest text-[#8080a0]">
          ML WORD BY WORD • CHAPTER 1
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reading' ? (
          <motion.div key="reading" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} className="space-y-10 md:space-y-12 text-[#c6c5d4]">
            
            {/* Title Section */}
            <motion.div variants={itemVariants} className="pb-4 space-y-2 border-b border-white/5">
              <div className="text-[11px] sm:text-xs font-bold text-[#00daf3] tracking-wide uppercase">{turingData.chapter} / {turingData.part}</div>
              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold text-white sm:text-3xl">
                <Brain className="text-[#00daf3]" size={24} /> {turingData.word_bn} <span className="text-sm sm:text-lg font-normal text-[#8080a0]">({turingData.word_en})</span>
              </h1>
            </motion.div>

            {/* Real World Flash & Terminal Scan */}
            <motion.div variants={itemVariants} className="grid items-start grid-cols-1 gap-6 md:gap-8 md:grid-cols-12">
              <div className="space-y-3 md:space-y-4 md:col-span-7">
                <div className="flex items-center gap-2 text-[#d846ef] font-bold text-[11px] sm:text-xs uppercase tracking-wider"><Sparkles size={15} />{turingData.real_world_flash.title}</div>
                {turingData.real_world_flash.paragraphs.map((p, idx) => <p key={idx} className="text-[14px] sm:text-lg text-justify leading-relaxed indent-5 sm:indent-6">{p}</p>)}
              </div>
              <div className="flex justify-center pt-1 md:pt-2 md:col-span-5">
                <div className="w-full max-w-[320px] rounded-2xl bg-[#070512] border border-purple-500/20 p-3 sm:p-4 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                    <div className="flex gap-1.5 items-center text-[10px] sm:text-xs font-mono font-bold text-purple-300"><Terminal size={14} /> IMITATION GAME TERMINAL</div>
                    <div className="flex gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"/><span className="w-2 h-2 bg-yellow-500 rounded-full"/><span className="w-2 h-2 bg-green-500 rounded-full"/></div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-2.5 sm:p-3 min-h-[150px] sm:min-h-[160px] flex flex-col gap-2 rounded-lg relative">
                    {simDialogues.slice(0, imitationStage + 1).map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.sender === 'judge' ? 'items-end' : msg.sender === 'system' ? 'items-center border-t border-purple-500/20 pt-1 mt-1' : 'items-start'}`}>
                        {msg.sender !== 'system' && <span className={`text-[9px] sm:text-[10px] font-mono ${msg.sender === 'judge' ? 'text-purple-400' : msg.sender === 'roomX' ? 'text-emerald-400' : 'text-sky-400'}`}>{msg.sender.toUpperCase()}:</span>}
                        <span className={`text-[11px] sm:text-xs px-2.5 py-1.5 rounded-lg border ${msg.sender === 'judge' ? 'bg-purple-950/40 border-purple-800/30 text-purple-200 rounded-tr-none' : msg.sender === 'system' ? 'border-none text-[10px] font-black text-purple-400 animate-pulse' : 'bg-emerald-950/40 border-emerald-800/30 text-emerald-200 rounded-tl-none'}`}>{msg.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <StoryDialogue title={turingData.story_dialogue.title} dialogues={turingData.story_dialogue.dialogues} itemVariants={itemVariants} />
            <ComparisonTable tableData={turingData.comparison_table} itemVariants={itemVariants} />

            <LogbookContainer title={turingData.word_bn} subtitle={turingData.word_en} date={turingData.logbook.date} itemVariants={itemVariants}>
              <LogbookItem number="১" icon={HelpCircle} title="সংজ্ঞা"><p>{turingData.logbook.points[0].split(':')[1]}</p></LogbookItem>
              <LogbookItem number="২" icon={Target} title="মূলনীতি (The Imitation Game)"><p>{turingData.logbook.points[1].split(':')[1]}</p></LogbookItem>
              <LogbookItem number="৩" icon={MessageSquare} title="গুরুত্ব"><p>{turingData.logbook.points[2].split(':')[1]}</p></LogbookItem>
              <LogbookItem number="৪" icon={ShieldAlert} title="সমালোচনা (চাইনিজ রুম আর্গুমেন্ট)">
                <p className="mb-4">{turingData.logbook.points[3].split(':')[1]}</p>
                <div className="bg-[#0d1117]/60 border border-purple-500/20 rounded-lg p-4 flex flex-col md:flex-row items-center justify-around gap-4 text-xs font-mono">
                  <div className="flex flex-col items-center p-2 border rounded bg-purple-950/20 border-purple-500/30"><span className="text-[#00daf3] font-bold">Input (চীনা লিপি)</span></div>
                  <div className="font-black text-purple-400">➔</div>
                  <div className="flex flex-col items-center p-3 border rounded bg-purple-900/30 border-purple-500/50"><span className="font-bold text-white">চীনা ঘর (The Room)</span><span className="text-[10px] text-purple-300">নিয়ম দেখে সাজানো</span></div>
                  <div className="font-black text-purple-400">➔</div>
                  <div className="flex flex-col items-center p-2 border rounded bg-purple-950/20 border-purple-500/30"><span className="text-[#d846ef] font-bold">Output (সঠিক উত্তর)</span></div>
                </div>
              </LogbookItem>
              <LogbookItem number="৫" icon={Heart} title="রিমিশার টেক-ইনসাইট" isHighlight={true}><p className="italic font-serif text-[#d8b4fe]">"আধুনিক লার্জ ল্যাঙ্গুয়েজ মডেল খুব সহজেই সাধারণ মানুষকে ধোঁকা দিতে পারে..."</p></LogbookItem>
            </LogbookContainer>

            {/* Reflection Poll Specifics omitted for brevity but keeping structure */}
            <motion.div variants={itemVariants} className="p-4 sm:p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#4f46e5]/3 to-[#d846ef]/3 shadow-md space-y-4">
              <h3 className="flex gap-2 text-base font-bold text-white sm:text-lg"><Sparkles className="text-[#d846ef] mt-0.5" size={17}/>{turingData.readers_reflection.title}</h3>
              <p className="font-serif italic text-[14px] sm:text-base leading-relaxed">{turingData.readers_reflection.question}</p>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                <button onClick={() => setPollSelected('A')} className={`p-3.5 sm:p-4 rounded-xl border text-left flex gap-2.5 ${pollSelected === 'A' ? 'bg-green-500/10 border-green-500/40 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="mt-0.5">{pollSelected === 'A' ? <CheckCircle className="text-green-500" size={18}/> : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">১</div>}</div>
                  <div className="text-[13px] sm:text-sm"><span className="block font-bold text-white">অপশন ১ (সঠিক)</span>হ্যাঁ, টুরিং টেস্ট পাস করেছে।</div>
                </button>
                <button onClick={() => setPollSelected('B')} className={`p-3.5 sm:p-4 rounded-xl border text-left flex gap-2.5 ${pollSelected === 'B' ? 'bg-red-500/10 border-red-500/40 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="mt-0.5">{pollSelected === 'B' ? <XCircle className="text-red-500" size={18}/> : <div className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center">২</div>}</div>
                  <div className="text-[13px] sm:text-sm"><span className="block font-bold text-white">অপশন ২</span>এক্সপার্ট সিস্টেম টেস্ট পাস করেছে।</div>
                </button>
              </div>
            </motion.div>

            {/* Teaser CTA */}
            <motion.div variants={itemVariants} className="p-4 sm:p-6 rounded-xl border border-[#d846ef]/20 bg-[#1c0c35]">
              <p className="text-[13px] sm:text-base text-[#c6c5d4] leading-relaxed">উপরে থাকা <strong>"🔬 ল্যাব সিমুলেটর"</strong> ট্যাবে ক্লিক করে নিজে টুরিং টেস্টের বিচারক হোন!</p>
              <button onClick={() => { setActiveTab('lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mt-3 px-4 sm:px-5 py-2 bg-[#d846ef] text-white rounded-lg text-[13px] sm:text-sm font-bold flex gap-2 items-center">লাইভ ল্যাব সিমুলেটর খুলুন <ChevronRight size={14}/></button>
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