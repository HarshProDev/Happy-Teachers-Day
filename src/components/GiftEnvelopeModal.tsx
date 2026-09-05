import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Award, GraduationCap, X } from 'lucide-react';
import { ProfessorProfile } from '../types';
import { fireCelebrationConfetti } from '../utils/confetti';
import { playCelebrationChime } from '../utils/audio';

interface GiftEnvelopeModalProps {
  professor: ProfessorProfile;
  isOpen: boolean;
  onClose: () => void;
  onOpenedGift: () => void;
}

export const GiftEnvelopeModal: React.FC<GiftEnvelopeModalProps> = ({
  professor,
  isOpen,
  onClose,
  onOpenedGift,
}) => {
  const [isSealed, setIsSealed] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);

  const handleBreakSeal = () => {
    setIsSealed(false);
    playCelebrationChime();
    fireCelebrationConfetti();
    setTimeout(() => {
      setHasOpened(true);
      onOpenedGift();
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1829] to-[#0d0d15] border border-amber-500/30 p-6 md:p-8 shadow-2xl text-center"
        >
          {/* Close button if already opened or previewing */}
          <button
            id="close-envelope-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {!hasOpened ? (
            <div className="py-6 flex flex-col items-center">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest font-semibold uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Teacher’s Day Special Tribute
              </div>

              <h2 className="font-display-royal text-2xl md:text-3xl text-amber-100 font-bold tracking-wide mb-2">
                A Royal Tribute of Gratitude & Respect
              </h2>
              <p className="text-neutral-300 text-sm md:text-base max-w-lg mb-8">
                Specially addressed to{' '}
                <span className="text-amber-300 font-semibold">
                  {professor.name === 'All Our Esteemed Professors & Mentors'
                    ? 'All Our Respected Professors, Mentors & Guides'
                    : `${professor.salutation} ${professor.name}`}
                </span>{' '}
                from your thankful students and scholars.
              </p>

              {/* Royal Wax Seal Envelope Graphic */}
              <div className="relative w-full max-w-md my-4 p-8 rounded-xl bg-gradient-to-br from-[#2a1b24] via-[#1f1520] to-[#120e18] border-2 border-amber-500/40 shadow-inner flex flex-col items-center justify-center">
                {/* Gold Academic Corner Flourishes */}
                <div className="absolute top-2 left-2 text-amber-400/40 font-serif-vintage text-lg">✦</div>
                <div className="absolute top-2 right-2 text-amber-400/40 font-serif-vintage text-lg">✦</div>
                <div className="absolute bottom-2 left-2 text-amber-400/40 font-serif-vintage text-lg">✦</div>
                <div className="absolute bottom-2 right-2 text-amber-400/40 font-serif-vintage text-lg">✦</div>

                <div className="mb-4 text-center">
                  <div className="font-serif-vintage italic text-amber-200/80 text-sm tracking-wide">
                    To All Our Respected Faculty Members
                  </div>
                  <div className="font-display-royal font-bold text-lg text-amber-300">
                    {professor.department || 'Across All Academic Departments'}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {professor.college || 'Our University & College'}
                  </div>
                </div>

                {/* Wax Seal Button */}
                <motion.button
                  id="break-wax-seal-btn"
                  onClick={handleBreakSeal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer my-4"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-700 via-rose-800 to-red-950 border-4 border-amber-400/80 shadow-2xl flex flex-col items-center justify-center wax-seal-glow text-amber-100">
                    <GraduationCap className="w-8 h-8 text-amber-200 mb-0.5" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-100 font-display-royal">
                      {isSealed ? 'Break Seal' : 'Opening...'}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/50 animate-spin-slow pointer-events-none" />
                </motion.button>

                <p className="text-xs text-amber-200/70 font-serif-vintage italic mt-3">
                  Click the royal wax seal to unveil your gift
                </p>
              </div>

              <div className="text-xs text-neutral-400 mt-4 flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
                <span>by {professor.studentName || 'Your Students'}</span>
              </div>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mb-4 text-amber-300">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-display-royal text-2xl font-bold text-amber-200 mb-2">
                Honoring {professor.salutation} {professor.name}
              </h3>
              <p className="text-neutral-300 text-sm max-w-md mb-6">
                Your dedicated guidance inspires us every day. We invite you to explore your personal tribute letter, honorary citation, and memories.
              </p>
              <button
                id="enter-tribute-portal-btn"
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Enter Your Tribute Experience →
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
