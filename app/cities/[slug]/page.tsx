import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities } from '@/lib/data';
import RatingBar from '@/components/city/RatingBar';

export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

interface CityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-cyan-100">
        <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20">
          {city.rank === 1 && '🏝️'}
          {city.rank === 2 && '🌊'}
          {city.rank === 3 && '⛰️'}
          {city.rank === 4 && '🏛️'}
          {city.rank === 5 && '🍜'}
        </div>

        <div className="container relative mx-auto px-4 pt-16">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            ← 홈으로 돌아가기
          </Link>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-bold text-white">
                  #{city.rank}
                </span>
                <h1 className="text-5xl font-bold text-gray-900">
                  {city.name}
                </h1>
              </div>
              <p className="text-xl text-gray-600">{city.nameEn}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-full border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-red-500 hover:text-red-500">
                ❤️ 좋아요
              </button>
              <button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg">
                리뷰 작성
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-lg">
              <span>⭐</span>
              <span className="font-bold text-gray-900">
                {city.rating.toFixed(1)}/5.0
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2 text-lg">
              <span>❤️</span>
              <span className="font-bold text-red-500">
                {city.lovePercentage}%
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2 text-lg">
              <span>👥</span>
              <span className="font-bold text-gray-900">{city.activeNomads}명</span>
              <span className="text-gray-600">현재 거주중</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">📊 도시 평가</h2>
              </div>
              <div className="space-y-4 p-6">
                <RatingBar
                  icon="☕"
                  label="카페·작업공간"
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

            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">💬 리뷰</h2>
              </div>
              <div className="p-6">
                <div className="text-center text-gray-500">
                  <p className="text-6xl">📝</p>
                  <p className="mt-4">아직 작성된 리뷰가 없습니다.</p>
                  <button className="mt-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg">
                    첫 리뷰 작성하기
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">💰 생활비</h3>
              </div>
              <div className="p-6">
                <div className="mb-4 text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {city.costOfLiving.min}-{city.costOfLiving.max}
                  </div>
                  <div className="text-sm text-gray-600">만원/월</div>
                </div>
                <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">숙박</span>
                    <span className="font-semibold">40-80만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">식비</span>
                    <span className="font-semibold">30-50만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">교통</span>
                    <span className="font-semibold">10-20만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">기타</span>
                    <span className="font-semibold">20-30만원</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">📡 인터넷</h3>
              </div>
              <div className="p-6">
                <div className="mb-2 text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {city.internetSpeed}
                  </div>
                  <div className="text-sm text-gray-600">Mbps 평균 속도</div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>☕</span>
                    <span>24시간 카페: {city.cafes24h}곳</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">🌤️ 날씨</h3>
              </div>
              <div className="p-6 text-center">
                <div className="mb-2 text-5xl">
                  {city.weather.condition === '맑음' ? '☀️' : '☁️'}
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {city.weather.temp}°C
                </div>
                <div className="text-sm text-gray-600">{city.weather.condition}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
