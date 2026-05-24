import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Minus } from 'lucide-react';

export default function ReadModeWidget() {
  const location = useLocation();

  // ১. লোকাল স্টোরেজ থেকে ইউজারের আগের সেটিংস রিড করা হচ্ছে
  const [isReadMode, setIsReadMode] = useState(() => {
    return localStorage.getItem('read-mode') === 'true';
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('read-mode-font-size') || '20', 10);
  });

  // ২. ইউজার ল্যাব সিমুলেটর ট্যাবে আছেন কিনা তা ট্র্যাক করার স্টেট
  const [isLabTab, setIsLabTab] = useState(false);

  // ৩. URL ফিল্টারিং লজিক: ড্যাশবোর্ড এবং সমস্ত লেসন পেজ (/word/ দিয়ে শুরু হওয়া) চেক
  const isTargetPage = location.pathname === '/dashboard' || location.pathname.startsWith('/word/');

  // ৪. রিডিং মোড অন/অফ হলে বডিতে ক্লাস যুক্ত বা রিমুভ করা
  useEffect(() => {
    if (!isTargetPage || isLabTab) {
      document.body.classList.remove('reading-mode-active');
      return;
    }

    if (isReadMode) {
      document.body.classList.add('reading-mode-active');
    } else {
      document.body.classList.remove('reading-mode-active');
    }

    localStorage.setItem('read-mode', isReadMode);
  }, [isReadMode, isLabTab, isTargetPage]);

  // ৫. ফন্ট সাইজ চেঞ্জ হলে CSS ভ্যারিয়েবল আপডেট করা হচ্ছে
  useEffect(() => {
    document.body.style.setProperty('--reading-font-size', `${fontSize}px`);
    localStorage.setItem('read-mode-font-size', fontSize);
  }, [fontSize]);

  // ৬. ল্যাব সিমুলেটর সেকশন ডিটেকশন লজিক
  useEffect(() => {
    if (!isTargetPage) return;

    const checkTab = () => {
      // পেজে থাকা সমস্ত বাটন চেক করে "🔬 ল্যাব সিমুলেটর" ট্যাবটি খুঁজে বের করা হচ্ছে
      const buttons = Array.from(document.querySelectorAll('button'));
      const labButton = buttons.find(
        btn => btn.textContent.includes('ল্যাব সিমুলেটর') && !btn.textContent.includes('লাইভ')
      );

      if (labButton) {
        // যদি ল্যাব ট্যাবের বাটনটি অ্যাক্টিভ থাকে (অ্যাক্টিভ হলে সাধারণত text-slate-100 ক্লাস থাকে বা text-slate-500 থাকে না)
        const isActive = labButton.classList.contains('text-slate-100') || !labButton.classList.contains('text-slate-500');
        setIsLabTab(isActive);
        
        if (isActive) {
          // ল্যাব সিমুলেটর অন থাকলে রিডিং মোড টেম্পোরারি বন্ধ থাকবে
          document.body.classList.remove('reading-mode-active');
        } else if (isReadMode) {
          // লেসন ট্যাবে ফেরত আসলে রিডিং মোড পুনরায় চালু হবে
          document.body.classList.add('reading-mode-active');
        }
      } else {
        // যদি কোনো ট্যাব বাটন না পাওয়া যায় (যেমন ড্যাশবোর্ড পেজে)
        setIsLabTab(false);
        if (isReadMode) {
          document.body.classList.add('reading-mode-active');
        }
      }
    };

    // লোড হওয়ার সাথে সাথে চেক করা হচ্ছে
    checkTab();

    // পেজে কোনো ক্লিক হলে ট্যাব চেক করা হচ্ছে (যাতে ট্যাবে ক্লিক করলে সাথে সাথে আপডেট হয়)
    const handleGlobalClick = () => {
      setTimeout(checkTab, 50);
    };

    document.addEventListener('click', handleGlobalClick);

    // ১ সেকেন্ডের মধ্যে কোনো অটোমেটিক চেঞ্জ হলে তা ট্র্যাক করার জন্য একটি ইন্টারভাল সেট করা হলো
    const interval = setInterval(checkTab, 400);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      clearInterval(interval);
    };
  }, [isTargetPage, isReadMode, location.pathname]);

  // ৭. রুট চেঞ্জ হলে রিড মোড বডি ক্লাস ক্লিনআপ করা
  useEffect(() => {
    return () => {
      document.body.classList.remove('reading-mode-active');
    };
  }, [location.pathname]);

  // যদি টার্গেট পেজ না হয় অথবা ল্যাব সিমুলেটর ট্যাব অ্যাক্টিভ থাকে, তবে উইজেট লুকানো থাকবে
  if (!isTargetPage || isLabTab) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 font-sans select-none">
      
      {/* ফন্ট সাইজ কন্ট্রোল প্যানেল (রিডিং মোড অন থাকলে দৃশ্যমান হবে) */}
      <AnimatePresence>
        {isReadMode && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="flex items-center gap-1.5 bg-[#eae1c9] border border-black/15 shadow-2xl px-3 py-1.5 rounded-full backdrop-blur-sm"
          >
            {/* ফন্ট সাইজ কমানোর বাটন (A-) - সর্বনিম্ন ১৪px */}
            <button
              onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
              disabled={fontSize <= 14}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-amber-950 hover:bg-black/5 active:scale-90 transition-all disabled:opacity-30"
              title="ফন্ট সাইজ কমান (A-)"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>

            {/* বর্তমান ফন্ট সাইজ ডিসপ্লে */}
            <span className="text-xs font-black text-amber-950 px-1 min-w-[36px] text-center">
              {fontSize}px
            </span>

            {/* ফন্ট সাইজ বাড়ানোর বাটন (A+) - সর্বোচ্চ ২৬px */}
            <button
              onClick={() => setFontSize(prev => Math.min(26, prev + 2))}
              disabled={fontSize >= 26}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-amber-950 hover:bg-black/5 active:scale-90 transition-all disabled:opacity-30"
              title="ফন্ট সাইজ বাড়ান (A+)"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* মেইন ফ্লোটিং টগল বাটন (বইয়ের আইকনসহ) */}
      <button
        onClick={() => setIsReadMode(!isReadMode)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 border ${
          isReadMode
            ? 'bg-[#eae1c9] border-black/15 text-amber-950 hover:bg-[#dfd5ba]'
            : 'bg-slate-900/90 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
        title={isReadMode ? "রিডিং মোড বন্ধ করুন" : "রিডিং মোড চালু করুন"}
      >
        <BookOpen size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
