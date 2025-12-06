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
