import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50" role="contentinfo">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* 반응형 그리드: 모바일 1단, 태블릿 2단, 데스크톱 4단 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-lg font-bold sm:text-xl">
              <span className="text-xl sm:text-2xl">🏝️</span>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                K-NOMADS
              </span>
            </div>
            <p className="text-sm text-gray-600">
              한국에서 시작하는
              <br />
              디지털 노마드 라이프
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-900 sm:mb-4">서비스</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/cities" className="transition-colors hover:text-blue-600">
                  도시 탐색
                </Link>
              </li>
              <li>
                <Link href="/community" className="transition-colors hover:text-blue-600">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="/guide" className="transition-colors hover:text-blue-600">
                  노마드 가이드
                </Link>
              </li>
              <li>
                <Link href="/events" className="transition-colors hover:text-blue-600">
                  밋업 & 이벤트
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-900 sm:mb-4">회사</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="transition-colors hover:text-blue-600">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-blue-600">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="/careers" className="transition-colors hover:text-blue-600">
                  채용
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-blue-600">
                  문의
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-900 sm:mb-4">소셜</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-2xl transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="#"
                className="text-2xl transition-transform hover:scale-110"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-2xl transition-transform hover:scale-110"
                aria-label="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-6 text-center text-sm text-gray-600 sm:mt-8 sm:pt-8">
          <p>© 2025 K-NOMADS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
