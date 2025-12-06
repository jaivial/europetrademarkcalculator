import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { i18nConfig } from '@/i18n/config';

/**
 * LanguageRedirect Component
 *
 * Handles automatic language detection and redirection from the root path
 * to the appropriate language-prefixed URL.
 *
 * Detection Priority:
 * 1. Check localStorage for saved language preference
 * 2. Check browser's navigator.language
 * 3. Fall back to English (en)
 *
 * Examples:
 * - User with Spanish browser: / -> /es/
 * - User with saved French preference: / -> /fr/
 * - User with unsupported language: / -> /en/
 */
export function LanguageRedirect(): null {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the detected language
    const detectedLanguage = detectBrowserLanguage();

    // Redirect to language-prefixed home
    navigate(`/${detectedLanguage}/`, { replace: true });
  }, [navigate]);

  return null;
}

/**
 * Detect browser language with fallback strategy
 *
 * Priority:
 * 1. localStorage preference (set by language selector)
 * 2. Browser language (navigator.language)
 * 3. Default to English
 *
 * @returns Supported language code (e.g., 'en', 'es', 'fr')
 */
export function detectBrowserLanguage(): string {
  // 1. Check localStorage for saved preference
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage && isLanguageSupported(savedLanguage)) {
    return savedLanguage;
  }

  // 2. Check browser language
  const browserLanguage = navigator.language.toLowerCase();

  // Extract primary language code (e.g., 'en-US' -> 'en')
  const primaryLanguage = browserLanguage.split('-')[0];

  // Check if primary language is supported
  if (isLanguageSupported(primaryLanguage)) {
    return primaryLanguage;
  }

  // 3. Fall back to default
  return i18nConfig.defaultLanguage;
}

/**
 * Check if a language code is supported by the app
 *
 * @param lang - Language code to check (e.g., 'en', 'es')
 * @returns True if supported, false otherwise
 */
export function isLanguageSupported(lang: string): boolean {
  return i18nConfig.supportedLanguages.includes(lang as any);
}

export default LanguageRedirect;
