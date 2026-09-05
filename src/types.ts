export interface CollegeTributeInfo {
  collegeName: string;
  studentBody: string; // e.g., "Harsh & Your Grateful Students"
  batch: string; // e.g., "Class of 2025"
  occasion: string; // e.g., "Teacher's Day 2025"
}

export interface FacultyArchetype {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  quote: string;
  appreciation: string;
  badge: string;
}

export interface ProfessorProfile {
  id: string;
  isUniversal?: boolean;
  name: string;
  salutation: string; // Dr., Prof., etc.
  department: string;
  college: string;
  subject: string;
  quote: string;
  customMessage?: string;
  studentName?: string;
  batch?: string;
  specialMemory?: string;
  avatarColor: string;
}

export interface ChalkMemory {
  id: string;
  author: string;
  role: string;
  text: string;
  tag: 'Gratitude' | 'Lecture Quote' | 'Lab Memory' | 'Life Lesson';
  color: string;
  rotation: number;
  timestamp: string;
}

export interface VirtualTributeGift {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  symbolism: string;
  unlocked: boolean;
  accent: string;
}

