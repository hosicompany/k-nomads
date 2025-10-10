'use client';

import { useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import { useRecentStore } from '@/store/useRecentStore';

export interface CityDetailClientProps {
  slug: string;
  cityName: string;
}

export default function CityDetailClient({
  slug,
  cityName,
}: CityDetailClientProps) {
  const { addRecent } = useRecentStore();

  // 페이지 방문 시 최근 본 도시에 추가
  useEffect(() => {
    addRecent(slug);
  }, [slug, addRecent]);

  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://k-nomads.com/cities/${slug}`;

  return (
    <div className="flex items-center gap-2">
      <FavoriteButton slug={slug} size="lg" />
      <ShareButton url={currentUrl} title={`${cityName} - K-NOMADS`} />
    </div>
  );
}
