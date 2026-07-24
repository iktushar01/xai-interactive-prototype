import React from 'react';
import { motion } from 'motion/react';
import { useMagnetic } from '../../hooks/useMagnetic';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  magnetic?: boolean;
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  magnetic = true,
  glow = false,
  className = '',
  onClick,
  ...props
}) => {
  const { ref, position } = useMagnetic<HTMLButtonElement>({
    strength: magnetic ? 0.25 : 0,
    radius: 80,
  });

  const baseStyles = "relative inline-flex items-center justify-center font-medium tracking-tight rounded-lg transition-all duration-200 cursor-pointer select-none overflow-hidden active:scale-95";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  }[size];

  const variantStyles = {
    primary: "bg-[#4F8CFF] text-white hover:bg-[#3D78EB] shadow-[0_0_24px_rgba(79,140,255,0.35)] hover:shadow-[0_0_32px_rgba(79,140,255,0.5)] border border-[#6EA0FF]",
    secondary: "bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)]",
    glass: "bg-[var(--bg-pill)] text-[var(--text-primary)] backdrop-blur-md border border-[var(--border-subtle)] hover:border-[var(--border-hover)]",
    ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]",
  }[variant];


  return (
    <motion.button
      ref={ref}
      style={{
        x: position.x,
        y: position.y,
      }}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      {...(props as any)}
    >
      {glow && (
        <span className="absolute -inset-px rounded-lg bg-gradient-to-r from-[#4F8CFF] to-[#4DEEFF] opacity-0 hover:opacity-25 transition-opacity blur-sm" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
      </span>
    </motion.button>
  );
};
