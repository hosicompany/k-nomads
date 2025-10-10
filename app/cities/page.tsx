'use client';

import { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import CityCard from '@/components/city/CityCard';
import FilterPanel from '@/components/filters/FilterPanel';
import EmptyState from '@/components/filters/EmptyState';
import { cities } from '@/lib/data';
import { useFilterParams } from '@/hooks/useFilterParams';
import { applyFilters } from '@/lib/filters';
import { staggerContainer, staggerItem } from '@/lib/animations';

function CitiesContent() {
  const { filters, updateFilters, resetFilters, hasActiveFilters } =
    useFilterParams();

  // 필터링된 도시 목록 (메모이제이션)
  const filteredCities = useMemo(() => {
    return applyFilters(cities, filters);
  }, [filters]);

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            🏙️ 도시 탐색
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            한국의 모든 디지털 노마드 프렌들리 도시를 둘러보세요
          </p>
        </div>

        {/* 레이아웃: 필터 패널 + 도시 목록 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* 필터 패널 (왼쪽) */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={updateFilters}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
              resultCount={filteredCities.length}
            />
          </div>

          {/* 도시 목록 (오른쪽) */}
          <div className="lg:col-span-3">
            {filteredCities.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filteredCities.map((city) => (
                  <motion.div key={city.id} variants={staggerItem}>
                    <CityCard city={city} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CitiesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6 sm:mb-8">
              <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                🏙️ 도시 탐색
              </h1>
              <p className="text-sm text-gray-600 sm:text-base">
                한국의 모든 디지털 노마드 프렌들리 도시를 둘러보세요
              </p>
            </div>
            <div className="flex items-center justify-center py-12">
              <div className="text-center text-gray-500">로딩 중...</div>
            </div>
          </div>
        </main>
      }
    >
      <CitiesContent />
    </Suspense>
  );
}
