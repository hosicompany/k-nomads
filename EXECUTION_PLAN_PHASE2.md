# Phase 2 Execution Plan: 검색 및 필터링 기능 구현

## 목표
도시 목록 페이지에 검색 및 다중 필터링 기능을 추가하여 사용자가 원하는 조건의 도시를 쉽게 찾을 수 있도록 합니다.

## 구현 순서 및 체크리스트

### Step 1: 필터 타입 정의 및 유틸리티 함수 생성
**목적**: TypeScript 타입 안정성 확보 및 필터링 로직 분리

- [x] **1.1** 필터 타입 정의 (`types/filters.ts`)
  - FilterState 인터페이스 정의 ✅
  - SortOption 타입 정의 ✅
  - WeatherType 타입 정의 ✅
  - Lint & Typecheck 실행 ✅

- [x] **1.2** 필터링 유틸리티 함수 (`lib/filters.ts`)
  - 도시 검색 함수 (한글/영문 지원) ✅
  - 생활비 범위 필터 함수 ✅
  - 인터넷 속도 필터 함수 ✅
  - 날씨 필터 함수 ✅
  - 정렬 함수 ✅
  - 다중 필터 조합 함수 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 2: URL 쿼리 파라미터 관리 훅 생성
**목적**: 필터 상태를 URL과 동기화하여 공유 가능한 링크 생성

- [x] **2.1** useFilterParams 훅 생성 (`hooks/useFilterParams.ts`)
  - useSearchParams와 useRouter 활용 ✅
  - 필터 상태 읽기 함수 ✅
  - 필터 상태 업데이트 함수 ✅
  - URL 쿼리 파라미터 변환 함수 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 3: 검색 입력 컴포넌트 개선
**목적**: 실시간 검색 기능 구현

- [x] **3.1** SearchInput 컴포넌트 개선 (`components/filters/SearchInput.tsx`)
  - 입력 디바운싱 (300ms) ✅
  - 검색어 입력 시 실시간 필터링 ✅
  - 검색어 클리어 버튼 ✅
  - placeholder 한글/영문 지원 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 4: 필터 컴포넌트 생성 (개별)
**목적**: 각 필터의 단일 책임 원칙 준수

- [x] **4.1** CostRangeFilter 컴포넌트 (`components/filters/CostRangeFilter.tsx`)
  - 최소/최대 생활비 입력 필드 ✅
  - 유효성 검사 (min < max) ✅
  - 반응형 레이아웃 ✅
  - Lint & Typecheck 실행 ✅

- [x] **4.2** InternetSpeedFilter 컴포넌트 (`components/filters/InternetSpeedFilter.tsx`)
  - 최소 인터넷 속도 선택 (드롭다운) ✅
  - 옵션: 전체, 50Mbps+, 80Mbps+, 100Mbps+ ✅
  - Lint & Typecheck 실행 ✅

- [x] **4.3** WeatherFilter 컴포넌트 (`components/filters/WeatherFilter.tsx`)
  - 날씨 유형 체크박스 (온화함, 추움, 더움) ✅
  - 다중 선택 가능 ✅
  - Lint & Typecheck 실행 ✅

- [x] **4.4** SortSelect 컴포넌트 (`components/filters/SortSelect.tsx`)
  - 정렬 옵션 드롭다운 ✅
  - 옵션: 평점순, 인기순, 생활비 낮은순, 생활비 높은순 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 5: 필터 패널 컴포넌트 생성
**목적**: 모든 필터를 통합하고 레이아웃 관리

- [x] **5.1** FilterPanel 컴포넌트 (`components/filters/FilterPanel.tsx`)
  - 모든 필터 컴포넌트 통합 ✅
  - 필터 초기화 버튼 ✅
  - 모바일/데스크톱 반응형 레이아웃 ✅
  - 접기/펼치기 기능 (모바일) ✅
  - Lint & Typecheck 실행 ✅

---

### Step 6: 검색 결과 없을 때 UI 컴포넌트
**목적**: 사용자 경험 향상

- [x] **6.1** EmptyState 컴포넌트 (`components/filters/EmptyState.tsx`)
  - 검색 결과 없을 때 메시지 표시 ✅
  - 필터 초기화 제안 버튼 ✅
  - 아이콘 및 설명 텍스트 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 7: Cities 페이지 필터 통합
**목적**: 필터링 기능을 도시 목록 페이지에 적용

- [x] **7.1** Cities 페이지 수정 (`app/cities/page.tsx`)
  - 'use client' 지시어 추가 ✅
  - useFilterParams 훅 통합 ✅
  - 필터링 로직 적용 ✅
  - FilterPanel 컴포넌트 추가 ✅
  - 검색 결과 카운트 표시 ✅
  - EmptyState 조건부 렌더링 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 8: 성능 최적화
**목적**: 대량 데이터에서도 빠른 필터링 보장

- [x] **8.1** 필터링 로직 최적화
  - useMemo로 필터링 결과 메모이제이션 ✅
  - useCallback으로 필터 함수 메모이제이션 ✅
  - 불필요한 리렌더링 방지 ✅
  - Lint & Typecheck 실행 ✅

---

### Step 9: 최종 검증 및 테스트
**목적**: Phase 2 요구사항 충족 확인

- [x] **9.1** 기능 테스트 준비 완료
  - 검색어 입력 시 실시간 필터링 (300ms 디바운싱) ✅
  - 여러 필터 동시 적용 (다중 필터 조합 함수) ✅
  - 필터 초기화 버튼 구현 ✅
  - 검색 결과 0개일 때 EmptyState 표시 ✅

- [x] **9.2** URL 쿼리 파라미터 통합 완료
  - 필터 적용 시 URL 자동 업데이트 ✅
  - URL 쿼리 파라미터로 필터 상태 복원 ✅
  - 브라우저 뒤로가기/앞으로가기 지원 ✅

- [x] **9.3** 다국어 및 성능 준비
  - 한글/영문 검색 지원 (name, nameEn 필드) ✅
  - useMemo로 성능 최적화 ✅
  - 모바일/데스크톱 반응형 레이아웃 ✅

- [x] **9.4** 최종 Lint & Typecheck
  - 전체 프로젝트 lint 실행 ✅
  - 전체 프로젝트 typecheck 실행 ✅
  - 에러 해결 완료 ✅

---

## SOLID 원칙 적용 전략

### Single Responsibility Principle (SRP)
- 각 필터 컴포넌트는 하나의 필터링 기능만 담당
- 필터링 로직은 유틸리티 함수로 분리
- URL 관리는 전용 훅으로 분리

### Open/Closed Principle (OCP)
- 필터 컴포넌트는 props로 확장 가능
- 새로운 필터 추가 시 기존 코드 수정 불필요
- FilterPanel은 children으로 확장 가능

### Liskov Substitution Principle (LSP)
- 모든 필터 컴포넌트는 동일한 인터페이스 준수
- 공통 props: value, onChange, label

### Interface Segregation Principle (ISP)
- 각 필터 컴포넌트는 필요한 props만 받음
- 복잡한 인터페이스를 작은 단위로 분리

### Dependency Inversion Principle (DIP)
- 필터링 로직은 순수 함수로 구현
- 컴포넌트는 구체적 구현이 아닌 추상화에 의존
- useFilterParams는 URL 라이브러리에 직접 의존하지 않음

---

## 구현 노트

### URL 쿼리 파라미터 구조
```
/cities?search=제주&minCost=100&maxCost=200&minSpeed=80&weather=warm,cool&sort=rating
```

### 필터 상태 인터페이스
```typescript
interface FilterState {
  search: string;
  minCost: number | null;
  maxCost: number | null;
  minSpeed: number | null;
  weather: string[];
  sort: 'rating' | 'popularity' | 'cost-asc' | 'cost-desc';
}
```

### 디바운싱 전략
- 검색 입력: 300ms 디바운싱
- 슬라이더/숫자 입력: 500ms 디바운싱
- 드롭다운/체크박스: 즉시 적용

---

## 체크포인트

각 Step 완료 후:
1. ✅ 해당 Step 체크박스 체크
2. ✅ `npm run lint` 실행
3. ✅ `npx tsc --noEmit` 실행
4. ✅ 문제 발견 시 즉시 해결

전체 Phase 2 완료 후:
1. ✅ 개발 서버 실행하여 시각적 확인
2. ✅ 모든 필터 조합 테스트
3. ✅ URL 공유 기능 테스트
4. ✅ SPEC.md의 검증 항목 확인
