# Frontend Task 26: Country Card Component

## Metadata
- **Task**: 26 of 40
- **Area**: Frontend
- **Feature**: Country List - Country Card Component
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a reusable CountryCard component for the Country List feature. This component displays country information including flag emoji, name, and ISO code with interactive selection state, hover effects, and responsive sizing. All state management uses Jotai atoms and the useCountrySelection hook for seamless integration with the application state.

---

## Subtasks

### Subtask 26.1: CountryFlag Component

#### Status
status: pending

#### Objective
Create a specialized CountryFlag component that renders the flag emoji for a given country with accessibility attributes.

#### Context
The flag component is a reusable piece used by CountryCard. It separates flag rendering logic from card logic, making testing and reuse easier. This component handles emoji rendering and alternative text fallback.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryFlag.tsx` - Flag emoji rendering component
- `src/components/CountryList/CountryFlag.test.tsx` - Unit tests for flag component

#### Implementation

```typescript
import React from 'react';

export interface CountryFlagProps {
  /**
   * ISO 3166-1 alpha-2 country code
   */
  countryCode: string;
  /**
   * Accessible label for the flag emoji
   */
  countryName: string;
  /**
   * Optional CSS class for styling
   */
  className?: string;
}

/**
 * Converts ISO country code to flag emoji
 * Maps country codes to Unicode regional indicator symbols
 * @param code - ISO 3166-1 alpha-2 country code
 * @returns Flag emoji string
 */
function countryCodeToFlag(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * CountryFlag Component
 * Renders country flag emoji with accessibility support
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  countryName,
  className,
}) => {
  const flagEmoji = countryCodeToFlag(countryCode);

  return (
    <span
      className={className}
      role="img"
      aria-label={`${countryName} flag`}
      title={countryName}
    >
      {flagEmoji}
    </span>
  );
};

export default CountryFlag;
```

#### Props Interface
```typescript
interface CountryFlagProps {
  countryCode: string;      // ISO 3166-1 alpha-2 code (e.g., "US", "GB")
  countryName: string;      // Full country name for accessibility
  className?: string;        // Optional CSS class
}
```

#### Acceptance Criteria
- [ ] Component renders flag emoji correctly from ISO code
- [ ] Accessibility attributes (role, aria-label) present
- [ ] Title attribute provides hover text
- [ ] className prop works correctly
- [ ] Unit tests cover multiple country codes
- [ ] No console errors or warnings

#### Verification Commands
```bash
npm run test -- src/components/CountryList/CountryFlag.test.tsx
npm run type-check -- src/components/CountryList/CountryFlag.tsx
npm run lint -- src/components/CountryList/CountryFlag.tsx
```

---

### Subtask 26.2: CountryCard Styles Module

#### Status
status: pending

#### Objective
Create modular CSS styles for CountryCard component with responsive design, hover effects, and selected state styling.

#### Context
CSS Module organization keeps styles scoped and maintainable. Responsive breakpoints ensure the card looks good from 200px to 3000px width. Hover and selected states provide visual feedback for user interactions.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryCard.module.css` - Scoped styles for country card

#### Implementation

```css
/* Country Card Container */
.cardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(0.5rem, 4%, 2rem);
  border-radius: 0.5rem;
  border: 2px solid #e5e7eb;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-height: clamp(150px, 20vw, 300px);
  aspect-ratio: 1;
  position: relative;
}

/* Hover State */
.cardContainer:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
  background-color: #f0f4ff;
}

/* Selected State */
.cardContainer.selected {
  border-color: #2563eb;
  background-color: #dbeafe;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.25);
  border-width: 2px;
}

.cardContainer.selected:hover {
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
  transform: translateY(-2px);
}

/* Flag Emoji Styling */
.flag {
  font-size: clamp(2rem, 10vw, 4rem);
  line-height: 1;
  margin-bottom: clamp(0.5rem, 2%, 1rem);
  display: inline-block;
}

/* Country Name */
.countryName {
  font-size: clamp(0.875rem, 2.5vw, 1.125rem);
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin: 0;
  word-break: break-word;
  margin-bottom: clamp(0.25rem, 1%, 0.5rem);
}

.cardContainer.selected .countryName {
  color: #1e40af;
}

/* ISO Code */
.isoCode {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: #6b7280;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
}

.cardContainer.selected .isoCode {
  color: #1e40af;
}

/* Focus State for Keyboard Navigation */
.cardContainer:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .cardContainer {
    min-height: clamp(120px, 25vw, 180px);
    padding: clamp(0.375rem, 3%, 1rem);
  }

  .flag {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
    margin-bottom: clamp(0.375rem, 1.5%, 0.75rem);
  }

  .countryName {
    font-size: clamp(0.75rem, 2vw, 1rem);
  }

  .isoCode {
    font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  }
}

/* Tablet & Desktop Responsiveness */
@media (min-width: 768px) {
  .cardContainer {
    min-height: clamp(160px, 15vw, 300px);
  }
}

/* Large Desktop Responsiveness */
@media (min-width: 1920px) {
  .cardContainer {
    min-height: clamp(200px, 12vw, 350px);
  }
}

/* Disabled State */
.cardContainer:disabled,
.cardContainer[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #d1d5db;
}

.cardContainer:disabled:hover,
.cardContainer[disabled]:hover {
  transform: none;
  box-shadow: none;
  border-color: #d1d5db;
  background-color: #f3f4f6;
}
```

#### Acceptance Criteria
- [ ] All responsive breakpoints work (200px-3000px)
- [ ] Hover effects apply correctly
- [ ] Selected state styling distinct from normal state
- [ ] Mobile-first design implemented
- [ ] Focus states for keyboard navigation
- [ ] No hardcoded colors - uses design tokens from globals
- [ ] CSS modules scoped correctly (no global leaks)

#### Verification Commands
```bash
npm run lint -- src/components/CountryList/CountryCard.module.css
npm run build -- --check-css
```

---

### Subtask 26.3: CountryCard Component Core

#### Status
status: pending

#### Objective
Create the main CountryCard component that integrates CountryFlag, applies styles, and handles click interactions with Jotai state management.

#### Context
CountryCard is the primary interactive component. It uses the useCountrySelection hook to integrate with Jotai atoms for selection state. The component handles user interactions without local useState, maintaining centralized state management.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryCard.tsx` - Main card component
- `src/components/CountryList/index.ts` - Barrel export

#### Implementation

```typescript
import React, { useCallback } from 'react';
import { CountryFlag } from './CountryFlag';
import { useCountrySelection } from '../../hooks/useCountrySelection';
import styles from './CountryCard.module.css';

export interface CountryData {
  code: string;      // ISO 3166-1 alpha-2 code
  name: string;      // Full country name
  disabled?: boolean; // Optional: disable selection
}

export interface CountryCardProps {
  /**
   * Country data object containing code and name
   */
  country: CountryData;

  /**
   * Callback fired when card is clicked
   * Overrides default selection behavior if provided
   */
  onClick?: (country: CountryData) => void;

  /**
   * Optional CSS class for additional styling
   */
  className?: string;

  /**
   * Whether the card shows as selected
   * If not provided, uses useCountrySelection hook
   */
  selected?: boolean;

  /**
   * Test ID for testing purposes
   */
  testId?: string;
}

/**
 * CountryCard Component
 * Displays a country card with flag, name, and ISO code.
 * Handles selection state via Jotai when selected prop not provided.
 */
export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onClick,
  className,
  selected: controlledSelected,
  testId,
}) => {
  const { selectedCountry, selectCountry } = useCountrySelection();

  // Determine if card is selected
  const isSelected =
    controlledSelected !== undefined
      ? controlledSelected
      : selectedCountry?.code === country.code;

  // Handle click event
  const handleClick = useCallback(() => {
    if (country.disabled) return;

    if (onClick) {
      onClick(country);
    } else {
      selectCountry(country);
    }
  }, [country, onClick, selectCountry]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div
      className={`${styles.cardContainer} ${isSelected ? styles.selected : ''} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={country.disabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-label={`Select ${country.name}`}
      disabled={country.disabled}
      data-testid={testId || `country-card-${country.code}`}
    >
      <CountryFlag
        countryCode={country.code}
        countryName={country.name}
        className={styles.flag}
      />
      <h3 className={styles.countryName}>{country.name}</h3>
      <p className={styles.isoCode}>{country.code}</p>
    </div>
  );
};

export default CountryCard;
```

#### Props Interface
```typescript
interface CountryCardProps {
  country: CountryData;        // Country object with code and name
  onClick?: (country: CountryData) => void;  // Optional click override
  className?: string;           // Additional CSS classes
  selected?: boolean;            // Controlled selected state
  testId?: string;              // Test ID for testing
}
```

#### Acceptance Criteria
- [ ] Component renders without errors
- [ ] useCountrySelection hook integrates correctly
- [ ] Click handler calls selectCountry from hook
- [ ] Selected state reflects from Jotai atom
- [ ] Keyboard navigation works (Enter, Space)
- [ ] Accessibility attributes present (role, aria-pressed)
- [ ] CSS module classes apply correctly
- [ ] Disabled state prevents selection
- [ ] No console errors or warnings

#### Verification Commands
```bash
npm run type-check -- src/components/CountryList/CountryCard.tsx
npm run lint -- src/components/CountryList/CountryCard.tsx
```

---

### Subtask 26.4: CountryCard Tests and Exports

#### Status
status: pending

#### Objective
Create comprehensive unit tests for CountryCard component and establish barrel exports for easy consumption.

#### Context
Tests ensure the component behaves correctly across different states and scenarios. Barrel exports provide clean module boundaries. Tests verify Jotai integration, click handling, keyboard navigation, and accessibility.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/CountryList/CountryCard.test.tsx` - Comprehensive unit tests
- `src/components/CountryList/__tests__/integration.test.tsx` - Integration tests

#### Implementation

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { CountryCard } from './CountryCard';
import type { CountryData } from './CountryCard';

const mockCountry: CountryData = {
  code: 'US',
  name: 'United States',
};

const mockCountryDisabled: CountryData = {
  code: 'GB',
  name: 'United Kingdom',
  disabled: true,
};

describe('CountryCard Component', () => {
  // Wrapper for Jotai Provider
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider>{component}</Provider>);
  };

  describe('Rendering', () => {
    it('should render country card with correct content', () => {
      renderWithProvider(<CountryCard country={mockCountry} />);

      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('US')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /United States flag/i })).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      renderWithProvider(
        <CountryCard country={mockCountry} className="custom-class" />
      );

      const card = screen.getByRole('button');
      expect(card).toHaveClass('custom-class');
    });

    it('should have correct accessibility attributes', () => {
      renderWithProvider(<CountryCard country={mockCountry} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('aria-label', 'Select United States');
      expect(card).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Selection States', () => {
    it('should show selected state when selected prop is true', () => {
      renderWithProvider(<CountryCard country={mockCountry} selected={true} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-pressed', 'true');
    });

    it('should show unselected state when selected prop is false', () => {
      renderWithProvider(<CountryCard country={mockCountry} selected={false} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      renderWithProvider(
        <CountryCard country={mockCountry} onClick={handleClick} />
      );

      const card = screen.getByRole('button');
      await userEvent.click(card);

      expect(handleClick).toHaveBeenCalledWith(mockCountry);
    });

    it('should handle keyboard navigation with Enter key', async () => {
      const handleClick = jest.fn();
      renderWithProvider(
        <CountryCard country={mockCountry} onClick={handleClick} />
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalled();
    });

    it('should handle keyboard navigation with Space key', async () => {
      const handleClick = jest.fn();
      renderWithProvider(
        <CountryCard country={mockCountry} onClick={handleClick} />
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: ' ' });

      expect(handleClick).toHaveBeenCalled();
    });

    it('should not trigger click when disabled', async () => {
      const handleClick = jest.fn();
      renderWithProvider(
        <CountryCard
          country={mockCountryDisabled}
          onClick={handleClick}
        />
      );

      const card = screen.getByRole('button');
      await userEvent.click(card);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled card with correct attributes', () => {
      renderWithProvider(<CountryCard country={mockCountryDisabled} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabindex', '-1');
      expect(card).toHaveAttribute('disabled');
    });

    it('should prevent selection when disabled', async () => {
      const handleClick = jest.fn();
      renderWithProvider(
        <CountryCard
          country={mockCountryDisabled}
          onClick={handleClick}
        />
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Test IDs', () => {
    it('should have default test ID based on country code', () => {
      renderWithProvider(<CountryCard country={mockCountry} />);

      expect(screen.getByTestId('country-card-US')).toBeInTheDocument();
    });

    it('should use custom test ID when provided', () => {
      renderWithProvider(
        <CountryCard country={mockCountry} testId="custom-test-id" />
      );

      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
    });
  });
});
```

#### Barrel Export (index.ts)
```typescript
export { CountryCard, type CountryCardProps, type CountryData } from './CountryCard';
export { CountryFlag, type CountryFlagProps } from './CountryFlag';
export { default as CountryCardStyles } from './CountryCard.module.css';
```

#### Acceptance Criteria
- [ ] All unit tests pass
- [ ] 90%+ code coverage
- [ ] Renders correctly
- [ ] Selection state works
- [ ] Keyboard navigation tested
- [ ] Disabled state tested
- [ ] Accessibility attributes verified
- [ ] Barrel exports working
- [ ] No console errors/warnings in tests

#### Verification Commands
```bash
npm test -- src/components/CountryList/CountryCard.test.tsx --coverage
npm test -- src/components/CountryList/__tests__/integration.test.tsx
npm run type-check -- src/components/CountryList
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/CountryList/CountryCard.tsx`
- `src/components/CountryList/CountryFlag.tsx`
- `src/components/CountryList/CountryCard.module.css`
- `src/components/CountryList/index.ts`
- `src/components/CountryList/CountryCard.test.tsx`
- `src/components/CountryList/__tests__/integration.test.tsx`

### Imports From Existing Code
- `useCountrySelection` - Custom hook from `src/hooks/useCountrySelection` (must exist or be created in separate task)
- `@testing-library/react` - Testing utilities
- `@testing-library/user-event` - User interaction simulation
- `jotai` - State management library (Provider)

### Exports For Other Code
- `CountryCard` - Main component for country list display
- `CountryFlag` - Reusable flag emoji component
- `CountryCardProps` - Props interface for type safety
- `CountryData` - Country data type definition

---

## Task-Level Verification
```bash
# Type checking
npm run type-check -- src/components/CountryList

# Linting
npm run lint -- src/components/CountryList

# Unit tests
npm test -- src/components/CountryList --coverage

# Build verification
npm run build -- --check-entry=src/components/CountryList/index.ts
```

---

## Parallelization Notes
- Subtask 26.1 (CountryFlag) can run in parallel - no dependencies
- Subtask 26.2 (Styles) can run in parallel - no dependencies
- Subtask 26.3 (CountryCard Core) depends on 26.1 and 26.2 but can follow immediately
- Subtask 26.4 (Tests) can run in parallel with 26.1-26.3 after component structure is defined
- All subtasks can be executed sequentially or with 26.1 & 26.2 parallel, followed by 26.3 & 26.4

**Key Independence Points:**
- CountryFlag is completely independent
- Styles module is completely independent
- CountryCard integrates the above two
- Tests validate the complete implementation
- Each subtask owns exclusive files with no cross-editing
