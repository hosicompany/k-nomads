# GitHub Issue 생성 커맨드

이 커맨드는 작업을 GitHub Issue로 변환하여 이슈 트래커에 등록합니다.

**입력**: $ARGUMENT (생성할 이슈 설명)
**출력**: GitHub CLI를 사용하여 이슈 생성

---

## 커맨드

**작업**: $ARGUMENT

### 1단계: 이슈 분석

#### 이슈 유형 파악
- [ ] 버그 (Bug) - 기존 기능의 오류
- [ ] 기능 (Feature) - 새로운 기능 추가
- [ ] 개선 (Enhancement) - 기존 기능 향상
- [ ] 문서 (Documentation) - 문서 작성/수정
- [ ] 리팩토링 (Refactoring) - 코드 구조 개선
- [ ] 성능 (Performance) - 성능 최적화
- [ ] 접근성 (Accessibility) - 접근성 개선
- [ ] 테스트 (Testing) - 테스트 코드 작성

#### 우선순위 결정
- **P0 (Critical)**: 즉시 해결 필요, 서비스 중단
- **P1 (High)**: 중요한 기능, 빠른 처리 필요
- **P2 (Medium)**: 일반적인 작업
- **P3 (Low)**: 개선 사항, 시간 날 때 처리

#### 예상 작업량
- **Small**: 1-2시간 (단순 수정, 문서 작업)
- **Medium**: 3-6시간 (새 컴포넌트, 기능 추가)
- **Large**: 1일 이상 (복잡한 기능, 아키텍처 변경)

---

### 2단계: 이슈 제목 생성

**형식**: `[타입] 간결한 설명 (한글)`

**예시**:
- `[Feature] 도시 상세페이지 구현`
- `[Bug] 리뷰 작성 시 cityId가 저장되지 않는 문제`
- `[Enhancement] CityCard 호버 애니메이션 개선`
- `[Docs] README에 개발 환경 설정 가이드 추가`

**생성된 제목**:
```
[타입] $ARGUMENT의 핵심 요약
```

---

### 3단계: 이슈 본문 작성

#### 📋 개요
<!-- 이슈의 배경과 목적을 2-3문장으로 설명 -->

**현재 상태**:
-

**목표**:
-

**배경/동기**:
-

---

#### 🎯 작업 범위

##### 구현해야 할 것
- [ ] 작업 1
- [ ] 작업 2
- [ ] 작업 3

##### 영향받는 파일
- `app/...`
- `components/...`
- `lib/...`
- `types/...`

##### 의존성
- 선행 작업: #이슈번호 (있는 경우)
- 연관 작업: #이슈번호 (있는 경우)

---

#### 💡 구현 방향

##### 기술적 접근
<!-- 어떤 기술/패턴을 사용할지 -->

**사용할 기술**:
-

**설계 결정**:
-

##### 고려사항
- **성능**:
- **접근성**:
- **반응형**:
- **SEO**:

---

#### ✅ 완료 조건 (Definition of Done)

- [ ] 기능이 의도대로 작동함
- [ ] 반응형 디자인 적용 (모바일, 태블릿, 데스크톱)
- [ ] 접근성 기준 충족 (키보드 네비게이션, ARIA 속성)
- [ ] 타입 에러 없음 (`npm run build` 성공)
- [ ] ESLint 경고 없음 (`npm run lint` 통과)
- [ ] 관련 문서 업데이트 (필요 시)

---

#### 🧪 테스트 체크리스트

**기능 테스트**:
- [ ] 주요 시나리오 1
- [ ] 주요 시나리오 2
- [ ] 엣지 케이스 처리

**브라우저 테스트**:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari
- [ ] Mobile Chrome

**접근성 테스트**:
- [ ] Tab 키보드 네비게이션
- [ ] 스크린 리더 (NVDA/VoiceOver)
- [ ] 고대비 모드

---

#### 📚 참고 자료

**관련 문서**:
- SPEC.md (해당 섹션)
- CLAUDE.md (관련 패턴)

**참고 코드**:
- 유사한 컴포넌트: `components/...`
- 사용 예시: `app/...`

**외부 링크**:
- Next.js 문서:
- 디자인 참고:

---

#### 🏷️ 라벨

**자동 적용 라벨**:
- 타입: `feature` / `bug` / `enhancement` / `docs` / `refactor` / `performance` / `a11y` / `test`
- 우선순위: `priority: critical` / `priority: high` / `priority: medium` / `priority: low`
- 작업량: `size: small` / `size: medium` / `size: large`
- 영역: `area: ui` / `area: api` / `area: docs` / `area: infra`

---

### 4단계: 이슈 생성 실행

#### GitHub CLI 명령어 구성

```bash
gh issue create \
  --title "[타입] 제목" \
  --body "$(cat <<'EOF'
[위에서 작성한 이슈 본문 전체]
EOF
)" \
  --label "타입,우선순위,작업량,영역" \
  --assignee "@me"
```

#### 생성 후 확인
- [ ] 이슈 번호 확인
- [ ] 라벨 정상 적용 확인
- [ ] 프로젝트 보드에 자동 추가 (설정된 경우)
- [ ] 이슈 URL 반환

---

## 실행 예시

### 예시 1: 기능 추가

**입력**: `도시 상세페이지 구현`

**생성된 이슈**:

```markdown
제목: [Feature] 도시 상세페이지 구현

본문:
📋 개요

현재 상태:
- 홈페이지에서 도시 카드만 표시되고 상세 정보를 볼 수 없음
- 사용자가 도시별 세부 정보(리뷰, 이벤트, 통계)를 확인할 방법 없음

목표:
- 도시별 Dynamic Route 페이지 생성
- 도시 상세 정보, 리뷰, 관련 이벤트를 한 페이지에서 제공
- 찜하기, 비교하기, 공유 기능 통합

배경/동기:
- SPEC.md Phase 1-2에서 계획된 핵심 기능
- 사용자가 도시 선택 전 충분한 정보를 얻을 수 있도록 지원

---

🎯 작업 범위

구현해야 할 것:
- [ ] Dynamic Route 페이지 생성 (`app/cities/[slug]/page.tsx`)
- [ ] CityHero 컴포넌트 (히어로 이미지, 제목)
- [ ] CityStats 컴포넌트 (통계 카드 그리드)
- [ ] RatingBreakdown 컴포넌트 (평점 상세)
- [ ] CityDescription 컴포넌트 (설명, 하이라이트, 팁)
- [ ] CityReviews 컴포넌트 (도시별 리뷰 필터링)
- [ ] RelatedEvents 컴포넌트 (관련 이벤트)
- [ ] Action Buttons (찜, 비교, 공유)
- [ ] SEO Metadata 및 Breadcrumb

영향받는 파일:
- `app/cities/[slug]/page.tsx` (신규)
- `components/city/*` (다수 신규)
- `app/sitemap.ts` (도시 페이지 추가)
- `types/index.ts` (필요 시 City 타입 확장)

의존성:
- 선행 작업: 없음 (독립 작업)
- 연관 작업: #이슈번호 (리뷰 시스템), #이슈번호 (이벤트 시스템)

---

💡 구현 방향

사용할 기술:
- Next.js 15 App Router (Server/Client Component 분리)
- Framer Motion (스크롤 애니메이션)
- Zustand stores (찜, 비교, 최근 본 도시)

설계 결정:
- Server Component로 SEO 최적화, Client Component로 인터랙션 처리
- 기존 ReviewList, EventCard 컴포넌트 재사용
- URL 기반 slug로 도시 식별

고려사항:
- 성능: Hero 이미지 priority 속성, Image 최적화
- 접근성: Skip Link, ARIA Landmark, Breadcrumb
- 반응형: 모바일 단일 컬럼, 데스크톱 그리드
- SEO: generateMetadata, generateStaticParams

---

✅ 완료 조건

- [ ] /cities/jeju 접속 시 제주 상세페이지 표시
- [ ] 찜/비교/공유 버튼 정상 작동
- [ ] 리뷰 작성 모달에서 cityId 자동 포함
- [ ] 관련 이벤트 3개 표시 (있는 경우)
- [ ] 반응형 디자인 (375px - 1920px)
- [ ] Tab 키보드 네비게이션
- [ ] npm run build 성공
- [ ] Lighthouse 점수 90+ (Performance, Accessibility)

---

🧪 테스트 체크리스트

기능 테스트:
- [ ] 존재하는 slug → 도시 페이지 표시
- [ ] 존재하지 않는 slug → 404 페이지
- [ ] 찜 버튼 → useFavoritesStore 상태 변경
- [ ] 비교 버튼 → 최대 3개 제한 확인
- [ ] 공유 버튼 → 클립보드 복사 성공
- [ ] 리뷰 작성 → cityId 포함하여 저장
- [ ] 페이지 접속 → 최근 본 도시에 추가

브라우저 테스트:
- [ ] Chrome, Safari, Firefox 최신 버전
- [ ] iOS Safari, Android Chrome

접근성 테스트:
- [ ] Tab 키로 모든 버튼 접근
- [ ] 스크린 리더로 섹션 구분 확인

---

📚 참고 자료

관련 문서:
- SPEC.md (Phase 1, 2)
- CLAUDE.md (Server/Client Component 패턴)
- EXECUTION_PLAN_PHASE1.md

참고 코드:
- `app/events/[id]/page.tsx` (유사한 Dynamic Route)
- `components/home/CityCard.tsx` (도시 카드 디자인)

라벨: feature, priority: high, size: large, area: ui
```

---

### 예시 2: 버그 수정

**입력**: `리뷰 작성 시 cityId가 저장되지 않는 문제`

**생성된 이슈**:

```markdown
제목: [Bug] 리뷰 작성 시 cityId가 저장되지 않는 문제

본문:
📋 개요

현재 상태:
- ReviewForm에서 리뷰 제출 시 cityId가 undefined로 저장됨
- 도시별 리뷰 필터링 불가능

목표:
- ReviewForm에 cityId prop 전달 메커니즘 추가
- 리뷰 데이터에 cityId 정상 포함

배경/동기:
- 도시 상세페이지에서 리뷰 작성 기능 구현 중 발견
- 리뷰가 어느 도시에 속하는지 식별 불가

---

🎯 작업 범위

구현해야 할 것:
- [ ] ReviewForm 컴포넌트에 cityId prop 추가
- [ ] ReviewFormModal에 cityId 전달 로직
- [ ] useReviewStore.addReview에 cityId 포함
- [ ] 기존 리뷰 데이터 마이그레이션 (필요 시)

영향받는 파일:
- `components/reviews/ReviewForm.tsx`
- `components/reviews/ReviewFormModal.tsx`
- `store/useReviewStore.ts`

의존성:
- 선행 작업: 없음
- 연관 작업: #이슈번호 (도시 상세페이지)

---

💡 구현 방향

사용할 기술:
- TypeScript 타입 가드로 cityId 필수화

설계 결정:
- ReviewForm의 onSubmit에서 cityId 병합
- cityId 누락 시 에러 처리

고려사항:
- 성능: 영향 없음
- 접근성: 폼 유효성 검사 메시지 추가
- 반응형: 영향 없음
- SEO: 영향 없음

---

✅ 완료 조건

- [ ] 리뷰 작성 후 cityId가 정상 저장됨
- [ ] console.error 또는 타입 에러 없음
- [ ] 도시별 리뷰 필터링 정상 작동

---

🧪 테스트 체크리스트

기능 테스트:
- [ ] 도시 상세페이지 → 리뷰 작성 → cityId 포함 확인
- [ ] cityId 누락 시 폼 제출 방지
- [ ] 기존 리뷰 데이터 정상 표시

---

📚 참고 자료

관련 문서:
- types/index.ts (Review 인터페이스)

라벨: bug, priority: high, size: small, area: ui
```

---

## 실행 가이드

### 전제 조건
1. GitHub CLI 설치 확인: `gh --version`
2. 인증 확인: `gh auth status`
3. 현재 저장소 확인: `gh repo view`

### 실행 단계
1. 위 템플릿에 따라 이슈 내용 작성
2. GitHub CLI 명령어 실행
3. 생성된 이슈 URL 확인 및 공유

### 라벨 매핑표

| 타입 | 라벨 |
|------|------|
| Feature | `feature` |
| Bug | `bug` |
| Enhancement | `enhancement` |
| Documentation | `docs` |
| Refactoring | `refactor` |
| Performance | `performance` |
| Accessibility | `a11y` |
| Testing | `test` |

| 우선순위 | 라벨 |
|----------|------|
| P0 | `priority: critical` |
| P1 | `priority: high` |
| P2 | `priority: medium` |
| P3 | `priority: low` |

| 작업량 | 라벨 |
|--------|------|
| Small | `size: small` |
| Medium | `size: medium` |
| Large | `size: large` |

---

이 템플릿을 사용하여 모든 작업을 체계적인 GitHub Issue로 변환할 수 있습니다.


ARGUMENTS: $ARGUMENT
