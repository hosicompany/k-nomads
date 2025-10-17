import { City, Event } from '@/types';
import { FilterState, SortOption, EventFilterState, EventDateFilter } from '@/types/filters';

// 도시 검색 함수 (한글/영문 모두 지원)
export function searchCities(cities: City[], searchTerm: string): City[] {
  if (!searchTerm.trim()) return cities;

  const lowerSearch = searchTerm.toLowerCase().trim();

  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerSearch) ||
      city.nameEn.toLowerCase().includes(lowerSearch)
  );
}

// 생활비 범위 필터
export function filterByCostRange(
  cities: City[],
  minCost: number | null,
  maxCost: number | null
): City[] {
  return cities.filter((city) => {
    const avgCost = (city.costOfLiving.min + city.costOfLiving.max) / 2;

    if (minCost !== null && avgCost < minCost) return false;
    if (maxCost !== null && avgCost > maxCost) return false;

    return true;
  });
}

// 인터넷 속도 필터
export function filterByInternetSpeed(
  cities: City[],
  minSpeed: number | null
): City[] {
  if (minSpeed === null || minSpeed === 0) return cities;

  return cities.filter((city) => city.internetSpeed >= minSpeed);
}

// 날씨 필터 (날씨를 온도로 분류)
export function filterByWeather(
  cities: City[],
  weatherTypes: string[]
): City[] {
  if (weatherTypes.length === 0) return cities;

  return cities.filter((city) => {
    const temp = city.weather.temp;

    // 온도 기준: 추움(10도 미만), 온화함(10-25도), 더움(25도 이상)
    const cityWeatherType =
      temp < 10 ? 'cool' : temp >= 25 ? 'hot' : 'warm';

    return weatherTypes.includes(cityWeatherType);
  });
}

// 정렬 함수
export function sortCities(cities: City[], sortBy: SortOption): City[] {
  const sorted = [...cities];

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);

    case 'popularity':
      return sorted.sort((a, b) => b.activeNomads - a.activeNomads);

    case 'cost-asc':
      return sorted.sort((a, b) => {
        const avgA = (a.costOfLiving.min + a.costOfLiving.max) / 2;
        const avgB = (b.costOfLiving.min + b.costOfLiving.max) / 2;
        return avgA - avgB;
      });

    case 'cost-desc':
      return sorted.sort((a, b) => {
        const avgA = (a.costOfLiving.min + a.costOfLiving.max) / 2;
        const avgB = (b.costOfLiving.min + b.costOfLiving.max) / 2;
        return avgB - avgA;
      });

    default:
      return sorted;
  }
}

// 다중 필터 조합 함수
export function applyFilters(
  cities: City[],
  filters: FilterState
): City[] {
  let filtered = cities;

  // 1. 검색어 필터
  filtered = searchCities(filtered, filters.search);

  // 2. 생활비 필터
  filtered = filterByCostRange(filtered, filters.minCost, filters.maxCost);

  // 3. 인터넷 속도 필터
  filtered = filterByInternetSpeed(filtered, filters.minSpeed);

  // 4. 날씨 필터
  filtered = filterByWeather(filtered, filters.weather);

  // 5. 정렬
  filtered = sortCities(filtered, filters.sort);

  return filtered;
}

// ===== 이벤트 필터 함수 =====

// 이벤트 검색 함수
export function searchEvents(events: Event[], searchTerm: string): Event[] {
  if (!searchTerm.trim()) return events;

  const lowerSearch = searchTerm.toLowerCase().trim();

  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(lowerSearch) ||
      event.description.toLowerCase().includes(lowerSearch) ||
      event.city.toLowerCase().includes(lowerSearch)
  );
}

// 이벤트 타입 필터
export function filterByEventType(events: Event[], types: string[]): Event[] {
  if (types.length === 0) return events;

  return events.filter((event) => types.includes(event.type));
}

// 도시별 이벤트 필터
export function filterByCity(events: Event[], citySlugs: string[]): Event[] {
  if (citySlugs.length === 0) return events;

  return events.filter((event) => citySlugs.includes(event.citySlug));
}

// 날짜별 이벤트 필터
export function filterByDateRange(
  events: Event[],
  dateFilter: EventDateFilter
): Event[] {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  return events.filter((event) => {
    const eventDate = new Date(event.date);

    switch (dateFilter) {
      case 'all':
        return true;

      case 'this-week':
        return eventDate >= startOfWeek && eventDate < endOfWeek;

      case 'this-month':
        return eventDate >= startOfMonth && eventDate <= endOfMonth;

      case 'upcoming':
        return eventDate >= now;

      default:
        return true;
    }
  });
}

// 다중 이벤트 필터 조합 함수
export function applyEventFilters(
  events: Event[],
  filters: EventFilterState
): Event[] {
  let filtered = events;

  // 1. 검색어 필터
  filtered = searchEvents(filtered, filters.search);

  // 2. 이벤트 타입 필터
  filtered = filterByEventType(filtered, filters.type);

  // 3. 도시별 필터
  filtered = filterByCity(filtered, filters.cityId);

  // 4. 날짜 필터
  filtered = filterByDateRange(filtered, filters.dateFilter);

  // 5. 날짜순 정렬 (가까운 날짜부터)
  filtered = filtered.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return filtered;
}
