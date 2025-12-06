/**
 * @deprecated Use @/i18n/config instead
 * This file is kept for backwards compatibility
 */
export { default, i18nConfig, initializeI18n } from '@/i18n/config';

export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', direction: 'ltr' as const },
  es: { name: 'Español', direction: 'ltr' as const },
  fr: { name: 'Français', direction: 'ltr' as const },
  de: { name: 'Deutsch', direction: 'ltr' as const },
  it: { name: 'Italiano', direction: 'ltr' as const },
  pt: { name: 'Português', direction: 'ltr' as const },
  nl: { name: 'Nederlands', direction: 'ltr' as const },
  pl: { name: 'Polski', direction: 'ltr' as const },
  sv: { name: 'Svenska', direction: 'ltr' as const },
  el: { name: 'Ελληνικά', direction: 'ltr' as const },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;
