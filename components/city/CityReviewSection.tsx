'use client';

import { useState, useEffect } from 'react';
import { City, Review } from '@/types';
import { Tables } from '@/types/database.types';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';
import { createClient } from '@/lib/supabase/client';

export interface CityReviewSectionProps {
  city: City;
  initialReviews: Review[];
}

export default function CityReviewSection({
  city,
  initialReviews,
}: CityReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            name,
            avatar_url
          )
        `)
        .eq('city_id', city.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        setReviews(initialReviews);
      } else if (data) {
        // Transform Supabase data to Review interface
        type ReviewWithProfile = Tables<'reviews'> & {
          profiles: { name: string; avatar_url: string | null } | null;
        };

        const transformedReviews: Review[] = (data as unknown as ReviewWithProfile[]).map((review: ReviewWithProfile) => ({
          id: review.id,
          cityId: review.city_id,
          userId: review.user_id,
          userName: review.profiles?.name || '익명',
          userAvatar: review.profiles?.avatar_url || '/avatars/default.jpg',
          rating: review.rating,
          title: review.title,
          stayDuration: review.stay_duration || '',
          content: review.content,
          images: review.images || [],
          createdAt: new Date(review.created_at || Date.now()),
          helpful: review.helpful_count || 0,
          helpfulBy: [], // Will be populated from review_helpful table if needed
        }));

        setReviews(transformedReviews);
      }

      setIsLoading(false);
    };

    fetchReviews();
  }, [city.id, supabase, initialReviews]);

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">💬 리뷰</h2>
        </div>
        <div className="p-12 text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p className="text-gray-600">리뷰를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReviewList
        reviews={reviews}
        onWriteReview={() => setShowReviewForm(true)}
      />

      {showReviewForm && (
        <ReviewForm city={city} onClose={() => setShowReviewForm(false)} />
      )}
    </>
  );
}
