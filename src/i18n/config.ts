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
  namespaces: ['layout', 'common', 'calculator', 'countries', 'map', 'errors', 'footer', 'validation', 'legal', 'navigation'],
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
      format: (value: unknown, format?: string) => {
        if (format === 'number') {
          return new Intl.NumberFormat('en-US').format(value as number);
        }
        if (format === 'currency') {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
          }).format(value as number);
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
    ns: ['layout', 'common', 'calculator', 'countries', 'map', 'errors', 'footer', 'validation', 'legal', 'navigation'],
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
 * Initialize i18next with all 10 European languages
 * Call this in main.tsx or index.tsx during app initialization
 */
export async function initializeI18n() {
  // Import all language translations in parallel
  const [
    enTranslations,
    esTranslations,
    frTranslations,
    deTranslations,
    itTranslations,
    ptTranslations,
    nlTranslations,
    plTranslations,
    svTranslations,
    elTranslations,
  ] = await Promise.all([
    import('./locales/en.json'),
    import('./locales/es.json'),
    import('./locales/fr.json'),
    import('./locales/de.json'),
    import('./locales/it.json'),
    import('./locales/pt.json'),
    import('./locales/nl.json'),
    import('./locales/pl.json'),
    import('./locales/sv.json'),
    import('./locales/el.json'),
  ]);

  // Helper to extract namespaces from translation file
  // Handles different file structures gracefully
  const extractNamespaces = (translations: { default: Record<string, unknown> }) => {
    const t = translations.default;
    return {
      layout: (t.layout as Record<string, unknown>) || {},
      common: (t.common as Record<string, unknown>) || {},
      calculator: (t.calculator as Record<string, unknown>) || {},
      countries: (t.countries as Record<string, unknown>) || {},
      map: (t.map as Record<string, unknown>) || {},
      errors: (t.errors as Record<string, unknown>) || {},
      footer: (t.footer as Record<string, unknown>) || {},
      validation: (t.validation as Record<string, unknown>) || {},
      legal: (t.legal as Record<string, unknown>) || {},
      navigation: (t.navigation as Record<string, unknown>) || {},
    };
  };

  await i18next
    .use(initReactI18next)
    .init({
      resources: {
        en: extractNamespaces(enTranslations),
        es: extractNamespaces(esTranslations),
        fr: extractNamespaces(frTranslations),
        de: extractNamespaces(deTranslations),
        it: extractNamespaces(itTranslations),
        pt: extractNamespaces(ptTranslations),
        nl: extractNamespaces(nlTranslations),
        pl: extractNamespaces(plTranslations),
        sv: extractNamespaces(svTranslations),
        el: extractNamespaces(elTranslations),
      },
      lng: 'en',
      fallbackLng: 'en',
      ns: ['layout', 'common', 'calculator', 'countries', 'map', 'errors', 'footer', 'validation', 'legal', 'navigation'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
        formatSeparator: ',',
      },
      react: {
        useSuspense: false,
      },
    });

  return i18next;
}

export default i18nConfig;
