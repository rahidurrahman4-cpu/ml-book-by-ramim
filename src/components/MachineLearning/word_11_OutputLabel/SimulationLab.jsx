import React, { useState } from 'react';

const annotationScenarios = {
  flower: {
    id: 'flower',
    title: '🌺 ছাদের বাগান (Image classification)',
    description: 'রক্তলাল রঙের বড় পাঁচটি পাপড়ি ও লম্বা পুংকেশর বিশিষ্ট একটি ফুলের ছবি।',
    options: [
      { id: 'Hibiscus', label: 'জবা (Hibiscus)', isCorrect: true, reason: 'লাল পাপড়ি এবং পুংকেশর দেখে এটি জবা ফুল হিসেবে সঠিক লেবেল পেয়েছে।' },
      { id: 'Rose', label: 'গোলাপ (Rose)', isCorrect: false, reason: 'ছবিতে কোনো কাঁটা বা গোলাপের পাপড়ির স্তরের বিন্যাস নেই।' },
      { id: 'Tulip', label: 'টুলিপ (Tulip)', isCorrect: false, reason: 'পাপড়ির গঠন টুলিপ ফুলের মতো কাপ-আকৃতির নয়।' },
    ],
    svg: (
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <path d="M 50,50 L 50,90" stroke="#10b981" strokeWidth="3" />
        <circle cx="50" cy="38" r="14" fill="#ef4444" />
        <circle cx="38" cy="50" r="14" fill="#ef4444" />
        <circle cx="50" cy="62" r="14" fill="#ef4444" />
        <circle cx="62" cy="50" r="14" fill="#ef4444" />
        <circle cx="50" cy="50" r="12" fill="#dc2626" />
        <line x1="50" y1="50" x2="68" y2="32" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="68" cy="32" r="3" fill="#f59e0b" />
      </svg>
    ),
  },
  email: {
    id: 'email',
    title: '📩 ইমেইল ইনবক্স (Text Classification)',
    description: "বিষয়: 'CONGRATULATIONS!!! YOU WON $1,000,000 CASH FREE!!!'",
    options: [
      { id: 'Spam', label: 'স্প্যাম (Spam)', isCorrect: true, reason: 'অতিরিক্ত বিস্ময়সূচক চিহ্ন এবং ক্যাশ প্রাইজের লোভ স্প্যাম মেইলের খাঁটি লেবেল।' },
      { id: 'Normal', label: 'সাধারণ মেইল (Normal)', isCorrect: false, reason: 'কোনো বিশ্বস্ত প্রতিষ্ঠান এভাবে লটারি জেতার মেইল পাঠায় না।' },
    ],
    svg: (
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <rect x="15" y="30" width="70" height="45" rx="5" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <path d="M 15,35 L 50,55 L 85,35" fill="none" stroke="#ef4444" strokeWidth="2" />
        <text x="50" y="85" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">!!! SPAM !!!</text>
      </svg>
    ),
  },
  house: {
    id: 'house',
    title: '🏠 রিয়েল এস্টেট (Regression)',
    description: '৩টি বেডরুম, ২২০০ বর্গফুট আয়তন এবং ধানমন্ডি লেকের পাশের একটি ফ্ল্যাট।',
    options: [
      { id: 'HighPrice', label: '৳৩,৫০,০০,০০০ (High)', isCorrect: true, reason: 'পছন্দসই লোকেশনে বড় ফ্ল্যাটের বাজারমূল্য হলো রিগ্রেশন টার্গেট।' },
      { id: 'LowPrice', label: '৳৪০,০০,০০০ (Low)', isCorrect: false, reason: 'এই বাজেটে ধানমন্ডির এত বড় ফ্ল্যাট পাওয়া অসম্ভব।' },
    ],
    svg: (
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <rect x="25" y="45" width="50" height="40" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <polygon points="15,45 50,15 85,45" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <rect x="45" y="70" width="10" height="15" fill="#3b82f6" />
      </svg>
    ),
  },
};

export default function SimulationLab() {
  const [activeScenario, setActiveScenario] = useState('flower');
  const [annotatedStatus, setAnnotatedStatus] = useState({ flower: null, email: null, house: null });

  const scenario = annotationScenarios[activeScenario];

  return (
    <div className="w-full space-y-8 font-sans text-slate-200">
      <div className="pb-4 space-y-3 text-center">
        <h2 className="flex items-center justify-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <span className="px-3 py-1 text-xs text-white bg-indigo-600 rounded-full shadow-lg">ল্যাব-১১</span>
          আউটপুট লেবেল (Output Label)
        </h2>
        <p className="max-w-2xl mx-auto text-sm text-slate-400 md:text-base">
          ইনপুট ডেটার গায়ে লাগিয়ে দেওয়া ট্যাগ বা সঠিক উত্তরপত্র হলো আউটপুট লেবেল (y)।
        </p>
      </div>

      <div className="grid items-stretch grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left: Annotation Panel */}
        <div className="lg:col-span-7 bg-[#1e2430] p-6 rounded-2xl border border-gray-700 flex flex-col justify-between gap-6 shadow-xl">
          <div>
            <h3 className="flex items-center justify-between pb-3 mb-6 text-lg font-bold text-indigo-400 border-b border-gray-700">
              <span>🏷️ ডেটা অ্যানোটেশন ল্যাব</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Manual Tagging</span>
            </h3>

            <div className="grid grid-cols-1 gap-2 mb-8 sm:grid-cols-3">
              {Object.values(annotationScenarios).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveScenario(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    activeScenario === item.id ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md' : 'bg-[#12161f] border-gray-700 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {item.title.split(' (')[0]}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-[#12161f] p-5 rounded-2xl border border-gray-700 mb-8 shadow-inner">
              <div className="bg-[#1e2430] p-4 rounded-xl border border-gray-700">{scenario.svg}</div>
              <div className="flex-1 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">র ডেটা (Input X):</span>
                <p className="text-sm italic leading-relaxed text-slate-300">"{scenario.description}"</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block ml-1 text-xs font-bold text-slate-400">🎯 এই ডেটার সঠিক আউটপুট লেবেল (y) কোনটি?</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {scenario.options.map((option) => {
                  const isSelected = annotatedStatus[activeScenario]?.id === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setAnnotatedStatus(prev => ({ ...prev, [activeScenario]: option }))}
                      className={`p-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                        isSelected 
                          ? option.isCorrect ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg' : 'bg-rose-500/10 border-rose-500 text-rose-400'
                          : 'bg-[#12161f] border-gray-700 text-slate-400 hover:bg-gray-800'
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && <span className="text-[9px] font-black uppercase">{option.isCorrect ? '✓ Correct' : '× Wrong'}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {annotatedStatus[activeScenario] && (
            <div className={`p-4 rounded-xl border animate-fade-in ${annotatedStatus[activeScenario].isCorrect ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'}`}>
              <p className="text-xs leading-relaxed text-slate-200"><span className="font-bold">ব্যাখ্যা:</span> {annotatedStatus[activeScenario].reason}</p>
            </div>
          )}
        </div>

        {/* Right: Info Display */}
        <div className="lg:col-span-5 bg-[#161b22] p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col justify-between">
           <div>
             <h3 className="pb-3 mb-6 text-lg font-bold text-white border-b border-gray-700">📊 লেবেলের ধরণ (Types)</h3>
             <div className="space-y-4">
                {[
                  { tag: 'মেডিকেল', type: 'Classification', x: 'এক্স-রে ছবি', y: 'টিউমার আছে/নেই', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
                  { tag: 'প্রাইসিং', type: 'Regression', x: 'বাড়ির ফিচার', y: '৳৩,৫০,০০,০০০', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                  { tag: 'আবহাওয়া', type: 'Regression', x: 'মেঘের ঘনত্ব', y: '৩০° সেলসিয়াস', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' }
                ].map((row, i) => (
                  <div key={i} className="bg-[#1e2430] p-4 rounded-xl border border-gray-700 shadow-sm group hover:border-gray-500 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-black uppercase ${row.color}`}>{row.tag}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-400">{row.type}</span>
                    </div>
                    <div className="flex items-end justify-between">
                       <div className="text-[11px]"><span className="block mb-1 text-slate-500">ফিচার (x)</span><span className="font-bold text-white">{row.x}</span></div>
                       <div className="w-8 h-[1px] bg-slate-700 mb-2"></div>
                       <div className="text-[11px] text-right"><span className="block mb-1 text-slate-500">লেবেল (y)</span><span className={`${row.color} font-black`}>{row.y}</span></div>
                    </div>
                  </div>
                ))}
             </div>
           </div>
           <button onClick={() => setAnnotatedStatus({flower:null, email:null, house:null})} className="w-full py-3 mt-8 text-xs font-bold text-gray-400 transition-all bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-xl">রিসেট ল্যাব</button>
        </div>
      </div>
    </div>
  );
}