import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[]; // city slugs
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (slug) => {
        const state = get();
        if (!state.favorites.includes(slug)) {
          set({ favorites: [...state.favorites, slug] });
        }
      },
      removeFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.filter((s) => s !== slug),
        })),
      toggleFavorite: (slug) => {
        const state = get();
        if (state.favorites.includes(slug)) {
          state.removeFavorite(slug);
        } else {
          state.addFavorite(slug);
        }
      },
      isFavorite: (slug) => get().favorites.includes(slug),
    }),
    {
      name: 'k-nomads-favorites',
    }
  )
);
