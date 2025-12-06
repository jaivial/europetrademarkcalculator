# Frontend Task 017: Custom useCalculator Hook

## Metadata
- **Task**: 17 of 40
- **Area**: Frontend
- **Feature**: Calculator State Management Hook
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the `useCalculator` custom hook that provides comprehensive calculator state management using Jotai atoms (NO useState). The hook exposes calculator configuration, selected classes, filing types, service management, and price calculations with complete type safety. This hook is the primary interface for components to interact with calculator state.

---

## Subtasks

### Subtask 017.1: Calculator Atom Definitions

#### Status
status: pending

#### Objective
Create Jotai atoms for calculator state including selected countries, classes, filing type, and options.

#### Context
The calculator atom definitions establish the single source of truth for all calculator state. Using Jotai atoms eliminates the need for useState and enables predictable, testable state management. All atoms are read and updated through this module.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/calculatorAtom.ts` - Core calculator atoms with full state management

#### Implementation

```typescript
import { atom } from 'jotai';
import type { CountryCode, TrademarkClass, FilingType, CalculatorOption } from '@/types';
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
export const clearCalculatorAtom = atom(null, (get, set) => {
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
export const addCountryAtom = atom(null, (get, set, countryCode: CountryCode) => {
  const current = get(selectedCountriesAtom);
  if (!current.includes(countryCode)) {
    set(selectedCountriesAtom, [...current, countryCode]);
  }
});

/**
 * Remove a country from selected countries
 */
export const removeCountryAtom = atom(null, (get, set, countryCode: CountryCode) => {
  const current = get(selectedCountriesAtom);
  set(selectedCountriesAtom, current.filter((c) => c !== countryCode));
});

/**
 * Add a trademark class to selected classes
 * Prevents duplicates automatically
 */
export const addClassAtom = atom(null, (get, set, trademarkClass: TrademarkClass) => {
  const current = get(selectedClassesAtom);
  if (!current.includes(trademarkClass)) {
    set(selectedClassesAtom, [...current, trademarkClass]);
  }
});

/**
 * Remove a trademark class from selected classes
 */
export const removeClassAtom = atom(null, (get, set, trademarkClass: TrademarkClass) => {
  const current = get(selectedClassesAtom);
  set(selectedClassesAtom, current.filter((c) => c !== trademarkClass));
});

/**
 * Add an option to selected options
 * Prevents duplicates automatically
 */
export const addOptionAtom = atom(null, (get, set, optionId: string) => {
  const current = get(selectedOptionsAtom);
  if (!current.includes(optionId)) {
    set(selectedOptionsAtom, [...current, optionId]);
  }
});

/**
 * Remove an option from selected options
 */
export const removeOptionAtom = atom(null, (get, set, optionId: string) => {
  const current = get(selectedOptionsAtom);
  set(selectedOptionsAtom, current.filter((id) => id !== optionId));
});

/**
 * Toggle an option in selected options
 */
export const toggleOptionAtom = atom(null, (get, set, optionId: string) => {
  const current = get(selectedOptionsAtom);
  if (current.includes(optionId)) {
    set(selectedOptionsAtom, current.filter((id) => id !== optionId));
  } else {
    set(selectedOptionsAtom, [...current, optionId]);
  }
});

/**
 * Replace all selected countries
 */
export const setCountriesAtom = atom(null, (get, set, countries: CountryCode[]) => {
  set(selectedCountriesAtom, countries);
});

/**
 * Replace all selected classes
 */
export const setClassesAtom = atom(null, (get, set, classes: TrademarkClass[]) => {
  set(selectedClassesAtom, classes);
});

/**
 * Set filing type
 */
export const setFilingTypeAtom = atom(null, (get, set, filingType: FilingType) => {
  set(filingTypeAtom, filingType);
});

/**
 * Replace all selected options
 */
export const setOptionsAtom = atom(null, (get, set, options: string[]) => {
  set(selectedOptionsAtom, options);
});

/**
 * Set priority level
 */
export const setPriorityAtom = atom(null, (get, set, priority: 'standard' | 'expedited' | 'premium') => {
  set(priorityLevelAtom, priority);
});
```

#### Acceptance Criteria
- [ ] All calculator atoms created and exported
- [ ] Write atoms for updating state (add, remove, set operations)
- [ ] Derived atoms for convenience (classCount, hasSelected, isReady)
- [ ] Clear atom to reset all state to defaults
- [ ] No useState anywhere in the file
- [ ] All atoms properly typed with TypeScript
- [ ] Duplicate prevention in add operations
- [ ] TypeScript compiles without errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/atoms/calculatorAtom.ts
```

---

### Subtask 017.2: Price Calculation Utilities

#### Status
status: pending

#### Objective
Create price calculation functions for computing base costs, class costs, option costs, and total price with tax.

#### Context
Price calculation logic is separated from state management to keep logic clean and testable. Functions take configuration as parameters and return calculated results without side effects.

#### Files to Create/Modify (Exclusive Ownership)
- `src/utils/priceCalculator.ts` - Price calculation logic

#### Implementation

```typescript
import type {
  PriceBreakdown,
  PriceItem,
  CalculatorConfig,
  FilingOption,
  TrademarkClass
} from '@/types';

/**
 * Price Calculation Utilities
 * Pure functions for calculating trademark registration costs
 * No side effects, pure calculations
 */

/**
 * Base pricing configuration by filing type
 * Can be extended or loaded from API in production
 */
export const BASE_PRICING = {
  individual: {
    baseCost: 85, // EUR
    perClassCost: 50,
    taxRate: 0.19,
    processingDays: 5,
  },
  collective: {
    baseCost: 400,
    perClassCost: 50,
    taxRate: 0.19,
    processingDays: 10,
  },
  certification: {
    baseCost: 200,
    perClassCost: 50,
    taxRate: 0.19,
    processingDays: 10,
  },
} as const;

/**
 * Priority multipliers for expedited and premium processing
 */
export const PRIORITY_COSTS = {
  standard: 1.0,
  expedited: 1.5,
  premium: 2.0,
} as const;

/**
 * Mock options for calculation
 * In production, load from API/database
 */
export const MOCK_OPTIONS: Record<string, { name: string; cost: number }> = {
  'monitoring': { name: 'Trademark Monitoring', cost: 150 },
  'legal-support': { name: 'Legal Support', cost: 200 },
  'fast-track': { name: 'Fast Track Processing', cost: 250 },
  'eutm-certificate': { name: 'EUTM Certificate', cost: 50 },
  'madrid-system': { name: 'Madrid System Filing', cost: 300 },
};

/**
 * Calculate base filing cost with priority adjustment
 */
export function calculateBaseCost(
  filingType: string,
  priority: 'standard' | 'expedited' | 'premium' = 'standard'
): number {
  const pricing = BASE_PRICING[filingType as keyof typeof BASE_PRICING] || BASE_PRICING.individual;
  const priorityMultiplier = PRIORITY_COSTS[priority];
  return Math.round(pricing.baseCost * priorityMultiplier * 100) / 100;
}

/**
 * Calculate total cost for trademark classes
 * Cost depends on number of classes and filing type
 */
export function calculateClassesCost(
  classCount: number,
  filingType: string,
  priority: 'standard' | 'expedited' | 'premium' = 'standard'
): number {
  const pricing = BASE_PRICING[filingType as keyof typeof BASE_PRICING] || BASE_PRICING.individual;
  const priorityMultiplier = PRIORITY_COSTS[priority];
  return Math.round(
    classCount * pricing.perClassCost * priorityMultiplier * 100
  ) / 100;
}

/**
 * Calculate total cost of selected options
 */
export function calculateOptionsCost(selectedOptionIds: string[]): number {
  return selectedOptionIds.reduce((total, optionId) => {
    const option = MOCK_OPTIONS[optionId];
    return total + (option?.cost || 0);
  }, 0);
}

/**
 * Calculate subtotal before tax
 */
export function calculateSubtotal(
  baseCost: number,
  classesCost: number,
  optionsCost: number
): number {
  return Math.round((baseCost + classesCost + optionsCost) * 100) / 100;
}

/**
 * Calculate tax amount
 */
export function calculateTax(
  subtotal: number,
  taxRate: number = 0.19
): number {
  return Math.round(subtotal * taxRate * 100) / 100;
}

/**
 * Calculate final total with tax
 */
export function calculateTotal(subtotal: number, tax: number): number {
  return Math.round((subtotal + tax) * 100) / 100;
}

/**
 * Get processing days based on filing type and priority
 */
export function getProcessingDays(
  filingType: string,
  priority: 'standard' | 'expedited' | 'premium' = 'standard'
): number {
  const pricing = BASE_PRICING[filingType as keyof typeof BASE_PRICING] || BASE_PRICING.individual;
  const baseDays = pricing.processingDays;

  if (priority === 'expedited') {
    return Math.ceil(baseDays * 0.5);
  }
  if (priority === 'premium') {
    return Math.ceil(baseDays * 0.25);
  }
  return baseDays;
}

/**
 * Create price items for breakdown display
 */
function createPriceItems(
  baseCost: number,
  classCount: number,
  perClassCost: number,
  classesCost: number,
  selectedOptions: string[]
): PriceItem[] {
  const items: PriceItem[] = [
    {
      label: 'Filing Base Cost',
      quantity: 1,
      unitPrice: baseCost,
      total: baseCost,
      category: 'base',
    },
  ];

  if (classCount > 0) {
    items.push({
      label: `Trademark Classes (${classCount})`,
      quantity: classCount,
      unitPrice: perClassCost,
      total: classesCost,
      category: 'class',
    });
  }

  for (const optionId of selectedOptions) {
    const option = MOCK_OPTIONS[optionId];
    if (option) {
      items.push({
        label: option.name,
        quantity: 1,
        unitPrice: option.cost,
        total: option.cost,
        category: 'option',
      });
    }
  }

  return items;
}

/**
 * Generate complete price breakdown
 * Main calculation function that produces the PriceBreakdown
 */
export function generatePriceBreakdown(
  filingType: string,
  classCount: number,
  selectedOptionIds: string[],
  priority: 'standard' | 'expedited' | 'premium' = 'standard'
): PriceBreakdown {
  const pricing = BASE_PRICING[filingType as keyof typeof BASE_PRICING] || BASE_PRICING.individual;

  // Calculate each component
  const baseCost = calculateBaseCost(filingType, priority);
  const classesCost = calculateClassesCost(classCount, filingType, priority);
  const optionsCost = calculateOptionsCost(selectedOptionIds);
  const subtotal = calculateSubtotal(baseCost, classesCost, optionsCost);
  const taxAmount = calculateTax(subtotal, pricing.taxRate);
  const total = calculateTotal(subtotal, taxAmount);

  // Create price items for display
  const selectedOptions = createPriceItems(
    baseCost,
    classCount,
    pricing.perClassCost,
    classesCost,
    selectedOptionIds
  );

  return {
    filingBaseCost: baseCost,
    classesCount: classCount,
    perClassCost: pricing.perClassCost,
    classesTotalCost: classesCost,
    selectedOptions,
    optionsTotal: optionsCost,
    subtotal,
    taxRate: pricing.taxRate,
    taxAmount,
    total,
    currency: 'EUR',
    estimatedProcessingDays: getProcessingDays(filingType, priority),
  };
}

/**
 * Get total country count from calculator config
 */
export function getCountryCount(config: CalculatorConfig): number {
  return config.selectedCountries.length;
}

/**
 * Calculate total cost for multiple countries
 * Simple multiplication: totalCost * numberOfCountries
 */
export function calculateMultiCountryCost(
  singleCountryCost: number,
  countryCount: number
): number {
  return Math.round(singleCountryCost * countryCount * 100) / 100;
}
```

#### Acceptance Criteria
- [ ] All calculation functions pure and without side effects
- [ ] Correct handling of decimal places in currency
- [ ] Priority multipliers applied correctly
- [ ] Tax calculation accurate (19% default)
- [ ] Processing days calculated correctly
- [ ] Price items generated for breakdown display
- [ ] Mock options data available
- [ ] All calculations match business requirements
- [ ] TypeScript compiles without errors
- [ ] Functions well-documented with JSDoc

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/utils/priceCalculator.ts
```

---

### Subtask 017.3: useCalculator Hook Implementation

#### Status
status: pending

#### Objective
Create the main useCalculator hook that combines atoms and price calculation to provide calculator state and operations.

#### Context
The useCalculator hook is the primary interface for components. It wraps Jotai atom operations and price calculations, providing a clean API for calculator functionality. It uses useAtom to read and update state - NO useState.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useCalculator.ts` - Main calculator hook implementation

#### Implementation

```typescript
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
```

#### Acceptance Criteria
- [ ] Hook uses useAtom, no useState
- [ ] All state read from calculator atoms
- [ ] All state updates through atom write operations
- [ ] Price breakdown calculated on each render
- [ ] Helper functions for state queries (isCountrySelected, etc.)
- [ ] Config snapshot for external consumers
- [ ] TypeScript fully typed with UseCalculatorReturn interface
- [ ] No side effects in hook
- [ ] Well-documented with JSDoc
- [ ] Compiles without errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/hooks/useCalculator.ts
```

---

### Subtask 017.4: Hook Export and Index Update

#### Status
status: pending

#### Objective
Export useCalculator hook from hooks index file and add calculator atoms to atoms index.

#### Context
Create barrel exports to make imports convenient from @/hooks and @/atoms. This follows the project's established pattern of centralized index files.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/index.ts` - Add useCalculator export (or create if doesn't exist)
- `src/atoms/index.ts` - Add calculator atoms exports (extend existing file)

#### Implementation

**src/hooks/index.ts**:
```typescript
/**
 * Hooks Index - Central export point for all custom hooks
 * Import custom hooks from this file
 */

export { useCalculator, type UseCalculatorReturn } from './useCalculator';

/**
 * Note: Additional hooks will be added here as tasks progress
 * Examples:
 * - useTheme (task 5)
 * - useLanguage (task 6)
 * - useCountries (future task)
 * - usePricing (future task)
 */
```

**src/atoms/index.ts** (extend existing):
```typescript
/**
 * Updated atoms index to include calculator atoms
 * Add these exports to the existing theme atom exports
 */

// ... existing theme atom exports ...

// Calculator atoms
export {
  // State atoms
  selectedCountriesAtom,
  selectedClassesAtom,
  filingTypeAtom,
  selectedOptionsAtom,
  priorityLevelAtom,

  // Derived atoms
  classCountAtom,
  hasSelectedCountriesAtom,
  hasSelectedClassesAtom,
  isReadyToCalculateAtom,
  selectedOptionsCountAtom,

  // Write atoms for state updates
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
} from './calculatorAtom';

/**
 * Note: All atoms are imported and re-exported from here
 * Components should import atoms from @/atoms
 */
```

#### Acceptance Criteria
- [ ] useCalculator exported from src/hooks/index.ts
- [ ] UseCalculatorReturn type exported
- [ ] All calculator atoms exported from src/atoms/index.ts
- [ ] Imports work via @/hooks and @/atoms paths
- [ ] Index files are clean and well-organized
- [ ] TypeScript compiles without errors
- [ ] No circular imports

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/hooks/index.ts src/atoms/index.ts
```

---

### Subtask 017.5: useCalculator Hook Tests

#### Status
status: pending

#### Objective
Create comprehensive tests for the useCalculator hook covering all state operations and calculations.

#### Context
Tests ensure the hook correctly manages state, performs calculations, and maintains data integrity. Tests validate the contract that components depend on.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/__tests__/useCalculator.test.ts` - Hook tests using Vitest

#### Implementation

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../useCalculator';
import type { CountryCode, TrademarkClass } from '@/types';
import { createCountryCode, createTrademarkClass } from '@/types';

/**
 * useCalculator Hook Tests
 * Comprehensive tests for calculator state management
 */

describe('useCalculator', () => {
  // Helper to create test data
  const testCountry: CountryCode = createCountryCode('DE') as CountryCode;
  const testCountry2: CountryCode = createCountryCode('FR') as CountryCode;
  const testClass: TrademarkClass = createTrademarkClass(5)!;
  const testClass2: TrademarkClass = createTrademarkClass(35)!;

  describe('initial state', () => {
    it('should start with empty countries', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.selectedCountries).toEqual([]);
    });

    it('should start with empty classes', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.selectedClasses).toEqual([]);
    });

    it('should start with individual filing type', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.filingType).toBe('individual');
    });

    it('should start with standard priority', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.priorityLevel).toBe('standard');
    });

    it('should start with empty options', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.selectedOptions).toEqual([]);
    });
  });

  describe('country operations', () => {
    it('should add a country', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.selectedCountries).toContain(testCountry);
    });

    it('should prevent duplicate countries', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.addCountry(testCountry);
      });

      expect(result.current.selectedCountries.length).toBe(1);
    });

    it('should remove a country', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.removeCountry(testCountry);
      });

      expect(result.current.selectedCountries).not.toContain(testCountry);
    });

    it('should check if country is selected', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.isCountrySelected(testCountry)).toBe(true);
      expect(result.current.isCountrySelected(testCountry2)).toBe(false);
    });

    it('should set multiple countries', () => {
      const { result } = renderHook(() => useCalculator());
      const countries = [testCountry, testCountry2];

      act(() => {
        result.current.setCountries(countries);
      });

      expect(result.current.selectedCountries).toEqual(countries);
    });
  });

  describe('class operations', () => {
    it('should add a trademark class', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.selectedClasses).toContain(testClass);
    });

    it('should prevent duplicate classes', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.addClass(testClass);
      });

      expect(result.current.selectedClasses.length).toBe(1);
    });

    it('should remove a trademark class', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.removeClass(testClass);
      });

      expect(result.current.selectedClasses).not.toContain(testClass);
    });

    it('should check if class is selected', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.isClassSelected(testClass)).toBe(true);
      expect(result.current.isClassSelected(testClass2)).toBe(false);
    });

    it('should set multiple classes', () => {
      const { result } = renderHook(() => useCalculator());
      const classes = [testClass, testClass2];

      act(() => {
        result.current.setClasses(classes);
      });

      expect(result.current.selectedClasses).toEqual(classes);
    });

    it('should update class count', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.addClass(testClass2);
      });

      expect(result.current.classCount).toBe(2);
    });
  });

  describe('option operations', () => {
    it('should add an option', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
      });

      expect(result.current.selectedOptions).toContain(optionId);
    });

    it('should prevent duplicate options', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
        result.current.addOption(optionId);
      });

      expect(result.current.selectedOptions.length).toBe(1);
    });

    it('should remove an option', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
        result.current.removeOption(optionId);
      });

      expect(result.current.selectedOptions).not.toContain(optionId);
    });

    it('should toggle an option', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.toggleOption(optionId);
      });

      expect(result.current.isOptionSelected(optionId)).toBe(true);

      act(() => {
        result.current.toggleOption(optionId);
      });

      expect(result.current.isOptionSelected(optionId)).toBe(false);
    });

    it('should check if option is selected', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
      });

      expect(result.current.isOptionSelected(optionId)).toBe(true);
      expect(result.current.isOptionSelected('legal-support')).toBe(false);
    });
  });

  describe('filing type and priority', () => {
    it('should set filing type', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.setFilingType('collective');
      });

      expect(result.current.filingType).toBe('collective');
    });

    it('should set priority level', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.setPriority('expedited');
      });

      expect(result.current.priorityLevel).toBe('expedited');
    });
  });

  describe('state predicates', () => {
    it('should report hasCountries correctly', () => {
      const { result } = renderHook(() => useCalculator());

      expect(result.current.hasCountries).toBe(false);

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.hasCountries).toBe(true);
    });

    it('should report hasClasses correctly', () => {
      const { result } = renderHook(() => useCalculator());

      expect(result.current.hasClasses).toBe(false);

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.hasClasses).toBe(true);
    });

    it('should report isReady only when both countries and classes exist', () => {
      const { result } = renderHook(() => useCalculator());

      expect(result.current.isReady).toBe(false);

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.isReady).toBe(false);

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.isReady).toBe(true);
    });
  });

  describe('price calculations', () => {
    it('should calculate price breakdown for basic selection', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.priceBreakdown).toBeDefined();
      expect(result.current.priceBreakdown.classesCount).toBe(1);
      expect(result.current.priceBreakdown.total).toBeGreaterThan(0);
    });

    it('should include options in price calculation', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.addOption('monitoring');
      });

      const priceWithOption = result.current.priceBreakdown.total;

      const { result: result2 } = renderHook(() => useCalculator());
      act(() => {
        result2.current.addClass(testClass);
      });

      const priceWithoutOption = result2.current.priceBreakdown.total;

      expect(priceWithOption).toBeGreaterThan(priceWithoutOption);
    });

    it('should apply priority multiplier', () => {
      const { result: standardResult } = renderHook(() => useCalculator());

      act(() => {
        standardResult.current.addClass(testClass);
      });

      const standardPrice = standardResult.current.priceBreakdown.total;

      const { result: expeditedResult } = renderHook(() => useCalculator());

      act(() => {
        expeditedResult.current.addClass(testClass);
        expeditedResult.current.setPriority('expedited');
      });

      const expeditedPrice = expeditedResult.current.priceBreakdown.total;

      expect(expeditedPrice).toBeGreaterThan(standardPrice);
    });

    it('should provide totalPrice property', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.totalPrice).toBe(result.current.priceBreakdown.total);
    });
  });

  describe('clear and reset', () => {
    it('should clear all state', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.addClass(testClass);
        result.current.setFilingType('collective');
        result.current.addOption('monitoring');
        result.current.setPriority('expedited');
      });

      act(() => {
        result.current.clear();
      });

      expect(result.current.selectedCountries).toEqual([]);
      expect(result.current.selectedClasses).toEqual([]);
      expect(result.current.filingType).toBe('individual');
      expect(result.current.selectedOptions).toEqual([]);
      expect(result.current.priorityLevel).toBe('standard');
    });
  });

  describe('config snapshot', () => {
    it('should return current config', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.addClass(testClass);
        result.current.setFilingType('collective');
        result.current.addOption('monitoring');
      });

      const config = result.current.getConfig();

      expect(config.selectedCountries).toEqual([testCountry]);
      expect(config.selectedClasses).toEqual([testClass]);
      expect(config.filingType).toBe('collective');
      expect(config.selectedOptions).toEqual(['monitoring']);
    });
  });
});
```

#### Acceptance Criteria
- [ ] Initial state tests pass
- [ ] Country operation tests pass
- [ ] Class operation tests pass
- [ ] Option operation tests pass
- [ ] Filing type and priority tests pass
- [ ] State predicate tests pass
- [ ] Price calculation tests pass
- [ ] Clear/reset tests pass
- [ ] Config snapshot tests pass
- [ ] All tests use act() for state updates
- [ ] Tests are comprehensive and well-organized

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm test -- src/hooks/__tests__/useCalculator.test.ts
npm run type-check -- src/hooks/__tests__/useCalculator.test.ts
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/calculatorAtom.ts` - All calculator atom definitions
- `src/utils/priceCalculator.ts` - Price calculation logic
- `src/hooks/useCalculator.ts` - Calculator hook implementation
- `src/hooks/__tests__/useCalculator.test.ts` - Hook tests
- `src/hooks/index.ts` - Updated with useCalculator export
- `src/atoms/index.ts` - Extended with calculator atom exports

### Imports From Existing Code
- `jotai` - useAtom, atom (from npm dependencies)
- `@/types` - All calculator and domain types (task 7)
- `@/atoms` - Existing atoms for calculator (created in this task)

### Exports For Other Code
- `useCalculator` hook - imported by calculator UI components
- `UseCalculatorReturn` type - imported by components using the hook
- `calculatorAtom`, `selectedCountriesAtom`, etc. - imported by tests and advanced consumers
- Price calculation functions - imported by pricing display components

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Type check all files
npm run type-check -- src/atoms/calculatorAtom.ts src/utils/priceCalculator.ts src/hooks/useCalculator.ts

# Run all hook tests
npm test -- src/hooks/__tests__/useCalculator.test.ts

# Verify exports work via aliases
npm run type-check -- src/hooks/index.ts src/atoms/index.ts

# Run linting
npm run lint -- src/atoms/calculatorAtom.ts src/utils/priceCalculator.ts src/hooks/useCalculator.ts

# Full build check
npm run build
```

---

## Parallelization Notes
- All 5 subtasks can run completely in parallel
- Subtask 1 (atoms) creates definitions used by 3 and 5 but can be created concurrently
- Subtask 2 (price calculator) is independent pure functions - can run anytime
- Subtask 3 (hook) depends on atoms (1) and price calculator (2) but implementations are straightforward
- Subtask 4 (exports) depends on all previous subtasks but is quick integration
- Subtask 5 (tests) depends on hook (3) but can be written in parallel
- No cross-subtask file conflicts or shared ownership
- Each subtask owns exclusive files except indexes (which aggregate)
