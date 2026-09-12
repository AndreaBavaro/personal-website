import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TRICOLORE = ['#009246', '#F1F2F1', '#CE2B37', '#FFC72C', '#FF6B9D'];
const EMOJIS = ['🍎', '🍕', '🗽', '🛵', '🇮🇹', '✨'];

/**
 * One-shot celebratory burst. Fires whenever `fire` flips to a new truthy key.
 * Fixed-position and pointer-events:none so it can never trap taps or cause
 * horizontal scroll on a phone.
 */
const ConfettiBurst = ({ fire, count }) => {
  const reduceMotion = useReducedMotion();
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 700;
  const total = count ?? (isSmall ? 26 : 46);

  const pieces = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      const angle = (Math.PI * 2 * i) / total + Math.random() * 0.5;
      const distance = 120 + Math.random() * (isSmall ? 180 : 320);
      const isEmoji = i % 4 === 0;
      return {
        id: `${fire}-${i}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 80,
        rotate: (Math.random() - 0.5) * 720,
        delay: Math.random() * 0.12,
        duration: 1.5 + Math.random() * 1.1,
        size: 8 + Math.random() * 10,
        color: TRICOLORE[i % TRICOLORE.length],
        emoji: isEmoji ? EMOJIS[i % EMOJIS.length] : null,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fire, total]);

  if (!fire || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 60,
      }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 420],
            opacity: [1, 1, 0],
            rotate: p.rotate,
            scale: [1, 1, 0.75],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.15, 0.6, 0.4, 1],
            times: [0, 0.35, 1],
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '42%',
            fontSize: p.emoji ? p.size * 2 : undefined,
            width: p.emoji ? undefined : p.size,
            height: p.emoji ? undefined : p.size * 0.6,
            background: p.emoji ? undefined : p.color,
            borderRadius: p.emoji ? undefined : 2,
            lineHeight: 1,
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default ConfettiBurst;
