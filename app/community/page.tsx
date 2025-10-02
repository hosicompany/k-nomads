export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            💬 커뮤니티
          </h1>
          <p className="text-gray-600">
            노마드들과 소통하고 정보를 공유하세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">💬 실시간 채팅</h2>
              </div>
              <div className="flex h-96 items-center justify-center p-6">
                <div className="text-center text-gray-500">
                  <p className="text-6xl">💬</p>
                  <p className="mt-4">실시간 채팅 기능</p>
                  <p className="mt-2 text-sm">로그인 후 이용 가능합니다</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">📝 게시판</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-400 hover:shadow-md"
                    >
                      <h3 className="mb-2 font-bold text-gray-900">
                        제주도 추천 카페 공유합니다
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>👤 노마드123</span>
                        <span>•</span>
                        <span>⏰ 2시간 전</span>
                        <span>•</span>
                        <span>💬 12</span>
                        <span>•</span>
                        <span>❤️ 24</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">👥 활동중인 노마드</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-white">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">노마드{i}</div>
                        <div className="text-xs text-gray-600">📍 제주도</div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">🔥 인기 토픽</h3>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {['제주도 카페', '부산 숙소', '강릉 워케이션', '코워킹 스페이스'].map(
                    (topic, i) => (
                      <button
                        key={i}
                        className="w-full rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-semibold text-gray-700 transition-all hover:bg-blue-100 hover:text-blue-600"
                      >
                        #{topic}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
