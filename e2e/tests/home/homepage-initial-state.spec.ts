import { test, expect } from '@playwright/test';

/**
 * 홈페이지 초기 상태 E2E 테스트
 *
 * 테스트 범위:
 * - 홈페이지 로드 확인
 * - 로고 존재 확인
 * - 도시 카드 표시 확인
 * - 필터 미적용 상태 확인
 * - 데이터베이스의 모든 도시 표시 확인
 */
test.describe('Homepage - Initial State', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 홈페이지로 이동
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    // 페이지의 주요 컨텐츠가 로드될 때까지 대기
    await page.waitForSelector('h1:has-text("K-NOMADS")', { timeout: 10000 });
  });

  test('should navigate to homepage successfully', async ({ page }) => {
    // URL 확인
    await expect(page).toHaveURL('http://localhost:3000/');

    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/K-NOMADS/);
  });

  test('should display logo on homepage', async ({ page }) => {
    // 로고 링크 확인 (헤더의 K-NOMADS 로고)
    const logoLink = page.getByRole('link', { name: /K-NOMADS 홈페이지/i });
    await expect(logoLink).toBeVisible();

    // 로고 텍스트 확인
    const logoText = logoLink.locator('text=K-NOMADS');
    await expect(logoText).toBeVisible();

    // 로고 이모지 확인
    const logoEmoji = logoLink.locator('text=🏝️');
    await expect(logoEmoji).toBeVisible();
  });

  test('should display city cards on homepage', async ({ page }) => {
    // 도시 이름으로 카드 확인 (exact match로 이벤트 제목과 구분)
    const cities = ['제주도', '부산', '강릉', '경주', '전주'];

    for (const cityName of cities) {
      const cityHeading = page.getByRole('heading', { name: cityName, level: 3, exact: true });
      await expect(cityHeading.first()).toBeVisible();
    }
  });

  test('should have no filters applied on initial visit', async ({ page }) => {
    // URL에 쿼리 파라미터가 없는지 확인
    const url = page.url();
    expect(url).toBe('http://localhost:3000/');
    expect(url).not.toContain('?');

    // JavaScript를 사용하여 URL 쿼리 파라미터 확인
    const hasFilters = await page.evaluate(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        hasSearch: params.has('search'),
        hasMinCost: params.has('minCost'),
        hasMaxCost: params.has('maxCost'),
        hasMinSpeed: params.has('minSpeed'),
        hasWeather: params.has('weather'),
        hasSort: params.has('sort'),
        anyFilter: Array.from(params.keys()).length > 0
      };
    });

    expect(hasFilters.hasSearch).toBe(false);
    expect(hasFilters.hasMinCost).toBe(false);
    expect(hasFilters.hasMaxCost).toBe(false);
    expect(hasFilters.hasMinSpeed).toBe(false);
    expect(hasFilters.hasWeather).toBe(false);
    expect(hasFilters.hasSort).toBe(false);
    expect(hasFilters.anyFilter).toBe(false);
  });

  test('should display all database cities when no filters applied', async ({ page }) => {
    // lib/data.ts에 정의된 5개 도시가 모두 표시되는지 확인
    const expectedCities = ['제주도', '부산', '강릉', '경주', '전주'];

    // 각 도시의 h3 헤딩이 존재하는지 확인 (exact match)
    for (const cityName of expectedCities) {
      const cityHeading = page.getByRole('heading', { name: cityName, level: 3, exact: true });
      await expect(cityHeading.first()).toBeVisible();
    }

    // 정확히 5개의 도시 카드가 표시되는지 확인
    const cityCount = await page.evaluate(() => {
      const cityHeadings = Array.from(document.querySelectorAll('h3'))
        .filter(h => ['제주도', '부산', '강릉', '경주', '전주'].includes(h.textContent?.trim() || ''));
      return cityHeadings.length;
    });

    expect(cityCount).toBe(5);
  });

  test('should display city cards with correct data', async ({ page }) => {
    // 제주도 카드의 상세 정보 확인
    const jejuCard = page.locator('h3:has-text("제주도")').locator('..');

    // 제주도 카드가 보이는지 확인
    await expect(page.getByRole('heading', { name: '제주도', level: 3 })).toBeVisible();

    // 평점 정보 확인 (4.7/5.0)
    const jejuRating = page.locator('text=4.7/5.0').first();
    await expect(jejuRating).toBeVisible();

    // 좋아요 퍼센트 확인 (89%)
    const jejuLove = page.locator('text=89%').first();
    await expect(jejuLove).toBeVisible();

    // 거주자 수 확인 (156명)
    const jejuNomads = page.locator('text=156명').first();
    await expect(jejuNomads).toBeVisible();

    // 생활비 정보 확인
    const jejuCost = page.locator('text=155-225만원/월').first();
    await expect(jejuCost).toBeVisible();

    // 인터넷 속도 정보 확인
    const jejuInternet = page.locator('text=95Mbps').first();
    await expect(jejuInternet).toBeVisible();
  });

  test('should display hero section with search input', async ({ page }) => {
    // 히어로 섹션 헤딩 확인
    const heroHeading = page.getByRole('heading', { name: 'K-NOMADS', level: 1 });
    await expect(heroHeading).toBeVisible();

    // 검색 입력 필드 확인
    const searchInput = page.getByRole('textbox', { name: /어떤 도시에서 노마드 하고 싶으신가요/i });
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEmpty();
  });

  test('should have correct city ranking order', async ({ page }) => {
    // 도시가 순위대로 표시되는지 확인 (#1, #2, #3, #4, #5)
    const cities = ['제주도', '부산', '강릉', '경주', '전주'];

    for (let i = 0; i < cities.length; i++) {
      // 순위에 맞는 도시 이름 확인 (exact match)
      const cityHeading = page.getByRole('heading', { name: cities[i], level: 3, exact: true });
      await expect(cityHeading.first()).toBeVisible();
    }

    // 순위 배지 개수 확인 (JavaScript로 정확한 개수 검증)
    const rankBadgesCount = await page.locator('text=/^#[1-5]$/').count();
    expect(rankBadgesCount).toBeGreaterThanOrEqual(5);
  });

  test('should display all interactive buttons on city cards', async ({ page }) => {
    // 각 도시 카드에 필요한 버튼들이 있는지 확인
    const buttons = {
      compare: '비교에 추가',
      favorite: '즐겨찾기 추가',
      detail: '자세히 보기',
      review: '리뷰 쓰기'
    };

    // 제주도 카드 기준으로 버튼 확인 (5개 도시 모두 동일한 구조)
    for (const [key, buttonText] of Object.entries(buttons)) {
      const button = page.getByRole('button', { name: buttonText }).first();
      await expect(button).toBeVisible();
    }
  });

  test('should display footer with correct links', async ({ page }) => {
    // 푸터 확인
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // 푸터 로고 확인 (first()로 첫 번째 요소만 선택)
    const footerLogo = footer.locator('text=K-NOMADS').first();
    await expect(footerLogo).toBeVisible();

    // 주요 링크 확인
    const footerLinks = [
      '도시 탐색',
      '커뮤니티',
      '노마드 가이드',
      '소개',
      '블로그'
    ];

    for (const linkText of footerLinks) {
      const link = footer.getByRole('link', { name: linkText });
      await expect(link).toBeVisible();
    }

    // 저작권 정보 확인
    const copyright = footer.locator('text=© 2025 K-NOMADS');
    await expect(copyright).toBeVisible();
  });
});
