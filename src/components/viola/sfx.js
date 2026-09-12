/**
 * Tiny synthesised sound kit for the Viola page.
 *
 * Everything is generated with the Web Audio API rather than loaded from audio
 * files: nothing to license, nothing to download, and it works offline.
 *
 * Browsers block audio until a user gesture, so `initAudio()` must be called
 * from inside a real click/tap handler (the "Apri" button does this).
 */

let ctx = null;
let noiseBuffer = null;
let muted = false;

const makeNoiseBuffer = (audioCtx) => {
  const length = Math.floor(audioCtx.sampleRate * 0.12);
  const buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

export const initAudio = () => {
  try {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      ctx = new AudioCtx();
      noiseBuffer = makeNoiseBuffer(ctx);
    }
    if (ctx.state === 'suspended') ctx.resume();
  } catch {
    ctx = null;
  }
};

export const setMuted = (value) => {
  muted = value;
};

export const isMuted = () => muted;

const ready = () => ctx && !muted && ctx.state === 'running';

/**
 * Mechanical typebar strike, built from three layers because a single click
 * reads as a soft UI blip rather than a typewriter:
 *   1. hammer transient — very short, very bright, near-instant attack
 *   2. metallic ring    — the typebar/platen resonance
 *   3. body thunk       — the frame and carriage taking the hit
 */
export const playKey = ({ soft = false } = {}) => {
  if (!ready()) return;
  const t = ctx.currentTime;
  const level = soft ? 0.45 : 1;
  const jitter = 0.88 + Math.random() * 0.24;

  // 1. Hammer transient — highpassed noise, snapped off fast
  const strike = ctx.createBufferSource();
  strike.buffer = noiseBuffer;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = (soft ? 1200 : 2300) * jitter;
  const strikeGain = ctx.createGain();
  strikeGain.gain.setValueAtTime(0.0001, t);
  strikeGain.gain.exponentialRampToValueAtTime(0.3 * level, t + 0.0012);
  strikeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.016);
  strike.connect(hp).connect(strikeGain).connect(ctx.destination);
  strike.start(t);
  strike.stop(t + 0.03);

  // 2. Metallic ring — short, slightly detuned each strike
  if (!soft) {
    const ring = ctx.createOscillator();
    ring.type = 'square';
    ring.frequency.setValueAtTime(2600 * jitter, t);
    ring.frequency.exponentialRampToValueAtTime(1900 * jitter, t + 0.03);
    const ringGain = ctx.createGain();
    ringGain.gain.setValueAtTime(0.0001, t);
    ringGain.gain.exponentialRampToValueAtTime(0.055, t + 0.001);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.032);
    ring.connect(ringGain).connect(ctx.destination);
    ring.start(t);
    ring.stop(t + 0.05);
  }

  // 3. Body thunk — the machine itself
  const body = ctx.createBufferSource();
  body.buffer = noiseBuffer;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 420 * jitter;
  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0.0001, t);
  bodyGain.gain.exponentialRampToValueAtTime(0.16 * level, t + 0.002);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
  body.connect(lp).connect(bodyGain).connect(ctx.destination);
  body.start(t);
  body.stop(t + 0.07);
};

/** Carriage-return bell at the end of a line. */
export const playBell = () => {
  if (!ready()) return;
  const t = ctx.currentTime;
  [1850, 2560].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(i === 0 ? 0.12 : 0.06, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 1);
  });
};

/** Deep impact for the apple landing. */
export const playThud = () => {
  if (!ready()) return;
  const t = ctx.currentTime;

  // Body: pitch dropping fast from 110Hz to 32Hz
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(110, t);
  osc.frequency.exponentialRampToValueAtTime(32, t + 0.26);
  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.0001, t);
  oscGain.gain.exponentialRampToValueAtTime(0.6, t + 0.012);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.6);

  // Crack: low-passed noise burst for the impact texture
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(1400, t);
  lp.frequency.exponentialRampToValueAtTime(220, t + 0.2);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.32, t + 0.008);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  src.connect(lp).connect(noiseGain).connect(ctx.destination);
  src.start(t);
  src.stop(t + 0.35);
};
