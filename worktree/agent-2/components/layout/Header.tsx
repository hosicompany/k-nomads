import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">🏝️</span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              K-NOMADS
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
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

        <div className="flex items-center gap-4">
          <button className="relative text-gray-700 hover:text-blue-600">
            <span className="text-xl">🔔</span>
            <span className="absolute right-0 top-0 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </button>

          <button className="hidden text-gray-700 hover:text-blue-600 md:block">
            <span className="text-xl">👤</span>
          </button>

          <button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg">
            로그인
          </button>

          <button className="md:hidden">
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
  );
}
