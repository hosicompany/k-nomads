import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentCity {
  slug: string;
  timestamp: number;
}

interface RecentState {
  recentCities: RecentCity[];
  addRecent: (slug: string) => void;
  getRecentSlugs: () => string[];
}

const MAX_RECENT = 10;

export const useRecentStore = create<RecentState>()(
  persist(
    (set, get) => ({
      recentCities: [],
      addRecent: (slug) => {
        set((state) => {
          // 기존에 있으면 제거
          const filtered = state.recentCities.filter((r) => r.slug !== slug);
          // 새로운 항목을 맨 앞에 추가
          const updated = [{ slug, timestamp: Date.now() }, ...filtered];
          // 최대 개수 제한
          return {
            recentCities: updated.slice(0, MAX_RECENT),
          };
        });
      },
      getRecentSlugs: () => get().recentCities.map((r) => r.slug),
    }),
    {
      name: 'k-nomads-recent',
    }
  )
);
