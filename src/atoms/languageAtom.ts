import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

/**
 * Supported languages for the application
 * All 10 European languages: English, Spanish, French, German, Italian,
 * Portuguese, Dutch, Polish, Swedish, Greek
 */
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'sv' | 'el';

/**
 * Array of all supported language codes
 */
export const SUPPORTED_LANGUAGES: readonly Language[] = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'el'
] as const;

/**
 * Detect browser language from navigator API
 * Extracts language code (first part before hyphen)
 * Falls back to English if no supported language detected
 */
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  try {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    const isSupported = SUPPORTED_LANGUAGES.includes(browserLang as Language);
    return isSupported ? (browserLang as Language) : 'en';
  } catch {
    return 'en';
  }
};

/**
 * Main language atom with localStorage persistence
 *
 * Storage key: 'brand-calculator-language'
 * Default: Browser language or 'en'
 * Persists to localStorage automatically via atomWithStorage
 * getOnInit: true loads from storage on application start
 */
export const languageAtom = atomWithStorage<Language>(
  'brand-calculator-language',
  detectBrowserLanguage(),
  undefined,
  { getOnInit: true }
);

/**
 * Validation atom: Check if a language code is supported
 * Useful for runtime validation and error checking
 */
export const isLanguageSupportedAtom = atom(
  null,
  (_get, _set, lang: unknown): boolean => {
    return SUPPORTED_LANGUAGES.includes(lang as Language);
  }
);

/**
 * Storage sync indicator
 * Used to track when language changes are persisted to localStorage
 * Useful for debugging and monitoring state synchronization
 */
export const languageStorageSyncAtom = atom<boolean>(true);

/**
 * Language metadata interface
 * Contains display information for each language
 */
export interface LanguageMetadata {
  code: Language;
  name: string;           // English name
  nativeName: string;     // Name in the language itself
  flag: string;           // Emoji flag for the country
}

/**
 * Complete language metadata for all supported languages
 * Used for language selector UI and display purposes
 */
export const LANGUAGE_METADATA: Record<Language, LanguageMetadata> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
  },
  sv: {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    flag: '🇸🇪',
  },
  el: {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    flag: '🇬🇷',
  },
};

/**
 * Derived atom: Get metadata for current language
 * Read-only atom that provides full metadata for the active language
 * Useful for displaying language name and flag in UI
 */
export const currentLanguageMetadataAtom = atom(
  (get) => {
    const lang = get(languageAtom);
    return LANGUAGE_METADATA[lang];
  }
);

/**
 * Derived atom: Get all available languages with metadata
 * Returns array of language metadata for language selector UI
 * Ordered in same order as SUPPORTED_LANGUAGES constant
 */
export const availableLanguagesAtom = atom(
  (_get) => {
    return SUPPORTED_LANGUAGES.map(code => LANGUAGE_METADATA[code]);
  }
);

/**
 * Derived atom: Is current language right-to-left?
 * Useful for CSS styling (direction: rtl)
 * Currently all supported languages are LTR, but extensible for future
 */
export const isRTLAtom = atom(
  (_get) => {
    // All currently supported languages are LTR
    // Greek (el) is LTR despite using Greek alphabet
    return false;
  }
);

/**
 * Write-only atom: Change language with validation
 * Validates that language is supported before changing
 * Logs warning if unsupported language is attempted
 * Falls back to 'en' if validation fails
 */
export const setLanguageAtom = atom(
  null,
  (_get, set, newLanguage: Language) => {
    if (!SUPPORTED_LANGUAGES.includes(newLanguage)) {
      console.warn(
        `Language '${newLanguage}' not supported. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`
      );
      set(languageAtom, 'en');
      return;
    }
    set(languageAtom, newLanguage);
    set(languageStorageSyncAtom, true);
  }
);

/**
 * Write-only atom: Reset language to browser default
 * Useful for reset buttons in settings
 * Detects browser language and applies it
 */
export const resetLanguageToBrowserAtom = atom(
  null,
  (_get, set) => {
    const browserLang = detectBrowserLanguage();
    set(languageAtom, browserLang);
    set(languageStorageSyncAtom, true);
  }
);
