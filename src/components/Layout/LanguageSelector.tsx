import React, { useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { atom } from 'jotai';
import styles from './LanguageSelector.module.css';

// Jotai atom for dropdown open state (NO useState)
export const languageDropdownOpenAtom = atom<boolean>(false);

// Language configuration with flags and native names
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

interface LanguageSelectorProps {
  className?: string;
}

/**
 * LanguageSelector Component
 *
 * Dropdown language selector using Jotai atoms (NO useState).
 * Shows current language with flag and opens dropdown on click.
 *
 * Features:
 * - Flag emoji display for current language
 * - Dropdown with all 10 supported languages
 * - Native language names for accessibility
 * - Keyboard navigation support
 * - Click outside to close
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
}) => {
  const { i18n, t } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useAtom(languageDropdownOpenAtom);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get current language info
  const currentLang = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === i18n.language
  ) || SUPPORTED_LANGUAGES[0];

  // Handle language change - updates both i18n AND URL
  const handleLanguageChange = useCallback(
    (langCode: string) => {
      // Update i18next language
      i18n.changeLanguage(langCode);

      // Navigate to new language URL
      // Extract path after language prefix (e.g., /en/privacy -> /privacy)
      const currentPath = location.pathname;
      const pathMatch = currentPath.match(/^\/[a-z]{2}(\/.*)?$/);
      const pathWithoutLang = pathMatch?.[1] || '';

      // Navigate to new language path
      const newPath = `/${langCode}${pathWithoutLang}`;
      navigate(newPath, { replace: true });

      setIsOpen(false);
      // Focus back to button after selection
      buttonRef.current?.focus();
    },
    [i18n, navigate, location.pathname, setIsOpen]
  );

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      } else if (event.key === 'ArrowDown' && !isOpen) {
        setIsOpen(true);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <div
      ref={dropdownRef}
      className={`${styles.container} ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('selectLanguage', { defaultValue: 'Select Language' })}
      >
        <span className={styles.flag}>{currentLang.flag}</span>
        <span className={styles.langCode}>{currentLang.code.toUpperCase()}</span>
        <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-label="Language options">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`${styles.option} ${
                lang.code === i18n.language ? styles.selected : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              role="option"
              aria-selected={lang.code === i18n.language}
            >
              <span className={styles.optionFlag}>{lang.flag}</span>
              <span className={styles.optionName}>{lang.nativeName}</span>
              {lang.code === i18n.language && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
