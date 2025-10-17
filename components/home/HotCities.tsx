import CityCard from '@/components/city/CityCard';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { createClient } from '@/lib/supabase/server';
import { City } from '@/types';

export default async function HotCities() {
  const supabase = await createClient();

  // Fetch cities from Supabase, ordered by rating
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .order('rating', { ascending: false });

  // Transform Supabase data to match City interface
  const transformedCities: City[] = (cities || []).map((city) => ({
    id: city.id,
    rank: 0, // Will be calculated based on order
    name: city.name,
    nameEn: city.name_en,
    slug: city.slug,
    image: city.image_url || '',
    rating: Number(city.rating) || 0,
    lovePercentage: city.love_percentage || 0,
    activeNomads: city.active_nomads || 0,
    ratings: (city.ratings as { cafe: number; housing: number; transportation: number; food: number; nature: number } | null) || { cafe: 0, housing: 0, transportation: 0, food: 0, nature: 0 },
    costOfLiving: {
      min: city.cost_min || 0,
      max: city.cost_max || 0,
    },
    internetSpeed: city.internet_speed || 0,
    cafes24h: city.cafes_24h || 0,
    weather: (city.weather as { temp: number; condition: string } | null) || { temp: 0, condition: '' },
  })).map((city, index) => ({ ...city, rank: index + 1 }));

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
          {transformedCities.map((city) => (
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
