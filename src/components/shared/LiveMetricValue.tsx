import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveMetricValueProps {
  baseValue: string;
  className?: string;
}

export const LiveMetricValue: React.FC<LiveMetricValueProps> = ({
  baseValue,
  className = '',
}) => {
  const [displayVal, setDisplayVal] = useState(baseValue);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 500);

      if (baseValue.endsWith('M')) {
        const num = parseFloat(baseValue);
        const delta = (Math.random() - 0.48) * 0.08;
        setDisplayVal(`${(num + delta).toFixed(2)}M`);
      } else if (baseValue.endsWith('%')) {
        const num = parseFloat(baseValue);
        const delta = (Math.random() - 0.48) * 0.08;
        setDisplayVal(`${Math.min(99.99, Math.max(98.0, num + delta)).toFixed(2)}%`);
      } else if (baseValue.includes(',')) {
        const num = parseInt(baseValue.replace(/,/g, ''), 10);
        const delta = Math.floor((Math.random() - 0.45) * 8);
        setDisplayVal((num + delta).toLocaleString());
      } else if (!isNaN(parseFloat(baseValue))) {
        const num = parseFloat(baseValue);
        const delta = (Math.random() - 0.48) * 0.2;
        setDisplayVal(`${(num + delta).toFixed(1)}`);
      }

      return () => clearTimeout(timer);
    }, 2200 + Math.random() * 1500);

    return () => clearInterval(interval);
  }, [baseValue]);

  return (
    <span className={`inline-flex items-baseline transition-colors duration-300 ${pulse ? 'text-[#4DEEFF]' : ''} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayVal}
          initial={{ opacity: 0.7, y: -1 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.7, y: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {displayVal}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
