import React from 'react';
import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';

export default function LogbookContainer({ title, subtitle, date, itemVariants, children }) {
  return (
    <motion.div variants={itemVariants} className="space-y-8 font-sans bg-transparent">
      {/* Logbook Header Card */}
      <div className="flex flex-col items-start justify-between gap-3 pb-5 border-b sm:flex-row sm:items-center border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold text-[#00daf3] tracking-widest uppercase mb-2">
            <PenTool size={14} className="text-[#00daf3] filter drop-shadow-[0_0_3px_#00daf3]" />
            রিমিশার ইঞ্জিনিয়ারিং লগবুক
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00daf3] leading-none tracking-wide">
            {title}
          </h2>
          <span className="text-[11px] sm:text-xs text-[#8080a0] block mt-1">
            ({subtitle})
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00daf3] to-[#d846ef] rounded-full mt-3" />
        </div>
        <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-[#8080a0] font-bold">
          তারিখ: {date}
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-0 space-y-5 sm:pl-6 sm:space-y-6">
        {/* Vertical Connector Line */}
        <div className="absolute left-[13px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00daf3] via-[#d846ef] to-transparent opacity-30 sm:left-[17px] sm:top-6 sm:bottom-6" />
        
        {/* এখানেই লগবুকের পয়েন্টগুলো রেন্ডার হবে */}
        {children}
      </div>
    </motion.div>
  );
}
