import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/providers/i18n/config';

/**
 * Custom hook for i18n functionality
 * Provides translation function and language switching
 */
export function useI18n() {
  const { t, i18n } = useTranslation();

  /**
   * Get current language
   */
  const currentLanguage = i18n.language as SupportedLanguage;

  /**
   * Change language and persist to localStorage
   */
  const setLanguage = useCallback(
    async (language: SupportedLanguage) => {
      try {
        await i18n.changeLanguage(language);
        localStorage.setItem('preferredLanguage', language);
      } catch (error) {
        console.error(`Failed to set language to ${language}:`, error);
        throw error;
      }
    },
    [i18n],
  );

  /**
   * Get language metadata
   */
  const getLanguageInfo = useCallback((language: SupportedLanguage) => {
    return SUPPORTED_LANGUAGES[language];
  }, []);

  /**
   * Check if language is RTL
   */
  const isRTL = SUPPORTED_LANGUAGES[currentLanguage].direction === 'rtl';

  return {
    t,
    currentLanguage,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    getLanguageInfo,
    isRTL,
  };
}
