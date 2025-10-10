'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative">
      <Button variant="secondary" size="md" onClick={handleShare}>
        🔗 공유하기
      </Button>
      {copied && (
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          링크가 복사되었습니다!
        </motion.div>
      )}
    </div>
  );
}
