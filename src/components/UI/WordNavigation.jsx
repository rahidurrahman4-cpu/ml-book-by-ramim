import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getAllWords } from '../../data/wordsIndex';

export default function WordNavigation({ fallbackPath }) {
  const { wordPath } = useParams();
  const allWords = getAllWords();
  const currentWordPath = wordPath || fallbackPath;
  const currentWordIndex = allWords.findIndex((word) => word.path === currentWordPath);

  const previousWord = currentWordIndex > 0 ? allWords[currentWordIndex - 1] : null;
  const nextWord = currentWordIndex >= 0 && currentWordIndex < allWords.length - 1 ? allWords[currentWordIndex + 1] : null;

  return (
    <div className="flex justify-end">
      <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
        {previousWord ? (
          <Link
            to={`/word/${previousWord.path}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-[#c6c5d4] text-xs sm:text-sm font-bold hover:bg-white/10 hover:text-white transition-colors"
          >
            <ChevronLeft size={14} /> Previous Word
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-[#6b6f9a] text-xs sm:text-sm font-bold cursor-not-allowed"
          >
            <ChevronLeft size={14} /> Previous Word
          </button>
        )}

        {nextWord ? (
          <Link
            to={`/word/${nextWord.path}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00daf3] text-[#04111b] text-xs sm:text-sm font-black hover:bg-[#35e4f7] transition-colors"
          >
            Next Word <ChevronRight size={14} />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00daf3]/20 text-[#6b6f9a] text-xs sm:text-sm font-black cursor-not-allowed"
          >
            Next Word <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}