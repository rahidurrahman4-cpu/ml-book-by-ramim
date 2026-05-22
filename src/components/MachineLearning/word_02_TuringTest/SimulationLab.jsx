import React, { useState, useEffect } from 'react';

export default function SimulationLab() {
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [chatLog, setChatLog] = useState({ X: [], Y: [] });
  const [isTyping, setIsTyping] = useState(false);
  const [turingGuess, setTuringGuess] = useState(null);
  const [guessResult, setGuessResult] = useState(null);
  const [aiRoom, setAiRoom] = useState('X');

  useEffect(() => {
    setAiRoom(Math.random() > 0.5 ? 'X' : 'Y');
  }, []);

  const turingQuestions = [
    { id: 'q1', text: "স্যার, ২+২ কত হয়?" },
    { id: 'q2', text: "তুমি কি গান শুনতে ভালোবাসো?" },
    { id: 'q3', text: "তোমার সাথে কথা বলতে ভালো লাগছে!" },
    { id: 'q4', text: "তুমি কি রোবট নাকি রক্তমাংসের মানুষ?" }
  ];

  const responses = {
    AI: {
      q1: "গাধা নাকি তুমি? এই বয়সে এসে ২+২ জিজ্ঞেস করছ? যাও, ক্লাস টু-এর বই পড়ে আসো!",
      q2: "গান? আমার তো কোনো কান নেই ভাই। তবে আমার সিস্টেমে লাখ লাখ অডিও ফাইল স্টোরড আছে!",
      q3: "ধন্যবাদ। আমি শুধু আপনাকে তথ্য দিয়ে সাহায্য করার জন্য তৈরি করা হয়েছি।",
      q4: "আমি একটি কম্পিউটার প্রোগ্রাম বা লার্জ ল্যাঙ্গুয়েজ মডেল যা গুগলের..."
    },
    Human: {
      q1: "উমম... ২ আর ২ তো ৪ হয়! কিন্তু হঠাৎ এই সহজ হিসাব কেন? হা হা!",
      q2: "আহ! বৃষ্টির দিনে রবীন্দ্রসংগীত শুনতে দারুন লাগে। আপনার কোন ধরনের গান পছন্দ?",
      q3: "আরেহ থ্যাংক ইউ! আপনার সাথে আড্ডা দিয়েও খুব ভালো লাগছে ভাইয়া/আপু।",
      q4: "হাহাহা, রক্তমাংসের মানুষই তো! কেন, আমার টাইপিং কি রোবটের মতো লাগছে নাকি?"
    }
  };

  const handleAskQuestion = (question) => {
    if (isTyping || askedQuestions.includes(question.id)) return;

    setAskedQuestions(prev => [...prev, question.id]);
    setIsTyping(true);

    const responseX = aiRoom === 'X' ? responses.AI[question.id] : responses.Human[question.id];
    const responseY = aiRoom === 'Y' ? responses.AI[question.id] : responses.Human[question.id];

    setChatLog(prev => ({
      X: [...prev.X, { sender: 'judge', text: question.text }],
      Y: [...prev.Y, { sender: 'judge', text: question.text }]
    }));

    setTimeout(() => {
      setChatLog(prev => ({
        X: [...prev.X, { sender: 'respondent', text: responseX }],
        Y: [...prev.Y, { sender: 'respondent', text: responseY }]
      }));
      setIsTyping(false);
    }, 1500);
  };

  const handleTuringGuess = (room) => {
    setTuringGuess(room);
    setGuessResult(room === aiRoom ? 'correct' : 'wrong');
  };

  const resetTuringGame = () => {
    setAskedQuestions([]);
    setChatLog({ X: [], Y: [] });
    setTuringGuess(null);
    setGuessResult(null);
    setAiRoom(Math.random() > 0.5 ? 'X' : 'Y');
  };

  return (
    <div className="w-full space-y-8 font-sans text-slate-200">
      {/* Header Area */}
      <div className="pb-4 space-y-3 text-center">
        <h2 className="flex items-center justify-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <span className="bg-[#9333ea]/20 text-[#d8b4fe] border border-[#9333ea]/30 text-xs px-3 py-1 rounded-full">ল্যাব-০২</span>
          টুরিং টেস্ট (Turing Test)
        </h2>
        <p className="max-w-2xl mx-auto text-sm text-slate-400 md:text-base">
          মেশিনের মানুষের মতো বুদ্ধিমত্তা আচরণ বা অনুকরণ করার ক্ষমতা যাচাইয়ের ঐতিহাসিক পরীক্ষা।
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Main Interactive Area */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden shadow-lg">
            <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-purple-400">
                  <span>🕵️‍♂️</span> কে মানুষ আর কে এআই?
                </h3>
                <button onClick={resetTuringGame} className="text-xs bg-white/5 hover:bg-white/10 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                  🔄 রিসেট
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                {/* Room X */}
                <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col h-[280px]">
                  <span className="bg-purple-500/10 text-purple-300 text-[10px] uppercase font-bold px-3 py-1 rounded border border-purple-500/20 self-start mb-3">🚪 রুম X</span>
                  <div className="flex-1 pr-2 space-y-3 overflow-y-auto text-xs scrollbar-thin">
                    {chatLog.X.length === 0 ? <p className="mt-16 italic text-center text-slate-500">রুম X এখনো কোনো বার্তা পায়নি</p> : chatLog.X.map((msg, idx) => (
                      <div key={idx} className={`flex flex-col ${msg.sender === 'judge' ? 'items-end' : 'items-start'}`}>
                        <span className={`px-3 py-2 rounded-lg max-w-[85%] leading-relaxed ${msg.sender === 'judge' ? 'bg-[#4f46e5]/20 text-indigo-200 rounded-tr-none' : 'bg-white/10 text-slate-300 rounded-tl-none'}`}>{msg.text}</span>
                      </div>
                    ))}
                    {isTyping && <div className="flex justify-start"><span className="text-slate-400 text-[10px] animate-pulse">টাইপ করছে...</span></div>}
                  </div>
                </div>

                {/* Room Y */}
                <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col h-[280px]">
                  <span className="bg-purple-500/10 text-purple-300 text-[10px] uppercase font-bold px-3 py-1 rounded border border-purple-500/20 self-start mb-3">🚪 রুম Y</span>
                  <div className="flex-1 pr-2 space-y-3 overflow-y-auto text-xs scrollbar-thin">
                    {chatLog.Y.length === 0 ? <p className="mt-16 italic text-center text-slate-500">রুম Y এখনো কোনো বার্তা পায়নি</p> : chatLog.Y.map((msg, idx) => (
                      <div key={idx} className={`flex flex-col ${msg.sender === 'judge' ? 'items-end' : 'items-start'}`}>
                        <span className={`px-3 py-2 rounded-lg max-w-[85%] leading-relaxed ${msg.sender === 'judge' ? 'bg-[#4f46e5]/20 text-indigo-200 rounded-tr-none' : 'bg-white/10 text-slate-300 rounded-tl-none'}`}>{msg.text}</span>
                      </div>
                    ))}
                    {isTyping && <div className="flex justify-start"><span className="text-slate-400 text-[10px] animate-pulse">টাইপ করছে...</span></div>}
                  </div>
                </div>
              </div>

              {/* Questions Area */}
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 mb-6">
                <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wider font-bold">বিচারক (Judge) হিসেবে প্রশ্ন করুন:</p>
                <div className="flex flex-wrap gap-2">
                  {turingQuestions.map(q => {
                    const isAsked = askedQuestions.includes(q.id);
                    return (
                      <button key={q.id} disabled={isAsked || isTyping || turingGuess !== null} onClick={() => handleAskQuestion(q)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${isAsked ? 'bg-white/5 border-transparent text-slate-600 cursor-not-allowed' : 'bg-white/5 border-purple-500/30 hover:border-purple-500 text-purple-200'}`}>
                        <span>💬</span> {q.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Final Guess Area */}
              {askedQuestions.length >= 2 && turingGuess === null && (
                <div className="p-6 space-y-4 text-center border bg-amber-500/10 border-amber-500/20 rounded-xl animate-fade-in">
                  <p className="text-sm font-bold text-amber-400">🚨 আপনি বিচারক! এবার রায় দিন: কোনটি এআই (AI)?</p>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleTuringGuess('X')} className="bg-purple-600/80 hover:bg-purple-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all border border-purple-500/50">🚪 রুম X হলো এআই</button>
                    <button onClick={() => handleTuringGuess('Y')} className="bg-purple-600/80 hover:bg-purple-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all border border-purple-500/50">🚪 রুম Y হলো এআই</button>
                  </div>
                </div>
              )}

              {/* Result Area */}
              {turingGuess !== null && (
                <div className={`p-6 rounded-xl border text-center space-y-2 ${guessResult === 'correct' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200' : 'bg-rose-500/10 border-rose-500/20 text-rose-200'}`}>
                  <h4 className="text-lg font-bold">{guessResult === 'correct' ? '🎉 সফল টুরিং টেস্ট!' : '❌ আপনি ধোঁকা খেয়েছেন!'}</h4>
                  <p className="text-sm opacity-90">{guessResult === 'correct' ? `সঠিক রায়! রুম ${aiRoom}-এ ছিল আমাদের কৃত্রিম এআই। আপনি মানুষ এবং এআই সঠিকভাবে আলাদা করতে পেরেছেন!` : `রুম ${aiRoom}-এ ছিল আমাদের কৃত্রিম এআই চ্যাটবট। কিন্তু তার নিখুঁত অভিনয় আপনাকে বিভ্রান্ত করে দিয়েছে! এটাই হলো টুরিং টেস্টের ম্যাজিক!`}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 space-y-4">
            <h3 className="flex items-center gap-2 pb-3 text-sm font-bold text-white border-b border-white/5">
              <span className="text-rose-400">🇨🇳</span> চীনা ঘরের যুক্তি
            </h3>
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-white/5 text-xs text-slate-300 space-y-3">
              <p>আপনাকে একটি বন্ধ ঘরে কিছু চীনা লিপির বই এবং ইংরেজি গাইডবুক দিয়ে বসিয়ে দেওয়া হলো। আপনি চীনা ভাষা বোঝেন না।</p>
              <p>কেউ চীনা ভাষায় চিঠি দিলে আপনি গাইডবুকের নিয়ম মিলিয়ে চীনা অক্ষরেই উত্তর লিখে দিলেন।</p>
              <p className="border-t border-white/5 pt-2 text-[#d8b4fe] font-semibold">বাহিরের লোক ভাববে আপনি চীনা ভাষা বোঝেন (টুরিং টেস্ট পাস)। কিন্তু বাস্তবে আপনি ভাষা না বুঝেই স্রেফ "নকল" করেছেন!</p>
            </div>
            <div className="text-[11px] text-slate-400 bg-white/5 p-3 rounded-lg leading-relaxed italic text-center">
              "মেশিন কেবল মানুষের বুদ্ধিমত্তা নকল করতে পারে, নিজস্ব কোনো চেতনা বা বোধ তৈরি করতে পারে না।"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}