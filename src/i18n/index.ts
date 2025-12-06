import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms';
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
