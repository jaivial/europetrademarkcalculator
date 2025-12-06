import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

// Supported languages
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'el'];

/**
 * Extract language from pathname
 * Handles cases like /en/, /en/privacy, /es/terms, etc.
 */
function extractLanguageFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (match && SUPPORTED_LANGUAGES.includes(match[1])) {
    return match[1];
  }
  return null;
}

/**
 * Custom hook for language-aware navigation
 *
 * Provides utilities for navigating between routes while preserving
 * the current language context.
 *
 * Usage:
 * ```tsx
 * const { navigateTo, currentLanguage, changeLanguage } = useLanguageNavigation();
 *
 * // Navigate to privacy page in current language
 * navigateTo('/privacy');
 *
 * // Change language and stay on same page
 * changeLanguage('es');
 *
 * // Get current language from URL
 * console.log(currentLanguage); // 'en', 'es', etc.
 * ```
 *
 * @returns Navigation utilities with language awareness
 */
export function useLanguageNavigation() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { i18n } = useTranslation();

  // Get current language from URL params, pathname, i18n, or default to 'en'
  const currentLanguage = lang || extractLanguageFromPath(location.pathname) || i18n.language || 'en';

  /**
   * Navigate to a path while preserving current language
   *
   * @param path - Destination path (without language prefix)
   * @example navigateTo('/privacy') -> navigates to '/en/privacy' if current language is 'en'
   */
  const navigateTo = useCallback(
    (path: string) => {
      // Remove leading slash if present
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;

      // Construct language-prefixed URL
      const languagePath = `/${currentLanguage}/${cleanPath}`;

      navigate(languagePath);
    },
    [currentLanguage, navigate]
  );

  /**
   * Change language and reload current page in new language
   *
   * @param newLanguage - Target language code (e.g., 'es', 'fr')
   * @example changeLanguage('es') -> changes from '/en/privacy' to '/es/privacy'
   */
  const changeLanguage = useCallback(
    (newLanguage: string) => {
      // Validate language
      if (!SUPPORTED_LANGUAGES.includes(newLanguage)) {
        console.warn(`Unsupported language: ${newLanguage}`);
        return;
      }

      // Get current pathname
      const currentPath = location.pathname;

      // Extract the path after the language prefix
      // Handle: /en/privacy -> /privacy, /en/ -> /, /en -> /
      let pathWithoutLang = currentPath;
      const langMatch = currentPath.match(/^\/([a-z]{2})(\/.*)?$/);
      if (langMatch) {
        pathWithoutLang = langMatch[2] || '/';
      }

      // Ensure path starts with /
      if (!pathWithoutLang.startsWith('/')) {
        pathWithoutLang = '/' + pathWithoutLang;
      }

      // If path is just /, make it empty for cleaner URL
      if (pathWithoutLang === '/') {
        pathWithoutLang = '';
      }

      // Update i18next language
      i18n.changeLanguage(newLanguage).catch((error) => {
        console.error('Failed to change language:', error);
      });

      // Navigate to same page in new language
      const newPath = `/${newLanguage}${pathWithoutLang}`;
      navigate(newPath, { replace: true });
    },
    [location.pathname, i18n, navigate]
  );

  /**
   * Get language-aware path for a given route
   *
   * @param path - Route path (without language prefix)
   * @returns Language-prefixed path
   * @example getPath('/privacy') -> '/en/privacy'
   */
  const getPath = useCallback(
    (path: string) => {
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      if (cleanPath === '') {
        return `/${currentLanguage}`;
      }
      return `/${currentLanguage}/${cleanPath}`;
    },
    [currentLanguage]
  );

  return {
    navigateTo,
    changeLanguage,
    currentLanguage,
    getPath,
  };
}

export default useLanguageNavigation;
