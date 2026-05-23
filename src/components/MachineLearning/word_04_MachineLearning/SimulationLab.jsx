import React, { useState } from 'react';

export default function SimulationLab() {
  const [trainingDataCount, setTrainingDataCount] = useState(0);
  const [isTrainingML, setIsTrainingML] = useState(false);
  const [mlModelStatus, setMlModelStatus] = useState('untrained'); 
  const [testResult, setTestResult] = useState(null);

  const startMLTraining = () => {
    if (mlModelStatus === 'training' || mlModelStatus === 'trained') return;
    setMlModelStatus('training');
    setIsTrainingML(true);
    setTrainingDataCount(0);
    setTestResult(null);

    let count = 0;
    const interval = setInterval(() => {
      count += 500;
      setTrainingDataCount(count);
      
      if (count >= 10000) {
        clearInterval(interval);
        setMlModelStatus('trained');
        setIsTrainingML(false);
      }
    }, 150);
  };

  const testMLModel = () => {
    if (mlModelStatus !== 'trained') return;
    setIsTrainingML(true); 
    setTestResult('analyzing');
    
    setTimeout(() => {
      setIsTrainingML(false);
      const isCat = Math.random() > 0.5;
      setTestResult(isCat ? 'cat' : 'dog');
    }, 1500);
  };

  const resetMLSystem = () => {
    setMlModelStatus('untrained');
    setTrainingDataCount(0);
    setTestResult(null);
  };

  return (
    <div className="w-full space-y-6 md:space-y-8 font-sans text-slate-200">
      
      {/* Header Area */}
      <div className="pb-3 space-y-3 text-center sm:pb-4">
        <h2 className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold text-white sm:text-2xl md:gap-3 md:text-3xl">
          <span className="px-2.5 py-1 text-[10px] border rounded-full bg-sky-500/20 text-sky-400 border-sky-500/30 sm:px-3 sm:text-xs">ল্যাব-০৪</span>
          মেশিন লার্নিং (Machine Learning)
        </h2>
        <p className="max-w-2xl mx-auto px-2 text-[13px] text-slate-400 sm:px-0 sm:text-sm md:text-base">
          কম্পিউটারকে বিশাল ডেটা (অভিজ্ঞতা) থেকে নিজে নিজে প্যাটার্ন খুঁজে লজিক তৈরি করতে দেওয়ার ম্যাজিক।
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
        
        {/* Left Side: The Magic Equation Visualizer */}
        <div className="space-y-5 md:space-y-6">
          <div className="bg-white/[0.02] p-4 sm:p-6 rounded-2xl border border-white/5 h-full flex flex-col">
            <h3 className="flex items-center gap-2 pb-3 mb-5 sm:mb-6 text-sm sm:text-base font-bold border-b text-sky-400 border-white/5">
              <span>✨</span> দ্য ম্যাজিক ইকুয়েশন
            </h3>

            <div className="flex-1 space-y-6 sm:space-y-8">
              {/* Traditional Programming */}
              <div className="relative">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">১. প্রথাগত প্রোগ্রামিং (রুল-বেজড)</span>
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b0f19] p-3 sm:p-4 rounded-xl border border-white/5">
                  <div className="text-center">
                    <div className="p-2 mb-1 text-lg border rounded-lg bg-indigo-500/10 border-indigo-500/20">📊</div>
                    <span className="text-[10px] text-slate-400 font-bold">ডেটা (Input)</span>
                  </div>
                  <div className="text-lg font-bold text-slate-600">+</div>
                  <div className="text-center">
                    <div className="p-2 mb-1 text-lg border rounded-lg bg-teal-500/10 border-teal-500/20">⚙️</div>
                    <span className="text-[10px] text-slate-400 font-bold">নিয়ম (Rules)</span>
                  </div>
                  <div className="text-lg font-bold text-slate-600">=</div>
                  <div className="p-2 text-center border rounded-lg bg-white/5 border-white/10">
                    <div className="mb-1 text-lg opacity-50">🎯</div>
                    <span className="text-[10px] text-slate-500 font-bold">ফলাফল (Output)</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-center italic">মানুষ নিয়ম বানায়, কম্পিউটার শুধু ফলো করে।</p>
              </div>

              {/* Machine Learning */}
              <div className="relative">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-2 block">২. মেশিন লার্নিং (ডেটা-ড্রিভেন)</span>
                <div className="relative flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 overflow-hidden border bg-sky-500/5 rounded-xl border-sky-500/20">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-sky-500/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="p-2 mb-1 text-lg border rounded-lg bg-indigo-500/20 border-indigo-500/30">📊</div>
                    <span className="text-[10px] text-sky-200 font-bold">ডেটা (Input)</span>
                  </div>
                  <div className="relative z-10 text-lg font-bold text-sky-500">+</div>
                  <div className="relative z-10 text-center">
                    <div className="p-2 mb-1 text-lg border rounded-lg bg-pink-500/20 border-pink-500/30">🎯</div>
                    <span className="text-[10px] text-sky-200 font-bold">সঠিক উত্তর</span>
                  </div>
                  <div className="relative z-10 text-lg font-bold text-sky-500">=</div>
                  <div className="text-center bg-sky-500 p-2 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.4)] transform scale-110 relative z-10">
                    <div className="mb-1 text-lg">🧠</div>
                    <span className="text-[10px] text-white font-bold">লজিক (Model)</span>
                  </div>
                </div>
                <p className="text-[10px] text-sky-300 mt-3 text-center font-medium bg-sky-500/10 py-1.5 rounded">
                  মেশিন নিজেই ডেটা ঘেঁটে নিয়ম বা 'মডেল' তৈরি করে নেয়!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Pattern Recognition Game */}
        <div className="space-y-5 md:space-y-6">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden shadow-lg flex flex-col h-full">
            <div className="w-full h-1 bg-gradient-to-r from-slate-500 to-sky-500"></div>
            
            <div className="p-4 border-b border-white/5 sm:p-4">
              <h3 className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
                <span>🐾</span> বিড়াল নাকি কুকুর? (প্যাটার্ন লার্নিং)
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                মডেলকে কোনো 'IF-ELSE' রুল না দিয়ে শুধু ছবি দিয়ে শেখান।
              </p>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-6 space-y-5 sm:space-y-6">
              <div className="w-full text-center">
                {mlModelStatus === 'untrained' && (
                  <div className="space-y-2 text-slate-500">
                    <div className="mb-4 text-4xl sm:text-5xl opacity-50">🤖</div>
                    <p className="text-sm font-bold text-slate-300">মডেল এখন একদম বোকা!</p>
                    <p className="text-[11px]">সে বিড়াল বা কুকুর কিছুই চেনে না। তাকে ডেটা দিন।</p>
                  </div>
                )}

                {mlModelStatus === 'training' && (
                  <div className="space-y-4 text-sky-400">
                    <div className="mb-2 text-4xl sm:text-5xl animate-bounce">📥</div>
                    <p className="text-sm font-bold">ডেটা থেকে প্যাটার্ন শিখছে...</p>
                    <div className="flex items-center justify-center gap-3 text-[11px] font-mono bg-black/20 py-2 px-4 rounded border border-white/5">
                      <span>প্রসেস করা ছবি:</span>
                      <span className="text-sm font-bold text-white">{trainingDataCount.toLocaleString()}</span>
                      <span>/ 10,000</span>
                    </div>
                    <div className="w-full max-w-[200px] mx-auto bg-black/40 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-sky-500 h-1.5 rounded-full transition-all duration-100" style={{ width: `${(trainingDataCount / 10000) * 100}%` }}></div>
                    </div>
                  </div>
                )}

                {mlModelStatus === 'trained' && !testResult && (
                  <div className="space-y-2 text-emerald-400 animate-fade-in">
                    <div className="mb-4 text-4xl sm:text-5xl">🧠✨</div>
                    <p className="text-sm font-bold">মডেল এখন স্মার্ট!</p>
                    <p className="text-[11px] text-slate-300 px-4">সে ১০,০০০ ছবি দেখে বিড়াল ও কুকুরের গাণিতিক প্যাটার্ন চিনে গেছে। এবার অজানা ছবি দিয়ে টেস্ট করুন।</p>
                  </div>
                )}

                {testResult && (
                  <div className="space-y-4 animate-fade-in">
                    {testResult === 'analyzing' ? (
                      <div className="space-y-3">
                        <div className="mb-2 text-4xl animate-pulse">🔍</div>
                        <p className="text-xs font-bold text-sky-400">নতুন ছবির প্যাটার্ন বিশ্লেষণ করছে...</p>
                      </div>
                    ) : (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl inline-block min-w-[180px]">
                        <div className="mb-3 text-5xl">{testResult === 'cat' ? '🐈' : '🐕'}</div>
                        <p className="text-emerald-400/80 text-[10px] mb-1 font-bold uppercase tracking-widest">মডেল প্রেডিকশন:</p>
                        <p className="text-lg font-bold text-white">
                          এটি একটি {testResult === 'cat' ? 'বিড়াল' : 'কুকুর'}!
                        </p>
                        <p className="text-[9px] text-emerald-400/60 mt-2">কোনো রুল ছাড়াই চিনেছে!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 p-4 border-t border-white/5 bg-black/20 sm:flex-row">
              {mlModelStatus === 'untrained' && (
                <button onClick={startMLTraining} className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-2.5 rounded-lg text-[13px] sm:text-sm transition-all flex items-center justify-center gap-2">
                  <span>▶️</span> ১০,০০০ ছবি দিয়ে ট্রেইন করুন
                </button>
              )}

              {mlModelStatus === 'training' && (
                <button disabled className="w-full bg-white/5 text-sky-400 font-bold py-2.5 rounded-lg cursor-not-allowed text-[13px] sm:text-sm flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span> লার্নিং চলছে...
                </button>
              )}

              {mlModelStatus === 'trained' && (
                <>
                  <button onClick={testMLModel} disabled={isTrainingML} className="flex-[2] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold py-2.5 rounded-lg transition-all disabled:opacity-50 text-[11px] sm:text-xs flex items-center justify-center gap-2">
                    <span>🧪</span> নতুন ছবি দিয়ে টেস্ট করুন
                  </button>
                  <button onClick={resetMLSystem} disabled={isTrainingML} className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-2.5 rounded-lg border border-white/10 transition-colors disabled:opacity-50 text-[11px] sm:text-xs">
                    রিসেট
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
