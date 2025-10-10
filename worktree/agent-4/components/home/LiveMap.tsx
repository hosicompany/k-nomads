export default function LiveMap() {
  return (
    <section className="border-t border-gold/30 bg-luxury-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
            🗺️ 실시간 프리미엄 로케이션
          </h2>
          <p className="text-lg text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            지금 이 순간, 한국에서 활동중인 엘리트 디지털 노마드들
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl luxury-card">
          <div className="relative h-[28rem] bg-gradient-to-br from-luxury-black via-[#1a1a1a] to-luxury-black">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)'
            }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-6 text-8xl opacity-50 blur-sm">🗾</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="mb-6 text-8xl">🗾</div>
                </div>
                <p className="mt-24 text-2xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                  한국 프리미엄 로케이션 맵
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-3 rounded-full border border-gold/40 bg-luxury-black/80 px-6 py-3 backdrop-blur-sm">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-gold"></span>
                    <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>제주 156명</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-gold/40 bg-luxury-black/80 px-6 py-3 backdrop-blur-sm">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-gold"></span>
                    <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>부산 203명</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-gold/40 bg-luxury-black/80 px-6 py-3 backdrop-blur-sm">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-gold"></span>
                    <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>강릉 87명</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
