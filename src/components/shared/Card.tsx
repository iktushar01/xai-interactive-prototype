import React from 'react';
import { motion } from 'motion/react';
import { useMouseTilt } from '../../hooks/useMouseTilt';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glowOnHover?: boolean;
  accentBorder?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  tilt = false,
  glowOnHover = true,
  accentBorder = false,
  onClick,
  id,
}) => {
  const { tiltProps } = useMouseTilt(8);

  const baseClasses = `relative rounded-xl bg-[var(--bg-card)] border transition-all duration-300 ${
    accentBorder ? 'border-[var(--accent-blue)]/30' : 'border-[var(--border-subtle)]'
  } ${glowOnHover ? 'hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card)]' : ''}`;

  return (
    <motion.div
      id={id}
      {...(tilt ? tiltProps : {})}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {/* Corner subtle light accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#4F8CFF]/5 via-transparent to-transparent pointer-events-none rounded-tr-xl" />
      {children}
    </motion.div>
  );
};

