import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Globbed rather than statically imported so the build still succeeds when the
// photo has not been dropped in yet.
const badgeModules = import.meta.glob('../../assets/viola-badge.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const badgePhoto = Object.values(badgeModules)[0] ?? null;

const PAPERWORK = ['📄', '📋', '🗂️', '📑'];

/**
 * The joke: a straight-faced Consulate ID badge whose only absurd detail is the
 * job title. Swings in on a lanyard, gets stamped, then sags under paperwork.
 */
const ConsulateBadge = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0); // 0 hidden, 1 swinging, 2 stamped, 3 sagging

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setStage(3);
      return undefined;
    }
    setStage(1);
    const t2 = setTimeout(() => setStage(2), 1500);
    const t3 = setTimeout(() => setStage(3), 2500);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [inView, reduceMotion]);

  const swinging = { rotate: [-14, 10, -7, 4, -2, 0], y: 0, opacity: 1 };
  const sagging = { rotate: 7, y: 8, opacity: 1 };

  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ position: 'relative', width: 'min(330px, 86vw)' }}>
        {/* Lanyard */}
        <div
          aria-hidden="true"
          style={{
            position: 'relative',
            height: 54,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 10,
              height: '100%',
              background: 'linear-gradient(180deg,#0b3d1f,#009246)',
              borderRadius: 3,
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.35)',
            }}
          />
        </div>

        <motion.div
          initial={{ y: -230, rotate: -18, opacity: 0 }}
          animate={stage === 0 ? { y: -230, opacity: 0 } : stage >= 3 ? sagging : swinging}
          transition={
            stage >= 3
              ? { type: 'spring', stiffness: 120, damping: 9 }
              : { duration: 2.1, ease: 'easeOut' }
          }
          style={{
            transformOrigin: 'top center',
            background: '#fdfdfb',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
            position: 'relative',
          }}
        >
          {/* Tricolore header */}
          <div style={{ display: 'flex', height: 8 }}>
            <div style={{ flex: 1, background: '#009246' }} />
            <div style={{ flex: 1, background: '#F1F2F1' }} />
            <div style={{ flex: 1, background: '#CE2B37' }} />
          </div>

          <div style={{ padding: '12px 14px 8px', textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 10.5,
                letterSpacing: '0.08em',
                color: '#0b2f5c',
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              CONSOLATO GENERALE D&apos;ITALIA
            </div>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#7c8794', marginTop: 2 }}>
              NEW YORK
            </div>
          </div>

          {/* Bottom padding reserves a clear strip for the stamp */}
          <div style={{ display: 'flex', gap: 12, padding: '4px 14px 38px', alignItems: 'center' }}>
            <div
              style={{
                width: 74,
                height: 92,
                flexShrink: 0,
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid #d5dae0',
                background: '#e9edf1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {badgePhoto ? (
                <img
                  src={badgePhoto}
                  alt="Viola"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    // Deliberately flat, slightly blown-out government-ID treatment
                    filter: 'saturate(0.75) contrast(1.05) brightness(1.06)',
                  }}
                />
              ) : (
                <span style={{ fontSize: 34, opacity: 0.35 }}>👤</span>
              )}
            </div>

            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <div style={{ fontSize: 8.5, letterSpacing: '0.16em', color: '#98a1ac' }}>TITOLARE</div>
              <div
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: 21,
                  fontWeight: 700,
                  color: '#132b45',
                  lineHeight: 1.1,
                }}
              >
                VIOLA
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 8.5,
                  letterSpacing: '0.16em',
                  color: '#98a1ac',
                }}
              >
                QUALIFICA
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#CE2B37',
                  lineHeight: 1.2,
                  fontStyle: 'italic',
                }}
              >
                Chief Executive Officer
              </div>
              <div style={{ marginTop: 7, fontSize: 8, color: '#aab2bb', letterSpacing: '0.05em' }}>
                ID 001 · VALIDO FINO AL 2099
              </div>
            </div>
          </div>

          {/* APPROVED stamp */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 3, opacity: 0, rotate: -34 }}
            animate={stage >= 2 ? { scale: 1, opacity: 0.85, rotate: -17 } : {}}
            transition={{ type: 'spring', stiffness: 320, damping: 12 }}
            style={{
              position: 'absolute',
              // Sits in the reserved bottom strip, never over "Chief Executive
              // Officer" — the punchline has to stay legible.
              right: 12,
              bottom: 5,
              border: '3px double #c0392b',
              color: '#c0392b',
              padding: '3px 9px',
              borderRadius: 5,
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: '0.1em',
              fontFamily: 'Georgia, serif',
              pointerEvents: 'none',
            }}
          >
            APPROVED
          </motion.div>
        </motion.div>

        {/* Paperwork piling on once the sag kicks in */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            pointerEvents: 'none',
          }}
        >
          {PAPERWORK.map((p, i) => (
            <motion.span
              key={p}
              initial={{ y: -260, opacity: 0, rotate: 0 }}
              animate={stage >= 3 ? { y: 0, opacity: 1, rotate: (i - 1.5) * 14 } : {}}
              transition={{ type: 'spring', stiffness: 180, damping: 11, delay: i * 0.08 }}
              style={{ fontSize: 26, lineHeight: 1 }}
            >
              {p}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsulateBadge;
