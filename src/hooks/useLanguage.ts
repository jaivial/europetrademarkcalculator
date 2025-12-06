import { useAtom, useAtomValue } from 'jotai';
import i18next from 'i18next';
import {
  languageAtom,
  availableLanguagesAtom,
  currentLanguageMetadataAtom,
  type Language,
  type LanguageMetadata,
} from '@/atoms/language';

/**
 * Enhanced return type for useLanguage hook
 */
export interface UseLanguageReturn {
  language: Language;
  changeLanguage: (newLanguage: Language) => Promise<void>;
  availableLanguages: LanguageMetadata[];
  currentLanguageMetadata: LanguageMetadata;
}

/**
 * Custom hook for language management with available languages
 *
 * Provides:
 * - Current language code
 * - Function to change language with i18next sync
 * - List of all available languages with metadata
 * - Metadata for currently selected language
 *
 * Usage:
 * const { language, changeLanguage, availableLanguages, currentLanguageMetadata } = useLanguage();
 *
 * Uses Jotai atoms exclusively - NO useState
 * Automatically syncs with i18next on language change
 */
export function useLanguage(): UseLanguageReturn {
  // Use Jotai atoms for state management - NO useState
  const [language, setLanguage] = useAtom(languageAtom);

  // Read-only atoms for derived data
  const availableLanguages = useAtomValue(availableLanguagesAtom);
  const currentLanguageMetadata = useAtomValue(currentLanguageMetadataAtom);

  /**
   * Change the application language
   * Validates the language code and updates both Jotai atom and i18next
   * Handles async i18next loading gracefully
   *
   * @param newLanguage - The language code to switch to
   * @throws Never throws - handles errors internally
   */
  const changeLanguage = async (newLanguage: Language): Promise<void> => {
    try {
      // Validate language before changing
      if (!newLanguage || newLanguage.length === 0) {
        console.warn('Invalid language code provided to changeLanguage()');
        return;
      }

      // Update Jotai atom first
      setLanguage(newLanguage);

      // Sync with i18next
      // i18next.changeLanguage is async and handles resource loading
      await i18next.changeLanguage(newLanguage);

      // Optional: Set HTML lang attribute for accessibility
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLanguage;
        document.documentElement.setAttribute('data-language', newLanguage);
      }
    } catch (error) {
      // Gracefully handle i18next errors
      console.error(`Failed to change language to ${newLanguage}:`, error);
      // Language atom was already updated, so this will partially work
      // even if i18next resources failed to load
    }
  };

  return {
    language,
    changeLanguage,
    availableLanguages,
    currentLanguageMetadata,
  };
}

export default useLanguage;
