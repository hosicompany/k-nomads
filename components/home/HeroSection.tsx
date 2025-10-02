import SearchBar from '@/components/ui/SearchBar';
import { totalMembers, totalCities, activeNow } from '@/lib/data';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            🇰🇷 Made for Korea
          </div>

          <h1 className="mb-4 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              K-NOMADS
            </span>
          </h1>

          <p className="mb-8 text-xl text-gray-600 md:text-2xl">
            한국에서 시작하는 디지털 노마드 라이프
          </p>

          <div className="mb-8 flex justify-center">
            <SearchBar />
          </div>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              지금 시작하기
            </button>
            <button className="rounded-full border-2 border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600">
              둘러보기
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-lg">👥</span>
              <span className="font-semibold text-gray-900">
                {totalMembers.toLocaleString()}
              </span>
              <span>회원</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">🏙️</span>
              <span className="font-semibold text-gray-900">{totalCities}개</span>
              <span>도시</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="font-semibold text-gray-900">
                {activeNow}명
              </span>
              <span>활동중</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </section>
  );
}
