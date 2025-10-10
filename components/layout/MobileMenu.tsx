'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Escape 키로 메뉴 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // 메뉴 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 오버레이 */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* 메뉴 */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-64 bg-white shadow-xl md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <span className="text-lg font-bold text-gray-900">메뉴</span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="메뉴 닫기"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cities"
                  className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  onClick={onClose}
                >
                  🏙️ 도시 탐색
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  onClick={onClose}
                >
                  👥 커뮤니티
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  onClick={onClose}
                >
                  📖 가이드
                </Link>
              </li>
            </ul>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <Link
                href="/login"
                className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                onClick={onClose}
              >
                로그인
              </Link>
            </div>
          </nav>
        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
