import React from 'react';

// isHighlight = true হলে বক্সের ডিজাইন পরিবর্তন হয়ে ম্যাজেন্টা/পার্পল (Tech Insight) কালার হবে
export default function LogbookItem({ number, icon: Icon, title, isHighlight = false, children }) {
  return (
    <div className="relative flex items-start gap-3 md:gap-6">
      {/* Number Circle */}
      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#00daf3] to-[#d846ef] text-white flex items-center justify-center font-black text-[11px] sm:text-sm shrink-0 z-10 shadow-[0_0_15px_rgba(0,218,243,0.4)]">
        {number}
      </div>
      
      {/* Content Box */}
      <div 
        className={`flex-1 rounded-xl p-5 transition-colors ${
          isHighlight 
            ? 'bg-gradient-to-r from-[#1c0d2b]/60 to-[#0d071b]/60 border border-[#d846ef]/20 hover:border-[#d846ef]/40' 
            : 'border border-white/10 bg-[#161b22]/50 hover:bg-[#161b22]/80'
        }`}
      >
        <div 
          className={`flex items-center gap-2 font-extrabold text-sm sm:text-base md:text-lg tracking-wide border-b pb-2 mb-3 ${
            isHighlight ? 'text-white border-[#d846ef]/20' : 'text-white border-white/10'
          }`}
        >
          {Icon && (
            <Icon 
              size={16} 
              className={`${isHighlight ? 'text-[#d846ef] filter drop-shadow-[0_0_3px_#d846ef]' : 'text-[#00daf3] filter drop-shadow-[0_0_3px_#00daf3]'}`} 
            />
          )}
          {title}
        </div>
        
        {/* বক্সের ভেতরের কাস্টম কনটেন্ট */}
        <div className="text-sm sm:text-base md:text-lg text-[#c6c5d4] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}