import Link from 'next/link';
import { signup } from '../login/actions';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
              <span className="text-3xl">🏝️</span>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                K-NOMADS
              </span>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">회원가입</h1>
            <p className="mt-2 text-sm text-gray-600">
              디지털 노마드 커뮤니티에 참여하세요
            </p>
          </div>

          {/* Error Message */}
          {params.error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {params.error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="홍길동"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="8자 이상 입력"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                영문, 숫자, 특수문자를 포함하여 8자 이상
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="비밀번호 재입력"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-700">
                    이용약관
                  </Link>
                  {' '}및{' '}
                  <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-700">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="marketing"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
                <label htmlFor="marketing" className="ml-2 text-sm text-gray-600">
                  마케팅 정보 수신에 동의합니다 (선택)
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              formAction={signup}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-600/30"
            >
              회원가입
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
