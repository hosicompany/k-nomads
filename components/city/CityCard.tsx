'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import RatingBar from './RatingBar';
import Button from '@/components/ui/Button';
import FavoriteButton from './FavoriteButton';
import CompareButton from './CompareButton';
import { City } from '@/types';
import { scaleOnHover } from '@/lib/animations';

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <motion.div
      className="group overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm transition-all hover:border-blue-400 hover:shadow-xl"
      whileHover={scaleOnHover.hover}
      whileTap={scaleOnHover.tap}
    >
      <div className="relative">
        {/* Header - 반응형 여백 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-2 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white sm:px-3 sm:py-1">
              #{city.rank}
            </span>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">{city.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <span>❤️</span>
            <span className="font-semibold text-red-500">
              {city.lovePercentage}%
            </span>
          </div>
        </div>

        {/* Image - 반응형 높이 */}
        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 sm:h-48">
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 sm:text-6xl">
            {city.rank === 1 && '🏝️'}
            {city.rank === 2 && '🌊'}
            {city.rank === 3 && '⛰️'}
            {city.rank === 4 && '🏛️'}
            {city.rank === 5 && '🍜'}
          </div>
          {/* Favorite & Compare Buttons */}
          <div className="absolute right-2 top-2 flex gap-2 sm:right-3 sm:top-3">
            <CompareButton slug={city.slug} size="sm" />
            <FavoriteButton slug={city.slug} size="sm" />
          </div>
        </div>

        {/* Stats - 반응형 여백 */}
        <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 sm:px-4">
          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span className="font-semibold text-gray-900">
                {city.rating.toFixed(1)}/5.0
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span>👥</span>
              <span className="font-semibold text-gray-900">
                {city.activeNomads}명
              </span>
              <span>거주중</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings - 반응형 여백 */}
      <div className="space-y-2 p-3 sm:p-4">
        <RatingBar
          icon="☕"
          label="카페·작업"
          rating={city.ratings.cafe}
        />
        <RatingBar
          icon="🏠"
          label="주거·숙박"
          rating={city.ratings.housing}
        />
        <RatingBar
          icon="🚗"
          label="교통·이동"
          rating={city.ratings.transportation}
        />
        <RatingBar
          icon="🍜"
          label="음식·배달"
          rating={city.ratings.food}
        />
        <RatingBar
          icon="🌿"
          label="자연·환경"
          rating={city.ratings.nature}
        />
      </div>

      {/* Cost Info - 반응형 텍스트 */}
      <div className="border-t border-gray-200 bg-gray-50 px-3 py-2 sm:px-4 sm:py-3">
        <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-gray-900">
            💰 {city.costOfLiving.min}-{city.costOfLiving.max}만원/월
          </span>
        </div>
        <div className="text-xs text-gray-600">
          📡 {city.internetSpeed}Mbps · 24h카페 {city.cafes24h}곳
        </div>
      </div>

      {/* Buttons - 공통 Button 컴포넌트 사용 */}
      <div className="flex flex-col gap-2 border-t border-gray-200 p-3 sm:flex-row sm:p-4">
        <Link href={`/cities/${city.slug}`} className="flex-1">
          <Button variant="primary" size="md" fullWidth>
            자세히 보기
          </Button>
        </Link>
        <Button variant="secondary" size="md" fullWidth>
          리뷰 쓰기
        </Button>
      </div>
    </motion.div>
  );
}
