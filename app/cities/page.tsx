import CityCard from '@/components/city/CityCard';
import { cities } from '@/lib/data';

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            🏙️ 도시 탐색
          </h1>
          <p className="text-gray-600">
            한국의 모든 디지털 노마드 프렌들리 도시를 둘러보세요
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="도시 이름 검색..."
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <select className="rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none">
            <option>정렬: 인기순</option>
            <option>평점 높은 순</option>
            <option>가격 낮은 순</option>
            <option>가격 높은 순</option>
          </select>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            전체
          </button>
          <button className="rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600">
            카페 많음
          </button>
          <button className="rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600">
            저렴함
          </button>
          <button className="rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600">
            교통 편리
          </button>
          <button className="rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600">
            자연 친화
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </main>
  );
}
