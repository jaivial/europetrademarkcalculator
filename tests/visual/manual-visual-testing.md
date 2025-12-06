# Layer 7: Manual Visual & Responsive UX Testing Guide

## Overview

This guide provides step-by-step instructions for comprehensive visual and responsive UX testing across 5 breakpoint ranges.

## Breakpoint Ranges

| Breakpoint | Width Range | Test Widths | Device Type |
|------------|-------------|-------------|-------------|
| XS | 200px - 479px | 200, 320, 400 | Small phones, narrow views |
| SM | 480px - 767px | 480, 600, 700 | Large phones, small tablets |
| MD | 768px - 1023px | 768, 900, 1000 | Tablets, small laptops |
| LG | 1024px - 1919px | 1024, 1280, 1600 | Laptops, desktops |
| XL | 1920px - 3000px | 1920, 2560, 3000 | Large monitors, 4K displays |

## Test Execution

### 1. Start Development Server

```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run dev
```

Application should be accessible at: http://localhost:3001

### 2. Using Browser DevTools

#### Chrome/Edge DevTools

1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "Responsive" mode
4. Set dimensions manually

#### Firefox Responsive Design Mode

1. Open Responsive Design Mode (Ctrl+Shift+M)
2. Enter custom dimensions
3. Test at each breakpoint width

### 3. Test Each Breakpoint

For each width in the table above:

#### XS Breakpoint Tests (200px, 320px, 400px)

**Visual Checks:**
- [ ] No horizontal scroll
- [ ] Content fits viewport width
- [ ] Text is readable (minimum 14px)
- [ ] Touch targets >= 44x44px
- [ ] Navigation menu accessible (hamburger/drawer if applicable)
- [ ] Forms are usable
- [ ] Images scale appropriately
- [ ] Theme toggle is visible and functional
- [ ] Language selector is accessible

**Component-Specific:**
- [ ] World Map 3D renders or shows mobile fallback
- [ ] Country List displays in single column
- [ ] Calculator is fully visible when country selected
- [ ] All buttons are tappable
- [ ] Search bar is visible and functional

**Screenshots to Take:**
- `xs-200px-home-light.png`
- `xs-200px-home-dark.png`
- `xs-320px-home-light.png`
- `xs-320px-home-dark.png`
- `xs-400px-home-light.png`
- `xs-400px-home-dark.png`
- `xs-320px-country-list.png`
- `xs-320px-calculator.png`

#### SM Breakpoint Tests (480px, 600px, 700px)

**Visual Checks:**
- [ ] Layout adapts from XS
- [ ] Cards can display 2-column (if applicable)
- [ ] Modals/dialogs fit screen
- [ ] Tables scroll horizontally if needed
- [ ] Content hierarchy is clear
- [ ] No overlapping elements
- [ ] Theme toggle works
- [ ] Language selector works

**Component-Specific:**
- [ ] Country grid shows 2 columns
- [ ] Calculator sections are well-spaced
- [ ] Tab navigation is clear
- [ ] Search results display properly

**Screenshots to Take:**
- `sm-480px-home-light.png`
- `sm-480px-home-dark.png`
- `sm-600px-country-list.png`
- `sm-700px-calculator.png`

#### MD Breakpoint Tests (768px, 900px, 1000px)

**Visual Checks:**
- [ ] Tablet-optimized layout
- [ ] 2-3 column grids work well
- [ ] Sidebar behavior (if applicable)
- [ ] Hover states work (optional touch)
- [ ] Data tables are readable
- [ ] Charts/graphs scale properly
- [ ] Theme persists across views
- [ ] Language changes apply globally

**Component-Specific:**
- [ ] World Map 3D renders fully
- [ ] Country grid shows 3-4 columns
- [ ] Calculator has good spacing
- [ ] All interactive elements accessible

**Screenshots to Take:**
- `md-768px-home-light.png`
- `md-768px-home-dark.png`
- `md-900px-world-map.png`
- `md-1000px-country-list.png`

#### LG Breakpoint Tests (1024px, 1280px, 1600px)

**Visual Checks:**
- [ ] Full desktop layout
- [ ] Sidebars fully visible (if applicable)
- [ ] Multi-column content
- [ ] Appropriate whitespace
- [ ] All interactive elements accessible
- [ ] Hover effects work
- [ ] Theme transition is smooth
- [ ] Language selector dropdown positions correctly

**Component-Specific:**
- [ ] World Map 3D is prominent
- [ ] Country grid shows 4-6 columns
- [ ] Calculator displays beside or below content
- [ ] Tab navigation is intuitive

**Screenshots to Take:**
- `lg-1024px-home-light.png`
- `lg-1024px-home-dark.png`
- `lg-1280px-world-map.png`
- `lg-1600px-full-page.png`

#### XL Breakpoint Tests (1920px, 2560px, 3000px)

**Visual Checks:**
- [ ] Content max-width applied (doesn't stretch awkwardly)
- [ ] Content is centered or well-positioned
- [ ] Line length controlled (60-80 characters)
- [ ] High-DPI images used
- [ ] No excessive whitespace
- [ ] Layout remains balanced
- [ ] Theme applies to all elements
- [ ] All features accessible

**Component-Specific:**
- [ ] World Map 3D scales beautifully
- [ ] Country grid shows multiple columns
- [ ] Calculator doesn't look tiny
- [ ] Content is centered or max-width constrained

**Screenshots to Take:**
- `xl-1920px-home-light.png`
- `xl-1920px-home-dark.png`
- `xl-2560px-full-page.png`
- `xl-3000px-ultra-wide.png`

## UX Feature Tests

### Theme Toggle

For each breakpoint:

1. Start in light theme
2. Take screenshot: `{breakpoint}-{width}px-light.png`
3. Click theme toggle button
4. Wait for transition
5. Take screenshot: `{breakpoint}-{width}px-dark.png`
6. Verify:
   - [ ] Theme changes globally
   - [ ] Colors are appropriate
   - [ ] Text is readable
   - [ ] Icons update (sun/moon)
   - [ ] Transition is smooth
   - [ ] State persists on navigation

### Language Selector

For each breakpoint:

1. Locate language selector
2. Take screenshot: `{breakpoint}-{width}px-lang-initial.png`
3. Click to open dropdown
4. Take screenshot: `{breakpoint}-{width}px-lang-dropdown.png`
5. Select a different language (e.g., German)
6. Take screenshot: `{breakpoint}-{width}px-lang-changed.png`
7. Verify:
   - [ ] Dropdown displays correctly
   - [ ] All languages are visible
   - [ ] Selected language is highlighted
   - [ ] Content updates in new language
   - [ ] Layout doesn't break
   - [ ] Flag icons display correctly

### World Map 3D

For each breakpoint:

1. Navigate to World Map tab
2. Wait for 3D rendering
3. Take screenshot: `{breakpoint}-{width}px-world-map-initial.png`
4. Interact with map (rotate, zoom if possible)
5. Take screenshot: `{breakpoint}-{width}px-world-map-interacted.png`
6. Click on a country
7. Take screenshot: `{breakpoint}-{width}px-world-map-country-selected.png`
8. Verify:
   - [ ] 3D canvas renders
   - [ ] Map is interactive
   - [ ] Countries are clickable
   - [ ] Selection feedback is visible
   - [ ] Performance is acceptable
   - [ ] No rendering artifacts

### Country List

For each breakpoint:

1. Navigate to Country List tab
2. Take screenshot: `{breakpoint}-{width}px-country-list-all.png`
3. Use search bar to filter (e.g., "Germany")
4. Take screenshot: `{breakpoint}-{width}px-country-list-filtered.png`
5. Click on a country
6. Take screenshot: `{breakpoint}-{width}px-country-list-selected.png`
7. Verify:
   - [ ] Grid layout is appropriate for breakpoint
   - [ ] Search filters results correctly
   - [ ] Country cards are readable
   - [ ] Selection is clear
   - [ ] Scroll behavior is smooth

### Calculator

For each breakpoint:

1. Select a country
2. Wait for calculator to appear
3. Take screenshot: `{breakpoint}-{width}px-calculator-initial.png`
4. Interact with calculator options
5. Take screenshot: `{breakpoint}-{width}px-calculator-filled.png`
6. Verify:
   - [ ] Calculator is fully visible
   - [ ] All inputs are accessible
   - [ ] Results display correctly
   - [ ] Layout is appropriate
   - [ ] Buttons are usable
   - [ ] Calculations are accurate

## Critical Issues to Flag

### High Severity
- Horizontal overflow (scroll)
- Content completely hidden
- Critical buttons not accessible
- Application crashes
- Forms unusable
- Navigation broken

### Medium Severity
- Touch targets < 44px on mobile
- Text < 12px
- Overlapping content
- Poor color contrast
- Slow performance
- Minor layout issues

### Low Severity
- Excessive whitespace
- Non-optimal spacing
- Line length > 100 chars
- Cosmetic issues
- Minor alignment issues

## Reporting

Create a report file: `sprints/layer7-visual-ux/manual-test-results.json`

```json
{
  "layer": 7,
  "type": "manual-visual-ux-tests",
  "timestamp": "ISO timestamp",
  "tester": "Your Name",
  "breakpoints": {
    "xs": {
      "widths_tested": [200, 320, 400],
      "issues": [],
      "screenshots": []
    },
    "sm": {
      "widths_tested": [480, 600, 700],
      "issues": [],
      "screenshots": []
    }
  },
  "summary": {
    "total_tests": 0,
    "passed": 0,
    "failed": 0,
    "high_severity_issues": 0,
    "medium_severity_issues": 0,
    "low_severity_issues": 0
  }
}
```

## Automated Testing Alternative

If Playwright dependencies can be installed:

```bash
# Install system dependencies (requires sudo)
sudo npx playwright install-deps

# Run all visual tests
npx playwright test

# Run specific breakpoint
npx playwright test --project=xs-320
npx playwright test --project=md-768
npx playwright test --project=lg-1280
npx playwright test --project=xl-1920

# Generate HTML report
npx playwright show-report sprints/layer7-visual-ux/playwright-report
```

## Success Criteria

- [ ] All 15 viewport configurations tested
- [ ] Theme toggle works at all breakpoints
- [ ] Language selector works at all breakpoints
- [ ] No horizontal overflow
- [ ] Touch targets >= 44px on mobile
- [ ] Text readable (>= 12px)
- [ ] All features accessible
- [ ] Screenshots captured for all breakpoints
- [ ] Issues documented by severity
- [ ] Report generated
