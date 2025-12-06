# Frontend Task 25: Country List - Search Bar Component

## Metadata
- **Task**: 25 of 40
- **Area**: Frontend
- **Feature**: Country List - Search Bar Component
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a SearchBar component for the Country List feature that enables users to search and filter countries. The component uses Jotai atoms for state management, implements debounced search input, provides responsive sizing, and includes i18n support for placeholder text. This task focuses on building a reusable, performant search component that integrates with the country selection workflow.

---

## Subtasks

### Subtask 25.1: SearchBar Component Core Implementation

#### Status
status: pending

#### Objective
Create the SearchBar component with input field, clear button, and Jotai atom integration for search query state management.

#### Context
The SearchBar component is the primary interface for filtering countries. It needs to manage search state via Jotai's countryAtom to avoid internal state management and allow global state sharing. The component must support clearing the search query and maintain focus management.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/SearchBar.tsx` - Main SearchBar component implementation
- `src/components/CountryList/SearchBar.module.css` - Styling for SearchBar component

#### Implementation

```typescript
'use client';

import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { countryAtom } from '@/store/atoms/countryAtom';
import styles from './SearchBar.module.css';
import { useTranslation } from '@/i18n';

interface SearchBarProps {
  /**
   * Optional CSS class name for custom styling
   */
  className?: string;
  /**
   * Optional placeholder override (if not using i18n)
   */
  placeholder?: string;
  /**
   * Callback when search value changes (after debounce)
   */
  onSearchChange?: (query: string) => void;
  /**
   * Debounce delay in milliseconds (default: 300ms)
   */
  debounceDelay?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  placeholder: placeholderProp,
  onSearchChange,
  debounceDelay = 300,
}) => {
  const [searchQuery, setSearchQuery] = useAtom(countryAtom);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Get i18n placeholder if not provided
  const placeholder = placeholderProp || t('countryList.searchPlaceholder', 'Search countries...');

  /**
   * Handle input change with debouncing
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set debounce timer for search update
    debounceTimerRef.current = setTimeout(() => {
      setSearchQuery(value);
      onSearchChange?.(value);
    }, debounceDelay);
  };

  /**
   * Clear search query
   */
  const handleClear = () => {
    setSearchQuery('');
    onSearchChange?.('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  /**
   * Cleanup debounce timer on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.searchBarContainer} ${className}`}>
      <div className={styles.searchBarWrapper}>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          onChange={handleInputChange}
          aria-label="Search countries"
          defaultValue={searchQuery}
        />
        {searchQuery && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <svg
              className={styles.clearIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
```

#### Props Interface (if component)
```typescript
interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearchChange?: (query: string) => void;
  debounceDelay?: number;
}
```

#### Acceptance Criteria
- [ ] SearchBar component renders without errors
- [ ] Uses countryAtom from Jotai for state management
- [ ] Input field captures user input correctly
- [ ] Clear button appears only when search has text
- [ ] Clear button resets search query in atom
- [ ] Component is properly typed with TypeScript
- [ ] Aria labels present for accessibility
- [ ] No console errors or warnings

#### Verification Commands
```bash
npm run type-check -- src/components/CountryList/SearchBar.tsx
npm test -- SearchBar.test.tsx --watch=false
```

---

### Subtask 25.2: SearchBar Styles and Responsive Design

#### Status
status: pending

#### Objective
Implement responsive CSS module styling for SearchBar component with mobile-first approach, supporting widths from 200px to 3000px.

#### Context
The SearchBar needs responsive styling that adapts to different screen sizes. Mobile devices (200px) need compact layouts, while large desktop screens (3000px) need expanded layouts. CSS modules provide scoped styling and prevent conflicts with global styles. Responsive design uses CSS media queries and flexible units.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/SearchBar.module.css` - CSS module with responsive styles

#### Implementation

```css
/* SearchBar.module.css */

.searchBarContainer {
  width: 100%;
  min-width: 200px;
  max-width: 3000px;
  margin: 0 auto;
}

.searchBarWrapper {
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.5rem;
}

.searchInput {
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text-primary, #1a1a1a);
  background-color: var(--color-background, #ffffff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 0.375rem;
  transition: all 200ms ease-in-out;
  font-family: inherit;

  &::placeholder {
    color: var(--color-text-tertiary, #999999);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary, #0066cc);
    box-shadow: 0 0 0 3px var(--color-primary-light, rgba(0, 102, 204, 0.1));
  }

  &:hover:not(:disabled) {
    border-color: var(--color-border-hover, #cccccc);
  }

  &:disabled {
    background-color: var(--color-background-disabled, #f5f5f5);
    color: var(--color-text-disabled, #cccccc);
    cursor: not-allowed;
  }
}

.clearButton {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: none;
  border: none;
  color: var(--color-text-secondary, #666666);
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 150ms ease-in-out;
  font-size: 1rem;

  &:hover {
    background-color: var(--color-background-hover, #f0f0f0);
    color: var(--color-text-primary, #1a1a1a);
  }

  &:active {
    background-color: var(--color-background-active, #e0e0e0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #0066cc);
    outline-offset: 2px;
  }
}

.clearIcon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Tablet: 768px and up */
@media (min-width: 768px) {
  .searchInput {
    padding: 0.625rem 1rem;
    font-size: 1.0625rem;
  }

  .clearButton {
    width: 2.25rem;
    height: 2.25rem;
  }

  .clearIcon {
    width: 1.375rem;
    height: 1.375rem;
  }
}

/* Large Desktop: 1920px and up */
@media (min-width: 1920px) {
  .searchInput {
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
  }

  .clearButton {
    width: 2.5rem;
    height: 2.5rem;
  }

  .clearIcon {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* Extra Large Desktop: 3000px and up */
@media (min-width: 3000px) {
  .searchBarContainer {
    max-width: 800px;
  }

  .searchInput {
    padding: 1rem 1.5rem;
    font-size: 1.25rem;
  }

  .clearButton {
    width: 2.75rem;
    height: 2.75rem;
  }

  .clearIcon {
    width: 1.75rem;
    height: 1.75rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .searchInput {
    background-color: var(--color-background-dark, #2a2a2a);
    color: var(--color-text-dark-primary, #f0f0f0);
    border-color: var(--color-border-dark, #404040);

    &::placeholder {
      color: var(--color-text-dark-tertiary, #999999);
    }

    &:focus {
      border-color: var(--color-primary-dark, #4da6ff);
      box-shadow: 0 0 0 3px var(--color-primary-dark-light, rgba(77, 166, 255, 0.1));
    }

    &:hover:not(:disabled) {
      border-color: var(--color-border-dark-hover, #555555);
    }
  }

  .clearButton {
    color: var(--color-text-dark-secondary, #999999);

    &:hover {
      background-color: var(--color-background-dark-hover, #3a3a3a);
      color: var(--color-text-dark-primary, #f0f0f0);
    }

    &:active {
      background-color: var(--color-background-dark-active, #4a4a4a);
    }
  }
}
```

#### Acceptance Criteria
- [ ] Styles render correctly on mobile (200px width)
- [ ] Styles render correctly on tablet (768px)
- [ ] Styles render correctly on desktop (1920px)
- [ ] Styles render correctly on extra-large screens (3000px)
- [ ] Focus states accessible with keyboard navigation
- [ ] Hover states visible and functional
- [ ] Dark mode colors properly defined
- [ ] CSS variables used for theming
- [ ] No CSS syntax errors

#### Verification Commands
```bash
npm run lint -- src/components/CountryList/SearchBar.module.css
npm run build
```

---

### Subtask 25.3: Debounce Implementation and Testing

#### Status
status: pending

#### Objective
Implement comprehensive tests for debounced search functionality with 300ms delay and verify state updates via Jotai atom.

#### Context
Debouncing is critical for search performance. The 300ms delay prevents excessive state updates while typing. Tests must verify that rapid input changes only trigger final search after debounce period expires, and that clear button works correctly. Tests ensure the integration with Jotai atom works as expected.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/SearchBar.test.tsx` - Unit tests for SearchBar component

#### Implementation

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JotaiRoot } from 'jotai';
import { countryAtom } from '@/store/atoms/countryAtom';
import { useAtom } from 'jotai';
import { SearchBar } from './SearchBar';

/**
 * Test wrapper component to provide Jotai context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <JotaiRoot>{children}</JotaiRoot>
);

/**
 * Component to display atom state for testing
 */
const AtomStateDisplay: React.FC = () => {
  const [value] = useAtom(countryAtom);
  return <div data-testid="atom-state">{value}</div>;
};

describe('SearchBar Component - Debounce Tests', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Debounced Input', () => {
    it('should debounce input changes by 300ms default', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
          <AtomStateDisplay />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      // Type multiple characters rapidly
      fireEvent.change(input, { target: { value: 'a' } });
      expect(mockOnChange).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: 'ab' } });
      expect(mockOnChange).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: 'abc' } });
      expect(mockOnChange).not.toHaveBeenCalled();

      // Advance timers by 300ms
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('abc');
        expect(mockOnChange).toHaveBeenCalledTimes(1);
      });
    });

    it('should reset debounce timer on new input', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(200);
      expect(mockOnChange).not.toHaveBeenCalled();

      // New input resets timer
      fireEvent.change(input, { target: { value: 'test2' } });
      jest.advanceTimersByTime(200);
      expect(mockOnChange).not.toHaveBeenCalled();

      // Total 400ms passed, but only 200ms since last input
      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('test2');
      });
    });

    it('should allow custom debounce delay', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} debounceDelay={500} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'custom' } });
      jest.advanceTimersByTime(300);
      expect(mockOnChange).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('custom');
      });
    });
  });

  describe('Clear Button Functionality', () => {
    it('should show clear button only when search has value', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      // No clear button initially
      expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();

      // Type some text
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      // Clear button should appear
      await waitFor(() => {
        expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
      });
    });

    it('should clear search query and reset input', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
          <AtomStateDisplay />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      // Set search value
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('test');
      });

      // Clear search
      const clearButton = screen.getByLabelText(/clear search/i);
      fireEvent.click(clearButton);

      expect(input.value).toBe('');
      expect(mockOnChange).toHaveBeenCalledWith('');
      expect(mockOnChange).toHaveBeenCalledTimes(2);
    });

    it('should focus input after clearing', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      const clearButton = await screen.findByLabelText(/clear search/i);
      fireEvent.click(clearButton);

      expect(document.activeElement).toBe(input);
    });
  });

  describe('Cleanup and Edge Cases', () => {
    it('should cleanup debounce timer on unmount', () => {
      const mockOnChange = jest.fn();
      const { unmount } = render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });

      unmount();
      jest.advanceTimersByTime(300);

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should handle empty string input', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: '' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('');
      });
    });

    it('should handle special characters in search', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test@#$%^&*()' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('test@#$%^&*()');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria labels', () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByLabelText(/search countries/i);
      expect(input).toBeInTheDocument();
    });

    it('should have clear button with aria label', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      const clearButton = await screen.findByLabelText(/clear search/i);
      expect(clearButton).toHaveAttribute('aria-label');
    });
  });
});
```

#### Acceptance Criteria
- [ ] Debounce functionality works with 300ms delay
- [ ] Debounce timer resets on new input
- [ ] Custom debounce delay supported
- [ ] Clear button shown/hidden correctly
- [ ] Clear button resets input value
- [ ] Clear button focuses input
- [ ] Cleanup timer on unmount
- [ ] Special characters handled
- [ ] All accessibility tests pass
- [ ] No memory leaks

#### Verification Commands
```bash
npm test -- SearchBar.test.tsx --watch=false
npm test -- SearchBar.test.tsx --coverage
```

---

### Subtask 25.4: i18n Integration and Index Export

#### Status
status: pending

#### Objective
Configure i18n support for SearchBar placeholder text and create index file for component exports.

#### Context
The SearchBar needs i18n support for the placeholder text to support multiple languages. The i18n integration uses the project's translation system. Additionally, creating an index file allows clean imports throughout the application. This subtask ensures the SearchBar is properly exported and integrated into the project's i18n system.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/index.ts` - Export file for CountryList components
- `src/i18n/locales/en.json` - English translations for SearchBar
- `src/i18n/locales/es.json` - Spanish translations for SearchBar
- `src/i18n/locales/fr.json` - French translations for SearchBar (example)

#### Implementation

```typescript
// src/components/CountryList/index.ts
export { SearchBar } from './SearchBar';
export type { SearchBarProps } from './SearchBar';

export default SearchBar;
```

```json
{
  "countryList": {
    "title": "Select a Country",
    "searchPlaceholder": "Search countries...",
    "noResults": "No countries found",
    "loading": "Loading countries...",
    "error": "Failed to load countries",
    "selected": "Selected",
    "selectCountry": "Select a country to continue",
    "clearSearch": "Clear search"
  }
}
```

```json
{
  "countryList": {
    "title": "Selecciona un país",
    "searchPlaceholder": "Buscar países...",
    "noResults": "No se encontraron países",
    "loading": "Cargando países...",
    "error": "Error al cargar países",
    "selected": "Seleccionado",
    "selectCountry": "Selecciona un país para continuar",
    "clearSearch": "Limpiar búsqueda"
  }
}
```

```json
{
  "countryList": {
    "title": "Sélectionnez un pays",
    "searchPlaceholder": "Rechercher des pays...",
    "noResults": "Aucun pays trouvé",
    "loading": "Chargement des pays...",
    "error": "Erreur lors du chargement des pays",
    "selected": "Sélectionné",
    "selectCountry": "Sélectionnez un pays pour continuer",
    "clearSearch": "Effacer la recherche"
  }
}
```

```typescript
// src/i18n/index.ts (UPDATE - Add SearchBar i18n type safety)
import enLocale from './locales/en.json';
import esLocale from './locales/es.json';
import frLocale from './locales/fr.json';

export type I18nKey =
  | 'countryList.title'
  | 'countryList.searchPlaceholder'
  | 'countryList.noResults'
  | 'countryList.loading'
  | 'countryList.error'
  | 'countryList.selected'
  | 'countryList.selectCountry'
  | 'countryList.clearSearch';

export const locales = {
  en: enLocale,
  es: esLocale,
  fr: frLocale,
};

export function useTranslation(locale: keyof typeof locales = 'en') {
  const currentLocale = locales[locale];

  return {
    t: (key: I18nKey, defaultValue?: string): string => {
      const keys = key.split('.');
      let value: any = currentLocale;

      for (const k of keys) {
        value = value?.[k];
      }

      return value || defaultValue || key;
    },
    locale,
  };
}
```

#### Files Details

**Index Export:**
- Exports SearchBar component with TypeScript types
- Provides clean import path: `import { SearchBar } from '@/components/CountryList'`
- Default export for flexibility

**i18n Translations:**
- English, Spanish, and French translations
- Structured under `countryList` namespace
- Includes all SearchBar-related strings
- Extensible for additional languages

#### Acceptance Criteria
- [ ] SearchBar component properly exported from index
- [ ] TypeScript types exported alongside component
- [ ] English translations include searchPlaceholder
- [ ] Spanish translations include searchPlaceholder
- [ ] French translations include searchPlaceholder
- [ ] i18n keys properly typed
- [ ] useTranslation hook returns correct values
- [ ] No missing translation keys
- [ ] JSON syntax valid for all locale files

#### Verification Commands
```bash
npm run type-check -- src/components/CountryList/index.ts
npm run type-check -- src/i18n/index.ts
npm run lint -- src/i18n/locales/
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/CountryList/SearchBar.tsx`
- `src/components/CountryList/SearchBar.module.css`
- `src/components/CountryList/SearchBar.test.tsx`
- `src/components/CountryList/index.ts`
- `src/i18n/locales/en.json` (countryList namespace only)
- `src/i18n/locales/es.json` (countryList namespace only)
- `src/i18n/locales/fr.json` (countryList namespace only)

### Imports From Existing Code
- `jotai` - State management library
- `@/store/atoms/countryAtom` - Jotai atom for search query (existing)
- `@/i18n` - i18n utilities hook (existing)
- `@testing-library/react` - Testing utilities (existing)
- `@testing-library/user-event` - User interaction simulation (existing)

### Exports For Other Code
- `SearchBar` component - For use in CountryList page/feature
- `SearchBarProps` interface - For typing component props
- i18n keys under `countryList` namespace - For translation lookups

---

## Task-Level Verification

```bash
# Type checking
npm run type-check

# Component tests
npm test -- SearchBar.test.tsx --watch=false

# Linting
npm run lint -- src/components/CountryList/

# Build
npm run build

# Full verification
npm run type-check && npm test -- SearchBar.test.tsx --coverage && npm run lint
```

---

## Parallelization Notes
- All 4 subtasks are completely independent and can run in parallel
- Subtask 25.1 (Component) and 25.2 (Styles) can develop simultaneously
- Subtask 25.3 (Tests) only requires component code, not styles
- Subtask 25.4 (i18n) is independent and can run alongside others
- No subtask depends on another subtask's completion
- All subtasks can be implemented, tested, and deployed concurrently
- Each subtask owns exclusive files with no overlap
- No cross-subtask imports or dependencies
