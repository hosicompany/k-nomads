# Phase 5 Execution Plan: 고급 기능 및 사용자 경험 개선

## 목표
즐겨찾기, 비교 기능, 고급 정렬 옵션 등 사용자가 더 효율적으로 정보를 활용할 수 있는 고급 기능을 추가합니다. Zustand를 활용한 전역 상태 관리로 사용자 선호도를 저장하고 복원합니다.

## 구현 순서 및 체크리스트

### Step 1: Zustand 스토어 생성
**목적**: 전역 상태 관리 기반 구축

- [ ] **1.1** 즐겨찾기 스토어 생성 (`store/useFavoritesStore.ts`)
  - 즐겨찾기 추가/제거 액션
  - localStorage 동기화
  - Lint & Typecheck 실행

- [ ] **1.2** 비교 스토어 생성 (`store/useCompareStore.ts`)
  - 비교 목록 추가/제거 (최대 3개)
  - 비교 초기화 액션
  - Lint & Typecheck 실행

- [ ] **1.3** 최근 본 도시 스토어 생성 (`store/useRecentStore.ts`)
  - 최근 본 도시 추가 (최대 10개)
  - 타임스탬프 관리
  - Lint & Typecheck 실행

---

### Step 2: 즐겨찾기 기능 구현
**목적**: 사용자가 관심 도시를 저장하고 관리

- [ ] **2.1** FavoriteButton 컴포넌트 (`components/city/FavoriteButton.tsx`)
  - 하트 아이콘 토글 버튼
  - 애니메이션 효과
  - Lint & Typecheck 실행

- [ ] **2.2** CityCard에 즐겨찾기 버튼 추가
  - FavoriteButton 통합
  - Lint & Typecheck 실행

- [ ] **2.3** City 상세 페이지에 즐겨찾기 버튼 추가
  - FavoriteButton 통합
  - Lint & Typecheck 실행

---

### Step 3: 도시 비교 기능 구현
**목적**: 최대 3개 도시를 나란히 비교

- [ ] **3.1** CompareButton 컴포넌트 (`components/city/CompareButton.tsx`)
  - 비교 추가/제거 버튼
  - 최대 3개 제한 안내
  - Lint & Typecheck 실행

- [ ] **3.2** CompareBar 컴포넌트 (`components/compare/CompareBar.tsx`)
  - 하단 고정 바
  - 선택된 도시 표시
  - 비교 페이지로 이동 버튼
  - Lint & Typecheck 실행

- [ ] **3.3** 비교 페이지 (`app/compare/page.tsx`)
  - 3개 도시 나란히 비교 UI
  - 모든 메트릭 비교 표시
  - Lint & Typecheck 실행

- [ ] **3.4** CityCard에 비교 버튼 추가
  - CompareButton 통합
  - Lint & Typecheck 실행

- [ ] **3.5** 레이아웃에 CompareBar 추가
  - 전역 CompareBar 표시
  - Lint & Typecheck 실행

---

### Step 4: 최근 본 도시 기능
**목적**: 사용자가 최근 본 도시를 빠르게 재방문

- [ ] **4.1** 도시 상세 페이지 방문 시 기록
  - useRecentStore 통합
  - Lint & Typecheck 실행

- [ ] **4.2** RecentCities 컴포넌트 (`components/home/RecentCities.tsx`)
  - 최근 본 도시 섹션
  - 홈페이지에 표시
  - Lint & Typecheck 실행

---

### Step 5: 공유하기 기능
**목적**: 도시 정보를 소셜 미디어로 공유

- [ ] **5.1** ShareButton 컴포넌트 (`components/city/ShareButton.tsx`)
  - 링크 복사 버튼
  - 토스트 알림
  - Lint & Typecheck 실행

- [ ] **5.2** City 상세 페이지에 공유 버튼 추가
  - ShareButton 통합
  - Lint & Typecheck 실행

---

### Step 6: 키보드 네비게이션 지원
**목적**: 키보드만으로 주요 기능 접근 가능

- [ ] **6.1** 키보드 단축키 구현
  - / 키: 검색 포커스
  - Esc 키: 모달 닫기 (이미 구현됨)
  - 탭 네비게이션 순서 확인
  - Lint & Typecheck 실행

---

### Step 7: 최종 검증 및 테스트
**목적**: Phase 5 요구사항 충족 확인

- [ ] **7.1** 기능 테스트
  - 즐겨찾기 추가/제거 후 새로고침 시 유지 확인
  - 도시 비교 UI 정상 작동 확인
  - 최근 본 도시 정상 표시 확인
  - 링크 복사 기능 확인

- [ ] **7.2** localStorage 테스트
  - 용량 제한 고려 (에러 핸들링)
  - 여러 브라우저에서 동작 확인

- [ ] **7.3** 최종 Lint & Typecheck
  - 전체 프로젝트 lint 실행
  - 전체 프로젝트 typecheck 실행
  - 에러 해결 완료

---

## SOLID 원칙 적용 전략

### Single Responsibility Principle (SRP)
- 각 스토어는 하나의 기능만 담당 (즐겨찾기, 비교, 최근 본)
- 각 버튼 컴포넌트는 하나의 액션만 수행

### Open/Closed Principle (OCP)
- 스토어는 새로운 액션 추가 가능하도록 설계
- 버튼 컴포넌트는 props로 확장 가능

### Liskov Substitution Principle (LSP)
- 모든 버튼 컴포넌트는 동일한 인터페이스 준수
- onClick, disabled, children props 공통

### Interface Segregation Principle (ISP)
- 각 스토어는 필요한 메서드만 노출
- 불필요한 의존성 제거

### Dependency Inversion Principle (DIP)
- 컴포넌트는 스토어 인터페이스에 의존
- localStorage는 스토어 내부에서만 사용

---

## 구현 노트

### Zustand 스토어 구조
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[]; // city slugs
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (slug) => set((state) => ({
        favorites: [...state.favorites, slug]
      })),
      removeFavorite: (slug) => set((state) => ({
        favorites: state.favorites.filter(s => s !== slug)
      })),
      isFavorite: (slug) => get().favorites.includes(slug),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
```

### localStorage 에러 핸들링
```typescript
try {
  localStorage.setItem('key', 'value');
} catch (error) {
  // QuotaExceededError 처리
  console.error('Storage full');
}
```

### 도시 비교 제한
- 최대 3개 도시만 비교 가능
- 3개 초과 시 토스트 메시지 표시
- 비교 목록이 비어있으면 CompareBar 숨김

---

## 체크포인트

각 Step 완료 후:
1. 해당 Step 체크박스 체크
2. `npm run lint` 실행
3. `npx tsc --noEmit` 실행
4. 문제 발견 시 즉시 해결

전체 Phase 5 완료 후:
1. 개발 서버 실행하여 모든 기능 테스트
2. 브라우저 개발자 도구에서 localStorage 확인
3. 새로고침 후 상태 유지 확인
4. SPEC.md의 검증 항목 확인
