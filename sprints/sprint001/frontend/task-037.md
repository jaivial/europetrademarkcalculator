# Frontend Task 37: I18n Provider Setup

## Metadata
- **Task**: 37 of 40
- **Area**: Frontend
- **Feature**: Internationalization (i18n) Infrastructure
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the I18nProvider component that wraps the entire application with i18next internationalization support. This task establishes language initialization from localStorage, implements Suspense boundaries for lazy-loaded translations, and provides a centralized provider for managing multi-language support throughout the application.

---

## Subtasks

### Subtask 37.1: I18nProvider Component with I18nextProvider Wrapper

#### Status
status: pending

#### Objective
Create the main I18nProvider component that wraps the app with I18nextProvider, initializes i18next, and handles language selection from localStorage.

#### Context
The I18nProvider is the root provider that enables internationalization across the entire application. It must initialize i18next with default language settings and persist language preference in localStorage for user continuity.

#### Files to Create/Modify (Exclusive Ownership)
- `src/providers/I18nProvider.tsx` - Main I18nProvider component with I18nextProvider wrapper
- `src/providers/i18n/index.ts` - i18n configuration export

#### Implementation

```typescript
// src/providers/I18nProvider.tsx
import { Suspense, useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/providers/i18n/config';

interface I18nProviderProps {
  children: ReactNode;
}

/**
 * I18nProvider component
 * - Wraps application with I18nextProvider
 * - Initializes i18next configuration
 * - Loads language from localStorage on mount
 * - Provides Suspense boundary for lazy-loaded translations
 */
export function I18nProvider({ children }: I18nProviderProps) {
  /**
   * Initialize language from localStorage on mount
   * Defaults to 'en' if not found
   */
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage).catch((error) => {
        console.error('Failed to change language:', error);
      });
    }
  }, []);

  /**
   * Listen for language changes and persist to localStorage
   */
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem('preferredLanguage', lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<LoadingFallback />}>
        {children}
      </Suspense>
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
          Loading translations
        </p>
      </div>
    </div>
  );
}

export default I18nProvider;
```

#### Props Interface
```typescript
interface I18nProviderProps {
  children: ReactNode;
}
```

#### Acceptance Criteria
- [ ] I18nProvider component created and exported
- [ ] I18nextProvider wraps children correctly
- [ ] Suspense fallback renders while translations load
- [ ] Loading state has accessible markup
- [ ] No TypeScript errors
- [ ] Component renders without warnings

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="I18nProvider"
```

---

### Subtask 37.2: i18n Configuration and Language Initialization

#### Status
status: pending

#### Objective
Create the i18next configuration module that initializes i18n with language resources, default language settings, and lazy-loading setup for translations.

#### Context
The i18n config module is the core configuration that defines supported languages, default language selection, namespace setup, and the lazy-loading strategy for translation files. This must be independent from the provider component to allow easy testing and configuration changes.

#### Files to Create/Modify (Exclusive Ownership)
- `src/providers/i18n/config.ts` - i18next configuration
- `src/providers/i18n/index.ts` - Configuration export

#### Implementation

```typescript
// src/providers/i18n/config.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Supported languages in the application
 */
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', direction: 'ltr' as const },
  es: { name: 'Español', direction: 'ltr' as const },
  fr: { name: 'Français', direction: 'ltr' as const },
  de: { name: 'Deutsch', direction: 'ltr' as const },
  it: { name: 'Italiano', direction: 'ltr' as const },
  pt: { name: 'Português', direction: 'ltr' as const },
  ar: { name: 'العربية', direction: 'rtl' as const },
  zh: { name: '中文', direction: 'ltr' as const },
  ja: { name: '日本語', direction: 'ltr' as const },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

/**
 * Get default language
 * Priority: localStorage > browser language > 'en'
 */
function getDefaultLanguage(): SupportedLanguage {
  const saved = localStorage.getItem('preferredLanguage');
  if (saved && saved in SUPPORTED_LANGUAGES) {
    return saved as SupportedLanguage;
  }

  const browserLang = navigator.language.split('-')[0];
  if (browserLang in SUPPORTED_LANGUAGES) {
    return browserLang as SupportedLanguage;
  }

  return 'en';
}

/**
 * Lazy load translation resources
 * Each language is loaded on demand
 */
async function loadTranslations(language: SupportedLanguage) {
  try {
    const module = await import(`./locales/${language}.json`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    return {};
  }
}

/**
 * Initialize i18next
 */
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: {
      escapeValue: false, // React is already safe from XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    resources: {},
    nonExplicitSupportedLngs: true,
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
    lng: getDefaultLanguage(),
    debug: process.env.NODE_ENV === 'development',
  })
  .catch((error) => {
    console.error('Failed to initialize i18next:', error);
  });

export default i18next;
```

```typescript
// src/providers/i18n/index.ts
export { default } from './config';
export { SUPPORTED_LANGUAGES, type SupportedLanguage } from './config';
```

#### Acceptance Criteria
- [ ] i18next configuration created with all supported languages
- [ ] Default language selection logic implemented
- [ ] Lazy-loading setup configured
- [ ] Language detector initialized
- [ ] localStorage integration working
- [ ] No TypeScript errors
- [ ] Configuration exports available for use

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="i18n.*config"
```

---

### Subtask 37.3: Hooks and Integration Testing

#### Status
status: pending

#### Objective
Create custom hooks for using i18n functionality in components and write comprehensive tests for the provider and configuration.

#### Context
Custom hooks make it easier for components to access translation functions and language switching. Tests ensure the provider correctly initializes, loads translations, and persists language preferences to localStorage.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useI18n.ts` - Custom hook for i18n functionality
- `src/providers/I18nProvider.test.tsx` - Provider component tests
- `src/providers/i18n/config.test.ts` - Configuration tests

#### Implementation

```typescript
// src/hooks/useI18n.ts
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
```

```typescript
// src/providers/I18nProvider.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { I18nProvider } from './I18nProvider';
import i18n from './i18n/config';

describe('I18nProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render children when translations are loaded', async () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  it('should show loading fallback while initializing', () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    // Loading fallback may appear briefly
    expect(screen.queryByText(/Test Content|Loading translations/i)).toBeInTheDocument();
  });

  it('should load language from localStorage', async () => {
    localStorage.setItem('preferredLanguage', 'es');

    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    await waitFor(() => {
      expect(i18n.language).toBe('es');
    });
  });

  it('should persist language changes to localStorage', async () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    await waitFor(() => {
      i18n.changeLanguage('fr').catch(() => {});
    });

    await waitFor(() => {
      expect(localStorage.getItem('preferredLanguage')).toBe('fr');
    });
  });

  it('should have accessible loading fallback', () => {
    const { container } = render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    // Verify semantic structure
    const fallback = container.querySelector('[class*="flex"]');
    expect(fallback).toBeInTheDocument();
  });
});
```

```typescript
// src/providers/i18n/config.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import i18n, { SUPPORTED_LANGUAGES, type SupportedLanguage } from './config';

describe('i18n Configuration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should have all supported languages defined', () => {
    expect(Object.keys(SUPPORTED_LANGUAGES).length).toBeGreaterThan(0);
    expect(SUPPORTED_LANGUAGES).toHaveProperty('en');
    expect(SUPPORTED_LANGUAGES).toHaveProperty('es');
  });

  it('should set correct language direction for each language', () => {
    Object.values(SUPPORTED_LANGUAGES).forEach((lang) => {
      expect(['ltr', 'rtl']).toContain(lang.direction);
    });
  });

  it('should initialize with default language', () => {
    expect(i18n.language).toBeDefined();
    expect(Object.keys(SUPPORTED_LANGUAGES)).toContain(i18n.language);
  });

  it('should have fallback language set to English', () => {
    expect(i18n.options.fallbackLng).toBe('en');
  });

  it('should support language change', async () => {
    const currentLang = i18n.language;
    const newLang: SupportedLanguage = currentLang === 'en' ? 'es' : 'en';

    await i18n.changeLanguage(newLang);
    expect(i18n.language).toBe(newLang);
  });

  it('should have language detector configured', () => {
    expect(i18n.options.detection).toBeDefined();
    expect(i18n.options.detection?.order).toContain('localStorage');
  });
});
```

#### Acceptance Criteria
- [ ] useI18n hook created with translation functions
- [ ] Language switching functionality working
- [ ] localStorage persistence tested
- [ ] Loading fallback component renders correctly
- [ ] All tests pass (Provider + Config + Hook)
- [ ] No TypeScript errors
- [ ] Hook exports in main hooks index file

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="I18nProvider|i18n|useI18n"
npm test -- --coverage
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/providers/I18nProvider.tsx`
- `src/providers/i18n/` (directory)
- `src/providers/i18n/config.ts`
- `src/providers/i18n/index.ts`
- `src/hooks/useI18n.ts`
- `src/providers/I18nProvider.test.tsx`
- `src/providers/i18n/config.test.ts`

### Imports From Existing Code
- `react` - Component fundamentals
- `react-i18next` - I18nextProvider and useTranslation hooks
- `i18next` - Core i18n library
- `i18next-browser-languagedetector` - Automatic language detection
- `@testing-library/react` - Testing utilities (for tests only)

### Exports For Other Code
- `I18nProvider` - Provider component for wrapping app
- `useI18n` - Custom hook for components to use translations
- `SUPPORTED_LANGUAGES` - Language configuration constant
- `SupportedLanguage` - TypeScript type for language codes

---

## Task-Level Verification
```bash
# Verify all subtasks completed
npm run type-check
npm test -- --testPathPattern="Task037|I18nProvider|i18n|useI18n"
npm run lint -- src/providers/I18nProvider.tsx src/providers/i18n src/hooks/useI18n.ts
```

---

## Parallelization Notes
- All three subtasks can run in parallel
- Subtask 37.1 (Provider) depends on Subtask 37.2 (Config) existing first
- Subtask 37.3 (Hooks & Tests) can run independently
- Each subtask owns exclusive files with no overlap
- No subtask depends on another subtask's output for compilation
- All subtasks can be implemented simultaneously with proper planning
