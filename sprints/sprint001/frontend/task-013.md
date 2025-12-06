# Frontend Task 013: Utility Functions

## Metadata
- **Task**: 13 of 40
- **Area**: Frontend
- **Feature**: Utility Functions & Helpers
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a comprehensive set of utility functions for the entire application including currency and number formatters, input validators, price calculations with tax support, and responsive breakpoint detection helpers. These pure utility functions are independent of components and will be used across the application for consistent data handling and formatting.

---

## Subtasks

### Subtask 013.1: Currency & Number Formatters

#### Status
status: pending

#### Objective
Create formatter utility functions for currency formatting across multiple currencies (EUR, GBP, USD, CHF, PLN, CZK) and number formatting with proper localization.

#### Context
The application must handle multiple European currencies for brand registration costs. Formatters must support different locales and currency codes, with proper decimal places and thousand separators based on locale conventions.

#### Files to Create/Modify (Exclusive Ownership)
- `src/utils/formatters.ts` - Currency and number formatting functions
- `src/utils/formatters.test.ts` - Unit tests for formatters

#### Implementation

```typescript
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
    return `${sign}${(num / 1000000).toFixed(fractionDigits)}M`;
  }
  if (absNum >= 1000) {
    return `${sign}${(num / 1000).toFixed(fractionDigits)}K`;
  }
  return num.toString();
}
```

#### Acceptance Criteria
- [ ] formatCurrency works with all supported currencies (EUR, GBP, USD, CHF, PLN, CZK)
- [ ] Locale-aware formatting applied correctly
- [ ] formatNumber handles thousand separators properly
- [ ] Date formatting functions handle various input types
- [ ] Percentage and abbreviation formatters work correctly
- [ ] Error handling for invalid inputs
- [ ] No external dependencies beyond built-in Intl API
- [ ] All functions are pure (no side effects)

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testNamePattern="formatters" --testPathPattern="formatters"
```

---

### Subtask 013.2: Input Validators

#### Status
status: pending

#### Objective
Create validator utility functions for common input validation patterns including email, phone numbers, URLs, and custom validation rules.

#### Context
Input validation must be consistent across forms and components. Validators check user input before submission and provide clear error messages. All validators are pure functions that return true/false or validation result objects.

#### Files to Create/Modify (Exclusive Ownership)
- `src/utils/validators.ts` - Input validation functions
- `src/utils/validators.test.ts` - Unit tests for validators

#### Implementation

```typescript
// src/utils/validators.ts

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  return { isValid: true };
}

/**
 * Validate phone number (international format)
 * @param phone - Phone number to validate
 * @returns Validation result
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Allow +, digits, spaces, dashes, parentheses
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  // Should have at least 7 digits
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) {
    return { isValid: false, error: 'Phone number too short' };
  }

  return { isValid: true };
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns Validation result
 */
export function validateURL(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate string length
 * @param value - String to validate
 * @param minLength - Minimum length
 * @param maxLength - Maximum length
 * @returns Validation result
 */
export function validateLength(
  value: string,
  minLength: number = 0,
  maxLength: number = 255
): ValidationResult {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `Must be at least ${minLength} characters`,
    };
  }

  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `Must be no more than ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validate positive number
 * @param value - Number to validate
 * @param allowZero - Whether to allow zero
 * @returns Validation result
 */
export function validatePositiveNumber(
  value: number,
  allowZero: boolean = true
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Must be a valid number' };
  }

  if (!allowZero && value === 0) {
    return { isValid: false, error: 'Must be greater than zero' };
  }

  if (value < 0) {
    return { isValid: false, error: 'Must be positive' };
  }

  return { isValid: true };
}

/**
 * Validate required field
 * @param value - Value to validate
 * @param fieldName - Name of field for error message
 * @returns Validation result
 */
export function validateRequired(
  value: unknown,
  fieldName: string = 'This field'
): ValidationResult {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validate minimum numeric value
 * @param value - Number to validate
 * @param minimum - Minimum allowed value
 * @returns Validation result
 */
export function validateMinimum(
  value: number,
  minimum: number
): ValidationResult {
  if (value < minimum) {
    return {
      isValid: false,
      error: `Must be at least ${minimum}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate maximum numeric value
 * @param value - Number to validate
 * @param maximum - Maximum allowed value
 * @returns Validation result
 */
export function validateMaximum(
  value: number,
  maximum: number
): ValidationResult {
  if (value > maximum) {
    return {
      isValid: false,
      error: `Must be no more than ${maximum}`,
    };
  }

  return { isValid: true };
}

/**
 * Custom validation with regex pattern
 * @param value - Value to validate
 * @param pattern - Regex pattern
 * @param errorMessage - Custom error message
 * @returns Validation result
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  errorMessage: string = 'Invalid format'
): ValidationResult {
  if (!pattern.test(value)) {
    return { isValid: false, error: errorMessage };
  }

  return { isValid: true };
}
```

#### Acceptance Criteria
- [ ] Email validation with RFC-compliant pattern
- [ ] Phone number validation supports international formats
- [ ] URL validation uses native URL constructor
- [ ] Length validation enforces min/max constraints
- [ ] Number validation checks for positive values
- [ ] Required field validation handles all falsy types
- [ ] All validators return consistent ValidationResult object
- [ ] Error messages are user-friendly

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testNamePattern="validators" --testPathPattern="validators"
```

---

### Subtask 013.3: Price Calculations & Tax

#### Status
status: pending

#### Objective
Create calculation utility functions for prices, taxes, discounts, and brand registration cost totals.

#### Context
The brand calculator must accurately compute registration costs across multiple countries with varying tax rates. Functions handle price totals, VAT/tax calculation, discounts, and per-country cost calculations. All calculations are precise to prevent rounding errors.

#### Files to Create/Modify (Exclusive Ownership)
- `src/utils/calculations.ts` - Price and tax calculation functions
- `src/utils/calculations.test.ts` - Unit tests for calculations

#### Implementation

```typescript
// src/utils/calculations.ts

export interface TaxCalculation {
  subtotal: number;
  taxAmount: number;
  total: number;
  taxRate: number;
}

export interface DiscountCalculation {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  discountPercentage: number;
}

/**
 * Calculate tax amount from subtotal
 * @param subtotal - Amount before tax
 * @param taxRate - Tax rate as decimal (0.19 for 19%)
 * @returns Tax amount (rounded to 2 decimals)
 */
export function calculateTax(
  subtotal: number,
  taxRate: number
): number {
  const taxAmount = subtotal * taxRate;
  return Math.round(taxAmount * 100) / 100;
}

/**
 * Calculate total with tax included
 * @param subtotal - Amount before tax
 * @param taxRate - Tax rate as decimal
 * @returns Tax calculation result
 */
export function calculateWithTax(
  subtotal: number,
  taxRate: number
): TaxCalculation {
  const taxAmount = calculateTax(subtotal, taxRate);
  const total = subtotal + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount,
    total: Math.round(total * 100) / 100,
    taxRate,
  };
}

/**
 * Calculate subtotal from total with tax included
 * @param total - Total amount including tax
 * @param taxRate - Tax rate as decimal
 * @returns Subtotal before tax
 */
export function calculateSubtotal(
  total: number,
  taxRate: number
): number {
  const subtotal = total / (1 + taxRate);
  return Math.round(subtotal * 100) / 100;
}

/**
 * Apply percentage discount to amount
 * @param amount - Original amount
 * @param discountPercentage - Discount as percentage (0-100)
 * @returns Discount calculation result
 */
export function applyDiscount(
  amount: number,
  discountPercentage: number
): DiscountCalculation {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  const discountAmount = (amount * discountPercentage) / 100;
  const finalAmount = amount - discountAmount;

  return {
    originalAmount: Math.round(amount * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100,
    discountPercentage,
  };
}

/**
 * Calculate total from array of items with quantities
 * @param items - Array of items with price and quantity
 * @returns Total sum of all items
 */
export function calculateTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return Math.round(total * 100) / 100;
}

/**
 * Calculate average price per item
 * @param items - Array of items with price
 * @returns Average price
 */
export function calculateAverage(items: Array<{ price: number }>): number {
  if (items.length === 0) return 0;

  const sum = items.reduce((total, item) => total + item.price, 0);
  const average = sum / items.length;

  return Math.round(average * 100) / 100;
}

/**
 * Calculate price with markup
 * @param basePrice - Original price
 * @param markupPercentage - Markup as percentage
 * @returns Price with markup applied
 */
export function applyMarkup(
  basePrice: number,
  markupPercentage: number
): number {
  const markupAmount = (basePrice * markupPercentage) / 100;
  const finalPrice = basePrice + markupAmount;

  return Math.round(finalPrice * 100) / 100;
}

/**
 * Calculate multiple tax rates (for different countries)
 * @param amount - Base amount
 * @param taxRates - Map of country code to tax rate
 * @returns Total tax across all rates
 */
export function calculateMultiCountryTax(
  amount: number,
  taxRates: Record<string, number>
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const [country, rate] of Object.entries(taxRates)) {
    result[country] = calculateTax(amount, rate);
  }

  return result;
}

/**
 * Calculate cumulative cost with progressive rates
 * @param baseAmount - Starting amount
 * @param rates - Array of progressive rate amounts
 * @returns Final amount after applying all progressive rates
 */
export function calculateProgressiveRate(
  baseAmount: number,
  rates: number[]
): number {
  let total = baseAmount;

  for (const rate of rates) {
    total = applyMarkup(total, rate);
  }

  return total;
}

/**
 * Round amount to nearest cent
 * @param amount - Amount to round
 * @returns Rounded amount
 */
export function roundToCent(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * Check if price calculation is valid (no negative amounts)
 * @param calculation - Tax calculation result
 * @returns True if all amounts are non-negative
 */
export function isValidCalculation(calculation: TaxCalculation): boolean {
  return (
    calculation.subtotal >= 0 &&
    calculation.taxAmount >= 0 &&
    calculation.total >= 0 &&
    calculation.taxRate >= 0
  );
}
```

#### Acceptance Criteria
- [ ] calculateTax correctly computes tax amounts
- [ ] calculateWithTax returns proper TaxCalculation object
- [ ] calculateSubtotal reverses tax calculation accurately
- [ ] applyDiscount handles percentage discounts correctly
- [ ] calculateTotal sums items with quantities
- [ ] All calculations rounded to 2 decimal places
- [ ] No floating-point precision errors
- [ ] Multi-country tax calculation works
- [ ] Error handling for invalid inputs

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testNamePattern="calculations" --testPathPattern="calculations"
```

---

### Subtask 013.4: Responsive Breakpoint Helpers

#### Status
status: pending

#### Objective
Create responsive utility functions for detecting device size breakpoints and applying responsive logic without component dependencies.

#### Context
The application supports responsive design from 200px to 3000px width. Helper functions detect current breakpoint, provide CSS media query strings, and enable responsive logic in utilities and hooks without component state dependencies.

#### Files to Create/Modify (Exclusive Ownership)
- `src/utils/responsive.ts` - Responsive breakpoint helpers
- `src/utils/responsive.test.ts` - Unit tests for responsive utilities

#### Implementation

```typescript
// src/utils/responsive.ts

export enum Breakpoint {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

export const BREAKPOINT_PIXELS: Record<Breakpoint, number> = {
  [Breakpoint.XS]: 200,
  [Breakpoint.SM]: 576,
  [Breakpoint.MD]: 768,
  [Breakpoint.LG]: 1024,
  [Breakpoint.XL]: 1280,
  [Breakpoint.XXL]: 1920,
};

export const BREAKPOINT_RANGES: Record<Breakpoint, [number, number]> = {
  [Breakpoint.XS]: [200, 575],
  [Breakpoint.SM]: [576, 767],
  [Breakpoint.MD]: [768, 1023],
  [Breakpoint.LG]: [1024, 1279],
  [Breakpoint.XL]: [1280, 1919],
  [Breakpoint.XXL]: [1920, 3000],
};

/**
 * Get current breakpoint based on window width
 * @returns Current breakpoint
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') {
    return Breakpoint.MD; // Default for SSR
  }

  const width = window.innerWidth;

  if (width < BREAKPOINT_PIXELS[Breakpoint.SM]) return Breakpoint.XS;
  if (width < BREAKPOINT_PIXELS[Breakpoint.MD]) return Breakpoint.SM;
  if (width < BREAKPOINT_PIXELS[Breakpoint.LG]) return Breakpoint.MD;
  if (width < BREAKPOINT_PIXELS[Breakpoint.XL]) return Breakpoint.LG;
  if (width < BREAKPOINT_PIXELS[Breakpoint.XXL]) return Breakpoint.XL;

  return Breakpoint.XXL;
}

/**
 * Check if current width matches or exceeds breakpoint
 * @param breakpoint - Breakpoint to check
 * @returns True if current width >= breakpoint width
 */
export function isBreakpointOrLarger(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return true;

  return window.innerWidth >= BREAKPOINT_PIXELS[breakpoint];
}

/**
 * Check if current width is smaller than breakpoint
 * @param breakpoint - Breakpoint to check
 * @returns True if current width < breakpoint width
 */
export function isBreakpointSmaller(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;

  return window.innerWidth < BREAKPOINT_PIXELS[breakpoint];
}

/**
 * Check if current width is within breakpoint range
 * @param breakpoint - Breakpoint to check
 * @returns True if width is within range
 */
export function isWithinBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;

  const [min, max] = BREAKPOINT_RANGES[breakpoint];
  return window.innerWidth >= min && window.innerWidth <= max;
}

/**
 * Get CSS media query string for breakpoint
 * @param breakpoint - Breakpoint to generate query for
 * @param maxOnly - If true, generates max-width query
 * @returns Media query string
 */
export function getMediaQuery(
  breakpoint: Breakpoint,
  maxOnly: boolean = false
): string {
  const pixels = BREAKPOINT_PIXELS[breakpoint];

  if (maxOnly) {
    return `(max-width: ${pixels - 1}px)`;
  }

  return `(min-width: ${pixels}px)`;
}

/**
 * Generate CSS media query for breakpoint range
 * @param breakpoint - Breakpoint to generate range query for
 * @returns Media query string
 */
export function getMediaQueryRange(breakpoint: Breakpoint): string {
  const [min, max] = BREAKPOINT_RANGES[breakpoint];
  return `(min-width: ${min}px) and (max-width: ${max}px)`;
}

/**
 * Get tailwind breakpoint class prefix
 * @param breakpoint - Breakpoint to get class for
 * @returns Tailwind breakpoint prefix (e.g., 'md:', 'lg:')
 */
export function getTailwindBreakpoint(breakpoint: Breakpoint): string {
  const tailwindMap: Record<Breakpoint, string> = {
    [Breakpoint.XS]: '',
    [Breakpoint.SM]: 'sm:',
    [Breakpoint.MD]: 'md:',
    [Breakpoint.LG]: 'lg:',
    [Breakpoint.XL]: 'xl:',
    [Breakpoint.XXL]: '2xl:',
  };

  return tailwindMap[breakpoint];
}

/**
 * Check if device is mobile (less than tablet width)
 * @returns True if width < MD breakpoint
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return window.innerWidth < BREAKPOINT_PIXELS[Breakpoint.MD];
}

/**
 * Check if device is tablet (MD to LG)
 * @returns True if width is in tablet range
 */
export function isTabletDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const width = window.innerWidth;
  return (
    width >= BREAKPOINT_PIXELS[Breakpoint.MD] &&
    width < BREAKPOINT_PIXELS[Breakpoint.LG]
  );
}

/**
 * Check if device is desktop (LG or larger)
 * @returns True if width >= LG breakpoint
 */
export function isDesktopDevice(): boolean {
  if (typeof window === 'undefined') return true;

  return window.innerWidth >= BREAKPOINT_PIXELS[Breakpoint.LG];
}

/**
 * Get responsive value based on current breakpoint
 * @param values - Map of breakpoint to value
 * @param defaultValue - Default value if breakpoint not found
 * @returns Value for current breakpoint
 */
export function getResponsiveValue<T>(
  values: Partial<Record<Breakpoint, T>>,
  defaultValue: T
): T {
  const current = getCurrentBreakpoint();
  return values[current] ?? defaultValue;
}

/**
 * Create responsive size helper (e.g., for font sizes)
 * @param sizes - Map of breakpoint to size value
 * @returns Function that returns size for current breakpoint
 */
export function createResponsiveSizeHelper(
  sizes: Partial<Record<Breakpoint, number>>
): () => number {
  return () => {
    const current = getCurrentBreakpoint();
    const size = sizes[current];

    if (size !== undefined) return size;

    // Fallback to closest smaller breakpoint
    const allBreakpoints = Object.values(Breakpoint);
    for (let i = allBreakpoints.indexOf(current); i >= 0; i--) {
      const bp = allBreakpoints[i] as Breakpoint;
      if (sizes[bp] !== undefined) return sizes[bp]!;
    }

    return 16; // Default fallback
  };
}
```

#### Acceptance Criteria
- [ ] getCurrentBreakpoint correctly identifies all 6 breakpoint ranges
- [ ] isBreakpointOrLarger and isBreakpointSmaller work accurately
- [ ] isWithinBreakpoint correctly checks range boundaries
- [ ] Media query generation produces valid CSS
- [ ] Device detection (mobile/tablet/desktop) works correctly
- [ ] getResponsiveValue returns correct value for breakpoint
- [ ] Handles server-side rendering (typeof window === 'undefined')
- [ ] Breakpoint constants match design system (200-3000px)

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testNamePattern="responsive" --testPathPattern="responsive"
```

---

### Subtask 013.5: Utility Index & Type Exports

#### Status
status: pending

#### Objective
Create unified index file that exports all utility functions and types for convenient imports across the application.

#### Context
The index file provides a single import location for all utilities. This makes it easy for other modules to import multiple utilities and keeps the imports organized. Also includes TypeScript type definitions for all utility interfaces.

#### Files to Create/Modify (Exclusive Ownership)
- `src/utils/index.ts` - Main utility index file
- `src/utils/types.ts` - Shared type definitions

#### Implementation

```typescript
// src/utils/index.ts

// Re-export all formatters
export {
  formatCurrency,
  formatNumber,
  formatDate,
  formatShortDate,
  formatDateTime,
  formatPercentage,
  abbreviateNumber,
  type CurrencyFormatOptions,
  type NumberFormatOptions,
} from './formatters';

// Re-export all validators
export {
  validateEmail,
  validatePhone,
  validateURL,
  validateLength,
  validatePositiveNumber,
  validateRequired,
  validateMinimum,
  validateMaximum,
  validatePattern,
  type ValidationResult,
} from './validators';

// Re-export all calculations
export {
  calculateTax,
  calculateWithTax,
  calculateSubtotal,
  applyDiscount,
  calculateTotal,
  calculateAverage,
  applyMarkup,
  calculateMultiCountryTax,
  calculateProgressiveRate,
  roundToCent,
  isValidCalculation,
  type TaxCalculation,
  type DiscountCalculation,
} from './calculations';

// Re-export all responsive utilities
export {
  getCurrentBreakpoint,
  isBreakpointOrLarger,
  isBreakpointSmaller,
  isWithinBreakpoint,
  getMediaQuery,
  getMediaQueryRange,
  getTailwindBreakpoint,
  isMobileDevice,
  isTabletDevice,
  isDesktopDevice,
  getResponsiveValue,
  createResponsiveSizeHelper,
  Breakpoint,
  BREAKPOINT_PIXELS,
  BREAKPOINT_RANGES,
  type Breakpoint as BreakpointType,
} from './responsive';

// Re-export shared types
export type {
  CurrencyCode,
  ValidationError,
  PriceRange,
  DeviceType,
} from './types';
```

```typescript
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
```

#### Acceptance Criteria
- [ ] All utility functions exported from index.ts
- [ ] All types exported from types.ts
- [ ] Named exports allow selective imports
- [ ] Import paths work with @ alias (@/utils)
- [ ] TypeScript types properly defined and exported
- [ ] No circular dependencies
- [ ] Index file is complete and organized
- [ ] Documentation comments included

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify imports work
npx tsc --noEmit
# Check that all exports are accessible
grep -r "export" src/utils/
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/utils/formatters.ts`
- `src/utils/formatters.test.ts`
- `src/utils/validators.ts`
- `src/utils/validators.test.ts`
- `src/utils/calculations.ts`
- `src/utils/calculations.test.ts`
- `src/utils/responsive.ts`
- `src/utils/responsive.test.ts`
- `src/utils/types.ts`
- `src/utils/index.ts`

### Imports From Existing Code
- None (pure utilities with no dependencies on other application code)
- Uses only built-in JavaScript APIs (Intl, Math, etc.)

### Exports For Other Code
- `formatCurrency` - Used by price display components
- `formatNumber` - Used by numeric display throughout app
- `formatDate` - Used by date display components
- `validateEmail`, `validatePhone`, etc. - Used by form components
- `calculateWithTax`, `calculateTotal` - Used by calculator logic
- `getCurrentBreakpoint`, `isMobileDevice`, etc. - Used by layout and responsive components

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
# Type check all utilities
npm run type-check

# Run all utility tests
npm test -- --testPathPattern="src/utils"

# Verify exports
npx tsc --noEmit

# Lint utilities
npm run lint -- src/utils/
```

---

## Parallelization Notes
- All 5 subtasks are completely independent and can run in parallel
- Each subtask owns exclusive files with no cross-dependencies
- No subtask imports from another subtask (except index imports from others)
- Subtask 013.5 can run in parallel with others (imports are re-exports)
- No runtime dependencies between subtasks
- All pure functions with no side effects or state management
- Test files can be created and run independently
