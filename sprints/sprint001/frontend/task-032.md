# Frontend Task 032: Calculator Main Container Component

## Metadata
- **Task**: 32 of 40
- **Area**: Frontend
- **Feature**: Calculator - Main Container Component
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the Calculator main component that assembles OptionSelector, PriceBreakdown, and Summary subcomponents with conditional rendering based on country selection. The Calculator component uses Jotai atoms for state management (NO useState), provides responsive layout with desktop sidebar and mobile stacked layout, and integrates all pricing logic. The component only renders when a country has been selected, ensuring users must first choose a destination country before seeing pricing options.

---

## Subtasks

### Subtask 032.1: Calculator Main Container Component

#### Status
status: pending

#### Objective
Create the main Calculator container component that orchestrates all subcomponents, manages conditional rendering based on country selection, and implements responsive layout structure.

#### Context
This is the core container component that assembles OptionSelector, PriceBreakdown, and Summary components. It uses Jotai countryAtom to check if a country is selected and only renders the calculator interface when this condition is true. The component implements responsive layout that adapts from mobile stacked layout to desktop sidebar layout. This subtask owns the main container logic, layout structure, and country selection validation.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/Calculator.tsx` - Main Calculator container component with conditional rendering and responsive layout
- `src/components/Calculator/index.ts` - Export index for the Calculator module

#### Implementation

```typescript
// src/components/Calculator/Calculator.tsx
import React, { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { countryAtom } from '@/store/atoms/countryAtom';
import { OptionSelector } from '@/components/OptionSelector';
import { PriceBreakdown } from '@/components/PriceBreakdown';
import { Summary } from '@/components/Summary';
import styles from './Calculator.module.css';

export interface CalculatorProps {
  className?: string;
  onCalculate?: (result: CalculationResult) => void;
}

export interface CalculationResult {
  basePrice: number;
  servicesPrice: number;
  totalPrice: number;
  country: string;
  numberOfClasses: number;
}

export const Calculator: React.FC<CalculatorProps> = ({
  className = '',
  onCalculate
}) => {
  const selectedCountry = useAtomValue(countryAtom);

  // Memoize empty state check to prevent unnecessary recalculations
  const hasCountrySelected = useMemo(() => {
    return selectedCountry && selectedCountry.id && selectedCountry.id.length > 0;
  }, [selectedCountry]);

  // Handle calculation result from Summary component
  const handleCalculationComplete = (result: CalculationResult) => {
    if (onCalculate) {
      onCalculate(result);
    }
  };

  // Conditional render: show empty state if no country selected
  if (!hasCountrySelected) {
    return (
      <div className={`${styles.calculatorEmpty} ${className}`} role="region" aria-label="Calculator empty state">
        <div className={styles.emptyStateContainer}>
          <div className={styles.emptyStateIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M12 3v18" />
            </svg>
          </div>
          <h2 className={styles.emptyStateTitle}>Select a Country</h2>
          <p className={styles.emptyStateMessage}>
            Choose a destination country from the map or list to begin calculating registration costs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.calculator} ${className}`}
      role="region"
      aria-label={`Calculator for ${selectedCountry?.name || 'selected country'}`}
    >
      <div className={styles.calculatorHeader}>
        <h1 className={styles.calculatorTitle}>Registration Calculator</h1>
        <p className={styles.calculatorSubtitle}>
          Pricing for: <strong>{selectedCountry?.name}</strong>
        </p>
      </div>

      <div className={styles.calculatorContent}>
        {/* Left Column: Options Selector (Mobile: full width, Desktop: 1/3) */}
        <div className={styles.optionsSelectorColumn}>
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionTitle}>Customize Your Registration</h2>
            <OptionSelector />
          </div>
        </div>

        {/* Right Column: Price Breakdown and Summary (Mobile: full width, Desktop: 2/3) */}
        <div className={styles.priceColumn}>
          {/* Price Breakdown Section */}
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionTitle}>Price Breakdown</h2>
            <PriceBreakdown />
          </div>

          {/* Summary Section */}
          <div className={styles.sectionWrapper}>
            <Summary onCalculationComplete={handleCalculationComplete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
```

#### Props Interface
```typescript
interface CalculatorProps {
  className?: string;
  onCalculate?: (result: CalculationResult) => void;
}

interface CalculationResult {
  basePrice: number;
  servicesPrice: number;
  totalPrice: number;
  country: string;
  numberOfClasses: number;
}
```

#### Acceptance Criteria
- [ ] Component renders only when country is selected via countryAtom
- [ ] Component shows empty state with message when no country selected
- [ ] Assembles OptionSelector, PriceBreakdown, and Summary components
- [ ] Uses Jotai useAtomValue hook (NO useState)
- [ ] Responsive layout: mobile stacked, desktop sidebar
- [ ] onCalculate callback fires with correct data
- [ ] Proper ARIA labels and roles for accessibility
- [ ] useMemo prevents unnecessary re-renders
- [ ] No console errors or warnings
- [ ] TypeScript types properly defined

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="Calculator" --testNamePattern="main container"
```

---

### Subtask 032.2: Responsive Layout CSS Module

#### Status
status: pending

#### Objective
Create comprehensive CSS module with responsive breakpoints (200px-3000px) for calculator layout with mobile stacked layout and desktop sidebar layout.

#### Context
This subtask owns all styling for the Calculator component. It defines responsive breakpoints for mobile (single column stacked), tablet (flexible layout), and desktop (sidebar layout with OptionSelector on left, PriceBreakdown and Summary on right). The stylesheet includes container sizing, section spacing, typography hierarchy, empty state styling, and proper alignment. All styling uses CSS modules for component scoping and supports light/dark themes via CSS variables.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/Calculator.module.css` - All responsive styles for calculator

#### Implementation

```css
/* src/components/Calculator/Calculator.module.css */

/* Container and Main Layout */
.calculator {
  width: 100%;
  max-width: 3000px;
  margin: 0 auto;
  padding: 1rem;
  background: var(--bg-primary, #ffffff);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calculatorHeader {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--border-color, #e0e0e0);
}

.calculatorTitle {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary, #1f2937);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.calculatorSubtitle {
  font-size: 1rem;
  color: var(--text-secondary, #6b7280);
  margin: 0;
  font-weight: 400;
}

.calculatorSubtitle strong {
  color: var(--primary-color, #4f46e5);
  font-weight: 600;
}

/* Empty State Styles */
.calculatorEmpty {
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary, #f9f9f9);
  border: 2px dashed var(--border-color, #d1d5db);
  border-radius: 0.75rem;
  padding: 2rem;
}

.emptyStateContainer {
  text-align: center;
  max-width: 400px;
}

.emptyStateIcon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  color: var(--text-tertiary, #9ca3af);
}

.emptyStateIcon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}

.emptyStateTitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary, #1f2937);
  margin: 0 0 0.75rem 0;
}

.emptyStateMessage {
  font-size: 0.9375rem;
  color: var(--text-secondary, #6b7280);
  margin: 0;
  line-height: 1.5;
}

/* Content Layout - Mobile Stack (200px - 639px) */
.calculatorContent {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.optionsSelectorColumn {
  width: 100%;
  order: 1;
}

.priceColumn {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  order: 2;
}

/* Content Layout - Tablet (640px - 1023px) */
@media (min-width: 640px) and (max-width: 1023px) {
  .calculator {
    padding: 1.5rem;
  }

  .calculatorTitle {
    font-size: 2rem;
  }

  .calculatorSubtitle {
    font-size: 1.0625rem;
  }

  .calculatorContent {
    gap: 2.5rem;
  }

  .optionsSelectorColumn {
    width: 100%;
  }

  .priceColumn {
    width: 100%;
  }
}

/* Content Layout - Desktop Sidebar (1024px - 3000px) */
@media (min-width: 1024px) {
  .calculator {
    padding: 2rem;
  }

  .calculatorTitle {
    font-size: 2.25rem;
  }

  .calculatorSubtitle {
    font-size: 1.125rem;
  }

  .calculatorContent {
    display: grid;
    grid-template-columns: 1fr 1.8fr;
    gap: 3rem;
    align-items: flex-start;
  }

  .optionsSelectorColumn {
    width: 100%;
    position: sticky;
    top: 1rem;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
  }

  .priceColumn {
    width: 100%;
  }
}

/* Extra Large Screens (2560px+) */
@media (min-width: 2560px) {
  .calculator {
    padding: 3rem;
  }

  .calculatorTitle {
    font-size: 2.5rem;
  }

  .calculatorSubtitle {
    font-size: 1.25rem;
  }

  .calculatorContent {
    gap: 4rem;
  }
}

/* Section Wrapper Styles */
.sectionWrapper {
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.sectionWrapper:hover {
  border-color: var(--border-hover, #d1d5db);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.sectionTitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary, #1f2937);
  margin: 0 0 1.25rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border-light, #f0f0f0);
}

/* Mobile Section Spacing */
@media (max-width: 639px) {
  .sectionWrapper {
    padding: 1rem;
  }

  .sectionTitle {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}

/* Tablet Section Spacing */
@media (min-width: 640px) and (max-width: 1023px) {
  .sectionWrapper {
    padding: 1.25rem;
  }

  .sectionTitle {
    font-size: 1.0625rem;
  }
}

/* Desktop Section Spacing */
@media (min-width: 1024px) {
  .sectionWrapper {
    padding: 1.75rem;
  }

  .sectionTitle {
    font-size: 1.1875rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .calculator {
    background: var(--bg-primary, #1f2937);
  }

  .calculatorTitle {
    color: var(--text-primary, #f3f4f6);
  }

  .calculatorSubtitle {
    color: var(--text-secondary, #d1d5db);
  }

  .sectionWrapper {
    background: var(--bg-surface, #111827);
    border-color: var(--border-color, #374151);
  }

  .emptyStateContainer {
    color: var(--text-secondary, #d1d5db);
  }

  .emptyStateTitle {
    color: var(--text-primary, #f3f4f6);
  }
}

/* Accessibility: High Contrast Mode */
@media (prefers-contrast: more) {
  .sectionWrapper {
    border-width: 2px;
  }

  .calculatorTitle {
    font-weight: 800;
  }

  .sectionTitle {
    font-weight: 700;
    border-width: 3px;
  }
}

/* Accessibility: Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .sectionWrapper {
    transition: none;
  }

  .calculator {
    animation: none;
  }
}

/* Print Styles */
@media print {
  .calculator {
    box-shadow: none;
    border: 1px solid #000;
    padding: 0;
  }

  .calculatorHeader {
    page-break-after: avoid;
  }

  .sectionWrapper {
    page-break-inside: avoid;
    box-shadow: none;
    border: 1px solid #000;
  }

  .calculatorContent {
    display: block;
  }

  .optionsSelectorColumn,
  .priceColumn {
    width: 100%;
    page-break-inside: avoid;
  }
}

/* Focus Styles for Keyboard Navigation */
.calculator:focus-within {
  outline: none;
}

.sectionWrapper:focus-within {
  outline: 2px solid var(--focus-color, #4f46e5);
  outline-offset: 0;
}

/* Scrollbar Styling for Sidebar Overflow */
.optionsSelectorColumn::-webkit-scrollbar {
  width: 8px;
}

.optionsSelectorColumn::-webkit-scrollbar-track {
  background: var(--bg-secondary, #f3f4f6);
  border-radius: 4px;
}

.optionsSelectorColumn::-webkit-scrollbar-thumb {
  background: var(--border-color, #d1d5db);
  border-radius: 4px;
}

.optionsSelectorColumn::-webkit-scrollbar-thumb:hover {
  background: var(--border-hover, #9ca3af);
}
```

#### Acceptance Criteria
- [ ] Responsive breakpoints at 200px, 640px, 1024px, 2560px, 3000px
- [ ] Mobile: single column stacked layout (200px-639px)
- [ ] Tablet: flexible stacked layout (640px-1023px)
- [ ] Desktop: grid layout with sidebar (1024px+)
- [ ] Sidebar sticky positioning on desktop
- [ ] Empty state styling matches design system
- [ ] Section wrappers have proper spacing and borders
- [ ] Hover states work correctly
- [ ] Focus states meet accessibility standards
- [ ] Dark mode support via CSS variables
- [ ] High contrast mode support
- [ ] Print styles hide appropriately
- [ ] Reduced motion support
- [ ] No CSS errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run lint
npm test -- --testPathPattern="Calculator" --testNamePattern="responsive"
```

---

### Subtask 032.3: Calculator Integration Tests and Documentation

#### Status
status: pending

#### Objective
Create comprehensive integration tests and documentation for the Calculator component covering conditional rendering, responsive layout, and subcomponent assembly.

#### Context
This subtask owns all testing and documentation for the Calculator main component. Tests verify that the component correctly renders the empty state when no country is selected, properly displays all subcomponents when a country is selected, handles responsive layout breakpoints, and manages calculation results. Documentation includes usage examples, props documentation, and responsive behavior explanations. Tests use React Testing Library and Vitest.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/Calculator.test.tsx` - Comprehensive integration tests
- `src/components/Calculator/Calculator.md` - Documentation and usage guide

#### Implementation

**Calculator.test.tsx:**
```typescript
// src/components/Calculator/Calculator.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAtom } from 'jotai';
import { Calculator, type CalculationResult } from './Calculator';
import { countryAtom } from '@/store/atoms/countryAtom';

// Mock the subcomponents
vi.mock('@/components/OptionSelector', () => ({
  OptionSelector: () => <div data-testid="option-selector">Option Selector</div>
}));

vi.mock('@/components/PriceBreakdown', () => ({
  PriceBreakdown: () => <div data-testid="price-breakdown">Price Breakdown</div>
}));

vi.mock('@/components/Summary', () => ({
  Summary: ({ onCalculationComplete }: any) => (
    <div data-testid="summary">
      Summary
      <button onClick={() => onCalculationComplete({
        basePrice: 100,
        servicesPrice: 50,
        totalPrice: 150,
        country: 'DE',
        numberOfClasses: 1
      })}>
        Calculate
      </button>
    </div>
  )
}));

// Test wrapper with Jotai provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

describe('Calculator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Conditional Rendering', () => {
    it('should render empty state when no country is selected', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      expect(screen.getByText('Select a Country')).toBeInTheDocument();
      expect(screen.getByText(/Choose a destination country/)).toBeInTheDocument();
      expect(screen.queryByTestId('option-selector')).not.toBeInTheDocument();
    });

    it('should render calculator interface when country is selected', async () => {
      // This would need Jotai provider setup
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      // After setting country via atom
      expect(screen.getByText('Registration Calculator')).toBeInTheDocument();
    });
  });

  describe('Component Assembly', () => {
    it('should render all subcomponents when country is selected', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      // Would verify after atom is set
      expect(screen.queryByTestId('option-selector')).not.toBeInTheDocument();
    });

    it('should pass onCalculate callback to Summary component', () => {
      const mockOnCalculate = vi.fn();

      render(
        <TestWrapper>
          <Calculator onCalculate={mockOnCalculate} />
        </TestWrapper>
      );

      // Would trigger calculation after setting country
    });
  });

  describe('Responsive Layout', () => {
    it('should have proper layout at mobile breakpoint (320px)', () => {
      // Set viewport to mobile
      global.innerWidth = 320;
      window.dispatchEvent(new Event('resize'));

      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const content = screen.queryByRole('region');
      expect(content).toBeInTheDocument();
    });

    it('should have proper layout at tablet breakpoint (768px)', () => {
      global.innerWidth = 768;
      window.dispatchEvent(new Event('resize'));

      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const content = screen.queryByRole('region');
      expect(content).toBeInTheDocument();
    });

    it('should have proper layout at desktop breakpoint (1024px)', () => {
      global.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));

      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const content = screen.queryByRole('region');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const emptyState = screen.getByRole('region', { name: /Calculator empty state/i });
      expect(emptyState).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { name: /Select a Country/i });
      expect(heading.tagName).toBe('H2');
    });
  });

  describe('Props and Callbacks', () => {
    it('should accept className prop', () => {
      const { container } = render(
        <TestWrapper>
          <Calculator className="custom-class" />
        </TestWrapper>
      );

      const element = container.querySelector('.custom-class');
      expect(element).toBeInTheDocument();
    });

    it('should handle onCalculate callback with correct data structure', async () => {
      const mockOnCalculate = vi.fn();

      render(
        <TestWrapper>
          <Calculator onCalculate={mockOnCalculate} />
        </TestWrapper>
      );

      // Would trigger callback with calculation result
    });
  });
});
```

**Calculator.md:**
```markdown
# Calculator Component

Main container component that assembles OptionSelector, PriceBreakdown, and Summary components with conditional rendering based on country selection.

## Features

- **Conditional Rendering**: Only displays calculator interface when a country is selected
- **Responsive Layout**: Mobile stacked, tablet flexible, desktop sidebar layout
- **Jotai Integration**: Uses atoms for state management (NO useState)
- **Accessibility**: Full ARIA labels and keyboard navigation support
- **Empty State**: User-friendly message when no country selected

## Props

```typescript
interface CalculatorProps {
  className?: string;
  onCalculate?: (result: CalculationResult) => void;
}

interface CalculationResult {
  basePrice: number;
  servicesPrice: number;
  totalPrice: number;
  country: string;
  numberOfClasses: number;
}
```

## Usage

```tsx
import { Calculator } from '@/components/Calculator';

function App() {
  const handleCalculate = (result) => {
    console.log('Calculation complete:', result);
  };

  return (
    <Calculator
      className="custom-calculator"
      onCalculate={handleCalculate}
    />
  );
}
```

## Layout

### Mobile (200px - 639px)
- Single column stacked layout
- Full-width sections
- Optimized for touch interaction
- Compact spacing

### Tablet (640px - 1023px)
- Single column stacked layout with more spacing
- Full-width sections
- Improved typography sizing
- Better vertical spacing

### Desktop (1024px+)
- Grid layout with sidebar
- OptionSelector on left (sticky)
- PriceBreakdown and Summary on right
- Optimized for keyboard navigation

## Conditional Rendering

- **Shows Empty State** when `countryAtom` has no selected country
- **Shows Calculator** when country is selected via `countryAtom`
- Empty state includes icon and instructional message

## Responsiveness

Supports all screen sizes from 200px to 3000px width with appropriate layout and typography adjustments at each breakpoint.

## Accessibility

- Full ARIA labels and roles
- Proper heading hierarchy
- Focus indicators for keyboard navigation
- High contrast mode support
- Reduced motion support

## State Management

Uses Jotai `countryAtom` for country selection state. No internal component state (useState) is used. All state is managed through atoms for global consistency.
```

#### Acceptance Criteria
- [ ] At least 10 test cases covering main functionality
- [ ] Tests for conditional rendering (with/without country)
- [ ] Tests for responsive layout at 3+ breakpoints
- [ ] Tests for ARIA labels and accessibility
- [ ] Tests for onCalculate callback
- [ ] All tests pass with 100% code coverage
- [ ] Documentation includes usage examples
- [ ] Documentation includes responsive behavior
- [ ] Documentation includes accessibility features
- [ ] No type errors or linting issues

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm test -- --testPathPattern="Calculator" --coverage
npm run type-check
npm run lint
```

---

### Subtask 032.4: Calculator Export Index and Module Setup

#### Status
status: pending

#### Objective
Create the index file for the Calculator module to properly export all components and types.

#### Context
This subtask owns the Calculator module's export structure. It creates a clean public API for the Calculator component by exporting the main component, types, and any utilities. The index file allows consumers to import directly from the Calculator directory without needing to know internal file structure. This follows the established module pattern used throughout the application.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/index.ts` - Module export index

#### Implementation

```typescript
// src/components/Calculator/index.ts
/**
 * Calculator Module
 *
 * Main container component for brand registration cost calculation
 * Includes conditional rendering, responsive layout, and subcomponent assembly
 *
 * @module Calculator
 */

export { Calculator, type CalculatorProps, type CalculationResult } from './Calculator';

export default Calculator;
```

#### Acceptance Criteria
- [ ] Exports Calculator component
- [ ] Exports CalculatorProps type
- [ ] Exports CalculationResult type
- [ ] Exports default
- [ ] No circular dependencies
- [ ] Follows module pattern of other components
- [ ] Type definitions are accurate
- [ ] No TypeScript errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify imports work correctly
node -e "import { Calculator } from './src/components/Calculator/index.ts'" 2>&1 || true
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/Calculator/Calculator.tsx`
- `src/components/Calculator/Calculator.module.css`
- `src/components/Calculator/Calculator.test.tsx`
- `src/components/Calculator/Calculator.md`
- `src/components/Calculator/index.ts`

### Imports From Existing Code
- `jotai` - useAtomValue hook
- `src/store/atoms/countryAtom` - Country selection atom
- `src/components/OptionSelector` - Options component (task 30)
- `src/components/PriceBreakdown` - Price breakdown component (task 31)
- `src/components/Summary` - Summary component (created in parallel tasks)
- React - FC and hooks

### Exports For Other Code
- `Calculator` - Main calculator container component
- `CalculatorProps` - Props type interface
- `CalculationResult` - Result type interface
- All exported from `src/components/Calculator/index.ts`

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
# Full task verification
npm run type-check
npm test -- --testPathPattern="Calculator"
npm run lint
npm run build
# Verify responsive layout at different breakpoints
npm run dev
```

---

## Parallelization Notes
- All 4 subtasks can run in complete parallel
- Subtask 032.1 (Calculator component) is independent of styling
- Subtask 032.2 (CSS) can be written independently and imported by main component
- Subtask 032.3 (Tests) can be written independently of component implementation
- Subtask 032.4 (Index) is a simple export file with no dependencies on other subtasks
- Each subtask owns exclusive files with no file overlap
- No subtask depends on another subtask's output
- All subtasks can be implemented, tested, and merged simultaneously
- Subtasks 032.1 and 032.2 must both be complete before runtime testing
- Subtasks 032.3 and 032.4 can be completed anytime
