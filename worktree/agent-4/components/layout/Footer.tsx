import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-luxury-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3 text-2xl font-bold">
              <span className="text-3xl">👑</span>
              <span className="luxury-gradient bg-clip-text text-transparent" style={{fontFamily: 'Playfair Display, serif', letterSpacing: '0.05em'}}>
                K-NOMADS
              </span>
            </div>
            <p className="text-sm font-medium text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              한국에서 시작하는
              <br />
              프리미엄 디지털 노마드 라이프
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold uppercase tracking-wider text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
              서비스
            </h3>
            <ul className="space-y-3 text-sm text-gold-light">
              <li>
                <Link href="/cities" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  도시 탐색
                </Link>
              </li>
              <li>
                <Link href="/community" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="/guide" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  노마드 가이드
                </Link>
              </li>
              <li>
                <Link href="/events" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  밋업 & 이벤트
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold uppercase tracking-wider text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
              회사
            </h3>
            <ul className="space-y-3 text-sm text-gold-light">
              <li>
                <Link href="/about" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  소개
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  블로그
                </Link>
              </li>
              <li>
                <Link href="/careers" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  채용
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-gold" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  문의
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold uppercase tracking-wider text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
              소셜
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-3xl transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              >
                📸
              </a>
              <a
                href="#"
                className="text-3xl transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-3xl transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              >
                💼
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gold/30 pt-8 text-center text-sm font-medium text-gold-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
          <p>© 2025 K-NOMADS. All rights reserved. Premium Digital Nomad Experience.</p>
        </div>
      </div>
    </footer>
  );
}
