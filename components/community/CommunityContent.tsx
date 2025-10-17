'use client';

import { useMemo } from 'react';
import { Event } from '@/types';
import { useEventFilterParams } from '@/hooks/useEventFilterParams';
import { applyEventFilters } from '@/lib/filters';
import EventFilterPanel from '@/components/events/EventFilterPanel';
import EventCard from '@/components/events/EventCard';

export interface CommunityContentProps {
  events: Event[];
}

export default function CommunityContent({ events }: CommunityContentProps) {
  const { filters, updateFilters, resetFilters, hasActiveFilters } =
    useEventFilterParams();

  const filteredEvents = useMemo(() => {
    return applyEventFilters(events, filters);
  }, [events, filters]);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            💬 커뮤니티
          </h1>
          <p className="text-gray-600">
            노마드들과 소통하고 정보를 공유하세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 필터 패널 */}
          <div className="lg:col-span-1">
            <EventFilterPanel
              filters={filters}
              onFilterChange={updateFilters}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
              resultCount={filteredEvents.length}
            />
          </div>

          {/* 이벤트 목록 */}
          <div className="lg:col-span-3">
            <div className="mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">📅 이벤트</h2>
              </div>
              <div className="p-6">
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <p className="text-6xl">📅</p>
                    <p className="mt-4 text-lg font-semibold">
                      조건에 맞는 이벤트가 없습니다
                    </p>
                    <p className="mt-2 text-sm">
                      필터를 변경하거나 초기화해보세요
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        필터 초기화
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 게시판 섹션 */}
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">📝 게시판</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-400 hover:shadow-md"
                    >
                      <h3 className="mb-2 font-bold text-gray-900">
                        제주도 추천 카페 공유합니다
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>👤 노마드123</span>
                        <span>•</span>
                        <span>⏰ 2시간 전</span>
                        <span>•</span>
                        <span>💬 12</span>
                        <span>•</span>
                        <span>❤️ 24</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
