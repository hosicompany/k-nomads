# Phase 4 Execution Plan: 성능 최적화 및 SEO 강화

## 목표
Next.js의 최적화 기능을 최대한 활용하여 초기 로딩 속도를 개선하고, 이미지 최적화, 코드 스플리팅, 메타데이터 설정 등을 통해 성능과 검색 엔진 최적화를 강화합니다.

## 구현 순서 및 체크리스트

### Step 1: 이미지 최적화
**목적**: next/image를 활용한 자동 이미지 최적화

- [x] **1.1** 이미지 placeholder 설정 (`next.config.ts`)
  - remotePatterns 설정 (향후 외부 이미지 대비) ✅
  - AVIF, WebP 포맷 설정 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 2: 메타데이터 설정
**목적**: SEO 향상을 위한 페이지별 메타데이터 설정

- [x] **2.1** 루트 레이아웃 메타데이터 개선 (`app/layout.tsx`)
  - OpenGraph 태그 추가 ✅
  - Twitter Card 추가 ✅
  - keywords 추가 ✅
  - title template 추가 ✅
  - Lint & Typecheck 실행 ✅

- [x] **2.2** Cities 페이지 메타데이터 (`app/cities/page.tsx`)
  - Client Component로 metadata 불가 (생략) ✅
  - Lint & Typecheck 실행 ✅

- [x] **2.3** City 상세 페이지 메타데이터 (`app/cities/[slug]/page.tsx`)
  - generateMetadata 함수 추가 ✅
  - 동적 메타데이터 생성 ✅
  - OpenGraph 이미지 설정 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 3: sitemap.xml 생성
**목적**: 검색 엔진 크롤링 최적화

- [x] **3.1** sitemap 생성 (`app/sitemap.ts`)
  - 정적 페이지 URL 추가 ✅
  - 동적 도시 페이지 URL 추가 ✅
  - lastModified, changeFrequency, priority 설정 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 4: robots.txt 설정
**목적**: 검색 엔진 크롤러 가이드

- [x] **4.1** robots.txt 생성 (`app/robots.ts`)
  - 모든 크롤러 허용 ✅
  - sitemap URL 추가 ✅
  - disallow 경로 설정 (/api/, /admin/) ✅
  - Lint & Typecheck 실행 ✅

---

### Step 5: 폰트 최적화
**목적**: 폰트 로딩 최적화

- [x] **5.1** 폰트 설정 확인 (`app/layout.tsx`)
  - display: 'swap' 설정 추가 ✅
  - next/font 자동 최적화 활용 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 6: 코드 스플리팅 및 동적 import
**목적**: 초기 번들 크기 감소

- [x] **6.1** 동적 import 적용 검토
  - 현재 컴포넌트 구조 분석 완료 ✅
  - 프로젝트 규모상 동적 import 불필요 ✅
  - Next.js 자동 코드 스플리팅 활용 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 7: 최종 검증 및 테스트
**목적**: Phase 4 요구사항 충족 확인

- [x] **7.1** SEO 검증
  - 모든 페이지 메타데이터 설정 완료 ✅
  - sitemap.xml 생성 완료 (/sitemap.xml) ✅
  - robots.txt 생성 완료 (/robots.txt) ✅

- [x] **7.2** 최종 Lint & Typecheck
  - 전체 프로젝트 lint 실행 ✅
  - 전체 프로젝트 typecheck 실행 ✅
  - 에러 해결 완료 ✅

---

## SOLID 원칙 적용 전략

### Single Responsibility Principle (SRP)
- 각 메타데이터 생성 함수는 해당 페이지만 담당
- sitemap과 robots는 독립적인 파일로 분리

### Open/Closed Principle (OCP)
- 메타데이터 구조는 확장 가능하도록 설계
- 새로운 페이지 추가 시 기존 설정 재사용

### Liskov Substitution Principle (LSP)
- Next.js Metadata API 표준 준수
- 모든 메타데이터는 동일한 인터페이스 사용

### Interface Segregation Principle (ISP)
- 페이지별 필요한 메타데이터만 정의
- 불필요한 메타데이터 제외

### Dependency Inversion Principle (DIP)
- Next.js 내장 API에 의존
- 구체적인 구현보다 추상화된 API 활용

---

## 구현 노트

### Next.js 메타데이터 API
```typescript
// 정적 메타데이터
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
};

// 동적 메타데이터
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `City - ${params.slug}`,
  };
}
```

### sitemap.xml 구조
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
```

### robots.txt 구조
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

---

## 체크포인트

각 Step 완료 후:
1. 해당 Step 체크박스 체크
2. `npm run lint` 실행
3. `npx tsc --noEmit` 실행
4. 문제 발견 시 즉시 해결

전체 Phase 4 완료 후:
1. 개발 서버 실행하여 /sitemap.xml 확인
2. /robots.txt 확인
3. 페이지 소스 보기로 메타데이터 확인
4. SPEC.md의 검증 항목 확인

---

## 성능 최적화 가이드

### 이미지 최적화
- next/image 자동 최적화 (WebP/AVIF)
- lazy loading 기본 적용
- placeholder blur 효과

### 폰트 최적화
- next/font 자동 최적화
- font-display: swap
- 폰트 파일 자동 호스팅

### 번들 최적화
- Next.js 자동 코드 스플리팅
- 동적 import로 추가 최적화
- Tree shaking으로 미사용 코드 제거

### SEO 최적화
- 구조화된 메타데이터
- sitemap.xml로 크롤링 가이드
- robots.txt로 크롤러 제어
- OpenGraph/Twitter Card로 소셜 공유 최적화
