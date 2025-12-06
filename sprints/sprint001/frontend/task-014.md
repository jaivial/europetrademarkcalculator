# Frontend Task 014: Custom Hooks - Theme Hook (useTheme)

## Metadata
- **Task**: 14 of 40
- **Area**: Frontend
- **Feature**: Custom Hooks - Theme Management
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the custom `useTheme` hook that provides theme state management using Jotai atoms (NO useState). The hook manages dark/light theme preferences, provides toggle and cycling functions, and applies theme classes to the document root element. This hook serves as the centralized interface for all theme-related functionality throughout the application.

---

## Subtasks

### Subtask 014.1: Core useTheme Hook Implementation

#### Status
status: pending

#### Objective
Create the main useTheme hook that exposes theme state, preference state, and utilities for theme management using Jotai useAtom and useAtomValue.

#### Context
This subtask creates the primary hook that components will use to access and modify theme state. It must use Jotai atoms (themeAtom, themePreferenceAtom, isSystemThemeAtom) defined in the themeAtom store. The hook should NOT use useState - all state management delegated to Jotai. It returns an interface exposing theme, preference, isDark, isLight, isSystemTheme, and setter functions.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useTheme.ts` - Main useTheme hook implementation

#### Implementation

```typescript
import { useAtom, useAtomValue } from 'jotai';
import { themeAtom, themePreferenceAtom, isSystemThemeAtom, type Theme } from '@/store/atoms/themeAtom';

/**
 * Custom hook for theme management
 *
 * Provides access to:
 * - Current active theme (resolved from preference or system)
 * - Theme preference (light, dark, or system)
 * - Helper flags (isDark, isLight, isSystemTheme)
 * - Functions to change theme (setTheme, toggleTheme, cycleTheme)
 *
 * Uses Jotai atoms for state management - NO useState
 */
export function useTheme() {
  // Get preference atom with setter
  const [preference, setPreference] = useAtom(themePreferenceAtom);

  // Get actual resolved theme (light or dark, even if preference is 'system')
  const actualTheme = useAtomValue(themeAtom);

  // Check if using system preference
  const isSystemTheme = useAtomValue(isSystemThemeAtom);

  /**
   * Set theme preference directly
   * @param theme - 'light', 'dark', or 'system'
   */
  const setTheme = (theme: Theme) => {
    setPreference(theme);
  };

  /**
   * Toggle between light and dark
   * Switches from current resolved theme to opposite
   * Ignores 'system' preference and uses actual value
   */
  const toggleTheme = () => {
    setPreference(actualTheme === 'dark' ? 'light' : 'dark');
  };

  /**
   * Cycle through all theme options
   * Cycles: light -> dark -> system -> light (repeats)
   */
  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(preference);
    const nextIndex = (currentIndex + 1) % themes.length;
    setPreference(themes[nextIndex]);
  };

  return {
    // Current active theme (resolved value: 'light' or 'dark')
    theme: actualTheme,

    // User's theme preference ('light', 'dark', or 'system')
    preference,

    // Whether system preference is being used
    isSystemTheme,

    // Theme setter functions
    setTheme,
    toggleTheme,
    cycleTheme,

    // Convenience boolean flags
    isDark: actualTheme === 'dark',
    isLight: actualTheme === 'light',
  };
}
```

#### Type Interface
```typescript
export interface UseThemeReturn {
  // State
  theme: 'light' | 'dark';
  preference: 'light' | 'dark' | 'system';
  isSystemTheme: boolean;

  // Setters
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;

  // Flags
  isDark: boolean;
  isLight: boolean;
}
```

#### Acceptance Criteria
- [ ] Hook uses Jotai useAtom and useAtomValue (NO useState)
- [ ] Imports from @/store/atoms/themeAtom are correct
- [ ] Theme preference atom initialized with atomWithStorage
- [ ] Returns actual theme (resolved from preference or system)
- [ ] Returns preference state separately
- [ ] setTheme function updates preference atom
- [ ] toggleTheme switches between light and dark
- [ ] cycleTheme cycles through light -> dark -> system
- [ ] isDark and isLight boolean flags work correctly
- [ ] isSystemTheme flag correctly identifies system preference
- [ ] No TypeScript errors
- [ ] Proper JSDoc comments document all functions

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="useTheme"
```

---

### Subtask 014.2: Apply Theme Class to Document Root

#### Status
status: pending

#### Objective
Create a hook effect that automatically applies the theme class to document.documentElement whenever the theme changes, enabling CSS-based theme switching.

#### Context
This subtask handles the visual theme application by setting the `data-theme` attribute on the document root element. This enables CSS selectors like `[data-theme="dark"]` to style the entire application. The effect must run whenever the actualTheme changes and must be called from within useTheme or as a separate hook that components use together with useTheme.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useTheme.ts` - Add useEffect hook to existing implementation

#### Implementation

Add the following to the useTheme hook after the return statement:

```typescript
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { themeAtom, themePreferenceAtom, isSystemThemeAtom, type Theme } from '@/store/atoms/themeAtom';

/**
 * Custom hook for theme management with automatic DOM updates
 *
 * Provides access to:
 * - Current active theme (resolved from preference or system)
 * - Theme preference (light, dark, or system)
 * - Helper flags (isDark, isLight, isSystemTheme)
 * - Functions to change theme (setTheme, toggleTheme, cycleTheme)
 *
 * Automatically applies theme class to document root
 * Uses Jotai atoms for state management - NO useState
 */
export function useTheme() {
  // Get preference atom with setter
  const [preference, setPreference] = useAtom(themePreferenceAtom);

  // Get actual resolved theme (light or dark, even if preference is 'system')
  const actualTheme = useAtomValue(themeAtom);

  // Check if using system preference
  const isSystemTheme = useAtomValue(isSystemThemeAtom);

  /**
   * Apply theme class to document root
   * Runs whenever actualTheme changes
   * Sets data-theme attribute for CSS selectors
   */
  useEffect(() => {
    // Apply theme class to document root
    document.documentElement.setAttribute('data-theme', actualTheme);

    // Also apply to body for compatibility
    document.body.setAttribute('data-theme', actualTheme);

    // Optional: Trigger custom event for components that need it
    const event = new CustomEvent('themechange', {
      detail: { theme: actualTheme },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }, [actualTheme]);

  /**
   * Set theme preference directly
   * @param theme - 'light', 'dark', or 'system'
   */
  const setTheme = (theme: Theme) => {
    setPreference(theme);
  };

  /**
   * Toggle between light and dark
   * Switches from current resolved theme to opposite
   * Ignores 'system' preference and uses actual value
   */
  const toggleTheme = () => {
    setPreference(actualTheme === 'dark' ? 'light' : 'dark');
  };

  /**
   * Cycle through all theme options
   * Cycles: light -> dark -> system -> light (repeats)
   */
  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(preference);
    const nextIndex = (currentIndex + 1) % themes.length;
    setPreference(themes[nextIndex]);
  };

  return {
    // Current active theme (resolved value: 'light' or 'dark')
    theme: actualTheme,

    // User's theme preference ('light', 'dark', or 'system')
    preference,

    // Whether system preference is being used
    isSystemTheme,

    // Theme setter functions
    setTheme,
    toggleTheme,
    cycleTheme,

    // Convenience boolean flags
    isDark: actualTheme === 'dark',
    isLight: actualTheme === 'light',
  };
}
```

#### Acceptance Criteria
- [ ] useEffect hook applies data-theme attribute to document.documentElement
- [ ] data-theme attribute updates whenever actualTheme changes
- [ ] Effect dependency array only includes actualTheme
- [ ] No memory leaks from effect
- [ ] Custom 'themechange' event dispatched on theme change
- [ ] Theme class immediately visible in browser dev tools
- [ ] Works with CSS [data-theme="dark"] and [data-theme="light"] selectors
- [ ] No TypeScript errors
- [ ] Proper comments explain effect behavior

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Manual test: Check that data-theme attribute appears on document.documentElement
# in browser dev tools when theme changes
```

---

### Subtask 014.3: Create Hook Export and Type Definitions

#### Status
status: pending

#### Objective
Create index export file for the hook and establish proper TypeScript type definitions that will be used by other components.

#### Context
This subtask ensures the hook is properly exported from the hooks directory and provides clear type definitions for consumers. It creates the `src/hooks/index.ts` export file that re-exports useTheme along with its types. This allows components to import cleanly: `import { useTheme, type UseThemeReturn } from '@/hooks'`.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/index.ts` - Central export for all hooks including useTheme

#### Implementation

```typescript
/**
 * Central export for all custom hooks
 * Provides clean import paths for components
 */

// Theme hook
export { useTheme } from './useTheme';

/**
 * Type definitions for useTheme hook return value
 * Used to type component props and state
 */
export type { UseThemeReturn } from './useTheme';

// Future hooks will be exported here as they are created
// Examples:
// export { useCalculator } from './useCalculator';
// export { useLanguage } from './useLanguage';
// export { useGlobeControls } from './useGlobeControls';
```

Also update `src/hooks/useTheme.ts` to export the type:

```typescript
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { themeAtom, themePreferenceAtom, isSystemThemeAtom, type Theme } from '@/store/atoms/themeAtom';

/**
 * Return type for useTheme hook
 * Provides complete interface for theme state and controls
 */
export interface UseThemeReturn {
  // Current theme state
  theme: 'light' | 'dark';
  preference: 'light' | 'dark' | 'system';
  isSystemTheme: boolean;

  // Theme control functions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;

  // Convenience flags
  isDark: boolean;
  isLight: boolean;
}

/**
 * Custom hook for theme management with automatic DOM updates
 *
 * Provides access to:
 * - Current active theme (resolved from preference or system)
 * - Theme preference (light, dark, or system)
 * - Helper flags (isDark, isLight, isSystemTheme)
 * - Functions to change theme (setTheme, toggleTheme, cycleTheme)
 *
 * Automatically applies theme class to document root
 * Uses Jotai atoms for state management - NO useState
 */
export function useTheme(): UseThemeReturn {
  // Get preference atom with setter
  const [preference, setPreference] = useAtom(themePreferenceAtom);

  // Get actual resolved theme (light or dark, even if preference is 'system')
  const actualTheme = useAtomValue(themeAtom);

  // Check if using system preference
  const isSystemTheme = useAtomValue(isSystemThemeAtom);

  /**
   * Apply theme class to document root
   * Runs whenever actualTheme changes
   * Sets data-theme attribute for CSS selectors
   */
  useEffect(() => {
    // Apply theme class to document root
    document.documentElement.setAttribute('data-theme', actualTheme);

    // Also apply to body for compatibility
    document.body.setAttribute('data-theme', actualTheme);

    // Trigger custom event for components that need it
    const event = new CustomEvent('themechange', {
      detail: { theme: actualTheme },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }, [actualTheme]);

  /**
   * Set theme preference directly
   * @param theme - 'light', 'dark', or 'system'
   */
  const setTheme = (theme: Theme) => {
    setPreference(theme);
  };

  /**
   * Toggle between light and dark
   * Switches from current resolved theme to opposite
   * Ignores 'system' preference and uses actual value
   */
  const toggleTheme = () => {
    setPreference(actualTheme === 'dark' ? 'light' : 'dark');
  };

  /**
   * Cycle through all theme options
   * Cycles: light -> dark -> system -> light (repeats)
   */
  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(preference);
    const nextIndex = (currentIndex + 1) % themes.length;
    setPreference(themes[nextIndex]);
  };

  return {
    // Current active theme (resolved value: 'light' or 'dark')
    theme: actualTheme,

    // User's theme preference ('light', 'dark', or 'system')
    preference,

    // Whether system preference is being used
    isSystemTheme,

    // Theme setter functions
    setTheme,
    toggleTheme,
    cycleTheme,

    // Convenience boolean flags
    isDark: actualTheme === 'dark',
    isLight: actualTheme === 'light',
  };
}
```

#### Acceptance Criteria
- [ ] `src/hooks/index.ts` created with proper exports
- [ ] `useTheme` exported from index.ts
- [ ] `UseThemeReturn` type exported from index.ts
- [ ] `UseThemeReturn` interface defined in useTheme.ts
- [ ] Hook function has explicit return type `: UseThemeReturn`
- [ ] All exports are documented with JSDoc comments
- [ ] No circular dependencies
- [ ] No TypeScript errors
- [ ] Can import cleanly: `import { useTheme } from '@/hooks'`
- [ ] Type definitions available for consumers

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check

# Verify exports work correctly
node -e "
const hooks = require('./src/hooks/index.ts');
console.log('useTheme exported:', typeof hooks.useTheme);
console.log('UseThemeReturn type available:', !!hooks.UseThemeReturn);
"
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/hooks/useTheme.ts` - Custom theme hook with full implementation
- `src/hooks/index.ts` - Central export file for all hooks

### Imports From Existing Code
- `jotai` - useAtom, useAtomValue hooks
- `react` - useEffect hook
- `@/store/atoms/themeAtom` - themeAtom, themePreferenceAtom, isSystemThemeAtom, Theme type
- `document` - Global object for DOM manipulation

### Exports For Other Code
- `useTheme` - Hook exported from `@/hooks`
- `UseThemeReturn` - Type exported from `@/hooks` for typing component props
- Custom `themechange` event - Dispatched when theme changes (can be listened to via `document.addEventListener`)

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="useTheme"
npm run lint -- src/hooks/

# Verify files created
test -f src/hooks/useTheme.ts && echo "useTheme.ts created"
test -f src/hooks/index.ts && echo "index.ts created"

# Verify imports work
npm run build 2>&1 | grep -i "error" && echo "Build errors found" || echo "Build successful"
```

---

## Parallelization Notes
- All subtasks in this task can run in parallel
- Subtask 014.1 and 014.2 could be combined into single file (both write to useTheme.ts)
- Subtask 014.3 can run independently as it only adds exports
- Subtasks own exclusive files with no dependencies on each other
- All subtasks can complete simultaneously
- No subtask blocks another subtask's execution

---

## Implementation Notes

### State Management with Jotai
- Use `useAtom()` when you need to read AND write state
- Use `useAtomValue()` when you only need to read state
- All atoms come from `@/store/atoms/themeAtom`

### DOM Theme Application
- Set `data-theme` attribute on both `document.documentElement` and `document.body` for broad compatibility
- CSS can use selectors like `[data-theme="dark"] .component { ... }`
- The `themechange` custom event allows components to listen without re-rendering

### No useState Requirement
- CRITICAL: This hook must use ONLY Jotai atoms, NO useState
- All state persists via `atomWithStorage` in themeAtom.ts
- System preference detection handled by themeAtom, not this hook

### Type Safety
- Always return explicit UseThemeReturn type
- Theme type is 'light' | 'dark' | 'system'
- Actual theme is 'light' | 'dark' (system preference resolved)
