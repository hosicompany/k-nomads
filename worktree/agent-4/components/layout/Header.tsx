import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-luxury-black/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
            <span className="text-3xl">👑</span>
            <span className="luxury-gradient bg-clip-text text-transparent luxury-text-shadow" style={{fontFamily: 'Playfair Display, serif', letterSpacing: '0.05em'}}>
              K-NOMADS
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/cities"
              className="text-sm font-semibold uppercase tracking-wider text-gold-light transition-all hover:text-gold hover:luxury-text-shadow"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              도시 탐색
            </Link>
            <Link
              href="/community"
              className="text-sm font-semibold uppercase tracking-wider text-gold-light transition-all hover:text-gold hover:luxury-text-shadow"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              커뮤니티
            </Link>
            <Link
              href="/guide"
              className="text-sm font-semibold uppercase tracking-wider text-gold-light transition-all hover:text-gold hover:luxury-text-shadow"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              가이드
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-gold-light hover:text-gold transition-all">
            <span className="text-2xl">🔔</span>
            <span className="absolute right-0 top-0 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold"></span>
            </span>
          </button>

          <button className="hidden text-gold-light hover:text-gold transition-all md:block">
            <span className="text-2xl">👤</span>
          </button>

          <button className="luxury-button rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wide">
            로그인
          </button>

          <button className="md:hidden">
            <svg
              className="h-6 w-6 text-gold"
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
