'use client';

import { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg disabled:from-gray-400 disabled:to-gray-400',
  secondary:
    'border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600 disabled:border-gray-200 disabled:text-gray-400',
  ghost:
    'text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-2.5 text-sm min-h-[44px]',
  lg: 'px-8 py-3 text-base min-h-[48px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  fullWidth = false,
  className = '',
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      className={`
        rounded-full font-semibold transition-all
        disabled:cursor-not-allowed disabled:opacity-60
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : undefined}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
          </svg>
          <span>로딩중...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
