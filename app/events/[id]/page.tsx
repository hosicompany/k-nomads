import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Event } from '@/types';
import EventDetailClient from '@/components/events/EventDetailClient';

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: events } = await supabase.from('events').select('id');

  return (events || []).map((event) => ({
    id: event.id,
  }));
}

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (!event) {
    return {
      title: '이벤트를 찾을 수 없습니다',
    };
  }

  return {
    title: `${event.title} - K-NOMADS`,
    description: event.description,
    openGraph: {
      title: `${event.title} - K-NOMADS`,
      description: event.description,
      images: [event.image_url || '/og-image.jpg'],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: eventData } = await supabase
    .from('events')
    .select(`
      *,
      cities!city_id (
        name,
        slug
      ),
      profiles:organizer_id (
        name,
        avatar_url
      )
    `)
    .eq('id', id)
    .single();

  if (!eventData) {
    notFound();
  }

  // Transform Supabase data to Event interface
  const event: Event = {
    id: eventData.id,
    title: eventData.title,
    titleEn: eventData.title_en,
    description: eventData.description,
    descriptionEn: eventData.description_en,
    type: eventData.type as 'meetup' | 'workshop' | 'networking',
    city: eventData.cities?.name || '',
    citySlug: eventData.cities?.slug || '',
    location: eventData.location || { name: '', address: '' },
    date: new Date(eventData.date),
    startTime: eventData.start_time,
    endTime: eventData.end_time,
    capacity: eventData.capacity,
    registered: eventData.registered || 0,
    organizer: {
      id: eventData.organizer_id || '',
      name: eventData.profiles?.name || '익명',
      avatar: eventData.profiles?.avatar_url || '/avatars/default.jpg',
    },
    image: eventData.image_url || '',
  };

  const eventDate = event.date;
  const formattedDate = eventDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const spotsLeft = event.capacity - event.registered;
  const isFull = spotsLeft <= 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-cyan-100">
        <div className="container relative mx-auto px-4 pt-16">
          <Link
            href="/community"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            ← 커뮤니티로 돌아가기
          </Link>

          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
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
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                  마감
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">📝 이벤트 소개</h2>
              </div>
              <div className="p-6">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">👤 주최자 정보</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {event.organizer.name}
                    </p>
                    <p className="text-sm text-gray-600">이벤트 주최자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">📍 이벤트 정보</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-sm text-gray-600">날짜</p>
                    <p className="font-semibold text-gray-900">{formattedDate}</p>
                    <p className="text-sm text-gray-700">{event.startTime} - {event.endTime}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="mb-1 text-sm text-gray-600">장소</p>
                    <p className="font-semibold text-gray-900">{event.location.name}</p>
                    <p className="text-sm text-gray-700">{event.location.address}</p>
                    <p className="text-sm text-gray-600 mt-1">{event.city}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="mb-1 text-sm text-gray-600">참가자</p>
                    <p className="font-semibold text-gray-900">
                      {event.registered}/{event.capacity}명
                    </p>
                    {!isFull && (
                      <p className="text-sm text-green-600">
                        {spotsLeft}자리 남음
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <EventDetailClient event={event} isFull={isFull} />
          </div>
        </div>
      </div>
    </main>
  );
}
