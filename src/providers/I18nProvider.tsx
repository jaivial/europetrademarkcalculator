import { useEffect, useState, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { initializeI18n } from '@/i18n/config';

interface I18nProviderProps {
  children: ReactNode;
}

/**
 * I18nProvider component
 * - Initializes i18next with bundled translations (no server required)
 * - Wraps application with I18nextProvider
 * - Loads language from localStorage on mount
 */
export function I18nProvider({ children }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(false);

  /**
   * Initialize i18n on mount
   */
  useEffect(() => {
    const init = async () => {
      await initializeI18n();

      // Load saved language preference
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && i18next.language !== savedLanguage) {
        await i18next.changeLanguage(savedLanguage);
      }

      setIsReady(true);
    };

    init().catch((error) => {
      console.error('Failed to initialize i18n:', error);
      setIsReady(true); // Still render app even if i18n fails
    });
  }, []);

  /**
   * Listen for language changes and persist to localStorage
   */
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem('preferredLanguage', lng);
    };

    i18next.on('languageChanged', handleLanguageChanged);
    return () => {
      i18next.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  if (!isReady) {
    return <LoadingFallback />;
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}

/**
 * Fallback component shown while translations are loading
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            ...
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default I18nProvider;
