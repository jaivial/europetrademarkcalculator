# Frontend Task 4: Core Jotai Atoms - Country Selection State

## Metadata
- **Task**: 4 of 40
- **Area**: Frontend
- **Feature**: Country Selection State Management
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Implement Jotai atoms for managing country selection state across the application. This task creates the foundational reactive state management for country selection, search queries, and derived filtered lists. All atoms are independent, use no React hooks, and enable reactive UI updates without useState.

---

## Subtasks

### Subtask 4.1: Selected Country Atom

#### Status
status: pending

#### Objective
Create a Jotai atom that stores the currently selected country as primitive state.

#### Context
The selectedCountryAtom serves as the primary atom for tracking which country the user has selected. This is the foundation for country selection state and will be imported by country selection components. Keeping it separate from other atoms ensures single responsibility and allows independent updates.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/countryAtom.ts` - Create file with selectedCountryAtom definition

#### Implementation

```typescript
import { atom } from 'jotai';

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  language: string;
}

/**
 * Atom storing the currently selected country
 * Default: null (no country selected)
 * Used by: Country selection components, forms, calculations
 */
export const selectedCountryAtom = atom<Country | null>(null);
```

#### Acceptance Criteria
- [ ] selectedCountryAtom is exported from countryAtom.ts
- [ ] Country interface is properly typed with all required fields
- [ ] Atom initializes with null as default value
- [ ] Atom is generic and reusable across components
- [ ] No console errors when atom is imported and used

#### Verification Commands
```bash
npm run type-check
```

---

### Subtask 4.2: Country Search Query Atom

#### Status
status: pending

#### Objective
Create a Jotai atom that stores the user's search query for filtering countries.

#### Context
The searchQueryAtom tracks text input from the user as they type to search for countries. This is a simple string atom that will be used with the derived filtered atom to dynamically update the country list based on search criteria. Separating this from the results allows for independent updates and clear data flow.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/countryAtom.ts` - Add searchQueryAtom to existing file

#### Implementation

```typescript
/**
 * Atom storing the current search query for country filtering
 * Default: empty string (no search active)
 * Updated by: Search input component onChange handlers
 * Used with: filteredCountriesAtom to compute results
 */
export const searchQueryAtom = atom<string>('');
```

#### Acceptance Criteria
- [ ] searchQueryAtom is exported from countryAtom.ts
- [ ] Initializes with empty string as default
- [ ] Accepts any string value for country name/code search
- [ ] Works independently without needing other atoms
- [ ] Type-checks without errors

#### Verification Commands
```bash
npm run type-check
```

---

### Subtask 4.3: Filtered Countries Derived Atom

#### Status
status: pending

#### Objective
Create a derived Jotai atom that computes filtered country list based on search query, automatically updating when search changes.

#### Context
The filteredCountriesAtom is a derived atom that depends on searchQueryAtom and a hardcoded country list. It uses atom with a getter to reactively filter countries by name or code matching the search query (case-insensitive). This derived approach means the filtered list updates automatically whenever the search query changes, without manual component logic.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/countryAtom.ts` - Add filteredCountriesAtom and COUNTRIES constant

#### Implementation

```typescript
/**
 * Complete list of supported countries
 * Used as the base data for filtering operations
 */
export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', language: 'English' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', language: 'English' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', language: 'English' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', language: 'English' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', language: 'German' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', language: 'French' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', language: 'Spanish' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', language: 'Italian' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', language: 'Japanese' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', language: 'Chinese' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', language: 'Hindi' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', language: 'Portuguese' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', language: 'Spanish' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', language: 'English' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', language: 'English' },
];

/**
 * Derived atom that filters countries based on search query
 * Automatically updates when searchQueryAtom changes
 * Filter logic: case-insensitive match on country name or code
 * Returns: array of matching countries, or full list if query is empty
 */
export const filteredCountriesAtom = atom((get) => {
  const query = get(searchQueryAtom).toLowerCase().trim();

  // Return all countries if search is empty
  if (!query) {
    return COUNTRIES;
  }

  // Filter countries by name or code match
  return COUNTRIES.filter((country) => {
    const nameMatch = country.name.toLowerCase().includes(query);
    const codeMatch = country.code.toLowerCase().includes(query);
    return nameMatch || codeMatch;
  });
});
```

#### Acceptance Criteria
- [ ] filteredCountriesAtom is a derived atom using atom(getter) pattern
- [ ] COUNTRIES array is populated with at least 10 countries
- [ ] Each Country object has all required properties
- [ ] Filter logic is case-insensitive
- [ ] Filter searches both name and code fields
- [ ] Returns full COUNTRIES list when query is empty
- [ ] Returns empty array when no matches found
- [ ] Automatically updates when searchQueryAtom changes
- [ ] Type-checks without errors

#### Verification Commands
```bash
npm run type-check
```

---

### Subtask 4.4: Country Atom Exports and Tests

#### Status
status: pending

#### Objective
Create unit tests to verify atom behavior and ensure atoms are properly exported for consumption by other modules.

#### Context
Testing the atoms ensures they work as expected: searchQueryAtom updates correctly, selectedCountryAtom holds country objects, and filteredCountriesAtom correctly derives filtered results based on search input. These tests validate the foundational state management before components consume these atoms.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/countryAtom.ts` - Finalize exports
- `src/atoms/countryAtom.test.ts` - Create comprehensive test suite

#### Implementation

```typescript
// countryAtom.test.ts
import { createTestUtils } from 'jotai-test-utils';
import {
  selectedCountryAtom,
  searchQueryAtom,
  filteredCountriesAtom,
  COUNTRIES,
  Country,
} from './countryAtom';

describe('Country Atoms', () => {
  describe('selectedCountryAtom', () => {
    it('should initialize with null', () => {
      const { getAtomValue } = createTestUtils();
      const value = getAtomValue(selectedCountryAtom);
      expect(value).toBeNull();
    });

    it('should store a country object', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      const testCountry = COUNTRIES[0];
      setAtomValue(selectedCountryAtom, testCountry);
      const value = getAtomValue(selectedCountryAtom);
      expect(value).toEqual(testCountry);
      expect(value?.code).toBe('US');
    });

    it('should allow clearing selection', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(selectedCountryAtom, COUNTRIES[0]);
      setAtomValue(selectedCountryAtom, null);
      const value = getAtomValue(selectedCountryAtom);
      expect(value).toBeNull();
    });
  });

  describe('searchQueryAtom', () => {
    it('should initialize with empty string', () => {
      const { getAtomValue } = createTestUtils();
      const value = getAtomValue(searchQueryAtom);
      expect(value).toBe('');
    });

    it('should update with new search query', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(searchQueryAtom, 'United');
      const value = getAtomValue(searchQueryAtom);
      expect(value).toBe('United');
    });

    it('should accept various string inputs', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      const testCases = ['US', 'japan', 'FRANCE', 'bra', '123'];
      testCases.forEach((query) => {
        setAtomValue(searchQueryAtom, query);
        expect(getAtomValue(searchQueryAtom)).toBe(query);
      });
    });
  });

  describe('filteredCountriesAtom', () => {
    it('should return all countries when search is empty', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(searchQueryAtom, '');
      const filtered = getAtomValue(filteredCountriesAtom);
      expect(filtered).toEqual(COUNTRIES);
      expect(filtered.length).toBe(COUNTRIES.length);
    });

    it('should filter by country name', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(searchQueryAtom, 'United');
      const filtered = getAtomValue(filteredCountriesAtom);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((c) => c.name.toLowerCase().includes('united'))).toBe(true);
    });

    it('should filter by country code', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(searchQueryAtom, 'US');
      const filtered = getAtomValue(filteredCountriesAtom);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.some((c) => c.code === 'US')).toBe(true);
    });

    it('should be case-insensitive', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(searchQueryAtom, 'japan');
      const filtered1 = getAtomValue(filteredCountriesAtom);
      setAtomValue(searchQueryAtom, 'JAPAN');
      const filtered2 = getAtomValue(filteredCountriesAtom);
      expect(filtered1).toEqual(filtered2);
    });

    it('should trim whitespace from query', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(searchQueryAtom, '  US  ');
      const filtered = getAtomValue(filteredCountriesAtom);
      expect(filtered.some((c) => c.code === 'US')).toBe(true);
    });

    it('should return empty array for no matches', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();
      setAtomValue(searchQueryAtom, 'XYZ123');
      const filtered = getAtomValue(filteredCountriesAtom);
      expect(filtered.length).toBe(0);
      expect(Array.isArray(filtered)).toBe(true);
    });

    it('should update when search query changes', () => {
      const { getAtomValue, setAtomValue } = createTestUtils();

      setAtomValue(searchQueryAtom, 'United');
      const filtered1 = getAtomValue(filteredCountriesAtom);

      setAtomValue(searchQueryAtom, 'Japan');
      const filtered2 = getAtomValue(filteredCountriesAtom);

      expect(filtered1).not.toEqual(filtered2);
      expect(filtered1.some((c) => c.code === 'US')).toBe(true);
      expect(filtered2.some((c) => c.code === 'JP')).toBe(true);
    });
  });

  describe('COUNTRIES data', () => {
    it('should have minimum countries', () => {
      expect(COUNTRIES.length).toBeGreaterThanOrEqual(10);
    });

    it('should have valid country objects', () => {
      COUNTRIES.forEach((country) => {
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('name');
        expect(country).toHaveProperty('flag');
        expect(country).toHaveProperty('currency');
        expect(country).toHaveProperty('language');
        expect(typeof country.code).toBe('string');
        expect(typeof country.name).toBe('string');
        expect(typeof country.flag).toBe('string');
        expect(typeof country.currency).toBe('string');
        expect(typeof country.language).toBe('string');
      });
    });

    it('should have unique country codes', () => {
      const codes = COUNTRIES.map((c) => c.code);
      const uniqueCodes = new Set(codes);
      expect(codes.length).toBe(uniqueCodes.size);
    });
  });
});
```

#### Acceptance Criteria
- [ ] All atoms are properly exported from countryAtom.ts
- [ ] Country interface is exported for external use
- [ ] COUNTRIES constant is exported
- [ ] Test file covers all atoms and their behavior
- [ ] Tests verify initialization values
- [ ] Tests verify update behavior
- [ ] Tests verify derived atom computation
- [ ] All tests pass without errors
- [ ] Type-checking passes

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="countryAtom"
npm test -- --testPathPattern="countryAtom" --coverage
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/countryAtom.ts`
- `src/atoms/countryAtom.test.ts`

### Imports From Existing Code
- `jotai` - atom creation and management
- `jotai-test-utils` - testing utilities (if available, otherwise use @testing-library/react with Jotai)

### Exports For Other Code
- `selectedCountryAtom` - exported atom for country selection
- `searchQueryAtom` - exported atom for search input
- `filteredCountriesAtom` - exported derived atom for filtered results
- `Country` - exported interface for type safety
- `COUNTRIES` - exported array of available countries

---

## Task-Level Verification
```bash
# Type checking
npm run type-check

# Run all tests for this task
npm test -- --testPathPattern="countryAtom"

# With coverage report
npm test -- --testPathPattern="countryAtom" --coverage

# Linting
npm run lint -- src/atoms/countryAtom.ts
npm run lint -- src/atoms/countryAtom.test.ts
```

---

## Parallelization Notes
- All 4 subtasks are completely independent and can execute in parallel
- Subtask 4.1 and 4.2 create primitive atoms with no dependencies
- Subtask 4.3 depends only on atoms from 4.1 and 4.2, but implements complete logic
- Subtask 4.4 adds tests without modifying core atom logic
- No subtask blocks any other subtask
- All subtasks write to the same file but handle distinct atoms and functions
- Can be merged by concatenating implementations without conflicts
