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
let master = null;
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
      // Single output stage — phone speakers need considerably more level
      // than a laptop, and this keeps the mix balanced in one place.
      master = ctx.createGain();
      master.gain.value = 2.6;
      master.connect(ctx.destination);

      // iOS suspends the context aggressively (backgrounding, route changes,
      // even idling). Re-arm it on any subsequent interaction.
      const wake = () => {
        if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
      };
      ['touchstart', 'touchend', 'pointerdown', 'click'].forEach((evt) =>
        document.addEventListener(evt, wake, { passive: true })
      );
      document.addEventListener('visibilitychange', wake);
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  } catch {
    ctx = null;
  }
};

export const setMuted = (value) => {
  muted = value;
};

export const isMuted = () => muted;

const ready = () => {
  if (!ctx || !master || muted) return false;
  // Nudge a suspended context awake; this call is silent, the next lands.
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
    return false;
  }
  return ctx.state === 'running';
};

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
  strike.connect(hp).connect(strikeGain).connect(master);
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
    ring.connect(ringGain).connect(master);
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
  body.connect(lp).connect(bodyGain).connect(master);
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
    osc.connect(gain).connect(master);
    osc.start(t);
    osc.stop(t + 1);
  });
};

/* ── Sampled clip (the apple impact) ─────────────────────────────────
 * iOS only allows an <audio> element to play programmatically once it has
 * played at least once inside a real user gesture. The apple lands long
 * after the opening tap, so the element is unlocked during that tap (played
 * silently for an instant) and is then free to play on demand.
 */
let clip = null;

export const initClip = (url) => {
  if (clip || !url) return;
  clip = new Audio(url);
  clip.preload = 'auto';
};

/** MUST be called from inside a user gesture. */
export const unlockClip = () => {
  if (!clip) return;
  const restore = clip.volume;
  clip.volume = 0;
  clip
    .play()
    .then(() => {
      clip.pause();
      clip.currentTime = 0;
      clip.volume = restore;
    })
    .catch(() => {
      clip.volume = restore;
    });
};

/** Plays the clip between `start` and `end` seconds. Returns false if unavailable. */
export const playAppleClip = (start, end) => {
  if (muted || !clip) return false;
  try {
    clip.currentTime = start;
    const stopAtEnd = () => {
      if (clip.currentTime >= end) {
        clip.pause();
        clip.removeEventListener('timeupdate', stopAtEnd);
      }
    };
    clip.addEventListener('timeupdate', stopAtEnd);
    // If iOS still refuses (unlock didn't take), fall back to the synth thud
    // rather than leaving the apple landing silent.
    clip.play().catch(() => playThud());
    return true;
  } catch {
    return false;
  }
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
  osc.connect(oscGain).connect(master);
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
  src.connect(lp).connect(noiseGain).connect(master);
  src.start(t);
  src.stop(t + 0.35);
};
