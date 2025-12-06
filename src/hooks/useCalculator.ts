import { useAtom } from 'jotai';
import type { CountryCode, TrademarkClass, FilingType, PriceBreakdown, CalculatorConfig } from '@/types';
import {
  selectedCountriesAtom,
  selectedClassesAtom,
  filingTypeAtom,
  selectedOptionsAtom,
  priorityLevelAtom,
  classCountAtom,
  hasSelectedCountriesAtom,
  hasSelectedClassesAtom,
  isReadyToCalculateAtom,
  selectedOptionsCountAtom,
  clearCalculatorAtom,
  addCountryAtom,
  removeCountryAtom,
  addClassAtom,
  removeClassAtom,
  addOptionAtom,
  removeOptionAtom,
  toggleOptionAtom,
  setCountriesAtom,
  setClassesAtom,
  setFilingTypeAtom,
  setOptionsAtom,
  setPriorityAtom,
} from '@/atoms/calculatorAtom';
import { generatePriceBreakdown } from '@/utils/priceCalculator';

/**
 * Return type for useCalculator hook
 */
export interface UseCalculatorReturn {
  // State readers
  selectedCountries: CountryCode[];
  selectedClasses: TrademarkClass[];
  filingType: FilingType;
  selectedOptions: string[];
  priorityLevel: 'standard' | 'expedited' | 'premium';
  classCount: number;
  optionCount: number;

  // State predicates
  hasCountries: boolean;
  hasClasses: boolean;
  isReady: boolean;

  // Country operations
  addCountry: (countryCode: CountryCode) => void;
  removeCountry: (countryCode: CountryCode) => void;
  setCountries: (countries: CountryCode[]) => void;
  isCountrySelected: (countryCode: CountryCode) => boolean;

  // Class operations
  addClass: (trademarkClass: TrademarkClass) => void;
  removeClass: (trademarkClass: TrademarkClass) => void;
  setClasses: (classes: TrademarkClass[]) => void;
  isClassSelected: (trademarkClass: TrademarkClass) => boolean;

  // Filing type operations
  setFilingType: (filingType: FilingType) => void;

  // Option operations
  addOption: (optionId: string) => void;
  removeOption: (optionId: string) => void;
  toggleOption: (optionId: string) => void;
  setOptions: (options: string[]) => void;
  isOptionSelected: (optionId: string) => boolean;

  // Priority operations
  setPriority: (priority: 'standard' | 'expedited' | 'premium') => void;

  // Price calculations
  priceBreakdown: PriceBreakdown;
  totalPrice: number;

  // Reset
  clear: () => void;

  // Config snapshot
  getConfig: () => CalculatorConfig;
}

/**
 * useCalculator Hook
 * Manages all calculator state using Jotai atoms
 * NO useState - pure atom-based state management
 *
 * @returns {UseCalculatorReturn} Calculator state and operations
 *
 * @example
 * const calculator = useCalculator();
 * calculator.addCountry(countryCode);
 * calculator.addClass(trademarkClass);
 * calculator.setPriority('expedited');
 * console.log(calculator.priceBreakdown);
 */
export function useCalculator(): UseCalculatorReturn {
  // Read state from atoms
  const [countries] = useAtom(selectedCountriesAtom);
  const [classes] = useAtom(selectedClassesAtom);
  const [filingType] = useAtom(filingTypeAtom);
  const [options] = useAtom(selectedOptionsAtom);
  const [priority] = useAtom(priorityLevelAtom);

  // Read derived state
  const [classCount] = useAtom(classCountAtom);
  const [hasCountries] = useAtom(hasSelectedCountriesAtom);
  const [hasClasses] = useAtom(hasSelectedClassesAtom);
  const [isReady] = useAtom(isReadyToCalculateAtom);
  const [optionCount] = useAtom(selectedOptionsCountAtom);

  // Get write atoms for state updates
  const [, addCountry] = useAtom(addCountryAtom);
  const [, removeCountry] = useAtom(removeCountryAtom);
  const [, addClass] = useAtom(addClassAtom);
  const [, removeClass] = useAtom(removeClassAtom);
  const [, addOption] = useAtom(addOptionAtom);
  const [, removeOption] = useAtom(removeOptionAtom);
  const [, toggleOption] = useAtom(toggleOptionAtom);
  const [, clearAll] = useAtom(clearCalculatorAtom);
  const [, setCountries] = useAtom(setCountriesAtom);
  const [, setClasses] = useAtom(setClassesAtom);
  const [, setFilingTypeWrite] = useAtom(setFilingTypeAtom);
  const [, setOptions] = useAtom(setOptionsAtom);
  const [, setPriority] = useAtom(setPriorityAtom);

  // Generate price breakdown
  const priceBreakdown = generatePriceBreakdown(
    filingType,
    classCount,
    options,
    priority
  );

  // Helper to check if country is selected
  const isCountrySelected = (countryCode: CountryCode): boolean => {
    return countries.includes(countryCode);
  };

  // Helper to check if class is selected
  const isClassSelected = (trademarkClass: TrademarkClass): boolean => {
    return classes.includes(trademarkClass);
  };

  // Helper to check if option is selected
  const isOptionSelected = (optionId: string): boolean => {
    return options.includes(optionId);
  };

  // Get current configuration snapshot
  const getConfig = (): CalculatorConfig => ({
    selectedCountries: countries,
    selectedClasses: classes,
    filingType,
    selectedOptions: options,
    includeInternational: false,
    priority,
  });

  return {
    // State readers
    selectedCountries: countries,
    selectedClasses: classes,
    filingType,
    selectedOptions: options,
    priorityLevel: priority,
    classCount,
    optionCount,

    // State predicates
    hasCountries,
    hasClasses,
    isReady,

    // Country operations
    addCountry,
    removeCountry,
    setCountries,
    isCountrySelected,

    // Class operations
    addClass,
    removeClass,
    setClasses,
    isClassSelected,

    // Filing type operations
    setFilingType: setFilingTypeWrite,

    // Option operations
    addOption,
    removeOption,
    toggleOption,
    setOptions,
    isOptionSelected,

    // Priority operations
    setPriority,

    // Price calculations
    priceBreakdown,
    totalPrice: priceBreakdown.total,

    // Reset
    clear: clearAll,

    // Config snapshot
    getConfig,
  };
}

export default useCalculator;
