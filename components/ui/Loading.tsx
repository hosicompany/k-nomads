'use client';

import { motion } from 'framer-motion';

export type LoadingSize = 'small' | 'medium' | 'large';

export interface LoadingProps {
  size?: LoadingSize;
  fullScreen?: boolean;
  message?: string;
}

const sizeStyles: Record<LoadingSize, string> = {
  small: 'h-6 w-6',
  medium: 'h-12 w-12',
  large: 'h-16 w-16',
};

export default function Loading({
  size = 'medium',
  fullScreen = false,
  message,
}: LoadingProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <motion.svg
        className={`text-blue-600 ${sizeStyles[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </motion.svg>
      {message && (
        <p className="text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{spinner}</div>;
}
