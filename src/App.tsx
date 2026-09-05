import React, { useState, useEffect } from 'react';
import { 
  INITIAL_PROFESSORS, 
  INITIAL_CHALK_MEMORIES, 
  VIRTUAL_TRIBUTE_GIFTS 
} from './data/tributes';
import { ProfessorProfile, ChalkMemory } from './types';
import { HeaderNav } from './components/HeaderNav';
import { GiftEnvelopeModal } from './components/GiftEnvelopeModal';
import { LetterOfGratitude } from './components/LetterOfGratitude';
import { HonorCertificate } from './components/HonorCertificate';
import { ClassroomBlackboard } from './components/ClassroomBlackboard';
import { TrophyCabinet } from './components/TrophyCabinet';
import { CustomTributeModal } from './components/CustomTributeModal';
import { ShareGiftModal } from './components/ShareGiftModal';
import { WisdomQuotes } from './components/WisdomQuotes';
import { FacultyArchetypesSection } from './components/FacultyArchetypesSection';
import { toggleAmbientPiano } from './utils/audio';
import { fireCelebrationConfetti, fireGoldenSparkles } from './utils/confetti';
import { 
  GraduationCap, 
  Heart, 
  Award, 
  BookOpen, 
  Sparkles,
  Users,
  School,
  UserPlus,
  Edit3,
  Check
} from 'lucide-react';

export default function App() {
  const [professors, setProfessors] = useState<ProfessorProfile[]>(() => {
    const saved = localStorage.getItem('prof_tributes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if newly seeded faculty profiles exist in storage; if not, re-seed with INITIAL_PROFESSORS
          const hasPhysicalScienceFaculty = parsed.some((p) => p.id === 'prof-phys-rajesh');
          if (!hasPhysicalScienceFaculty) {
            localStorage.setItem('prof_tributes', JSON.stringify(INITIAL_PROFESSORS));
            return INITIAL_PROFESSORS;
          }
          return parsed;
        }
      } catch {
        // Fallback to initial
      }
    }
    return INITIAL_PROFESSORS;
  });

  const [currentProfessor, setCurrentProfessor] = useState<ProfessorProfile>(() => {
    // Check URL parameters first
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get('name');
      if (urlName) {
        return {
          id: 'url-prof',
          name: urlName,
          salutation: params.get('sal') || 'Prof.',
          department: params.get('dept') || 'Academic Faculty & Research',
          college: params.get('col') || 'University School of Higher Studies',
          subject: params.get('subj') || 'Higher Academics & Mentorship',
          quote: 'Teaching is the greatest act of optimism.',
          customMessage: 'We are endlessly grateful for your invaluable guidance, scholarship, and kindness.',
          studentName: params.get('from') || 'Your Grateful Students',
          batch: params.get('batch') || 'Class of 2025',
          avatarColor: 'from-amber-600 to-amber-900',
        };
      }

      // Check saved current professor ID
      const savedCurrentId = localStorage.getItem('current_prof_id');
      if (savedCurrentId) {
        const found = INITIAL_PROFESSORS.find((p) => p.id === savedCurrentId);
        if (found) return found;
      }
    }
    return INITIAL_PROFESSORS[0];
  });

  const [memories, setMemories] = useState<ChalkMemory[]>(() => {
    const saved = localStorage.getItem('chalk_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // Fallback
      }
    }
    return INITIAL_CHALK_MEMORIES;
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<ProfessorProfile | null>(null);
  const [isNewProfessorModal, setIsNewProfessorModal] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'letter' | 'certificate' | 'archetypes' | 'blackboard' | 'gifts'>('letter');

  // Sync professors and current selection to localStorage
  useEffect(() => {
    localStorage.setItem('prof_tributes', JSON.stringify(professors));
  }, [professors]);

  useEffect(() => {
    if (currentProfessor) {
      localStorage.setItem('current_prof_id', currentProfessor.id);
    }
  }, [currentProfessor]);

  useEffect(() => {
    localStorage.setItem('chalk_memories', JSON.stringify(memories));
  }, [memories]);

  // Clean up ambient audio on unmount
  useEffect(() => {
    return () => {
      toggleAmbientPiano(false);
    };
  }, []);

  const handleToggleAmbient = () => {
    const nextState = !isAmbientPlaying;
    const success = toggleAmbientPiano(nextState);
    setIsAmbientPlaying(success ? nextState : false);
  };

  const handleSelectProfessor = (prof: ProfessorProfile) => {
    setCurrentProfessor(prof);
    fireGoldenSparkles();
  };

  const handleOpenEditModal = (prof: ProfessorProfile) => {
    setEditingProfessor(prof);
    setIsNewProfessorModal(false);
    setIsCustomModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingProfessor(null);
    setIsNewProfessorModal(true);
    setIsCustomModalOpen(true);
  };

  const handleDeleteProfessor = (id: string) => {
    if (id === 'prof-universal') return; // Cannot delete universal tribute

    setProfessors((prev) => prev.filter((p) => p.id !== id));
    if (currentProfessor.id === id) {
      const universal = professors.find((p) => p.isUniversal || p.id === 'prof-universal') || professors[0];
      setCurrentProfessor(universal);
    }
  };

  const handleSaveCustomProfessor = (savedProf: ProfessorProfile, isNew: boolean) => {
    setProfessors((prev) => {
      if (isNew) {
        // Add new teacher right after universal
        const universal = prev.find((p) => p.isUniversal || p.id === 'prof-universal') || prev[0];
        const rest = prev.filter((p) => p.id !== universal.id && p.id !== savedProf.id);
        return [universal, savedProf, ...rest];
      }
      return prev.map((p) => (p.id === savedProf.id ? savedProf : p));
    });

    setCurrentProfessor(savedProf);
  };

  const handleAddMemory = (memoryData: Omit<ChalkMemory, 'id' | 'timestamp'>) => {
    const newMemo: ChalkMemory = {
      ...memoryData,
      id: `memo-${Date.now()}`,
      timestamp: 'Just now',
    };
    setMemories((prev) => [newMemo, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const universalProf = professors.find((p) => p.isUniversal || p.id === 'prof-universal') || professors[0];
  const isCurrentUniversal = currentProfessor.isUniversal || currentProfessor.id === 'prof-universal';

  return (
    <div className="min-h-screen bg-[#0a0d14] text-neutral-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Academic Navigation Bar */}
      <HeaderNav
        professors={professors}
        currentProfessor={currentProfessor}
        onSelectProfessor={handleSelectProfessor}
        onOpenEditModal={handleOpenEditModal}
        onOpenAddModal={handleOpenAddModal}
        onDeleteProfessor={handleDeleteProfessor}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenEnvelope={() => setIsEnvelopeOpen(true)}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
      />

      {/* Royal Opening Wax Seal Envelope Modal */}
      <GiftEnvelopeModal
        professor={currentProfessor}
        isOpen={isEnvelopeOpen}
        onClose={() => setIsEnvelopeOpen(false)}
        onOpenedGift={() => {
          fireCelebrationConfetti();
        }}
      />

      {/* Hero Welcome Banner */}
      <section className="relative pt-8 pb-4 text-center px-4 overflow-hidden">
        {/* Academic Laurel Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest font-semibold uppercase mb-4 animate-fade-in">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          Happy Teacher's Day • Academic Tribute
        </div>

        <h1 className="font-display-royal text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-100 tracking-wide max-w-3xl mx-auto leading-tight">
          To the Professors Who Shaped Our Future
        </h1>

        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-serif-vintage italic">
          "A great teacher inspires hope, ignites the imagination, and instills a love of lifelong learning."
        </p>

        {/* Current Tribute Focus & Notes-Style Quick Switcher */}
        <div className="max-w-3xl mx-auto mt-6 bg-[#141926]/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner shrink-0 ${
                isCurrentUniversal
                  ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                  : 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300'
              }`}>
                {isCurrentUniversal ? (
                  <School className="w-5 h-5" />
                ) : (
                  <Award className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                    isCurrentUniversal
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                  }`}>
                    {isCurrentUniversal ? 'Universal Tribute • All Faculty' : 'Dedicated Teacher Tribute'}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-amber-100 mt-0.5">
                  {isCurrentUniversal
                    ? 'All Our Esteemed Professors & Mentors'
                    : `${currentProfessor.salutation} ${currentProfessor.name}`}
                </div>
                <div className="text-xs text-neutral-400">
                  {currentProfessor.department} • <span className="text-amber-300/90 font-medium">{currentProfessor.college}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => handleOpenEditModal(currentProfessor)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
                title={isCurrentUniversal ? 'Edit College & Universal Tribute' : 'Edit this teacher tribute'}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isCurrentUniversal ? 'Edit College Details' : 'Edit This Tribute'}</span>
              </button>

              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-semibold transition-all cursor-pointer"
                title="Add another professor profile"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xs:inline">+ Add Professor</span>
              </button>
            </div>
          </div>

          {/* Quick-Switch Pills (Notes App Style) */}
          <div className="pt-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
              <span>Quick-Switch Professor Profiles (Notes Mode):</span>
              <span className="text-neutral-500 text-[10px]">Data updates live across all tabs</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {professors.map((p) => {
                const isSelected = p.id === currentProfessor.id;
                const isUni = p.isUniversal || p.id === 'prof-universal';

                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProfessor(p)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? isUni
                          ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-md'
                          : 'bg-indigo-600 text-white font-bold border-indigo-400 shadow-md'
                        : 'bg-[#0f131d] text-neutral-300 hover:bg-[#1a2030] border-neutral-800'
                    }`}
                  >
                    {isUni ? (
                      <GraduationCap className={`w-3.5 h-3.5 ${isSelected ? 'text-neutral-950' : 'text-amber-400'}`} />
                    ) : (
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-indigo-400'}`} />
                    )}
                    <span>
                      {isUni
                        ? 'All Faculty'
                        : p.name.includes('Pooja')
                          ? p.department.toLowerCase().includes('math')
                            ? 'Dr. Pooja (Math)'
                            : 'Dr. Pooja (Physics)'
                          : `${p.salutation} ${p.name}`}
                    </span>
                    {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                );
              })}

              <button
                onClick={handleOpenAddModal}
                className="shrink-0 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-dashed border-amber-500/40 transition-all flex items-center gap-1 cursor-pointer"
                title="Add as many professors as you want"
              >
                <UserPlus className="w-3 h-3" />
                <span>+ Add Teacher</span>
              </button>
            </div>
          </div>
        </div>

        {/* Experience Section Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap no-print">
          <button
            onClick={() => setActiveTab('letter')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'letter'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-[#141824] text-neutral-300 hover:bg-[#1a2030] border border-neutral-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>The Tribute Letter</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-[#141824] text-neutral-300 hover:bg-[#1a2030] border border-neutral-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Honorary Citation</span>
          </button>

          <button
            onClick={() => setActiveTab('archetypes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'archetypes'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-[#141824] text-neutral-300 hover:bg-[#1a2030] border border-neutral-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty Archetypes</span>
          </button>

          <button
            onClick={() => setActiveTab('blackboard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'blackboard'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-[#141824] text-neutral-300 hover:bg-[#1a2030] border border-neutral-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Chalkboard Memories</span>
          </button>

          <button
            onClick={() => setActiveTab('gifts')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'gifts'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-[#141824] text-neutral-300 hover:bg-[#1a2030] border border-neutral-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Tokens of Honor</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* Render Tab 1: The Illuminated Letter */}
        {activeTab === 'letter' && (
          <div className="animate-fadeIn">
            <LetterOfGratitude
              professor={currentProfessor}
              onOpenCustomModal={() => handleOpenEditModal(currentProfessor)}
              isAmbientPlaying={isAmbientPlaying}
              onToggleAmbient={handleToggleAmbient}
            />
          </div>
        )}

        {/* Render Tab 2: Honorary Certificate */}
        {activeTab === 'certificate' && (
          <div className="animate-fadeIn">
            <HonorCertificate
              professor={currentProfessor}
            />
          </div>
        )}

        {/* Render Tab 3: Faculty Archetypes Gallery (All-Rounder) */}
        {activeTab === 'archetypes' && (
          <div className="animate-fadeIn">
            <FacultyArchetypesSection />
          </div>
        )}

        {/* Render Tab 4: Blackboard */}
        {activeTab === 'blackboard' && (
          <div className="animate-fadeIn">
            <ClassroomBlackboard
              memories={memories}
              onAddMemory={handleAddMemory}
              onDeleteMemory={handleDeleteMemory}
            />
          </div>
        )}

        {/* Render Tab 5: Tokens of Honor */}
        {activeTab === 'gifts' && (
          <div className="animate-fadeIn">
            <TrophyCabinet
              gifts={VIRTUAL_TRIBUTE_GIFTS}
              professor={currentProfessor}
            />
          </div>
        )}

        {/* Wisdom of Great Teachers Banner */}
        <WisdomQuotes />
      </main>

      {/* Modals */}
      <CustomTributeModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={handleSaveCustomProfessor}
        initialData={isNewProfessorModal ? null : editingProfessor || currentProfessor}
        isNew={isNewProfessorModal}
        defaultCollegeName={universalProf?.college || 'Our College & University'}
      />

      <ShareGiftModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        professor={currentProfessor}
      />

      {/* Academic Footer */}
      <footer className="w-full border-t border-neutral-800/80 bg-[#07090f] py-8 px-4 text-center text-xs text-neutral-400 no-print">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-300 font-display-royal text-sm font-semibold">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Teacher's Day Digital Gift & Tribute</span>
          </div>

          <div className="flex items-center gap-1 text-neutral-400">
            <span>Crafted with infinite reverence & gratitude for our professors</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fireCelebrationConfetti();
                fireGoldenSparkles();
              }}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              Shower Confetti ✦
            </button>
            <span>•</span>
            <button
              onClick={() => setIsEnvelopeOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              Open Wax Seal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
