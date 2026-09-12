import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PhotoLightbox from './PhotoLightbox';

const SWIPE_DISTANCE = 90;
const SWIPE_VELOCITY = 450;

/**
 * A swipeable deck of Polaroids. Deliberately a deck rather than a scattered
 * pile: flicking one card at a time is the gesture that actually works on a
 * phone, where a free-drag pile is fiddly and fights the page scroll.
 *
 * touchAction 'pan-y' keeps vertical page scrolling with the browser while the
 * horizontal axis is captured for dragging.
 */
const PolaroidDeck = ({ photos = [], caption = 'Italia 2026' }) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const draggedRef = useRef(false);

  if (photos.length === 0) {
    return (
      <div
        style={{
          width: 'min(300px, 78vw)',
          margin: '0 auto',
          padding: '46px 18px',
          borderRadius: 12,
          border: '2px dashed rgba(255,255,255,0.28)',
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontSize: 34, marginBottom: 8 }}>📷</div>
        Photos landing here soon
      </div>
    );
  }

  const advance = (direction) => {
    setExitX(direction * 720);
    setIndex((i) => i + 1);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > SWIPE_DISTANCE || Math.abs(velocity.x) > SWIPE_VELOCITY) {
      advance(offset.x > 0 ? 1 : -1);
    }
    // Let the tap handler run again on the next interaction
    setTimeout(() => {
      draggedRef.current = false;
    }, 30);
  };

  const visible = [0, 1, 2].map((offset) => ({
    offset,
    src: photos[(index + offset) % photos.length],
    key: index + offset,
  }));

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: 'min(300px, 78vw)',
          height: 'min(372px, 96vw)',
          margin: '0 auto',
        }}
      >
        {visible
          .slice()
          .reverse()
          .map(({ offset, src, key }) => {
            const isTop = offset === 0;
            const card = (
              <motion.div
                key={key}
                drag={isTop && !reduceMotion ? 'x' : false}
                dragSnapToOrigin
                dragElastic={0.65}
                dragConstraints={{ left: 0, right: 0 }}
                onDrag={(_, info) => {
                  if (Math.abs(info.offset.x) > 6) draggedRef.current = true;
                }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                onTap={() => {
                  if (!draggedRef.current) setLightboxIndex((index + offset) % photos.length);
                }}
                initial={{ scale: 0.86, y: 40, opacity: 0, rotate: 0 }}
                animate={{
                  scale: 1 - offset * 0.05,
                  y: offset * -10,
                  opacity: 1,
                  rotate: offset === 0 ? -2 : offset === 1 ? 3 : -4,
                }}
                exit={{ x: exitX, opacity: 0, rotate: exitX > 0 ? 22 : -22, transition: { duration: 0.32 } }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                whileTap={isTop ? { scale: 1.02 } : undefined}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10 - offset,
                  background: '#fffdf8',
                  borderRadius: 4,
                  padding: '11px 11px 42px',
                  boxShadow: '0 14px 34px rgba(0,0,0,0.45)',
                  cursor: isTop ? 'grab' : 'default',
                  touchAction: 'pan-y',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                }}
              >
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  loading={offset === 0 ? 'eager' : 'lazy'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    background: '#e6e2da',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 12,
                    textAlign: 'center',
                    fontFamily: '"Bradley Hand", "Segoe Print", cursive',
                    fontSize: 16,
                    color: '#4a4340',
                  }}
                >
                  {caption}
                </div>
              </motion.div>
            );
            return isTop ? (
              <AnimatePresence key="top-slot" initial={false} mode="popLayout">
                {card}
              </AnimatePresence>
            ) : (
              card
            );
          })}
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: 18,
          color: 'rgba(255,255,255,0.62)',
          fontSize: 13,
          letterSpacing: '0.04em',
        }}
      >
        tap a photo to open all {photos.length} full size
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
          {(index % photos.length) + 1} / {photos.length}
        </div>
      </div>

      <PhotoLightbox
        photos={photos}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
};

export default PolaroidDeck;
