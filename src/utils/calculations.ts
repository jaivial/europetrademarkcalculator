// src/utils/calculations.ts

export interface TaxCalculation {
  subtotal: number;
  taxAmount: number;
  total: number;
  taxRate: number;
}

export interface DiscountCalculation {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  discountPercentage: number;
}

/**
 * Calculate tax amount from subtotal
 * @param subtotal - Amount before tax
 * @param taxRate - Tax rate as decimal (0.19 for 19%)
 * @returns Tax amount (rounded to 2 decimals)
 */
export function calculateTax(
  subtotal: number,
  taxRate: number
): number {
  const taxAmount = subtotal * taxRate;
  return Math.round(taxAmount * 100) / 100;
}

/**
 * Calculate total with tax included
 * @param subtotal - Amount before tax
 * @param taxRate - Tax rate as decimal
 * @returns Tax calculation result
 */
export function calculateWithTax(
  subtotal: number,
  taxRate: number
): TaxCalculation {
  const taxAmount = calculateTax(subtotal, taxRate);
  const total = subtotal + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount,
    total: Math.round(total * 100) / 100,
    taxRate,
  };
}

/**
 * Calculate subtotal from total with tax included
 * @param total - Total amount including tax
 * @param taxRate - Tax rate as decimal
 * @returns Subtotal before tax
 */
export function calculateSubtotal(
  total: number,
  taxRate: number
): number {
  const subtotal = total / (1 + taxRate);
  return Math.round(subtotal * 100) / 100;
}

/**
 * Apply percentage discount to amount
 * @param amount - Original amount
 * @param discountPercentage - Discount as percentage (0-100)
 * @returns Discount calculation result
 */
export function applyDiscount(
  amount: number,
  discountPercentage: number
): DiscountCalculation {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  const discountAmount = (amount * discountPercentage) / 100;
  const finalAmount = amount - discountAmount;

  return {
    originalAmount: Math.round(amount * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100,
    discountPercentage,
  };
}

/**
 * Calculate total from array of items with quantities
 * @param items - Array of items with price and quantity
 * @returns Total sum of all items
 */
export function calculateTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return Math.round(total * 100) / 100;
}

/**
 * Calculate average price per item
 * @param items - Array of items with price
 * @returns Average price
 */
export function calculateAverage(items: Array<{ price: number }>): number {
  if (items.length === 0) return 0;

  const sum = items.reduce((total, item) => total + item.price, 0);
  const average = sum / items.length;

  return Math.round(average * 100) / 100;
}

/**
 * Calculate price with markup
 * @param basePrice - Original price
 * @param markupPercentage - Markup as percentage
 * @returns Price with markup applied
 */
export function applyMarkup(
  basePrice: number,
  markupPercentage: number
): number {
  const markupAmount = (basePrice * markupPercentage) / 100;
  const finalPrice = basePrice + markupAmount;

  return Math.round(finalPrice * 100) / 100;
}

/**
 * Calculate multiple tax rates (for different countries)
 * @param amount - Base amount
 * @param taxRates - Map of country code to tax rate
 * @returns Total tax across all rates
 */
export function calculateMultiCountryTax(
  amount: number,
  taxRates: Record<string, number>
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const [country, rate] of Object.entries(taxRates)) {
    result[country] = calculateTax(amount, rate);
  }

  return result;
}

/**
 * Calculate cumulative cost with progressive rates
 * @param baseAmount - Starting amount
 * @param rates - Array of progressive rate amounts
 * @returns Final amount after applying all progressive rates
 */
export function calculateProgressiveRate(
  baseAmount: number,
  rates: number[]
): number {
  let total = baseAmount;

  for (const rate of rates) {
    total = applyMarkup(total, rate);
  }

  return total;
}

/**
 * Round amount to nearest cent
 * @param amount - Amount to round
 * @returns Rounded amount
 */
export function roundToCent(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * Check if price calculation is valid (no negative amounts)
 * @param calculation - Tax calculation result
 * @returns True if all amounts are non-negative
 */
export function isValidCalculation(calculation: TaxCalculation): boolean {
  return (
    calculation.subtotal >= 0 &&
    calculation.taxAmount >= 0 &&
    calculation.total >= 0 &&
    calculation.taxRate >= 0
  );
}
