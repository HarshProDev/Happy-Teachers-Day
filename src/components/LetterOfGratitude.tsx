import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  BookOpen, 
  Feather, 
  GraduationCap, 
  Quote, 
  Volume2, 
  VolumeX,
  Edit3
} from 'lucide-react';
import { ProfessorProfile } from '../types';
import { fireGoldenSparkles } from '../utils/confetti';
import { playTrophyChime } from '../utils/audio';

interface LetterOfGratitudeProps {
  professor: ProfessorProfile;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
  onOpenCustomModal: () => void;
}

export const LetterOfGratitude: React.FC<LetterOfGratitudeProps> = ({
  professor,
  isAmbientPlaying,
  onToggleAmbient,
  onOpenCustomModal,
}) => {
  const handleSignTribute = () => {
    fireGoldenSparkles();
    playTrophyChime();
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto my-8 px-4">
      {/* Decorative Outer Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-rose-500/10 to-amber-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

      {/* Main Parchment Letter Frame */}
      <div className="relative parchment-bg rounded-2xl border-4 border-[#b45309]/30 text-neutral-900 shadow-2xl p-6 sm:p-10 md:p-14 overflow-hidden">
        {/* Subtle Watermark Crest in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <GraduationCap className="w-96 h-96 text-amber-950" />
        </div>

        {/* Ornate Vintage Borders */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-700/50" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-700/50" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-700/50" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-700/50" />

        {/* Top Letter Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-amber-900/15 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3 text-amber-900">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-inner">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display-royal text-xs uppercase tracking-widest text-amber-900 font-bold block">
                Academic Epistle of Gratitude
              </span>
              <span className="text-xs text-amber-800/80 font-serif-vintage italic">
                Teacher's Day Commemoration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="letter-ambient-music-btn"
              onClick={onToggleAmbient}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                isAmbientPlaying
                  ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
                  : 'bg-amber-100/80 hover:bg-amber-200 text-amber-900 border-amber-300'
              }`}
              title="Toggle reading ambient harmony"
            >
              {isAmbientPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isAmbientPlaying ? 'Playing Ambient Harmony' : 'Play Gentle Ambient'}</span>
            </button>

            <button
              id="edit-letter-tribute-btn"
              onClick={onOpenCustomModal}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-amber-800 bg-amber-200/60 hover:bg-amber-200 border border-amber-400/50 transition-colors"
              title="Edit professor details or custom message"
            >
              <Edit3 className="w-3 h-3" />
              <span>Personalize</span>
            </button>
          </div>
        </div>

        {/* Formal Address */}
        <div className="mb-8">
          <div className="font-serif-vintage italic text-amber-900/80 text-base mb-1">
            {professor.name === 'All Our Esteemed Professors & Mentors'
              ? 'An Open Letter of Supreme Reverence'
              : 'To Our Revered Professor & Mentor,'}
          </div>
          <h1 className="font-display-royal text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 tracking-tight">
            {professor.name === 'All Our Esteemed Professors & Mentors'
              ? 'To All Our Esteemed Professors & Mentors'
              : `${professor.salutation} ${professor.name}`}
          </h1>
          <div className="text-sm font-semibold text-amber-800 tracking-wide mt-1">
            {professor.department} • {professor.college}
          </div>
          <div className="text-xs text-amber-900/70 italic mt-0.5">
            {professor.name === 'All Our Esteemed Professors & Mentors'
              ? 'Honoring All Faculties, Lectures, Laboratories & Research Seminars'
              : `Subject & Specialization: ${professor.subject}`}
          </div>
        </div>

        {/* Illuminated Body Text */}
        <div className="font-serif-vintage text-lg sm:text-xl text-neutral-800 leading-relaxed space-y-6">
          <p className="first-letter:font-display-royal first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:text-amber-900 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            As college students, we encounter countless textbooks and dense syllabi, but only great professors possess the transcendent gift of transforming knowledge into lifelong inspiration. On this auspicious Teacher’s Day, we stand together as a student community to honor you—not solely for the exams graded, the code compiled, or the theorems proven, but for the profound wisdom, character, and humanity you bring into our lives.
          </p>

          <p>
            Whether in early 8:00 AM lecture halls, long laboratory afternoons, or quiet office hours, you never treated our questions as interruptions, but as sparks of discovery. You showed us that making mistakes in problem-solving is the honorable rite of passage of every scholar. In semesters when we felt overwhelmed by capstones, midterms, and future uncertainties, your patience and faith in our potential kept us moving forward.
          </p>

          {/* Special Custom Message / Story Quote Box */}
          <div className="my-6 p-5 sm:p-6 rounded-xl bg-amber-100/70 border-l-4 border-amber-700 shadow-sm relative">
            <Quote className="w-8 h-8 text-amber-700/20 absolute top-3 right-3" />
            <div className="text-xs uppercase font-bold tracking-widest text-amber-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Tribute From The Student Body
            </div>
            <p className="italic text-amber-950 text-base sm:text-lg">
              "{professor.customMessage || 'To every professor who walked into our classrooms with enthusiasm, bore with our backbench chaos, and poured their energy into making us capable scholars and ethical human beings—we owe you our greatest gratitude.'}"
            </p>
            {professor.specialMemory && (
              <div className="mt-3 pt-3 border-t border-amber-200/80 text-xs sm:text-sm text-amber-900/90">
                <span className="font-bold">What we will never forget:</span> {professor.specialMemory}
              </div>
            )}
          </div>

          <p>
            We thank you for the uncounted hours spent preparing slides, giving constructive margin notes on our drafts, writing recommendations that unlocked our dream opportunities, and instilling in us the discipline to seek excellence with humble curiosity.
          </p>

          <p className="font-semibold text-amber-950">
            May you continue to illuminate curious minds, inspire generations of scholars, and take pride in knowing that in every industry and walk of life, your students carry forward the torch you lit.
          </p>
        </div>

        {/* Letter Signatures & Wax Seal Stamp */}
        <div className="mt-10 pt-8 border-t-2 border-amber-900/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-amber-900/70 mb-1">
              Respectfully Dedicated By
            </div>
            <div className="font-chalk text-3xl sm:text-4xl text-amber-950 font-bold tracking-wide">
              {professor.studentName || 'Your Grateful Students'}
            </div>
            <div className="text-xs font-serif-vintage italic text-amber-800">
              {professor.batch || 'Class of 2025'}
            </div>
          </div>

          {/* Interactive Golden Seal */}
          <div className="flex flex-col items-center">
            <motion.button
              id="endorse-letter-seal-btn"
              onClick={handleSignTribute}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-2 border-amber-400 shadow-md flex flex-col items-center justify-center text-amber-100 cursor-pointer"
              title="Click to stamp student gratitude"
            >
              <Heart className="w-6 h-6 fill-amber-300 text-amber-300" />
              <span className="text-[9px] font-bold tracking-tighter uppercase font-display-royal">
                Revered
              </span>
            </motion.button>
            <span className="text-[10px] text-amber-800 font-serif-vintage italic mt-1">
              Click to bestow love
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
