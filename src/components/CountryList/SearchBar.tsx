'use client';

import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { countrySearchQueryAtom } from '@/atoms/countryAtom';
import styles from './SearchBar.module.css';
import { useI18n } from '@/i18n';

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
  const [searchQuery, setSearchQuery] = useAtom(countrySearchQueryAtom);
  const { t } = useI18n('countries');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get i18n placeholder if not provided
  const placeholder = placeholderProp || t('searchCountries', 'Search countries...');

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
