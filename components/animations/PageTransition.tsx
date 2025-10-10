'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeIn, shouldReduceMotion } from '@/lib/animations';

export interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const reducedMotion = shouldReduceMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeIn}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
