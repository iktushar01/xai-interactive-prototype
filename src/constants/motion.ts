/**
 * Motion System Design Tokens and Variants
 * Inspired by Linear, Vercel, Stripe, and Apple Vision Pro.
 */

export const TRANSITION_TIMINGS = {
  instant: 0.15,
  fast: 0.22,
  card: 0.3,
  section: 0.6,
  hero: 1.1,
};

export const EASINGS = {
  // Production-grade custom bezier curves
  standard: [0.21, 0.47, 0.32, 0.98] as const,
  decelerate: [0.0, 0.0, 0.2, 1.0] as const,
  accelerate: [0.4, 0.0, 1.0, 1.0] as const,
  springy: [0.34, 1.56, 0.64, 1.0] as const,
};

export const SPRINGS = {
  tight: { type: 'spring' as const, stiffness: 300, damping: 25 },
  cardHover: { type: 'spring' as const, stiffness: 220, damping: 20 },
  smooth: { type: 'spring' as const, stiffness: 140, damping: 18 },
  hero: { type: 'spring' as const, stiffness: 90, damping: 15 },
};

export const motionVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: TRANSITION_TIMINGS.section,
        delay: custom * 0.1,
        ease: EASINGS.standard,
      },
    }),
  },
  
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: TRANSITION_TIMINGS.card,
        ease: EASINGS.standard,
      },
    },
  },

  cardHover: {
    rest: { y: 0, scale: 1, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' },
    hover: {
      y: -8,
      scale: 1.015,
      transition: SPRINGS.cardHover,
    },
    tap: {
      y: -2,
      scale: 0.99,
      transition: SPRINGS.tight,
    },
  },

  buttonPress: {
    rest: { scale: 1 },
    hover: { scale: 1.03, transition: SPRINGS.tight },
    tap: { scale: 0.96, transition: SPRINGS.tight },
  },
};
