import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { totalMembers, totalCities, activeNow } from '@/lib/data';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Badge - 반응형 크기 */}
          <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-600 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            🇰🇷 Made for Korea
          </div>

          {/* Title - 반응형 타이포그래피 */}
          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              K-NOMADS
            </span>
          </h1>

          {/* Subtitle - 반응형 텍스트 */}
          <p className="mb-6 text-lg text-gray-600 sm:mb-8 sm:text-xl md:text-2xl">
            한국에서 시작하는 디지털 노마드 라이프
          </p>

          {/* Search Bar */}
          <div className="mb-6 flex justify-center sm:mb-8">
            <SearchBar />
          </div>

          {/* Buttons - 공통 컴포넌트 사용 */}
          <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-8 sm:flex-row sm:gap-4">
            <Button variant="primary" size="lg">
              지금 시작하기
            </Button>
            <Button variant="secondary" size="lg">
              둘러보기
            </Button>
          </div>

          {/* Stats - 반응형 레이아웃 */}
          <div className="flex flex-col items-center justify-center gap-3 text-xs text-gray-600 sm:flex-row sm:flex-wrap sm:gap-6 sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">👥</span>
              <span className="font-semibold text-gray-900">
                {totalMembers.toLocaleString()}
              </span>
              <span>회원</span>
            </div>
            <span className="hidden text-gray-300 sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">🏙️</span>
              <span className="font-semibold text-gray-900">{totalCities}개</span>
              <span>도시</span>
            </div>
            <span className="hidden text-gray-300 sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">📍</span>
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
