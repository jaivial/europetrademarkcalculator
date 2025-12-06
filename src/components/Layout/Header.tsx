import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { Sun, Moon } from 'lucide-react';
import styles from './Header.module.css';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import {
  persistedThemeAtom,
  resolvedPersistedThemeAtom,
  applyThemeClass,
  setupSystemThemeListener,
  type Theme
} from '../../atoms/themeAtom';

interface HeaderProps {
  /**
   * Optional CSS class for additional styling
   */
  className?: string;

  /**
   * Optional z-index for stacking context
   */
  zIndex?: number;
}

/**
 * Header Component
 *
 * A sticky header that displays EU flag logo, app title, language selector, and theme toggle.
 * Responsive grid that adapts on mobile (<768px).
 *
 * Features:
 * - EU flag as logo
 * - App title "EU Brand Calculator"
 * - Integrated LanguageSelector dropdown
 * - Light/Dark theme toggle button with smooth transitions
 * - Persists theme preference to localStorage
 *
 * Responsive Behavior:
 * - Desktop (768px+): Full header with logo, title, theme toggle, and language selector
 * - Mobile (<768px): Compact header with logo, theme toggle, and language selector
 * - Extra small (200px+): Minimum layout maintained
 * - Extra large (3000px+): Maximum constraints applied
 */
const Header: React.FC<HeaderProps> = ({
  className,
  zIndex = 100,
}) => {
  const { t } = useTranslation('common');
  const [theme, setTheme] = useAtom(persistedThemeAtom);
  const [resolvedTheme] = useAtom(resolvedPersistedThemeAtom);

  // Apply theme on mount and when it changes
  useEffect(() => {
    applyThemeClass(resolvedTheme);
  }, [resolvedTheme]);

  // Set up system theme listener for 'system' preference
  useEffect(() => {
    if (theme === 'system') {
      const cleanup = setupSystemThemeListener((newSystemTheme) => {
        applyThemeClass(newSystemTheme);
      });
      return cleanup;
    }
  }, [theme]);

  /**
   * Toggle between light and dark themes
   * Cycles through: light -> dark -> light
   */
  const handleThemeToggle = () => {
    const newTheme: Theme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <header
      className={`${styles.header} ${className || ''}`}
      style={{ zIndex }}
      role="banner"
      aria-label="Application header"
    >
      <div className={styles.container}>
        {/* Logo Section - EU Flag */}
        <div className={styles.logoSection}>
          <Logo />
        </div>

        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            {t('appTitle', { defaultValue: 'EU Brand Calculator' })}
          </h1>
        </div>

        {/* Controls Section - Theme Toggle and Language Selector */}
        <div className={styles.controlsSection}>
          {/* Theme Toggle Button */}
          <div
            className={styles.controlSlot}
            data-control="theme"
            aria-label="Theme toggle"
          >
            <button
              className={styles.themeToggle}
              onClick={handleThemeToggle}
              aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
              type="button"
            >
              {resolvedTheme === 'light' ? (
                <Moon className={styles.themeIcon} size={20} aria-hidden="true" />
              ) : (
                <Sun className={styles.themeIcon} size={20} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Language Selector */}
          <div
            className={styles.controlSlot}
            data-control="language"
            aria-label="Language selector"
          >
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
