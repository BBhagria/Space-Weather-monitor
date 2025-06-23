import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Meteor from './Meteor';

const MeteorShower = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '200vh',
        background: 'radial-gradient(ellipse at bottom, #0d1b2a 0%, #000 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Starfield background */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage:
            'radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* Meteors */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Meteor key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};

export default MeteorShower;
