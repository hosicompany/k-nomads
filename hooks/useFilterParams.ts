'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  FilterState,
  initialFilterState,
  SortOption,
  WeatherType,
} from '@/types/filters';

export function useFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 필터 상태 읽기
  const filters = useMemo<FilterState>(() => {
    const search = searchParams.get('search') || '';
    const minCost = searchParams.get('minCost');
    const maxCost = searchParams.get('maxCost');
    const minSpeed = searchParams.get('minSpeed');
    const weather = searchParams.get('weather');
    const sort = searchParams.get('sort') as SortOption | null;

    return {
      search,
      minCost: minCost ? parseInt(minCost, 10) : null,
      maxCost: maxCost ? parseInt(maxCost, 10) : null,
      minSpeed: minSpeed ? parseInt(minSpeed, 10) : null,
      weather: weather ? (weather.split(',') as WeatherType[]) : [],
      sort: sort || 'rating',
    };
  }, [searchParams]);

  // 필터 상태를 URL에 업데이트
  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      const current = new URLSearchParams(searchParams.toString());

      // 검색어
      if (newFilters.search !== undefined) {
        if (newFilters.search) {
          current.set('search', newFilters.search);
        } else {
          current.delete('search');
        }
      }

      // 최소 생활비
      if (newFilters.minCost !== undefined) {
        if (newFilters.minCost !== null) {
          current.set('minCost', newFilters.minCost.toString());
        } else {
          current.delete('minCost');
        }
      }

      // 최대 생활비
      if (newFilters.maxCost !== undefined) {
        if (newFilters.maxCost !== null) {
          current.set('maxCost', newFilters.maxCost.toString());
        } else {
          current.delete('maxCost');
        }
      }

      // 최소 인터넷 속도
      if (newFilters.minSpeed !== undefined) {
        if (newFilters.minSpeed !== null && newFilters.minSpeed > 0) {
          current.set('minSpeed', newFilters.minSpeed.toString());
        } else {
          current.delete('minSpeed');
        }
      }

      // 날씨
      if (newFilters.weather !== undefined) {
        if (newFilters.weather.length > 0) {
          current.set('weather', newFilters.weather.join(','));
        } else {
          current.delete('weather');
        }
      }

      // 정렬
      if (newFilters.sort !== undefined) {
        if (newFilters.sort !== 'rating') {
          current.set('sort', newFilters.sort);
        } else {
          current.delete('sort');
        }
      }

      const query = current.toString();
      router.push(query ? `?${query}` : '/cities', { scroll: false });
    },
    [searchParams, router]
  );

  // 모든 필터 초기화
  const resetFilters = useCallback(() => {
    router.push('/cities', { scroll: false });
  }, [router]);

  // 필터가 적용되었는지 확인
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== initialFilterState.search ||
      filters.minCost !== initialFilterState.minCost ||
      filters.maxCost !== initialFilterState.maxCost ||
      filters.minSpeed !== initialFilterState.minSpeed ||
      filters.weather.length !== initialFilterState.weather.length ||
      filters.sort !== initialFilterState.sort
    );
  }, [filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
  };
}
