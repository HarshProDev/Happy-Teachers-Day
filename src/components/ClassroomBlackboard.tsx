import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquarePlus,
  Sparkles,
  Trash2,
  Heart,
  Quote,
  FlaskConical,
  GraduationCap,
  X
} from 'lucide-react';
import { ChalkMemory } from '../types';
import { fireGoldenSparkles } from '../utils/confetti';
import { playSoftClick } from '../utils/audio';

interface ClassroomBlackboardProps {
  memories: ChalkMemory[];
  onAddMemory: (memory: Omit<ChalkMemory, 'id' | 'timestamp'>) => void;
  onDeleteMemory: (id: string) => void;
}

const CHALK_COLORS = [
  { label: 'Chalk Yellow', value: '#fef08a' },
  { label: 'Sky Blue', value: '#bae6fd' },
  { label: 'Chalk White', value: '#ffffff' },
  { label: 'Mint Green', value: '#bbf7d0' },
  { label: 'Rose Pink', value: '#fbcfe8' },
];

export const ClassroomBlackboard: React.FC<ClassroomBlackboardProps> = ({
  memories,
  onAddMemory,
  onDeleteMemory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Student');
  const [text, setText] = useState('');
  const [tag, setTag] = useState<ChalkMemory['tag']>('Gratitude');
  const [selectedColor, setSelectedColor] = useState('#fef08a');
  const [filterTag, setFilterTag] = useState<string>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;

    // random slight tilt for realistic blackboard note
    const randomRotation = (Math.random() * 4 - 2);

    onAddMemory({
      author: author.trim(),
      role: role.trim() || 'Student',
      text: text.trim(),
      tag,
      color: selectedColor,
      rotation: Number(randomRotation.toFixed(1)),
    });

    playSoftClick();
    fireGoldenSparkles();
    setText('');
    setAuthor('');
    setIsModalOpen(false);
  };

  const filteredMemories = filterTag === 'All'
    ? memories
    : memories.filter(m => m.tag === filterTag);

  const getTagIcon = (t: ChalkMemory['tag']) => {
    switch (t) {
      case 'Lecture Quote': return <Quote className="w-3 h-3 inline mr-1" />;
      case 'Lab Memory': return <FlaskConical className="w-3 h-3 inline mr-1" />;
      case 'Life Lesson': return <GraduationCap className="w-3 h-3 inline mr-1" />;
      default: return <Heart className="w-3 h-3 inline mr-1" />;
    }
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto my-14 px-4">
      {/* Blackboard Title & Description */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs tracking-widest font-semibold uppercase mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          The Lecture Hall Board
        </div>
        <h2 className="font-display-royal text-2xl sm:text-3xl text-neutral-100 font-bold tracking-wide">
          Chalkboard of Memories & Lecture Quotes
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-1">
          Handwritten sticky tributes, memorable classroom moments, and words of gratitude from students across batches.
        </p>

        {/* Filter Tags & Add Note Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {['All', 'Gratitude', 'Lecture Quote', 'Lab Memory', 'Life Lesson'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterTag(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filterTag === t
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'bg-[#181d2a] text-neutral-300 hover:bg-[#22293b] border border-neutral-700'
                }`}
            >
              {t}
            </button>
          ))}

          <button
            id="write-blackboard-note-btn"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md hover:shadow-emerald-500/20 transition-all ml-2"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>+ Write on Board</span>
          </button>
        </div>
      </div>

      {/* The Blackboard Frame */}
      <div className="relative rounded-2xl border-12 border-[#452817] shadow-2xl overflow-hidden">
        {/* Wooden Frame Sheen */}
        <div className="absolute inset-0 border-2 border-[#693d22] pointer-events-none rounded-xl" />

        {/* Chalk Slate Area */}
        <div className="blackboard-bg p-6 sm:p-10 min-h-[440px] flex flex-col justify-between">
          {/* Top Chalk Header */}
          <div className="border-b border-white/10 pb-3 mb-6 flex items-center justify-between">
            <div className="font-chalk text-2xl text-white/80 tracking-widest">
              ROOM 66 • TEACHER’S DAY BOARD
            </div>
            <div className="text-xs text-white/40 italic font-serif-vintage hidden sm:block">
              "To teach is to touch a life forever."
            </div>
          </div>

          {/* Grid of Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredMemories.map((memo) => (
                <motion.div
                  key={memo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, rotate: memo.rotation }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.03, zIndex: 10, rotate: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group relative p-5 rounded-xl border border-white/15 backdrop-blur-sm shadow-lg flex flex-col justify-between transition-all"
                  style={{
                    backgroundColor: 'rgba(20, 32, 25, 0.85)',
                    borderTop: `4px solid ${memo.color}`,
                  }}
                >
                  {/* Pin / Tape graphic on top */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-white/20 backdrop-blur-md rounded border border-white/30 rotate-1 shadow-sm" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{
                          backgroundColor: `${memo.color}25`,
                          color: memo.color,
                        }}
                      >
                        {getTagIcon(memo.tag)}
                        {memo.tag}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {memo.timestamp}
                      </span>
                    </div>

                    <p
                      className="font-chalk text-xl sm:text-2xl leading-relaxed my-2"
                      style={{ color: memo.color }}
                    >
                      {memo.text}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                    <div>
                      <span className="font-semibold text-white/90">{memo.author}</span>
                      <span className="text-white/40 block text-[10px]">{memo.role}</span>
                    </div>

                    <button
                      onClick={() => onDeleteMemory(memo.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-white/30 hover:text-rose-400 transition-opacity"
                      title="Remove note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Chalk Tray with Chalk Sticks & Duster */}
          <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40 uppercase tracking-widest font-sans">
                Chalk Tray:
              </span>
              <div className="w-8 h-2 bg-yellow-100 rounded-sm shadow-sm" title="Yellow Chalk" />
              <div className="w-7 h-2 bg-sky-200 rounded-sm shadow-sm" title="Blue Chalk" />
              <div className="w-9 h-2 bg-emerald-200 rounded-sm shadow-sm" title="Green Chalk" />
              <div className="w-6 h-2 bg-rose-200 rounded-sm shadow-sm" title="Pink Chalk" />
              <div className="w-10 h-2 bg-white rounded-sm shadow-sm" title="White Chalk" />
              <div className="w-12 h-3.5 bg-amber-900/90 rounded border border-amber-800 shadow-inner ml-2 flex items-center justify-center text-[8px] text-white/50" title="Chalk Duster">
                DUSTER
              </div>
            </div>

            <div className="text-xs text-white/50 font-chalk text-lg">
              {memories.length} heartfelt notes left by students
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Write on Blackboard */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-2xl bg-[#141b24] border border-emerald-500/30 shadow-2xl p-6 relative text-white"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display-royal text-lg font-bold text-emerald-200">
                  Write on the Classroom Blackboard
                </h3>
                <p className="text-xs text-neutral-400">
                  Leave a nostalgic quote, thanks, or lab memory for your professor.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Harshit, Class of 2025, or Lab 4 Cohort"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e141c] border border-neutral-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Your Role / Batch
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Student, CR, Alumnus"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e141c] border border-neutral-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value as ChalkMemory['tag'])}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e141c] border border-neutral-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Gratitude">Gratitude</option>
                    <option value="Lecture Quote">Lecture Quote</option>
                    <option value="Lab Memory">Lab Memory</option>
                    <option value="Life Lesson">Life Lesson</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Chalk Color
                </label>
                <div className="flex items-center gap-2">
                  {CHALK_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setSelectedColor(c.value)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform flex items-center justify-center ${selectedColor === c.value ? 'scale-110 border-white shadow-md' : 'border-transparent opacity-70'
                        }`}
                      style={{ backgroundColor: c.value }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Chalk Message / Memory
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g., 'Thank you for explaining Fourier transforms with real audio signals!' or a funny, heartwarming quote..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e141c] border border-neutral-700 text-white text-sm focus:border-emerald-500 focus:outline-none font-chalk text-xl"
                  style={{ color: selectedColor }}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-neutral-950 font-bold text-xs shadow-md transition-all"
                >
                  Pin to Board ✦
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};
