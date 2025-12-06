# Frontend Task 015: Custom Language Hook - useLanguage

## Metadata
- **Task**: 15 of 40
- **Area**: Frontend
- **Feature**: Custom Hooks - Language Management
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the useLanguage custom hook that provides a clean, reusable interface for language selection and management throughout the application. This hook uses Jotai's languageAtom exclusively (NO useState) and synchronizes language changes with i18next for translation support. The hook exposes the current language, available languages, and a function to change language with automatic i18next synchronization. All state is managed through Jotai atoms, ensuring consistency across the entire application.

---

## Subtasks

### Subtask 15.1: Core useLanguage Hook Implementation

#### Status
status: pending

#### Objective
Create the primary useLanguage hook that reads current language from languageAtom and provides a changeLanguage function that syncs with i18next.

#### Context
The useLanguage hook is the primary interface for components to interact with language state. It must use Jotai's useAtom hook to read from languageAtom and useSetAtom to update it. When language changes, the hook must call i18next.changeLanguage() to synchronize translation resources. The hook should be simple, focused, and provide only essential functionality without side effects in the component that uses it.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useLanguage.ts` - Core hook implementation

#### Implementation

```typescript
import { useAtom, useSetAtom } from 'jotai';
import i18next from 'i18next';
import { languageAtom, type Language } from '@/atoms/language';

/**
 * Custom hook for language management
 * Provides current language, available languages, and language switching
 *
 * Usage:
 * const { language, changeLanguage } = useLanguage();
 *
 * Uses Jotai atoms exclusively - NO useState
 * Automatically syncs with i18next on language change
 */
export function useLanguage() {
  // Use Jotai atoms for state management - NO useState
  const [language, setLanguage] = useAtom(languageAtom);

  /**
   * Change the application language
   * Validates the language code and updates both Jotai atom and i18next
   * Handles async i18next loading gracefully
   *
   * @param newLanguage - The language code to switch to
   * @throws Never throws - handles errors internally
   */
  const changeLanguage = async (newLanguage: Language): Promise<void> => {
    try {
      // Validate language before changing
      if (!newLanguage || newLanguage.length === 0) {
        console.warn('Invalid language code provided to changeLanguage()');
        return;
      }

      // Update Jotai atom first
      setLanguage(newLanguage);

      // Sync with i18next
      // i18next.changeLanguage is async and handles resource loading
      await i18next.changeLanguage(newLanguage);

      // Optional: Set HTML lang attribute for accessibility
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLanguage;
        document.documentElement.setAttribute('data-language', newLanguage);
      }
    } catch (error) {
      // Gracefully handle i18next errors
      console.error(`Failed to change language to ${newLanguage}:`, error);
      // Language atom was already updated, so this will partially work
      // even if i18next resources failed to load
    }
  };

  return {
    language,
    changeLanguage,
  };
}

export default useLanguage;
```

#### Acceptance Criteria
- [ ] Hook uses useAtom from Jotai, NOT useState
- [ ] Hook imports languageAtom from @/atoms/language
- [ ] changeLanguage function is async and returns Promise<void>
- [ ] Validates language before changing
- [ ] Calls i18next.changeLanguage() with new language
- [ ] Sets HTML lang attribute for accessibility
- [ ] Handles i18next errors gracefully without throwing
- [ ] No console errors when hook is used
- [ ] Proper TypeScript types for Language type
- [ ] JSDoc comments for hook and changeLanguage function

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify no compilation errors
# Verify hook imports resolve correctly
```

---

### Subtask 15.2: useLanguage Hook with Available Languages

#### Status
status: pending

#### Objective
Extend the useLanguage hook to provide available languages list and current language metadata.

#### Context
Components need to display a list of available languages (for language selector dropdowns) and metadata about the current language (name, flag emoji, native name). Rather than importing atoms directly in components, the hook should provide this convenience data. The availableLanguagesAtom and currentLanguageMetadataAtom already provide this data - the hook just needs to expose it cleanly.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useLanguage.ts` - Extend hook to include available languages (modify from subtask 15.1)

#### Implementation

```typescript
// Add to the useLanguage hook from subtask 15.1

import { useAtomValue } from 'jotai';
import {
  availableLanguagesAtom,
  currentLanguageMetadataAtom,
  type LanguageMetadata,
} from '@/atoms/language';

/**
 * Enhanced return type for useLanguage hook
 */
export interface UseLanguageReturn {
  language: Language;
  changeLanguage: (newLanguage: Language) => Promise<void>;
  availableLanguages: LanguageMetadata[];
  currentLanguageMetadata: LanguageMetadata;
}

/**
 * Custom hook for language management with available languages
 *
 * Provides:
 * - Current language code
 * - Function to change language with i18next sync
 * - List of all available languages with metadata
 * - Metadata for currently selected language
 *
 * Usage:
 * const { language, changeLanguage, availableLanguages, currentLanguageMetadata } = useLanguage();
 *
 * Uses Jotai atoms exclusively - NO useState
 * Automatically syncs with i18next on language change
 */
export function useLanguage(): UseLanguageReturn {
  // Use Jotai atoms for state management - NO useState
  const [language, setLanguage] = useAtom(languageAtom);

  // Read-only atoms for derived data
  const availableLanguages = useAtomValue(availableLanguagesAtom);
  const currentLanguageMetadata = useAtomValue(currentLanguageMetadataAtom);

  /**
   * Change the application language
   * Validates the language code and updates both Jotai atom and i18next
   * Handles async i18next loading gracefully
   *
   * @param newLanguage - The language code to switch to
   * @throws Never throws - handles errors internally
   */
  const changeLanguage = async (newLanguage: Language): Promise<void> => {
    try {
      // Validate language before changing
      if (!newLanguage || newLanguage.length === 0) {
        console.warn('Invalid language code provided to changeLanguage()');
        return;
      }

      // Update Jotai atom first
      setLanguage(newLanguage);

      // Sync with i18next
      // i18next.changeLanguage is async and handles resource loading
      await i18next.changeLanguage(newLanguage);

      // Optional: Set HTML lang attribute for accessibility
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLanguage;
        document.documentElement.setAttribute('data-language', newLanguage);
      }
    } catch (error) {
      // Gracefully handle i18next errors
      console.error(`Failed to change language to ${newLanguage}:`, error);
      // Language atom was already updated, so this will partially work
      // even if i18next resources failed to load
    }
  };

  return {
    language,
    changeLanguage,
    availableLanguages,
    currentLanguageMetadata,
  };
}

export default useLanguage;
```

#### Acceptance Criteria
- [ ] Hook extends to include availableLanguages from availableLanguagesAtom
- [ ] Hook includes currentLanguageMetadata from currentLanguageMetadataAtom
- [ ] UseLanguageReturn interface exported with all fields
- [ ] Uses useAtomValue for read-only data
- [ ] availableLanguages contains all 10 supported languages
- [ ] currentLanguageMetadata updates reactively when language changes
- [ ] No useState anywhere in hook
- [ ] All Jotai atoms properly imported
- [ ] TypeScript types correctly defined
- [ ] Hook returns object with all four properties

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify UseLanguageReturn interface is properly defined
# Verify all atoms are imported correctly
```

---

### Subtask 15.3: Hook Export and Index Integration

#### Status
status: pending

#### Objective
Export useLanguage hook from hooks index file and ensure it's accessible throughout the application via @/hooks path alias.

#### Context
The hooks directory should have an index.ts file that re-exports all custom hooks for clean import paths. The useLanguage hook should be added to this barrel export so components can import it as `import { useLanguage } from '@/hooks'` instead of the full path. This maintains consistency with the project's import patterns and makes it easy to discover available hooks.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/index.ts` - Add useLanguage to barrel export

#### Implementation

```typescript
/**
 * Hooks Index - Central export point for all custom hooks
 * Provides clean import paths for React hooks used throughout the application
 *
 * Usage:
 * import { useLanguage } from '@/hooks';
 * import { useTheme } from '@/hooks';
 */

export { useLanguage, type UseLanguageReturn } from './useLanguage';

/**
 * Future custom hooks will be added here:
 *
 * export { useTheme } from './useTheme';
 * export { useCalculator } from './useCalculator';
 * export { useCountrySelection } from './useCountrySelection';
 * export { useForm } from './useForm';
 */
```

#### Acceptance Criteria
- [ ] useLanguage hook exported from index.ts
- [ ] UseLanguageReturn type exported from index.ts
- [ ] Imports are relative to the hooks directory
- [ ] Index file is under 50 lines (barrel file)
- [ ] No implementation logic in index file (only re-exports)
- [ ] Proper TypeScript type exports
- [ ] Can import useLanguage from '@/hooks'
- [ ] No circular dependencies
- [ ] Comments document future hook additions

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify imports from '@/hooks' work correctly
# Verify UseLanguageReturn type is accessible
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/hooks/useLanguage.ts`
- `src/hooks/index.ts` (update only)

### Imports From Existing Code
- `jotai` - useAtom, useSetAtom, useAtomValue hooks
- `i18next` - changeLanguage method for sync
- `@/atoms/language` - languageAtom, availableLanguagesAtom, currentLanguageMetadataAtom
- `@/atoms/language` types - Language, LanguageMetadata

### Exports For Other Code
- `useLanguage` - Hook for managing language throughout app
- `UseLanguageReturn` - Type definition for hook return value
- Both exported via `@/hooks` path alias

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
# Verify no TypeScript errors
# Verify hook can be imported from '@/hooks'
# Verify i18next changeLanguage is callable
# Verify Jotai atoms are correctly imported
```

---

## Parallelization Notes
- All 3 subtasks are completely independent and parallelizable
- Subtask 15.1 creates core hook logic (no dependencies on 15.2 or 15.3)
- Subtask 15.2 extends 15.1 with additional functionality (can be written in parallel)
- Subtask 15.3 is just barrel export (depends on 15.1 being complete, but can be written in parallel)
- Each subtask owns exclusive files with no inter-subtask dependencies
- Uses only Jotai atoms and i18next (no other hooks or components)
- Can be implemented in any order, final result is 15.1 + 15.2 → 15.3
- No other tasks depend on this hook yet (will be consumed by later tasks like App.tsx and language selector components)
