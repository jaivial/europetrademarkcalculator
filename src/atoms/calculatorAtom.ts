import { atom } from 'jotai';
import type { CountryCode, TrademarkClass, FilingType } from '@/types';
import { FilingType as FilingTypeEnum } from '@/types';

/**
 * Calculator Atom Definitions
 * Manages all calculator state using Jotai
 * NO useState - pure atom-based state
 */

/**
 * Selected countries for trademark filing
 * User can select one or multiple countries
 */
export const selectedCountriesAtom = atom<CountryCode[]>([]);

/**
 * Selected trademark classes (Nice Classification 1-45)
 * User can select multiple classes for filing
 */
export const selectedClassesAtom = atom<TrademarkClass[]>([]);

/**
 * Filing type: individual, collective, or certification
 * Determines base pricing and features
 */
export const filingTypeAtom = atom<FilingType>(FilingTypeEnum.Individual);

/**
 * Selected additional services/options
 * Stores IDs of selected options like monitoring, legal support, etc.
 */
export const selectedOptionsAtom = atom<string[]>([]);

/**
 * Priority level: standard, expedited, premium
 * Affects processing time and cost
 */
export const priorityLevelAtom = atom<'standard' | 'expedited' | 'premium'>('standard');

/**
 * Number of trademark classes
 * Derived from selectedClassesAtom
 */
export const classCountAtom = atom((get) => {
  return get(selectedClassesAtom).length;
});

/**
 * Check if any country is selected
 * Derived atom for convenience
 */
export const hasSelectedCountriesAtom = atom((get) => {
  return get(selectedCountriesAtom).length > 0;
});

/**
 * Check if any class is selected
 * Derived atom for convenience
 */
export const hasSelectedClassesAtom = atom((get) => {
  return get(selectedClassesAtom).length > 0;
});

/**
 * Check if calculator is ready for calculation
 * Requires at least one country and one class
 */
export const isReadyToCalculateAtom = atom((get) => {
  const hasCountries = get(hasSelectedCountriesAtom);
  const hasClasses = get(hasSelectedClassesAtom);
  return hasCountries && hasClasses;
});

/**
 * Number of selected options
 * Derived from selectedOptionsAtom
 */
export const selectedOptionsCountAtom = atom((get) => {
  return get(selectedOptionsAtom).length;
});

/**
 * Clear all calculator selections
 * Returns to initial state
 */
export const clearCalculatorAtom = atom(null, (_get, set) => {
  set(selectedCountriesAtom, []);
  set(selectedClassesAtom, []);
  set(filingTypeAtom, FilingTypeEnum.Individual);
  set(selectedOptionsAtom, []);
  set(priorityLevelAtom, 'standard');
});

/**
 * Add a country to selected countries
 * Prevents duplicates automatically
 */
export const addCountryAtom = atom(null, (_get, set, countryCode: CountryCode) => {
  const current = _get(selectedCountriesAtom);
  if (!current.includes(countryCode)) {
    set(selectedCountriesAtom, [...current, countryCode]);
  }
});

/**
 * Remove a country from selected countries
 */
export const removeCountryAtom = atom(null, (_get, set, countryCode: CountryCode) => {
  const current = _get(selectedCountriesAtom);
  set(selectedCountriesAtom, current.filter((c) => c !== countryCode));
});

/**
 * Add a trademark class to selected classes
 * Prevents duplicates automatically
 */
export const addClassAtom = atom(null, (_get, set, trademarkClass: TrademarkClass) => {
  const current = _get(selectedClassesAtom);
  if (!current.includes(trademarkClass)) {
    set(selectedClassesAtom, [...current, trademarkClass]);
  }
});

/**
 * Remove a trademark class from selected classes
 */
export const removeClassAtom = atom(null, (_get, set, trademarkClass: TrademarkClass) => {
  const current = _get(selectedClassesAtom);
  set(selectedClassesAtom, current.filter((c) => c !== trademarkClass));
});

/**
 * Add an option to selected options
 * Prevents duplicates automatically
 */
export const addOptionAtom = atom(null, (_get, set, optionId: string) => {
  const current = _get(selectedOptionsAtom);
  if (!current.includes(optionId)) {
    set(selectedOptionsAtom, [...current, optionId]);
  }
});

/**
 * Remove an option from selected options
 */
export const removeOptionAtom = atom(null, (_get, set, optionId: string) => {
  const current = _get(selectedOptionsAtom);
  set(selectedOptionsAtom, current.filter((id) => id !== optionId));
});

/**
 * Toggle an option in selected options
 */
export const toggleOptionAtom = atom(null, (_get, set, optionId: string) => {
  const current = _get(selectedOptionsAtom);
  if (current.includes(optionId)) {
    set(selectedOptionsAtom, current.filter((id) => id !== optionId));
  } else {
    set(selectedOptionsAtom, [...current, optionId]);
  }
});

/**
 * Replace all selected countries
 */
export const setCountriesAtom = atom(null, (_get, set, countries: CountryCode[]) => {
  set(selectedCountriesAtom, countries);
});

/**
 * Replace all selected classes
 */
export const setClassesAtom = atom(null, (_get, set, classes: TrademarkClass[]) => {
  set(selectedClassesAtom, classes);
});

/**
 * Set filing type
 */
export const setFilingTypeAtom = atom(null, (_get, set, filingType: FilingType) => {
  set(filingTypeAtom, filingType);
});

/**
 * Replace all selected options
 */
export const setOptionsAtom = atom(null, (_get, set, options: string[]) => {
  set(selectedOptionsAtom, options);
});

/**
 * Set priority level
 */
export const setPriorityAtom = atom(null, (_get, set, priority: 'standard' | 'expedited' | 'premium') => {
  set(priorityLevelAtom, priority);
});
