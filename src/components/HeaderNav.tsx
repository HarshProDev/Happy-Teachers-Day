import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Music, 
  Music2, 
  Share2, 
  UserPlus, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  Check, 
  Users, 
  UserCheck,
  School
} from 'lucide-react';
import { ProfessorProfile } from '../types';
import { fireCelebrationConfetti, fireGoldenSparkles } from '../utils/confetti';
import { playTrophyChime } from '../utils/audio';

interface HeaderNavProps {
  professors: ProfessorProfile[];
  currentProfessor: ProfessorProfile;
  onSelectProfessor: (prof: ProfessorProfile) => void;
  onOpenEditModal: (prof: ProfessorProfile) => void;
  onOpenAddModal: () => void;
  onDeleteProfessor: (id: string) => void;
  onOpenShareModal: () => void;
  onOpenEnvelope: () => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  professors,
  currentProfessor,
  onSelectProfessor,
  onOpenEditModal,
  onOpenAddModal,
  onDeleteProfessor,
  onOpenShareModal,
  onOpenEnvelope,
  isAmbientPlaying,
  onToggleAmbient,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const universalProf = professors.find((p) => p.isUniversal || p.id === 'prof-universal') || professors[0];
  const individualProfessors = professors.filter((p) => !p.isUniversal && p.id !== 'prof-universal');
  const physicsProfessors = individualProfessors.filter((p) => p.department.toLowerCase().includes('physics'));
  const chemistryProfessors = individualProfessors.filter((p) => p.department.toLowerCase().includes('chemistry'));
  const mathProfessors = individualProfessors.filter((p) => p.department.toLowerCase().includes('math'));
  const otherProfessors = individualProfessors.filter(
    (p) =>
      !p.department.toLowerCase().includes('physics') &&
      !p.department.toLowerCase().includes('chemistry') &&
      !p.department.toLowerCase().includes('math')
  );

  const formatProfName = (p: ProfessorProfile) => {
    if (p.isUniversal) return 'All Teachers (Universal)';
    const prefix = p.name.startsWith(p.salutation) ? p.name : `${p.salutation} ${p.name}`;
    if (p.name.includes('Pooja')) {
      return `${prefix} (${p.department.toLowerCase().includes('math') ? 'Math' : 'Physics'})`;
    }
    return prefix;
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSparkleClick = () => {
    fireCelebrationConfetti();
    fireGoldenSparkles();
    playTrophyChime();
  };

  const isCurrentUniversal = currentProfessor.isUniversal || currentProfessor.id === 'prof-universal';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c0f17]/90 border-b border-amber-500/20 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Academic Brand Seal */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={onOpenEnvelope}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            title="Click to view the Gift Envelope again"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/30 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display-royal text-base md:text-lg font-bold text-amber-200 tracking-wide">
                  Teacher's Day
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Digital Gift
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                Honoring University Professors & Mentors
              </p>
            </div>
          </button>
        </div>

        {/* Center: Tribute Scope Manager */}
        <div className="flex items-center gap-2" ref={dropdownRef}>
          {/* Tribute Scope Dropdown Trigger */}
          <div className="relative">
            <button
              id="tribute-scope-btn"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-[#171b26] border border-amber-500/30 hover:border-amber-400/60 rounded-xl px-3 py-1.5 text-xs text-neutral-200 transition-all cursor-pointer shadow-sm"
              title="Click to switch or manage tribute scopes"
            >
              <div className="flex items-center gap-1.5">
                {isCurrentUniversal ? (
                  <School className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                )}
                <span className="text-amber-400 font-semibold hidden md:inline">Scope:</span>
              </div>
              <span className="font-semibold text-amber-100 truncate max-w-[130px] sm:max-w-[190px]">
                {formatProfName(currentProfessor)}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#141824] border border-amber-500/40 shadow-2xl p-3 z-50 animate-fadeIn text-neutral-100">
                {/* Header info */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800 px-1">
                  <div>
                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Tribute Scope Manager
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Switch or edit tribute data like a notes app
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    1 Universal • {individualProfessors.length} Custom
                  </span>
                </div>

                <div className="my-2 max-h-72 overflow-y-auto space-y-2 pr-1">
                  {/* 1. Universal Option (Permanent & Editable) */}
                  <div className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider px-1 pt-1 flex items-center justify-between">
                    <span>Universal Tribute (All Faculty)</span>
                    <span className="text-neutral-500 text-[9px] font-normal">Shared for all teachers</span>
                  </div>

                  <div
                    onClick={() => {
                      onSelectProfessor(universalProf);
                      setIsDropdownOpen(false);
                    }}
                    className={`group w-full p-2.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                      isCurrentUniversal
                        ? 'bg-amber-500/15 border-amber-400/60 shadow-md'
                        : 'bg-black/30 border-neutral-800 hover:border-amber-500/40 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-amber-100 flex items-center gap-1.5">
                          <span>🎓 All Teachers & Entire Faculty</span>
                          {isCurrentUniversal && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500 text-neutral-950 font-extrabold">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400 truncate">
                          {universalProf.college || 'Our College & University'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        id="edit-universal-tribute-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEditModal(universalProf);
                          setIsDropdownOpen(false);
                        }}
                        className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
                        title="Edit College Details & Universal Tribute"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 2. Department Sections */}
                  {[
                    { label: 'Physics Department (6 Professors)', list: physicsProfessors, icon: '⚛️' },
                    { label: 'Chemistry Department (3 Professors)', list: chemistryProfessors, icon: '🧪' },
                    { label: 'Mathematics Department (1 Professor)', list: mathProfessors, icon: '📐' },
                    ...(otherProfessors.length > 0
                      ? [{ label: `Other Faculty (${otherProfessors.length})`, list: otherProfessors, icon: '🎓' }]
                      : []),
                  ].map((group) => {
                    if (group.list.length === 0) return null;
                    return (
                      <div key={group.label} className="space-y-1 pt-1">
                        <div className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider px-1 flex items-center justify-between">
                          <span>{group.icon} {group.label}</span>
                        </div>
                        {group.list.map((p) => {
                          const isSelected = currentProfessor.id === p.id;
                          return (
                            <div
                              key={p.id}
                              onClick={() => {
                                onSelectProfessor(p);
                                setIsDropdownOpen(false);
                              }}
                              className={`group w-full p-2 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-500/15 border-indigo-400/60 shadow-md'
                                  : 'bg-black/30 border-neutral-800 hover:border-indigo-500/40 hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.avatarColor || 'from-indigo-600 to-blue-950'} border border-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                  {p.name.charAt(0)}
                                </div>
                                <div className="truncate">
                                  <div className="text-xs font-bold text-neutral-100 flex items-center gap-1.5">
                                    <span className="truncate">{formatProfName(p)}</span>
                                    {isSelected && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-500 text-white font-extrabold">
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-neutral-400 truncate">
                                    {p.subject || p.department}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0 ml-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenEditModal(p);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer"
                                  title={`Edit ${p.name}`}
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteProfessor(p.id);
                                  }}
                                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-all cursor-pointer"
                                  title={`Delete ${p.name}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Dropdown Footer: Add New Teacher Button */}
                <div className="pt-2 border-t border-neutral-800 flex gap-2">
                  <button
                    id="dropdown-add-teacher-btn"
                    onClick={() => {
                      onOpenAddModal();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Add New Professor / Teacher</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Edit Current Profile Button */}
          <button
            id="customize-current-btn"
            onClick={() => onOpenEditModal(currentProfessor)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all cursor-pointer"
            title={isCurrentUniversal ? 'Edit College Details & Universal Tribute' : 'Edit This Professor Details'}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isCurrentUniversal ? 'Edit College Details' : 'Edit Profile'}
            </span>
          </button>

          {/* Quick Add More Teacher Button */}
          <button
            id="quick-add-teacher-btn"
            onClick={onOpenAddModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171b26] hover:bg-[#202534] border border-neutral-700 text-neutral-200 text-xs font-medium transition-all cursor-pointer"
            title="Add another professor profile"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Add Teacher</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Ambient Music Toggle */}
          <button
            id="toggle-ambient-music-btn"
            onClick={onToggleAmbient}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              isAmbientPlaying
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-500/20'
                : 'bg-[#171b26] border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
            title={isAmbientPlaying ? 'Pause Ambient Melody' : 'Play Gentle Ambient Melody'}
          >
            {isAmbientPlaying ? (
              <>
                <Music2 className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span className="hidden sm:inline">Melody On</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            id="share-gift-btn"
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171b26] hover:bg-[#202534] border border-amber-500/30 text-amber-200 text-xs font-medium transition-all cursor-pointer"
            title="Share this gift link with your professor"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Confetti Celebration Trigger */}
          <button
            id="celebrate-fireworks-btn"
            onClick={handleSparkleClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold shadow-md hover:shadow-amber-500/30 transition-all active:scale-95 cursor-pointer"
            title="Shower celebratory confetti & applause!"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wish Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
