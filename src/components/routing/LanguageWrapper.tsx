import { useEffect } from 'react';
import { useParams, Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '@/i18n/config';
import { isLanguageSupported } from './LanguageRedirect';

/**
 * LanguageWrapper Component
 *
 * Wrapper for all language-prefixed routes.
 * - Validates the :lang parameter
 * - Syncs URL language with i18next
 * - Redirects invalid languages to English
 *
 * Usage:
 * <Route path="/:lang" element={<LanguageWrapper />}>
 *   <Route index element={<Home />} />
 *   <Route path="privacy" element={<Privacy />} />
 * </Route>
 *
 * SEO Benefits:
 * - Each language version has unique URLs (e.g., /en/privacy, /es/privacy)
 * - Google can index language versions separately
 * - hreflang tags can reference specific language URLs
 */
export function LanguageWrapper(): JSX.Element {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  // Validate language parameter
  if (!lang || !isLanguageSupported(lang)) {
    // Redirect to default language if invalid
    return <Navigate to={`/${i18nConfig.defaultLanguage}/`} replace />;
  }

  // Sync URL language with i18next
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang).catch((error) => {
        console.error('Failed to change language:', error);
      });
    }
  }, [lang, i18n]);

  // Render nested routes
  return <Outlet />;
}

export default LanguageWrapper;
