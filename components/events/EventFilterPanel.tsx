'use client';

import { useState } from 'react';
import SearchInput from '@/components/filters/SearchInput';
import Button from '@/components/ui/Button';
import { EventFilterState, EventType, EventDateFilter } from '@/types/filters';
import { eventTypeLabels, eventDateFilterLabels } from '@/types/filters';
import { cities } from '@/lib/data';

export interface EventFilterPanelProps {
  filters: EventFilterState;
  onFilterChange: (filters: Partial<EventFilterState>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}

export default function EventFilterPanel({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
  resultCount,
}: EventFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeToggle = (type: EventType) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter((t) => t !== type)
      : [...filters.type, type];
    onFilterChange({ type: newTypes });
  };

  const handleCityToggle = (cityId: string) => {
    const newCities = filters.cityId.includes(cityId)
      ? filters.cityId.filter((c) => c !== cityId)
      : [...filters.cityId, cityId];
    onFilterChange({ cityId: newCities });
  };

  return (
    <div className="space-y-4">
      {/* 모바일 토글 버튼 */}
      <div className="lg:hidden">
        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '필터 닫기' : '필터 열기'} ({resultCount}개 이벤트)
        </Button>
      </div>

      {/* 필터 패널 */}
      <div
        className={`rounded-lg border-2 border-gray-200 bg-white p-4 sm:p-6 ${
          isOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">필터</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              초기화
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* 검색 */}
          <div>
            <SearchInput
              value={filters.search}
              onChange={(value) => onFilterChange({ search: value })}
              placeholder="이벤트 검색..."
            />
          </div>

          {/* 이벤트 타입 */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              이벤트 타입
            </label>
            <div className="space-y-2">
              {(Object.keys(eventTypeLabels) as EventType[]).map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={filters.type.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {eventTypeLabels[type]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 도시 */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              도시
            </label>
            <div className="space-y-2">
              {cities.map((city) => (
                <label
                  key={city.id}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={filters.cityId.includes(city.id)}
                    onChange={() => handleCityToggle(city.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{city.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 날짜 */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              날짜
            </label>
            <div className="space-y-2">
              {(Object.keys(eventDateFilterLabels) as EventDateFilter[]).map(
                (dateFilter) => (
                  <label
                    key={dateFilter}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="dateFilter"
                      checked={filters.dateFilter === dateFilter}
                      onChange={() => onFilterChange({ dateFilter })}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {eventDateFilterLabels[dateFilter]}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* 결과 카운트 */}
        <div className="mt-6 hidden border-t border-gray-200 pt-4 lg:block">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{resultCount}개</span>
            의 이벤트가 검색되었습니다
          </p>
        </div>
      </div>
    </div>
  );
}
