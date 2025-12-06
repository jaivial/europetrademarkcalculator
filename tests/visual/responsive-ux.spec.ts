import { test, expect, Page } from '@playwright/test';

/**
 * Layer 7: Visual & Responsive UX Tests
 *
 * Tests responsive design across 5 breakpoint ranges:
 * - XS: 200px-479px (mobile phones)
 * - SM: 480px-767px (large phones, small tablets)
 * - MD: 768px-1023px (tablets, small laptops)
 * - LG: 1024px-1919px (laptops, desktops)
 * - XL: 1920px-3000px (large monitors, 4K displays)
 */

interface VisualIssue {
  type: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  element?: string;
}

const BREAKPOINT_RANGES = {
  xs: { min: 200, max: 479, name: 'XS (Mobile)' },
  sm: { min: 480, max: 767, name: 'SM (Large Phone/Small Tablet)' },
  md: { min: 768, max: 1023, name: 'MD (Tablet)' },
  lg: { min: 1024, max: 1919, name: 'LG (Desktop)' },
  xl: { min: 1920, max: 3000, name: 'XL (Large Screen)' },
};

/**
 * Determine breakpoint from viewport width
 */
function getBreakpoint(width: number): keyof typeof BREAKPOINT_RANGES {
  if (width < 480) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1920) return 'lg';
  return 'xl';
}

/**
 * Run comprehensive visual UX checks
 */
async function runVisualChecks(page: Page, width: number, pageName: string): Promise<VisualIssue[]> {
  const issues: VisualIssue[] = [];
  const breakpoint = getBreakpoint(width);

  // 1. Check for horizontal overflow
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  if (hasHorizontalScroll) {
    issues.push({
      type: 'overflow',
      severity: 'high',
      message: 'Horizontal scroll detected - content overflows viewport',
    });
  }

  // 2. Check text readability (minimum font size)
  const smallText = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      const text = el.textContent?.trim();

      if (text && text.length > 0 && fontSize > 0 && fontSize < 12) {
        return {
          text: text.slice(0, 50),
          fontSize: fontSize,
          tag: el.tagName,
        };
      }
    }
    return null;
  });

  if (smallText) {
    issues.push({
      type: 'readability',
      severity: 'medium',
      message: `Small text found (${smallText.fontSize}px): "${smallText.text}"`,
      element: smallText.tag,
    });
  }

  // 3. Check touch targets on mobile breakpoints
  if (breakpoint === 'xs' || breakpoint === 'sm') {
    const smallTouchTargets = await page.evaluate(() => {
      const clickables = Array.from(
        document.querySelectorAll('button, a, input, [role="button"], [role="link"]')
      );
      const small: { text: string; width: number; height: number }[] = [];

      for (const el of clickables) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          if (rect.width < 44 || rect.height < 44) {
            small.push({
              text: el.textContent?.trim().slice(0, 30) || el.className,
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            });
          }
        }
      }
      return small.slice(0, 5); // Limit to 5 examples
    });

    if (smallTouchTargets.length > 0) {
      smallTouchTargets.forEach((target) => {
        issues.push({
          type: 'touch-target',
          severity: 'medium',
          message: `Small touch target (${target.width}x${target.height}px): ${target.text}`,
        });
      });
    }
  }

  // 4. Check images are not broken
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.src)
      .slice(0, 5);
  });

  if (brokenImages.length > 0) {
    issues.push({
      type: 'broken-image',
      severity: 'high',
      message: `${brokenImages.length} broken image(s) detected`,
    });
  }

  // 5. Check critical content is visible
  const criticalElements = await page.evaluate(() => {
    const selectors = ['header', 'nav', 'main', 'h1', '[data-testid="main-content"]'];
    const missing: string[] = [];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (!el) {
        missing.push(`${selector} (not found)`);
      } else {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          missing.push(`${selector} (hidden)`);
        }
      }
    }
    return missing;
  });

  if (criticalElements.length > 0) {
    issues.push({
      type: 'missing-content',
      severity: 'high',
      message: `Missing/hidden critical elements: ${criticalElements.join(', ')}`,
    });
  }

  // 6. Check line length for readability on large screens
  if (breakpoint === 'lg' || breakpoint === 'xl') {
    const longLines = await page.evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll('p, .text-content, article'));
      for (const p of paragraphs) {
        const style = window.getComputedStyle(p);
        const width = parseFloat(style.width);
        const fontSize = parseFloat(style.fontSize);
        const charsPerLine = width / (fontSize * 0.5); // Approximate

        if (charsPerLine > 100 && p.textContent && p.textContent.trim().length > 50) {
          return {
            text: p.textContent.trim().slice(0, 50),
            charsPerLine: Math.round(charsPerLine),
          };
        }
      }
      return null;
    });

    if (longLines) {
      issues.push({
        type: 'line-length',
        severity: 'low',
        message: `Text lines may be too long (${longLines.charsPerLine} chars) for comfortable reading`,
      });
    }
  }

  // 7. Check navigation accessibility on mobile
  if (breakpoint === 'xs' || breakpoint === 'sm') {
    const navCheck = await page.evaluate(() => {
      const hamburger = document.querySelector(
        '[aria-label*="menu"], [class*="hamburger"], [class*="mobile-nav"], button[aria-expanded]'
      );
      const nav = document.querySelector('nav, [role="navigation"]');

      return {
        hasHamburger: hamburger !== null,
        hasVisibleNav: nav ? nav.getBoundingClientRect().height > 0 : false,
      };
    });

    if (!navCheck.hasHamburger && !navCheck.hasVisibleNav) {
      issues.push({
        type: 'navigation',
        severity: 'medium',
        message: 'No visible navigation or mobile menu found',
      });
    }
  }

  // 8. Check for content cutoff
  const contentCutoff = await page.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('[class*="container"], main, section'));
    for (const container of containers) {
      if (container.scrollHeight > container.clientHeight + 5) {
        return {
          tag: container.tagName,
          className: container.className,
        };
      }
    }
    return null;
  });

  if (contentCutoff) {
    issues.push({
      type: 'content-cutoff',
      severity: 'low',
      message: `Content may be cut off in ${contentCutoff.tag}.${contentCutoff.className}`,
    });
  }

  return issues;
}

/**
 * Test home page at current viewport
 */
test('Home Page - Visual & UX Checks', async ({ page, viewport }) => {
  const width = viewport?.width || 1920;
  const breakpoint = getBreakpoint(width);
  const outputDir = `tests/visual/${breakpoint}`;

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Take full-page screenshot
  await page.screenshot({
    path: `${outputDir}/home-${width}px.png`,
    fullPage: true,
  });

  // Run visual checks
  const issues = await runVisualChecks(page, width, 'home');

  // Log issues for reporting
  if (issues.length > 0) {
    console.log(`\n[${breakpoint.toUpperCase()} @ ${width}px] Home Page Issues:`);
    issues.forEach((issue) => {
      console.log(`  [${issue.severity.toUpperCase()}] ${issue.type}: ${issue.message}`);
    });
  }

  // Fail on high-severity issues
  const highSeverityIssues = issues.filter((i) => i.severity === 'high');
  expect(highSeverityIssues, `High severity issues found at ${width}px`).toHaveLength(0);
});

/**
 * Test theme toggle functionality
 */
test('Theme Toggle - Light/Dark Mode', async ({ page, viewport }) => {
  const width = viewport?.width || 1920;
  const breakpoint = getBreakpoint(width);
  const outputDir = `tests/visual/${breakpoint}`;

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Take screenshot in initial theme
  await page.screenshot({
    path: `${outputDir}/home-initial-theme-${width}px.png`,
    fullPage: true,
  });

  // Find and click theme toggle button
  const themeToggle = page.locator('button[aria-label*="theme"], button[aria-pressed]').first();
  await expect(themeToggle).toBeVisible({ timeout: 5000 });

  const initialTheme = await themeToggle.getAttribute('aria-pressed');
  await themeToggle.click();

  // Wait for theme change animation
  await page.waitForTimeout(500);

  // Take screenshot after theme toggle
  await page.screenshot({
    path: `${outputDir}/home-toggled-theme-${width}px.png`,
    fullPage: true,
  });

  // Verify theme changed
  const newTheme = await themeToggle.getAttribute('aria-pressed');
  expect(newTheme).not.toBe(initialTheme);

  // Verify no visual issues after theme change
  const issues = await runVisualChecks(page, width, 'home-dark');
  const highSeverityIssues = issues.filter((i) => i.severity === 'high');
  expect(highSeverityIssues, `High severity issues after theme toggle at ${width}px`).toHaveLength(0);
});

/**
 * Test language selector functionality
 */
test('Language Selector - Dropdown and Selection', async ({ page, viewport }) => {
  const width = viewport?.width || 1920;
  const breakpoint = getBreakpoint(width);
  const outputDir = `tests/visual/${breakpoint}`;

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Find language selector
  const langSelector = page.locator('button[aria-haspopup="listbox"], [class*="languageSelector"] button').first();

  if (await langSelector.isVisible({ timeout: 2000 }).catch(() => false)) {
    // Take screenshot before opening dropdown
    await page.screenshot({
      path: `${outputDir}/lang-selector-closed-${width}px.png`,
      fullPage: true,
    });

    // Click to open dropdown
    await langSelector.click();
    await page.waitForTimeout(300);

    // Take screenshot with dropdown open
    await page.screenshot({
      path: `${outputDir}/lang-selector-open-${width}px.png`,
      fullPage: true,
    });

    // Verify dropdown is visible
    const dropdown = page.locator('[role="listbox"], [class*="dropdownMenu"]').first();
    await expect(dropdown).toBeVisible({ timeout: 2000 });

    // Select a different language
    const langOption = page.locator('[role="option"]').nth(1);
    if (await langOption.isVisible().catch(() => false)) {
      await langOption.click();
      await page.waitForTimeout(500);

      // Take screenshot after language change
      await page.screenshot({
        path: `${outputDir}/lang-changed-${width}px.png`,
        fullPage: true,
      });
    }
  }
});

/**
 * Test World Map 3D rendering
 */
test('World Map 3D - Rendering and Interaction', async ({ page, viewport }) => {
  const width = viewport?.width || 1920;
  const breakpoint = getBreakpoint(width);
  const outputDir = `tests/visual/${breakpoint}`;

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Wait for 3D canvas to load
  const canvas = page.locator('canvas').first();
  await expect(canvas).toBeVisible({ timeout: 10000 });

  // Wait for rendering
  await page.waitForTimeout(2000);

  // Take screenshot of world map
  await page.screenshot({
    path: `${outputDir}/world-map-3d-${width}px.png`,
    fullPage: true,
  });

  // Verify canvas is not empty
  const canvasSize = await canvas.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });

  expect(canvasSize.width).toBeGreaterThan(0);
  expect(canvasSize.height).toBeGreaterThan(0);
});

/**
 * Test Country List view
 */
test('Country List - Grid and Search', async ({ page, viewport }) => {
  const width = viewport?.width || 1920;
  const breakpoint = getBreakpoint(width);
  const outputDir = `tests/visual/${breakpoint}`;

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Switch to country list tab
  const countryListTab = page.locator('button:has-text("Country List"), [role="tab"]:has-text("Country")').first();

  if (await countryListTab.isVisible({ timeout: 2000 }).catch(() => false)) {
    await countryListTab.click();
    await page.waitForTimeout(500);

    // Take screenshot of country list
    await page.screenshot({
      path: `${outputDir}/country-list-${width}px.png`,
      fullPage: true,
    });

    // Test search functionality
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();

    if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchInput.fill('Germany');
      await page.waitForTimeout(500);

      // Take screenshot of filtered results
      await page.screenshot({
        path: `${outputDir}/country-list-search-${width}px.png`,
        fullPage: true,
      });

      // Verify results are filtered
      const countryCards = page.locator('[class*="country"], [data-country]');
      const count = await countryCards.count();
      expect(count).toBeGreaterThan(0);
    }
  }
});

/**
 * Test Calculator component
 */
test('Calculator - Country Selection and Display', async ({ page, viewport }) => {
  const width = viewport?.width || 1920;
  const breakpoint = getBreakpoint(width);
  const outputDir = `tests/visual/${breakpoint}`;

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Switch to country list
  const countryListTab = page.locator('button:has-text("Country List"), [role="tab"]:has-text("Country")').first();

  if (await countryListTab.isVisible({ timeout: 2000 }).catch(() => false)) {
    await countryListTab.click();
    await page.waitForTimeout(500);

    // Click on a country
    const firstCountry = page.locator('[class*="country"], [data-country], button:has-text("Germany")').first();

    if (await firstCountry.isVisible({ timeout: 2000 }).catch(() => false)) {
      await firstCountry.click();
      await page.waitForTimeout(500);

      // Take screenshot with calculator visible
      await page.screenshot({
        path: `${outputDir}/calculator-displayed-${width}px.png`,
        fullPage: true,
      });

      // Verify calculator is visible
      const calculator = page.locator('[class*="calculator"], [class*="Calculator"]').first();
      await expect(calculator).toBeVisible({ timeout: 2000 });
    }
  }
});

/**
 * Test responsive layout breakpoints
 */
test('Responsive Layout - Breakpoint Verification', async ({ page, viewport }) => {
  const width = viewport?.width || 1920;
  const breakpoint = getBreakpoint(width);
  const breakpointInfo = BREAKPOINT_RANGES[breakpoint];

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Verify viewport is within expected range
  expect(width).toBeGreaterThanOrEqual(breakpointInfo.min);
  expect(width).toBeLessThanOrEqual(breakpointInfo.max);

  // Run comprehensive checks
  const issues = await runVisualChecks(page, width, 'layout');

  // Log breakpoint info
  console.log(`\n[BREAKPOINT: ${breakpoint.toUpperCase()}] ${breakpointInfo.name}`);
  console.log(`Width: ${width}px (Range: ${breakpointInfo.min}-${breakpointInfo.max}px)`);
  console.log(`Issues Found: ${issues.length}`);

  if (issues.length > 0) {
    console.log('\nIssues by Severity:');
    const high = issues.filter((i) => i.severity === 'high');
    const medium = issues.filter((i) => i.severity === 'medium');
    const low = issues.filter((i) => i.severity === 'low');

    if (high.length > 0) console.log(`  HIGH: ${high.length}`);
    if (medium.length > 0) console.log(`  MEDIUM: ${medium.length}`);
    if (low.length > 0) console.log(`  LOW: ${low.length}`);
  }

  // Fail only on high-severity issues
  const highSeverityIssues = issues.filter((i) => i.severity === 'high');
  expect(highSeverityIssues).toHaveLength(0);
});
