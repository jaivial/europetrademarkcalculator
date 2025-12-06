# Frontend Task 028: Country List Main Container Component

## Metadata
- **Task**: 28 of 40
- **Area**: Frontend
- **Feature**: Country List Container & Assembly
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the CountryList main container component that assembles SearchBar and CountryGrid sub-components into a responsive, functional list view. This container manages country selection state using Jotai hooks (NO useState), implements responsive layout from 200px to 3000px width, and provides the complete user interface for browsing and selecting countries. All styling is responsive with CSS modules supporting mobile, tablet, and desktop layouts.

---

## Subtasks

### Subtask 28.1: CountryList Main Container Component

#### Status
status: pending

#### Objective
Create the main CountryList container component that orchestrates SearchBar and CountryGrid with Jotai state management.

#### Context
This subtask owns the core container logic that brings together the SearchBar and CountryGrid components. It uses Jotai hooks to manage country selection state without any local useState hooks. The component consumes existing atoms for selected countries and search filters, renders the two sub-components, and provides responsive layout structure. This is the assembly point for the country list feature.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryList.tsx` - Main CountryList container component
- `src/components/CountryList/index.ts` - Export index for CountryList module

#### Implementation

```typescript
// src/components/CountryList/CountryList.tsx
import React from 'react';
import { useAtomValue } from 'jotai';
import { selectedCountriesAtom } from '@/store/atoms/countriesAtom';
import { searchQueryAtom } from '@/store/atoms/searchAtom';
import SearchBar from '@/components/SearchBar';
import CountryGrid from '@/components/CountryGrid';
import styles from './CountryList.module.css';

export interface CountryListProps {
  className?: string;
  onCountrySelect?: (countryCode: string, countryName: string) => void;
  onSearchChange?: (query: string) => void;
  maxSelections?: number;
}

export const CountryList: React.FC<CountryListProps> = ({
  className = '',
  onCountrySelect,
  onSearchChange,
  maxSelections
}) => {
  const selectedCountries = useAtomValue(selectedCountriesAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

  const handleCountrySelect = (countryCode: string, countryName: string) => {
    if (onCountrySelect) {
      onCountrySelect(countryCode, countryName);
    }
  };

  const handleSearchChange = (query: string) => {
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const selectedCount = selectedCountries?.length || 0;
  const canSelectMore = !maxSelections || selectedCount < maxSelections;

  return (
    <div
      className={`${styles.countryListContainer} ${className}`}
      role="region"
      aria-label="Country Selection List"
    >
      <div className={styles.countryListHeader}>
        <h2 className={styles.countryListTitle}>Select Countries</h2>
        {maxSelections && (
          <div
            className={styles.countryListCounter}
            aria-live="polite"
            aria-label={`Selected ${selectedCount} of ${maxSelections} countries`}
          >
            <span className={styles.counterLabel}>
              {selectedCount} / {maxSelections} selected
            </span>
          </div>
        )}
      </div>

      <div className={styles.countryListSearchSection}>
        <SearchBar
          placeholder="Search countries by name or code..."
          value={searchQuery || ''}
          onChange={handleSearchChange}
          aria-label="Search countries"
        />
      </div>

      <div className={styles.countryListContent}>
        <CountryGrid
          onCountrySelect={handleCountrySelect}
          selectedCountries={selectedCountries || []}
          disableSelection={!canSelectMore}
          searchQuery={searchQuery || ''}
        />
      </div>

      {selectedCount > 0 && (
        <div className={styles.countryListFooter}>
          <div
            className={styles.selectedCountriesInfo}
            aria-live="polite"
            role="status"
          >
            <span className={styles.selectedCountriesLabel}>
              {selectedCount} countr{selectedCount === 1 ? 'y' : 'ies'} selected
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryList;
```

#### Props Interface
```typescript
interface CountryListProps {
  className?: string;
  onCountrySelect?: (countryCode: string, countryName: string) => void;
  onSearchChange?: (query: string) => void;
  maxSelections?: number;
}
```

#### Acceptance Criteria
- [ ] Component renders SearchBar and CountryGrid children
- [ ] Uses Jotai useAtomValue for read-only state access (NO useState)
- [ ] Proper ARIA labels and roles for accessibility
- [ ] Responsive container layout (200px-3000px)
- [ ] Callbacks fire correctly for selection and search
- [ ] Selection counter displays when maxSelections is provided
- [ ] Footer shows selected countries count
- [ ] No console errors or warnings
- [ ] TypeScript types properly defined

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="CountryList" --testNamePattern="renders container"
```

---

### Subtask 28.2: Responsive CSS Module Styling

#### Status
status: pending

#### Objective
Create comprehensive CSS module with responsive breakpoints (200px-3000px) for CountryList container with mobile, tablet, and desktop layouts.

#### Context
This subtask owns all styling for the CountryList component. It defines responsive layouts that adapt from mobile stacked view to desktop multi-column view. The stylesheet includes styles for the main container, header section, search section, content grid area, footer status, and selection counter. All styling uses CSS modules for component scoping and supports accessibility features like focus states and reduced motion preferences.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryList.module.css` - All responsive styles for CountryList

#### Implementation

```css
/* src/components/CountryList/CountryList.module.css */

/* Main Container */
.countryListContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary, #ffffff);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
}

/* Header Section */
.countryListHeader {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  background: var(--bg-secondary, #f9fafb);
}

.countryListTitle {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary, #111827);
  line-height: 1.5;
}

.countryListCounter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.counterLabel {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  font-weight: 500;
}

/* Search Section */
.countryListSearchSection {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  background: var(--bg-primary, #ffffff);
}

/* Content Area */
.countryListContent {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Footer Section */
.countryListFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border-color, #e5e7eb);
  background: var(--bg-secondary, #f9fafb);
  font-size: 0.875rem;
}

.selectedCountriesInfo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.selectedCountriesLabel {
  color: var(--text-secondary, #6b7280);
  font-weight: 500;
}

/* Mobile Layout (200px - 639px) */
@media (max-width: 639px) {
  .countryListContainer {
    border-radius: 0;
    box-shadow: none;
    height: auto;
  }

  .countryListHeader {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .countryListTitle {
    font-size: 1rem;
  }

  .counterLabel {
    font-size: 0.8125rem;
  }

  .countryListSearchSection {
    padding: 0.75rem;
  }

  .countryListContent {
    padding: 0.75rem;
    max-height: 50vh;
  }

  .countryListFooter {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
  }
}

/* Tablet Layout (640px - 1023px) */
@media (min-width: 640px) and (max-width: 1023px) {
  .countryListContainer {
    border-radius: 0.375rem;
    box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
  }

  .countryListHeader {
    padding: 1rem;
    gap: 0.75rem;
  }

  .countryListTitle {
    font-size: 1.125rem;
  }

  .countryListSearchSection {
    padding: 1rem;
  }

  .countryListContent {
    padding: 1rem;
    max-height: 60vh;
  }

  .countryListFooter {
    padding: 0.75rem 1rem;
  }
}

/* Desktop Layout (1024px - 3000px) */
@media (min-width: 1024px) {
  .countryListContainer {
    border-radius: 0.5rem;
    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    max-width: 1200px;
  }

  .countryListHeader {
    padding: 1.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .countryListTitle {
    font-size: 1.25rem;
    margin: 0;
  }

  .counterLabel {
    font-size: 0.9375rem;
  }

  .countryListSearchSection {
    padding: 1.5rem;
    max-width: 400px;
  }

  .countryListContent {
    padding: 1.5rem;
    max-height: 70vh;
  }

  .countryListFooter {
    padding: 1rem 1.5rem;
    font-size: 0.9375rem;
  }
}

/* Scrollbar Styling */
.countryListContent::-webkit-scrollbar {
  width: 0.5rem;
}

.countryListContent::-webkit-scrollbar-track {
  background: transparent;
}

.countryListContent::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb, #d1d5db);
  border-radius: 0.25rem;
}

.countryListContent::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover, #9ca3af);
}

/* Focus Visible States */
.countryListSearchSection:focus-visible {
  outline: 2px solid var(--focus-color, #4f46e5);
  outline-offset: -2px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: more) {
  .countryListContainer {
    border: 2px solid var(--border-color, #000000);
  }

  .countryListHeader,
  .countryListFooter {
    border-width: 2px;
  }

  .countryListTitle {
    font-weight: 700;
  }

  .counterLabel,
  .selectedCountriesLabel {
    font-weight: 600;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .countryListContainer {
    scroll-behavior: auto;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .countryListContainer {
    background: var(--bg-primary-dark, #1f2937);
  }

  .countryListHeader,
  .countryListFooter {
    background: var(--bg-secondary-dark, #111827);
    border-color: var(--border-color-dark, #374151);
  }

  .countryListTitle {
    color: var(--text-primary-dark, #f3f4f6);
  }

  .counterLabel,
  .selectedCountriesLabel {
    color: var(--text-secondary-dark, #9ca3af);
  }

  .countryListContent {
    background: var(--bg-primary-dark, #1f2937);
  }

  .countryListContent::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-dark, #4b5563);
  }

  .countryListContent::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover-dark, #6b7280);
  }
}

/* Print Styles */
@media print {
  .countryListContainer {
    box-shadow: none;
    border: 1px solid #000;
  }

  .countryListHeader,
  .countryListSearchSection,
  .countryListFooter {
    display: none;
  }

  .countryListContent {
    max-height: none;
    padding: 0;
  }
}
```

#### Acceptance Criteria
- [ ] Responsive breakpoints at 200px, 640px, 1024px, 3000px
- [ ] Mobile: single column, compact spacing
- [ ] Tablet: moderate spacing, adjusted sizing
- [ ] Desktop: full layout with proper alignment and max-width
- [ ] Scrollbar styling customized per platform
- [ ] Focus states meet accessibility standards
- [ ] High contrast mode support
- [ ] Reduced motion preference respected
- [ ] Dark mode support integrated
- [ ] Print styles appropriate
- [ ] No CSS errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run lint
npm test -- --testPathPattern="CountryList" --testNamePattern="responsive"
```

---

### Subtask 28.3: CountryList Integration Test & Documentation

#### Status
status: pending

#### Objective
Create comprehensive tests and documentation for CountryList integration and responsive behavior across breakpoints.

#### Context
This subtask owns the test suite that validates CountryList component functionality, integration with SearchBar and CountryGrid, Jotai state management, responsive layout behavior, and accessibility features. Tests verify that the container properly manages selection state, search queries, and responsive behavior across all viewport sizes. Documentation provides usage examples and API reference.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryList.test.tsx` - Comprehensive test suite

#### Implementation

```typescript
// src/components/CountryList/CountryList.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import CountryList from './CountryList';
import { selectedCountriesAtom, searchQueryAtom } from '@/store/atoms';

// Mock child components
jest.mock('@/components/SearchBar', () => ({
  __esModule: true,
  default: ({ onChange, value, placeholder }: any) => (
    <input
      data-testid="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));

jest.mock('@/components/CountryGrid', () => ({
  __esModule: true,
  default: ({ onCountrySelect, selectedCountries }: any) => (
    <div data-testid="country-grid">
      <button
        data-testid="select-country-btn"
        onClick={() => onCountrySelect('US', 'United States')}
      >
        Select Country
      </button>
      <div data-testid="selected-count">{selectedCountries.length}</div>
    </div>
  ),
}));

describe('CountryList Component', () => {
  const renderWithJotai = (component: React.ReactElement) => {
    return render(<Provider>{component}</Provider>);
  };

  describe('Rendering', () => {
    it('should render the container with correct structure', () => {
      renderWithJotai(<CountryList />);

      const container = screen.getByRole('region', {
        name: /country selection list/i,
      });
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Select Countries')).toBeInTheDocument();
    });

    it('should render SearchBar component', () => {
      renderWithJotai(<CountryList />);

      const searchBar = screen.getByTestId('search-bar');
      expect(searchBar).toBeInTheDocument();
      expect(searchBar).toHaveAttribute(
        'placeholder',
        'Search countries by name or code...'
      );
    });

    it('should render CountryGrid component', () => {
      renderWithJotai(<CountryList />);

      const countryGrid = screen.getByTestId('country-grid');
      expect(countryGrid).toBeInTheDocument();
    });
  });

  describe('State Management (Jotai)', () => {
    it('should display selected countries counter when provided', () => {
      const { rerender } = renderWithJotai(
        <CountryList maxSelections={5} />
      );

      expect(screen.getByText('0 / 5 selected')).toBeInTheDocument();
    });

    it('should use Jotai atoms without useState', () => {
      // This is verified by checking that no useState calls are present
      // and that the component uses useAtomValue
      const { container } = renderWithJotai(<CountryList />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onCountrySelect when country is selected', async () => {
      const mockOnSelect = jest.fn();
      renderWithJotai(
        <CountryList onCountrySelect={mockOnSelect} />
      );

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        expect(mockOnSelect).toHaveBeenCalledWith('US', 'United States');
      });
    });

    it('should call onSearchChange when search input changes', async () => {
      const mockOnSearch = jest.fn();
      const user = userEvent.setup();

      renderWithJotai(
        <CountryList onSearchChange={mockOnSearch} />
      );

      const searchBar = screen.getByTestId('search-bar');
      await user.type(searchBar, 'france');

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('france');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithJotai(<CountryList />);

      const region = screen.getByRole('region', {
        name: /country selection list/i,
      });
      expect(region).toBeInTheDocument();
    });

    it('should display selection counter with aria-live', () => {
      renderWithJotai(<CountryList maxSelections={10} />);

      const counter = screen.getByText('0 / 10 selected');
      expect(counter.parentElement).toHaveAttribute('aria-live', 'polite');
    });

    it('should have status role for selected countries info', async () => {
      renderWithJotai(<CountryList />);

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should have responsive CSS module classes', () => {
      const { container } = renderWithJotai(<CountryList />);

      const element = container.querySelector('[class*="countryListContainer"]');
      expect(element).toBeInTheDocument();
    });

    it('should apply custom className prop', () => {
      const { container } = renderWithJotai(
        <CountryList className="custom-class" />
      );

      const element = container.firstChild;
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Selection Limits', () => {
    it('should disable selection when max selections reached', () => {
      const { rerender } = renderWithJotai(
        <CountryList maxSelections={1} />
      );

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      // Verify selection is disabled by checking if CountryGrid
      // receives disableSelection prop when limit is reached
      expect(screen.getByTestId('country-grid')).toBeInTheDocument();
    });
  });

  describe('Footer Display', () => {
    it('should show footer only when countries are selected', async () => {
      renderWithJotai(<CountryList />);

      // Initially footer should not show
      expect(
        screen.queryByText(/countr.*selected/)
      ).not.toBeInTheDocument();

      // After selection, footer shows
      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        expect(screen.getByText(/1 countr.*selected/)).toBeInTheDocument();
      });
    });

    it('should pluralize country/countries correctly', async () => {
      renderWithJotai(<CountryList />);

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        expect(screen.getByText('1 country selected')).toBeInTheDocument();
      });
    });
  });

  describe('CSS Module Integration', () => {
    it('should have all required CSS classes available', () => {
      // This verifies that CountryList.module.css is properly imported
      // and all style classes are applied to elements
      const { container } = renderWithJotai(<CountryList />);

      expect(container.querySelector('[class*="countryListContainer"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="countryListHeader"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="countryListSearchSection"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="countryListContent"]')).toBeInTheDocument();
    });
  });
});
```

#### Acceptance Criteria
- [ ] All component rendering scenarios tested
- [ ] Jotai integration verified (useAtomValue usage)
- [ ] Callbacks fire correctly with proper parameters
- [ ] ARIA labels and roles are correct
- [ ] Live regions properly configured
- [ ] Responsive CSS classes applied correctly
- [ ] Selection limit logic works properly
- [ ] Footer display logic works correctly
- [ ] Pluralization logic tested
- [ ] Test coverage above 80%
- [ ] All tests pass successfully

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="CountryList" --coverage
npm run build
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/CountryList/CountryList.tsx`
- `src/components/CountryList/CountryList.module.css`
- `src/components/CountryList/CountryList.test.tsx`
- `src/components/CountryList/index.ts`

### Imports From Existing Code
- `jotai` - useAtomValue hook
- `src/store/atoms/countriesAtom` - selectedCountriesAtom
- `src/store/atoms/searchAtom` - searchQueryAtom
- `src/components/SearchBar` - Search input component (Task 26)
- `src/components/CountryGrid` - Country display grid (Task 27)
- React - FC and React.ReactNode types

### Exports For Other Code
- `CountryList` - Main container component
- Exported from `src/components/CountryList/index.ts`
- Consumed by page layouts and feature modules

---

## Task-Level Verification

```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Type checking
npm run type-check

# Run all CountryList tests
npm test -- --testPathPattern="CountryList"

# Linting
npm run lint

# Build verification
npm run build

# Responsive layout check (requires browser preview)
npm run dev
# Navigate to country list view and test responsiveness at:
# - 200px width (mobile)
# - 640px width (tablet)
# - 1024px width (desktop)
# - 3000px width (ultra-wide)
```

---

## Parallelization Notes
- All 3 subtasks in this task can run in complete parallel
- Subtask 28.1 (Container) is standalone and only depends on existing atoms
- Subtask 28.2 (CSS) is independent and can be written anytime
- Subtask 28.3 (Tests) only depends on existing mocks and can be written independently
- Each subtask owns exclusive files with no file overlap
- No subtask depends on another subtask's output
- SearchBar (Task 26) and CountryGrid (Task 27) must exist before this task runs
- All subtasks can be implemented, tested, and merged simultaneously
