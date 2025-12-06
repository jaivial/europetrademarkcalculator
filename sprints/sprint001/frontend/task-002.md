# Frontend Task 002: Core Jotai Atoms - Theme State

## Metadata
- **Task**: 2 of 15
- **Area**: Frontend
- **Feature**: Theme State Management
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create Jotai atoms for comprehensive theme management including dark/light mode selection, automatic system preference detection, and localStorage persistence. This establishes the global theme state that will be used across the entire application with no local React state (useState forbidden).

---

## Subtasks

### Subtask 002.1: System Preference Detection & Theme Atom

#### Status
status: pending

#### Objective
Create the core theme atom that detects system color scheme preference and provides a base for theme switching without using useState.

#### Context
The theme atom must detect the system's prefers-color-scheme media query to determine initial theme preference. This enables automatic dark/light mode based on OS settings while allowing user overrides. System detection is critical for accessibility and user experience.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/themeAtom.ts` - Core theme atom with system detection

#### Implementation

```typescript
import { atom } from 'jotai';

/**
 * Theme type definition
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Actual theme value after system preference resolution
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Detect system color scheme preference
 * Uses prefers-color-scheme media query
 */
function detectSystemTheme(): ResolvedTheme {
  // Check if window is available (SSR safety)
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Check for prefers-color-scheme media query support
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // Fall back to light theme
  return 'light';
}

/**
 * Create a function to determine resolved theme
 * Takes user preference and returns actual theme to apply
 */
export function resolveTheme(userTheme: Theme): ResolvedTheme {
  if (userTheme === 'system') {
    return detectSystemTheme();
  }
  return userTheme as ResolvedTheme;
}

/**
 * Primary theme atom - stores user's theme preference
 * User can select 'light', 'dark', or 'system'
 * 'system' means follow OS preference
 */
export const themeAtom = atom<Theme>('system');

/**
 * Derived atom that resolves theme preference to actual theme
 * This atom computes the real theme ('light' or 'dark') to apply
 * by checking system preference if needed
 */
export const resolvedThemeAtom = atom((get) => {
  const userTheme = get(themeAtom);
  return resolveTheme(userTheme);
});

/**
 * Atom to track system preference changes
 * Listens to prefers-color-scheme media query changes
 */
export const systemThemeAtom = atom<ResolvedTheme>(() => {
  // Initialize with current system preference
  return detectSystemTheme();
});

/**
 * Atom to track if user is on a device that respects prefers-color-scheme
 * Used to conditionally show/hide system theme option
 */
export const supportsSystemThemeAtom = atom(() => {
  if (typeof window === 'undefined') {
    return false;
  }

  return typeof window.matchMedia === 'function' &&
         window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all';
});

/**
 * Helper function to set up system theme listener
 * Returns cleanup function for removing the listener
 * This is used in effects or initialization
 */
export function setupSystemThemeListener(
  onSystemThemeChange: (theme: ResolvedTheme) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  if (!window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Handle system theme changes
  const handleChange = (event: MediaQueryListEvent) => {
    const newTheme: ResolvedTheme = event.matches ? 'dark' : 'light';
    onSystemThemeChange(newTheme);
  };

  // Modern API: addEventListener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }

  // Legacy API: addListener (deprecated but still supported)
  if (mediaQuery.addListener) {
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }

  return () => {};
}

/**
 * Apply theme class to document element
 * Updates both the HTML class and data attribute for styling
 */
export function applyThemeClass(theme: ResolvedTheme): void {
  if (typeof document === 'undefined') {
    return;
  }

  const htmlElement = document.documentElement;

  // Remove both theme classes
  htmlElement.classList.remove('light', 'dark');

  // Add appropriate theme class
  htmlElement.classList.add(theme);

  // Also set data-theme attribute for CSS selectors
  htmlElement.setAttribute('data-theme', theme);

  // Optional: Update meta theme-color tag
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    if (theme === 'dark') {
      themeColorMeta.setAttribute('content', '#000000');
    } else {
      themeColorMeta.setAttribute('content', '#ffffff');
    }
  }
}

/**
 * Get current theme from DOM
 * Reads the actual theme applied to the document
 */
export function getCurrentThemeFromDOM(): ResolvedTheme {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const htmlElement = document.documentElement;
  if (htmlElement.classList.contains('dark')) {
    return 'dark';
  }
  return 'light';
}
```

#### Acceptance Criteria
- [ ] detectSystemTheme() correctly identifies dark/light mode from OS
- [ ] resolveTheme() converts user preference to actual theme
- [ ] themeAtom stores user preference ('light', 'dark', 'system')
- [ ] resolvedThemeAtom derives actual theme to apply
- [ ] systemThemeListener properly handles media query changes
- [ ] applyThemeClass() updates HTML class and data attributes
- [ ] All functions are SSR-safe (check for window/document)
- [ ] No TypeScript errors in strict mode
- [ ] No useState or local state used anywhere

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify no compilation errors
```

---

### Subtask 002.2: localStorage Persistence with Jotai

#### Status
status: pending

#### Objective
Create atomWithStorage wrapper atoms that persist theme preference to localStorage automatically.

#### Context
Persistence enables user's theme choice to survive page reloads and browser sessions. localStorage is the ideal choice for client-side persistence. Must use Jotai's atomWithStorage to avoid manual state management and ensure consistency.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/themeAtom.ts` - Add storage atoms (extend from subtask 2.1)

#### Implementation

```typescript
// Add to src/atoms/themeAtom.ts after the previous code

import { atomWithStorage } from 'jotai/utils';

/**
 * localStorage key for theme preference
 */
const THEME_STORAGE_KEY = 'app-theme-preference';

/**
 * Persisted theme atom using localStorage
 * Automatically syncs user's theme choice across tabs
 * Falls back to 'system' if not set in localStorage
 */
export const persistedThemeAtom = atomWithStorage<Theme>(
  THEME_STORAGE_KEY,
  'system', // default value
  {
    getItem: (key: string) => {
      if (typeof window === 'undefined') {
        return null;
      }
      try {
        const item = window.localStorage.getItem(key);
        if (!item) {
          return null;
        }
        // Validate stored value is a valid theme
        const parsed = JSON.parse(item);
        if (parsed === 'light' || parsed === 'dark' || parsed === 'system') {
          return parsed;
        }
        return null;
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: Theme) => {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Silently fail if localStorage is unavailable (private browsing, quota exceeded)
        console.warn(`Failed to persist theme to localStorage: ${key}`);
      }
    },
    removeItem: (key: string) => {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Silently fail
      }
    },
  }
);

/**
 * Resolved persisted theme atom
 * Automatically resolves the stored user preference to the actual theme
 */
export const resolvedPersistedThemeAtom = atom((get) => {
  const userTheme = get(persistedThemeAtom);
  return resolveTheme(userTheme);
});

/**
 * Atom to track if localStorage is available
 * Some browsers (private mode, etc) may restrict localStorage access
 */
export const isLocalStorageAvailableAtom = atom(() => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
});

/**
 * Atom to track last saved theme
 * Useful for detecting if theme was actually persisted
 */
export const lastSavedThemeAtom = atom<Theme | null>(null);

/**
 * Clear theme from localStorage and reset to default
 * Returns true if successful
 */
export function clearThemeStorage(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate theme value is legitimate
 * Prevents invalid values from being stored
 */
export function isValidTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Safely set theme in localStorage with validation
 * Only stores valid theme values
 */
export function setSafeTheme(theme: unknown): boolean {
  if (!isValidTheme(theme)) {
    console.warn(`Invalid theme value: ${theme}`);
    return false;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    return true;
  } catch {
    console.warn('Failed to save theme to localStorage');
    return false;
  }
}

/**
 * Get theme directly from localStorage without using Jotai
 * Useful for synchronizing across browser tabs
 */
export function getThemeFromStorage(): Theme {
  if (typeof window === 'undefined') {
    return 'system';
  }

  try {
    const item = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!item) {
      return 'system';
    }
    const parsed = JSON.parse(item);
    if (isValidTheme(parsed)) {
      return parsed;
    }
    return 'system';
  } catch {
    return 'system';
  }
}
```

#### Acceptance Criteria
- [ ] persistedThemeAtom uses atomWithStorage with THEME_STORAGE_KEY
- [ ] Default theme is 'system'
- [ ] Custom getItem/setItem/removeItem handle errors gracefully
- [ ] Invalid values are rejected silently
- [ ] Works in private browsing mode (no errors on quota exceeded)
- [ ] resolvedPersistedThemeAtom derives actual theme
- [ ] isLocalStorageAvailableAtom detects storage support
- [ ] clearThemeStorage() removes localStorage entry
- [ ] setSafeTheme() validates before storing
- [ ] getThemeFromStorage() reads without Jotai (for sync operations)

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify localStorage functions work without errors
```

---

### Subtask 002.3: Theme Atoms Index & Custom Hooks

#### Status
status: pending

#### Objective
Create index.ts to export all theme atoms and provide custom hooks for easy consumption in components.

#### Context
The index file provides a clean public API for other parts of the application to access theme functionality. Custom hooks using Jotai's useAtom hook make it simple for components to read and update theme state without direct atom imports.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/index.ts` - Theme atoms export barrel file

#### Implementation

```typescript
/**
 * Atoms Index - Central export point for all Jotai atoms
 * This file provides the public API for theme state management
 */

export {
  // Type exports
  type Theme,
  type ResolvedTheme,
  // Theme atoms
  themeAtom,
  resolvedThemeAtom,
  systemThemeAtom,
  supportsSystemThemeAtom,
  persistedThemeAtom,
  resolvedPersistedThemeAtom,
  isLocalStorageAvailableAtom,
  lastSavedThemeAtom,
  // Functions
  resolveTheme,
  detectSystemTheme,
  setupSystemThemeListener,
  applyThemeClass,
  getCurrentThemeFromDOM,
  clearThemeStorage,
  isValidTheme,
  setSafeTheme,
  getThemeFromStorage,
} from './themeAtom';

/**
 * Note: Additional atoms for other features will be added here as tasks progress
 * Examples:
 * - src/atoms/localeAtom.ts (i18n)
 * - src/atoms/navigationAtom.ts (router state)
 * - src/atoms/dataAtom.ts (API data)
 * - src/atoms/userAtom.ts (authentication)
 */
```

#### Acceptance Criteria
- [ ] All theme types exported (Theme, ResolvedTheme)
- [ ] All theme atoms exported
- [ ] All theme functions exported
- [ ] File is under 100 lines (barrel file, not implementation)
- [ ] Proper TypeScript type safety with type exports
- [ ] No actual implementation logic (only re-exports)
- [ ] Comments document future atom additions
- [ ] Index file compiles without errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify all exports are accessible
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/themeAtom.ts`
- `src/atoms/index.ts`

### Imports From Existing Code
- `jotai` - atom, atomWithStorage (from npm dependencies installed in task 1)
- None from project code (this is foundational)

### Exports For Other Code
- `Theme` type - used by any component changing theme
- `ResolvedTheme` type - used to determine what actual theme is applied
- `persistedThemeAtom` - imported by App.tsx and components that read/write theme
- `resolvedPersistedThemeAtom` - imported by CSS-in-JS or styling logic
- `applyThemeClass()` - called during theme initialization in App.tsx
- `setupSystemThemeListener()` - used to sync system preference changes
- All exports available via `@/atoms`

---

## Task-Level Verification

```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# No TypeScript errors expected
# Verify atoms compile correctly
# Check path alias @/atoms works
```

---

## Parallelization Notes
- All 3 subtasks are completely independent
- Subtask 2.1 creates core logic (no dependencies on 2.2 or 2.3)
- Subtask 2.2 adds persistence (imports from 2.1 but can be written in parallel)
- Subtask 2.3 is pure re-exports (just aggregates 2.1 and 2.2)
- All subtasks use only npm dependencies, no inter-task dependencies
- Can be implemented in any order, but final file structure is: 2.1 + 2.2 → 2.3
- No component or hook consumers exist yet (this is foundational)
- Task 15 (App.tsx) will be the first consumer of these atoms
