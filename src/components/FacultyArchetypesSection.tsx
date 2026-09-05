import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  FlaskConical, 
  Heart, 
  ShieldCheck, 
  Compass, 
  GraduationCap, 
  Award, 
  Quote,
  ThumbsUp
} from 'lucide-react';
import { FACULTY_ARCHETYPES } from '../data/tributes';
import { FacultyArchetype } from '../types';
import { fireGoldenSparkles, fireCelebrationConfetti } from '../utils/confetti';
import { playTrophyChime, playCelebrationChime } from '../utils/audio';

export const FacultyArchetypesSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(FACULTY_ARCHETYPES[0].id);
  const [applaudCounts, setApplaudCounts] = useState<Record<string, number>>({
    'archetype-lecturer': 84,
    'archetype-research': 63,
    'archetype-mentor': 92,
    'archetype-strict': 57,
    'archetype-industry': 71,
    'archetype-dean': 49,
  });

  const getArchetypeIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-emerald-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-purple-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleApplaud = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setApplaudCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    playCelebrationChime();
    fireCelebrationConfetti();
  };

  const currentArchetype = FACULTY_ARCHETYPES.find(a => a.id === selectedId) || FACULTY_ARCHETYPES[0];

  return (
    <section className="relative w-full max-w-6xl mx-auto my-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest font-semibold uppercase mb-2">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          The Faculty Spectrum • All-Rounder Tribute
        </div>
        <h2 className="font-display-royal text-2xl sm:text-3xl md:text-4xl text-neutral-100 font-bold tracking-wide">
          Honoring Every Professor Who Touched Our Lives
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-2 font-serif-vintage italic">
          No matter your department or teaching style, every student carries a part of your wisdom into the world.
        </p>
      </div>

      {/* Grid of Archetypes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FACULTY_ARCHETYPES.map((arch) => {
          const isSelected = arch.id === selectedId;
          const count = applaudCounts[arch.id] || 0;

          return (
            <motion.div
              key={arch.id}
              onClick={() => {
                setSelectedId(arch.id);
                playTrophyChime();
              }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1c2236] to-[#121624] border-amber-400/80 shadow-xl shadow-amber-500/10'
                  : 'bg-[#121622] hover:bg-[#161c2c] border-neutral-800/80'
              }`}
            >
              {/* Top Accent Bar */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {getArchetypeIcon(arch.icon)}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  {arch.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display-royal text-lg font-bold text-neutral-100">
                  {arch.title}
                </h3>
                <div className="text-xs text-amber-400/90 font-medium mb-3">
                  {arch.subtitle}
                </div>

                <div className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {arch.description}
                </div>

                {/* Quote */}
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs italic font-serif-vintage text-amber-200/90 mb-4">
                  <Quote className="w-3 h-3 text-amber-400/60 inline mr-1" />
                  {arch.quote}
                </div>
              </div>

              {/* Bottom Gratitude & Applaud Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <div className="text-[11px] text-neutral-400 font-sans truncate">
                  {count} students applauded
                </div>
                <button
                  onClick={(e) => handleApplaud(arch.id, e)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                  title="Applaud this professor archetype"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Applaud 👏</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
