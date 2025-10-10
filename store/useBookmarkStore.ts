'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkState {
  bookmarks: string[];
  addBookmark: (eventId: string) => void;
  removeBookmark: (eventId: string) => void;
  toggleBookmark: (eventId: string) => void;
  isBookmarked: (eventId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (eventId) => {
        set((state) => ({
          bookmarks: [...state.bookmarks, eventId],
        }));
      },

      removeBookmark: (eventId) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((id) => id !== eventId),
        }));
      },

      toggleBookmark: (eventId) => {
        const state = get();
        if (state.bookmarks.includes(eventId)) {
          state.removeBookmark(eventId);
        } else {
          state.addBookmark(eventId);
        }
      },

      isBookmarked: (eventId) => {
        return get().bookmarks.includes(eventId);
      },
    }),
    {
      name: 'k-nomads-bookmarks',
    }
  )
);
