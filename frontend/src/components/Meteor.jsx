import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const Meteor = ({ index }) => {
  const controls = useAnimation();

  // Randomized starting positions in top-right area (scattered)
  const startLeft = 60 + Math.random() * 40; // 60% to 100% of width
  const startTop = Math.random() * 30;       // 0% to 30% of height

  // Sizes and speed
  const size = Math.random() * 2 + 1;
  const duration = 1.5 + Math.random();

  useEffect(() => {
    controls.start({
      x: -window.innerWidth, // move left across screen
      y: window.innerHeight, // move down across screen
      opacity: [0, 1, 0],
      transition: {
        duration,
        ease: 'easeInOut',
      }
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: 0, y: 0, opacity: 0 }}
      style={{
        position: 'absolute',
        left: `${startLeft}%`,
        top: `${startTop}%`,
        width: `${size}px`,
        height: `${size * 20}px`,
        backgroundColor: 'white',
        borderRadius: '9999px',
        boxShadow: '0 0 6px white',
        rotate: 45 + Math.random() * 10, // slight variation
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Meteor;
