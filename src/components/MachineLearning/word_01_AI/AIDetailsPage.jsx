import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, User, BookOpen, ChevronRight, CheckCircle, XCircle, FlaskConical, HelpCircle, Layers, Target, Globe, Eye, Cpu, Flag, TrendingUp, Heart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// ডেটা এবং সিমুলেশন ইমপোর্ট
import aiData from './AI.json';
import SimulationLab from './SimulationLab';

// আমাদের বানানো কমন UI কম্পোনেন্টসমূহ
import StoryDialogue from '../../UI/StoryDialogue';
import ComparisonTable from '../../UI/ComparisonTable';
import LogbookContainer from '../../UI/LogbookContainer';
import LogbookItem from '../../UI/LogbookItem';

export default function AIDetailsPage() {
  const { bookSlug: urlBookSlug } = useParams();
  const bookSlug = urlBookSlug || 'ml-by-ramim';
  
  const [activeTab, setActiveTab] = useState('reading'); // 'reading' | 'lab'
  const [pollSelected, setPollSelected] = useState(null); // 'A' | 'B'
  const [faceScanning, setFaceScanning] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-6 md:py-8 space-y-8 text-[#dfe0ff]">
      
      {/* Tab Switcher Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('reading')}
            className={`relative flex items-center gap-2 pb-2 font-bold text-sm transition-colors ${
              activeTab === 'reading' ? 'text-[#00daf3]' : 'text-[#8080a0] hover:text-[#dfe0ff]'
            }`}
          >
            <BookOpen size={16} />
            📖 পাঠ্যক্রম (Lesson)
            {activeTab === 'reading' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00daf3]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`relative flex items-center gap-2 pb-2 font-bold text-sm transition-colors ${
              activeTab === 'lab' ? 'text-[#d846ef]' : 'text-[#8080a0] hover:text-[#dfe0ff]'
            }`}
          >
            <FlaskConical size={16} />
            🔬 ল্যাব সিমুলেটর (Lab Sandbox)
            {activeTab === 'lab' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d846ef]" />
            )}
          </button>
        </div>
        <div className="hidden sm:block text-xs font-mono tracking-widest text-[#8080a0]">
          ML WORD BY WORD • CHAPTER 1
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reading' ? (
          <motion.div
            key="reading"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12 font-sans text-lg md:text-xl lg:text-[21px] leading-relaxed text-[#c6c5d4]"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="pb-4 space-y-2 font-sans border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00daf3] tracking-wide uppercase">
                <span>{aiData.chapter}</span><span>/</span><span>{aiData.part}</span>
              </div>
              <h1 className="flex items-center gap-2 text-3xl font-extrabold text-white">
                <Brain className="text-[#00daf3]" size={28} />
                {aiData.word_bn}
                <span className="text-lg font-normal text-[#8080a0] font-sans">({aiData.word_en})</span>
              </h1>
            </motion.div>

            {/* Real World Flash & Face Scan (Custom for this word) */}
            <motion.div variants={itemVariants} className="grid items-start grid-cols-1 gap-8 md:grid-cols-12">
              <div className="space-y-4 md:col-span-7">
                <div className="flex items-center gap-2 text-[#d846ef] font-sans">
                  <Sparkles size={16} />
                  <span className="text-xs font-bold tracking-wider uppercase">{aiData.real_world_flash.title}</span>
                </div>
                {aiData.real_world_flash.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify indent-6">{p}</p>
                ))}
              </div>
              <div className="flex justify-center pt-2 md:col-span-5">
                <div className="relative w-full max-w-[240px] h-72 rounded-2xl border border-white/10 bg-[#0c0f24] flex flex-col items-center justify-center p-4 shadow-xl overflow-hidden font-sans">
                  <div className="absolute top-0 w-24 h-4 bg-[#030712] rounded-b-lg" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:12px_20px]" />
                  <div className="relative w-32 h-32 rounded-full border border-dashed border-[#00daf3]/30 flex items-center justify-center">
                    <User size={48} className="text-[#00daf3] opacity-60" />
                    {faceScanning && (
                      <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00daf3] to-transparent shadow-[0_0_6px_#00daf3]"
                      />
                    )}
                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#d846ef] animate-ping" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-ping" />
                  </div>
                  <span className="mt-4 text-xs font-mono tracking-widest text-[#00daf3] font-bold">
                    {faceScanning ? "ANALYSING CHEEKS..." : "FACE MATCHED ✓"}
                  </span>
                  <button onClick={() => setFaceScanning(!faceScanning)} className="mt-3 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-[#8080a0] hover:text-white transition-colors">
                    {faceScanning ? "Stop Scanner" : "Run Scanner"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Story Dialogue using Common Component */}
            <StoryDialogue title={aiData.story_dialogue.title} dialogues={aiData.story_dialogue.dialogues} itemVariants={itemVariants} />

            {/* Comparison Table using Common Component */}
            <ComparisonTable tableData={aiData.comparison_table} itemVariants={itemVariants} />

            {/* Logbook Timeline using Common Components */}
            <LogbookContainer title={aiData.word_bn} subtitle={aiData.word_en} date={aiData.logbook.date} itemVariants={itemVariants}>
              <LogbookItem number="১" icon={HelpCircle} title="সংজ্ঞা">
                <p className="text-justify">{aiData.logbook.points[0].split(':')[1]}</p>
              </LogbookItem>
              
              <LogbookItem number="২" icon={Layers} title="আমব্রেলা কনসেপ্ট">
                <p className="mb-4">{aiData.logbook.points[1].split('.')[1]}</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="bg-[#0d1117]/60 border border-white/10 rounded-lg p-3.5 flex gap-3 items-center">
                    <div className="p-2 rounded-lg bg-[#4f46e5]/10 border border-[#4f46e5]/20 text-[#a5b4fc]"><Cpu size={16} /></div>
                    <div><h4 className="text-sm font-extrabold text-white">Machine Learning (ML)</h4><span className="text-xs text-[#8080a0]">Data driven learning</span></div>
                  </div>
                  <div className="bg-[#0d1117]/60 border border-white/10 rounded-lg p-3.5 flex gap-3 items-center">
                    <div className="p-2 rounded-lg bg-[#00daf3]/10 border border-[#00daf3]/20 text-[#00daf3]"><Layers size={16} /></div>
                    <div><h4 className="text-sm font-extrabold text-white">Deep Learning</h4><span className="text-xs text-[#8080a0]">Neural networks</span></div>
                  </div>
                  <div className="bg-[#0d1117]/60 border border-white/10 rounded-lg p-3.5 flex gap-3 items-center">
                    <div className="p-2 rounded-lg bg-[#d846ef]/10 border border-[#d846ef]/20 text-[#d846ef]"><Globe size={16} /></div>
                    <div><h4 className="text-sm font-extrabold text-white">NLP</h4><span className="text-xs text-[#8080a0]">Language Processing</span></div>
                  </div>
                  <div className="bg-[#0d1117]/60 border border-white/10 rounded-lg p-3.5 flex gap-3 items-center">
                    <div className="p-2 rounded-lg bg-[#00e575]/10 border border-[#00e575]/20 text-[#00e575]"><Eye size={16} /></div>
                    <div><h4 className="text-sm font-extrabold text-white">Computer Vision</h4><span className="text-xs text-[#8080a0]">Visual data</span></div>
                  </div>
                </div>
              </LogbookItem>

              <LogbookItem number="৩" icon={Heart} title="রিমিশার টেক-ইনসাইট" isHighlight={true}>
                <p className="italic font-serif text-[#d8b4fe]">
                  "প্রথাগত কম্পিউটার শুধু 'ডেটা প্রসেস' করে, আর এআই সেই ডেটা থেকে 'মিনিং' খুঁজে বের করে..."
                </p>
              </LogbookItem>
            </LogbookContainer>

            {/* Inline Reflection Poll (Specific for this word) */}
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#4f46e5]/3 to-[#d846ef]/3 shadow-md space-y-4 font-sans">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white"><Sparkles className="text-[#d846ef]" size={18} />{aiData.readers_reflection.title}</h3>
              <p className="text-base leading-relaxed text-[#c6c5d4] text-justify font-serif italic">{aiData.readers_reflection.question}</p>
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <button onClick={() => setPollSelected('A')} className={`p-4 rounded-xl border text-left transition-all flex items-start gap-2.5 text-sm ${pollSelected === 'A' ? 'bg-red-500/10 border-red-500/40 text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#a0a0c3]'}`}>
                  <div className="mt-0.5 shrink-0">{pollSelected === 'A' ? <XCircle className="text-red-500" size={18} /> : <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center font-bold text-[10px]">১</div>}</div>
                  <div><span className="font-bold block text-white mb-0.5">অপশন ১</span>স্বয়ংক্রিয় দরজা = এআই, ইউটিউব = সাধারণ প্রোগ্রামিং</div>
                </button>
                <button onClick={() => setPollSelected('B')} className={`p-4 rounded-xl border text-left transition-all flex items-start gap-2.5 text-sm ${pollSelected === 'B' ? 'bg-green-500/10 border-green-500/40 text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#a0a0c3]'}`}>
                  <div className="mt-0.5 shrink-0">{pollSelected === 'B' ? <CheckCircle className="text-green-500" size={18} /> : <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center font-bold text-[10px]">২</div>}</div>
                  <div><span className="font-bold block text-white mb-0.5">অপশন ২ (সঠিক উত্তর)</span>স্বয়ংক্রিয় দরজা = সাধারণ প্রোগ্রামিং, ইউটিউব = এআই</div>
                </button>
              </div>
              <AnimatePresence>
                {pollSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-lg border bg-white/[0.01] border-white/10 text-[#c6c5d4] mt-4 text-sm">
                    {pollSelected === 'A' ? (
                      <div className="space-y-1"><span className="flex items-center gap-1 font-bold text-red-400"><XCircle size={14} /> উত্তরটি সঠিক হয়নি মা!</span><p>শপিং মলের স্বয়ংক্রিয় দরজা শুধু সেন্সরে কারোর মোশন দেখলেই খুলে যায়...</p></div>
                    ) : (
                      <div className="space-y-1"><span className="flex items-center gap-1 font-bold text-green-400"><CheckCircle size={14} /> চমৎকার! একদম সঠিক উত্তর!</span><p>কিন্তু ইউটিউব আপনার অতীতের গান শোনার অভ্যাস বিশ্লেষণ করে...</p></div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Visualizer Teaser */}
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[#d846ef]/20 bg-gradient-to-r from-[#1c0c35] to-[#0a041f] font-sans">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#d846ef] uppercase flex items-center gap-1"><FlaskConical size={12} /> interactive sandbox simulator</span>
                <h3 className="text-lg font-bold text-white">এখনই নিজে ল্যাবে পরীক্ষা করে দেখতে চান?</h3>
                <p className="text-sm text-[#c6c5d4] leading-relaxed">উপরে থাকা <strong>"🔬 ল্যাব সিমুলেটর"</strong> ট্যাবে ক্লিক করে সরাসরি পরীক্ষা করে নিন!</p>
                <div className="pt-1">
                  <button onClick={() => { setActiveTab('lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#d846ef] text-white font-bold text-sm hover:bg-[#e476f4] transition-all group">
                    লাইভ ল্যাব সিমুলেটর খুলুন <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>

          </motion.div>
        ) : (
          <motion.div key="lab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-2 pb-10">
            {/* আপনার দেওয়া ল্যাব সিমুলেশন ফাইলটি কল করা হলো */}
            <SimulationLab />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}