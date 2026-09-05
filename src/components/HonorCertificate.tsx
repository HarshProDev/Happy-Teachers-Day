import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Printer, Download, Sparkles, CheckCircle2, UserCheck, RotateCcw, Edit2 } from 'lucide-react';
import { ProfessorProfile } from '../types';
import { fireCelebrationConfetti, fireGoldenSparkles } from '../utils/confetti';
import { playTrophyChime } from '../utils/audio';

interface HonorCertificateProps {
  professor: ProfessorProfile;
}

export const HonorCertificate: React.FC<HonorCertificateProps> = ({ professor }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  // Allow live in-place personalization for any viewing professor
  const [recipientName, setRecipientName] = useState(
    professor.name === 'All Our Esteemed Professors & Mentors'
      ? 'All Our Esteemed Professors & Mentors'
      : `${professor.salutation} ${professor.name}`
  );
  const [recipientDept, setRecipientDept] = useState(
    professor.department || 'Across All Academic Departments & Faculties'
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRecipientName(
      professor.isUniversal || professor.name === 'All Our Esteemed Professors & Mentors'
        ? 'All Our Esteemed Professors & Mentors'
        : professor.name.startsWith(professor.salutation)
          ? professor.name
          : `${professor.salutation} ${professor.name}`
    );
    setRecipientDept(professor.department || 'Across All Academic Departments & Faculties');
    setIsEditing(false);
  }, [professor]);

  const handlePrint = () => {
    fireCelebrationConfetti();
    playTrophyChime();
    window.print();
  };

  const handleConfer = () => {
    fireGoldenSparkles();
    playTrophyChime();
  };

  const handleResetToAll = () => {
    setRecipientName('All Our Esteemed Professors & Mentors');
    setRecipientDept('Across All Academic Departments & Faculties');
    setIsEditing(false);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="relative w-full max-w-5xl mx-auto my-12 px-4">
      {/* Section Title */}
      <div className="text-center mb-6 no-print">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest font-semibold uppercase mb-2">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          Honoris Causa • Academic Citation
        </div>
        <h2 className="font-display-royal text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide">
          Certificate of Academic Distinction & Gratitude
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-1">
          An official tribute citation bestowed upon all professors, or personalized for individual faculty members to print or frame.
        </p>

        {/* Quick Personalization Bar for Viewing Professor */}
        <div className="max-w-xl mx-auto my-4 p-3 rounded-xl bg-[#141926] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Are you a professor viewing this?</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold transition-all flex items-center gap-1 w-full sm:w-auto justify-center"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Type Your Name on Certificate</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 w-full">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g., Prof. Dr. Rajesh Sharma"
                  className="px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/50 text-amber-100 focus:outline-none focus:border-amber-400 w-full"
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 shrink-0"
                >
                  Done
                </button>
                <button
                  onClick={handleResetToAll}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200"
                  title="Reset to All Professors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            id="print-certificate-btn"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs tracking-wide shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
            title="Print or Save Certificate as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            id="confer-certificate-btn"
            onClick={handleConfer}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171b26] hover:bg-[#202535] border border-amber-500/40 text-amber-300 font-semibold text-xs tracking-wide transition-all cursor-pointer"
            title="Bestow honors with golden fireworks"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Bestow Accolades</span>
          </button>
        </div>
      </div>

      {/* The Printable Ornate Certificate */}
      <div
        ref={certificateRef}
        className="certificate-page relative parchment-bg rounded-2xl border-8 border-double border-[#92400e]/50 p-6 sm:p-10 md:p-14 shadow-2xl text-neutral-900 overflow-hidden"
      >
        {/* Ornate Corner Accents */}
        <div className="absolute top-2 left-2 text-2xl text-amber-800/60 font-serif-vintage select-none">❖</div>
        <div className="absolute top-2 right-2 text-2xl text-amber-800/60 font-serif-vintage select-none">❖</div>
        <div className="absolute bottom-2 left-2 text-2xl text-amber-800/60 font-serif-vintage select-none">❖</div>
        <div className="absolute bottom-2 right-2 text-2xl text-amber-800/60 font-serif-vintage select-none">❖</div>

        {/* Certificate Inner Double Frame */}
        <div className="border-2 border-amber-900/30 p-4 sm:p-8 rounded-lg flex flex-col items-center text-center relative">
          {/* Official University Laurel Seal */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 border-2 border-amber-700 shadow-md flex items-center justify-center text-amber-900 mb-4">
            <Award className="w-10 h-10 text-amber-800" />
          </div>

          <div className="font-display-royal text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-900 font-bold mb-1">
            Faculty of Scholarly Excellence
          </div>
          <div className="font-serif-vintage italic text-base text-amber-800/90 mb-3">
            Teacher's Day Commemoration
          </div>

          <h3 className="font-display-royal text-2xl sm:text-3xl md:text-4xl text-amber-950 font-bold tracking-tight mb-4">
            TESTIMONIAL OF DISTINGUISHED MENTORSHIP
          </h3>

          <p className="font-serif-vintage italic text-base sm:text-lg text-neutral-700 max-w-xl mb-3">
            Be it known to all that this honorary citation of supreme gratitude and respect is hereby presented to:
          </p>

          {/* Professor Name Highlight */}
          <div className="my-3 py-2 px-6 border-b-2 border-amber-900/30">
            <div className="font-display-royal text-2xl sm:text-4xl font-extrabold text-amber-900 tracking-wide">
              {recipientName}
            </div>
            <div className="font-serif-vintage font-semibold text-amber-800 text-sm sm:text-base mt-1">
              {recipientDept}
            </div>
            <div className="text-xs text-neutral-600 font-sans tracking-wide">
              {professor.college || 'Our University & College'}
            </div>
          </div>

          {/* Citation Body */}
          <p className="font-serif-vintage text-base sm:text-lg text-neutral-800 leading-relaxed max-w-2xl my-4">
            For outstanding academic dedication, luminous pedagogy, relentless encouragement during trials of research and study, and the profound inspiration offered to every student who walked through your classroom doors.
          </p>

          {/* Quote Banner */}
          <div className="italic font-serif-vintage text-amber-950 bg-amber-100/60 border border-amber-300/60 rounded-xl py-2.5 px-6 my-4 max-w-lg text-sm sm:text-base shadow-inner">
            "{professor.quote || 'Teaching is the greatest act of optimism, shaping the minds of tomorrow.'}"
          </div>

          {/* Certificate Footer / Signatures & Seal */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 items-end mt-6 pt-6 border-t border-amber-900/20">
            {/* Left: Date */}
            <div className="text-left">
              <div className="text-xs uppercase font-bold tracking-widest text-amber-900 font-display-royal">
                Date Bestowed
              </div>
              <div className="font-serif-vintage text-base font-semibold text-neutral-800">
                {currentDate}
              </div>
              <div className="text-[11px] text-amber-800/80 italic font-serif-vintage">
                On the Occasion of Teacher's Day
              </div>
            </div>

            {/* Center: Gold Embossed Seal */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 border-2 border-amber-800 shadow-md flex items-center justify-center text-amber-950">
                <CheckCircle2 className="w-7 h-7 text-amber-950" />
              </div>
              <span className="text-[10px] font-display-royal uppercase tracking-widest text-amber-900 font-bold mt-1">
                Official Laurel Seal
              </span>
            </div>

            {/* Right: Students Signature */}
            <div className="text-right">
              <div className="text-xs uppercase font-bold tracking-widest text-amber-900 font-display-royal">
                Endorsed In Reverence
              </div>
              <div className="font-chalk text-2xl sm:text-3xl text-amber-950 font-bold">
                {professor.studentName || 'Harsh'}
              </div>
              <div className="text-[11px] text-amber-800/80 italic font-serif-vintage">
                {professor.batch || 'B.Sc. Final yr Physical Science'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
