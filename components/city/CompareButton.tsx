'use client';

import { motion } from 'framer-motion';
import { useCompareStore } from '@/store/useCompareStore';

export interface CompareButtonProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-8 w-8 text-base',
  md: 'h-10 w-10 text-lg',
  lg: 'h-12 w-12 text-xl',
};

export default function CompareButton({
  slug,
  size = 'md',
}: CompareButtonProps) {
  const { isInCompare, toggleCompare, isFull } = useCompareStore();
  const inCompare = isInCompare(slug);
  const full = isFull();

  const handleClick = () => {
    const success = toggleCompare(slug);
    if (!success && !inCompare) {
      alert('최대 3개의 도시만 비교할 수 있습니다.');
    }
  };

  return (
    <motion.button
      className={`flex items-center justify-center rounded-full border-2 transition-all ${
        inCompare
          ? 'border-blue-500 bg-blue-50 text-blue-500'
          : full
            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-400'
      } ${sizeStyles[size]}`}
      onClick={handleClick}
      disabled={full && !inCompare}
      whileHover={!full || inCompare ? { scale: 1.1 } : undefined}
      whileTap={!full || inCompare ? { scale: 0.9 } : undefined}
      aria-label={inCompare ? '비교에서 제거' : '비교에 추가'}
    >
      <motion.span
        initial={false}
        animate={{
          scale: inCompare ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {inCompare ? '✓' : '⚖️'}
      </motion.span>
    </motion.button>
  );
}
