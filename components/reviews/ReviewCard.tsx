'use client';

import { Review } from '@/types';
import StarRating from './StarRating';
import { useReviewStore } from '@/store/useReviewStore';

export interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
}

export default function ReviewCard({
  review,
  currentUserId = 'current-user',
}: ReviewCardProps) {
  const { updateReviewHelpful } = useReviewStore();

  const isHelpful = review.helpfulBy?.includes(currentUserId) || false;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleHelpfulClick = () => {
    updateReviewHelpful(review.id, currentUserId);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md">
      {/* 사용자 정보 및 별점 */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-xl font-bold text-white">
            {review.userName[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{review.userName}</p>
            <p className="text-sm text-gray-600">
              {review.stayDuration} 체류
            </p>
          </div>
        </div>
        <div className="text-right">
          <StarRating rating={review.rating} readonly size="sm" />
          <p className="mt-1 text-xs text-gray-500">
            {formatDate(review.createdAt)}
          </p>
        </div>
      </div>

      {/* 리뷰 제목 */}
      <h3 className="mb-2 text-lg font-bold text-gray-900">{review.title}</h3>

      {/* 리뷰 내용 */}
      <p className="mb-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
        {review.content}
      </p>

      {/* 이미지 */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {review.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`Review image ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* 도움됨 버튼 */}
      <div className="flex items-center gap-2 border-t border-gray-200 pt-4">
        <button
          onClick={handleHelpfulClick}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            isHelpful
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{isHelpful ? '👍' : '👍🏻'}</span>
          <span>도움됨 {review.helpful > 0 && `(${review.helpful})`}</span>
        </button>
      </div>
    </div>
  );
}
