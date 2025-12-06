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
    expect(i18n.options.fallbackLng).toEqual(['en']);
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
