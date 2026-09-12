import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { playThud, playAppleClip } from './sfx';

// The clip itself is owned by sfx.js so it can be unlocked during the opening
// tap — iOS refuses programmatic playback otherwise.
const CLIP_START = 5;
const CLIP_END = 11;

const DUST = Array.from({ length: 9 }, (_, i) => i);

/**
 * A very large apple drops in from above the viewport, lands with a thud, a
 * squash, a shake and a puff of dust.
 *
 * The shake is scoped to this block rather than the whole page: the page has
 * position:fixed layers (emoji rain, confetti) that a transform on a common
 * ancestor would break.
 */
const FallingApple = ({ trigger }) => {
  const reduceMotion = useReducedMotion();
  const [landed, setLanded] = useState(false);

  const onLanded = () => {
    // Custom clip if one is loaded, otherwise the synthesised thud
    if (!playAppleClip(CLIP_START, CLIP_END)) playThud();
    setLanded(true);
  };

  // The apple always falls — it is the gag. Reduced motion only shortens the
  // drop and drops the screen shake.
  return (
    <motion.div
      animate={landed && !reduceMotion ? { x: [0, -9, 8, -6, 4, -2, 0], y: [0, 5, -3, 2, 0] } : {}}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        position: 'relative',
        height: 'clamp(190px, 52vw, 340px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ground shadow, splats outward on impact */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0.2, opacity: 0 }}
        animate={landed ? { scaleX: 1, opacity: 0.45 } : {}}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 6,
          width: 'clamp(150px, 44vw, 300px)',
          height: 22,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.65), rgba(0,0,0,0))',
        }}
      />

      <motion.div
        initial={{ y: reduceMotion ? '-45vh' : '-125vh', rotate: reduceMotion ? 0 : -22 }}
        animate={trigger ? { y: 0, rotate: 0 } : {}}
        // Accelerating curve so it reads as gravity rather than a glide
        transition={{ duration: reduceMotion ? 0.5 : 0.72, ease: [0.45, 0, 0.9, 1] }}
        onAnimationComplete={() => {
          if (trigger && !landed) onLanded();
        }}
        style={{ position: 'relative', transformOrigin: 'bottom center' }}
      >
        <motion.div
          animate={landed ? { scaleY: [1, 0.7, 1.1, 0.94, 1], scaleX: [1, 1.24, 0.93, 1.03, 1] } : {}}
          transition={{ duration: 0.55, ease: 'easeOut', times: [0, 0.14, 0.38, 0.68, 1] }}
          style={{
            fontSize: 'clamp(150px, 46vw, 300px)',
            lineHeight: 1,
            transformOrigin: 'bottom center',
            filter: 'drop-shadow(0 18px 26px rgba(0,0,0,0.5))',
          }}
        >
          🍎
        </motion.div>
      </motion.div>

      {/* Dust puff on impact */}
      {DUST.map((i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        const spread = 40 + (i % 5) * 34;
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={
              landed
                ? { opacity: [0, 0.6, 0], x: dir * spread, y: [-4, -26 - (i % 3) * 10], scale: 1.1 }
                : {}
            }
            transition={{ duration: 0.75, ease: 'easeOut', delay: (i % 4) * 0.03 }}
            style={{
              position: 'absolute',
              bottom: 10,
              fontSize: 20 + (i % 3) * 8,
              pointerEvents: 'none',
              filter: 'grayscale(0.4)',
            }}
          >
            💨
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default FallingApple;
