/**
 * Central export for all Jotai atoms
 * Import from '@/atoms' instead of individual files
 */

// Theme atoms
export {
  // Type exports
  type Theme,
  type ResolvedTheme,
  // Theme atoms
  themeAtom,
  resolvedThemeAtom,
  systemThemeAtom,
  supportsSystemThemeAtom,
  persistedThemeAtom,
  resolvedPersistedThemeAtom,
  isLocalStorageAvailableAtom,
  lastSavedThemeAtom,
  // Functions
  resolveTheme,
  detectSystemTheme,
  setupSystemThemeListener,
  applyThemeClass,
  getCurrentThemeFromDOM,
  clearThemeStorage,
  isValidTheme,
  setSafeTheme,
  getThemeFromStorage,
} from './themeAtom';

// Language atoms
export {
  type Language,
  type LanguageMetadata,
  SUPPORTED_LANGUAGES,
  LANGUAGE_METADATA,
  languageAtom,
  currentLanguageMetadataAtom,
  setLanguageAtom,
} from './languageAtom';

// Country atoms
export {
  type Country,
  type BrandRegistration,
  COUNTRIES,
  selectedCountryAtom,
  selectedCountryCodeAtom,
  searchQueryAtom,
  filteredCountriesAtom,
} from './countryAtom';

// Calculator atoms
// TODO: calculatorAtom.ts needs to be created
// export {
//   type RegistrationType,
//   type OptionalServices,
//   type CalculatorState,
//   calculatorStateAtom,
//   numberOfClassesAtom,
//   registrationTypeAtom,
//   optionalServicesAtom,
//   basePriceAtom,
//   servicesPriceAtom,
//   totalPriceAtom,
//   resetCalculatorAtom,
// } from './calculatorAtom';

// Navigation atoms
export {
  type NavigationTab,
  type TabMetadata,
  NAVIGATION_TABS,
  activeTabAtom,
  activeTabMetadataAtom,
  isWorldMapActiveAtom,
  isCountryListActiveAtom,
  availableTabsAtom,
  navigateToTabAtom,
  navigateToWorldMapAtom,
  navigateToCountryListAtom,
  toggleNavigationTabAtom,
} from './navigationAtom';

// Calculator atoms
export {
  // State atoms
  selectedCountriesAtom,
  selectedClassesAtom,
  filingTypeAtom,
  selectedOptionsAtom,
  priorityLevelAtom,

  // Derived atoms
  classCountAtom,
  hasSelectedCountriesAtom,
  hasSelectedClassesAtom,
  isReadyToCalculateAtom,
  selectedOptionsCountAtom,

  // Write atoms for state updates
  clearCalculatorAtom,
  addCountryAtom,
  removeCountryAtom,
  addClassAtom,
  removeClassAtom,
  addOptionAtom,
  removeOptionAtom,
  toggleOptionAtom,
  setCountriesAtom,
  setClassesAtom,
  setFilingTypeAtom,
  setOptionsAtom,
  setPriorityAtom,
} from './calculatorAtom';
