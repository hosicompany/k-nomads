// 정렬 옵션 타입
export type SortOption = 'rating' | 'popularity' | 'cost-asc' | 'cost-desc';

// 날씨 유형 타입
export type WeatherType = 'warm' | 'cool' | 'hot';

// 필터 상태 인터페이스
export interface FilterState {
  search: string;
  minCost: number | null;
  maxCost: number | null;
  minSpeed: number | null;
  weather: WeatherType[];
  sort: SortOption;
}

// 초기 필터 상태
export const initialFilterState: FilterState = {
  search: '',
  minCost: null,
  maxCost: null,
  minSpeed: null,
  weather: [],
  sort: 'rating',
};

// 정렬 옵션 라벨 맵
export const sortLabels: Record<SortOption, string> = {
  rating: '평점순',
  popularity: '인기순',
  'cost-asc': '생활비 낮은순',
  'cost-desc': '생활비 높은순',
};

// 날씨 유형 라벨 맵
export const weatherLabels: Record<WeatherType, string> = {
  warm: '온화함',
  cool: '추움',
  hot: '더움',
};

// 인터넷 속도 옵션
export const internetSpeedOptions = [
  { value: 0, label: '전체' },
  { value: 50, label: '50Mbps 이상' },
  { value: 80, label: '80Mbps 이상' },
  { value: 100, label: '100Mbps 이상' },
];

// 이벤트 타입
export type EventType = 'meetup' | 'workshop' | 'networking';

// 이벤트 날짜 필터 타입
export type EventDateFilter = 'all' | 'this-week' | 'this-month' | 'upcoming';

// 이벤트 필터 상태
export interface EventFilterState {
  search: string;
  type: EventType[];
  cityId: string[];
  dateFilter: EventDateFilter;
}

// 초기 이벤트 필터 상태
export const initialEventFilterState: EventFilterState = {
  search: '',
  type: [],
  cityId: [],
  dateFilter: 'all',
};

// 이벤트 타입 라벨 맵
export const eventTypeLabels: Record<EventType, string> = {
  meetup: '밋업',
  workshop: '워크샵',
  networking: '네트워킹',
};

// 날짜 필터 라벨 맵
export const eventDateFilterLabels: Record<EventDateFilter, string> = {
  all: '전체',
  'this-week': '이번 주',
  'this-month': '이번 달',
  upcoming: '예정된 이벤트',
};
