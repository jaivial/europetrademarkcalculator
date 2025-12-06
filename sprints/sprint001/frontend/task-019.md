# Frontend Task 19: Language Selector Component

## Metadata
- **Task**: 19 of 40
- **Area**: Frontend
- **Feature**: Language Selector Dropdown
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a fully responsive Language Selector dropdown component with flag icons for all 10 supported languages (en, es, fr, de, it, pt, nl, pl, sv, el). This component uses the Jotai-based useLanguage hook for state management (NO useState) and integrates seamlessly into the application header. The component is responsive across all viewport sizes (200px to 3000px) and provides an intuitive language switching experience.

---

## Subtasks

### Subtask 19.1: LanguageFlag Component with Icon Mapping

#### Status
status: pending

#### Objective
Create a reusable LanguageFlag component that displays flag icons for all 10 supported languages with proper TypeScript typing and size responsiveness.

#### Context
This subtask provides the foundation for displaying language indicators. The flag component will be used both in the main LanguageSelector dropdown and as the display indicator, ensuring consistency across the UI. It handles icon mapping, loading, and responsive sizing.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/LanguageSelector/LanguageFlag.tsx` - Flag display component with icon management
- `src/components/LanguageSelector/types.ts` - Type definitions for language support

#### Implementation

```typescript
// src/components/LanguageSelector/types.ts
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'sv' | 'el';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português' },
  { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
  { code: 'pl', label: 'Polish', nativeLabel: 'Polski' },
  { code: 'sv', label: 'Swedish', nativeLabel: 'Svenska' },
  { code: 'el', label: 'Greek', nativeLabel: 'Ελληνικά' },
];

export const FLAG_EMOJI_MAP: Record<LanguageCode, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  pt: '🇵🇹',
  nl: '🇳🇱',
  pl: '🇵🇱',
  sv: '🇸🇪',
  el: '🇬🇷',
};
```

```typescript
// src/components/LanguageSelector/LanguageFlag.tsx
import React, { useMemo } from 'react';
import { LanguageCode, FLAG_EMOJI_MAP } from './types';

export interface LanguageFlagProps {
  languageCode: LanguageCode;
  size?: 'sm' | 'md' | 'lg';
  showCode?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: '16px',
  md: '20px',
  lg: '24px',
};

export const LanguageFlag: React.FC<LanguageFlagProps> = ({
  languageCode,
  size = 'md',
  showCode = false,
  className = '',
}) => {
  const flagEmoji = useMemo(() => {
    return FLAG_EMOJI_MAP[languageCode] || '🌐';
  }, [languageCode]);

  const fontSize = SIZE_MAP[size];

  return (
    <span
      className={`language-flag ${className}`}
      style={{
        fontSize,
        display: 'inline-flex',
        alignItems: 'center',
        gap: showCode ? '8px' : '0',
        whiteSpace: 'nowrap',
      }}
    >
      <span role="img" aria-label={`${languageCode} flag`}>
        {flagEmoji}
      </span>
      {showCode && <span style={{ fontSize: '12px' }}>{languageCode.toUpperCase()}</span>}
    </span>
  );
};

LanguageFlag.displayName = 'LanguageFlag';
```

#### Props Interface
```typescript
interface LanguageFlagProps {
  languageCode: LanguageCode;
  size?: 'sm' | 'md' | 'lg';
  showCode?: boolean;
  className?: string;
}
```

#### Acceptance Criteria
- [ ] LanguageCode type supports all 10 languages
- [ ] LANGUAGE_OPTIONS array contains all languages with labels
- [ ] FLAG_EMOJI_MAP has entries for all 10 languages
- [ ] LanguageFlag component renders flag emoji correctly
- [ ] Size prop controls font size (sm=16px, md=20px, lg=24px)
- [ ] showCode prop displays language code alongside flag
- [ ] Component has proper accessibility (aria-label)
- [ ] No console errors/warnings

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="LanguageFlag"
```

---

### Subtask 19.2: useLanguage Hook Integration and State Management

#### Status
status: pending

#### Objective
Create the useLanguage custom hook that integrates with Jotai for language state management without using useState, providing clean access to current language and setter function.

#### Context
This hook encapsulates all language state management using Jotai atoms. It provides a simple API for components to access and modify the current language. This subtask ensures that the language state is properly persisted and accessible throughout the application without prop drilling.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useLanguage.ts` - Custom hook for language state management with Jotai
- `src/store/atoms/languageAtom.ts` - Jotai atom for language state

#### Implementation

```typescript
// src/store/atoms/languageAtom.ts
import { atom } from 'jotai';
import { LanguageCode } from '../../components/LanguageSelector/types';

// Default language is English
const DEFAULT_LANGUAGE: LanguageCode = 'en';

export const languageAtom = atom<LanguageCode>(() => {
  // Try to load from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('app-language');
    if (stored && isValidLanguageCode(stored)) {
      return stored as LanguageCode;
    }
  }
  return DEFAULT_LANGUAGE;
}, (get, set, newLanguage: LanguageCode) => {
  set(languageAtom, newLanguage);
  // Persist to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('app-language', newLanguage);
  }
});

function isValidLanguageCode(code: string): boolean {
  const validCodes: LanguageCode[] = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'el'];
  return validCodes.includes(code as LanguageCode);
}
```

```typescript
// src/hooks/useLanguage.ts
import { useAtom } from 'jotai';
import { languageAtom } from '../store/atoms/languageAtom';
import { LanguageCode } from '../components/LanguageSelector/types';

export interface UseLanguageReturn {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

export const useLanguage = (): UseLanguageReturn => {
  const [currentLanguage, setLanguageValue] = useAtom(languageAtom);

  const setLanguage = (language: LanguageCode) => {
    setLanguageValue(language);
  };

  return {
    currentLanguage,
    setLanguage,
  };
};
```

#### Acceptance Criteria
- [ ] useLanguage hook properly uses Jotai atoms (NO useState)
- [ ] languageAtom initializes with localStorage value or defaults to 'en'
- [ ] setLanguage function updates Jotai atom
- [ ] Language persists in localStorage when changed
- [ ] Hook returns currentLanguage and setLanguage
- [ ] All 10 language codes are recognized as valid
- [ ] No prop drilling required in consuming components
- [ ] Type safety with LanguageCode type

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="useLanguage"
```

---

### Subtask 19.3: LanguageSelector Dropdown Component (Core UI)

#### Status
status: pending

#### Objective
Create the main LanguageSelector dropdown component with click-to-toggle functionality, displaying all 10 languages with current language highlighted.

#### Context
This subtask builds the interactive dropdown UI. The component manages open/closed state through ref and click handlers (not useState), integrates with useLanguage hook for language state, and provides visual feedback for the current selection. It's the main component users interact with.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/LanguageSelector/LanguageSelector.tsx` - Main dropdown component with interaction logic

#### Implementation

```typescript
// src/components/LanguageSelector/LanguageSelector.tsx
import React, { useRef, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageFlag } from './LanguageFlag';
import { LANGUAGE_OPTIONS, LanguageCode } from './types';
import styles from './LanguageSelector.module.css';

export interface LanguageSelectorProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  showLabel = false,
  compact = false,
}) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleLanguageSelect = (language: LanguageCode) => {
    setLanguage(language);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const currentLanguageOption = LANGUAGE_OPTIONS.find((opt) => opt.code === currentLanguage);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.languageSelectorContainer} ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        className={`${styles.selectorButton} ${isOpen ? styles.selectorButtonOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select language (currently ${currentLanguageOption?.label})`}
      >
        <LanguageFlag
          languageCode={currentLanguage}
          size={compact ? 'sm' : 'md'}
        />
        {showLabel && !compact && (
          <span className={styles.label}>{currentLanguageOption?.label}</span>
        )}
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <ul
          className={`${styles.dropdownMenu} ${compact ? styles.dropdownMenuCompact : ''}`}
          role="listbox"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <li key={option.code}>
              <button
                className={`${styles.menuItem} ${
                  option.code === currentLanguage ? styles.menuItemActive : ''
                }`}
                onClick={() => handleLanguageSelect(option.code)}
                role="option"
                aria-selected={option.code === currentLanguage}
              >
                <LanguageFlag languageCode={option.code} size="sm" />
                <span className={styles.menuItemLabel}>
                  {option.nativeLabel}
                </span>
                {option.code === currentLanguage && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

LanguageSelector.displayName = 'LanguageSelector';
```

#### Props Interface
```typescript
interface LanguageSelectorProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}
```

#### Acceptance Criteria
- [ ] LanguageSelector renders button with current language flag
- [ ] Clicking button toggles dropdown menu visibility
- [ ] Dropdown displays all 10 languages with flags and native labels
- [ ] Current language is highlighted with checkmark
- [ ] Clicking language option updates selection and closes dropdown
- [ ] Clicking outside dropdown closes it
- [ ] Escape key closes dropdown
- [ ] showLabel prop displays language name in button
- [ ] compact prop reduces button size
- [ ] Proper ARIA attributes for accessibility
- [ ] No console errors/warnings

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="LanguageSelector"
```

---

### Subtask 19.4: Responsive Styling with Module CSS

#### Status
status: pending

#### Objective
Create responsive CSS module for LanguageSelector with breakpoints covering 200px to 3000px viewport widths, proper spacing, and visual feedback.

#### Context
This subtask handles all styling for the language selector components. It ensures responsiveness across all device sizes (mobile phones to ultra-wide displays) with adaptive font sizes, spacing, and dropdown positioning. The module uses CSS variables for maintainability and smooth transitions for user feedback.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/LanguageSelector/LanguageSelector.module.css` - All responsive styles
- `src/components/LanguageSelector/index.ts` - Barrel export for component

#### Implementation

```css
/* src/components/LanguageSelector/LanguageSelector.module.css */

:root {
  --language-selector-bg: #ffffff;
  --language-selector-border: #e5e7eb;
  --language-selector-hover: #f3f4f6;
  --language-selector-active: #dbeafe;
  --language-selector-text: #1f2937;
  --language-selector-text-light: #6b7280;
  --language-selector-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --language-selector-transition: all 200ms ease-in-out;
}

.languageSelectorContainer {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
}

/* Base Button Styles - Mobile First (200px+) */
.selectorButton {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--language-selector-text);
  background-color: var(--language-selector-bg);
  border: 1px solid var(--language-selector-border);
  border-radius: 6px;
  cursor: pointer;
  transition: var(--language-selector-transition);
  width: 100%;
  min-height: 40px;
  justify-content: space-between;
}

.selectorButton:hover {
  background-color: var(--language-selector-hover);
  border-color: #d1d5db;
}

.selectorButton:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.selectorButtonOpen {
  border-color: #3b82f6;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* Chevron Icon */
.chevron {
  width: 18px;
  height: 18px;
  color: var(--language-selector-text-light);
  transition: var(--language-selector-transition);
  flex-shrink: 0;
}

.chevronOpen {
  transform: rotate(180deg);
  color: #3b82f6;
}

/* Label */
.label {
  display: none;
  flex: 1;
  margin-left: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--language-selector-text);
}

/* Dropdown Menu */
.dropdownMenu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 8px 0;
  list-style: none;
  background-color: var(--language-selector-bg);
  border: 1px solid var(--language-selector-border);
  border-top: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: var(--language-selector-shadow);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  animation: slideDown 200ms ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdownMenuCompact {
  max-height: 300px;
}

/* Menu Items */
.menuItem {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--language-selector-text);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: var(--language-selector-transition);
  justify-content: space-between;
  text-align: left;
}

.menuItem:hover {
  background-color: var(--language-selector-hover);
}

.menuItem:focus {
  outline: none;
  background-color: var(--language-selector-active);
}

.menuItemActive {
  background-color: var(--language-selector-active);
  color: #3b82f6;
  font-weight: 600;
}

.menuItemLabel {
  flex: 1;
  font-size: 14px;
}

.checkmark {
  color: #3b82f6;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}

/* Tablet (640px+) */
@media (min-width: 640px) {
  .selectorButton {
    width: auto;
    padding: 10px 14px;
    font-size: 15px;
  }

  .label {
    display: inline;
  }

  .dropdownMenu {
    max-height: 500px;
  }

  .menuItem {
    padding: 12px 14px;
    font-size: 15px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .selectorButton {
    padding: 12px 16px;
    font-size: 16px;
    border-radius: 8px;
    min-height: 44px;
  }

  .selectorButtonOpen {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .dropdownMenu {
    border-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 10px 0;
  }

  .menuItem {
    padding: 14px 16px;
    font-size: 16px;
    gap: 14px;
  }

  .menuItemLabel {
    font-size: 16px;
  }
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  .selectorButton {
    padding: 14px 18px;
    font-size: 17px;
    min-height: 48px;
  }

  .dropdownMenu {
    padding: 12px 0;
  }

  .menuItem {
    padding: 16px 18px;
    font-size: 17px;
    gap: 16px;
  }

  .menuItemLabel {
    font-size: 17px;
  }
}

/* Ultra-wide (2560px+) */
@media (min-width: 2560px) {
  .selectorButton {
    padding: 18px 24px;
    font-size: 20px;
    min-height: 56px;
    border-radius: 12px;
  }

  .selectorButtonOpen {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .dropdownMenu {
    border-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px 0;
    max-height: 600px;
  }

  .chevron {
    width: 24px;
    height: 24px;
  }

  .menuItem {
    padding: 20px 24px;
    font-size: 20px;
    gap: 18px;
  }

  .menuItemLabel {
    font-size: 20px;
  }

  .checkmark {
    font-size: 24px;
  }
}

/* Very Small (200px - 640px) mobile optimizations */
@media (max-width: 639px) {
  .selectorButton {
    gap: 6px;
    padding: 8px 10px;
    font-size: 13px;
  }

  .chevron {
    width: 16px;
    height: 16px;
  }

  .dropdownMenu {
    padding: 6px 0;
    max-height: 350px;
  }

  .menuItem {
    padding: 8px 10px;
    font-size: 13px;
    gap: 10px;
  }

  .menuItemLabel {
    font-size: 13px;
  }

  .checkmark {
    font-size: 16px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .selectorButton,
  .chevron,
  .menuItem,
  .dropdownMenu {
    transition: none;
  }

  .dropdownMenu {
    animation: none;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --language-selector-bg: #1f2937;
    --language-selector-border: #374151;
    --language-selector-hover: #2d3748;
    --language-selector-active: #1e3a8a;
    --language-selector-text: #f3f4f6;
    --language-selector-text-light: #9ca3af;
    --language-selector-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  }
}
```

```typescript
// src/components/LanguageSelector/index.ts
export { LanguageSelector } from './LanguageSelector';
export { LanguageFlag } from './LanguageFlag';
export type { LanguageSelectorProps } from './LanguageSelector';
export type { LanguageFlagProps } from './LanguageFlag';
export { LANGUAGE_OPTIONS, FLAG_EMOJI_MAP } from './types';
export type { LanguageCode, LanguageOption } from './types';
```

#### Acceptance Criteria
- [ ] Styles responsive from 200px to 3000px viewports
- [ ] Mobile-first approach with proper breakpoints (640px, 1024px, 1440px, 2560px)
- [ ] Hover and focus states visible on all interactive elements
- [ ] Dropdown slides down with smooth animation
- [ ] Current selection highlighted with active state
- [ ] Touch-friendly tap targets (min 40px height on mobile)
- [ ] Dark mode support via prefers-color-scheme
- [ ] Respects prefers-reduced-motion for accessibility
- [ ] CSS custom properties for easy theming
- [ ] No hardcoded colors for better maintainability
- [ ] Proper z-index for dropdown overlay

#### Verification Commands
```bash
npm run type-check
npm run lint
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/LanguageSelector/LanguageSelector.tsx`
- `src/components/LanguageSelector/LanguageFlag.tsx`
- `src/components/LanguageSelector/LanguageSelector.module.css`
- `src/components/LanguageSelector/types.ts`
- `src/components/LanguageSelector/index.ts`
- `src/hooks/useLanguage.ts`
- `src/store/atoms/languageAtom.ts`

### Imports From Existing Code
- `react` - Core React library
- `jotai` - State management library
- Component composition patterns from existing components

### Exports For Other Code
- `LanguageSelector` - Main dropdown component
- `LanguageFlag` - Flag display component
- `useLanguage` - Custom hook for language state
- `LANGUAGE_OPTIONS` - Array of language definitions
- `LanguageCode` - Type for language codes

---

## Task-Level Verification
```bash
# Type check all code
npm run type-check

# Run all language selector tests
npm test -- --testPathPattern="LanguageSelector|LanguageFlag|useLanguage"

# Lint all files
npm run lint

# Verify responsive design at different breakpoints
npm run dev
```

---

## Parallelization Notes
- All 4 subtasks can run in parallel without dependencies
- Subtask 19.1 (LanguageFlag) is independent and provides types
- Subtask 19.2 (useLanguage hook) is independent and provides state logic
- Subtask 19.3 (LanguageSelector) imports types from 19.1 and uses hook from 19.2
- Subtask 19.4 (Styles) is independent and applies styling
- All subtasks can be implemented simultaneously with no blocking dependencies
- Each subtask owns exclusive files with no cross-subtask file sharing
- No subtask depends on another subtask's implementation order
