import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Share2, 
  Copy, 
  Check, 
  Send, 
  Mail, 
  ExternalLink, 
  X, 
  Sparkles,
  Users,
  UserCheck
} from 'lucide-react';
import { ProfessorProfile } from '../types';

interface ShareGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  professor: ProfessorProfile;
}

export const ShareGiftModal: React.FC<ShareGiftModalProps> = ({
  isOpen,
  onClose,
  professor,
}) => {
  const [shareMode, setShareMode] = useState<'universal' | 'individual'>('universal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const [customProfName, setCustomProfName] = useState('Dr. Sharma');
  const [customDept, setCustomDept] = useState('Department of Computer Science & Engineering');

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';

  // 1. Universal link - works for all teachers!
  const universalUrl = baseUrl;
  const universalMessage = `🎓 Warmest Teacher's Day Wishes to All Our Respected Professors & Mentors!

Dear Professors,
On this special Teacher's Day, we students have created an exclusive digital tribute & honorary citation to honor your dedication, guidance, and tireless efforts in shaping our lives:

✨ Open your digital gift experience here:
${universalUrl}

Dedicated with heartfelt respect and gratitude,
${professor.studentName || 'Harsh & The Entire Student Body'} (${professor.batch || 'Batch of 2025'})`;

  // 2. Individual link
  const shareParams = new URLSearchParams({
    name: customProfName,
    sal: 'Prof.',
    dept: customDept,
    col: professor.college || 'Our College & University',
    from: professor.studentName || 'Your Grateful Students',
    batch: professor.batch || 'Batch of 2025',
  });
  const individualUrl = `${baseUrl}?${shareParams.toString()}`;
  const individualMessage = `🎓 Happy Teacher's Day, Prof. ${customProfName}!

On this special occasion, we have created an exclusive digital tribute & honorary citation to express our gratitude for your dedication, mentorship, and wisdom:

✨ Open your personalized digital gift here:
${individualUrl}

With utmost respect and gratitude,
${professor.studentName || 'Harsh & Your Grateful Students'} (${professor.batch || 'Class of 2025'})`;

  const activeUrl = shareMode === 'universal' ? universalUrl : individualUrl;
  const activeMessage = shareMode === 'universal' ? universalMessage : individualMessage;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(activeMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(activeMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(
      shareMode === 'universal'
        ? "Happy Teacher's Day to All Our Respected Professors - A Special Digital Tribute"
        : `Happy Teacher's Day, Prof. ${customProfName} - A Special Tribute From Your Students`
    );
    const body = encodeURIComponent(activeMessage);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl rounded-2xl bg-[#141824] border border-amber-500/40 shadow-2xl p-6 sm:p-8 relative text-neutral-100 max-h-[90vh] overflow-y-auto"
      >
        <button
          id="close-share-gift-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display-royal text-xl font-bold text-amber-100">
              Share Teacher's Day Gift Link
            </h3>
            <p className="text-xs text-neutral-400">
              Send this digital tribute to WhatsApp groups, college faculty lists, or individual mentors.
            </p>
          </div>
        </div>

        {/* Switcher: All-Rounder vs. Individual */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-xl border border-white/10 mb-5">
          <button
            onClick={() => setShareMode('universal')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              shareMode === 'universal'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>One Link for ALL Professors</span>
          </button>
          <button
            onClick={() => setShareMode('individual')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              shareMode === 'individual'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Personalized for One Teacher</span>
          </button>
        </div>

        {shareMode === 'universal' ? (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 mb-5 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>All-Rounder Universal Mode:</strong> This link honors all professors across all departments. You can post it in your class or college group without worrying about one teacher feeling left out!
            </span>
          </div>
        ) : (
          <div className="space-y-3 mb-5 p-3.5 rounded-xl bg-black/30 border border-white/10">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Professor Name:
              </label>
              <input
                type="text"
                value={customProfName}
                onChange={(e) => setCustomProfName(e.target.value)}
                placeholder="e.g., Dr. Alistair Vance"
                className="w-full px-3 py-1.5 rounded-lg bg-[#0d1017] border border-neutral-700 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Department:
              </label>
              <input
                type="text"
                value={customDept}
                onChange={(e) => setCustomDept(e.target.value)}
                placeholder="e.g., Department of Mechanical Engineering"
                className="w-full px-3 py-1.5 rounded-lg bg-[#0d1017] border border-neutral-700 text-sm text-neutral-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        )}

        {/* Link Box */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
            {shareMode === 'universal' ? 'Universal Link (All Teachers)' : 'Personalized Tribute Link'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={activeUrl}
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#0d111a] border border-neutral-700 text-neutral-300 font-mono focus:outline-none select-all truncate"
            />
            <button
              id="copy-share-url-btn"
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Message Preview */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              Ready-to-Send Wish Text
            </label>
            <button
              id="copy-wish-text-btn"
              onClick={handleCopyMessage}
              className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
            >
              {copiedMessage ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedMessage ? 'Message Copied!' : 'Copy Message'}</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0d111a] border border-neutral-800 text-xs text-neutral-300 font-sans whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto select-all">
            {activeMessage}
          </div>
        </div>

        {/* Quick Send Options */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            id="share-whatsapp-btn"
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send on WhatsApp</span>
          </button>

          <button
            id="share-email-btn"
            onClick={handleEmailShare}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send via Email</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
