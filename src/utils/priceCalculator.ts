import type {
  PriceBreakdown,
  PriceItem,
  CalculatorConfig
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
