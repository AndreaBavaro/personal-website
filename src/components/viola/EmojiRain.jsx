import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const DEFAULT_EMOJIS = ['🍎', '🍕', '🗽', '🛵', '🇮🇹', '☕️', '🥐'];

/**
 * Slow ambient drift of emoji behind the content. Deliberately low-count on
 * phones so it never costs frame rate, and always pointer-events:none.
 */
const EmojiRain = ({ emojis = DEFAULT_EMOJIS, active = true }) => {
  const reduceMotion = useReducedMotion();
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 700;
  const count = isSmall ? 10 : 18;

  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i / count) * 100 + Math.random() * 6,
        emoji: emojis[i % emojis.length],
        size: 18 + Math.random() * 22,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * 12,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count, emojis]
  );

  if (!active || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {drops.map((d) => (
        <motion.span
          key={d.id}
          initial={{ y: '-12vh', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '112vh',
            x: d.drift,
            opacity: [0, 0.55, 0.55, 0],
            rotate: d.drift > 0 ? 220 : -220,
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.85, 1],
          }}
          style={{
            position: 'absolute',
            left: `${d.left}%`,
            fontSize: d.size,
            lineHeight: 1,
            // No filter: it forces an extra paint pass on every frame, which
            // is a needless cost on a phone during scroll.
            willChange: 'transform',
          }}
        >
          {d.emoji}
        </motion.span>
      ))}
    </div>
  );
};

export default EmojiRain;
