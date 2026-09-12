import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ConfettiBurst from '../components/viola/ConfettiBurst';
import EmojiRain from '../components/viola/EmojiRain';
import Typewriter from '../components/viola/Typewriter';
import ConsulateBadge from '../components/viola/ConsulateBadge';
import PolaroidDeck from '../components/viola/PolaroidDeck';
import FallingApple from '../components/viola/FallingApple';
import { initAudio, setMuted } from '../components/viola/sfx';

// Auto-discovered so Andrea can drop files in without editing a manifest.
const photoModules = import.meta.glob('../assets/viola/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const photos = Object.keys(photoModules)
  .sort()
  .map((k) => photoModules[k]);

const memojiModules = import.meta.glob('../assets/viola-memoji.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const memoji = Object.values(memojiModules)[0] ?? null;

// Optional cold-open GIF. If the file isn't there the intro is simply skipped.
const introModules = import.meta.glob('../assets/viola-intro.{gif,webp,png,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const introGif = Object.values(introModules)[0] ?? null;

const outroModules = import.meta.glob('../assets/viola-outro.{gif,webp,png,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const outroGif = Object.values(outroModules)[0] ?? null;

const bruhModules = import.meta.glob('../assets/viola-bruh.{mp3,wav,m4a,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const bruhUrl = Object.values(bruhModules)[0] ?? null;

const INTRO_MS = 3200;

const SPOTIFY_TRACK = '6TcxNktV3j9uTooOXcZ0J5';

const MESSAGE =
  "I've been thinking about you today. One of the reasons may or may not be because it's 9/11 — but anyway, I hope you're liking the Big Apple.";
const BADGE_LINE =
  "and I hope being CEO of the Italian Consulate isn't weighing too heavy on you";
const PHOTOS_LINE =
  "Maybe you're missing Italy — so here are some pictures and a song for you";

const NAME = 'Hey Viola';

/** Bouncing "scroll" cue, delayed so it appears after the beat's content lands. */
const ScrollCue = ({ delay = 1.4 }) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.7 }}
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 'max(22px, env(safe-area-inset-bottom))',
      textAlign: 'center',
      color: 'rgba(255,255,255,0.5)',
      fontSize: 13,
      letterSpacing: '0.08em',
      pointerEvents: 'none',
      animation: 'violaFloat 2.2s ease-in-out infinite',
    }}
  >
    scroll ↓
  </motion.div>
);

/**
 * One beat per screen. Each fills the viewport and snaps, so only a single
 * part is ever visible — she has to scroll to reveal the next one.
 */
const Beat = ({ children, style, last = false }) => (
  <motion.section
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    style={{
      width: '100%',
      maxWidth: 620,
      margin: '0 auto',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      scrollSnapAlign: 'center',
      // Longhand so per-beat paddingTop/paddingBottom overrides don't conflict
      paddingTop: '10vh',
      paddingBottom: '12vh',
      paddingLeft: 22,
      paddingRight: 22,
      position: 'relative',
      zIndex: 2,
      ...style,
    }}
  >
    {children}
    {!last && <ScrollCue />}
  </motion.section>
);

const ViolaPage = () => {
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(0);
  const [appleIn, setAppleIn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const bruhRef = useRef(null);

  // Keep this page out of search results without touching the rest of the site.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = 'psst…';

    const prevRestore = window.history.scrollRestoration;
    if (prevRestore) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
      if (prevRestore) window.history.scrollRestoration = prevRestore;
    };
  }, []);

  // Lock background scrolling while the door is still shut.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  // Must run inside the tap handler — browsers only unlock audio on a gesture.
  const open = () => {
    initAudio();
    // Browsers restore scroll on reload; without this the opening beat can be
    // scrolled past before it ever plays.
    window.scrollTo(0, 0);
    setOpened(true);

    // Fired from inside the tap so autoplay policy allows it
    if (introGif && bruhUrl) {
      const audio = new Audio(bruhUrl);
      audio.volume = 0.9;
      bruhRef.current = audio;
      audio.play().catch(() => {});
    }

    if (!introGif) finishIntro();
  };

  const finishIntro = () => {
    setIntroDone(true);
    setBurst((b) => b + 1);
  };

  // Cold-open GIF runs before any text, then hands off to the title.
  useEffect(() => {
    if (!opened || !introGif || introDone) return undefined;
    const t = setTimeout(finishIntro, INTRO_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, introDone]);

  const toggleSound = () => {
    setSoundOn((on) => {
      setMuted(on);
      if (on && bruhRef.current) bruhRef.current.pause();
      return !on;
    });
  };

  return (
    <div
      className="viola-root"
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        background:
          'radial-gradient(120% 90% at 50% 0%, #1b2a4a 0%, #101725 45%, #070a12 100%)',
        color: '#fff',
        fontFamily: 'Poppins, system-ui, sans-serif',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <style>{`
        .viola-root { min-height: 100vh; min-height: 100dvh; }
        .viola-screen { min-height: 100vh; min-height: 100dvh; }
        /* One beat per screen. 'proximity' rather than 'mandatory' so a beat
           taller than the viewport can never trap content out of reach. */
        html { scroll-snap-type: y proximity; scroll-behavior: smooth; }
        @keyframes violaCaret { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes violaFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
      `}</style>

      <EmojiRain active={opened} />
      <ConfettiBurst fire={burst} />

      {opened && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? 'Mute sounds' : 'Unmute sounds'}
          style={{
            position: 'fixed',
            top: 'max(14px, env(safe-area-inset-top))',
            right: 14,
            zIndex: 90,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.22)',
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: 17,
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      )}

      {/* ── Beat 0 · the door ───────────────────────────────── */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="viola-screen"
            key="door"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: '#070a12',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 22,
              padding: 24,
            }}
          >
            <motion.button
              onClick={open}
              whileTap={{ scale: 0.94 }}
              animate={reduceMotion ? {} : { rotate: [-3, 3, -3], y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'inherit',
                fontSize: 'clamp(20px, 6vw, 26px)',
                fontWeight: 700,
                color: '#0b1220',
                background: 'linear-gradient(135deg,#FFD75E,#FFB300)',
                border: 'none',
                borderRadius: 999,
                padding: '20px 40px',
                minHeight: 64,
                cursor: 'pointer',
                boxShadow: '0 16px 44px rgba(255,183,0,0.35)',
              }}
            >
              Apri 💌
            </motion.button>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: 0 }}>
              (turn your sound on)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cold open · the GIF, before any text ────────────── */}
      <AnimatePresence>
        {opened && introGif && !introDone && (
          <motion.div
            key="intro"
            className="viola-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={finishIntro}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 95,
              background: '#070a12',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 16,
            }}
          >
            <img
              src={introGif}
              alt=""
              style={{
                maxWidth: 'min(92vw, 560px)',
                maxHeight: '72dvh',
                objectFit: 'contain',
                borderRadius: 10,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Beat 1 · HEY VIOLA ──────────────────────────────── */}
      <section
        className="viola-screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
          position: 'relative',
          zIndex: 2,
          scrollSnapAlign: 'center',
        }}
      >
        {/* Typed in the same typewriter face, with the same key strikes.
            Only mounted once the cold open finishes so it types on cue. */}
        <div style={{ minHeight: 'clamp(3rem, 16vw, 6.5rem)', display: 'flex', alignItems: 'center' }}>
          {introDone && (
            <Typewriter
              as="h1"
              text={NAME}
              speed={115}
              startDelay={420}
              sx={{
                fontSize: 'clamp(2.4rem, 13vw, 5.5rem)',
                fontWeight: 700,
                letterSpacing: '0.01em',
                lineHeight: 1.05,
                color: '#ffd75e',
                textAlign: 'center',
              }}
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ delay: 1.9, duration: 0.7 }}
          style={{ marginTop: 26, fontSize: 34, letterSpacing: 10 }}
        >
          🇮🇹 🗽
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ delay: 2.6, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 'max(26px, env(safe-area-inset-bottom))',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
            animation: reduceMotion ? 'none' : 'violaFloat 2.2s ease-in-out infinite',
          }}
        >
          scroll ↓
        </motion.div>
      </section>

      {/* ── Beat 2 · the message ────────────────────────────── */}
      <Beat>
        <Typewriter
          text={MESSAGE}
          onDone={() => setAppleIn(true)}
          sx={{
            fontSize: 'clamp(1.15rem, 4.6vw, 1.6rem)',
            lineHeight: 1.65,
            color: '#eef3fa',
            fontWeight: 500,
          }}
        />
        <div style={{ marginTop: 10 }}>
          <FallingApple trigger={appleIn} />
        </div>
      </Beat>

      {/* ── Beat 3 · the promotion ──────────────────────────── */}
      <Beat style={{ paddingTop: '4vh' }}>
        <ConsulateBadge />
        <div style={{ marginTop: 40 }}>
          <Typewriter
            text={BADGE_LINE}
            sx={{
              fontSize: 'clamp(1.1rem, 4.4vw, 1.5rem)',
              lineHeight: 1.65,
              color: '#eef3fa',
              fontWeight: 500,
              textAlign: 'center',
            }}
          />
        </div>
      </Beat>

      {/* ── Beat 4 · the photos ─────────────────────────────── */}
      <Beat>
        <Typewriter
          as="h2"
          text={PHOTOS_LINE}
          sx={{
            fontSize: 'clamp(1.15rem, 4.4vw, 1.6rem)',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.5,
            color: '#eef3fa',
            marginBottom: 34,
          }}
        />
        <PolaroidDeck photos={photos} />
      </Beat>

      {/* ── Beat 5 · the song ───────────────────────────────── */}
      <Beat>
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 14,
            margin: '0 0 22px',
            letterSpacing: '0.03em',
          }}
        >
          turn it up 🎧
        </p>
        <div
          style={{
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 14px 40px rgba(0,0,0,0.45)',
          }}
        >
          <iframe
            title="Io per lei — Pino Daniele"
            src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ display: 'block', border: 0 }}
          />
        </div>
        <motion.div
          animate={reduceMotion ? {} : { x: [-14, 14, -14] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 42, textAlign: 'center', marginTop: 26 }}
        >
          🛵
        </motion.div>
      </Beat>

      {/* ── Beat 6 · outro ──────────────────────────────────── */}
      <Beat last style={{ paddingBottom: 'max(14vh, 110px)', textAlign: 'center' }}>
        {outroGif ? (
          <motion.img
            src={outroGif}
            alt=""
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'block',
              margin: '0 auto',
              maxWidth: 'min(86vw, 420px)',
              maxHeight: '46dvh',
              objectFit: 'contain',
              borderRadius: 12,
            }}
          />
        ) : (
          <motion.div
            animate={reduceMotion ? {} : { rotate: [0, 16, -8, 16, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }}
            style={{ display: 'inline-block', transformOrigin: '70% 80%' }}
          >
            {memoji ? (
              <img
                src={memoji}
                alt=""
                style={{ width: 128, height: 128, objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <span style={{ fontSize: 84, lineHeight: 1 }}>👋</span>
            )}
          </motion.div>
        )}
        <p
          style={{
            marginTop: 22,
            fontSize: 'clamp(1.05rem, 4.2vw, 1.3rem)',
            color: '#eef3fa',
            lineHeight: 1.6,
          }}
        >
          Let&apos;s catch up soon
        </p>
        <p
          style={{
            marginTop: 14,
            fontSize: 'clamp(1.4rem, 6vw, 2rem)',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          ciao ❤️
        </p>
      </Beat>
    </div>
  );
};

export default ViolaPage;
