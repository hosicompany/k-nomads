import Link from 'next/link';
import RatingBar from './RatingBar';
import { City } from '@/types';

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <div className="luxury-card group overflow-hidden rounded-2xl transition-all hover:scale-[1.02] hover:luxury-glow">
      <div className="relative">
        <div className="flex items-center justify-between border-b border-gold/30 bg-gradient-to-r from-luxury-black to-[#0f0f0f] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="luxury-button rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider">
              #{city.rank}
            </span>
            <h3 className="text-xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
              {city.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>❤️</span>
            <span className="font-bold text-gold">
              {city.lovePercentage}%
            </span>
          </div>
        </div>

        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-luxury-black via-[#1a1a1a] to-luxury-black">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 70%)'
          }}></div>
          <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-40 blur-sm">
            {city.rank === 1 && '🏝️'}
            {city.rank === 2 && '🌊'}
            {city.rank === 3 && '⛰️'}
            {city.rank === 4 && '🏛️'}
            {city.rank === 5 && '🍜'}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-7xl">
            {city.rank === 1 && '🏝️'}
            {city.rank === 2 && '🌊'}
            {city.rank === 3 && '⛰️'}
            {city.rank === 4 && '🏛️'}
            {city.rank === 5 && '🍜'}
          </div>
        </div>

        <div className="border-b border-gold/30 bg-luxury-black/80 px-5 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                {city.rating.toFixed(1)}/5.0
              </span>
            </div>
            <div className="flex items-center gap-2 text-gold-light">
              <span>👥</span>
              <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                {city.activeNomads}명
              </span>
              <span>거주중</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-5">
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

      <div className="border-t border-gold/30 bg-luxury-black/60 px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
            💰 {city.costOfLiving.min}-{city.costOfLiving.max}만원/월
          </span>
        </div>
        <div className="text-xs text-gold-light">
          📡 {city.internetSpeed}Mbps · 24h카페 {city.cafes24h}곳
        </div>
      </div>

      <div className="flex gap-3 border-t border-gold/30 p-5">
        <Link
          href={`/cities/${city.slug}`}
          className="luxury-button flex-1 rounded-lg py-3 text-center text-sm font-bold uppercase tracking-wider"
        >
          자세히
        </Link>
        <button className="flex-1 rounded-lg border-2 border-gold bg-transparent py-3 text-sm font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-luxury-black">
          리뷰쓰기
        </button>
      </div>
    </div>
  );
}
