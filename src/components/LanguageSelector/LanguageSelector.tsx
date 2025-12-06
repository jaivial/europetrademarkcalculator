import React, { useRef, useState } from 'react';
import { useLanguageNavigation } from '../../hooks/useLanguageNavigation';
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
  // Use useLanguageNavigation for BOTH current language AND navigation
  const { currentLanguage: currentLang, changeLanguage } = useLanguageNavigation();
  // Cast to LanguageCode, with fallback to 'en'
  const currentLanguage = (currentLang as LanguageCode) || 'en';
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
    // changeLanguage handles BOTH i18next state AND URL navigation
    changeLanguage(language);
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
