import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { playKey, playBell } from './sfx';

/**
 * Reveals `text` character by character once it scrolls into view.
 * Respects prefers-reduced-motion by rendering the full string immediately.
 * Calls `onDone` when the last character lands (used to time the visual gags).
 */
// 55ms/char ≈ 18 chars/sec — a deliberate, mechanical pace. Much faster than
// this and the key strikes blur into a rattle instead of individual hits.
const Typewriter = ({ text, speed = 55, startDelay = 250, onDone, sx = {}, as: Tag = 'p' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (!doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }
  };

  useEffect(() => {
    if (!inView) return undefined;

    // Deliberately NOT gated on prefers-reduced-motion: revealing text is not
    // vestibular motion, and it is the whole point of the page. Only the
    // ambient/large motion (confetti, drift, shake) respects that preference.
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        // Spacebar gets the duller, quieter thunk rather than a typebar strike
        playKey({ soft: text[i - 1] === ' ' });
        if (i >= text.length) {
          clearInterval(interval);
          playBell();
          finish();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text, speed, startDelay]);

  const typing = count > 0 && count < text.length;

  return (
    <Tag
      ref={ref}
      style={{
        margin: 0,
        whiteSpace: 'pre-wrap',
        // American Typewriter ships on macOS/iOS, so the authentic face renders
        // with no webfont request; Courier covers everything else.
        fontFamily: "'American Typewriter', 'Courier New', Courier, monospace",
        letterSpacing: '0.01em',
        ...sx,
      }}
    >
      {text.slice(0, count)}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '0.6ch',
          opacity: typing ? 1 : 0,
          animation: typing ? 'violaCaret 0.8s steps(1) infinite' : 'none',
        }}
      >
        |
      </span>
    </Tag>
  );
};

export default Typewriter;
