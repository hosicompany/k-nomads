import CityCard from '@/components/city/CityCard';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { cities } from '@/lib/data';

export default function HotCities() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-between sm:mb-8">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                🔥 이번달 HOT 도시
              </h2>
              <p className="text-sm text-gray-600 sm:text-base">
                가장 많은 노마드들이 선택한 인기 도시
              </p>
            </div>
            <div className="hidden md:block">
              <Button variant="ghost" size="sm">
                전체보기 →
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-8 md:hidden">
          <Button variant="ghost" size="sm">
            전체보기 →
          </Button>
        </div>
      </div>
    </section>
  );
}
