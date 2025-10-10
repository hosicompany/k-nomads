import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  compareCities: string[]; // city slugs (max 3)
  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  toggleCompare: (slug: string) => boolean;
  clearCompare: () => void;
  isInCompare: (slug: string) => boolean;
  isFull: () => boolean;
}

const MAX_COMPARE = 3;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareCities: [],
      addToCompare: (slug) => {
        const state = get();
        if (state.compareCities.length >= MAX_COMPARE) {
          return false; // 최대 개수 초과
        }
        if (!state.compareCities.includes(slug)) {
          set({ compareCities: [...state.compareCities, slug] });
        }
        return true;
      },
      removeFromCompare: (slug) =>
        set((state) => ({
          compareCities: state.compareCities.filter((s) => s !== slug),
        })),
      toggleCompare: (slug) => {
        const state = get();
        if (state.compareCities.includes(slug)) {
          state.removeFromCompare(slug);
          return true;
        } else {
          return state.addToCompare(slug);
        }
      },
      clearCompare: () => set({ compareCities: [] }),
      isInCompare: (slug) => get().compareCities.includes(slug),
      isFull: () => get().compareCities.length >= MAX_COMPARE,
    }),
    {
      name: 'k-nomads-compare',
    }
  )
);
