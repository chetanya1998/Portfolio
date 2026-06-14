// Retro Sound System using Web Audio API
// No external files needed - generates all sounds programmatically

let audioCtx = null;
let bgMusicInterval = null;
let isMuted = false;
let isMusicPlaying = true; // Auto-play enabled

const getAudioContext = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
};

// Check if user prefers reduced motion (also respects reduced audio)
const shouldPlaySound = () => {
    if (isMuted) return false;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !prefersReduced;
};

// ─── Individual Sound Effects ───

export const playClickSound = () => {
    if (!shouldPlaySound()) return;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
};

export const playHoverSound = () => {
    if (!shouldPlaySound()) return;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
};

export const playAchievementSound = () => {
    if (!shouldPlaySound()) return;
    const ctx = getAudioContext();

    // Three-note arpeggio for achievement
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + i * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
};

export const playNavigateSound = () => {
    if (!shouldPlaySound()) return;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
};

export const playModalOpenSound = () => {
    if (!shouldPlaySound()) return;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
};

export const playModalCloseSound = () => {
    if (!shouldPlaySound()) return;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
};

export const playSkillCollectSound = () => {
    if (!shouldPlaySound()) return;
    const ctx = getAudioContext();
    // Coin-collect style: quick ascending chirp
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
    osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.06); // E6
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
};

// ─── Background Ambient Music ───

export const startBackgroundMusic = () => {
    if (isMusicPlaying || isMuted) return;
    isMusicPlaying = true;
    window.dispatchEvent(new Event('play-yt-music'));
};

export const stopBackgroundMusic = () => {
    isMusicPlaying = false;
    window.dispatchEvent(new Event('pause-yt-music'));
};

let currentVolume = 30;

export const setBackgroundVolume = (vol) => {
    currentVolume = vol;
    window.dispatchEvent(new CustomEvent('volume-yt-music', { detail: vol }));
};

export const getBackgroundVolume = () => currentVolume;

export const toggleMute = () => {
    isMuted = !isMuted;
    if (isMuted) {
        stopBackgroundMusic();
    }
    return isMuted;
};

export const getIsMuted = () => isMuted;
export const getIsMusicPlaying = () => isMusicPlaying;
