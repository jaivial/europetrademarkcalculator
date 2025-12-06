import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useLayoutEffect } from 'react';
import {
  persistedThemeAtom,
  resolvedPersistedThemeAtom,
  applyThemeClass,
  type Theme
} from '@/atoms/themeAtom';

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
  const [preference, setPreference] = useAtom(persistedThemeAtom);

  // Get actual resolved theme (light or dark, even if preference is 'system')
  const actualTheme = useAtomValue(resolvedPersistedThemeAtom);

  // Check if using system preference
  const isSystemTheme = preference === 'system';

  /**
   * Apply theme class to document root SYNCHRONOUSLY
   * Uses useLayoutEffect to prevent flash of wrong theme
   * Runs before browser paint
   */
  useIsomorphicLayoutEffect(() => {
    // Remove opposite theme class first to prevent conflicts
    document.documentElement.classList.remove('light', 'dark');
    document.body.classList.remove('light', 'dark');

    // Apply theme class to document root
    document.documentElement.setAttribute('data-theme', actualTheme);
    document.documentElement.classList.add(actualTheme);

    // Also apply to body for compatibility
    document.body.setAttribute('data-theme', actualTheme);
    document.body.classList.add(actualTheme);

    // Use the shared applyThemeClass for meta tag updates
    applyThemeClass(actualTheme);

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
