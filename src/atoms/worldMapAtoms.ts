import { atom } from 'jotai';

/**
 * Currently selected country (only one can be selected at a time)
 * null means no country is selected
 */
export const selectedCountryAtom = atom<string | null>(null);

/**
 * Currently hovered country for visual feedback
 * null means no country is being hovered
 */
export const hoveredCountryAtom = atom<string | null>(null);

/**
 * History of selected countries in current session
 * Used for undo/redo and tracking user interactions
 */
export const selectionHistoryAtom = atom<string[]>([]);

/**
 * Currently visible countries on the globe
 * Based on camera position and rotation
 */
export const visibleCountriesAtom = atom<Set<string>>(new Set<string>());

/**
 * Country metadata cache - stores country information
 * Maps country code to country details
 */
export interface CountryMetadata {
  code: string;
  name: string;
  nativeNames?: Record<string, string>;
  region?: string;
  subregion?: string;
  area?: number;
  population?: number;
  flag?: string;
  languages?: string[];
  currencies?: string[];
}

export const countryMetadataAtom = atom<Map<string, CountryMetadata>>(
  new Map()
);

/**
 * Calculation state for the selected country
 * Used to store pricing and calculation results
 */
export interface CountryCalculation {
  countryCode: string;
  costPerYear: number;
  processingDays: number;
  maintenanceFee: number;
  totalClasses: number;
}

export const countryCalculationAtom = atom<CountryCalculation | null>(null);

/**
 * Multi-select mode atom - allows selecting multiple countries
 * Derived from selectedCountryAtom and selectionHistoryAtom
 */
export const multiSelectEnabledAtom = atom(false);

export const selectedCountriesAtom = atom<Set<string>>((get) => {
  const multiSelectEnabled = get(multiSelectEnabledAtom);
  const selected = get(selectedCountryAtom);
  const history = get(selectionHistoryAtom);

  if (multiSelectEnabled) {
    return new Set(history);
  }

  return selected ? new Set([selected]) : new Set();
});

/**
 * Derived atom for selected country display name
 */
export const selectedCountryNameAtom = atom<string | null>((get) => {
  const selected = get(selectedCountryAtom);
  if (!selected) return null;

  const metadata = get(countryMetadataAtom);
  return metadata.get(selected)?.name ?? selected;
});

/**
 * Derived atom for selection count
 */
export const selectionCountAtom = atom((get) => {
  return get(selectedCountriesAtom).size;
});

/**
 * Clear all selections
 */
export const clearSelectionsAtom = atom(null, (_get, set) => {
  set(selectedCountryAtom, null);
  set(selectionHistoryAtom, []);
  set(hoveredCountryAtom, null);
});

/**
 * Add country to selection history
 */
export const addToHistoryAtom = atom(
  null,
  (get, set, countryCode: string) => {
    const history = get(selectionHistoryAtom);
    const updated = [...history, countryCode];
    set(selectionHistoryAtom, updated);
  }
);

/**
 * Undo last selection
 */
export const undoSelectionAtom = atom(null, (get, set) => {
  const history = get(selectionHistoryAtom);
  if (history.length === 0) return;

  const updated = history.slice(0, -1);
  set(selectionHistoryAtom, updated);

  if (updated.length > 0) {
    set(selectedCountryAtom, updated[updated.length - 1]);
  } else {
    set(selectedCountryAtom, null);
  }
});
