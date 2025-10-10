import { events } from '@/lib/data';

export default function Events() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }).format(date);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      networking: '네트워킹',
      meetup: '밋업',
      workshop: '워크샵',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      networking: 'luxury-button',
      meetup: 'luxury-button',
      workshop: 'luxury-button',
    };
    return colors[type] || 'luxury-button';
  };

  return (
    <section className="border-t border-gold/30 bg-gradient-to-b from-[#0f0f0f] to-luxury-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-3 text-4xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
            📅 이번주 프리미엄 이벤트
          </h2>
          <p className="text-lg text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            엘리트 노마드들과 함께하는 럭셔리 네트워킹
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="luxury-card group overflow-hidden rounded-2xl transition-all hover:luxury-glow hover:scale-[1.02]"
            >
              <div className="border-b border-gold/30 bg-gradient-to-r from-luxury-black to-[#0f0f0f] p-5">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="flex-1 text-xl font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                    {event.title}
                  </h3>
                  <span
                    className={`ml-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${getTypeColor(event.type)}`}
                  >
                    {getTypeLabel(event.type)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gold-light">
                  <span>📍</span>
                  <span style={{fontFamily: 'Cormorant Garamond, serif'}}>{event.cityName}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-5 flex items-center gap-2 text-sm text-gold-light">
                  <span>📅</span>
                  <span style={{fontFamily: 'Cormorant Garamond, serif'}}>{formatDate(event.date)}</span>
                </div>

                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>참가자</span>
                    <span className="font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
                      {event.participants}/{event.maxParticipants}명
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full border border-gold/20 bg-luxury-black/60">
                    <div
                      className="luxury-gradient h-full transition-all"
                      style={{
                        width: `${(event.participants / event.maxParticipants) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <button className="luxury-button w-full rounded-lg py-3 text-sm font-bold uppercase tracking-wider">
                  참여하기
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="rounded-full border-2 border-gold bg-transparent px-8 py-3 font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-luxury-black hover:shadow-2xl">
            모든 이벤트 보기
          </button>
        </div>
      </div>
    </section>
  );
}
