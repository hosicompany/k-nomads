'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only fixed left-4 top-4 z-[9999] rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      본문으로 바로가기
    </a>
  );
}
