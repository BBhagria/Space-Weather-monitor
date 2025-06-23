import { motion, useTransform } from 'framer-motion';

const Meteor = ({ index, scrollYProgress }) => {
  const x = useTransform(scrollYProgress, [0, 1], [200 + index * 50, -1000 - index * 50]);
  const y = useTransform(scrollYProgress, [0, 1], [-100 - index * 30, 1000 + index * 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 0]);

  const left = `${80 + Math.random() * 20}%`;
  const top = `${-10 + Math.random() * 10}%`;
  const size = Math.random() * 2 + 1;

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
        position: 'absolute',
        left,
        top,
        width: `${size}px`,
        height: `${size * 20}px`,
        backgroundColor: 'white',
        borderRadius: '9999px',
        boxShadow: '0 0 6px white',
        rotate: -45,
        zIndex: 1,
      }}
    />
  );
};

export default Meteor;
