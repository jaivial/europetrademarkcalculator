# Frontend Task 11: Theme System & CSS Custom Properties

## Metadata
- **Task**: 11 of 40
- **Area**: Frontend
- **Feature**: Theme System & CSS Custom Properties
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a comprehensive CSS architecture with custom properties for dark/light themes, global styles, responsive typography using clamp(), and container queries. This task establishes the foundational styling system supporting responsive design across 200px-3000px screen sizes with fluid typography and theme switching capabilities.

---

## Subtasks

### Subtask 11.1: CSS Custom Properties & Theme Variables

#### Status
status: pending

#### Objective
Create comprehensive CSS custom property definitions for light and dark themes with color palettes, spacing scales, and typography metrics.

#### Context
This subtask provides the foundational CSS variables used across all other theme subtasks. Defining variables first allows other subtasks to reference them without duplication.

#### Files to Create/Modify (Exclusive Ownership)
- `src/styles/variables.css` - Core CSS custom properties for themes

#### Implementation

```css
/* src/styles/variables.css */
/* ============================================ */
/* CSS CUSTOM PROPERTIES & THEME VARIABLES */
/* ============================================ */

:root {
  /* ====== Light Theme Colors (Default) ====== */
  --color-primary: #2563eb;
  --color-primary-light: #3b82f6;
  --color-primary-lighter: #60a5fa;
  --color-primary-dark: #1d4ed8;
  --color-primary-darker: #1e40af;

  --color-secondary: #7c3aed;
  --color-secondary-light: #a78bfa;
  --color-secondary-dark: #6d28d9;

  --color-accent: #ec4899;
  --color-accent-light: #f472b6;
  --color-accent-dark: #be185d;

  --color-success: #10b981;
  --color-success-light: #6ee7b7;
  --color-success-dark: #047857;

  --color-warning: #f59e0b;
  --color-warning-light: #fbbf24;
  --color-warning-dark: #d97706;

  --color-error: #ef4444;
  --color-error-light: #fca5a5;
  --color-error-dark: #dc2626;

  --color-info: #0891b2;
  --color-info-light: #22d3ee;
  --color-info-dark: #0369a1;

  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;

  --color-white: #ffffff;
  --color-black: #000000;

  /* ====== Light Theme Backgrounds & Text ====== */
  --bg-primary: var(--color-white);
  --bg-secondary: var(--color-neutral-50);
  --bg-tertiary: var(--color-neutral-100);
  --bg-overlay: rgba(0, 0, 0, 0.5);

  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
  --text-tertiary: var(--color-neutral-500);
  --text-inverse: var(--color-white);

  --border-color: var(--color-neutral-200);
  --border-color-light: var(--color-neutral-100);
  --border-color-dark: var(--color-neutral-300);

  /* ====== Spacing Scale (8px base) ====== */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  --space-40: 10rem;
  --space-48: 12rem;
  --space-56: 14rem;
  --space-64: 16rem;

  /* ====== Typography Scale ====== */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
               'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'Roboto Mono', monospace;
  --font-display: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* ====== Border Radius ====== */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-base: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-3xl: 2rem;
  --radius-full: 9999px;

  /* ====== Shadows ====== */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* ====== Transitions & Animations ====== */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* ====== Z-Index Scale ====== */
  --z-hide: -1;
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-notification: 800;
}

/* ====== Dark Theme ====== */
[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Dark Theme Colors */
    --color-primary: #3b82f6;
    --color-primary-light: #60a5fa;
    --color-primary-lighter: #93c5fd;
    --color-primary-dark: #1e40af;
    --color-primary-darker: #1e3a8a;

    --color-secondary: #a78bfa;
    --color-secondary-light: #c4b5fd;
    --color-secondary-dark: #6d28d9;

    --color-accent: #f472b6;
    --color-accent-light: #f9a8d4;
    --color-accent-dark: #be185d;

    --color-success: #10b981;
    --color-success-light: #6ee7b7;
    --color-success-dark: #047857;

    --color-warning: #f59e0b;
    --color-warning-light: #fbbf24;
    --color-warning-dark: #d97706;

    --color-error: #f87171;
    --color-error-light: #fca5a5;
    --color-error-dark: #dc2626;

    --color-info: #22d3ee;
    --color-info-light: #67e8f9;
    --color-info-dark: #0891b2;

    /* Dark Theme Backgrounds & Text */
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --bg-tertiary: #374151;
    --bg-overlay: rgba(0, 0, 0, 0.7);

    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-tertiary: #9ca3af;
    --text-inverse: #111827;

    --border-color: #4b5563;
    --border-color-light: #374151;
    --border-color-dark: #6b7280;

    /* Dark Theme Shadows */
    --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
    --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* ====== High Contrast Mode ====== */
@media (prefers-contrast: more) {
  :root {
    --color-neutral-900: #000000;
    --text-primary: #000000;
    --border-color: #000000;
  }

  [data-theme="dark"],
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --color-neutral-50: #ffffff;
      --text-primary: #ffffff;
      --border-color: #ffffff;
    }
  }
}

/* ====== Reduced Motion ====== */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
  }
}
```

#### Acceptance Criteria
- [ ] All color variables defined for light and dark themes
- [ ] Spacing scale variables in 0.25rem increments
- [ ] Typography and font weight variables declared
- [ ] Border radius utility variables available
- [ ] Shadow variables for all depth levels
- [ ] Z-index scale for layering components
- [ ] Transition duration and easing functions defined
- [ ] Dark theme automatically switches with data-theme attribute
- [ ] High contrast and reduced motion preferences respected

#### Verification Commands
```bash
npm run type-check
npm run lint -- src/styles/variables.css
```

---

### Subtask 11.2: Global Styles & Reset

#### Status
status: pending

#### Objective
Create global styles with CSS reset, base element styling, and foundational styles for html, body, and common elements.

#### Context
Global styles establish consistent baseline styling across all components and pages. This subtask builds on variables created in Subtask 11.1 to apply theme colors and spacing globally.

#### Files to Create/Modify (Exclusive Ownership)
- `src/styles/globals.css` - Global styles and CSS reset

#### Implementation

```css
/* src/styles/globals.css */
/* ============================================ */
/* GLOBAL STYLES & CSS RESET */
/* ============================================ */

/* ====== CSS Reset ====== */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color var(--duration-base) var(--ease-in-out),
              color var(--duration-base) var(--ease-in-out);
}

/* ====== Typography Elements ====== */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: var(--space-4);
  font-family: var(--font-display);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  color: var(--text-primary);
}

p {
  margin-top: 0;
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

small {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-in-out);
}

a:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}

a:active {
  color: var(--color-primary-dark);
}

/* ====== Form Elements ====== */
input,
textarea,
select,
button {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

input,
textarea,
select {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: border-color var(--duration-fast) var(--ease-in-out),
              background-color var(--duration-fast) var(--ease-in-out);
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-lighter);
}

input:disabled,
textarea:disabled,
select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--bg-secondary);
}

button {
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-in-out),
              transform var(--duration-fast) var(--ease-in-out);
}

button:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-1px);
}

button:active {
  background-color: var(--color-primary-dark);
  transform: translateY(0);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ====== List Elements ====== */
ul,
ol {
  margin-top: 0;
  margin-bottom: var(--space-4);
  padding-left: var(--space-6);
}

li {
  margin-bottom: var(--space-2);
}

/* ====== Code Elements ====== */
code,
pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
}

code {
  padding: var(--space-1) var(--space-2);
  display: inline-block;
}

pre {
  padding: var(--space-4);
  overflow-x: auto;
  margin-bottom: var(--space-4);
}

pre code {
  padding: 0;
  background-color: transparent;
  display: block;
}

/* ====== Table Elements ====== */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--space-4);
}

th,
td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: var(--bg-secondary);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

tr:hover {
  background-color: var(--bg-secondary);
}

/* ====== Blockquote ====== */
blockquote {
  margin: var(--space-4) 0;
  padding-left: var(--space-4);
  border-left: 4px solid var(--color-primary);
  color: var(--text-secondary);
  font-style: italic;
}

/* ====== Horizontal Rule ====== */
hr {
  margin: var(--space-6) 0;
  border: none;
  border-top: 1px solid var(--border-color);
}

/* ====== Scrollbar Styling ====== */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background-color: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--border-color-dark);
}

/* ====== Selection Styling ====== */
::selection {
  background-color: var(--color-primary);
  color: var(--color-white);
}

::-moz-selection {
  background-color: var(--color-primary);
  color: var(--color-white);
}

/* ====== Focus Visible (Keyboard Navigation) ====== */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ====== Accessibility: Visually Hidden ====== */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

#### Acceptance Criteria
- [ ] CSS reset applied to all elements
- [ ] Base typography styling for all heading levels
- [ ] Form elements styled consistently
- [ ] Button base styles defined
- [ ] Links and hover states configured
- [ ] Focus states for keyboard navigation
- [ ] Scrollbar styling applied
- [ ] Dark theme colors applied via CSS variables
- [ ] Transitions smooth with no layout shifts
- [ ] Accessibility features (sr-only, focus-visible) included

#### Verification Commands
```bash
npm run lint -- src/styles/globals.css
npm run type-check
```

---

### Subtask 11.3: Responsive Typography with clamp()

#### Status
status: pending

#### Objective
Create fluid typography system using CSS clamp() function for responsive font sizes that scale smoothly across 200px-3000px screens without media queries.

#### Context
This subtask implements scalable typography that automatically adjusts font size based on viewport width. Using clamp() eliminates need for breakpoint-specific font sizes while providing fine-grained responsive control.

#### Files to Create/Modify (Exclusive Ownership)
- `src/styles/typography.css` - Responsive typography with clamp()

#### Implementation

```css
/* src/styles/typography.css */
/* ============================================ */
/* RESPONSIVE TYPOGRAPHY WITH CLAMP() */
/* ============================================ */

/* ====== Fluid Typography Scale ====== */
/* Formula: clamp(min-size, preferred-size, max-size) */
/* Scales smoothly across all screen sizes */

/* Display (Hero) Sizes */
.text-display-lg {
  font-size: clamp(2.5rem, 5vw + 0.5rem, 4rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-display-md {
  font-size: clamp(2rem, 4vw + 0.5rem, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.15;
  letter-spacing: -0.015em;
}

.text-display-sm {
  font-size: clamp(1.5rem, 3vw + 0.25rem, 2.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* Heading Sizes */
h1 {
  font-size: clamp(1.5rem, 3vw + 0.25rem, 2.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

h2 {
  font-size: clamp(1.25rem, 2.5vw + 0.25rem, 2rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.25;
}

h3 {
  font-size: clamp(1.125rem, 2vw + 0.1rem, 1.75rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
}

h4 {
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1.35;
}

h5 {
  font-size: clamp(0.95rem, 1.25vw, 1.25rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1.4;
}

h6 {
  font-size: clamp(0.875rem, 1vw, 1.125rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1.5;
}

/* Body Text Sizes */
.text-body-lg {
  font-size: clamp(1.0625rem, 1.25vw, 1.25rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
  letter-spacing: 0;
}

.text-body-md {
  font-size: clamp(1rem, 1vw, 1.125rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
  letter-spacing: 0;
}

.text-body-sm {
  font-size: clamp(0.9375rem, 0.75vw, 1rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
  letter-spacing: 0;
}

p {
  font-size: clamp(1rem, 1vw, 1.125rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
}

/* Small Text Sizes */
.text-small {
  font-size: clamp(0.8125rem, 0.5vw, 0.875rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
}

.text-xs {
  font-size: clamp(0.75rem, 0.4vw, 0.8125rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.4;
}

/* Label & Caption Sizes */
.text-label {
  font-size: clamp(0.8125rem, 0.5vw, 0.9375rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.text-caption {
  font-size: clamp(0.75rem, 0.4vw, 0.8125rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.4;
  color: var(--text-secondary);
}

/* Code & Monospace Sizes */
.text-code {
  font-family: var(--font-mono);
  font-size: clamp(0.8125rem, 0.5vw, 0.9375rem);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
}

code {
  font-size: clamp(0.8125rem, 0.5vw, 0.9375rem);
}

pre {
  font-size: clamp(0.75rem, 0.4vw, 0.875rem);
}

/* ====== Responsive Line Height ====== */
.text-tight {
  line-height: 1.1;
}

.text-normal {
  line-height: 1.5;
}

.text-relaxed {
  line-height: 1.75;
}

.text-loose {
  line-height: 2;
}

/* ====== Letter Spacing Utilities ====== */
.text-tight-letter {
  letter-spacing: -0.02em;
}

.text-normal-letter {
  letter-spacing: 0;
}

.text-wide-letter {
  letter-spacing: 0.05em;
}

.text-wider-letter {
  letter-spacing: 0.1em;
}

/* ====== Responsive Margin for Typography ====== */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: clamp(1rem, 2vw, 2rem);
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
}

p {
  margin-bottom: clamp(1rem, 1.25vw, 1.5rem);
}

/* ====== Text Utilities ====== */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-ellipsis-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-ellipsis-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ====== Font Weight Utilities ====== */
.font-light {
  font-weight: var(--font-weight-light);
}

.font-normal {
  font-weight: var(--font-weight-normal);
}

.font-medium {
  font-weight: var(--font-weight-medium);
}

.font-semibold {
  font-weight: var(--font-weight-semibold);
}

.font-bold {
  font-weight: var(--font-weight-bold);
}

.font-extrabold {
  font-weight: var(--font-weight-extrabold);
}

/* ====== Text Color Utilities ====== */
.text-primary {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.text-tertiary {
  color: var(--text-tertiary);
}

.text-success {
  color: var(--color-success);
}

.text-warning {
  color: var(--color-warning);
}

.text-error {
  color: var(--color-error);
}

.text-info {
  color: var(--color-info);
}
```

#### Acceptance Criteria
- [ ] Display text sizes defined with clamp()
- [ ] All heading levels (h1-h6) use clamp() for fluid scaling
- [ ] Body text sizes responsive without breakpoints
- [ ] Small text and caption sizes defined
- [ ] Code and monospace sizes responsive
- [ ] Line height utilities available
- [ ] Letter spacing utilities defined
- [ ] Text margins use clamp() for responsive spacing
- [ ] Text truncation utilities included
- [ ] Font weight and color utilities available

#### Verification Commands
```bash
npm run lint -- src/styles/typography.css
npm run type-check
```

---

### Subtask 11.4: Responsive Layout with Container Queries

#### Status
status: pending

#### Objective
Create responsive layout system using CSS container queries for flexible component sizing that adapts based on container width rather than viewport width.

#### Context
Container queries enable components to adapt to their parent container size, making them more flexible and reusable across different layouts. This subtask complements viewport-based responsive design from Subtask 11.3.

#### Files to Create/Modify (Exclusive Ownership)
- `src/styles/responsive.css` - Container queries and responsive layout

#### Implementation

```css
/* src/styles/responsive.css */
/* ============================================ */
/* RESPONSIVE LAYOUT WITH CONTAINER QUERIES */
/* ============================================ */

/* ====== Container Query Definitions ====== */
.container-auto {
  container-type: inline-size;
  container-name: auto;
}

.container-main {
  container-type: inline-size;
  container-name: main;
}

.container-sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

.container-card {
  container-type: inline-size;
  container-name: card;
}

.container-grid {
  container-type: inline-size;
  container-name: grid;
}

/* ====== Grid Responsive with Container Queries ====== */
@supports (container-type: inline-size) {
  .grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(10rem, 20vw, 20rem), 1fr));
    gap: clamp(0.75rem, 2vw, 1.5rem);
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(12rem, 25vw, 24rem), 1fr));
    gap: clamp(1rem, 2.5vw, 2rem);
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(14rem, 28vw, 20rem), 1fr));
    gap: clamp(1rem, 2.5vw, 2rem);
  }

  .grid-4 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(15rem, 22vw, 18rem), 1fr));
    gap: clamp(1rem, 2.5vw, 2rem);
  }

  /* Container Query Breakpoints */
  /* Small Containers (200px - 375px) */
  @container (max-width: 375px) {
    .container-small\:stack {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .container-small\:text-center {
      text-align: center;
    }

    .container-small\:text-sm {
      font-size: clamp(0.75rem, 0.5vw, 0.875rem);
    }

    .container-small\:px-2 {
      padding-left: var(--space-2);
      padding-right: var(--space-2);
    }

    .container-small\:gap-2 {
      gap: var(--space-2);
    }
  }

  /* Medium Containers (375px - 768px) */
  @container (min-width: 376px) and (max-width: 768px) {
    .container-md\:grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }

    .container-md\:flex-row {
      flex-direction: row;
    }

    .container-md\:px-4 {
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }

    .container-md\:gap-4 {
      gap: var(--space-4);
    }

    .container-md\:text-md {
      font-size: clamp(0.95rem, 1vw, 1.125rem);
    }
  }

  /* Large Containers (768px - 1024px) */
  @container (min-width: 769px) and (max-width: 1024px) {
    .container-lg\:grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
    }

    .container-lg\:flex-row {
      flex-direction: row;
    }

    .container-lg\:px-6 {
      padding-left: var(--space-6);
      padding-right: var(--space-6);
    }

    .container-lg\:gap-6 {
      gap: var(--space-6);
    }
  }

  /* XL Containers (1024px - 1440px) */
  @container (min-width: 1025px) and (max-width: 1440px) {
    .container-xl\:grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);
    }

    .container-xl\:px-8 {
      padding-left: var(--space-8);
      padding-right: var(--space-8);
    }
  }

  /* 2XL+ Containers (1440px+) */
  @container (min-width: 1441px) {
    .container-2xl\:grid-5 {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-8);
    }

    .container-2xl\:px-12 {
      padding-left: var(--space-12);
      padding-right: var(--space-12);
    }
  }
}

/* ====== Responsive Padding & Margin (Fallback) ====== */
.px-auto {
  padding-left: clamp(1rem, 5vw, 3rem);
  padding-right: clamp(1rem, 5vw, 3rem);
}

.py-auto {
  padding-top: clamp(1rem, 5vw, 3rem);
  padding-bottom: clamp(1rem, 5vw, 3rem);
}

/* ====== Responsive Flex ====== */
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 1.5rem);
}

.flex-col {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 2vw, 1rem);
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 1vw, 1rem);
}

/* ====== Responsive Gap ====== */
.gap-auto {
  gap: clamp(0.75rem, 2vw, 1.5rem);
}

.gap-tight {
  gap: clamp(0.25rem, 1vw, 0.5rem);
}

.gap-loose {
  gap: clamp(1rem, 3vw, 2rem);
}

/* ====== Responsive Width ====== */
.w-full {
  width: 100%;
}

.w-auto {
  width: auto;
}

.max-w-xs {
  max-width: clamp(15rem, 40vw, 20rem);
}

.max-w-sm {
  max-width: clamp(18rem, 50vw, 24rem);
}

.max-w-md {
  max-width: clamp(22rem, 60vw, 30rem);
}

.max-w-lg {
  max-width: clamp(26rem, 70vw, 40rem);
}

.max-w-xl {
  max-width: clamp(30rem, 80vw, 50rem);
}

.max-w-2xl {
  max-width: clamp(35rem, 90vw, 60rem);
}

.max-w-4xl {
  max-width: clamp(45rem, 95vw, 80rem);
}

.max-w-6xl {
  max-width: clamp(55rem, 98vw, 100rem);
}

/* ====== Responsive Height ====== */
.h-screen {
  height: 100vh;
}

.h-min-screen {
  min-height: 100vh;
}

.h-auto {
  height: auto;
}

/* ====== Responsive Display (Fallback) ====== */
@media (max-width: 375px) {
  .hidden-mobile {
    display: none !important;
  }

  .show-mobile {
    display: block !important;
  }
}

@media (min-width: 376px) and (max-width: 768px) {
  .hidden-tablet {
    display: none !important;
  }

  .show-tablet {
    display: block !important;
  }
}

@media (min-width: 769px) {
  .hidden-desktop {
    display: none !important;
  }

  .show-desktop {
    display: block !important;
  }
}

/* ====== Responsive Aspect Ratio ====== */
.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-4-3 {
  aspect-ratio: 4 / 3;
}

.aspect-3-2 {
  aspect-ratio: 3 / 2;
}

/* ====== Responsive Positioning ====== */
.sticky {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

/* ====== Safe Area Inset (Mobile Notch) ====== */
@supports (padding: max(0px)) {
  body {
    padding-left: max(var(--space-4), env(safe-area-inset-left));
    padding-right: max(var(--space-4), env(safe-area-inset-right));
    padding-top: max(var(--space-4), env(safe-area-inset-top));
    padding-bottom: max(var(--space-4), env(safe-area-inset-bottom));
  }
}

/* ====== Print Styles ====== */
@media print {
  body {
    background-color: white;
    color: black;
  }

  a {
    text-decoration: underline;
  }

  .no-print {
    display: none !important;
  }
}
```

#### Acceptance Criteria
- [ ] Container query types defined for main content areas
- [ ] Grid systems responsive with auto-fit and minmax
- [ ] Container query breakpoints at 200px, 375px, 768px, 1024px, 1440px, 2560px, 3000px
- [ ] Responsive padding and margin with clamp()
- [ ] Flex utilities for common layouts
- [ ] Responsive width constraints
- [ ] Aspect ratio utilities included
- [ ] Safe area inset support for mobile notches
- [ ] Print styles defined
- [ ] Fallback display utilities for container query support

#### Verification Commands
```bash
npm run lint -- src/styles/responsive.css
npm run type-check
```

---

### Subtask 11.5: Theme Switching & Dark Mode System

#### Status
status: pending

#### Objective
Create comprehensive theme switching system with CSS transitions, localStorage persistence, and automatic detection of system preferences.

#### Context
This subtask establishes the mechanism for users to switch between light and dark themes while respecting system preferences. It integrates with all previous subtasks to ensure consistent theme application.

#### Files to Create/Modify (Exclusive Ownership)
- `src/styles/themes.css` - Theme switching and dark mode configuration

#### Implementation

```css
/* src/styles/themes.css */
/* ============================================ */
/* THEME SWITCHING & DARK MODE SYSTEM */
/* ============================================ */

/* ====== Import all other stylesheets ====== */
/* Note: In actual implementation, these would be */
/* imported via @import or JavaScript bundler */

/* ====== Default Light Theme ====== */
:root {
  color-scheme: light;
}

/* ====== Dark Theme Data Attribute ====== */
[data-theme="dark"] {
  color-scheme: dark;
}

/* ====== Auto-switch with system preference ====== */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
  }
}

/* ====== Smooth Transitions During Theme Switch ====== */
html {
  transition: background-color var(--duration-base) var(--ease-in-out),
              color var(--duration-base) var(--ease-in-out);
}

body {
  transition: background-color var(--duration-base) var(--ease-in-out),
              color var(--duration-base) var(--ease-in-out);
}

/* ====== Theme Toggle Button Styles ====== */
.theme-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-in-out);
  z-index: var(--z-base);
}

.theme-toggle:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color-dark);
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-toggle svg {
  width: 20px;
  height: 20px;
  transition: transform var(--duration-base) var(--ease-in-out);
}

.theme-toggle:hover svg {
  transform: rotate(20deg);
}

/* ====== Icon Visibility Control ====== */
.theme-toggle .icon-light {
  display: block;
  opacity: 1;
  transition: opacity var(--duration-fast) var(--ease-in-out);
}

.theme-toggle .icon-dark {
  display: none;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-in-out);
}

[data-theme="dark"] .theme-toggle .icon-light {
  display: none;
  opacity: 0;
}

[data-theme="dark"] .theme-toggle .icon-dark {
  display: block;
  opacity: 1;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .theme-toggle .icon-light {
    display: none;
    opacity: 0;
  }

  :root:not([data-theme="light"]) .theme-toggle .icon-dark {
    display: block;
    opacity: 1;
  }
}

/* ====== Theme Preference Indicator ====== */
.theme-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

/* ====== Color Transition Classes ====== */
.color-transition {
  transition: background-color var(--duration-base) var(--ease-in-out),
              color var(--duration-base) var(--ease-in-out),
              border-color var(--duration-base) var(--ease-in-out);
}

.color-transition-fast {
  transition: background-color var(--duration-fast) var(--ease-in-out),
              color var(--duration-fast) var(--ease-in-out),
              border-color var(--duration-fast) var(--ease-in-out);
}

.color-transition-slow {
  transition: background-color var(--duration-slow) var(--ease-in-out),
              color var(--duration-slow) var(--ease-in-out),
              border-color var(--duration-slow) var(--ease-in-out);
}

/* ====== Theme-Aware Component Styles ====== */

/* Cards */
.card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: box-shadow var(--duration-fast) var(--ease-in-out),
              transform var(--duration-fast) var(--ease-in-out);
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-in-out);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color-dark);
}

.btn-ghost {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-ghost:hover {
  background-color: var(--bg-secondary);
  border-color: var(--color-primary);
}

/* Modals & Overlays */
.modal-overlay {
  background-color: var(--bg-overlay);
  transition: opacity var(--duration-base) var(--ease-in-out);
}

.modal {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  color: var(--text-primary);
}

/* Inputs */
.input,
.textarea,
.select {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: border-color var(--duration-fast) var(--ease-in-out),
              box-shadow var(--duration-fast) var(--ease-in-out);
}

.input:focus,
.textarea:focus,
.select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input:disabled,
.textarea:disabled,
.select:disabled {
  background-color: var(--bg-secondary);
  opacity: 0.6;
}

/* ====== Avoid Flash of Wrong Theme ====== */
html {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

/* Prevent white flash in dark mode */
@media (prefers-color-scheme: dark) {
  html {
    background-color: #111827;
    color: #f9fafb;
  }
}

[data-theme="dark"] html {
  background-color: #111827;
  color: #f9fafb;
}

/* ====== Theme-Aware Images ====== */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

.img-dark-mode {
  display: none;
}

[data-theme="dark"] .img-dark-mode {
  display: block;
}

[data-theme="dark"] .img-light-mode {
  display: none;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .img-dark-mode {
    display: block;
  }

  :root:not([data-theme="light"]) .img-light-mode {
    display: none;
  }
}

/* ====== Animation Utilities ====== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(10px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn var(--duration-base) var(--ease-out);
}

.animate-slide-in-up {
  animation: slideInUp var(--duration-base) var(--ease-out);
}

.animate-slide-in-down {
  animation: slideInDown var(--duration-base) var(--ease-out);
}

.animate-slide-in-left {
  animation: slideInLeft var(--duration-base) var(--ease-out);
}

.animate-slide-in-right {
  animation: slideInRight var(--duration-base) var(--ease-out);
}
```

#### Acceptance Criteria
- [ ] Theme toggle button styled with icons
- [ ] Light and dark theme variants displayed correctly
- [ ] System preference detection with @media (prefers-color-scheme)
- [ ] Data attribute theme switching (data-theme)
- [ ] Smooth transitions when switching themes
- [ ] Theme persists via localStorage (implementation note)
- [ ] No flash of wrong theme on page load
- [ ] Theme-aware component styling (cards, buttons, inputs, modals)
- [ ] Animation utilities defined
- [ ] High contrast mode support

#### Verification Commands
```bash
npm run lint -- src/styles/themes.css
npm run type-check
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/styles/variables.css`
- `src/styles/globals.css`
- `src/styles/typography.css`
- `src/styles/responsive.css`
- `src/styles/themes.css`

### Imports From Existing Code
- None - This task creates the foundational CSS layer

### Exports For Other Code
All CSS files are referenced globally via:
- Import statements in root component
- HTML `<link>` tags in index.html
- CSS variable access throughout the application

---

## Task-Level Verification

```bash
# Type check and lint all CSS files
npm run lint -- src/styles/

# Verify CSS is valid
npm run type-check

# Visual verification in browser
npm run dev

# Check for CSS variable coverage
grep -r "var(--" src/ | wc -l
```

---

## Parallelization Notes

- All 5 subtasks can run in parallel
- Each subtask owns exclusive CSS files
- Subtasks import from variables.css but don't modify it
- No circular dependencies between subtasks
- Subtask 11.1 (variables.css) should be available for other subtasks to reference
- All subtasks can be implemented, tested, and verified independently
- Final integration requires importing all CSS files in correct order:
  1. variables.css
  2. globals.css
  3. typography.css
  4. responsive.css
  5. themes.css

---

## Implementation Notes

### CSS Import Order (for bundler configuration)
```javascript
// In your CSS entry point or bundler config
import './styles/variables.css';    // Variables first
import './styles/globals.css';      // Global reset & base
import './styles/typography.css';   // Typography utilities
import './styles/responsive.css';   // Layout & responsive
import './styles/themes.css';       // Theme switching last
```

### Browser Support
- CSS Custom Properties: All modern browsers (IE11 fallbacks optional)
- CSS clamp(): All modern browsers (fallback to single value)
- Container Queries: Modern browsers (graceful degradation for older browsers)
- prefers-color-scheme: All modern browsers
- Safe Area Inset: Mobile browsers with notches

### Screen Size Coverage
- 200px: Smallest smartwatch
- 375px: iPhone SE
- 768px: iPad mini
- 1024px: iPad Pro / Small laptop
- 1440px: Full HD desktop
- 2560px: 2K desktop
- 3000px: 4K display

---
