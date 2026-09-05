import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Feather, 
  Award, 
  Sparkles, 
  Flower2, 
  Gift, 
  Heart,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { VirtualTributeGift, ProfessorProfile } from '../types';
import { fireGoldenSparkles, fireCelebrationConfetti } from '../utils/confetti';
import { playTrophyChime } from '../utils/audio';

interface TrophyCabinetProps {
  gifts: VirtualTributeGift[];
  professor: ProfessorProfile;
}

export const TrophyCabinet: React.FC<TrophyCabinetProps> = ({ gifts, professor }) => {
  const [selectedGift, setSelectedGift] = useState<VirtualTributeGift | null>(gifts[0]);
  const [presentedCounts, setPresentedCounts] = useState<Record<string, number>>({
    'gift-coffee': 42,
    'gift-quill': 28,
    'gift-laurel': 35,
    'gift-prism': 19,
    'gift-bouquet': 56,
  });

  const getGiftIcon = (icon: string, className = 'w-6 h-6') => {
    switch (icon) {
      case 'Coffee': return <Coffee className={className} />;
      case 'Feather': return <Feather className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Flower2': return <Flower2 className={className} />;
      default: return <Gift className={className} />;
    }
  };

  const handlePresentToken = (giftId: string) => {
    setPresentedCounts((prev) => ({
      ...prev,
      [giftId]: (prev[giftId] || 0) + 1,
    }));
    playTrophyChime();
    fireCelebrationConfetti();
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto my-14 px-4">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest font-semibold uppercase mb-2">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          The Tribute Showcase
        </div>
        <h2 className="font-display-royal text-2xl sm:text-3xl text-neutral-100 font-bold tracking-wide">
          Tokens of Scholarly Reverence
        </h2>
        <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-1">
          Symbolic honors awarded to {professor.salutation} {professor.name} representing our deepest student gratitude.
        </p>
      </div>

      {/* Grid of Tokens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {gifts.map((item) => {
          const isSelected = selectedGift?.id === item.id;
          const count = presentedCounts[item.id] || 0;

          return (
            <motion.button
              key={item.id}
              onClick={() => {
                setSelectedGift(item);
                playTrophyChime();
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#221c2e] to-[#161224] border-amber-400/80 shadow-lg shadow-amber-500/10'
                  : 'bg-[#121520] hover:bg-[#181d2c] border-neutral-800'
              }`}
            >
              {/* Badge for count */}
              <div className="flex items-center justify-between w-full mb-3">
                <div className={`p-2.5 rounded-xl border ${item.accent}`}>
                  {getGiftIcon(item.icon, 'w-5 h-5')}
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                  {count} bestowed
                </span>
              </div>

              <div>
                <h4 className="font-display-royal text-sm font-bold text-neutral-100 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Detailed Spotlight Preview for Selected Token */}
      <AnimatePresence mode="wait">
        {selectedGift && (
          <motion.div
            key={selectedGift.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171424] via-[#1b192e] to-[#121626] border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center ${selectedGift.accent} shadow-xl`}>
                {getGiftIcon(selectedGift.icon, 'w-10 h-10')}
              </div>
              <div className="max-w-xl">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                  Token of Honor • {selectedGift.subtitle}
                </div>
                <h3 className="font-display-royal text-xl sm:text-2xl font-bold text-amber-100">
                  {selectedGift.title}
                </h3>
                <p className="text-neutral-300 text-sm mt-2 leading-relaxed">
                  {selectedGift.symbolism}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <button
                id={`bestow-${selectedGift.id}-btn`}
                onClick={() => handlePresentToken(selectedGift.id)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-neutral-950" />
                <span>Bestow To Professor</span>
              </button>
              <span className="text-[11px] text-amber-300/80">
                Bestowed {presentedCounts[selectedGift.id] || 0} times by students!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
