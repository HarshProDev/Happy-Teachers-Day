import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { TEACHER_PHILOSOPHY_QUOTES } from '../data/tributes';
import { playSoftClick } from '../utils/audio';

export const WisdomQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    playSoftClick();
    setCurrentIndex((prev) => (prev + 1) % TEACHER_PHILOSOPHY_QUOTES.length);
  };

  const handlePrev = () => {
    playSoftClick();
    setCurrentIndex((prev) => (prev - 1 + TEACHER_PHILOSOPHY_QUOTES.length) % TEACHER_PHILOSOPHY_QUOTES.length);
  };

  const current = TEACHER_PHILOSOPHY_QUOTES[currentIndex];

  return (
    <section className="relative w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171424] to-[#121626] border border-amber-500/20 shadow-xl overflow-hidden">
        <Quote className="absolute top-4 right-4 w-20 h-20 text-amber-500/10 pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Voices of Wisdom on Teaching
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 transition-colors"
              title="Previous Quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-400 px-2 font-mono">
              {currentIndex + 1} / {TEACHER_PHILOSOPHY_QUOTES.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 transition-colors"
              title="Next Quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="my-2"
          >
            <p className="font-serif-vintage italic text-xl sm:text-2xl text-amber-100 leading-relaxed">
              "{current.quote}"
            </p>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <span className="font-display-royal text-sm font-bold text-amber-300 block">
                  {current.author}
                </span>
                <span className="text-xs text-neutral-400">
                  {current.title}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
