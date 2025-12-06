// src/utils/types.ts

/**
 * Supported currency codes
 */
export type CurrencyCode = 'EUR' | 'GBP' | 'USD' | 'CHF' | 'PLN' | 'CZK';

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Price range for cost estimates
 */
export interface PriceRange {
  min: number;
  max: number;
  average: number;
  currency: CurrencyCode;
}

/**
 * Device type classification
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Responsive configuration
 */
export interface ResponsiveConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

/**
 * Tax rate by country
 */
export interface CountryTaxRate {
  countryCode: string;
  countryName: string;
  taxRate: number;
}

/**
 * Format options interface
 */
export interface FormatOptions {
  locale?: string;
  timezone?: string;
}
