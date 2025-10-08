# Phase 6: 커뮤니티 기능 강화 - 실행 계획

## 개요
이벤트 상세 페이지, 참가 신청, 리뷰 작성, 댓글 등 커뮤니티 인터랙션 기능을 구현합니다.

## 작업 단계

### Step 1: 데이터 모델 확장 ✅
- [ ] `types/index.ts`에 Review, Comment, EventRegistration 인터페이스 추가
- [ ] `lib/data.ts`에 리뷰, 댓글 가짜 데이터 추가
- [ ] Lint & typecheck

### Step 2: 이벤트 상세 페이지 구현 ✅
- [ ] `app/events/[id]/page.tsx` 동적 라우트 생성
- [ ] 이벤트 상세 정보 표시 컴포넌트
- [ ] 이벤트 참가 신청 버튼
- [ ] generateStaticParams로 정적 생성
- [ ] Lint & typecheck

### Step 3: 이벤트 참가 신청 기능 ✅
- [ ] `components/events/EventRegistrationForm.tsx` 생성
- [ ] 폼 유효성 검사 (이름, 이메일, 전화번호)
- [ ] 모달로 폼 표시
- [ ] 가짜 제출 처리 및 성공 메시지
- [ ] Lint & typecheck

### Step 4: 이벤트 필터링 기능 ✅
- [ ] `types/filters.ts`에 EventFilterState 추가
- [ ] `components/events/EventFilterPanel.tsx` 생성
- [ ] 카테고리 필터 (워크숍, 네트워킹, 밋업 등)
- [ ] 날짜 필터 (이번주, 이번달, 전체)
- [ ] 도시별 필터
- [ ] `lib/filters.ts`에 이벤트 필터 로직 추가
- [ ] Lint & typecheck

### Step 5: 리뷰 작성 기능 ✅
- [ ] `components/reviews/ReviewForm.tsx` 생성
- [ ] 별점 입력 컴포넌트 (`components/reviews/StarRating.tsx`)
- [ ] 텍스트 입력 필드 (제목, 내용)
- [ ] 이미지 업로드 프리뷰 (선택사항)
- [ ] Zustand store로 리뷰 상태 관리 (`store/useReviewStore.ts`)
- [ ] Lint & typecheck

### Step 6: 리뷰 목록 및 정렬 ✅
- [ ] `components/reviews/ReviewList.tsx` 생성
- [ ] `components/reviews/ReviewCard.tsx` 생성
- [ ] 정렬 옵션 (최신순, 평점순, 도움순)
- [ ] 페이지네이션 또는 무한 스크롤
- [ ] 도시 상세 페이지에 리뷰 섹션 통합
- [ ] Lint & typecheck

### Step 7: 댓글/답글 시스템 ✅
- [ ] `components/reviews/CommentSection.tsx` 생성
- [ ] `components/reviews/CommentItem.tsx` 생성
- [ ] 댓글 작성 폼
- [ ] 답글 기능 (최대 depth 2)
- [ ] Zustand store로 댓글 상태 관리
- [ ] Lint & typecheck

### Step 8: 좋아요/북마크 기능 ✅
- [ ] `store/useLikeStore.ts` - 리뷰 좋아요 관리
- [ ] `store/useBookmarkStore.ts` - 이벤트 북마크 관리
- [ ] `components/ui/LikeButton.tsx` 생성
- [ ] `components/ui/BookmarkButton.tsx` 생성
- [ ] localStorage 영속성 추가
- [ ] Lint & typecheck

### Step 9: 사용자 프로필 페이지 (읽기 전용) ✅
- [ ] `app/profile/[id]/page.tsx` 생성
- [ ] 사용자 기본 정보 표시
- [ ] 작성한 리뷰 목록
- [ ] 참가한 이벤트 목록
- [ ] 통계 (리뷰 수, 평균 평점 등)
- [ ] Lint & typecheck

### Step 10: 최종 검증 및 통합 테스트 ✅
- [ ] 모든 폼 유효성 검사 테스트
- [ ] 가짜 데이터 제출 플로우 확인
- [ ] 이벤트 필터 조합 테스트
- [ ] 리뷰/댓글 작성 후 UI 업데이트 확인
- [ ] localStorage 용량 제한 에러 핸들링 확인
- [ ] 프로덕션 빌드 성공 확인
- [ ] Lint & typecheck 최종 확인

## 기술 스택
- **상태 관리**: Zustand (reviews, comments, likes, bookmarks)
- **폼 처리**: React hooks (useState, useCallback)
- **애니메이션**: Framer Motion
- **스타일링**: Tailwind CSS
- **타입**: TypeScript (strict mode)

## SOLID 원칙 적용
- **Single Responsibility**: 각 컴포넌트는 하나의 책임만
- **Open/Closed**: Props로 확장 가능하게 설계
- **Liskov Substitution**: 인터페이스 일관성 유지
- **Interface Segregation**: 최소한의 props만 요구
- **Dependency Inversion**: 추상화된 인터페이스 사용

## 주의사항
- 모든 데이터는 가짜 데이터로 처리 (실제 DB 연동 없음)
- localStorage 용량 제한 고려 (10MB 이하)
- 각 step 완료 후 반드시 lint & typecheck 실행
- 모든 폼에 적절한 유효성 검사 추가
- 접근성 고려 (ARIA labels, keyboard navigation)
