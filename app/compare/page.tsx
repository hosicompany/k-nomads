'use client';

import { useCompareStore } from '@/store/useCompareStore';
import { cities } from '@/lib/data';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import RatingBar from '@/components/city/RatingBar';

export default function ComparePage() {
  const { compareCities, clearCompare } = useCompareStore();

  const selectedCities = cities.filter((city) =>
    compareCities.includes(city.slug)
  );

  if (selectedCities.length < 2) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="mb-4 text-6xl">⚖️</div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              비교할 도시를 선택해주세요
            </h1>
            <p className="mb-6 text-gray-600">
              최소 2개, 최대 3개의 도시를 선택하여 비교할 수 있습니다.
            </p>
            <Link href="/cities">
              <Button variant="primary" size="md">
                도시 둘러보기
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              ⚖️ 도시 비교
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              {selectedCities.length}개 도시를 비교하고 있습니다
            </p>
          </div>
          <Button variant="secondary" size="md" onClick={clearCompare}>
            비교 초기화
          </Button>
        </div>

        {/* 비교 테이블 */}
        <div className="overflow-x-auto">
          <div className="grid min-w-[640px] grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedCities.map((city) => (
              <div
                key={city.slug}
                className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm"
              >
                {/* 헤더 */}
                <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                      #{city.rank}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {city.name}
                  </h2>
                  <p className="text-sm text-gray-600">{city.nameEn}</p>
                </div>

                {/* 기본 정보 */}
                <div className="space-y-4 p-4">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-700">
                      ⭐ 전체 평점
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {city.rating.toFixed(1)}/5.0
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-700">
                      💰 생활비
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {city.costOfLiving.min}-{city.costOfLiving.max}만원/월
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-700">
                      📡 인터넷 속도
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {city.internetSpeed}Mbps
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-700">
                      👥 활동 노마드
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {city.activeNomads}명
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-700">
                      ☕ 24시간 카페
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {city.cafes24h}곳
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-700">
                      🌤️ 날씨
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {city.weather.temp}°C · {city.weather.condition}
                    </p>
                  </div>

                  {/* 세부 평점 */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">
                      📊 세부 평점
                    </h3>
                    <div className="space-y-2">
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
                  </div>

                  {/* 상세 보기 버튼 */}
                  <Link href={`/cities/${city.slug}`}>
                    <Button variant="primary" size="md" fullWidth>
                      상세 보기
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
