import { useState, useCallback, MouseEvent } from 'react';

export function useMouseTilt(maxRotation = 12) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    setRotation({ rotateX, rotateY });
  }, [maxRotation]);

  const handleMouseLeave = useCallback(() => {
    setRotation({ rotateX: 0, rotateY: 0 });
  }, []);

  return {
    rotation,
    tiltProps: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: {
        transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      },
    },
  };
}
