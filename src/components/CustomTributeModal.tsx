import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserCheck, Sparkles, X, School, UserPlus, Check, BookOpen, Quote, Sparkle } from 'lucide-react';
import { ProfessorProfile } from '../types';
import { fireGoldenSparkles } from '../utils/confetti';
import { playTrophyChime } from '../utils/audio';

interface CustomTributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prof: ProfessorProfile, isNew: boolean) => void;
  initialData?: ProfessorProfile | null;
  isNew?: boolean;
  defaultCollegeName?: string;
}

const AVATAR_GRADIENTS = [
  { label: 'Amber Gold', value: 'from-amber-600 to-amber-900', color: '#d97706' },
  { label: 'Royal Indigo', value: 'from-indigo-600 to-blue-950', color: '#4f46e5' },
  { label: 'Emerald Sage', value: 'from-emerald-700 to-teal-950', color: '#059669' },
  { label: 'Ruby Crimson', value: 'from-rose-700 to-red-950', color: '#e11d48' },
  { label: 'Violet Royal', value: 'from-purple-700 to-slate-950', color: '#7c3aed' },
];

export const CustomTributeModal: React.FC<CustomTributeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isNew = false,
  defaultCollegeName = 'Our College of Engineering & University',
}) => {
  const isUniversalMode = Boolean(!isNew && (initialData?.id === 'prof-universal' || initialData?.isUniversal));

  const [salutation, setSalutation] = useState('Prof.');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [college, setCollege] = useState(defaultCollegeName);
  const [subject, setSubject] = useState('');
  const [quote, setQuote] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [specialMemory, setSpecialMemory] = useState('');
  const [studentName, setStudentName] = useState('Harsh & Your Grateful Students');
  const [batch, setBatch] = useState('Batch of 2025');
  const [avatarColor, setAvatarColor] = useState(AVATAR_GRADIENTS[0].value);

  // Sync state whenever modal opens or target changes
  useEffect(() => {
    if (!isOpen) return;

    if (isNew) {
      setSalutation('Prof.');
      setName('');
      setDepartment('Department of Computer Science & Engineering');
      setCollege(defaultCollegeName || 'Our College & University');
      setSubject('Algorithms, System Design & Mentorship');
      setQuote('Education is not the filling of a pail, but the lighting of a fire.');
      setCustomMessage(
        'Thank you for your tireless dedication, patience with our doubts, and for shaping our academic and personal growth.'
      );
      setSpecialMemory(
        'The inspiring lectures and the patience you showed whenever our team ran into roadblocks.'
      );
      setStudentName('Harsh & Your Grateful Students');
      setBatch('Batch of 2025');
      setAvatarColor(AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)].value);
    } else if (initialData) {
      setSalutation(initialData.salutation || (initialData.isUniversal ? 'To' : 'Prof.'));
      setName(initialData.name || '');
      setDepartment(initialData.department || '');
      setCollege(initialData.college || defaultCollegeName);
      setSubject(initialData.subject || '');
      setQuote(initialData.quote || '');
      setCustomMessage(initialData.customMessage || '');
      setSpecialMemory(initialData.specialMemory || '');
      setStudentName(initialData.studentName || 'Harsh & Your Grateful Students');
      setBatch(initialData.batch || 'Batch of 2025');
      setAvatarColor(initialData.avatarColor || AVATAR_GRADIENTS[0].value);
    }
  }, [isOpen, initialData, isNew, defaultCollegeName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const savedProfile: ProfessorProfile = {
      id: isNew
        ? `prof-custom-${Date.now()}`
        : initialData?.id || (isUniversalMode ? 'prof-universal' : `prof-${Date.now()}`),
      isUniversal: isUniversalMode,
      name: name.trim(),
      salutation: salutation.trim(),
      department: department.trim(),
      college: college.trim(),
      subject: subject.trim(),
      quote: quote.trim(),
      customMessage: customMessage.trim(),
      specialMemory: specialMemory.trim(),
      studentName: studentName.trim(),
      batch: batch.trim(),
      avatarColor,
    };

    onSave(savedProfile, isNew);
    fireGoldenSparkles();
    playTrophyChime();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl bg-[#141824] border border-amber-500/40 shadow-2xl p-6 sm:p-8 relative text-neutral-100 my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="close-custom-tribute-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner ${
              isUniversalMode 
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-300' 
                : isNew 
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                : 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300'
            }`}>
              {isUniversalMode ? (
                <School className="w-6 h-6" />
              ) : isNew ? (
                <UserPlus className="w-6 h-6" />
              ) : (
                <UserCheck className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                  isUniversalMode
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : isNew
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                }`}>
                  {isUniversalMode ? 'Universal Tribute Scope' : isNew ? 'Add New Professor' : 'Individual Professor'}
                </span>
              </div>
              <h3 className="font-display-royal text-xl sm:text-2xl font-bold text-amber-100 mt-1">
                {isUniversalMode
                  ? 'Edit Universal Tribute & College Details'
                  : isNew
                  ? 'Add New Professor / Mentor'
                  : `Edit Tribute: ${salutation} ${name || 'Professor'}`}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isUniversalMode
                  ? 'Update your college name, departments, and collective tribute for all faculty members.'
                  : isNew
                  ? 'Add another teacher to your tribute list (manage as many teachers as you want like a notes app).'
                  : 'Customize the personal letter, certificate title, quotes, and memories for this teacher.'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Universal Mode Headline */}
          {isUniversalMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                    College / Institute / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Delhi Technological University / Harvard College"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-amber-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-neutral-400 mt-0.5 block">
                    This college name will also be shared with all individual professors.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                    Department & Faculty Scope
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Across All Academic Departments & Faculties"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                  Recipient Title / Collective Salute
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., All Our Esteemed Professors & Mentors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                  Academic Disciplines & Scope Honored
                </label>
                <input
                  type="text"
                  placeholder="e.g., All Disciplines, Lectures, Labs & Seminars"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            /* Individual Teacher Fields */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                    Title / Salutation
                  </label>
                  <select
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Prof.">Prof.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Associate Prof.">Associate Prof.</option>
                    <option value="Assistant Prof.">Assistant Prof.</option>
                    <option value="Dean">Dean</option>
                    <option value="HOD">HOD</option>
                    <option value="Sir">Sir</option>
                    <option value="Ma'am">Ma'am</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                    Professor's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rajesh Sharma / Elena Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dept. of Computer Science & Engineering"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      College / University
                    </label>
                    {defaultCollegeName && college !== defaultCollegeName && (
                      <button
                        type="button"
                        onClick={() => setCollege(defaultCollegeName)}
                        className="text-[10px] text-amber-400 hover:text-amber-200 underline cursor-pointer"
                      >
                        Use Universal College
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., National Institute of Technology"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                  Subject / Specialization / Courses Taught
                </label>
                <input
                  type="text"
                  placeholder="e.g., Data Structures, Operating Systems, Machine Learning"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Color badge picker */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1.5">
                  Theme Accent Color
                </label>
                <div className="flex items-center gap-2">
                  {AVATAR_GRADIENTS.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setAvatarColor(g.value)}
                      className={`h-7 px-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        avatarColor === g.value
                          ? 'border-white ring-2 ring-amber-400 text-white'
                          : 'border-white/20 text-neutral-400 hover:text-neutral-200'
                      }`}
                      style={{ backgroundColor: `${g.color}30` }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                      <span className="hidden sm:inline text-[11px]">{g.label}</span>
                      {avatarColor === g.value && <Check className="w-3 h-3 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Guiding Quote */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Quote className="w-3.5 h-3.5" />
              <span>{isUniversalMode ? 'Guiding Teaching Quote / Motto' : "Professor's Catchphrase or Favorite Quote"}</span>
            </label>
            <input
              type="text"
              placeholder={
                isUniversalMode
                  ? 'e.g., "Teaching is the greatest act of optimism, illuminating minds for tomorrow."'
                  : 'e.g., "Think from first principles before writing a single line of code."'
              }
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none italic"
            />
          </div>

          {/* Letter Message */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isUniversalMode ? 'Collective Tribute Letter Message' : 'Personal Letter of Gratitude (Note to Professor)'}</span>
            </label>
            <textarea
              rows={3}
              placeholder={
                isUniversalMode
                  ? 'Express gratitude to all faculty for their guidance, classroom rigor, and patience...'
                  : 'Thank this professor for their specific mentorship, challenging questions, and encouragement...'
              }
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Special Memory */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Sparkle className="w-3.5 h-3.5" />
              <span>{isUniversalMode ? 'Collective College Memories' : 'Special Classroom / Lab Memory With This Professor'}</span>
            </label>
            <input
              type="text"
              placeholder={
                isUniversalMode
                  ? 'e.g., Morning 8 AM lectures, office hours problem solving, and semester lab sessions.'
                  : 'e.g., When you helped our capstone team debug distributed systems late before the expo.'
              }
              value={specialMemory}
              onChange={(e) => setSpecialMemory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Student Body & Batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                Presented By (Student / Team / Class)
              </label>
              <input
                type="text"
                placeholder="e.g., Harsh & Your Grateful Students"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                Batch / Academic Year
              </label>
              <input
                type="text"
                placeholder="e.g., Class of 2025 & All Scholars"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e131d] border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold shadow-lg hover:shadow-amber-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {isUniversalMode
                  ? 'Save Universal College Tribute'
                  : isNew
                  ? 'Add Professor to Tributes'
                  : 'Save Professor Profile'}
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
