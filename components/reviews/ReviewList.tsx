'use client';

import { useState, useMemo } from 'react';
import { Review } from '@/types';
import ReviewCard from './ReviewCard';
import Button from '@/components/ui/Button';

export interface ReviewListProps {
  reviews: Review[];
  onWriteReview?: () => void;
}

type SortOption = 'latest' | 'rating' | 'helpful';

const sortLabels: Record<SortOption, string> = {
  latest: '최신순',
  rating: '평점순',
  helpful: '도움순',
};

export default function ReviewList({
  reviews,
  onWriteReview,
}: ReviewListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];

    switch (sortBy) {
      case 'latest':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);

      case 'helpful':
        return sorted.sort((a, b) => b.helpful - a.helpful);

      default:
        return sorted;
    }
  }, [reviews, sortBy]);

  const paginatedReviews = useMemo(() => {
    const start = (page - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;
    return sortedReviews.slice(start, end);
  }, [sortedReviews, page]);

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  if (reviews.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">💬 리뷰</h2>
        </div>
        <div className="p-12 text-center">
          <div className="mb-4 text-6xl">📝</div>
          <p className="mb-2 text-lg font-semibold text-gray-900">
            아직 작성된 리뷰가 없습니다
          </p>
          <p className="mb-6 text-sm text-gray-600">
            이 도시에 대한 첫 번째 리뷰를 남겨주세요!
          </p>
          {onWriteReview && (
            <Button variant="primary" size="md" onClick={onWriteReview}>
              첫 리뷰 작성하기
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            💬 리뷰 ({reviews.length})
          </h2>
          {onWriteReview && (
            <Button variant="primary" size="sm" onClick={onWriteReview}>
              리뷰 작성
            </Button>
          )}
        </div>
      </div>

      {/* 정렬 옵션 */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">정렬:</span>
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition-all ${
                sortBy === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {sortLabels[option]}
            </button>
          ))}
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="space-y-4 p-6">
        {paginatedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              이전
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition-all ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
