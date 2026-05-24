import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle, XCircle, Search, HelpCircle, Coffee, CloudRain, Sun, Calendar, Clock } from 'lucide-react';

const staticData = [
  { x: 50, y: 150, type: 'normal' }, { x: 120, y: 130, type: 'normal' },
  { x: 80, y: 160, type: 'normal' }, { x: 180, y: 140, type: 'normal' },
  { x: 220, y: 170, type: 'normal' }, { x: 280, y: 40, type: 'fraud' },
  { x: 260, y: 50, type: 'fraud' }, { x: 240, y: 30, type: 'fraud' },
  { x: 190, y: 60, type: 'fraud' }, { x: 290, y: 80, type: 'fraud' },
];

export default function SimulationLab() {
  const [activeTab, setActiveTab] = useState('classifier');
  const [boundaryY, setBoundaryY] = useState(120);
  const [userPoints, setUserPoints] = useState([]);
  
  // Barista State
  const [weather, setWeather] = useState('sunny');
  const [dayType, setDayType] = useState('weekday');
  const [time, setTime] = useState('morning');

  const classify = (y) => (y < boundaryY ? 'fraud' : 'normal');

  const handlePlotClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (400 / rect.width));
    const y = Math.round((e.clientY - rect.top) * (200 / rect.height));
    if (x < 30 || x > 370 || y < 20 || y > 180) return;
    setUserPoints([...userPoints, { x, y, type: classify(y) }]);
  };

  const baristaLogic = () => {
    if (weather === 'rainy' && dayType === 'weekend') return { name: 'চিনি ছাড়া ক্যারামেল লাটে', icon: '☕', desc: 'বৃষ্টির দিনে অলস উইকেন্ডের প্যাটার্ন।' };
    if (weather === 'sunny' && time === 'morning') return { name: 'স্ট্রং ব্ল্যাক এক্সপ্রেসো', icon: '⚡', desc: 'রৌদ্রোজ্জ্বল সকালে কাজের প্যাটার্ন।' };
    return { name: 'ক্লাসিক ক্যাপুচিনো', icon: '🎨', desc: 'স্বাভাবিক সময়ের কমন প্যাটার্ন।' };
  };

  const rec = baristaLogic();

  return (
    <div className="w-full space-y-8 font-sans text-slate-200">
      <div className="space-y-3 text-center">
        <h2 className="flex items-center justify-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <span className="px-3 py-1 text-xs text-white bg-indigo-600 rounded-full">ল্যাব-১২</span>
          প্যাটার্ন ল্যাবরেটরি
        </h2>
        <p className="max-w-2xl mx-auto text-sm text-slate-400">অগোছালো তথ্যের ভেতর থেকে গাণিতিক ছন্দ খুঁজে বের করার সরাসরি অভিজ্ঞতা নিন।</p>
      </div>

      <div className="flex justify-center bg-white/[0.02] p-1.5 rounded-xl border border-white/5 max-w-md mx-auto w-full gap-2 shadow-lg">
        <button onClick={() => setActiveTab('classifier')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'classifier' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>📊 জ্যামিতিক প্যাটার্ন</button>
        <button onClick={() => setActiveTab('barista')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'barista' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>☕ স্মার্ট বারিস্টা</button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {activeTab === 'classifier' ? (
          <>
            <div className="lg:col-span-8 bg-[#1e2430] p-6 rounded-2xl border border-gray-700 shadow-xl">
              <h3 className="flex items-center gap-2 pb-2 mb-4 text-base font-bold text-indigo-400 border-b border-gray-700"><span>📈</span> ফ্রড ডিটেকশন গ্রাফ</h3>
              <div className="relative bg-[#0d1117] rounded-xl border border-gray-800 overflow-hidden cursor-crosshair">
                <svg viewBox="0 0 400 200" className="w-full h-auto" onClick={handlePlotClick}>
                  <line x1="30" y1={boundaryY} x2="380" y2={boundaryY} stroke="#818cf8" strokeWidth="2" strokeDasharray="4,4" />
                  {staticData.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" fill={p.type === 'normal' ? '#10b981' : '#ef4444'} />)}
                  {userPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="7" fill={classify(p.y) === 'normal' ? '#34d399' : '#f87171'} className="animate-pulse" />)}
                </svg>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-bold"><span>প্যাটার্ন সীমানা মান:</span><span className="text-indigo-400">y = {boundaryY}</span></div>
                <input type="range" min="30" max="170" value={boundaryY} onChange={(e) => setBoundaryY(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none accent-indigo-500" />
              </div>
            </div>
            <div className="lg:col-span-4 bg-[#1e2430] p-6 rounded-2xl border border-gray-700 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <h4 className="pb-2 text-sm font-bold text-white border-b border-gray-700">প্যাটার্ন ইনসাইট</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">মেশিন গাণিতিক দূরত্ব দেখে একটি সীমানা তৈরি করেছে। আপনি গ্রাফে ক্লিক করে নতুন লেনদেন যোগ করুন এবং দেখুন সেটি প্যাটার্ন অনুযায়ী কোন দিকে পড়ে।</p>
                <div className="p-3 text-center border bg-black/20 rounded-xl border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">সর্বশেষ শনাক্তকরণ:</span>
                  <p className={`text-sm font-black mt-1 ${userPoints.length ? (classify(userPoints[userPoints.length-1].y) === 'normal' ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-600'}`}>
                    {userPoints.length ? (classify(userPoints[userPoints.length-1].y) === 'normal' ? '✅ স্বাভাবিক' : '🚨 জালিয়াতি') : 'অপেক্ষা করছে...'}
                  </p>
                </div>
              </div>
              <button onClick={() => setUserPoints([])} className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-xs font-bold rounded-lg transition-all border border-gray-600">রিসেট গ্রাফ</button>
            </div>
          </>
        ) : (
          <>
            <div className="lg:col-span-5 bg-[#1e2430] p-6 rounded-2xl border border-gray-700 shadow-xl space-y-6">
              <h3 className="flex items-center gap-2 pb-2 text-base font-bold text-indigo-400 border-b border-gray-700"><span>🌦️</span> পরিবেশ পরিবর্তন করুন</h3>
              <div className="space-y-4">
                <OptionBtn title="আবহাওয়া" value={weather} onChange={setWeather} options={[{id:'sunny', icon:<Sun size={14}/>, label:'রোদেলা'}, {id:'rainy', icon:<CloudRain size={14}/>, label:'বৃষ্টি'}]} />
                <OptionBtn title="দিনের ধরণ" value={dayType} onChange={setDayType} options={[{id:'weekday', icon:<Calendar size={14}/>, label:'কাজের দিন'}, {id:'weekend', icon:<Calendar size={14}/>, label:'ছুটির দিন'}]} />
                <OptionBtn title="সময়" value={time} onChange={setTime} options={[{id:'morning', icon:<Clock size={14}/>, label:'সকাল'}, {id:'evening', icon:<Clock size={14}/>, label:'সন্ধ্যা'}]} />
              </div>
            </div>
            <div className="lg:col-span-7 bg-[#1e2430] p-8 rounded-2xl border border-gray-700 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/5 blur-3xl" />
               <div className="z-10 space-y-4">
                  <div className="mb-4 text-7xl animate-bounce">{rec.icon}</div>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-500">বারিস্টা প্যাটার্ন চিনে বলল:</p>
                  <h4 className="text-2xl font-black text-indigo-400">"{rec.name}"</h4>
                  <p className="max-w-xs text-sm text-slate-300">{rec.desc}</p>
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OptionBtn({ title, value, onChange, options }) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-bold text-slate-500 uppercase">{title}</span>
      <div className="grid grid-cols-2 gap-2">
        {options.map(o => (
          <button key={o.id} onClick={() => onChange(o.id)} className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${value === o.id ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md' : 'bg-black/20 border-white/5 text-slate-500 hover:text-slate-300'}`}>
            {o.icon} <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}