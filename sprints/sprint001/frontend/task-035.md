# Frontend Task 35: App Layout - Main Layout Container

## Metadata
- **Task**: 35 of 40
- **Area**: Frontend
- **Feature**: App Layout
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the AppLayout component that assembles Header, main content area (children), and Footer with a responsive flexbox/grid layout supporting container queries, responsive widths from 200px to 3000px, and proper semantic HTML structure. This is the root layout container for the entire application.

---

## Subtasks

### Subtask 35.1: AppLayout Main Component

#### Status
status: pending

#### Objective
Create AppLayout component with flexbox column layout structure containing Header, main content area, and Footer with proper semantic HTML and responsive sizing.

#### Context
The AppLayout component serves as the root container for all pages, establishing the visual structure with vertical flexbox layout. It must support content from 200px minimum width (mobile) to 3000px maximum width (ultra-wide displays).

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/AppLayout.tsx` - Main layout component

#### Implementation

```typescript
import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './AppLayout.module.css';

export interface AppLayoutProps {
  children: ReactNode;
  className?: string;
  headerVariant?: 'default' | 'minimal' | 'expanded';
  footerVariant?: 'default' | 'minimal';
}

/**
 * AppLayout Component
 *
 * Root layout container providing semantic structure with flexbox layout.
 * Assembles Header, main content area, and Footer.
 *
 * Features:
 * - Full viewport height flexbox layout
 * - Responsive width constraints (200px-3000px)
 * - Semantic HTML structure
 * - Container queries for content area
 * - Smooth transitions for layout shifts
 *
 * @component
 * @example
 * <AppLayout headerVariant="default" footerVariant="default">
 *   <MainContent />
 * </AppLayout>
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className = '',
  headerVariant = 'default',
  footerVariant = 'default',
}) => {
  return (
    <div className={`${styles.appLayout} ${className}`}>
      {/* Header Section */}
      <header className={styles.header}>
        <Header variant={headerVariant} />
      </header>

      {/* Main Content Section with Container Queries */}
      <main className={styles.main}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <Footer variant={footerVariant} />
      </footer>
    </div>
  );
};

AppLayout.displayName = 'AppLayout';

export default AppLayout;
```

#### Props Interface
```typescript
interface AppLayoutProps {
  /**
   * Children components rendered in the main content area
   */
  children: ReactNode;

  /**
   * Optional CSS class name for additional styling
   */
  className?: string;

  /**
   * Header variant controlling appearance and height
   * @default 'default'
   */
  headerVariant?: 'default' | 'minimal' | 'expanded';

  /**
   * Footer variant controlling appearance and layout
   * @default 'default'
   */
  footerVariant?: 'default' | 'minimal';
}
```

#### Acceptance Criteria
- [ ] Component renders without errors
- [ ] Three semantic sections (header, main, footer) present
- [ ] Flexbox layout properly applied
- [ ] Props interface properly typed
- [ ] Children render in main content area
- [ ] No console errors or warnings

#### Verification Commands
```bash
npm run type-check -- src/components/Layout/AppLayout.tsx
npm test -- --testPathPattern="AppLayout" --testNamePattern="35.1"
```

---

### Subtask 35.2: AppLayout Styles with Container Queries

#### Status
status: pending

#### Objective
Create CSS module with flexbox layout structure, container queries for content area, and responsive width constraints (200px-3000px) with proper spacing and alignment.

#### Context
The CSS module must establish the visual foundation with flexbox column layout, ensure full viewport height coverage, implement container queries for the main content area to support responsive inner layouts, and enforce width constraints across all breakpoints.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/AppLayout.module.css` - Layout styles with container queries

#### Implementation

```css
/* AppLayout.module.css */

/**
 * Root Layout Container
 * Flexbox column layout with full viewport height
 * Supports responsive widths from 200px to 3000px
 */
.appLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 200px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  background-color: var(--color-background, #ffffff);
  color: var(--color-text, #000000);
  transition: all 0.3s ease-in-out;
}

/**
 * Header Section
 * Fixed or sticky header with semantic markup
 * Scrolls with content by default
 */
.header {
  flex-shrink: 0;
  width: 100%;
  min-width: 200px;
  max-width: 3000px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-border, #e5e5e5);
  transition: box-shadow 0.2s ease-in-out;
}

.header:hover {
  box-shadow: 0 2px 8px var(--color-shadow-light, rgba(0, 0, 0, 0.05));
}

/**
 * Main Content Section
 * Grows to fill available space between header and footer
 * Container query enabled for responsive inner layouts
 */
.main {
  flex: 1 1 auto;
  width: 100%;
  min-width: 200px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-main-vertical, 1rem) 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--color-background-secondary, #fafafa);
  transition: background-color 0.3s ease-in-out;
}

/**
 * Content Container with Container Queries
 * Applies responsive constraints and enables container queries
 * Supports widths from 200px (mobile) to 3000px (ultra-wide)
 */
.contentContainer {
  width: 100%;
  min-width: 200px;
  max-width: 3000px;
  padding: var(--spacing-container-horizontal, 1rem);
  box-sizing: border-box;
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-container-gap, 1.5rem);
}

/**
 * Container Query Breakpoints
 * Define responsive behavior based on container width
 */

/* Ultra-wide displays (2400px+) */
@container (min-width: 2400px) {
  .contentContainer {
    padding: var(--spacing-container-horizontal-xl, 3rem);
    gap: var(--spacing-container-gap-xl, 2rem);
  }
}

/* Desktop (1200px-2399px) */
@container (min-width: 1200px) and (max-width: 2399px) {
  .contentContainer {
    padding: var(--spacing-container-horizontal-lg, 2rem);
    gap: var(--spacing-container-gap-lg, 1.75rem);
  }
}

/* Tablet (768px-1199px) */
@container (min-width: 768px) and (max-width: 1199px) {
  .contentContainer {
    padding: var(--spacing-container-horizontal-md, 1.5rem);
    gap: var(--spacing-container-gap-md, 1.25rem);
  }
}

/* Mobile (200px-767px) */
@container (max-width: 767px) {
  .contentContainer {
    padding: var(--spacing-container-horizontal-sm, 1rem);
    gap: var(--spacing-container-gap-sm, 1rem);
  }
}

/**
 * Footer Section
 * Sticky to bottom when content is short
 * Scrolls with content when needed
 */
.footer {
  flex-shrink: 0;
  width: 100%;
  min-width: 200px;
  max-width: 3000px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  border-top: 1px solid var(--color-border, #e5e5e5);
  background-color: var(--color-background-tertiary, #f5f5f5);
  transition: box-shadow 0.2s ease-in-out;
}

.footer:hover {
  box-shadow: 0 -2px 8px var(--color-shadow-light, rgba(0, 0, 0, 0.05));
}

/**
 * Media Query Overrides for Viewport Width
 * Fallback for browsers without full container query support
 */

@media (max-width: 767px) {
  .appLayout {
    font-size: 14px;
  }

  .main {
    padding: 0.75rem 0;
  }

  .contentContainer {
    padding: 1rem;
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .appLayout {
    font-size: 15px;
  }

  .main {
    padding: 1.25rem 0;
  }

  .contentContainer {
    padding: 1.5rem;
  }
}

@media (min-width: 1200px) {
  .appLayout {
    font-size: 16px;
  }

  .main {
    padding: 1.5rem 0;
  }

  .contentContainer {
    padding: 2rem;
  }
}

@media (min-width: 2400px) {
  .contentContainer {
    padding: 3rem;
  }
}

/**
 * Print Styles
 * Optimize for printing
 */
@media print {
  .appLayout {
    min-height: auto;
  }

  .main {
    overflow: visible;
  }

  .header,
  .footer {
    break-inside: avoid;
  }
}
```

#### Acceptance Criteria
- [ ] CSS module compiles without errors
- [ ] Flexbox layout properly structured
- [ ] Container queries functional for responsive content
- [ ] Width constraints enforced (200px-3000px)
- [ ] Header and footer properly styled
- [ ] Main content area grows to fill space
- [ ] Print styles included
- [ ] CSS variables used for theming

#### Verification Commands
```bash
npm run lint -- src/components/Layout/AppLayout.module.css
npm test -- --testPathPattern="AppLayout" --testNamePattern="35.2"
```

---

### Subtask 35.3: AppLayout TypeScript Types and Props Validation

#### Status
status: pending

#### Objective
Create comprehensive TypeScript interfaces and type definitions for AppLayout component with proper prop validation, documentation, and type safety.

#### Context
TypeScript types ensure type safety, enable IDE autocompletion, and provide documentation for component consumers. This subtask creates the types file with AppLayout-specific interfaces and re-exports from main component.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/AppLayout.types.ts` - Type definitions

#### Implementation

```typescript
// AppLayout.types.ts

import { ReactNode, CSSProperties } from 'react';

/**
 * Header variant type
 * Determines the header appearance and behavior
 */
export type HeaderVariant = 'default' | 'minimal' | 'expanded';

/**
 * Footer variant type
 * Determines the footer appearance and layout
 */
export type FooterVariant = 'default' | 'minimal';

/**
 * Layout breakpoint type
 * Defines responsive layout breakpoints
 */
export type LayoutBreakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultrawide';

/**
 * Layout spacing configuration
 * Customizable spacing values for the layout
 */
export interface LayoutSpacing {
  /** Vertical padding for main content area */
  mainVertical?: string;
  /** Horizontal padding for content container */
  containerHorizontal?: string;
  /** Gap between child elements in container */
  containerGap?: string;
  /** Mobile horizontal padding */
  containerHorizontalSm?: string;
  /** Tablet horizontal padding */
  containerHorizontalMd?: string;
  /** Desktop horizontal padding */
  containerHorizontalLg?: string;
  /** Ultra-wide horizontal padding */
  containerHorizontalXl?: string;
}

/**
 * Layout theme configuration
 * Color and styling properties for the layout
 */
export interface LayoutTheme {
  /** Main background color */
  backgroundColor?: string;
  /** Secondary background color for main area */
  backgroundColorSecondary?: string;
  /** Tertiary background color for footer */
  backgroundColorTertiary?: string;
  /** Main text color */
  textColor?: string;
  /** Border color */
  borderColor?: string;
  /** Shadow color */
  shadowColor?: string;
  /** Shadow color for light effects */
  shadowColorLight?: string;
}

/**
 * Responsive layout configuration
 * Container query and breakpoint settings
 */
export interface ResponsiveConfig {
  /** Enable container queries */
  enableContainerQueries?: boolean;
  /** Mobile breakpoint width */
  mobileBp?: number; // default: 767
  /** Tablet breakpoint width */
  tabletBp?: number; // default: 1199
  /** Desktop breakpoint width */
  desktopBp?: number; // default: 2399
  /** Minimum content width */
  minWidth?: number; // default: 200
  /** Maximum content width */
  maxWidth?: number; // default: 3000
}

/**
 * Layout context value
 * Shared layout state and configuration
 */
export interface LayoutContextValue {
  /** Current active breakpoint */
  breakpoint: LayoutBreakpoint;
  /** Header variant */
  headerVariant: HeaderVariant;
  /** Footer variant */
  footerVariant: FooterVariant;
  /** Current viewport width in pixels */
  viewportWidth: number;
  /** Whether layout is in mobile view */
  isMobile: boolean;
  /** Whether layout is in tablet view */
  isTablet: boolean;
  /** Whether layout is in desktop view */
  isDesktop: boolean;
  /** Layout theme configuration */
  theme: LayoutTheme;
  /** Spacing configuration */
  spacing: LayoutSpacing;
}

/**
 * AppLayout component props
 * Configuration options for the layout container
 */
export interface AppLayoutProps {
  /** Children components rendered in the main content area */
  children: ReactNode;

  /** Optional CSS class name for additional styling */
  className?: string;

  /** Optional inline styles */
  style?: CSSProperties;

  /** Header variant controlling appearance and height */
  headerVariant?: HeaderVariant;

  /** Footer variant controlling appearance and layout */
  footerVariant?: FooterVariant;

  /** Custom spacing configuration */
  spacing?: Partial<LayoutSpacing>;

  /** Custom theme configuration */
  theme?: Partial<LayoutTheme>;

  /** Responsive configuration */
  responsiveConfig?: Partial<ResponsiveConfig>;

  /** Callback when layout breakpoint changes */
  onBreakpointChange?: (breakpoint: LayoutBreakpoint) => void;

  /** Whether to enable debug mode with borders and colors */
  debug?: boolean;

  /** Custom layout container element (default: div) */
  as?: React.ElementType;

  /** ARIA label for the layout region */
  ariaLabel?: string;

  /** ARIA live region politeness (for dynamic content updates) */
  ariaLive?: 'polite' | 'assertive' | 'off';

  /** Role attribute for semantic meaning */
  role?: string;
}

/**
 * Layout section configuration
 * Settings for header, main, and footer sections
 */
export interface LayoutSectionConfig {
  /** Enable sticky positioning */
  sticky?: boolean;
  /** Custom padding */
  padding?: string | number;
  /** Custom margin */
  margin?: string | number;
  /** Background color override */
  backgroundColor?: string;
  /** Border configuration */
  border?: {
    width?: string | number;
    color?: string;
    style?: string;
  };
}

/**
 * Complete layout configuration
 * Centralized configuration for all layout aspects
 */
export interface AppLayoutConfig {
  /** Responsive settings */
  responsive: ResponsiveConfig;
  /** Theme settings */
  theme: LayoutTheme;
  /** Spacing settings */
  spacing: LayoutSpacing;
  /** Header section configuration */
  headerConfig?: LayoutSectionConfig;
  /** Main content section configuration */
  mainConfig?: LayoutSectionConfig;
  /** Footer section configuration */
  footerConfig?: LayoutSectionConfig;
}

/**
 * Default AppLayout configuration
 */
export const DEFAULT_LAYOUT_CONFIG: AppLayoutConfig = {
  responsive: {
    enableContainerQueries: true,
    mobileBp: 767,
    tabletBp: 1199,
    desktopBp: 2399,
    minWidth: 200,
    maxWidth: 3000,
  },
  theme: {
    backgroundColor: '#ffffff',
    backgroundColorSecondary: '#fafafa',
    backgroundColorTertiary: '#f5f5f5',
    textColor: '#000000',
    borderColor: '#e5e5e5',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowColorLight: 'rgba(0, 0, 0, 0.05)',
  },
  spacing: {
    mainVertical: '1rem',
    containerHorizontal: '1rem',
    containerGap: '1.5rem',
    containerHorizontalSm: '1rem',
    containerHorizontalMd: '1.5rem',
    containerHorizontalLg: '2rem',
    containerHorizontalXl: '3rem',
  },
};
```

#### Acceptance Criteria
- [ ] All TypeScript interfaces properly defined
- [ ] Types compile without errors
- [ ] Default configuration provided
- [ ] Type documentation complete
- [ ] Props properly validated through interface
- [ ] Type exports accessible for external use
- [ ] No TypeScript warnings

#### Verification Commands
```bash
npm run type-check -- src/components/Layout/AppLayout.types.ts
npm test -- --testPathPattern="AppLayout" --testNamePattern="35.3"
```

---

### Subtask 35.4: AppLayout Index Export and Integration

#### Status
status: pending

#### Objective
Create index export file and ensure AppLayout component is properly exported for use throughout the application with correct module structure.

#### Context
The index file provides clean module boundaries and makes the component easily importable. It exports the component, types, and default configuration for convenient use.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/index.ts` - Index export file

#### Implementation

```typescript
// src/components/Layout/index.ts

/**
 * Layout Module
 *
 * Exports the AppLayout component and related types
 * for the main application layout structure
 */

export { default as AppLayout } from './AppLayout';
export type { AppLayoutProps } from './AppLayout';

export type {
  HeaderVariant,
  FooterVariant,
  LayoutBreakpoint,
  LayoutSpacing,
  LayoutTheme,
  ResponsiveConfig,
  LayoutContextValue,
  LayoutSectionConfig,
  AppLayoutConfig,
} from './AppLayout.types';

export { DEFAULT_LAYOUT_CONFIG } from './AppLayout.types';
```

#### Acceptance Criteria
- [ ] Index file exports AppLayout component
- [ ] All types properly exported
- [ ] Default configuration exported
- [ ] Module can be imported correctly
- [ ] No barrel export cycles
- [ ] Tree-shakeable exports

#### Verification Commands
```bash
npm run type-check -- src/components/Layout/index.ts
npm test -- --testPathPattern="AppLayout" --testNamePattern="35.4"
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/Layout/AppLayout.tsx`
- `src/components/Layout/AppLayout.module.css`
- `src/components/Layout/AppLayout.types.ts`
- `src/components/Layout/index.ts`

### Imports From Existing Code
- `Header` from `src/components/Header/Header` (existing component)
- `Footer` from `src/components/Footer/Footer` (existing component)
- React types from `'react'`

### Exports For Other Code
- `AppLayout` - Main layout component
- `AppLayoutProps` - Component props interface
- `HeaderVariant` - Header variant type
- `FooterVariant` - Footer variant type
- `LayoutBreakpoint` - Breakpoint type
- `ResponsiveConfig` - Responsive configuration type
- `DEFAULT_LAYOUT_CONFIG` - Default configuration object

---

## Task-Level Verification

```bash
# Type checking
npm run type-check -- src/components/Layout/

# Linting
npm run lint -- src/components/Layout/

# Testing
npm test -- --testPathPattern="AppLayout"

# Build verification
npm run build
```

---

## Parallelization Notes

- **Subtask 35.1** (Component) can run immediately - creates the main component structure
- **Subtask 35.2** (Styles) can run in parallel - independent CSS module
- **Subtask 35.3** (Types) can run in parallel - standalone type definitions
- **Subtask 35.4** (Index Export) can run in parallel or after 35.1-35.3 - aggregates exports

All subtasks are completely independent and own exclusive files. They can be executed in any order or all simultaneously without conflicts.

---

## Implementation Notes

### Layout Structure
The AppLayout uses CSS Flexbox with a column direction to create three distinct sections:
- **Header**: Fixed height, no shrink
- **Main**: Grows to fill available space
- **Footer**: Fixed height, no shrink

### Container Queries
The `.contentContainer` element uses `container-type: inline-size` to enable container queries. This allows responsive behavior based on the actual container width rather than viewport width, providing more flexible responsive design.

### Responsive Widths
The layout supports:
- **Minimum**: 200px (small mobile phones)
- **Maximum**: 3000px (ultra-wide displays)
- **Four content breakpoints**:
  - Mobile: 200px-767px
  - Tablet: 768px-1199px
  - Desktop: 1200px-2399px
  - Ultra-wide: 2400px+

### CSS Variables
The component uses CSS custom properties for easy theming:
- `--color-background`
- `--color-text`
- `--color-border`
- `--color-shadow-light`
- `--spacing-main-vertical`
- `--spacing-container-*`

These can be overridden in parent stylesheets for theme customization.

### Semantic HTML
The component uses proper semantic HTML elements:
- `<header>` for header section
- `<main>` for main content area
- `<footer>` for footer section
- Proper ARIA attributes for accessibility
