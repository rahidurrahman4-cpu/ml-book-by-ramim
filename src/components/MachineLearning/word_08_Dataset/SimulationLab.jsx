import React, { useState } from 'react';

export default function SimulationLab() {
  const [activeTab, setActiveTab] = useState('crime-scene'); 
  const [collectedEvidence, setCollectedEvidence] = useState([]); 
  const [isDataCleaned, setIsDataCleaned] = useState(false);
  const [deductionStatus, setDeductionStatus] = useState('idle'); 
  const [deductionReport, setDeductionReport] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [suspect, setSuspect] = useState(null);

  const [quizInput, setQuizInput] = useState('');
  const [quizSuccess, setQuizSuccess] = useState(null); 
  const [showDatasetQA, setShowDatasetQA] = useState(false);

  const crimeSceneItems = [
    { id: 'footprint', name: '👣 জুতার ছাপ', type: 'useful', desc: "অপরাধীর জুতার সাইজ ও হাঁটার প্যাটার্ন।" },
    { id: 'fingerprint', name: '🔍 ফিঙ্গারপ্রিন্ট', type: 'useful', desc: "কাচের গ্লাসে পাওয়া অপরাধীর আঙুলের ছাপ।" },
    { id: 'diary', name: '📖 ছেঁড়া ডায়েরি', type: 'useful', desc: "ষড়যন্ত্রের নীল নকশা লেখা ডায়েরির পাতা।" },
    { id: 'mug', name: '☕ ভাঙা মগ', type: 'noise', desc: "তদন্তের জন্য অপ্রাসঙ্গিক নয়েজ ডেটা।" },
    { id: 'hair', name: '🐱 বিড়ালের লোম', type: 'noise', desc: "ঘটনাস্থলের গৃহপালিত বিড়ালের পশম (নয়েজ)।" },
    { id: 'news', name: '📰 পুরোনো কাগজ', type: 'noise', desc: "টেবিলে পড়ে থাকা ৩ দিন আগের সংবাদপত্র।" }
  ];

  const toggleEvidence = (id) => {
    if (deductionStatus === 'running') return;
    setDeductionStatus('idle');
    if (collectedEvidence.includes(id)) {
      setCollectedEvidence(collectedEvidence.filter(item => item !== id));
    } else {
      setCollectedEvidence([...collectedEvidence, id]);
    }
  };

  const handleRunDeduction = () => {
    if (collectedEvidence.length === 0) {
      setDeductionReport("🚨 ওহ! ঝুড়িতে কোনো ক্লু-ই নেই। প্রমাণ (ডেটাসেট) ছাড়া শার্লকের ব্রেন (অ্যালগরিদম) কাজ করবে না!");
      setAccuracy(0);
      setSuspect(null);
      return;
    }

    setDeductionStatus('running');
    setDeductionReport("শার্লকের অ্যালগরিদম ডেটাসেট বিশ্লেষণ করে সূত্র মেলানোর চেষ্টা করছে...");
    
    setTimeout(() => {
      setDeductionStatus('solved');
      
      const usefulCollected = collectedEvidence.filter(id => crimeSceneItems.find(i => i.id === id).type === 'useful');
      const noiseCollected = collectedEvidence.filter(id => crimeSceneItems.find(i => i.id === id).type === 'noise');

      const finalUsefulCount = usefulCollected.length;
      const finalNoiseCount = isDataCleaned ? 0 : noiseCollected.length;

      if (finalUsefulCount === 0) {
        setAccuracy(10);
        setSuspect("🚨 ভুল আসামী!");
        setDeductionReport("❌ তদন্ত ব্যর্থ! ডেটাসেটে কোনো দরকারি ক্লু না থাকায় এবং শুধু আবর্জনা (নয়েজ) থাকায় এআই সম্পূর্ণ ভুল আসামীকে শনাক্ত করেছে! এটিই হলো GIGO (Garbage In, Garbage Out)!");
      } 
      else if (finalNoiseCount > 0) {
        const calculatedAcc = Math.max(20, (finalUsefulCount * 25) - (finalNoiseCount * 15));
        setAccuracy(calculatedAcc);
        setSuspect(calculatedAcc > 60 ? "সন্দেহভাজন 'ক'" : "ভুল আসামী!");
        setDeductionReport(`⚠️ ডেটাসেটে ভেজাল! আপনি দরকারি প্রমাণের পাশাপাশি অপ্রাসঙ্গিক নয়েজ যুক্ত করেছেন। ডেটাসেট নোংরা হওয়ার কারণে এআই বিভ্রান্ত হয়ে সঠিক আসামী খুঁজে পেতে হিমশিম খাচ্ছে!`);
      } 
      else {
        const calculatedAcc = Math.min(100, finalUsefulCount * 33.3);
        setAccuracy(Math.round(calculatedAcc));
        if (calculatedAcc >= 90) {
          setSuspect("আসল অপরাধী! 🎯");
          setDeductionReport("🏆 কেস সলভড! আপনি অত্যন্ত নিখুঁত ও পরিষ্কার ডেটাসেট তৈরি করেছেন। কোনো নয়েজ না থাকায় অ্যালগরিদম শতভাগ সফলভাবে আসল খুনিকে খুঁজে বের করেছে!");
        } else {
          setSuspect("সন্দেহভাজন 'ক'");
          setDeductionReport(`🤔 আংশিক সফল! আপনার ডেটাসেট পরিষ্কার কিন্তু সাইজে ছোট (মাত্র ${finalUsefulCount}টি ক্লু)। এআই বুঝতে পারছে কে অপরাধী হতে পারে, কিন্তু চূড়ান্ত প্রমাণের জন্য আরও বেশি ডেটা (ক্লু) প্রয়োজন!`);
        }
      }
    }, 1500);
  };

  const clearLab = () => {
    setCollectedEvidence([]);
    setDeductionStatus('idle');
    setDeductionReport('ঘটনাস্থল একদম ক্লু-হীন। শার্লক হোমস পাইপ মুখে বসে আছেন, কোনো ক্লু ছাড়া তদন্ত অসম্ভব!');
    setAccuracy(0);
    setSuspect(null);
    setIsDataCleaned(false);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const cleanInput = quizInput.trim().toLowerCase();
    if (cleanInput === 'dataset' || cleanInput === 'ডেটাসেট') setQuizSuccess(true);
    else setQuizSuccess(false);
  };

  return (
    <div className="w-full space-y-6 md:space-y-8 font-sans text-slate-200">
      
      {/* Header Area */}
      <div className="pb-3 space-y-3 text-center sm:pb-4">
        <h2 className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold text-white sm:text-2xl md:gap-3 md:text-3xl">
          <span className="px-2.5 py-1 text-[10px] border rounded-full bg-sky-500/20 text-sky-400 border-sky-500/30 sm:px-3 sm:text-xs">ল্যাব-০৮</span>
          ডেটাসেট (Dataset)
        </h2>
        <p className="max-w-2xl mx-auto px-2 text-[13px] text-slate-400 sm:px-0 sm:text-sm md:text-base">
          অ্যালগরিদম হলো এআই-এর ক্ষুরধার ব্রেন, আর ব্রেনকে কাজ করানোর জন্য সংগৃহীত প্রমাণ বা তথ্যের গোছানো ভাণ্ডারই হলো ডেটাসেট।
        </p>
      </div>

      {/* Selector Sub-menu */}
      <div className="flex justify-center bg-white/[0.02] p-1.5 rounded-xl border border-white/5 max-w-md mx-auto w-full gap-2 shadow-lg">
        <button 
          onClick={() => { setActiveTab('crime-scene'); clearLab(); }}
          className={`flex-1 py-2.5 px-3 rounded-lg text-[11px] sm:text-xs md:text-sm font-bold transition-all ${activeTab === 'crime-scene' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          🕵️♂️ শার্লকের ক্রাইম সিন ল্যাব
        </button>
        <button 
          onClick={() => setActiveTab('types')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-[11px] sm:text-xs md:text-sm font-bold transition-all ${activeTab === 'types' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          📂 ডেটাসেটের প্রকারভেদ
        </button>
      </div>

      {/* --- SUB-TAB 1: SHERLOCK'S CRIME BOARD SIMULATOR --- */}
      {activeTab === 'crime-scene' && (
        <div className="grid items-stretch grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12">
          
          {/* Left: Interactive Crime Scene Hotspots */}
          <div className="lg:col-span-7 bg-white/[0.02] p-4 sm:p-6 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="flex items-center gap-2 pb-2 mb-2 text-sm sm:text-base font-bold border-b text-sky-400 border-white/5">
                <span>🏢</span> ঘটনাস্থল (The Crime Scene Room)
              </h3>
              <p className="mb-4 text-[11px] text-slate-400 leading-relaxed">
                নিচের বস্তুগুলোতে ক্লিক করে প্রমাণ বা ডেটা সংগ্রহ করুন। মনে রাখবেন—সব প্রমাণ কাজের নাও হতে পারে (নয়েজ)!
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3">
                {crimeSceneItems.map((item) => {
                  const isAdded = collectedEvidence.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={deductionStatus === 'running'}
                      onClick={() => toggleEvidence(item.id)}
                      className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all h-28 flex flex-col justify-between ${
                        isAdded 
                          ? item.type === 'useful'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-md scale-[1.02]'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-md scale-[1.02]'
                          : 'bg-black/20 border-white/5 hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <span className="text-xl sm:text-2xl">{item.name.split(' ')[0]}</span>
                        {isAdded && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${item.type === 'useful' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                            {item.type === 'useful' ? 'দরকারি ক্লু' : 'নয়েজ ডেটা'}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold">{item.name.split(' ')[1]}</span>
                        <span className="block text-[9px] font-normal text-slate-500 mt-1 leading-none">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Data Cleaning Filter */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 p-4 border bg-black/20 rounded-xl border-white/5">
                <div className="flex-1">
                  <span className="text-[11px] font-bold block text-white">✨ ডেটা ক্লিনিং (Data Cleaning)</span>
                  <span className="text-[9px] text-slate-400 leading-tight block mt-1">
                    অ্যালগরিদম চালানোর আগে ডেটাসেট থেকে অপ্রাসঙ্গিক নয়েজ দূর করার ফিল্টার।
                  </span>
                </div>
                <button
                  onClick={() => { setIsDataCleaned(!isDataCleaned); setDeductionStatus('idle'); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold border transition-all ${
                    isDataCleaned 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {isDataCleaned ? 'ক্লিন করা হয়েছে (ON)' : 'ক্লিন করুন (OFF)'}
                </button>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleRunDeduction}
                disabled={deductionStatus === 'running'}
                className="flex-[2] py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-[11px] sm:text-xs"
              >
                {deductionStatus === 'running' ? (
                  <><span className="animate-spin">🕵️♂️</span><span>তদন্ত চলছে...</span></>
                ) : (
                  <><span className="text-sm">🔍</span><span>অ্যালগরিদম চালান (Run Deduction)</span></>
                )}
              </button>
              <button 
                onClick={clearLab}
                className="flex-1 py-3 text-[11px] sm:text-xs font-bold transition-colors border bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 rounded-xl"
              >
                রিসেট ল্যাব
              </button>
            </div>
          </div>

          {/* Right: Case File & Suspect Reveal */}
          <div className="lg:col-span-5 bg-white/[0.02] p-4 sm:p-6 rounded-2xl border border-white/5 flex flex-col justify-between gap-6 shadow-lg">
            
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/5">
                <h3 className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
                  <span>📋</span> শার্লক কেস ফাইল
                </h3>
                <span className="text-[9px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                  Deduction Output
                </span>
              </div>

              {/* Animated Display Area */}
              <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative flex flex-col items-center justify-center p-4 overflow-hidden text-center border shadow-inner bg-black/20 rounded-xl border-white/5 h-36">
                  <span className="text-[9px] uppercase font-bold text-slate-500 absolute top-2">শনাক্ত আসামী</span>
                  {deductionStatus === 'solved' && suspect ? (
                    <div className="space-y-1 animate-fade-in">
                      <div className="text-4xl">👤</div>
                      <p className={`text-xs font-bold ${suspect.includes('আসল') ? 'text-emerald-400' : 'text-rose-400'}`}>{suspect}</p>
                    </div>
                  ) : (
                    <div className="space-y-1 text-slate-600">
                      <div className="text-3xl">❔</div>
                      <p className="text-[10px] font-bold text-slate-500">অজ্ঞাত আসামী</p>
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col items-center justify-center p-4 text-center border shadow-inner bg-black/20 rounded-xl border-white/5 h-36">
                  <span className="text-[9px] uppercase font-bold text-slate-500 absolute top-2">নির্ভুলতা (Accuracy)</span>
                  <div className="w-full px-2 space-y-2">
                    <p className={`text-3xl font-mono font-bold tracking-tighter ${accuracy > 80 ? 'text-emerald-400' : accuracy > 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {accuracy}%
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mx-auto">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${accuracy > 80 ? 'bg-emerald-500' : accuracy > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2 border bg-black/20 rounded-xl border-white/5">
                <span className="text-[9px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                  গোয়েন্দা ডায়েরি লগ
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-bold mt-2 h-16">
                  {deductionStatus === 'running' ? "তদন্তকারী ডেটা প্রসেস করছেন..." : deductionReport}
                </p>
              </div>
            </div>

            <div className="bg-sky-500/10 p-3 rounded-lg border border-sky-500/20 text-[10px] leading-relaxed text-sky-200 text-center">
              <strong>💡 রিয়েল-টাইম চ্যালেঞ্জ:</strong> ঘটনাস্থল থেকে সব ক্লু নিয়ে ডেটা ফিল্টার বন্ধ (OFF) রেখে রান করুন। ডেটাসেটে প্রচুর নয়েজ থাকায় মডেলের পারফরম্যান্স ধসে পড়বে! একেই বলে GIGO!
            </div>
          </div>
        </div>
      )}

      {/* --- SUB-TAB 2: DATASET TYPES EXPLORER --- */}
      {activeTab === 'types' && (
        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 animate-fade-in space-y-6 shadow-lg">
          <h3 className="flex items-center gap-2 pb-2 text-base font-bold text-white border-b border-white/5">
            <span>📂</span> মেশিন লার্নিংয়ের ৩টি প্রধান ডেটাসেট
          </h3>
          
          <div className="grid grid-cols-1 gap-6 text-xs md:grid-cols-3">
            <div className="flex flex-col justify-between p-5 border shadow-inner bg-black/20 rounded-xl border-white/5">
              <div className="space-y-3">
                <span className="text-3xl opacity-80">📊</span>
                <h4 className="text-sm font-bold text-white">টেবুলার (Tabular)</h4>
                <p className="leading-relaxed text-slate-400">
                  এক্সেল শিটের মতো সারি (Rows) এবং কলামে (Columns) সাজানো ডেটাসেট। ব্যাংকের গ্রাহকদের তথ্য, বয়স বা বেতনের ডেটা।
                </p>
              </div>
              <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-lg font-mono text-[10px] text-sky-400 whitespace-pre-wrap">
                {"Age | Income | Approved\n34  | 50,000 | Yes\n28  | 45,000 | No"}
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 border shadow-inner bg-black/20 rounded-xl border-white/5">
              <div className="space-y-3">
                <span className="text-3xl opacity-80">🖼️</span>
                <h4 className="text-sm font-bold text-white">ইমেজ (Image)</h4>
                <p className="leading-relaxed text-slate-400">
                  হাজার হাজার ছবি সংবলিত ডেটাসেট। ক্যানসার সনাক্তকরণের এক্স-রে ছবি কিংবা ফেস লক চেনার ফেসিয়াল ডেটাসেট।
                </p>
              </div>
              <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-lg font-mono text-[10px] text-emerald-400 whitespace-pre-wrap">
                {"[255, 120, 45, 12]\n[ 12, 190, 210, 88]\n(পিক্সেল ব্রাইটনেস ম্যাট্রিক্স)"}
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 border shadow-inner bg-black/20 rounded-xl border-white/5">
              <div className="space-y-3">
                <span className="text-3xl opacity-80">🎙️</span>
                <h4 className="text-sm font-bold text-white">অডিও/টেক্সট (Audio/Text)</h4>
                <p className="leading-relaxed text-slate-400">
                  মানুষের কণ্ঠস্বর এবং ভাষার শব্দ তরঙ্গ বা বাক্যমালার ডেটাসেট। চ্যাটজিপিটি বা ভয়েস রিকগনিশনের জ্বালানি।
                </p>
              </div>
              <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-lg font-mono text-[10px] text-pink-400 whitespace-pre-wrap">
                {"Audio: [44.1 kHz, amplitude]\nText: [105, 3452, 942, 1200]"}
              </div>
            </div>
          </div>
        </div>
      )}

     

    </div>
  );
}