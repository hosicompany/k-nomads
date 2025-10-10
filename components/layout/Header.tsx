'use client';

import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md" role="banner">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold sm:text-xl" aria-label="K-NOMADS 홈페이지">
              <span className="text-xl sm:text-2xl" aria-hidden="true">🏝️</span>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                K-NOMADS
              </span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex" role="navigation" aria-label="주요 메뉴">
              <Link
                href="/cities"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                도시 탐색
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                커뮤니티
              </Link>
              <Link
                href="/guide"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                가이드
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="relative flex h-10 w-10 items-center justify-center text-gray-700 hover:text-blue-600"
              aria-label="알림"
            >
              <span className="text-lg sm:text-xl">🔔</span>
              <span className="absolute right-1 top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
            </button>

            <button
              className="hidden h-10 w-10 items-center justify-center text-gray-700 hover:text-blue-600 md:flex"
              aria-label="프로필"
            >
              <span className="text-xl">👤</span>
            </button>

            <Link href="/login" className="hidden sm:inline-block">
              <Button variant="primary" size="sm">
                로그인
              </Button>
            </Link>

            <button
              className="flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
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
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
