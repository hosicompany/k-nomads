import CityCard from '@/components/city/CityCard';
import { cities } from '@/lib/data';

export default function HotCities() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              🔥 이번달 HOT 도시
            </h2>
            <p className="text-gray-600">
              가장 많은 노마드들이 선택한 인기 도시
            </p>
          </div>
          <button className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 md:block">
            전체보기 →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            전체보기 →
          </button>
        </div>
      </div>
    </section>
  );
}
