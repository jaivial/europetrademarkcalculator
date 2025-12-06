# Frontend Task 003: Core Jotai Atoms - Language State

## Metadata
- **Task**: 3 of 40
- **Area**: Frontend
- **Feature**: Language/i18n State Management
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create comprehensive Jotai atoms for language and internationalization (i18n) state management. This task manages current language selection, language persistence across sessions via localStorage, and maintains a list of all supported languages (en, es, fr, de, it, pt, nl, pl, sv, el). All state is managed through Jotai atoms - NO useState allowed. Language changes persist automatically and are detected from browser preferences on first load.

---

## Subtasks

### Subtask 003.1: Language Atom with Storage Persistence

#### Status
status: pending

#### Objective
Create languageAtom with atomWithStorage for localStorage persistence and browser language detection.

#### Context
The languageAtom is the core state atom for managing current language selection. It must detect the user's browser language on first visit and persist their selection to localStorage for subsequent visits. Using atomWithStorage from jotai/utils enables automatic persistence without manual localStorage handling. Browser language detection should check navigator.language and fall back to 'en' if no supported language match.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/languageAtom.ts` - Core language state atom with persistence

#### Implementation

```typescript
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
  (get, set, lang: unknown): boolean => {
    return SUPPORTED_LANGUAGES.includes(lang as Language);
  }
);

/**
 * Storage sync indicator
 * Used to track when language changes are persisted to localStorage
 * Useful for debugging and monitoring state synchronization
 */
export const languageStorageSyncAtom = atom<boolean>(true);
```

#### Acceptance Criteria
- [ ] languageAtom created with atomWithStorage
- [ ] Supports all 10 languages (en, es, fr, de, it, pt, nl, pl, sv, el)
- [ ] Browser language detected on first load
- [ ] Persists to localStorage automatically
- [ ] SUPPORTED_LANGUAGES constant exported
- [ ] Type-safe with Language type
- [ ] NO useState used anywhere
- [ ] Fallback to 'en' on browser language detection failure
- [ ] getOnInit: true loads from localStorage on app start

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify no errors in languageAtom.ts
# Verify Language type union includes all 10 languages
```

---

### Subtask 003.2: Language Metadata and Derived Atoms

#### Status
status: pending

#### Objective
Create language metadata interface and derived atoms for accessing language information and convenience operations.

#### Context
Language metadata includes display information (native name, English name, flag emoji) for each supported language. Derived atoms provide convenient read-only atoms for accessing current language metadata and checking properties. These derived atoms make it easy for components to get language information without managing separate state. Write-only atoms provide validated methods to change the language.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/languageAtom.ts` - Add metadata interface and derived atoms

#### Implementation

```typescript
// (continuing from Subtask 003.1 code)

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
  (get) => {
    return SUPPORTED_LANGUAGES.map(code => LANGUAGE_METADATA[code]);
  }
);

/**
 * Derived atom: Is current language right-to-left?
 * Useful for CSS styling (direction: rtl)
 * Currently all supported languages are LTR, but extensible for future
 */
export const isRTLAtom = atom(
  (get) => {
    const lang = get(languageAtom);
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
  (get, set, newLanguage: Language) => {
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
  (get, set) => {
    const browserLang = detectBrowserLanguage();
    set(languageAtom, browserLang);
    set(languageStorageSyncAtom, true);
  }
);
```

#### Acceptance Criteria
- [ ] LanguageMetadata interface defined with code, name, nativeName, flag
- [ ] LANGUAGE_METADATA constant covers all 10 languages
- [ ] currentLanguageMetadataAtom provides metadata for active language
- [ ] availableLanguagesAtom lists all supported languages
- [ ] isRTLAtom checks text direction (extensible for future RTL languages)
- [ ] setLanguageAtom validates before changing
- [ ] resetLanguageToBrowserAtom restores browser default
- [ ] All metadata properly typed and exported
- [ ] Flag emojis correctly assigned to each language

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify LanguageMetadata interface is properly typed
# Verify all 10 languages in LANGUAGE_METADATA
# Verify derived atoms compile without errors
```

---

### Subtask 003.3: Language Atoms Barrel Export and Initialization

#### Status
status: pending

#### Objective
Create barrel export file for language atoms and initialization atom for app startup.

#### Context
Export all language atoms and types from a single entry point for clean imports. Additionally create an initialization atom that can be used during app startup to ensure language state is properly loaded from storage and synchronized with the document. This allows other parts of the application to import language functionality from '@/atoms/language' with clean, predictable API.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/language.ts` (or update `src/atoms/languageAtom.ts` to include export) - Barrel export

#### Implementation

```typescript
// Barrel export for language atoms
// This file re-exports everything from languageAtom.ts for clean imports

export {
  type Language,
  type LanguageMetadata,
  SUPPORTED_LANGUAGES,
  LANGUAGE_METADATA,
  languageAtom,
  currentLanguageMetadataAtom,
  availableLanguagesAtom,
  isRTLAtom,
  setLanguageAtom,
  resetLanguageToBrowserAtom,
  languageStorageSyncAtom,
  isLanguageSupportedAtom,
} from './languageAtom';

/**
 * Initialization atom for language state during app startup
 * Loads language from localStorage and sets up document attributes
 * Should be called once during app initialization
 *
 * Usage in App.tsx:
 * const initLanguage = useAtomValue(initializeLanguageAtom);
 * // or trigger on mount
 * useEffect(() => { set(initializeLanguageAtom, null); }, []);
 */
import { atom } from 'jotai';
import { languageAtom, currentLanguageMetadataAtom } from './languageAtom';

export const initializeLanguageAtom = atom(
  null,
  (get, set) => {
    const lang = get(languageAtom);
    const metadata = get(currentLanguageMetadataAtom);

    // Set HTML lang attribute for accessibility and SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-language', lang);
    }

    return {
      language: lang,
      metadata,
      initialized: true,
    };
  }
);
```

#### Acceptance Criteria
- [ ] Barrel export includes all language atoms and types
- [ ] Clean import path from '@/atoms/language' or '@/atoms'
- [ ] initializeLanguageAtom sets HTML lang attribute
- [ ] initializeLanguageAtom sets data-language attribute
- [ ] Initialization can be triggered on app startup
- [ ] All exports properly typed
- [ ] No circular dependencies
- [ ] Documentation comments for each export

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify barrel export compiles
# Verify imports from '@/atoms/language' work correctly
# Verify initializeLanguageAtom returns proper type
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/languageAtom.ts` - Primary language atom file
- `src/atoms/language.ts` (if created) - Barrel export

### Imports From Existing Code
- `jotai` - State management library (from package.json task 001)
- `jotai/utils` - atomWithStorage utility (from jotai package)

### Exports For Other Code
- `Language` type - For type-safe language selection
- `languageAtom` - Current language state
- `SUPPORTED_LANGUAGES` - List of available language codes
- `LANGUAGE_METADATA` - Display information for each language
- `setLanguageAtom` - Action to change language
- `currentLanguageMetadataAtom` - Metadata for active language
- `availableLanguagesAtom` - All languages with metadata
- `initializeLanguageAtom` - Initialization during app startup

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
# Verify no unused variables or imports
# Verify all atoms are properly typed
# Verify Language type union includes exactly 10 languages
# Test localStorage persistence with browser dev tools
# Verify HTML lang attribute updates on language change
```

---

## Parallelization Notes
- All subtasks in this task can run in parallel
- Each subtask owns exclusive portions of language state
- Subtask 003.1 creates main atom, 003.2 adds derived atoms, 003.3 exports
- No subtask depends on another subtask's output at compile time
- Subtask 003.3 (exports) can be written before subtasks 003.1-003.2 are finalized
- Language atoms do not depend on other atom files
- Language atoms are dependencies for calculator and other state atoms (will import in later tasks)
- All state strictly Jotai atoms - NO useState anywhere
