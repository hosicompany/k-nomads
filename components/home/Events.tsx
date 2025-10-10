import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
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
      networking: 'bg-blue-100 text-blue-600',
      meetup: 'bg-green-100 text-green-600',
      workshop: 'bg-purple-100 text-purple-600',
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-6 sm:mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              📅 이번주 밋업 & 이벤트
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              노마드들과 함께하는 네트워킹 기회
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="group overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-all hover:border-blue-400 hover:shadow-lg"
            >
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="flex-1 text-lg font-bold text-gray-900">
                    {event.title}
                  </h3>
                  <span
                    className={`ml-2 rounded-full px-3 py-1 text-xs font-semibold ${getTypeColor(event.type)}`}
                  >
                    {getTypeLabel(event.type)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{event.cityName}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                  <span>📅</span>
                  <span>{formatDate(event.date)}</span>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600">참가자</span>
                    <span className="font-semibold text-gray-900">
                      {event.participants}/{event.maxParticipants}명
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                      style={{
                        width: `${(event.participants / event.maxParticipants) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <Button variant="primary" size="md" fullWidth>
                  참여하기
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <Button variant="secondary" size="md">
            모든 이벤트 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
