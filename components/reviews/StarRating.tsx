'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({
  rating,
  onChange,
  readonly = false,
  size = 'md',
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const displayRating = hoverRating || rating;

  const handleClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <motion.button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          onMouseEnter={() => !readonly && setHoverRating(value)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`${sizeClasses[size]} ${
            readonly ? 'cursor-default' : 'cursor-pointer'
          } transition-transform ${!readonly && 'hover:scale-110'}`}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          disabled={readonly}
        >
          <span
            className={
              value <= displayRating ? 'text-yellow-400' : 'text-gray-300'
            }
          >
            ⭐
          </span>
        </motion.button>
      ))}
      {!readonly && (
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {displayRating > 0 ? `${displayRating}.0` : '선택해주세요'}
        </span>
      )}
    </div>
  );
}
