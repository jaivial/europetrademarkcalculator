// src/components/CountryList/CountryList.tsx
import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import {
  selectedCountryAtom,
  filteredCountriesAtom,
  countrySearchQueryAtom,
  Country,
  EUROPEAN_COUNTRIES
} from '@/atoms/countryAtom';
import styles from './CountryList.module.css';

export interface CountryListProps {
  className?: string;
}

/**
 * CountryList Component
 *
 * Displays searchable grid of countries synced with selectedCountryAtom
 * Same atom used by EuropeMap - selecting here shows CountryPanel
 * Uses translated country names from i18n countries namespace
 */
export const CountryList: React.FC<CountryListProps> = ({
  className = '',
}) => {
  const { t } = useTranslation('countries');
  // Jotai atoms - synced with map
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);
  const [searchQuery, setSearchQuery] = useAtom(countrySearchQueryAtom);
  const filteredCountries = useAtomValue(filteredCountriesAtom);

  // Handle country selection - updates same atom as map
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  // Get translated country name, fallback to English name
  const getCountryName = (country: Country): string => {
    const translated = t(country.code, { defaultValue: '' });
    // If translation key returns the key itself or empty, use original name
    return translated && translated !== country.code ? translated : country.name;
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      role="region"
      aria-label={t('title')}
    >
      {/* Search Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.subtitle}>
          {filteredCountries.length} / {EUROPEAN_COUNTRIES.length}
        </p>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={t('searchPlaceholder')}
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={() => setSearchQuery('')}
              aria-label={t('clearSearch')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Country Grid - Scrollable */}
      <div className={styles.gridContainer}>
        {filteredCountries.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <p className={styles.emptyText}>{t('noResults')}</p>
            <button
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery('')}
            >
              {t('clearSearch')}
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry?.code === country.code;
              const hasPricing = !!country.brandRegistration;
              const countryName = getCountryName(country);

              return (
                <button
                  key={country.code}
                  className={`${styles.countryCard} ${isSelected ? styles.selected : ''} ${hasPricing ? styles.hasPricing : ''}`}
                  onClick={() => handleCountrySelect(country)}
                  aria-pressed={isSelected}
                  aria-label={`${t('selected')}: ${countryName}`}
                >
                  {/* Flag */}
                  <span className={styles.flag}>{country.flag}</span>

                  {/* Country Info */}
                  <div className={styles.countryInfo}>
                    <span className={styles.countryName}>{countryName}</span>
                    <span className={styles.countryCode}>{country.code}</span>
                  </div>

                  {/* Pricing Badge */}
                  {hasPricing && (
                    <span className={styles.priceBadge}>
                      €{country.brandRegistration!.basePrice}+
                    </span>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <span className={styles.selectedIndicator}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryList;
