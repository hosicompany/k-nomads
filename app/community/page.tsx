import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { Event } from '@/types';
import { Tables } from '@/types/database.types';
import CommunityContent from '@/components/community/CommunityContent';

export default async function CommunityPage() {
  const supabase = await createClient();

  // Fetch events from Supabase with city and organizer info
  const { data: eventsData } = await supabase
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
    .order('date', { ascending: true });

  // Transform Supabase data to Event interface
  type EventWithRelations = Tables<'events'> & {
    cities: { name: string; slug: string } | null;
    profiles: { name: string; avatar_url: string | null } | null;
  };

  const events: Event[] = (eventsData as any[] || []).map((event: EventWithRelations) => ({
    id: event.id,
    title: event.title,
    titleEn: event.title_en,
    description: event.description,
    descriptionEn: event.description_en,
    type: event.type as 'meetup' | 'workshop' | 'networking',
    city: event.cities?.name || '',
    citySlug: event.cities?.slug || '',
    location: (event.location as { name: string; address: string } | null) || { name: '', address: '' },
    date: new Date(event.date),
    startTime: event.start_time,
    endTime: event.end_time,
    capacity: event.capacity,
    registered: event.registered || 0,
    organizer: {
      id: event.organizer_id || '',
      name: event.profiles?.name || '익명',
      avatar: event.profiles?.avatar_url || '/avatars/default.jpg',
    },
    image: event.image_url || '',
  }));

  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-12">
              <div className="text-center text-gray-500">로딩 중...</div>
            </div>
          </div>
        </main>
      }
    >
      <CommunityContent events={events} />
    </Suspense>
  );
}
