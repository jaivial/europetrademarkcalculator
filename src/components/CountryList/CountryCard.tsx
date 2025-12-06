import React, { useCallback } from 'react';
import { CountryFlag } from './CountryFlag';
import { useCountrySelection } from '@/hooks/useCountrySelection';
import { Country } from '@/atoms/countryAtom';
import styles from './CountryCard.module.css';

export interface CountryData {
  code: string;      // ISO 3166-1 alpha-2 code
  name: string;      // Full country name
  disabled?: boolean; // Optional: disable selection
}

export interface CountryCardProps {
  /**
   * Country data object containing code and name
   */
  country: CountryData;

  /**
   * Callback fired when card is clicked
   * Overrides default selection behavior if provided
   */
  onClick?: (country: CountryData) => void;

  /**
   * Optional CSS class for additional styling
   */
  className?: string;

  /**
   * Whether the card shows as selected
   * If not provided, uses useCountrySelection hook
   */
  selected?: boolean;

  /**
   * Test ID for testing purposes
   */
  testId?: string;
}

/**
 * CountryCard Component
 * Displays a country card with flag, name, and ISO code.
 * Handles selection state via Jotai when selected prop not provided.
 */
export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onClick,
  className,
  selected: controlledSelected,
  testId,
}) => {
  const { selectedCountry, selectCountry } = useCountrySelection();

  // Determine if card is selected
  const isSelected =
    controlledSelected !== undefined
      ? controlledSelected
      : selectedCountry?.code === country.code;

  // Handle click event
  const handleClick = useCallback(() => {
    if (country.disabled) return;

    if (onClick) {
      onClick(country);
    } else {
      // Convert CountryData to Country for selectCountry
      const countryForSelection: Country = {
        code: country.code,
        name: country.name,
        continent: 'Europe', // Default for this component
      };
      selectCountry(countryForSelection);
    }
  }, [country, onClick, selectCountry]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div
      className={`${styles.cardContainer} ${isSelected ? styles.selected : ''} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={country.disabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-label={`Select ${country.name}`}
      aria-disabled={country.disabled}
      data-testid={testId || `country-card-${country.code}`}
    >
      <CountryFlag
        countryCode={country.code}
        countryName={country.name}
        className={styles.flag}
      />
      <h3 className={styles.countryName}>{country.name}</h3>
      <p className={styles.isoCode}>{country.code}</p>
    </div>
  );
};

export default CountryCard;
