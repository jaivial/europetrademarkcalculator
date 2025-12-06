# Frontend Task 008: i18n Setup & English Translations

## Metadata
- **Task**: 8 of 15
- **Area**: Frontend
- **Feature**: Internationalization Setup & English Translations
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Set up the complete i18next internationalization infrastructure with full English translation file. This establishes the foundation for multi-language support across 10 European languages. Includes i18next configuration with fallback language, initialization code, comprehensive English translations for all UI labels, buttons, calculator terms, country names, error messages, and validation text.

---

## Subtasks

### Subtask 008.1: i18next Configuration

#### Status
status: pending

#### Objective
Create i18next configuration file with complete settings for multi-language support across 10 European languages.

#### Context
i18next must be configured with English as fallback language, lazy loading of translation files, proper formatting options, and interpolation support for dynamic text. Configuration must be centralized and reusable across the entire application.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/config.ts` - i18next configuration settings

#### Implementation

```typescript
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * i18next configuration
 * Supports 10 European languages with English as fallback
 */

export const i18nConfig = {
  // Supported language codes
  supportedLanguages: [
    'en', // English
    'es', // Spanish
    'fr', // French
    'de', // German
    'it', // Italian
    'pt', // Portuguese
    'nl', // Dutch
    'pl', // Polish
    'sv', // Swedish
    'el', // Greek
  ] as const,

  // Default and fallback language
  defaultLanguage: 'en' as const,
  fallbackLanguage: 'en' as const,

  // Namespaces for better organization
  namespaces: ['common', 'calculator', 'countries', 'errors', 'validation'],
  defaultNamespace: 'common',

  // i18next options
  i18nextOptions: {
    // Detection
    fallbackLng: 'en',
    fallbackNS: 'common',

    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes values
      formatSeparator: ',',
      format: (value: any, format?: string) => {
        if (format === 'number') {
          return new Intl.NumberFormat('en-US').format(value);
        }
        if (format === 'currency') {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
          }).format(value);
        }
        if (format === 'uppercase') {
          return String(value).toUpperCase();
        }
        if (format === 'lowercase') {
          return String(value).toLowerCase();
        }
        return value;
      },
    },

    // Pluralization
    pluralSeparator: '_',
    contextSeparator: '_',

    // Resource loading
    ns: ['common', 'calculator', 'countries', 'errors', 'validation'],
    defaultNS: 'common',

    // Other options
    returnNull: false,
    returnEmptyString: false,
    returnObjects: true,
    parseMissingKeyHandler: (key: string) => {
      console.warn(`Missing translation key: ${key}`);
      return key;
    },
  },
};

/**
 * Initialize i18next
 * Call this in main.tsx or index.tsx during app initialization
 */
export async function initializeI18n() {
  // Import English translations
  const enTranslations = await import('./locales/en.json');

  i18next
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          common: enTranslations.default.common,
          calculator: enTranslations.default.calculator,
          countries: enTranslations.default.countries,
          errors: enTranslations.default.errors,
          validation: enTranslations.default.validation,
        },
      },
      lng: 'en',
      fallbackLng: 'en',
      ns: ['common', 'calculator', 'countries', 'errors', 'validation'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
        formatSeparator: ',',
      },
      react: {
        useSuspense: false, // Set to true if using React.lazy
      },
    });

  return i18next;
}

export default i18nConfig;
```

#### Acceptance Criteria
- [ ] All 10 European languages registered
- [ ] English set as fallback language
- [ ] Namespaces defined for content organization
- [ ] Interpolation configured for dynamic text
- [ ] Number and currency formatting functions included
- [ ] Pluralization support configured
- [ ] Missing key warning handler present
- [ ] initializeI18n function creates proper resource structure

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

### Subtask 008.2: i18n Index & Initialization

#### Status
status: pending

#### Objective
Create i18n index file with initialization hook and context setup for React integration.

#### Context
The i18n module must export initialization logic and provide hooks for components to access translations. Must support both initialization during app startup and runtime language switching via Jotai atoms.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/index.ts` - i18n module entry point and exports

#### Implementation

```typescript
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { initializeI18n } from './config';

/**
 * Re-export initialization function
 */
export { initializeI18n } from './config';
export { default as i18nConfig } from './config';

/**
 * Initialize i18n on app startup
 * Call this in main.tsx or App.tsx
 */
export function setupI18n() {
  return initializeI18n();
}

/**
 * Custom hook for translation with automatic language switching
 * Combines useTranslation from react-i18next with Jotai language atom
 *
 * @param namespace - Optional namespace override (defaults to 'common')
 * @returns Translation function and i18n instance
 *
 * @example
 * const { t } = useI18n('calculator');
 * return <h1>{t('title')}</h1>
 */
export function useI18n(namespace?: string) {
  const { t, i18n } = useTranslation(namespace);
  const [language] = useAtom(languageAtom);

  // Sync i18next language with Jotai atom
  if (i18n.language !== language) {
    i18n.changeLanguage(language);
  }

  return { t, i18n };
}

/**
 * Custom hook for accessing current language
 * @returns Current language code and language metadata
 */
export function useCurrentLanguage() {
  const [language] = useAtom(languageAtom);
  return language;
}

/**
 * Custom hook for changing language
 * Updates both i18next and Jotai atom
 */
export function useChangeLanguage() {
  const [, setLanguage] = useAtom(languageAtom);

  return (newLanguage: string) => {
    i18next.changeLanguage(newLanguage);
    setLanguage(newLanguage as any);
  };
}

/**
 * Helper to get translation for static contexts (outside React components)
 * Use sparingly - prefer useI18n hook in components
 */
export function getTranslation(
  key: string,
  namespace: string = 'common',
  options?: any
) {
  return i18next.t(key, { ns: namespace, ...options });
}

/**
 * Helper to format numbers according to current language locale
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  const language = i18next.language || 'en';
  return new Intl.NumberFormat(language, options).format(value);
}

/**
 * Helper to format currency according to current language locale
 */
export function formatCurrency(value: number, currency: string = 'EUR') {
  const language = i18next.language || 'en';
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Re-export react-i18next hooks for direct use
 */
export { useTranslation } from 'react-i18next';
export type { i18n as I18nInstance } from 'i18next';
```

#### Acceptance Criteria
- [ ] setupI18n function exported for app initialization
- [ ] useI18n hook integrates react-i18next with Jotai language atom
- [ ] useCurrentLanguage hook returns active language
- [ ] useChangeLanguage hook updates both i18next and atom
- [ ] getTranslation helper for static contexts
- [ ] formatNumber utility function
- [ ] formatCurrency utility function
- [ ] All language changes synchronized between i18next and Jotai

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

### Subtask 008.3: English Translation File - Common & Calculator Namespaces

#### Status
status: pending

#### Objective
Create comprehensive English translation file with common UI labels, buttons, and calculator-related terms.

#### Context
English (en.json) serves as the base language and source of truth. Includes common UI elements (headers, buttons, navigation), calculator interface labels, registration types, optional services, and number classes terminology.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/en.json` - Complete English translations (part 1)

#### Implementation

```json
{
  "common": {
    "appTitle": "Brand Registration Calculator",
    "appDescription": "Calculate brand registration costs across European countries",
    "language": "Language",
    "selectLanguage": "Select Language",
    "theme": "Theme",
    "darkMode": "Dark Mode",
    "lightMode": "Light Mode",
    "loading": "Loading...",
    "error": "Error",
    "warning": "Warning",
    "success": "Success",
    "info": "Info",
    "ok": "OK",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "submit": "Submit",
    "reset": "Reset",
    "apply": "Apply",
    "search": "Search",
    "clear": "Clear",
    "filter": "Filter",
    "sort": "Sort",
    "copy": "Copy",
    "download": "Download",
    "export": "Export",
    "import": "Import",
    "settings": "Settings",
    "help": "Help",
    "about": "About",
    "contact": "Contact",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "copyright": "All rights reserved",
    "version": "Version",
    "noResults": "No results found",
    "loading_data": "Loading data...",
    "try_again": "Try Again",
    "go_back": "Go Back"
  },

  "calculator": {
    "title": "Brand Registration Calculator",
    "subtitle": "Select a country and calculate your registration costs",
    "selectCountry": "Select a Country",
    "selectedCountry": "Selected Country",
    "numberOfClasses": "Number of Classes",
    "numberOfClasses_one": "1 Class",
    "numberOfClasses_other": "{{count}} Classes",
    "classesInfo": "A class covers specific goods or services. You can register up to 45 classes.",
    "registrationType": "Registration Type",
    "standard": "Standard",
    "standardDescription": "Normal processing",
    "express": "Express",
    "expressDescription": "Faster processing",
    "priority": "Priority",
    "priorityDescription": "Fastest processing",
    "optionalServices": "Optional Services",
    "monitoring": "Trademark Monitoring",
    "monitoringDescription": "Monitor unauthorized use of your brand",
    "legalSupport": "Legal Support",
    "legalSupportDescription": "Professional legal assistance",
    "fastTrack": "Fast Track Processing",
    "fastTrackDescription": "Expedited examination and approval",
    "baseFee": "Base Fee",
    "serviceFees": "Service Fees",
    "totalPrice": "Total Price",
    "priceBreakdown": "Price Breakdown",
    "perClass": "per class",
    "processing": "Processing",
    "estimated": "Estimated",
    "actualPrice": "Actual price may vary",
    "noCountrySelected": "No country selected",
    "selectCountryFirst": "Please select a country first",
    "recalculate": "Recalculate",
    "getQuote": "Get Quote",
    "requestDetails": "Request Details",
    "continueApplication": "Continue Application",
    "viewSummary": "View Summary",
    "class_one": "1 class",
    "class_other": "{{count}} classes",
    "registration_type_label": "Registration Type: {{type}}",
    "services_label": "Optional Services: {{services}}"
  },

  "countries": {
    "selectCountry": "Select a Country",
    "allCountries": "All Countries",
    "filterByContinent": "Filter by Continent",
    "europe": "Europe",
    "asia": "Asia",
    "africa": "Africa",
    "americas": "Americas",
    "oceania": "Oceania",
    "worldMap": "World Map",
    "countryList": "Country List",
    "searchCountries": "Search countries...",
    "clearSearch": "Clear search",
    "noCountriesFound": "No countries found",
    "continentFilter": "Continent Filter",
    "countryCode": "Code",
    "EU": "European Union",
    "isEUMember": "EU Member",
    "nonEUMember": "Non-EU Member",
    "countryInfo": "Country Information",
    "selectToView": "Select a country to view information",
    "AT": "Austria",
    "BE": "Belgium",
    "BG": "Bulgaria",
    "HR": "Croatia",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "EE": "Estonia",
    "FI": "Finland",
    "FR": "France",
    "DE": "Germany",
    "GR": "Greece",
    "HU": "Hungary",
    "IE": "Ireland",
    "IT": "Italy",
    "LV": "Latvia",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MT": "Malta",
    "NL": "Netherlands",
    "PL": "Poland",
    "PT": "Portugal",
    "RO": "Romania",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ES": "Spain",
    "SE": "Sweden",
    "GB": "United Kingdom",
    "CH": "Switzerland",
    "NO": "Norway",
    "IS": "Iceland",
    "TR": "Turkey",
    "GE": "Georgia",
    "KZ": "Kazakhstan",
    "RU": "Russia",
    "BY": "Belarus",
    "UA": "Ukraine",
    "MD": "Moldova",
    "RS": "Serbia",
    "BA": "Bosnia and Herzegovina",
    "ME": "Montenegro",
    "MK": "North Macedonia",
    "AL": "Albania",
    "AE": "United Arab Emirates",
    "SA": "Saudi Arabia",
    "CN": "China",
    "JP": "Japan",
    "IN": "India",
    "BR": "Brazil",
    "MX": "Mexico",
    "US": "United States",
    "CA": "Canada",
    "AU": "Australia",
    "NZ": "New Zealand"
  },

  "errors": {
    "generic": "An error occurred",
    "networkError": "Network error. Please check your connection.",
    "serverError": "Server error. Please try again later.",
    "notFound": "Page not found",
    "unauthorized": "You are not authorized to perform this action",
    "forbidden": "Access forbidden",
    "badRequest": "Invalid request",
    "timeout": "Request timed out. Please try again.",
    "invalidCountry": "Invalid country selection",
    "invalidNumberOfClasses": "Number of classes must be between 1 and 45",
    "invalidRegistrationType": "Invalid registration type selected",
    "minimumClassesRequired": "At least 1 class is required",
    "maximumClassesExceeded": "Maximum 45 classes allowed",
    "countryNotSelected": "Please select a country before proceeding",
    "loadingFailed": "Failed to load data. Please refresh the page.",
    "saveFailed": "Failed to save changes",
    "deleteFailed": "Failed to delete item",
    "updateFailed": "Failed to update item",
    "contactSupport": "Please contact support if the problem persists.",
    "tryAgainLater": "Please try again later.",
    "unexpected": "An unexpected error occurred",
    "sessionExpired": "Your session has expired. Please refresh the page.",
    "maintenanceMode": "The application is under maintenance. Please try again later."
  },

  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "phone": "Please enter a valid phone number",
    "minLength": "Must be at least {{min}} characters",
    "maxLength": "Must not exceed {{max}} characters",
    "pattern": "Invalid format",
    "number": "Must be a valid number",
    "integer": "Must be a whole number",
    "min": "Must be at least {{min}}",
    "max": "Must not exceed {{max}}",
    "url": "Please enter a valid URL",
    "match": "Fields do not match",
    "custom": "Invalid value",
    "classesRange": "Number of classes must be between 1 and 45",
    "positiveNumber": "Must be a positive number",
    "firstName": "Please enter a valid first name",
    "lastName": "Please enter a valid last name",
    "companyName": "Please enter a valid company name",
    "trademarkName": "Please enter a valid trademark name",
    "description": "Please provide a valid description",
    "address": "Please enter a valid address",
    "city": "Please enter a valid city",
    "postalCode": "Please enter a valid postal code",
    "country": "Please select a country",
    "acceptTerms": "You must accept the terms and conditions",
    "confirmPassword": "Passwords do not match",
    "passwordStrength": "Password must be strong"
  }
}
```

#### Acceptance Criteria
- [ ] Common namespace contains all UI labels and buttons
- [ ] Calculator namespace contains pricing and options terminology
- [ ] Countries namespace includes all country names and continent filters
- [ ] Errors namespace covers all error scenarios
- [ ] Validation namespace includes all form validation messages
- [ ] Pluralization keys support singular/plural forms
- [ ] Interpolation placeholders use {{variable}} syntax
- [ ] JSON structure valid and parseable
- [ ] All keys are lowercase with camelCase for multi-word keys

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify JSON is valid:
cat src/i18n/locales/en.json | node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync(0, 'utf-8')), null, 2))"
```

---

### Subtask 008.4: English Translations - Remaining Namespaces

#### Status
status: pending

#### Objective
Complete the English translation file with any additional content, enhance existing translations with contextual variants, and verify complete coverage.

#### Context
This subtask ensures comprehensive translation coverage for edge cases, detailed descriptions, help text, accessibility labels, and any dynamic content that wasn't covered in subtask 3. Also includes setup instructions for loading translations.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/en.json` - Complete English translations (enhanced version)

#### Implementation

```json
{
  "common": {
    "appTitle": "Brand Registration Calculator",
    "appDescription": "Calculate brand registration costs across European countries",
    "language": "Language",
    "selectLanguage": "Select Language",
    "theme": "Theme",
    "darkMode": "Dark Mode",
    "lightMode": "Light Mode",
    "loading": "Loading...",
    "error": "Error",
    "warning": "Warning",
    "success": "Success",
    "info": "Info",
    "ok": "OK",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "submit": "Submit",
    "reset": "Reset",
    "apply": "Apply",
    "search": "Search",
    "clear": "Clear",
    "filter": "Filter",
    "sort": "Sort",
    "copy": "Copy",
    "download": "Download",
    "export": "Export",
    "import": "Import",
    "settings": "Settings",
    "help": "Help",
    "about": "About",
    "contact": "Contact",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "copyright": "All rights reserved",
    "version": "Version",
    "noResults": "No results found",
    "loading_data": "Loading data...",
    "try_again": "Try Again",
    "go_back": "Go Back",
    "description": "Description",
    "details": "Details",
    "summary": "Summary",
    "status": "Status",
    "active": "Active",
    "inactive": "Inactive",
    "pending": "Pending",
    "completed": "Completed",
    "failed": "Failed",
    "optional": "Optional",
    "required": "Required",
    "hint": "Hint"
  },

  "calculator": {
    "title": "Brand Registration Calculator",
    "subtitle": "Select a country and calculate your registration costs",
    "selectCountry": "Select a Country",
    "selectedCountry": "Selected Country",
    "numberOfClasses": "Number of Classes",
    "numberOfClasses_one": "1 Class",
    "numberOfClasses_other": "{{count}} Classes",
    "classesInfo": "A class covers specific goods or services. You can register up to 45 classes.",
    "registrationType": "Registration Type",
    "standard": "Standard",
    "standardDescription": "Normal processing",
    "express": "Express",
    "expressDescription": "Faster processing",
    "priority": "Priority",
    "priorityDescription": "Fastest processing",
    "optionalServices": "Optional Services",
    "monitoring": "Trademark Monitoring",
    "monitoringDescription": "Monitor unauthorized use of your brand",
    "legalSupport": "Legal Support",
    "legalSupportDescription": "Professional legal assistance",
    "fastTrack": "Fast Track Processing",
    "fastTrackDescription": "Expedited examination and approval",
    "baseFee": "Base Fee",
    "serviceFees": "Service Fees",
    "totalPrice": "Total Price",
    "priceBreakdown": "Price Breakdown",
    "perClass": "per class",
    "processing": "Processing",
    "estimated": "Estimated",
    "actualPrice": "Actual price may vary",
    "noCountrySelected": "No country selected",
    "selectCountryFirst": "Please select a country first",
    "recalculate": "Recalculate",
    "getQuote": "Get Quote",
    "requestDetails": "Request Details",
    "continueApplication": "Continue Application",
    "viewSummary": "View Summary",
    "class_one": "1 class",
    "class_other": "{{count}} classes",
    "registration_type_label": "Registration Type: {{type}}",
    "services_label": "Optional Services: {{services}}",
    "currencyEUR": "EUR",
    "currencyUSD": "USD",
    "currencyGBP": "GBP",
    "fee": "Fee",
    "tax": "Tax",
    "discount": "Discount",
    "subtotal": "Subtotal",
    "estimatedTotal": "Estimated Total",
    "finalTotal": "Final Total",
    "priceInclusive": "Price includes all taxes",
    "priceExclusive": "Price excludes taxes",
    "updateCalculation": "Update Calculation",
    "helpText": "Adjust the settings above to see real-time pricing",
    "moreInfo": "More Information",
    "learnMore": "Learn More",
    "faq": "Frequently Asked Questions"
  },

  "countries": {
    "selectCountry": "Select a Country",
    "allCountries": "All Countries",
    "filterByContinent": "Filter by Continent",
    "europe": "Europe",
    "asia": "Asia",
    "africa": "Africa",
    "americas": "Americas",
    "oceania": "Oceania",
    "worldMap": "World Map",
    "countryList": "Country List",
    "searchCountries": "Search countries...",
    "clearSearch": "Clear search",
    "noCountriesFound": "No countries found",
    "continentFilter": "Continent Filter",
    "countryCode": "Code",
    "EU": "European Union",
    "isEUMember": "EU Member",
    "nonEUMember": "Non-EU Member",
    "countryInfo": "Country Information",
    "selectToView": "Select a country to view information",
    "continent": "Continent",
    "capital": "Capital",
    "population": "Population",
    "area": "Area",
    "language_code": "Language Code",
    "currency": "Currency",
    "joinedEU": "Joined EU",
    "timezone": "Timezone",
    "dialingCode": "Dialing Code",
    "AT": "Austria",
    "BE": "Belgium",
    "BG": "Bulgaria",
    "HR": "Croatia",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "EE": "Estonia",
    "FI": "Finland",
    "FR": "France",
    "DE": "Germany",
    "GR": "Greece",
    "HU": "Hungary",
    "IE": "Ireland",
    "IT": "Italy",
    "LV": "Latvia",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MT": "Malta",
    "NL": "Netherlands",
    "PL": "Poland",
    "PT": "Portugal",
    "RO": "Romania",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ES": "Spain",
    "SE": "Sweden",
    "GB": "United Kingdom",
    "CH": "Switzerland",
    "NO": "Norway",
    "IS": "Iceland",
    "TR": "Turkey",
    "GE": "Georgia",
    "KZ": "Kazakhstan",
    "RU": "Russia",
    "BY": "Belarus",
    "UA": "Ukraine",
    "MD": "Moldova",
    "RS": "Serbia",
    "BA": "Bosnia and Herzegovina",
    "ME": "Montenegro",
    "MK": "North Macedonia",
    "AL": "Albania",
    "AE": "United Arab Emirates",
    "SA": "Saudi Arabia",
    "CN": "China",
    "JP": "Japan",
    "IN": "India",
    "BR": "Brazil",
    "MX": "Mexico",
    "US": "United States",
    "CA": "Canada",
    "AU": "Australia",
    "NZ": "New Zealand",
    "viewMap": "View on Map",
    "zoomIn": "Zoom In",
    "zoomOut": "Zoom Out",
    "resetView": "Reset View"
  },

  "errors": {
    "generic": "An error occurred",
    "networkError": "Network error. Please check your connection.",
    "serverError": "Server error. Please try again later.",
    "notFound": "Page not found",
    "unauthorized": "You are not authorized to perform this action",
    "forbidden": "Access forbidden",
    "badRequest": "Invalid request",
    "timeout": "Request timed out. Please try again.",
    "invalidCountry": "Invalid country selection",
    "invalidNumberOfClasses": "Number of classes must be between 1 and 45",
    "invalidRegistrationType": "Invalid registration type selected",
    "minimumClassesRequired": "At least 1 class is required",
    "maximumClassesExceeded": "Maximum 45 classes allowed",
    "countryNotSelected": "Please select a country before proceeding",
    "loadingFailed": "Failed to load data. Please refresh the page.",
    "saveFailed": "Failed to save changes",
    "deleteFailed": "Failed to delete item",
    "updateFailed": "Failed to update item",
    "contactSupport": "Please contact support if the problem persists.",
    "tryAgainLater": "Please try again later.",
    "unexpected": "An unexpected error occurred",
    "sessionExpired": "Your session has expired. Please refresh the page.",
    "maintenanceMode": "The application is under maintenance. Please try again later.",
    "pageNotFound": "404 - Page Not Found",
    "goHome": "Go to Home Page",
    "reportIssue": "Report this issue",
    "errorCode": "Error Code: {{code}}",
    "errorMessage": "Error Message: {{message}}",
    "timestamp": "Timestamp: {{time}}",
    "retrying": "Retrying...",
    "connectionLost": "Connection lost. Attempting to reconnect...",
    "offline": "You appear to be offline"
  },

  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "phone": "Please enter a valid phone number",
    "minLength": "Must be at least {{min}} characters",
    "maxLength": "Must not exceed {{max}} characters",
    "pattern": "Invalid format",
    "number": "Must be a valid number",
    "integer": "Must be a whole number",
    "min": "Must be at least {{min}}",
    "max": "Must not exceed {{max}}",
    "url": "Please enter a valid URL",
    "match": "Fields do not match",
    "custom": "Invalid value",
    "classesRange": "Number of classes must be between 1 and 45",
    "positiveNumber": "Must be a positive number",
    "firstName": "Please enter a valid first name",
    "lastName": "Please enter a valid last name",
    "companyName": "Please enter a valid company name",
    "trademarkName": "Please enter a valid trademark name",
    "description": "Please provide a valid description",
    "address": "Please enter a valid address",
    "city": "Please enter a valid city",
    "postalCode": "Please enter a valid postal code",
    "country": "Please select a country",
    "acceptTerms": "You must accept the terms and conditions",
    "confirmPassword": "Passwords do not match",
    "passwordStrength": "Password must be strong",
    "fieldTooShort": "This field is too short",
    "fieldTooLong": "This field is too long",
    "invalidCharacters": "This field contains invalid characters",
    "onlyNumbers": "This field must contain only numbers",
    "onlyLetters": "This field must contain only letters",
    "alphanumeric": "This field must contain only letters and numbers",
    "noSpaces": "This field cannot contain spaces",
    "mustBeUnique": "This value is already taken",
    "invalidDate": "Please enter a valid date",
    "dateInPast": "Date must be in the future",
    "dateInFuture": "Date must be in the past",
    "futureDate": "Please select a future date",
    "pastDate": "Please select a past date"
  }
}
```

#### Acceptance Criteria
- [ ] Complete en.json file created with all namespaces
- [ ] All common UI elements translated
- [ ] All calculator terms and options translated
- [ ] All country names and regions translated
- [ ] All error messages translated
- [ ] All validation messages translated
- [ ] Pluralization rules applied correctly
- [ ] Interpolation syntax consistent
- [ ] JSON structure valid and well-formatted
- [ ] File location: src/i18n/locales/en.json

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Test JSON validity:
node -e "const fs = require('fs'); const json = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf-8')); console.log('English translations loaded:', Object.keys(json).length, 'namespaces')"
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/i18n/config.ts`
- `src/i18n/index.ts`
- `src/i18n/locales/en.json`

### Imports From Existing Code
- `i18next` - from package.json (task 1)
- `react-i18next` - from package.json (task 1)
- `jotai` - from package.json (task 1)
- `@/atoms/languageAtom` - from task 2

### Exports For Other Code
- `setupI18n()` - Initialization function for main.tsx
- `useI18n()` - Hook for translations in components
- `useCurrentLanguage()` - Hook to get active language
- `useChangeLanguage()` - Hook to switch languages
- `getTranslation()` - Static translation helper
- `formatNumber()` - Number formatting utility
- `formatCurrency()` - Currency formatting utility
- Complete English translation object for all 5 namespaces

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
# Test i18n configuration
node -e "const config = require('./src/i18n/config.ts'); console.log('i18n configured with', config.default.supportedLanguages.length, 'languages')"
```

---

## Parallelization Notes
- All subtasks in this task can run in parallel
- Each subtask owns exclusive files
- Subtask 1 (config) and 2 (index) are independent
- Subtask 3 and 4 (translations) can be merged or split
- No subtask depends on another subtask's output
- i18n is ready after subtasks 1-3 complete; subtask 4 is for completeness
- Translation file (subtasks 3-4) forms the foundation for translation in task 9+
