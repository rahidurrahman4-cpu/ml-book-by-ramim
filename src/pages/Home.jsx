import React from 'react';

export default function Home() {
  return (
    <div className="flex-1 bg-[#0b0f19] text-slate-200 p-6 overflow-y-auto h-screen">
      
      {/* টপ বার (সার্চ এবং প্রোফাইল) */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative w-72">
          <input 
            type="text" 
            placeholder="খুঁজুন..." 
            className="w-full bg-[#161d30] text-sm text-slate-300 pl-10 pr-4 py-2 rounded-full border border-slate-800 focus:outline-none focus:border-[#5b5dfa]"
          />
          <span className="absolute left-3.5 top-2.5 text-slate-500 text-xs">🔍</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white">🔔</button>
          <div className="w-8 h-8 overflow-hidden border rounded-full bg-slate-700 border-slate-600">
            {/* আপনার প্রোফাইল পিকচার এখানে দিতে পারেন */}
            <div className="flex items-center justify-center w-full h-full text-xs font-bold text-white bg-blue-500">R</div>
          </div>
        </div>
      </div>

      {/* হিরো সেকশন এবং স্ট্যাটস গ্রিড */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
        
        {/* হিরো ব্যানার (বাম পাশের বড় কার্ড) */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#161d30] to-[#1e2942] rounded-2xl p-6 flex items-center justify-between border border-slate-800/80 relative overflow-hidden">
          <div className="z-10 max-w-[60%]">
            <span className="text-[10px] font-bold tracking-widest text-[#5b5dfa] uppercase">মেশিন লার্নিং বুক</span>
            <h2 className="mt-1 mb-2 text-2xl font-bold text-white">শব্দে শব্দে মেশিন লার্নিং</h2>
            <p className="text-xs leading-relaxed text-slate-400">সহজ বাংলায় ভিজ্যুয়াল ও ইন্টারঅ্যাক্টিভ সিমুলেশনের মাধ্যমে শিখুন মেশিন লার্নিংয়ের মৌলিক বিষয়গুলো।</p>
          </div>
          {/* ব্রেইন ইলাস্ট্রেশন (ডান পাশে) */}
          <div className="flex items-center justify-center w-32 h-32 border rounded-full md:w-40 md:h-40 bg-slate-800/30 border-slate-700/50">
            <span className="text-6xl">🧠</span> {/* ডামি ছবি হিসেবে ব্রেইন ইমোজি */}
          </div>
        </div>

        {/* স্ট্যাটস কার্ড (ডান পাশের ছোট কার্ডসমূহ) */}
        <div className="bg-[#161d30] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <p className="text-xs tracking-wider uppercase text-slate-400">অধ্যায়</p>
            <h3 className="mt-2 text-4xl font-extrabold text-white">২</h3>
            <p className="text-[10px] text-slate-500 mt-1">মোট অধ্যায়</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-slate-800/80">
            <div>
              <p className="text-[10px] text-slate-400">লেকচার</p>
              <p className="text-xl font-bold text-white">১৯</p>
              <p className="text-[9px] text-slate-500">মোট লেকচার</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">সম্পন্ন</p>
              <p className="text-xl font-bold text-emerald-500">০</p>
              <p className="text-[9px] text-slate-500">লেকচার</p>
            </div>
          </div>
        </div>

      </div>

      {/* আপনার অধ্যায়সমূহ সেকশন */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-base font-bold text-white">
            <span className="w-1 h-5 bg-[#5b5dfa] rounded-full inline-block"></span>
            আপনার অধ্যায়সমূহ
          </h3>
          <button className="text-xs text-[#5b5dfa] hover:underline">সবগুলো দেখুন →</button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* অধ্যায় ১ কার্ড */}
          <div className="bg-[#161d30] rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#5b5dfa]/10 flex items-center justify-center text-[10px] text-[#5b5dfa] font-bold">১</span>
                  <h4 className="text-sm font-bold text-white">অধ্যায়-১: এআই-এর অ আ ক খ</h4>
                </div>
                <span className="text-xs text-slate-500">💡</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-2">৮ লেকচার • ৫২.৪ মিনিট</p>
              <p className="text-xs leading-relaxed text-slate-400 line-clamp-2">কৃত্রিম বুদ্ধিমত্তার মৌলিক ধারণা, ইতিহাস ও গুরুত্বপূর্ণ বিষয়গুলো জানুন।</p>
            </div>
            <button className="mt-5 w-fit px-4 py-2 bg-[#5b5dfa] hover:bg-[#4d4ff0] text-xs font-bold text-white rounded-lg transition-all flex items-center gap-2">
              চালিয়ে যান →
            </button>
          </div>

          {/* অধ্যায় ২ কার্ড */}
          <div className="bg-[#161d30] rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#5b5dfa]/10 flex items-center justify-center text-[10px] text-[#5b5dfa] font-bold">২</span>
                  <h4 className="text-sm font-bold text-white">অধ্যায়-২: মেশিনের ল্যাবরেটরি</h4>
                </div>
                <span className="text-xs text-slate-500">🧪</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-2">৬ লেকচার • ২২.৫ মিনিট</p>
              <p className="text-xs leading-relaxed text-slate-400 line-clamp-2">মেশিন লার্নিং এর প্র্যাকটিক্যাল দিক ও ল্যাব-ভিত্তিক শেখা।</p>
            </div>
            <button className="mt-5 w-fit px-4 py-2 bg-[#5b5dfa] hover:bg-[#4d4ff0] text-xs font-bold text-white rounded-lg transition-all flex items-center gap-2">
              চালিয়ে যান →
            </button>
          </div>
        </div>
      </div>

      {/* শিক্ষার পথ সেকশন */}
      <div className="bg-[#161d30] rounded-2xl p-6 border border-slate-800 text-center">
        <h4 className="flex items-center justify-center gap-2 mb-2 text-sm font-bold text-white">
          🎓 শিক্ষার পথ (Learning Path)
        </h4>
        <p className="max-w-xl mx-auto text-xs leading-relaxed text-slate-400">
          এই বইটি মেশিন লার্নিং এর মৌলিক ধারণা থেকে শুরু করে উন্নত ধারণাগুলি পর্যন্ত ধাপে ধাপে সাজানো হয়েছে যাতে যেকোনো শিক্ষার্থী সহজে শিখতে ও বাস্তবে প্রয়োগ করতে পারেন।
        </p>
      </div>

    </div>
  );
}