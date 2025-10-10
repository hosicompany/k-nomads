'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review } from '@/types';

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
  getReviewsByCity: (cityId: string) => Review[];
  updateReviewHelpful: (reviewId: string, userId: string) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (review) => {
        set((state) => ({
          reviews: [review, ...state.reviews],
        }));
      },

      getReviewsByCity: (cityId) => {
        return get().reviews.filter((review) => review.cityId === cityId);
      },

      updateReviewHelpful: (reviewId, userId) => {
        set((state) => ({
          reviews: state.reviews.map((review) => {
            if (review.id === reviewId) {
              const helpfulBy = review.helpfulBy || [];
              const isHelpful = helpfulBy.includes(userId);

              return {
                ...review,
                helpful: isHelpful ? review.helpful - 1 : review.helpful + 1,
                helpfulBy: isHelpful
                  ? helpfulBy.filter((id) => id !== userId)
                  : [...helpfulBy, userId],
              };
            }
            return review;
          }),
        }));
      },
    }),
    {
      name: 'k-nomads-reviews',
    }
  )
);
