'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  EventFilterState,
  initialEventFilterState,
  EventType,
  EventDateFilter,
} from '@/types/filters';

export function useEventFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 필터 상태 읽기
  const filters = useMemo<EventFilterState>(() => {
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type');
    const cityId = searchParams.get('cityId');
    const dateFilter = searchParams.get('dateFilter') as EventDateFilter | null;

    return {
      search,
      type: type ? (type.split(',') as EventType[]) : [],
      cityId: cityId ? cityId.split(',') : [],
      dateFilter: dateFilter || 'all',
    };
  }, [searchParams]);

  // 필터 상태를 URL에 업데이트
  const updateFilters = useCallback(
    (newFilters: Partial<EventFilterState>) => {
      const current = new URLSearchParams(searchParams.toString());

      // 검색어
      if (newFilters.search !== undefined) {
        if (newFilters.search) {
          current.set('search', newFilters.search);
        } else {
          current.delete('search');
        }
      }

      // 이벤트 타입
      if (newFilters.type !== undefined) {
        if (newFilters.type.length > 0) {
          current.set('type', newFilters.type.join(','));
        } else {
          current.delete('type');
        }
      }

      // 도시 ID
      if (newFilters.cityId !== undefined) {
        if (newFilters.cityId.length > 0) {
          current.set('cityId', newFilters.cityId.join(','));
        } else {
          current.delete('cityId');
        }
      }

      // 날짜 필터
      if (newFilters.dateFilter !== undefined) {
        if (newFilters.dateFilter !== 'all') {
          current.set('dateFilter', newFilters.dateFilter);
        } else {
          current.delete('dateFilter');
        }
      }

      const query = current.toString();
      router.push(query ? `/community?${query}` : '/community', {
        scroll: false,
      });
    },
    [searchParams, router]
  );

  // 모든 필터 초기화
  const resetFilters = useCallback(() => {
    router.push('/community', { scroll: false });
  }, [router]);

  // 필터가 적용되었는지 확인
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== initialEventFilterState.search ||
      filters.type.length !== initialEventFilterState.type.length ||
      filters.cityId.length !== initialEventFilterState.cityId.length ||
      filters.dateFilter !== initialEventFilterState.dateFilter
    );
  }, [filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
  };
}
