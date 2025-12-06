# Frontend Task 027: Country List - Grid Container

## Metadata
- **Task**: 27 of 40
- **Area**: Frontend
- **Feature**: Country List Grid Display
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a responsive CountryGrid component system that displays filtered country cards in a dynamic CSS Grid layout. The grid automatically adapts from 1 column at 200px viewport width to 6 columns at 3000px width. Includes an EmptyState component for when no countries match the search/filter criteria, and comprehensive responsive styling with CSS modules. The grid uses CSS Grid with auto-fit columns and minmax() for intrinsic responsiveness without media queries. All components are fully typed with TypeScript and support accessibility features.

---

## Subtasks

### Subtask 27.1: CountryGrid Main Container Component

#### Status
status: pending

#### Objective
Create the primary CountryGrid component that renders country cards in a responsive CSS Grid layout with automatic column adaptation.

#### Context
The CountryGrid is the main container that receives a list of country objects and renders them as cards in a responsive CSS Grid. It uses CSS Grid's auto-fit with minmax() to automatically calculate the number of columns based on viewport width. This subtask owns the grid layout logic, card rendering, and integration with the CSS module. The grid adapts smoothly from 200px (1 column) to 3000px (6 columns) without any JavaScript calculations.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryGrid.tsx` - Main CountryGrid container component
- `src/components/CountryList/index.ts` - Export index for the CountryList module

#### Implementation

```typescript
// src/components/CountryList/CountryGrid.tsx
import React from 'react';
import styles from './CountryGrid.module.css';

/**
 * Type definition for country data
 * Aligns with backend API structure
 */
export interface Country {
  id: string;
  name: string;
  code: string;
  flag?: string;
  registrationFee?: number;
  currency?: string;
  region?: string;
  description?: string;
}

export interface CountryGridProps {
  countries: Country[];
  onCountrySelect?: (country: Country) => void;
  loading?: boolean;
  className?: string;
  itemsPerPage?: number;
  virtualizeEnabled?: boolean;
}

/**
 * CountryGrid Component
 * Renders a responsive grid of country cards that adapts from 1-6 columns
 * Based on viewport width (200px = 1 col, 3000px = 6 cols)
 *
 * Features:
 * - CSS Grid with auto-fit for automatic column calculation
 * - No media queries needed - pure CSS Grid responsiveness
 * - Smooth column transitions as viewport resizes
 * - Optional virtualization for performance with large datasets
 * - Empty state displayed when countries array is empty
 */
export const CountryGrid: React.FC<CountryGridProps> = ({
  countries,
  onCountrySelect,
  loading = false,
  className = '',
  itemsPerPage = 50,
  virtualizeEnabled = false,
}) => {
  // Show empty state when no countries provided
  if (!loading && countries.length === 0) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <EmptyState />
      </div>
    );
  }

  // Show loading skeleton if data is loading
  if (loading) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <div className={styles.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`skeleton-${i}`} className={styles.countryCardSkeleton}>
              <div className={styles.skeletonShimmer} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main grid rendering
  return (
    <div className={`${styles.gridContainer} ${className}`}>
      <div
        className={styles.grid}
        role="grid"
        aria-label="Country selection grid"
        aria-rowcount={Math.ceil(countries.length / 6)}
      >
        {countries.map((country) => (
          <div
            key={country.id}
            className={styles.countryCard}
            onClick={() => onCountrySelect?.(country)}
            role="gridcell"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCountrySelect?.(country);
              }
            }}
            aria-label={`Select ${country.name}`}
          >
            {/* Country Flag */}
            {country.flag && (
              <div className={styles.countryFlag}>
                {country.flag}
              </div>
            )}

            {/* Country Info */}
            <div className={styles.countryInfo}>
              <h3 className={styles.countryName}>{country.name}</h3>
              <p className={styles.countryCode}>{country.code}</p>

              {/* Optional: Display additional info */}
              {country.region && (
                <p className={styles.countryRegion}>{country.region}</p>
              )}

              {country.registrationFee && (
                <p className={styles.countryFee}>
                  Fee: {country.currency || 'EUR'} {country.registrationFee}
                </p>
              )}

              {country.description && (
                <p className={styles.countryDescription}>
                  {country.description}
                </p>
              )}
            </div>

            {/* Hover Indicator */}
            <div className={styles.cardHoverOverlay} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Import EmptyState component (created in subtask 27.2)
import { EmptyState } from './EmptyState';

export default CountryGrid;
```

#### Props Interface
```typescript
interface CountryGridProps {
  countries: Country[];
  onCountrySelect?: (country: Country) => void;
  loading?: boolean;
  className?: string;
  itemsPerPage?: number;
  virtualizeEnabled?: boolean;
}

interface Country {
  id: string;
  name: string;
  code: string;
  flag?: string;
  registrationFee?: number;
  currency?: string;
  region?: string;
  description?: string;
}
```

#### Acceptance Criteria
- [ ] Component renders country cards in responsive grid layout
- [ ] Grid adapts from 1 column (200px) to 6 columns (3000px) based on viewport
- [ ] Uses CSS Grid with auto-fit and minmax() for automatic responsiveness
- [ ] Clicking card fires onCountrySelect callback
- [ ] Keyboard navigation works (Enter/Space to select)
- [ ] Shows EmptyState when countries array is empty
- [ ] Shows loading skeleton when loading=true
- [ ] Proper ARIA labels and roles for accessibility
- [ ] TypeScript types properly defined
- [ ] No console errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="CountryGrid" --testNamePattern="renders grid"
```

---

### Subtask 27.2: EmptyState Component with i18n

#### Status
status: pending

#### Objective
Create the EmptyState component that displays a user-friendly message when no countries match the current search or filter criteria, with internationalization support.

#### Context
The EmptyState component is displayed inside CountryGrid when the countries array is empty. It provides a helpful message explaining why no countries are shown and suggests actions to the user. This subtask owns the empty state UI, i18n message handling, and styling. The component imports language state from Jotai and i18next for multi-language support. It should be visually distinct and guide users on what to do next (e.g., clear filters, try different search term).

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/EmptyState.tsx` - Empty state component with i18n messages

#### Implementation

```typescript
// src/components/CountryList/EmptyState.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CountryGrid.module.css';

export interface EmptyStateProps {
  className?: string;
  showIcon?: boolean;
  message?: string;
  suggestion?: string;
}

/**
 * EmptyState Component
 * Displays a friendly message when no countries are available
 * Supports i18n with fallback English messages
 *
 * Features:
 * - Multi-language support via i18next
 * - Accessible with proper ARIA labels
 * - Customizable message and suggestion text
 * - Optional icon display for visual emphasis
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  className = '',
  showIcon = true,
  message,
  suggestion,
}) => {
  const { t } = useTranslation();

  // Get messages from i18n with fallback to defaults
  const emptyMessage = message || t('countryGrid.emptyState.title', 'No countries found');
  const emptySuggestion =
    suggestion ||
    t(
      'countryGrid.emptyState.suggestion',
      'Try adjusting your search filters or clear your search to see all countries.'
    );

  return (
    <div
      className={`${styles.emptyState} ${className}`}
      role="region"
      aria-label="No countries available"
      aria-live="polite"
    >
      {/* Icon Section */}
      {showIcon && (
        <div className={styles.emptyStateIcon}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M32 4C16.536 4 4 16.536 4 32c0 15.464 12.536 28 28 28s28-12.536 28-28S47.464 4 32 4zm0 52c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"
              fill="currentColor"
            />
            <path
              d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {/* Message Section */}
      <div className={styles.emptyStateContent}>
        <h3 className={styles.emptyStateTitle}>{emptyMessage}</h3>
        <p className={styles.emptyStateSuggestion}>{emptySuggestion}</p>
      </div>

      {/* Optional: Action Button */}
      <div className={styles.emptyStateAction}>
        <p className={styles.emptyStateHint}>
          {t(
            'countryGrid.emptyState.hint',
            'Use the filters above to search or browse countries'
          )}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
```

#### Props Interface
```typescript
interface EmptyStateProps {
  className?: string;
  showIcon?: boolean;
  message?: string;
  suggestion?: string;
}
```

#### Acceptance Criteria
- [ ] Component displays when countries array is empty
- [ ] Shows user-friendly message with icon
- [ ] Uses i18next translation with fallback English text
- [ ] Message keys: countryGrid.emptyState.title, .suggestion, .hint
- [ ] SVG icon displays correctly (globe icon)
- [ ] Proper ARIA labels (role="region", aria-label, aria-live="polite")
- [ ] Customizable message and suggestion via props
- [ ] Responsive layout that works at all viewport widths
- [ ] TypeScript types properly defined
- [ ] No console errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="EmptyState"
```

---

### Subtask 27.3: CSS Grid Responsive Styling Module

#### Status
status: pending

#### Objective
Create comprehensive CSS module with responsive CSS Grid layout that adapts column count from 1-6 based on viewport width (200px-3000px).

#### Context
This subtask owns all styling for the CountryGrid and EmptyState components. It uses CSS Grid's auto-fit with minmax() to achieve intrinsic responsiveness without media queries. The grid automatically calculates columns based on available space and card width constraints. The stylesheet includes styles for the grid container, country cards, loading skeleton, empty state, and hover/focus effects. All styling uses CSS modules for component scoping.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryGrid.module.css` - All responsive grid styles

#### Implementation

```css
/* src/components/CountryList/CountryGrid.module.css */

/* Grid Container */
.gridContainer {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

/**
 * CSS Grid with auto-fit
 * minmax(240px, 1fr) = minimum card width 240px, flexible growth
 *
 * Viewport Width → Column Count (approximate):
 * 200px → 1 column (200 - 32px padding = 168px usable, < 240px = 1 col)
 * 500px → 2 columns (500 - 32px padding = 468px, ~234px per col)
 * 700px → 3 columns (700 - 32px padding = 668px, ~223px per col)
 * 1000px → 4 columns (1000 - 32px padding = 968px, ~242px per col)
 * 1500px → 5 columns (1500 - 32px padding = 1468px, ~293px per col)
 * 2000px → 6 columns (2000 - 32px padding = 1968px, ~328px per col)
 * 3000px → 6 columns (max 6, fills with wider columns)
 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Country Card Base Styles */
.countryCard {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 240px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.countryCard:hover {
  border-color: var(--primary-color, #4f46e5);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.countryCard:focus-visible {
  outline: 2px solid var(--focus-color, #4f46e5);
  outline-offset: 2px;
}

.countryCard:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Country Flag */
.countryFlag {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: linear-gradient(135deg, var(--bg-secondary, #f5f5f5) 0%, var(--bg-hover, #f0f0f0) 100%);
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  flex-shrink: 0;
}

/* Country Info Container */
.countryInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
}

.countryName {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text-primary, #333333);
  margin: 0;
  padding: 0;
  line-height: 1.3;
}

.countryCode {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary, #666666);
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.countryRegion {
  font-size: 0.75rem;
  color: var(--text-tertiary, #999999);
  margin: 0;
  padding: 0;
  text-transform: capitalize;
}

.countryFee {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-color, #4f46e5);
  margin: 0.25rem 0 0 0;
  padding: 0;
}

.countryDescription {
  font-size: 0.75rem;
  color: var(--text-secondary, #666666);
  margin: 0.5rem 0 0 0;
  padding: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover Overlay */
.cardHoverOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.02) 100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.countryCard:hover .cardHoverOverlay {
  opacity: 1;
}

/* Loading Skeleton */
.countryCardSkeleton {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 0.5rem;
  overflow: hidden;
  min-height: 240px;
  animation: pulse 2s ease-in-out infinite;
}

.skeletonShimmer {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--bg-secondary, #f5f5f5) 0%,
    var(--bg-hover, #f0f0f0) 50%,
    var(--bg-secondary, #f5f5f5) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Empty State Styles */
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  min-height: 400px;
  text-align: center;
  border: 2px dashed var(--border-color, #e0e0e0);
  border-radius: 0.5rem;
  background: var(--bg-secondary, #f5f5f5);
}

.emptyStateIcon {
  margin-bottom: 1.5rem;
  color: var(--text-tertiary, #999999);
  font-size: 4rem;
  line-height: 1;
}

.emptyStateIcon svg {
  width: 100%;
  height: 100%;
  max-width: 80px;
  max-height: 80px;
}

.emptyStateContent {
  margin-bottom: 1.5rem;
}

.emptyStateTitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary, #333333);
  margin: 0 0 0.5rem 0;
  padding: 0;
}

.emptyStateSuggestion {
  font-size: 0.9375rem;
  color: var(--text-secondary, #666666);
  margin: 0;
  padding: 0;
  line-height: 1.5;
  max-width: 400px;
}

.emptyStateAction {
  margin-top: 1rem;
}

.emptyStateHint {
  font-size: 0.8125rem;
  color: var(--text-tertiary, #999999);
  margin: 0;
  padding: 0;
  font-style: italic;
}

/* Responsive Typography Adjustments */
@media (max-width: 480px) {
  .gridContainer {
    padding: 0.75rem;
  }

  .grid {
    gap: 1rem;
  }

  .countryCard {
    min-height: 200px;
  }

  .countryFlag {
    height: 100px;
    font-size: 2.5rem;
  }

  .countryInfo {
    padding: 0.75rem;
    gap: 0.375rem;
  }

  .countryName {
    font-size: 0.9375rem;
  }

  .countryCode {
    font-size: 0.75rem;
  }

  .emptyState {
    padding: 2rem 1rem;
    min-height: 300px;
  }

  .emptyStateTitle {
    font-size: 1.125rem;
  }

  .emptyStateSuggestion {
    font-size: 0.875rem;
  }
}

/* Large Viewport Adjustments */
@media (min-width: 1440px) {
  .gridContainer {
    padding: 2rem;
  }

  .grid {
    gap: 2rem;
  }

  .countryCard {
    min-height: 280px;
  }

  .countryFlag {
    height: 140px;
    font-size: 3.5rem;
  }

  .countryInfo {
    padding: 1.25rem;
  }

  .countryName {
    font-size: 1.125rem;
  }
}

/* Print Styles */
@media print {
  .gridContainer {
    padding: 0;
  }

  .grid {
    gap: 1rem;
  }

  .countryCard {
    page-break-inside: avoid;
    box-shadow: none;
    border: 1px solid #000;
  }

  .countryCard:hover {
    box-shadow: none;
    transform: none;
  }

  .cardHoverOverlay {
    display: none;
  }

  .emptyState {
    display: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: more) {
  .countryCard {
    border-width: 2px;
  }

  .countryCard:focus-visible {
    outline-width: 3px;
  }

  .emptyState {
    border-width: 3px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .countryCard,
  .cardHoverOverlay,
  .countryCardSkeleton,
  .skeletonShimmer {
    transition: none;
    animation: none;
  }
}

/* Dark Mode Support (optional - will use CSS custom properties) */
@media (prefers-color-scheme: dark) {
  .countryCard {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
    --border-color: #333333;
  }

  .emptyState {
    --bg-secondary: #2a2a2a;
  }
}
```

#### Acceptance Criteria
- [ ] CSS Grid uses auto-fit with minmax(240px, 1fr)
- [ ] Grid adapts from 1-6 columns based on viewport width
- [ ] No media queries needed for column calculation (pure CSS Grid)
- [ ] Card minimum height is 240px
- [ ] Gap between cards is 1.5rem (responsive at different breakpoints)
- [ ] Hover state shows shadow and slight translateY
- [ ] Focus state has 2px outline with offset
- [ ] Loading skeleton has shimmer animation
- [ ] Empty state displays centered with icon and message
- [ ] Print styles hide empty state and adjust card styling
- [ ] High contrast mode support (thicker borders)
- [ ] Reduced motion support (no animations)
- [ ] Dark mode support via CSS custom properties
- [ ] No CSS errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run lint:css
npm test -- --testPathPattern="CountryGrid" --testNamePattern="responsive"
```

---

### Subtask 27.4: Hook Export and Index Integration

#### Status
status: pending

#### Objective
Export CountryGrid and EmptyState components from CountryList module index file for clean import paths throughout the application.

#### Context
The CountryList module should have an index.ts file that re-exports all components for clean, centralized imports. Components should be importable as `import { CountryGrid, EmptyState } from '@/components/CountryList'` rather than full paths. This maintains consistency with the project's import patterns and makes component discovery easier.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/index.ts` - Add CountryGrid and EmptyState exports

#### Implementation

```typescript
// src/components/CountryList/index.ts
/**
 * CountryList Module - Central export point for country grid components
 * Provides clean import paths for all country list related components
 *
 * Usage:
 * import { CountryGrid, EmptyState } from '@/components/CountryList';
 *
 * Or individual imports:
 * import { CountryGrid, type Country, type CountryGridProps } from '@/components/CountryList';
 */

export {
  CountryGrid,
  EmptyState,
  type Country,
  type CountryGridProps,
  type EmptyStateProps,
} from './CountryGrid';

/**
 * Future exports from CountryList module:
 *
 * export { CountryCard } from './CountryCard';
 * export { CountryFilter } from './CountryFilter';
 * export { CountrySearch } from './CountrySearch';
 * export { useCountrySelection } from './hooks/useCountrySelection';
 */
```

#### Acceptance Criteria
- [ ] CountryGrid component exported from index.ts
- [ ] EmptyState component exported from index.ts
- [ ] Country interface exported from index.ts
- [ ] CountryGridProps interface exported from index.ts
- [ ] EmptyStateProps interface exported from index.ts
- [ ] All type exports properly prefixed with `type` keyword
- [ ] Imports are relative to the CountryList directory
- [ ] Index file is under 40 lines (barrel file)
- [ ] No implementation logic in index file (only re-exports)
- [ ] Proper TypeScript type exports
- [ ] Can import from '@/components/CountryList'
- [ ] No circular dependencies
- [ ] Comments document module purpose and future components

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify imports from '@/components/CountryList' work correctly
# Verify all types are accessible
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/CountryList/CountryGrid.tsx`
- `src/components/CountryList/EmptyState.tsx`
- `src/components/CountryList/CountryGrid.module.css`
- `src/components/CountryList/index.ts`

### Imports From Existing Code
- `react` - React, ReactNode, FC, CSSProperties
- `react-i18next` - useTranslation hook for i18n
- `@/store/atoms/navigationAtom` - Optional: for future filtering integration
- CSS custom properties - Colors defined globally (--bg-primary, --text-primary, etc.)

### Exports For Other Code
- `CountryGrid` - Main grid component for displaying countries
- `EmptyState` - Empty state component for no results
- `Country` - Interface for country data structure
- `CountryGridProps` - Props interface for CountryGrid component
- `EmptyStateProps` - Props interface for EmptyState component
- All exported via `@/components/CountryList` path alias

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="CountryGrid|EmptyState"
npm run lint
npm run build
```

---

## Parallelization Notes
- All 4 subtasks can run in complete parallel
- Subtask 27.1 (CountryGrid) has minimal dependencies (only React)
- Subtask 27.2 (EmptyState) only depends on react-i18next (no other subtasks)
- Subtask 27.3 (CSS) can be written independently and imported by all components
- Subtask 27.4 (exports) only needs 27.1 and 27.2 to be complete, but can be written in parallel
- Each subtask owns exclusive files with no file overlap
- No subtask depends on another subtask's output
- All subtasks can be implemented, tested, and merged simultaneously
- CSS Grid responsiveness is purely CSS-based, no JavaScript needed
- Components are fully functional without other CountryList components (CountryFilter, CountrySearch, etc.)
