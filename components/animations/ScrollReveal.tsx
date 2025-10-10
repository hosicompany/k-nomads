'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { slideUp, shouldReduceMotion } from '@/lib/animations';

export interface ScrollRevealProps {
  children: ReactNode;
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reducedMotion = shouldReduceMotion();

  if (reducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={slideUp}
    >
      {children}
    </motion.div>
  );
}
