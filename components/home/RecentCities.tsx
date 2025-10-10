'use client';

import { useRecentStore } from '@/store/useRecentStore';
import { cities } from '@/lib/data';
import CityCard from '@/components/city/CityCard';

export default function RecentCities() {
  const { getRecentSlugs } = useRecentStore();
  const recentSlugs = getRecentSlugs();

  const recentCities = cities.filter((city) => recentSlugs.includes(city.slug));

  if (recentCities.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            🕐 최근 본 도시
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            최근에 살펴본 도시들을 다시 확인해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentCities.slice(0, 4).map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
