import React from 'react';
import { motion } from 'framer-motion';

export default function ComparisonTable({ tableData, itemVariants }) {
  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <h2 className="flex items-center gap-2 pb-2 font-sans text-xl font-bold text-white border-b border-white/5">
        <span className="text-[#00daf3] text-lg">■</span>
        {tableData.title}
      </h2>

      <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.01] shadow-md font-sans">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {tableData.headers.map((h, i) => (
                <th key={i} className="p-3 text-base font-extrabold text-[#dfe0ff]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                <td className="p-3 font-extrabold text-[#00daf3] text-sm md:text-base">{row.feature}</td>
                <td className="p-3 text-[#c6c5d4] text-sm md:text-base leading-relaxed">{row.computer}</td>
                <td className="p-3 text-[#dfe0ff] text-sm md:text-base leading-relaxed font-semibold">{row.ai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}