import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.onclick !== null ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') !== null ||
          target.closest('a') !== null;
        setIsPointer(Boolean(isClickable));
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ambient electric halo ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${
            isPointer ? 1.5 : 1
          })`,
        }}
      >
        <div className="w-10 h-10 rounded-full border border-[#4F8CFF]/40 bg-[#4F8CFF]/5 backdrop-blur-[1px] shadow-[0_0_12px_rgba(79,140,255,0.2)]" />
      </div>

      {/* Center glowing precision dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#4DEEFF] shadow-[0_0_8px_#4DEEFF]" />
      </div>
    </>
  );
};
