import { useAtom, useAtomValue } from 'jotai';
import {
  Country,
  selectedCountryAtom,
  countrySearchQueryAtom,
  filteredCountriesAtom,
  filteredCountriesCountAtom,
  EUROPEAN_COUNTRIES
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
