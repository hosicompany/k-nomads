'use client';

import { useState, useRef } from 'react';
import SearchInput, { SearchInputRef } from './SearchInput';
import CostRangeFilter from './CostRangeFilter';
import InternetSpeedFilter from './InternetSpeedFilter';
import WeatherFilter from './WeatherFilter';
import SortSelect from './SortSelect';
import Button from '@/components/ui/Button';
import { FilterState, WeatherType, SortOption } from '@/types/filters';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}

export default function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
  resultCount,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<SearchInputRef>(null);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '/',
      callback: () => {
        searchInputRef.current?.focus();
      },
      preventDefault: true,
    },
  ]);

  return (
    <div className="space-y-4">
      {/* 모바일 토글 버튼 */}
      <div className="md:hidden">
        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '필터 닫기' : '필터 열기'} ({resultCount}개 도시)
        </Button>
      </div>

      {/* 필터 패널 */}
      <div
        className={`rounded-lg border-2 border-gray-200 bg-white p-4 sm:p-6 ${
          isOpen ? 'block' : 'hidden md:block'
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

        <div className="space-y-4">
          {/* 검색 */}
          <SearchInput
            ref={searchInputRef}
            value={filters.search}
            onChange={(value) => onFilterChange({ search: value })}
          />

          {/* 정렬 */}
          <SortSelect
            value={filters.sort}
            onChange={(value: SortOption) => onFilterChange({ sort: value })}
          />

          {/* 생활비 */}
          <CostRangeFilter
            minCost={filters.minCost}
            maxCost={filters.maxCost}
            onChange={(minCost, maxCost) =>
              onFilterChange({ minCost, maxCost })
            }
          />

          {/* 인터넷 속도 */}
          <InternetSpeedFilter
            value={filters.minSpeed}
            onChange={(value) => onFilterChange({ minSpeed: value })}
          />

          {/* 날씨 */}
          <WeatherFilter
            value={filters.weather}
            onChange={(value: WeatherType[]) =>
              onFilterChange({ weather: value })
            }
          />
        </div>

        {/* 결과 카운트 (데스크톱) */}
        <div className="mt-6 hidden border-t border-gray-200 pt-4 md:block">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{resultCount}개</span>
            의 도시가 검색되었습니다
          </p>
        </div>
      </div>
    </div>
  );
}
