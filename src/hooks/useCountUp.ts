import { useState, useEffect } from 'react';

export function useCountUp(endValue: number, duration: number = 1500, startOnMount: boolean = true) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!startOnMount) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * endValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration, startOnMount]);

  return count;
}
