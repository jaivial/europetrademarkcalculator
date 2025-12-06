# Frontend Task 016: Custom Hooks - Country Selection Hook

## Metadata
- **Task**: 16 of 40
- **Area**: Frontend
- **Feature**: Custom Hooks - Country Selection Management
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the `useCountrySelection` custom hook that provides country selection management using Jotai atoms (NO useState). The hook manages selected country state, search query filtering, filtered country list computation, country selection, and clearing selection. All state is centralized in Jotai atoms ensuring predictable, globally-accessible state management without React component local state.

---

## Subtasks

### Subtask 016.1: Country Atom Definitions

#### Status
status: pending

#### Objective
Create Jotai atoms for country selection state and search query with derived atoms for filtered countries.

#### Context
The country selection system requires multiple atoms: one for the currently selected country, one for the search query, and a derived atom that computes the filtered list of countries based on the search query. These atoms enable the hook to provide filtered data without managing state within React components. The countryAtom stores the complete country object, and the searchQueryAtom stores the search string. A derived atom uses both to compute filtered results.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/countryAtom.ts` - Country state atoms with derived filtering

#### Implementation

```typescript
import { atom } from 'jotai';

/**
 * Country interface for type safety
 */
export interface Country {
  code: string;           // ISO 3166-1 alpha-2 code (e.g., 'DE', 'FR')
  name: string;          // English name of the country
  nativeName?: string;   // Native name (optional, for multi-language support)
  continent: string;     // Continent (Europe, Asia, Africa, Americas, Oceania)
  region?: string;       // Region within continent
  flag?: string;         // Emoji flag representation
  registrationCost?: number; // Base registration cost in EUR
}

/**
 * Sample European countries data
 * Complete list available for the application
 */
export const EUROPEAN_COUNTRIES: readonly Country[] = [
  {
    code: 'DE',
    name: 'Germany',
    nativeName: 'Deutschland',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇩🇪',
    registrationCost: 270,
  },
  {
    code: 'FR',
    name: 'France',
    nativeName: 'France',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇫🇷',
    registrationCost: 250,
  },
  {
    code: 'ES',
    name: 'Spain',
    nativeName: 'España',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇪🇸',
    registrationCost: 240,
  },
  {
    code: 'IT',
    name: 'Italy',
    nativeName: 'Italia',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇮🇹',
    registrationCost: 260,
  },
  {
    code: 'NL',
    name: 'Netherlands',
    nativeName: 'Nederland',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇳🇱',
    registrationCost: 225,
  },
  {
    code: 'BE',
    name: 'Belgium',
    nativeName: 'België',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇧🇪',
    registrationCost: 235,
  },
  {
    code: 'AT',
    name: 'Austria',
    nativeName: 'Österreich',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇦🇹',
    registrationCost: 270,
  },
  {
    code: 'CH',
    name: 'Switzerland',
    nativeName: 'Schweiz',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇨🇭',
    registrationCost: 300,
  },
  {
    code: 'SE',
    name: 'Sweden',
    nativeName: 'Sverige',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇸🇪',
    registrationCost: 245,
  },
  {
    code: 'PL',
    name: 'Poland',
    nativeName: 'Polska',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇵🇱',
    registrationCost: 200,
  },
  {
    code: 'GR',
    name: 'Greece',
    nativeName: 'Ελλάδα',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇬🇷',
    registrationCost: 250,
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    nativeName: 'Česká Republika',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇨🇿',
    registrationCost: 210,
  },
];

/**
 * Atom to store the currently selected country
 * Null when no country is selected
 */
export const selectedCountryAtom = atom<Country | null>(null);

/**
 * Atom to store the search query for filtering countries
 * Stores the user's text input for searching/filtering
 */
export const countrySearchQueryAtom = atom<string>('');

/**
 * Derived atom that filters countries based on search query
 * Computes filtered list by matching country name (case-insensitive)
 * and native name against the search query
 * Always includes all countries when search query is empty
 */
export const filteredCountriesAtom = atom((get) => {
  const searchQuery = get(countrySearchQueryAtom);

  // If search query is empty, return all countries
  if (searchQuery.trim() === '') {
    return EUROPEAN_COUNTRIES as Country[];
  }

  const query = searchQuery.toLowerCase().trim();

  // Filter countries by name match (case-insensitive)
  return EUROPEAN_COUNTRIES.filter((country) => {
    const nameMatch = country.name.toLowerCase().includes(query);
    const nativeNameMatch = country.nativeName?.toLowerCase().includes(query);
    const codeMatch = country.code.toLowerCase().includes(query);

    return nameMatch || nativeNameMatch || codeMatch;
  }) as Country[];
});

/**
 * Derived atom that checks if a country is currently selected
 * Write-only atom to check selection state based on country code
 */
export const isCountrySelectedAtom = atom(
  null,
  (get, set, countryCode: string): boolean => {
    const selected = get(selectedCountryAtom);
    return selected?.code === countryCode;
  }
);

/**
 * Derived atom that returns the count of filtered countries
 * Useful for displaying "X countries found" messages
 */
export const filteredCountriesCountAtom = atom((get) => {
  return get(filteredCountriesAtom).length;
});
```

#### Acceptance Criteria
- [ ] Country interface defined with all required fields
- [ ] EUROPEAN_COUNTRIES array contains at least 12 European countries
- [ ] selectedCountryAtom created and initialized to null
- [ ] countrySearchQueryAtom created and initialized to empty string
- [ ] filteredCountriesAtom is derived and filters by name, nativeName, and code
- [ ] filteredCountriesAtom returns all countries when query is empty
- [ ] isCountrySelectedAtom write-only atom for checking selection
- [ ] filteredCountriesCountAtom derives from filteredCountriesAtom
- [ ] All types are TypeScript strict
- [ ] No useState used anywhere

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify Country interface is exported
# Verify all atoms are exported
```

---

### Subtask 016.2: Core useCountrySelection Hook Implementation

#### Status
status: pending

#### Objective
Create the main useCountrySelection hook that provides country selection functionality using Jotai atoms.

#### Context
The useCountrySelection hook is the primary interface for components to interact with country selection state. It uses Jotai's useAtom hook to access and modify atoms. The hook returns an object containing the selected country, search query, filtered list, and functions to update state. By using useAtom instead of useState, all state is centralized in Jotai, enabling cross-component state sharing and persistence.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useCountrySelection.ts` - Main hook implementation

#### Implementation

```typescript
import { useAtom } from 'jotai';
import {
  Country,
  selectedCountryAtom,
  countrySearchQueryAtom,
  filteredCountriesAtom,
  filteredCountriesCountAtom
} from '@/atoms/countryAtom';

/**
 * Hook return type for type safety
 */
export interface UseCountrySelectionReturn {
  selectedCountry: Country | null;
  searchQuery: string;
  filteredCountries: Country[];
  filteredCountriesCount: number;
  selectCountry: (country: Country) => void;
  setSearchQuery: (query: string) => void;
  clearSelection: () => void;
  clearSearch: () => void;
}

/**
 * useCountrySelection Hook
 *
 * Provides country selection functionality using Jotai atoms.
 * NO useState is used - all state is managed via Jotai atoms.
 *
 * @returns UseCountrySelectionReturn object with state and functions
 *
 * @example
 * ```tsx
 * const {
 *   selectedCountry,
 *   searchQuery,
 *   filteredCountries,
 *   selectCountry,
 *   clearSelection
 * } = useCountrySelection();
 *
 * return (
 *   <>
 *     <input
 *       value={searchQuery}
 *       onChange={(e) => setSearchQuery(e.target.value)}
 *     />
 *     {filteredCountries.map(country => (
 *       <button key={country.code} onClick={() => selectCountry(country)}>
 *         {country.flag} {country.name}
 *       </button>
 *     ))}
 *     {selectedCountry && (
 *       <div>Selected: {selectedCountry.name}</div>
 *     )}
 *   </>
 * );
 * ```
 */
export function useCountrySelection(): UseCountrySelectionReturn {
  // Get atoms and setters from Jotai
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);
  const [searchQuery, setSearchQuery] = useAtom(countrySearchQueryAtom);
  const [filteredCountries] = useAtom(filteredCountriesAtom);
  const [filteredCountriesCount] = useAtom(filteredCountriesCountAtom);

  /**
   * Select a country and update the selectedCountryAtom
   * @param country The country to select
   */
  const selectCountry = (country: Country): void => {
    setSelectedCountry(country);
  };

  /**
   * Clear the selected country
   * Sets selectedCountryAtom back to null
   */
  const clearSelection = (): void => {
    setSelectedCountry(null);
  };

  /**
   * Clear the search query
   * Resets countrySearchQueryAtom to empty string
   */
  const clearSearch = (): void => {
    setSearchQuery('');
  };

  return {
    selectedCountry,
    searchQuery,
    filteredCountries,
    filteredCountriesCount,
    selectCountry,
    setSearchQuery,
    clearSelection,
    clearSearch,
  };
}
```

#### Acceptance Criteria
- [ ] useCountrySelection hook created and exported
- [ ] Hook uses useAtom for Jotai integration
- [ ] Returns UseCountrySelectionReturn interface
- [ ] selectedCountry reflects current atom state
- [ ] searchQuery reflects current atom state
- [ ] filteredCountries reflects filtered list from derived atom
- [ ] selectCountry function updates selectedCountryAtom
- [ ] clearSelection function sets selectedCountry to null
- [ ] setSearchQuery function updates search query
- [ ] clearSearch function resets search to empty string
- [ ] NO useState used anywhere
- [ ] Includes JSDoc example usage
- [ ] Types are strict and complete

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify hook exports
# Verify UseCountrySelectionReturn interface is exported
```

---

### Subtask 016.3: Hook Utilities and Computed Helpers

#### Status
status: pending

#### Objective
Create utility functions for country selection operations like checking if a country is selected and finding countries by code.

#### Context
Utility functions provide convenient operations for common tasks. Helper functions reduce boilerplate in components and improve code clarity. These utilities work with the atoms to provide useful computed values and search operations. They're separate from the main hook but exported from the same module for easy access.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useCountrySelection.ts` - Add utility functions

#### Implementation

```typescript
// (continuing from Subtask 016.2 code)

import { useSetAtom, useAtomValue } from 'jotai';
import { EUROPEAN_COUNTRIES } from '@/atoms/countryAtom';

/**
 * Utility function to find a country by its code
 * @param code ISO 3166-1 alpha-2 country code
 * @returns Country object or undefined if not found
 */
export function findCountryByCode(code: string): Country | undefined {
  return EUROPEAN_COUNTRIES.find(
    (country) => country.code.toUpperCase() === code.toUpperCase()
  );
}

/**
 * Utility function to find a country by its name
 * Case-insensitive search
 * @param name Country name to search for
 * @returns Country object or undefined if not found
 */
export function findCountryByName(name: string): Country | undefined {
  const searchName = name.toLowerCase();
  return EUROPEAN_COUNTRIES.find(
    (country) =>
      country.name.toLowerCase() === searchName ||
      country.nativeName?.toLowerCase() === searchName
  );
}

/**
 * Utility function to get countries by continent
 * @param continent Continent name
 * @returns Array of countries in that continent
 */
export function getCountriesByContinent(continent: string): Country[] {
  return EUROPEAN_COUNTRIES.filter(
    (country) => country.continent.toLowerCase() === continent.toLowerCase()
  );
}

/**
 * Hook to get current selection state (read-only)
 * Returns only selectedCountry without mutation functions
 */
export function useSelectedCountry(): Country | null {
  return useAtomValue(selectedCountryAtom);
}

/**
 * Hook to get filtered countries list (read-only)
 * Useful when you only need the filtered list, not the full hook
 */
export function useFilteredCountries(): Country[] {
  return useAtomValue(filteredCountriesAtom);
}

/**
 * Hook to update country selection (write-only)
 * Useful for controlled components that only need to select
 */
export function useSelectCountry(): (country: Country) => void {
  const [, setSelectedCountry] = useAtom(selectedCountryAtom);
  return (country: Country) => setSelectedCountry(country);
}

/**
 * Hook to update search query (write-only)
 * Useful for search input components
 */
export function useCountrySearchQuery(): {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
} {
  const [query, setQuery] = useAtom(countrySearchQueryAtom);

  return {
    query,
    setQuery,
    clearQuery: () => setQuery(''),
  };
}
```

#### Acceptance Criteria
- [ ] findCountryByCode utility function works correctly
- [ ] findCountryByName utility function performs case-insensitive search
- [ ] getCountriesByContinent returns only countries from specified continent
- [ ] useSelectedCountry hook returns current country (read-only)
- [ ] useFilteredCountries hook returns filtered list (read-only)
- [ ] useSelectCountry hook returns selection function
- [ ] useCountrySearchQuery hook returns query and mutation functions
- [ ] All utility functions are exported
- [ ] All hooks follow React hooks conventions
- [ ] NO useState used anywhere
- [ ] Complete JSDoc comments on all functions

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify all utility functions are exported
```

---

### Subtask 016.4: Hook Index Export and Type Definitions

#### Status
status: pending

#### Objective
Create or update the hooks index file to export useCountrySelection and all related utilities and types.

#### Context
The hooks index file centralizes all hook exports, making it convenient for components to import hooks using a single import path: `import { useCountrySelection } from '@/hooks'`. This follows the convention established in the project where all hooks are exported from a central index file.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/index.ts` - Export useCountrySelection and utilities

#### Implementation

```typescript
// Re-export all country selection related hooks and utilities
export {
  useCountrySelection,
  useSelectedCountry,
  useFilteredCountries,
  useSelectCountry,
  useCountrySearchQuery,
  findCountryByCode,
  findCountryByName,
  getCountriesByContinent,
} from './useCountrySelection';

// Re-export types
export type { UseCountrySelectionReturn } from './useCountrySelection';
export type { Country } from '@/atoms/countryAtom';

// Export all other hooks (to be added as project grows)
// Example: useTheme, useLanguage, etc. will be added here
```

#### Acceptance Criteria
- [ ] useCountrySelection hook is exported from index
- [ ] All utility functions exported from index
- [ ] UseCountrySelectionReturn type exported
- [ ] Country type exported from atoms
- [ ] Index file is located at src/hooks/index.ts
- [ ] All exports follow named export convention
- [ ] No circular dependencies
- [ ] Index file can be imported by other modules

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify import paths resolve correctly
# Test: import { useCountrySelection } from '@/hooks'
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/countryAtom.ts`
- `src/hooks/useCountrySelection.ts`
- `src/hooks/index.ts`

### Imports From Existing Code
- `jotai` - useAtom, useAtomValue from external package
- `jotai` - atom function for creating atoms

### Exports For Other Code
- `useCountrySelection` - Main hook for country selection
- `useSelectedCountry` - Read-only hook for selected country
- `useFilteredCountries` - Read-only hook for filtered list
- `useSelectCountry` - Write-only hook for selection
- `useCountrySearchQuery` - Hook for search query management
- `findCountryByCode` - Utility function
- `findCountryByName` - Utility function
- `getCountriesByContinent` - Utility function
- `Country` - Type definition
- `UseCountrySelectionReturn` - Return type definition

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint

# Test imports resolve
cat > /tmp/test-import.ts << 'EOF'
import { useCountrySelection, Country } from '@/hooks';
const test: ReturnType<typeof useCountrySelection> = {
  selectedCountry: null,
  searchQuery: '',
  filteredCountries: [],
  filteredCountriesCount: 0,
  selectCountry: () => {},
  setSearchQuery: () => {},
  clearSelection: () => {},
  clearSearch: () => {},
};
EOF

# Verify atoms exist
test -f src/atoms/countryAtom.ts && echo "Country atom file exists"
test -f src/hooks/useCountrySelection.ts && echo "Hook file exists"
test -f src/hooks/index.ts && echo "Index file exists"
```

---

## Parallelization Notes
- All 4 subtasks in this task can run in parallel
- Each subtask owns exclusive files
- No subtask depends on another subtask's output
- Subtask 016.1 (atoms) and 016.2 (hook) can be created simultaneously
- Subtask 016.3 (utilities) can be added to hook after basic implementation
- Subtask 016.4 (index) depends only on subtask 016.2 existing but can be prepared in parallel
- All subtasks together create a complete, independent country selection system
- No other task depends on this task's output yet (will be used in task 17+)
