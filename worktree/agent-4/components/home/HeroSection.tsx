import SearchBar from '@/components/ui/SearchBar';
import { totalMembers, totalCities, activeNow } from '@/lib/data';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-luxury-black via-[#0f0f0f] to-luxury-black py-24">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)'
      }}></div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 inline-block rounded-full border-2 border-gold/50 bg-luxury-black/80 px-6 py-3 backdrop-blur-sm">
            <span className="text-sm font-bold uppercase tracking-widest text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
              🇰🇷 Premium Korean Experience
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-black leading-tight md:text-7xl lg:text-8xl" style={{fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em'}}>
            <span className="luxury-gradient bg-clip-text text-transparent luxury-text-shadow">
              K-NOMADS
            </span>
          </h1>

          <p className="mb-10 text-2xl font-medium text-gold-light md:text-3xl" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            한국에서 시작하는 프리미엄 디지털 노마드 라이프
          </p>

          <div className="mb-10 flex justify-center">
            <SearchBar />
          </div>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="luxury-button rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest shadow-2xl">
              지금 시작하기
            </button>
            <button className="rounded-full border-2 border-gold bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-luxury-black hover:shadow-2xl">
              둘러보기
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3 rounded-full border border-gold/30 bg-luxury-black/60 px-6 py-3 backdrop-blur-sm">
              <span className="text-2xl">👥</span>
              <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                {totalMembers.toLocaleString()}
              </span>
              <span className="text-gold-light">회원</span>
            </div>
            <div className="h-8 w-px bg-gold/30"></div>
            <div className="flex items-center gap-3 rounded-full border border-gold/30 bg-luxury-black/60 px-6 py-3 backdrop-blur-sm">
              <span className="text-2xl">🏙️</span>
              <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                {totalCities}개
              </span>
              <span className="text-gold-light">도시</span>
            </div>
            <div className="h-8 w-px bg-gold/30"></div>
            <div className="flex items-center gap-3 rounded-full border border-gold/30 bg-luxury-black/60 px-6 py-3 backdrop-blur-sm">
              <span className="text-2xl">📍</span>
              <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                {activeNow}명
              </span>
              <span className="text-gold-light">활동중</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
    </section>
  );
}
