export default function LiveMap() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            🗺️ 실시간 노마드 지도
          </h2>
          <p className="text-gray-600">
            지금 이 순간, 한국에서 활동중인 디지털 노마드들
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-xl">
          <div className="relative h-96 bg-gradient-to-br from-blue-100 via-white to-cyan-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">🗾</div>
                <p className="text-lg font-semibold text-gray-600">
                  한국 지도 인터랙티브 뷰
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
                    <span>제주 156명</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500"></span>
                    <span>부산 203명</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500"></span>
                    <span>강릉 87명</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
