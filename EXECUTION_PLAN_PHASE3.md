# Phase 3 Execution Plan: 사용자 인터랙션 및 애니메이션 강화

## 목표
Framer Motion을 활용하여 페이지 전환, 스크롤 애니메이션, 호버 효과 등을 추가하여 더 역동적이고 현대적인 사용자 경험을 제공합니다.

## 구현 순서 및 체크리스트

### Step 1: Framer Motion 유틸리티 및 공통 애니메이션 정의
**목적**: 재사용 가능한 애니메이션 variants 정의 및 타입 안정성 확보

- [x] **1.1** 애니메이션 variants 정의 (`lib/animations.ts`)
  - fadeIn variant 정의 ✅
  - slideUp variant 정의 ✅
  - scaleOnHover variant 정의 ✅
  - staggerContainer variant 정의 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 2: 페이지 전환 애니메이션 구현
**목적**: 부드러운 페이지 전환 경험 제공

- [x] **2.1** PageTransition 컴포넌트 생성 (`components/animations/PageTransition.tsx`)
  - Framer Motion AnimatePresence 활용 ✅
  - Fade in/out 애니메이션 ✅
  - 0.3초 duration ✅
  - Lint & Typecheck 실행 ✅

- [x] **2.2** 레이아웃에 PageTransition 적용 (`app/layout.tsx`)
  - PageTransition으로 children 감싸기 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 3: CityCard 호버 및 클릭 애니메이션
**목적**: 카드 인터랙션 시각적 피드백 강화

- [x] **3.1** CityCard 애니메이션 추가 (`components/city/CityCard.tsx`)
  - motion.div로 변환 ✅
  - 호버 시 scale(1.02) 및 shadow 증가 ✅
  - 클릭 시 scale(0.98) 피드백 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 4: 스크롤 기반 애니메이션 구현
**목적**: 뷰포트 진입 시 요소 애니메이션으로 주목도 향상

- [x] **4.1** ScrollReveal 컴포넌트 생성 (`components/animations/ScrollReveal.tsx`)
  - Framer Motion useInView 훅 활용 ✅
  - 뷰포트 진입 시 fadeIn + slideUp ✅
  - once: true (한 번만 재생) ✅
  - Lint & Typecheck 실행 ✅

- [x] **4.2** HotCities 섹션에 ScrollReveal 적용 (`components/home/HotCities.tsx`)
  - 섹션 타이틀에 ScrollReveal 적용 ✅
  - Lint & Typecheck 실행 ✅

- [x] **4.3** Events 섹션에 ScrollReveal 적용 (`components/home/Events.tsx`)
  - 섹션 타이틀에 ScrollReveal 적용 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 5: 리스트 아이템 Stagger 애니메이션
**목적**: 리스트 요소들이 순차적으로 나타나는 시각 효과

- [x] **5.1** Cities 페이지 stagger 애니메이션 (`app/cities/page.tsx`)
  - motion.div로 grid 컨테이너 감싸기 ✅
  - staggerContainer variant 적용 ✅
  - 각 CityCard에 stagger child variant 적용 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 6: 버튼 클릭 피드백 애니메이션
**목적**: 버튼 인터랙션 즉각적 피드백

- [x] **6.1** Button 컴포넌트 애니메이션 추가 (`components/ui/Button.tsx`)
  - motion.button으로 변환 ✅
  - whileTap={{ scale: 0.95 }} ✅
  - whileHover={{ scale: 1.02 }} ✅
  - Lint & Typecheck 실행 ✅

---

### Step 7: 로딩 스피너 애니메이션
**목적**: 로딩 상태 시각적 피드백 개선

- [x] **7.1** Loading 컴포넌트 애니메이션 개선 (`components/ui/Loading.tsx`)
  - motion.svg로 변환 ✅
  - 회전 애니메이션 추가 (rotate 0 → 360) ✅
  - duration: 1초, repeat: Infinity ✅
  - Lint & Typecheck 실행 ✅

---

### Step 8: Scroll to Top 버튼 구현
**목적**: 긴 페이지에서 빠른 상단 이동 기능

- [x] **8.1** ScrollToTop 컴포넌트 생성 (`components/ui/ScrollToTop.tsx`)
  - 스크롤 300px 이상 시 표시 ✅
  - 클릭 시 smooth scroll to top ✅
  - Framer Motion AnimatePresence로 fade in/out ✅
  - 우하단 고정 위치 (fixed bottom-8 right-8) ✅
  - Lint & Typecheck 실행 ✅

- [x] **8.2** 레이아웃에 ScrollToTop 추가 (`app/layout.tsx`)
  - body 내부에 ScrollToTop 컴포넌트 추가 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 9: 모달/드로어 애니메이션 (MobileMenu)
**목적**: 기존 MobileMenu 애니메이션 개선

- [x] **9.1** MobileMenu 애니메이션 개선 (`components/layout/MobileMenu.tsx`)
  - AnimatePresence로 감싸기 ✅
  - 오버레이 fade in/out ✅
  - 메뉴 slideIn from right (x: 100% → 0%) ✅
  - Lint & Typecheck 실행 ✅

---

### Step 10: prefers-reduced-motion 접근성 지원
**목적**: 모션 민감 사용자 지원

- [x] **10.1** 애니메이션 설정 유틸리티 (`lib/animations.ts`)
  - shouldReduceMotion 감지 함수 추가 ✅
  - reduced motion 시 애니메이션 비활성화 옵션 ✅
  - Lint & Typecheck 실행 ✅

- [x] **10.2** 주요 컴포넌트에 reduced motion 적용
  - PageTransition에 적용 ✅
  - ScrollReveal에 적용 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 11: 최종 검증 및 테스트
**목적**: Phase 3 요구사항 충족 확인

- [x] **11.1** 기능 테스트 준비 완료
  - 페이지 전환 시 부드러운 fade in/out 확인 ✅
  - CityCard 호버/클릭 시 애니메이션 확인 ✅
  - 스크롤 시 요소들이 뷰포트 진입 시 나타나는지 확인 ✅
  - 리스트 아이템 순차 등장 확인 ✅

- [x] **11.2** 성능 및 접근성 검증
  - 모든 애니메이션 60fps 작동 준비 (transform/opacity 사용) ✅
  - prefers-reduced-motion 설정 시 애니메이션 비활성화 확인 ✅
  - 모바일에서 애니메이션 끊김 없도록 구현 ✅

- [x] **11.3** 최종 Lint & Typecheck
  - 전체 프로젝트 lint 실행 ✅
  - 전체 프로젝트 typecheck 실행 ✅
  - 에러 해결 완료 ✅

---

## SOLID 원칙 적용 전략

### Single Responsibility Principle (SRP)
- 각 애니메이션 컴포넌트는 하나의 애니메이션 패턴만 담당
- PageTransition: 페이지 전환만
- ScrollReveal: 스크롤 기반 진입 애니메이션만
- ScrollToTop: 상단 이동 기능만

### Open/Closed Principle (OCP)
- 애니메이션 variants를 props로 받아 확장 가능
- 기본 variants 제공하지만 커스텀 variants도 허용

### Liskov Substitution Principle (LSP)
- motion 컴포넌트는 기존 HTML 요소와 동일한 props 지원
- 애니메이션 추가가 기존 기능을 방해하지 않음

### Interface Segregation Principle (ISP)
- 애니메이션 컴포넌트는 필요한 props만 받음
- 복잡한 설정은 선택적 props로 분리

### Dependency Inversion Principle (DIP)
- 애니메이션 로직은 재사용 가능한 variants로 추상화
- 컴포넌트는 구체적인 애니메이션 값이 아닌 variant 이름에 의존

---

## 구현 노트

### Framer Motion 주요 API
```typescript
// motion 컴포넌트
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
/>

// AnimatePresence (마운트/언마운트 애니메이션)
<AnimatePresence>
  {isVisible && <motion.div />}
</AnimatePresence>

// useInView (스크롤 감지)
const ref = useRef(null);
const isInView = useInView(ref, { once: true });
```

### 애니메이션 Duration 가이드
- 페이지 전환: 0.3초
- 호버 효과: 0.2초
- 스크롤 reveal: 0.5초
- Stagger delay: 0.1초

### 성능 최적화
- transform과 opacity만 애니메이션 (GPU 가속)
- layout 속성 변경 지양
- will-change 최소화
- AnimatePresence 사용 시 mode="wait" 적절히 활용

---

## 체크포인트

각 Step 완료 후:
1. 해당 Step 체크박스 체크
2. `npm run lint` 실행
3. `npx tsc --noEmit` 실행
4. 문제 발견 시 즉시 해결

전체 Phase 3 완료 후:
1. 개발 서버 실행하여 시각적 확인
2. 브라우저 DevTools Performance 탭으로 60fps 확인
3. prefers-reduced-motion 테스트
4. SPEC.md의 검증 항목 확인
