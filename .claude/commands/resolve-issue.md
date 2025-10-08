# GitHub Issue 해결 계획 수립 커맨드

이 커맨드는 GitHub Issue를 가져와서 해결을 위한 상세한 실행 계획을 수립하고 사용자의 승인을 받습니다.

**입력**: $ARGUMENT (GitHub Issue 번호)
**출력**: 이슈 분석 + 실행 계획 + 사용자 승인 대기

---

## 커맨드

**Issue #**: $ARGUMENT

### 1단계: GitHub Issue 가져오기

#### GitHub CLI로 이슈 조회
```bash
gh issue view $ARGUMENT --json number,title,body,labels,state,assignees,milestone,createdAt,updatedAt
```

#### 이슈 정보 파싱
- **번호**: #$ARGUMENT
- **제목**: [파싱 후 표시]
- **상태**: Open/Closed
- **라벨**: [타입, 우선순위, 작업량 등]
- **담당자**: [있는 경우]
- **생성일**: [날짜]

---

### 2단계: 이슈 내용 분석

#### 핵심 요구사항 추출

**문제 정의**:
- 현재 상태: [이슈 본문에서 추출]
- 목표: [이슈 본문에서 추출]
- 배경/동기: [이슈 본문에서 추출]

**작업 범위**:
- 구현해야 할 것: [체크리스트 추출]
- 영향받는 파일: [파일 경로 목록]
- 의존성: [선행/연관 작업]

**완료 조건 (DoD)**:
- [이슈의 완료 조건 체크리스트 복사]

---

#### 코드베이스 현황 조사

**관련 파일 검색**:
1. 이슈에서 언급된 파일 존재 여부 확인
2. 유사 패턴 파일 검색 (glob/grep)
3. 의존성 파일 확인 (import 관계)

**예시**:
```bash
# 파일 존재 확인
ls app/cities/[slug]/page.tsx 2>/dev/null || echo "파일 없음 - 신규 생성 필요"

# 유사 패턴 검색
find components/city -name "*.tsx" 2>/dev/null

# 관련 타입 정의 확인
grep -r "interface City" types/
```

**현황 요약**:
- ✅ 존재하는 파일: [목록]
- ❌ 생성 필요한 파일: [목록]
- 🔗 참고할 유사 코드: [목록]

---

#### 기술적 제약사항 파악

**프로젝트 아키텍처**:
- Framework: Next.js 15 App Router
- State: Zustand with persist
- Styling: Tailwind CSS v4
- 애니메이션: Framer Motion

**준수해야 할 패턴**:
- Server/Client Component 분리
- 타입 안전성 (TypeScript strict mode)
- 접근성 기준 (WCAG 2.1 AA)
- 반응형 디자인

**제약사항**:
- [이슈나 CLAUDE.md에서 언급된 제약사항]
- [기술 스택에서 오는 제약사항]

---

### 3단계: 상세 실행 계획 수립

#### 작업 분해 (Task Breakdown)

**Phase 1: 준비 및 설계 (예상: X분)**

- [ ] **Task 1.1**: [작업명] - X분
  - **목적**: [왜 필요한가]
  - **상세 동작**:
    1. [구체적 단계 1]
    2. [구체적 단계 2]
  - **입력**: [필요한 데이터/파일]
  - **출력**: [생성되는 결과물]
  - **검증 방법**: [완료를 어떻게 확인하나]
  - **사용 도구**: Read/Write/Edit/Bash 중 선택

- [ ] **Task 1.2**: [작업명] - X분
  - **목적**:
  - **상세 동작**:
  - **입력**:
  - **출력**:
  - **검증 방법**:
  - **사용 도구**:

---

**Phase 2: 핵심 구현 (예상: X분)**

- [ ] **Task 2.1**: [작업명] - X분
  - **목적**:
  - **상세 동작**:
    ```typescript
    // 구현할 코드 개요 (실제 코드 아님)
    export default function Component() {
      // 주요 로직
    }
    ```
  - **입력**:
  - **출력**:
  - **검증 방법**:
  - **사용 도구**:

- [ ] **Task 2.2**: [작업명] - X분
  - (동일 형식 반복)

---

**Phase 3: 통합 및 스타일링 (예상: X분)**

- [ ] **Task 3.1**: [작업명]
- [ ] **Task 3.2**: [작업명]

---

**Phase 4: 테스트 및 검증 (예상: X분)**

- [ ] **Task 4.1**: 기능 테스트
  - **테스트 시나리오**:
    1. [시나리오 1]
    2. [시나리오 2]
  - **검증 방법**: [도구/방법]

- [ ] **Task 4.2**: 접근성 테스트
  - **체크리스트**:
    - [ ] Tab 키보드 네비게이션
    - [ ] ARIA 속성
    - [ ] 스크린 리더

- [ ] **Task 4.3**: 빌드 및 린트
  - **명령어**:
    ```bash
    npm run lint
    npm run build
    ```

---

**Phase 5: 문서화 및 마무리 (예상: X분)**

- [ ] **Task 5.1**: 코드 주석 추가
- [ ] **Task 5.2**: CLAUDE.md 업데이트 (필요 시)
- [ ] **Task 5.3**: 이슈 완료 처리
  - **명령어**:
    ```bash
    gh issue close $ARGUMENT --comment "✅ 작업 완료\n\n[완료 내용 요약]"
    ```

---

#### 작업 의존성 그래프

```
Phase 1: 준비
  Task 1.1 → Task 1.2
              ↓
Phase 2: 구현
  Task 2.1 → Task 2.2 → Task 2.3
              ↓
Phase 3: 통합
  Task 3.1 → Task 3.2
              ↓
Phase 4: 테스트
  Task 4.1 (기능) ─┐
  Task 4.2 (접근성)─┤
  Task 4.3 (빌드) ─┘
              ↓
Phase 5: 마무리
  Task 5.1 → Task 5.2 → Task 5.3
```

**병렬 가능 작업**:
- [Task A]와 [Task B]는 동시 진행 가능

**블로킹 작업** (반드시 순차 실행):
- [Task X] 완료 전까지 [Task Y] 시작 불가

---

#### 예상 소요 시간

| Phase | 최소 | 예상 | 최대 |
|-------|------|------|------|
| Phase 1: 준비 | X분 | Y분 | Z분 |
| Phase 2: 구현 | X분 | Y분 | Z분 |
| Phase 3: 통합 | X분 | Y분 | Z분 |
| Phase 4: 테스트 | X분 | Y분 | Z분 |
| Phase 5: 마무리 | X분 | Y분 | Z분 |
| **전체** | **X시간** | **Y시간** | **Z시간** |

---

### 4단계: 위험 요소 및 대응 전략

#### 잠재적 위험

**위험 1**: [구체적 위험 내용]
- **발생 가능성**: High / Medium / Low
- **영향도**: High / Medium / Low
- **완화 전략**: [사전 방지 방법]
- **대응 계획**: [발생 시 처리 방법]
- **대안**: [Plan B]

**위험 2**: [구체적 위험 내용]
- **발생 가능성**:
- **영향도**:
- **완화 전략**:
- **대응 계획**:
- **대안**:

---

#### 기술적 불확실성

**불확실한 부분 1**: [설명]
- **조사 필요 사항**: [무엇을 알아봐야 하나]
- **POC 필요 여부**: Yes/No
- **조사 시간**: X분
- **결정 기준**: [어떤 조건으로 판단하나]

**불확실한 부분 2**: [설명]
- (동일 형식 반복)

---

#### 블로킹 이슈

**외부 의존성**:
- [ ] 다른 이슈 완료 대기: #이슈번호
- [ ] API/라이브러리 제한사항: [설명]
- [ ] 디자인/기획 확정 필요: [설명]

**해결 방법**:
- [블로킹 요소를 우회하거나 해결하는 방법]

---

### 5단계: 검증 계획

#### 단위 검증 (Task별)

| Task | 검증 방법 | 통과 기준 |
|------|-----------|-----------|
| Task 1.1 | [방법] | [기준] |
| Task 2.1 | [방법] | [기준] |
| Task 3.1 | [방법] | [기준] |

---

#### 통합 검증 (Phase별)

**Phase 1 완료 후**:
- [ ] [확인 사항 1]
- [ ] [확인 사항 2]

**Phase 2 완료 후**:
- [ ] [확인 사항 1]
- [ ] [확인 사항 2]

**Phase 3 완료 후**:
- [ ] [확인 사항 1]
- [ ] [확인 사항 2]

---

#### 최종 검증 (이슈 완료 조건)

**기능 테스트**:
- [ ] [이슈의 DoD 1]
- [ ] [이슈의 DoD 2]
- [ ] [이슈의 DoD 3]

**비기능 요구사항**:
- [ ] 성능: [기준]
- [ ] 접근성: WCAG 2.1 AA 준수
- [ ] 반응형: 375px - 1920px 대응
- [ ] SEO: Lighthouse 점수 90+

**코드 품질**:
- [ ] `npm run lint` 통과 (경고 0개)
- [ ] `npm run build` 성공 (타입 에러 0개)
- [ ] 콘솔 에러/경고 없음

---

### 6단계: 실행 계획 요약

#### 우선순위별 작업 그룹

**P0 (즉시 시작 - 블로킹 요소)**:
- [ ] Task 1.1: [작업명]
- [ ] Task 1.2: [작업명]

**P1 (핵심 기능 - 순차 진행)**:
- [ ] Task 2.1: [작업명]
- [ ] Task 2.2: [작업명]
- [ ] Task 3.1: [작업명]

**P2 (부가 기능 - 시간 있으면)**:
- [ ] Task 4.1: [작업명]
- [ ] Task 5.1: [작업명]

---

#### 첫 번째 작업 (Immediate Next Step)

**🚀 지금 바로 시작할 작업**: Task 1.1 - [작업명]

**상세 내용**:
- **파일**: `[정확한 경로]`
- **동작**: [구체적 설명 3-5줄]
- **예상 시간**: X분
- **사용 도구**: Read/Write/Edit/Bash

**실행 명령 예시**:
```bash
# (Bash 명령이 필요한 경우)
```

```typescript
// (코드 작성이 필요한 경우 개요)
```

---

### 7단계: 사용자 승인 요청

---

## 📋 실행 계획 요약

### 이슈 정보
- **번호**: #$ARGUMENT
- **제목**: [제목]
- **타입**: [Feature/Bug/Enhancement 등]
- **우선순위**: [P0/P1/P2/P3]
- **예상 소요 시간**: X시간

### 작업 개요
- **총 Task 수**: X개
- **Phase 수**: X개
- **주요 생성 파일**: X개
- **주요 수정 파일**: X개

### 핵심 변경사항
1. [변경사항 1]
2. [변경사항 2]
3. [변경사항 3]

### 위험 요소
- ⚠️ [위험 1]
- ⚠️ [위험 2]

---

## ❓ 사용자 승인 질문

**이 실행 계획으로 진행하시겠습니까?**

**옵션**:
1. ✅ **승인 - 바로 시작**: "승인" 또는 "시작"이라고 답변
2. 🔄 **수정 요청**: 변경하고 싶은 부분을 구체적으로 말씀해주세요
3. ⏸️ **보류**: 추가 질문이나 확인이 필요한 경우
4. ❌ **거부**: 다른 접근 방법 제안 요청

**확인 사항**:
- [ ] 작업 범위가 이슈 요구사항과 일치하나요?
- [ ] 예상 소요 시간이 적절한가요?
- [ ] 위험 요소에 대한 대응 전략이 충분한가요?
- [ ] 첫 번째 작업부터 시작해도 괜찮나요?

---

**답변을 기다립니다...**

---

## 실행 예시

### 예시 입력: `/solve-issue 42`

### 1단계: GitHub Issue 가져오기 결과

```
✅ Issue #42 조회 완료

번호: #42
제목: [Feature] 도시 상세페이지 구현
상태: Open
라벨: feature, priority: high, size: large, area: ui
담당자: @me
생성일: 2025-10-08
```

### 2단계: 이슈 내용 분석

**문제 정의**:
- 현재 상태: 홈페이지에서 도시 카드만 표시, 상세 정보 없음
- 목표: 도시별 Dynamic Route 페이지 생성, 리뷰/이벤트 통합
- 배경: SPEC.md Phase 1-2 핵심 기능

**작업 범위**:
- 구현: Dynamic Route, 7개 컴포넌트, SEO 메타데이터
- 영향 파일: app/cities/[slug]/, components/city/*, types/index.ts
- 의존성: 리뷰 시스템, 이벤트 시스템 (이미 구현됨)

**코드베이스 현황**:
- ✅ 존재: components/reviews/ReviewList.tsx, components/events/EventCard.tsx
- ❌ 생성 필요: app/cities/[slug]/page.tsx, components/city/* (7개)
- 🔗 참고 코드: app/events/[id]/page.tsx (Dynamic Route 패턴)

### 3단계: 상세 실행 계획

**Phase 1: 기본 구조 (예상: 35분)**

- [ ] **Task 1.1**: Dynamic Route 페이지 생성 - 20분
  - **목적**: URL slug로 도시 페이지 라우팅
  - **상세 동작**:
    1. `app/cities/[slug]/page.tsx` 파일 생성
    2. `generateStaticParams`로 모든 도시 slug 사전 생성
    3. `generateMetadata`로 SEO 메타데이터
    4. params로 slug 받아 city 찾기, notFound() 처리
  - **입력**: lib/data.ts의 cities 배열
  - **출력**: /cities/jeju 접속 시 기본 레이아웃
  - **검증 방법**: 브라우저에서 /cities/jeju 접속, 404 없이 표시
  - **사용 도구**: Write

- [ ] **Task 1.2**: Client Wrapper 컴포넌트 - 15분
  - **목적**: 클라이언트 인터랙션 처리 (찜, 비교, 최근 본 도시)
  - **상세 동작**:
    1. `components/city/CityDetailClient.tsx` 생성
    2. useEffect로 마운트 시 useRecentStore.addCity 호출
    3. 찜/비교/공유 버튼 이벤트 핸들러
  - **입력**: City 객체 props
  - **출력**: 버튼 클릭 시 스토어 상태 변경
  - **검증 방법**: 페이지 접속 후 최근 본 도시 확인, 버튼 클릭 반응
  - **사용 도구**: Write

---

**Phase 2: 핵심 UI 컴포넌트 (예상: 90분)**

- [ ] **Task 2.1**: CityHero 컴포넌트 - 30분
  - **목적**: 히어로 이미지와 도시 제목 표시
  - **상세 동작**:
    ```typescript
    // components/city/CityHero.tsx
    export default function CityHero({ city }) {
      return (
        <div className="relative h-[400px] lg:h-[500px]">
          <Image src={city.image} fill objectFit="cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70">
            <h1>{city.name}</h1>
            <p>{city.description}</p>
          </div>
        </div>
      );
    }
    ```
  - **검증 방법**: 이미지 로드, 텍스트 가독성 확인
  - **사용 도구**: Write

- [ ] **Task 2.2**: CityStats 카드 그리드 - 40분
- [ ] **Task 2.3**: RatingBreakdown - 30분

(이하 생략 - 총 15개 Task)

---

**예상 소요 시간**: 최소 4시간, 예상 5.5시간, 최대 7시간

---

### 7단계: 사용자 승인 요청

## 📋 실행 계획 요약

### 이슈 정보
- **번호**: #42
- **제목**: [Feature] 도시 상세페이지 구현
- **타입**: Feature
- **우선순위**: High
- **예상 소요 시간**: 5.5시간

### 작업 개요
- **총 Task 수**: 15개
- **Phase 수**: 5개
- **주요 생성 파일**: 8개
- **주요 수정 파일**: 2개

### 핵심 변경사항
1. app/cities/[slug]/page.tsx 생성 (Dynamic Route)
2. components/city/ 하위 7개 컴포넌트 생성
3. 찜/비교/공유 기능 통합
4. 도시별 리뷰 및 이벤트 필터링

### 위험 요소
- ⚠️ Server/Client Component 경계 오류 (완화: 명확한 분리)
- ⚠️ 히어로 이미지 LCP 저하 (완화: priority 속성)

---

## ❓ 사용자 승인 질문

**이 실행 계획으로 진행하시겠습니까?**

답변을 기다립니다...

---

## 승인 후 실행

사용자가 "승인" 또는 "시작"이라고 답변하면:

1. **TodoWrite 도구로 전체 Task 목록 생성**
2. **Task 1.1부터 순차 실행 시작**
3. **각 Task 완료 시 TodoWrite로 상태 업데이트**
4. **Phase 완료 시 중간 검증 수행**
5. **전체 완료 시 gh issue close 실행**

---

이 템플릿을 사용하여 모든 GitHub Issue를 체계적으로 해결할 수 있습니다.


ARGUMENTS: $ARGUMENT
