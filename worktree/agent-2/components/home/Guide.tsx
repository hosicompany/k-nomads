export default function Guide() {
  const guides = [
    {
      icon: '🎒',
      title: '노마드 시작 가이드',
      description: '디지털 노마드로 살아가기 위한 첫 걸음',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '💼',
      title: '비자 & 체류 정보',
      description: '한국에서 합법적으로 체류하는 방법',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🏠',
      title: '숙소 찾기 팁',
      description: '장기 체류에 적합한 숙소 선택 가이드',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: '💳',
      title: '생활비 절약 꿀팁',
      description: '적은 비용으로 풍요롭게 살기',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            📚 노마드 가이드
          </h2>
          <p className="text-gray-600">
            성공적인 노마드 생활을 위한 필수 정보
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl"
            >
              <div
                className={`bg-gradient-to-br ${guide.color} p-6 text-center transition-transform group-hover:scale-105`}
              >
                <div className="mb-2 text-5xl">{guide.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  <span>자세히 보기</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
