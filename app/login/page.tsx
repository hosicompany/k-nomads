import Link from 'next/link';
import { login } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
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
            <h1 className="mt-4 text-2xl font-bold text-gray-900">로그인</h1>
            <p className="mt-2 text-sm text-gray-600">
              디지털 노마드 라이프를 시작하세요
            </p>
          </div>

          {/* Error/Success Messages */}
          {params.error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {params.error}
            </div>
          )}
          {params.message && (
            <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
              {params.message}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6">
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
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  로그인 상태 유지
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                비밀번호 찾기
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              formAction={login}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-600/30"
            >
              로그인
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
