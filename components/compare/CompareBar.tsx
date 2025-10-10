'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCompareStore } from '@/store/useCompareStore';
import { cities } from '@/lib/data';
import Button from '@/components/ui/Button';

export default function CompareBar() {
  const { compareCities, removeFromCompare, clearCompare } = useCompareStore();

  if (compareCities.length === 0) {
    return null;
  }

  const selectedCities = cities.filter((city) =>
    compareCities.includes(city.slug)
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-blue-500 bg-white shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                비교 목록 ({compareCities.length}/3)
              </span>
              <div className="flex gap-2">
                {selectedCities.map((city) => (
                  <motion.div
                    key={city.slug}
                    className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <span className="font-medium text-blue-700">
                      {city.name}
                    </span>
                    <button
                      className="ml-1 text-blue-500 hover:text-blue-700"
                      onClick={() => removeFromCompare(city.slug)}
                      aria-label={`${city.name} 제거`}
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                전체 삭제
              </Button>
              <Link href="/compare">
                <Button
                  variant="primary"
                  size="md"
                  disabled={compareCities.length < 2}
                >
                  비교하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
