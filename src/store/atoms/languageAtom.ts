import { atom } from 'jotai';
import { LanguageCode } from '../../components/LanguageSelector/types';

// Default language is English
const DEFAULT_LANGUAGE: LanguageCode = 'en';

function isValidLanguageCode(code: string): boolean {
  const validCodes: LanguageCode[] = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'el'];
  return validCodes.includes(code as LanguageCode);
}

// Get initial language from localStorage or default
const getInitialLanguage = (): LanguageCode => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('app-language');
    if (stored && isValidLanguageCode(stored)) {
      return stored as LanguageCode;
    }
  }
  return DEFAULT_LANGUAGE;
};

// Writable atom with localStorage persistence
export const languageAtom = atom(
  getInitialLanguage(),
  (_get, set, newLanguage: LanguageCode) => {
    set(languageAtom, newLanguage);
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', newLanguage);
    }
  }
);
