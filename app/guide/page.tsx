export default function GuidePage() {
  const guides = [
    {
      category: '🎒 시작하기',
      items: [
        '디지털 노마드란?',
        '한국에서 노마드 생활 시작하기',
        '필요한 준비물과 체크리스트',
        '노마드를 위한 마인드셋',
      ],
    },
    {
      category: '💼 비자 & 법률',
      items: [
        '외국인 체류 비자 종류',
        '장기 체류 신청 방법',
        '세금 및 보험 정보',
        '은행 계좌 개설 가이드',
      ],
    },
    {
      category: '🏠 숙소 & 생활',
      items: [
        '월세 vs 에어비앤비 vs 게스트하우스',
        '지역별 숙소 가격 비교',
        '생활비 절약 꿀팁',
        '한국 생활 문화 이해하기',
      ],
    },
    {
      category: '💻 업무 환경',
      items: [
        '최고의 카페 작업 환경 찾기',
        '코워킹 스페이스 추천',
        '인터넷 속도 테스트 방법',
        '재택근무 생산성 팁',
      ],
    },
    {
      category: '🌐 네트워킹',
      items: [
        '노마드 커뮤니티 참여하기',
        '밋업 및 이벤트 찾기',
        '현지인과 교류하기',
        '온라인 네트워킹 전략',
      ],
    },
    {
      category: '🚗 교통 & 이동',
      items: [
        '대중교통 이용 가이드',
        '지역 간 이동 방법',
        '렌터카 vs 카셰어링',
        '교통카드 사용법',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            📚 노마드 가이드
          </h1>
          <p className="text-gray-600">
            성공적인 한국 디지털 노마드 생활을 위한 완벽한 가이드
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-8 text-white">
            <div className="mb-4 text-5xl">🎯</div>
            <h3 className="mb-2 text-2xl font-bold">시작하기</h3>
            <p>노마드 생활의 첫 걸음을 내딛어보세요</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white">
            <div className="mb-4 text-5xl">💡</div>
            <h3 className="mb-2 text-2xl font-bold">꿀팁 모음</h3>
            <p>경험자들의 생생한 노하우를 확인하세요</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 p-8 text-white">
            <div className="mb-4 text-5xl">🤝</div>
            <h3 className="mb-2 text-2xl font-bold">커뮤니티</h3>
            <p>같은 길을 걷는 노마드들과 연결되세요</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm"
            >
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {guide.category}
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {guide.items.map((item, i) => (
                    <li key={i}>
                      <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all hover:bg-blue-50">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                          {i + 1}
                        </span>
                        <span className="flex-1 font-medium text-gray-700">
                          {item}
                        </span>
                        <span className="text-blue-600">→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            더 궁금한 점이 있으신가요?
          </h2>
          <p className="mb-6 text-gray-600">
            커뮤니티에서 다른 노마드들에게 질문해보세요
          </p>
          <button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg">
            커뮤니티 바로가기
          </button>
        </div>
      </div>
    </main>
  );
}
