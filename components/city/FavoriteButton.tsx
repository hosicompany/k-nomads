'use client';

import { motion } from 'framer-motion';
import { useFavoritesStore } from '@/store/useFavoritesStore';

export interface FavoriteButtonProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-8 w-8 text-base',
  md: 'h-10 w-10 text-lg',
  lg: 'h-12 w-12 text-xl',
};

export default function FavoriteButton({
  slug,
  size = 'md',
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorited = isFavorite(slug);

  return (
    <motion.button
      className={`flex items-center justify-center rounded-full border-2 transition-all ${
        favorited
          ? 'border-red-500 bg-red-50 text-red-500'
          : 'border-gray-300 bg-white text-gray-400 hover:border-red-400 hover:text-red-400'
      } ${sizeStyles[size]}`}
      onClick={() => toggleFavorite(slug)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={favorited ? '즐겨찾기 제거' : '즐겨찾기 추가'}
    >
      <motion.span
        initial={false}
        animate={{
          scale: favorited ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {favorited ? '❤️' : '🤍'}
      </motion.span>
    </motion.button>
  );
}
