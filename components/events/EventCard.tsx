import Link from 'next/link';
import { Event } from '@/types';

export interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const spotsLeft = event.capacity - event.registered;
  const isFull = spotsLeft <= 0;

  return (
    <Link
      href={`/events/${event.id}`}
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-400 hover:shadow-lg"
    >
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              event.type === 'networking'
                ? 'bg-blue-100 text-blue-700'
                : event.type === 'workshop'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-100 text-purple-700'
            }`}
          >
            {event.type === 'networking'
              ? '🤝 네트워킹'
              : event.type === 'workshop'
                ? '📚 워크샵'
                : '☕ 밋업'}
          </span>
          {isFull && (
            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
              마감
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
          {event.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{event.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span>
            <span>
              {event.registered}/{event.capacity}명
              {!isFull && (
                <span className="ml-1 text-green-600">
                  ({spotsLeft}자리 남음)
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
