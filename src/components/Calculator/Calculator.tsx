import React, { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { countryAtom } from '@/atoms/countryAtom';
import { OptionSelector } from './OptionSelector';
import { PriceBreakdown } from './PriceBreakdown';
import { Summary } from './Summary';
import styles from './Calculator.module.css';

export interface CalculatorProps {
  className?: string;
  onCalculate?: (result: CalculationResult) => void;
}

export interface CalculationResult {
  basePrice: number;
  servicesPrice: number;
  totalPrice: number;
  country: string;
  numberOfClasses: number;
}

export const Calculator: React.FC<CalculatorProps> = ({
  className = '',
  onCalculate
}) => {
  const selectedCountry = useAtomValue(countryAtom);

  // Memoize empty state check to prevent unnecessary recalculations
  const hasCountrySelected = useMemo(() => {
    return selectedCountry && selectedCountry.code && selectedCountry.code.length > 0;
  }, [selectedCountry]);

  // Handle calculation result from Summary component
  const handleCalculationComplete = (result: CalculationResult) => {
    if (onCalculate) {
      onCalculate(result);
    }
  };

  // Conditional render: show empty state if no country selected
  if (!hasCountrySelected) {
    return (
      <div className={`${styles.calculatorEmpty} ${className}`} role="region" aria-label="Calculator empty state">
        <div className={styles.emptyStateContainer}>
          <div className={styles.emptyStateIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M12 3v18" />
            </svg>
          </div>
          <h2 className={styles.emptyStateTitle}>Select a Country</h2>
          <p className={styles.emptyStateMessage}>
            Choose a destination country from the map or list to begin calculating registration costs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.calculator} ${className}`}
      role="region"
      aria-label={`Calculator for ${selectedCountry?.name || 'selected country'}`}
    >
      <div className={styles.calculatorHeader}>
        <h1 className={styles.calculatorTitle}>Registration Calculator</h1>
        <p className={styles.calculatorSubtitle}>
          Pricing for: <strong>{selectedCountry?.name}</strong>
        </p>
      </div>

      <div className={styles.calculatorContent}>
        {/* Left Column: Options Selector (Mobile: full width, Desktop: 1/3) */}
        <div className={styles.optionsSelectorColumn}>
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionTitle}>Customize Your Registration</h2>
            <OptionSelector />
          </div>
        </div>

        {/* Right Column: Price Breakdown and Summary (Mobile: full width, Desktop: 2/3) */}
        <div className={styles.priceColumn}>
          {/* Price Breakdown Section */}
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionTitle}>Price Breakdown</h2>
            <PriceBreakdown />
          </div>

          {/* Summary Section */}
          <div className={styles.sectionWrapper}>
            <Summary onProceedClick={() => handleCalculationComplete({
              basePrice: 0,
              servicesPrice: 0,
              totalPrice: 0,
              country: selectedCountry?.name || '',
              numberOfClasses: 1
            })} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
