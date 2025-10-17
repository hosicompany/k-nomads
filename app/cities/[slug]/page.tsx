import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { City } from '@/types';
import RatingBar from '@/components/city/RatingBar';
import CityDetailClient from '@/components/city/CityDetailClient';
import CityReviewSection from '@/components/city/CityReviewSection';

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: cities } = await supabase.from('cities').select('slug');

  return (cities || []).map((city) => ({
    slug: city.slug,
  }));
}

interface CityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CityDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!city) {
    return {
      title: '도시를 찾을 수 없습니다',
    };
  }

  return {
    title: `${city.name} (${city.name_en})`,
    description: `${city.name}의 디지털 노마드 생활 정보. 평점 ${Number(city.rating).toFixed(1)}/5.0, 생활비 ${city.cost_min}-${city.cost_max}만원/월, 인터넷 속도 ${city.internet_speed}Mbps. ${city.active_nomads}명의 노마드가 현재 거주중입니다.`,
    openGraph: {
      title: `${city.name} - K-NOMADS`,
      description: `${city.name}에서 디지털 노마드 생활을 시작하세요. 평점 ${Number(city.rating).toFixed(1)}/5.0`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: cityData } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!cityData) {
    notFound();
  }

  // Transform Supabase data to City interface
  const city: City = {
    id: cityData.id,
    rank: 0, // Will be calculated
    name: cityData.name,
    nameEn: cityData.name_en,
    slug: cityData.slug,
    image: cityData.image_url || '',
    rating: Number(cityData.rating) || 0,
    lovePercentage: cityData.love_percentage || 0,
    activeNomads: cityData.active_nomads || 0,
    ratings: cityData.ratings || { cafe: 0, housing: 0, transportation: 0, food: 0, nature: 0 },
    costOfLiving: {
      min: cityData.cost_min || 0,
      max: cityData.cost_max || 0,
    },
    internetSpeed: cityData.internet_speed || 0,
    cafes24h: cityData.cafes_24h || 0,
    weather: cityData.weather || { temp: 0, condition: '' },
  };

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
                <h1 className="text-5xl font-bold text-gray-900">
                  {city.name}
                </h1>
              </div>
              <p className="text-xl text-gray-600">{city.nameEn}</p>
            </div>

            <CityDetailClient slug={city.slug} cityName={city.name} />
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

            <CityReviewSection
              city={city}
              initialReviews={[]}
            />
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
