import { Variants } from 'framer-motion';

// prefers-reduced-motion 감지
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Fade In 애니메이션
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Slide Up 애니메이션
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Scale on Hover 애니메이션
export const scaleOnHover = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.2,
    },
  },
};

// Stagger Container 애니메이션
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger Item 애니메이션
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// reduced motion 설정 시 애니메이션 비활성화
export function getAnimationProps(variants: Variants) {
  if (shouldReduceMotion()) {
    return {
      initial: false,
      animate: false,
      exit: false,
    };
  }
  return {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants,
  };
}
