// src/components/CountryList/CountryGrid.tsx
import React from 'react';
import styles from './CountryGrid.module.css';
import { EmptyState } from './EmptyState';

/**
 * Type definition for country data
 * Aligns with backend API structure
 */
export interface Country {
  id: string;
  name: string;
  code: string;
  flag?: string;
  registrationFee?: number;
  currency?: string;
  region?: string;
  description?: string;
}

export interface CountryGridProps {
  countries: Country[];
  onCountrySelect?: (country: Country) => void;
  loading?: boolean;
  className?: string;
  itemsPerPage?: number;
  virtualizeEnabled?: boolean;
}

/**
 * CountryGrid Component
 * Renders a responsive grid of country cards that adapts from 1-6 columns
 * Based on viewport width (200px = 1 col, 3000px = 6 cols)
 *
 * Features:
 * - CSS Grid with auto-fit for automatic column calculation
 * - No media queries needed - pure CSS Grid responsiveness
 * - Smooth column transitions as viewport resizes
 * - Optional virtualization for performance with large datasets
 * - Empty state displayed when countries array is empty
 */
export const CountryGrid: React.FC<CountryGridProps> = ({
  countries,
  onCountrySelect,
  loading = false,
  className = '',
}) => {
  // Show empty state when no countries provided
  if (!loading && countries.length === 0) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <EmptyState />
      </div>
    );
  }

  // Show loading skeleton if data is loading
  if (loading) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <div className={styles.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`skeleton-${i}`} className={styles.countryCardSkeleton}>
              <div className={styles.skeletonShimmer} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main grid rendering
  return (
    <div className={`${styles.gridContainer} ${className}`}>
      <div
        className={styles.grid}
        role="grid"
        aria-label="Country selection grid"
        aria-rowcount={Math.ceil(countries.length / 6)}
      >
        {countries.map((country) => (
          <div
            key={country.id}
            className={styles.countryCard}
            onClick={() => onCountrySelect?.(country)}
            role="gridcell"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCountrySelect?.(country);
              }
            }}
            aria-label={`Select ${country.name}`}
          >
            {/* Country Flag */}
            {country.flag && (
              <div className={styles.countryFlag}>
                {country.flag}
              </div>
            )}

            {/* Country Info */}
            <div className={styles.countryInfo}>
              <h3 className={styles.countryName}>{country.name}</h3>
              <p className={styles.countryCode}>{country.code}</p>

              {/* Optional: Display additional info */}
              {country.region && (
                <p className={styles.countryRegion}>{country.region}</p>
              )}

              {country.registrationFee && (
                <p className={styles.countryFee}>
                  Fee: {country.currency || 'EUR'} {country.registrationFee}
                </p>
              )}

              {country.description && (
                <p className={styles.countryDescription}>
                  {country.description}
                </p>
              )}
            </div>

            {/* Hover Indicator */}
            <div className={styles.cardHoverOverlay} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryGrid;
