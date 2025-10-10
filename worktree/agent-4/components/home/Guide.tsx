export default function Guide() {
  const guides = [
    {
      icon: '🎒',
      title: '프리미엄 시작 가이드',
      description: '엘리트 디지털 노마드로 살아가기 위한 첫 걸음',
      gradient: 'from-gold-dark via-gold to-gold-light',
    },
    {
      icon: '💼',
      title: '비자 & 체류 정보',
      description: '한국에서 합법적으로 체류하는 프리미엄 방법',
      gradient: 'from-gold-dark via-gold to-gold-light',
    },
    {
      icon: '🏠',
      title: '럭셔리 숙소 찾기',
      description: '장기 체류에 적합한 프리미엄 숙소 가이드',
      gradient: 'from-gold-dark via-gold to-gold-light',
    },
    {
      icon: '💳',
      title: '스마트 투자 전략',
      description: '최적의 비용으로 최고의 경험 얻기',
      gradient: 'from-gold-dark via-gold to-gold-light',
    },
  ];

  return (
    <section className="border-t border-gold/30 bg-luxury-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
            📚 프리미엄 가이드
          </h2>
          <p className="text-lg text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            성공적인 럭셔리 노마드 라이프를 위한 필수 정보
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="luxury-card group cursor-pointer overflow-hidden rounded-2xl transition-all hover:luxury-glow hover:scale-[1.05]"
            >
              <div
                className={`bg-gradient-to-br ${guide.gradient} relative overflow-hidden p-8 text-center transition-transform group-hover:scale-105`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative mb-3 text-6xl drop-shadow-2xl">{guide.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                  {guide.title}
                </h3>
                <p className="mb-4 text-sm text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  {guide.description}
                </p>
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-gold">
                  <span>자세히 보기</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
