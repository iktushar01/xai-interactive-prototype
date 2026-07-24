import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'success' | 'purple' | 'muted';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    blue: 'bg-[#4F8CFF]/10 text-[#4F8CFF] border-[#4F8CFF]/25',
    cyan: 'bg-[#4DEEFF]/10 text-[#4DEEFF] border-[#4DEEFF]/25',
    success: 'bg-[#5BFFB2]/10 text-[#5BFFB2] border-[#5BFFB2]/25',
    purple: 'bg-[#8B7CFF]/10 text-[#8B7CFF] border-[#8B7CFF]/25',
    muted: 'bg-white/5 text-[#9BA4B5] border-white/10',
  }[variant];

  const dotColors = {
    blue: 'bg-[#4F8CFF]',
    cyan: 'bg-[#4DEEFF]',
    success: 'bg-[#5BFFB2]',
    purple: 'bg-[#8B7CFF]',
    muted: 'bg-[#9BA4B5]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border uppercase tracking-wider whitespace-nowrap ${variantStyles} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors} animate-pulse`} />
      )}
      {children}
    </span>
  );
};
