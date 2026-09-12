import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 400;

const navBtn = (side) => ({
  position: 'absolute',
  [side]: 'max(8px, env(safe-area-inset-' + side + '))',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.22)',
  background: 'rgba(255,255,255,0.12)',
  WebkitBackdropFilter: 'blur(8px)',
  backdropFilter: 'blur(8px)',
  color: '#fff',
  fontSize: 22,
  lineHeight: 1,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
});

/**
 * Full-screen photo viewer. Every image is `object-fit: contain` inside the
 * full viewport, so portrait and landscape shots both show completely with no
 * cropping — the orientation simply decides which axis letterboxes.
 *
 * Navigation: swipe (touch), arrow buttons, or arrow keys.
 */
const PhotoLightbox = ({ photos, index, onClose, onChange }) => {
  const open = index !== null && index >= 0;
  const directionRef = useRef(1);

  const go = useCallback(
    (delta) => {
      directionRef.current = delta;
      onChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onChange]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    // Stop the page behind from scrolling while the viewer is up
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go, onClose]);

  // Warm the neighbours so swiping feels instant
  useEffect(() => {
    if (!open) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = photos[(index + d + photos.length) % photos.length];
    });
  }, [open, index, photos]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(5,8,14,0.97)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Backdrop closes; the image itself does not */}
          <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} aria-hidden="true" />

          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={index}
              src={photos[index]}
              alt={`Photo ${index + 1} of ${photos.length}`}
              drag="x"
              dragSnapToOrigin
              dragElastic={0.5}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (
                  Math.abs(info.offset.x) > SWIPE_DISTANCE ||
                  Math.abs(info.velocity.x) > SWIPE_VELOCITY
                ) {
                  go(info.offset.x > 0 ? -1 : 1);
                }
              }}
              initial={{ opacity: 0, x: directionRef.current * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              draggable={false}
              style={{
                position: 'relative',
                zIndex: 1,
                // contain + full-viewport bounds = any orientation fits whole
                maxWidth: 'calc(100vw - 24px)',
                maxHeight: 'calc(100dvh - 120px)',
                objectFit: 'contain',
                borderRadius: 6,
                touchAction: 'pan-y',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                cursor: 'grab',
              }}
            />
          </AnimatePresence>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => go(-1)}
                style={navBtn('left')}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => go(1)}
                style={navBtn('right')}
              >
                ›
              </button>
            </>
          )}

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'max(12px, env(safe-area-inset-top))',
              right: 'max(12px, env(safe-area-inset-right))',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.22)',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              fontSize: 18,
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            ✕
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: 'max(20px, env(safe-area-inset-bottom))',
              left: 0,
              right: 0,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.72)',
              fontSize: 13,
              letterSpacing: '0.05em',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {index + 1} / {photos.length}
            <div style={{ marginTop: 4, fontSize: 11, opacity: 0.65 }}>swipe or use ‹ ›</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoLightbox;
