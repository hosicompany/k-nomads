import CityCard from '@/components/city/CityCard';
import { cities } from '@/lib/data';

export default function HotCities() {
  return (
    <section className="border-t border-gold/30 bg-gradient-to-b from-luxury-black to-[#0f0f0f] py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-3 text-4xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
              🔥 이번달 프리미엄 도시
            </h2>
            <p className="text-lg text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              가장 많은 노마드들이 선택한 럭셔리 라이프스타일
            </p>
          </div>
          <button className="hidden rounded-full border-2 border-gold px-6 py-2 text-sm font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-luxury-black md:block">
            전체보기 →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <button className="rounded-full border-2 border-gold px-8 py-3 text-sm font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-luxury-black">
            전체보기 →
          </button>
        </div>
      </div>
    </section>
  );
}
