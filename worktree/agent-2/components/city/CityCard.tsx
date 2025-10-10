import Link from 'next/link';
import RatingBar from './RatingBar';
import { City } from '@/types';

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm transition-all hover:border-blue-400 hover:shadow-xl">
      <div className="relative">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
              #{city.rank}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span>❤️</span>
            <span className="font-semibold text-red-500">
              {city.lovePercentage}%
            </span>
          </div>
        </div>

        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
            {city.rank === 1 && '🏝️'}
            {city.rank === 2 && '🌊'}
            {city.rank === 3 && '⛰️'}
            {city.rank === 4 && '🏛️'}
            {city.rank === 5 && '🍜'}
          </div>
        </div>

        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
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

      <div className="space-y-2 p-4">
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

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-900">
            💰 {city.costOfLiving.min}-{city.costOfLiving.max}만원/월
          </span>
        </div>
        <div className="text-xs text-gray-600">
          📡 {city.internetSpeed}Mbps · 24h카페 {city.cafes24h}곳
        </div>
      </div>

      <div className="flex gap-2 border-t border-gray-200 p-4">
        <Link
          href={`/cities/${city.slug}`}
          className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 py-2 text-center text-sm font-semibold text-white transition-all hover:shadow-lg"
        >
          자세히
        </Link>
        <button className="flex-1 rounded-lg border-2 border-gray-300 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600">
          리뷰쓰기
        </button>
      </div>
    </div>
  );
}
