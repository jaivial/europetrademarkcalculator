import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

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

/**
 * localStorage key for theme preference
 */
const THEME_STORAGE_KEY = 'app-theme-preference';

/**
 * Get initial theme from localStorage synchronously
 * This ensures the atom starts with the correct value
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'system';
  }
  try {
    const item = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!item) {
      return 'system';
    }
    const parsed = JSON.parse(item);
    if (parsed === 'light' || parsed === 'dark' || parsed === 'system') {
      return parsed;
    }
    return 'system';
  } catch {
    return 'system';
  }
}

/**
 * Persisted theme atom using localStorage
 * Uses synchronous initialization to prevent hydration mismatch
 * Automatically syncs user's theme choice across tabs
 */
export const persistedThemeAtom = atomWithStorage<Theme>(
  THEME_STORAGE_KEY,
  getInitialTheme(), // Use synchronously read value as initial
  {
    getItem: (key: string, initialValue: Theme) => {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        if (!item) {
          return initialValue;
        }
        // Validate stored value is a valid theme
        const parsed = JSON.parse(item);
        if (parsed === 'light' || parsed === 'dark' || parsed === 'system') {
          return parsed;
        }
        return initialValue;
      } catch {
        return initialValue;
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
  },
  { getOnInit: true } // This tells Jotai to get the value synchronously on init
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

/**
 * Export detectSystemTheme for external use
 */
export { detectSystemTheme };
