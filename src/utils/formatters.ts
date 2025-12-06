// src/utils/formatters.ts

type CurrencyCode = 'EUR' | 'GBP' | 'USD' | 'CHF' | 'PLN' | 'CZK';

interface CurrencyFormatOptions {
  currency: CurrencyCode;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

interface NumberFormatOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

/**
 * Format number as currency with proper locale and currency code
 * @param amount - The amount to format
 * @param options - Currency formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions
): string {
  const {
    currency,
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  // Map currency to proper locale for display
  const currencyLocaleMap: Record<CurrencyCode, string> = {
    EUR: 'de-DE',
    GBP: 'en-GB',
    USD: 'en-US',
    CHF: 'fr-CH',
    PLN: 'pl-PL',
    CZK: 'cs-CZ',
  };

  const displayLocale = currencyLocaleMap[currency] || locale;

  try {
    return new Intl.NumberFormat(displayLocale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  } catch (error) {
    console.error(`Failed to format currency ${currency}:`, error);
    return `${currency} ${amount.toFixed(minimumFractionDigits)}`;
  }
}

/**
 * Format number with locale-aware thousand separators and decimals
 * @param num - The number to format
 * @param options - Number formatting options
 * @returns Formatted number string
 */
export function formatNumber(
  num: number,
  options: NumberFormatOptions = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping = true,
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
    }).format(num);
  } catch (error) {
    console.error('Failed to format number:', error);
    return num.toString();
  }
}

/**
 * Format date with locale awareness
 * @param date - The date to format
 * @param locale - Locale string (default: en-US)
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  } catch (error) {
    console.error('Failed to format date:', error);
    return String(date);
  }
}

/**
 * Format date as short date (MM/DD/YYYY or DD/MM/YYYY based on locale)
 * @param date - The date to format
 * @param locale - Locale string
 * @returns Formatted short date
 */
export function formatShortDate(
  date: Date | string | number,
  locale: string = 'en-US'
): string {
  return formatDate(date, locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Format date with time
 * @param date - The date to format
 * @param locale - Locale string
 * @returns Formatted date and time
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = 'en-US'
): string {
  return formatDate(date, locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format percentage value
 * @param value - The percentage value (0-100)
 * @param fractionDigits - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  fractionDigits: number = 1
): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/**
 * Abbreviate large numbers (1000 -> 1K, 1000000 -> 1M)
 * @param num - The number to abbreviate
 * @param fractionDigits - Number of decimal places
 * @returns Abbreviated number string
 */
export function abbreviateNumber(
  num: number,
  fractionDigits: number = 1
): string {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1000000) {
    return `${sign}${(absNum / 1000000).toFixed(fractionDigits)}M`;
  }
  if (absNum >= 1000) {
    return `${sign}${(absNum / 1000).toFixed(fractionDigits)}K`;
  }
  return num.toString();
}

export type { CurrencyCode, CurrencyFormatOptions, NumberFormatOptions };
