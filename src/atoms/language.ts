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
  (get, _set) => {
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
