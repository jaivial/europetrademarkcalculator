/**
 * Central export for all custom hooks
 * Provides clean import paths for components
 */

// Theme hook
export { useTheme } from './useTheme';

/**
 * Type definitions for useTheme hook return value
 * Used to type component props and state
 */
export type { UseThemeReturn } from './useTheme';

// Language hook
export { useLanguage } from './useLanguage';

/**
 * Type definitions for useLanguage hook return value
 * Used to type component props and state
 */
export type { UseLanguageReturn } from './useLanguage';

// Country selection hooks
export {
  useCountrySelection,
  useSelectedCountry,
  useFilteredCountries,
  useSelectCountry,
  useCountrySearchQuery,
  findCountryByCode,
  findCountryByName,
  getCountriesByContinent,
} from './useCountrySelection';

/**
 * Type definitions for country selection
 */
export type { UseCountrySelectionReturn } from './useCountrySelection';
export type { Country } from '@/atoms/countryAtom';

// Calculator hook
export { useCalculator } from './useCalculator';

/**
 * Type definitions for useCalculator hook return value
 * Used to type component props and state
 */
export type { UseCalculatorReturn } from './useCalculator';

// Globe canvas dimensions hook
export { default as useGlobeCanvasDimensions } from './useGlobeCanvasDimensions';

// i18n hook
export { useI18n } from './useI18n';

// Future hooks will be exported here as they are created
// Examples:
// export { useGlobeControls } from './useGlobeControls';
