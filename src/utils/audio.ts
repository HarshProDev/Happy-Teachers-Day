// Gentle, pleasant Web Audio API sound synthesis for ambient celebration & interactions

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCelebrationChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Arpeggio notes: C5, E5, G5, B5, C6 (warm celebratory major 7th / octave)
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      
      gain.gain.setValueAtTime(0.001, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.22 / (idx + 1), now + idx * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 1.8);
    });
  } catch {
    // Audio autostart guard
  }
}

export function playTrophyChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [587.33, 880.00, 1174.66]; // D5, A5, D6
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  } catch {
    // Ignore audio error
  }
}

export function playSoftClick(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // Audio guard
  }
}

// Gentle ambient loop generator for reading the letter
let ambientOscillators: OscillatorNode[] = [];
let ambientGains: GainNode[] = [];
let isPlayingAmbientMusic = false;

export function toggleAmbientPiano(shouldPlay: boolean): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (!shouldPlay) {
      ambientGains.forEach(g => {
        try {
          g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);
        } catch {
          // ignore
        }
      });
      setTimeout(() => {
        ambientOscillators.forEach(o => {
          try { o.stop(); o.disconnect(); } catch { /* ignore */ }
        });
        ambientOscillators = [];
        ambientGains = [];
      }, 500);
      isPlayingAmbientMusic = false;
      return false;
    }

    if (isPlayingAmbientMusic) return true;

    // Create a serene, warm academic pad (F major 9th chord: F3, A3, C4, E4, G4)
    const chord = [174.61, 220.0, 261.63, 329.63, 392.0];
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.05, ctx.currentTime);
    masterGain.connect(ctx.destination);

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (idx % 2 === 0 ? 0.3 : -0.2), ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();

      ambientOscillators.push(osc);
      ambientGains.push(gain);
    });

    isPlayingAmbientMusic = true;
    return true;
  } catch {
    return false;
  }
}
