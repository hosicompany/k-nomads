'use client';

import { useState, useEffect } from 'react';
import { City, Review } from '@/types';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';
import { useReviewStore } from '@/store/useReviewStore';

export interface CityReviewSectionProps {
  city: City;
  initialReviews: Review[];
}

export default function CityReviewSection({
  city,
  initialReviews,
}: CityReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { reviews, getReviewsByCity } = useReviewStore();

  // 초기 리뷰를 스토어에 로드
  useEffect(() => {
    // 스토어가 비어있고 초기 리뷰가 있으면 로드
    if (reviews.length === 0 && initialReviews.length > 0) {
      initialReviews.forEach((review) => {
        // 이미 스토어에 없는 리뷰만 추가
        if (!reviews.find((r) => r.id === review.id)) {
          useReviewStore.getState().addReview(review);
        }
      });
    }
  }, [initialReviews, reviews]);

  // 현재 도시의 리뷰 가져오기 (스토어 + 초기 데이터)
  const cityReviews = getReviewsByCity(city.id);
  const allReviews =
    cityReviews.length > 0
      ? cityReviews
      : initialReviews;

  return (
    <>
      <ReviewList
        reviews={allReviews}
        onWriteReview={() => setShowReviewForm(true)}
      />

      {showReviewForm && (
        <ReviewForm city={city} onClose={() => setShowReviewForm(false)} />
      )}
    </>
  );
}
