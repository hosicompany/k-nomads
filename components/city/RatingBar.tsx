'use client';

import { useState } from 'react';

interface RatingBarProps {
  label: string;
  icon: string;
  rating: number;
  maxRating?: number;
}

export default function RatingBar({
  label,
  icon,
  rating,
  maxRating = 5,
}: RatingBarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = (rating / maxRating) * 100;

  // 점수에 따라 색상 변경 (낮은 점수: 빨강, 중간: 노랑, 높은 점수: 초록)
  const getBarColor = () => {
    if (rating >= 4) return 'from-green-500 to-emerald-500';
    if (rating >= 3) return 'from-yellow-500 to-amber-500';
    return 'from-orange-500 to-red-500';
  };

  return (
    <div
      className="group relative flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-24 items-center gap-1 text-xs text-gray-600">
        <span>{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="flex-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out ${getBarColor()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="w-8 text-right text-sm font-semibold text-gray-900">
        {rating.toFixed(1)}
      </div>

      {/* 툴팁 */}
      {isHovered && (
        <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          {label}: {rating.toFixed(2)} / {maxRating}
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-900"></div>
        </div>
      )}
    </div>
  );
}
