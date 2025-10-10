'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment } from '@/types';

interface CommentState {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  getCommentsByReview: (reviewId: string) => Comment[];
}

export const useCommentStore = create<CommentState>()(
  persist(
    (set, get) => ({
      comments: [],

      addComment: (comment) => {
        set((state) => ({
          comments: [...state.comments, comment],
        }));
      },

      getCommentsByReview: (reviewId) => {
        return get().comments.filter(
          (comment) => comment.reviewId === reviewId
        );
      },
    }),
    {
      name: 'k-nomads-comments',
    }
  )
);
