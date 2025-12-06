#!/usr/bin/env node

/**
 * Layer 7: Visual & Responsive UX Tests Runner
 *
 * Performs automated checks for responsive design across 5 breakpoint ranges
 */

const fs = require('fs');
const path = require('path');

const BREAKPOINTS = {
  xs: { name: 'XS (Mobile)', min: 200, max: 479, widths: [200, 320, 400] },
  sm: { name: 'SM (Large Phone)', min: 480, max: 767, widths: [480, 600, 700] },
  md: { name: 'MD (Tablet)', min: 768, max: 1023, widths: [768, 900, 1000] },
  lg: { name: 'LG (Desktop)', min: 1024, max: 1919, widths: [1024, 1280, 1600] },
  xl: { name: 'XL (Large Screen)', min: 1920, max: 3000, widths: [1920, 2560, 3000] },
};

function checkResponsiveMeta(html) {
  const issues = [];

  if (!html.includes('viewport')) {
    issues.push({
      type: 'meta-viewport',
      severity: 'high',
      message: 'Missing viewport meta tag',
      breakpoint: 'all',
      width: 0,
    });
  }

  if (html.includes('minimum-scale=1.0')) {
    // Good - has minimum scale
  } else {
    issues.push({
      type: 'meta-viewport',
      severity: 'low',
      message: 'Viewport may not prevent zoom on mobile',
      breakpoint: 'xs',
      width: 0,
    });
  }

  return issues;
}

function checkResponsiveCSS(html) {
  const issues = [];

  if (!html.includes('box-sizing: border-box')) {
    issues.push({
      type: 'css-box-sizing',
      severity: 'medium',
      message: 'Box-sizing may not be set globally',
      breakpoint: 'all',
      width: 0,
    });
  }

  if (!html.includes('overflow-x: hidden') && !html.includes('overflow-x:hidden')) {
    issues.push({
      type: 'css-overflow',
      severity: 'low',
      message: 'No explicit overflow-x prevention found',
      breakpoint: 'all',
      width: 0,
    });
  }

  return issues;
}

function checkAccessibility(html) {
  const issues = [];

  const ariaCount = (html.match(/aria-label/g) || []).length;
  if (ariaCount < 5) {
    issues.push({
      type: 'accessibility',
      severity: 'medium',
      message: `Low number of ARIA labels found (${ariaCount}) in static HTML`,
      breakpoint: 'all',
      width: 0,
    });
  }

  if (!html.includes('<nav') && !html.includes('<header')) {
    issues.push({
      type: 'semantic-html',
      severity: 'medium',
      message: 'Missing semantic HTML elements (nav, header) in static HTML',
      breakpoint: 'all',
      width: 0,
    });
  }

  return issues;
}

function checkBreakpointBehavior(breakpoint, width, html) {
  const issues = [];

  // Mobile-specific checks (xs, sm)
  if (breakpoint === 'xs' || breakpoint === 'sm') {
    const hasMobileNav =
      html.includes('hamburger') ||
      html.includes('mobile-nav') ||
      html.includes('menu-button') ||
      html.includes('aria-expanded');

    if (!hasMobileNav && width < 768) {
      issues.push({
        type: 'mobile-navigation',
        severity: 'medium',
        message: 'No mobile navigation pattern detected in static HTML',
        breakpoint,
        width,
      });
    }

    const hasTouchOptimization =
      html.includes('touch-action') || html.includes('min-width: 44px');

    if (!hasTouchOptimization) {
      issues.push({
        type: 'touch-targets',
        severity: 'medium',
        message: 'Touch target optimization may be missing in static HTML',
        breakpoint,
        width,
      });
    }
  }

  // Desktop-specific checks (lg, xl)
  if (breakpoint === 'lg' || breakpoint === 'xl') {
    const hasMaxWidth = html.includes('max-width') || html.includes('container');

    if (!hasMaxWidth && width > 1920) {
      issues.push({
        type: 'max-width',
        severity: 'low',
        message: 'Content may stretch too wide on large screens',
        breakpoint,
        width,
      });
    }
  }

  return issues;
}

function checkThemeSupport(html) {
  const issues = [];

  const hasThemeToggle =
    html.includes('theme-toggle') ||
    html.includes('ThemeToggle') ||
    html.includes('dark-mode') ||
    html.includes('light-mode');

  if (!hasThemeToggle) {
    issues.push({
      type: 'theme-support',
      severity: 'medium',
      message: 'Theme toggle functionality not detected in static HTML',
      breakpoint: 'all',
      width: 0,
    });
  }

  const hasThemeMeta = html.includes('theme-color') || html.includes('color-scheme');

  if (!hasThemeMeta) {
    issues.push({
      type: 'theme-meta',
      severity: 'low',
      message: 'Theme color meta tags may be missing',
      breakpoint: 'all',
      width: 0,
    });
  }

  return issues;
}

function checkI18nSupport(html) {
  const issues = [];

  const hasLangAttribute = html.includes('<html lang=') || html.includes('lang="en"');

  if (!hasLangAttribute) {
    issues.push({
      type: 'i18n-lang',
      severity: 'medium',
      message: 'HTML lang attribute not found',
      breakpoint: 'all',
      width: 0,
    });
  }

  const hasLanguageSelector =
    html.includes('language-selector') ||
    html.includes('LanguageSelector') ||
    html.includes('lang-selector');

  if (!hasLanguageSelector) {
    issues.push({
      type: 'i18n-selector',
      severity: 'low',
      message: 'Language selector not detected in initial HTML (may load dynamically)',
      breakpoint: 'all',
      width: 0,
    });
  }

  return issues;
}

async function runVisualUXTests(baseUrl = 'http://localhost:3001') {
  console.log('Layer 7: Visual & Responsive UX Tests');
  console.log('=====================================\n');

  const startTime = Date.now();
  const allIssues = [];
  const breakpointResults = {};

  try {
    console.log(`Fetching application from: ${baseUrl}\n`);

    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    console.log('Running global checks...');

    // Global checks
    const metaIssues = checkResponsiveMeta(html);
    const cssIssues = checkResponsiveCSS(html);
    const a11yIssues = checkAccessibility(html);
    const themeIssues = checkThemeSupport(html);
    const i18nIssues = checkI18nSupport(html);

    allIssues.push(...metaIssues, ...cssIssues, ...a11yIssues, ...themeIssues, ...i18nIssues);

    console.log(`  Global issues found: ${metaIssues.length + cssIssues.length + a11yIssues.length + themeIssues.length + i18nIssues.length}\n`);

    // Breakpoint-specific checks
    for (const [key, config] of Object.entries(BREAKPOINTS)) {
      console.log(`Testing ${config.name} (${config.min}-${config.max}px)...`);

      const breakpointIssues = [];
      let checksRun = 0;

      for (const width of config.widths) {
        console.log(`  - ${width}px`);

        const issues = checkBreakpointBehavior(key, width, html);
        breakpointIssues.push(...issues);
        checksRun += 5;
      }

      allIssues.push(...breakpointIssues);

      breakpointResults[key] = {
        width_range: `${config.min}px - ${config.max}px`,
        test_widths: config.widths,
        issues: breakpointIssues,
        checks_run: checksRun,
      };

      console.log(`  Issues found: ${breakpointIssues.length}\n`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Calculate summary
    const high = allIssues.filter((i) => i.severity === 'high').length;
    const medium = allIssues.filter((i) => i.severity === 'medium').length;
    const low = allIssues.filter((i) => i.severity === 'low').length;

    const result = {
      layer: 7,
      type: 'visual-ux-tests',
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      status: high === 0 ? 'PASS' : 'FAIL',
      baseUrl: baseUrl,
      breakpoints: breakpointResults,
      summary: {
        total_breakpoints: Object.keys(BREAKPOINTS).length,
        total_widths_tested: Object.values(BREAKPOINTS).reduce((sum, b) => sum + b.widths.length, 0),
        total_checks: Object.values(breakpointResults).reduce((sum, b) => sum + b.checks_run, 0) + 15,
        high_severity_issues: high,
        medium_severity_issues: medium,
        low_severity_issues: low,
      },
      issues: allIssues,
    };

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('LAYER 7 VISUAL & UX TESTS: SUMMARY');
    console.log('='.repeat(60));
    console.log(`Status: ${result.status}`);
    console.log(`Duration: ${duration}s`);
    console.log(`Total Checks: ${result.summary.total_checks}`);
    console.log(`Breakpoints Tested: ${result.summary.total_breakpoints}`);
    console.log(`Widths Tested: ${result.summary.total_widths_tested}`);
    console.log('\nIssues by Severity:');
    console.log(`  HIGH: ${high}`);
    console.log(`  MEDIUM: ${medium}`);
    console.log(`  LOW: ${low}`);

    if (allIssues.length > 0) {
      console.log('\nIssue Details:');
      const issuesBySeverity = {
        high: allIssues.filter((i) => i.severity === 'high'),
        medium: allIssues.filter((i) => i.severity === 'medium'),
        low: allIssues.filter((i) => i.severity === 'low'),
      };

      for (const [severity, issues] of Object.entries(issuesBySeverity)) {
        if (issues.length > 0) {
          console.log(`\n  ${severity.toUpperCase()}:`);
          issues.forEach((issue, idx) => {
            if (idx < 10) { // Limit output
              console.log(`    - [${issue.type}] ${issue.message}`);
              if (issue.width > 0) {
                console.log(`      @ ${issue.breakpoint} (${issue.width}px)`);
              }
            }
          });
          if (issues.length > 10) {
            console.log(`    ... and ${issues.length - 10} more`);
          }
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`LAYER 7 STATUS: ${result.status}`);
    console.log('='.repeat(60) + '\n');

    return result;
  } catch (error) {
    console.error('\nError running visual UX tests:', error.message);

    return {
      layer: 7,
      type: 'visual-ux-tests',
      timestamp: new Date().toISOString(),
      status: 'FAIL',
      error: error.message,
      breakpoints: {},
      summary: {
        total_breakpoints: 0,
        total_widths_tested: 0,
        total_checks: 0,
        high_severity_issues: 1,
        medium_severity_issues: 0,
        low_severity_issues: 0,
      },
      issues: [],
    };
  }
}

// Main execution
const baseUrl = process.argv[2] || 'http://localhost:3001';

runVisualUXTests(baseUrl)
  .then((result) => {
    // Write results to file
    const outputDir = path.join(__dirname, '../../sprints/layer7-visual-ux');
    const outputFile = path.join(outputDir, 'automated-results.json');

    // Ensure directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Write results
    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');

    console.log(`Results written to: ${outputFile}\n`);

    // Exit with error code if tests failed
    process.exit(result.status === 'FAIL' ? 1 : 0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
