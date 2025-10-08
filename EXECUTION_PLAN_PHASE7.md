# Phase 7: 접근성 및 국제화 완성 - 실행 계획

## 개요
WCAG 2.1 AA 기준을 충족하는 접근성을 구현하고, 한국어/영어 완전 이중 언어 지원을 완성합니다.

## 작업 단계

### Step 1: Skip to Main Content 링크 ✅
- [ ] Skip link 컴포넌트 생성
- [ ] Root layout에 추가
- [ ] 키보드 포커스 시에만 표시
- [ ] Lint & typecheck

### Step 2: 키보드 포커스 스타일 개선 ✅
- [ ] Tailwind CSS에 포커스 링 스타일 커스터마이징
- [ ] 모든 인터랙티브 요소에 focus-visible 적용
- [ ] 포커스 순서 확인 및 수정
- [ ] Lint & typecheck

### Step 3: ARIA 라벨 및 역할 추가 ✅
- [ ] 버튼에 aria-label 추가
- [ ] 폼 입력에 aria-describedby 추가
- [ ] 네비게이션에 role="navigation" 추가
- [ ] 랜드마크 역할 추가 (main, aside, footer)
- [ ] Lint & typecheck

### Step 4: 이미지 alt 텍스트 개선 ✅
- [ ] 모든 이미지에 의미있는 alt 텍스트 추가
- [ ] 장식용 이미지는 alt="" 처리
- [ ] 아이콘에 aria-hidden 또는 의미 제공
- [ ] Lint & typecheck

### Step 5: 색상 대비 및 정보 전달 개선 ✅
- [ ] 색상에만 의존하지 않도록 아이콘/텍스트 추가
- [ ] WCAG AA 기준 색상 대비 확인
- [ ] 에러 메시지에 아이콘 추가
- [ ] 상태 표시에 텍스트 레이블 추가
- [ ] Lint & typecheck

### Step 6: 다국어 지원 구조 구축 ✅
- [ ] i18n 폴더 및 번역 파일 생성 (ko.json, en.json)
- [ ] useTranslation 훅 생성
- [ ] 언어 전환 컨텍스트 생성
- [ ] 언어 선택 컴포넌트 생성
- [ ] Lint & typecheck

### Step 7: 주요 페이지 번역 적용 ✅
- [ ] Header 컴포넌트 번역
- [ ] Footer 컴포넌트 번역
- [ ] HomePage 번역
- [ ] CityCard 번역
- [ ] 주요 버튼/레이블 번역
- [ ] Lint & typecheck

### Step 8: 날짜/숫자 포맷 지역화 ✅
- [ ] 날짜 포맷 유틸 함수 생성
- [ ] 숫자 포맷 유틸 함수 생성
- [ ] 통화 포맷 유틸 함수 생성
- [ ] 이벤트/리뷰 날짜에 적용
- [ ] Lint & typecheck

### Step 9: 폼 접근성 개선 ✅
- [ ] 모든 input에 label 연결
- [ ] 에러 메시지에 role="alert" 추가
- [ ] 필수 필드에 required, aria-required 추가
- [ ] 에러 필드에 aria-invalid 추가
- [ ] Lint & typecheck

### Step 10: 최종 접근성 검증 ✅
- [ ] 키보드 네비게이션 전체 테스트
- [ ] Tab 순서 논리성 확인
- [ ] 포커스 트랩 (모달) 확인
- [ ] 언어 전환 테스트
- [ ] 프로덕션 빌드 성공 확인
- [ ] Lint & typecheck 최종 확인

## 기술 스택
- **국제화**: React Context API
- **번역 파일**: JSON
- **접근성**: ARIA, semantic HTML
- **스타일링**: Tailwind CSS (focus-visible)

## WCAG 2.1 AA 기준
- **Perceivable**: 텍스트 대안, 색상 대비
- **Operable**: 키보드 접근성, 충분한 시간
- **Understandable**: 읽기 쉬운 텍스트, 예측 가능한 동작
- **Robust**: 다양한 보조 기술과 호환

## 주의사항
- 모든 인터랙티브 요소는 키보드로 접근 가능해야 함
- 포커스 표시는 명확하게 보여야 함
- 에러 메시지는 스크린 리더가 읽을 수 있어야 함
- 색상만으로 정보를 전달하지 말 것
- 번역 누락 없도록 체크
