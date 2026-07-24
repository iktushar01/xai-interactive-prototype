import React from 'react';
import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  gradient?: boolean;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  gradient = false,
  delay = 0,
  as = 'h1',
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(6px)',
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-1 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block ${
            gradient
              ? 'bg-gradient-to-r from-[#4F8CFF] via-[#4DEEFF] to-[#5BFFB2] bg-clip-text text-transparent'
              : ''
          }`}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
