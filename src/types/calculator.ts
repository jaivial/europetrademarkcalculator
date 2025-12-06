/**
 * Calculator Domain Types
 * Used for: trademark calculations, pricing, filing options
 */

import type { CountryCode } from "./country";

/**
 * Trademark class according to Nice Classification
 * Classes 1-34 are goods, 35-45 are services
 * @see https://www.wipo.int/nice/en/
 */
export type TrademarkClass = number & { readonly __brand: "TrademarkClass" };

/**
 * Filing type for trademark applications
 */
export enum FilingType {
  Individual = "individual",
  Collective = "collective",
  Certification = "certification"
}

/**
 * Trademark class detail with pricing
 */
export interface TrademarkClassInfo {
  classNumber: TrademarkClass;
  category: "goods" | "services";
  description: string;
  examples: string[];
  basePrice: number;
}

/**
 * Filing option with associated costs
 */
export interface FilingOption {
  id: string;
  type: FilingType;
  description: string;
  baseCost: number;
  additionalPerClass: number;
  validityYears: number;
  renewalCost: number;
  features: string[];
}

/**
 * Calculator option that can be selected/deselected
 */
export interface CalculatorOption {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "additional" | "service" | "premium";
  isSelected: boolean;
  dependencies?: string[];
  conflictsWith?: string[];
}

/**
 * Price breakdown for a trademark calculation
 */
export interface PriceBreakdown {
  filingBaseCost: number;
  classesCount: number;
  perClassCost: number;
  classesTotalCost: number;
  selectedOptions: PriceItem[];
  optionsTotal: number;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  estimatedProcessingDays: number;
}

/**
 * Individual price item in breakdown
 */
export interface PriceItem {
  label: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: "base" | "class" | "option" | "tax";
}

/**
 * Calculator configuration and state
 */
export interface CalculatorConfig {
  selectedCountries: CountryCode[];
  selectedClasses: TrademarkClass[];
  filingType: FilingType;
  selectedOptions: string[];
  includeInternational: boolean;
  priority: "standard" | "expedited" | "premium";
}

/**
 * Calculator calculation result
 */
export interface CalculationResult {
  id: string;
  config: CalculatorConfig;
  breakdown: PriceBreakdown;
  timestamp: string;
  expiresAt: string;
}

/**
 * Calculation error response
 */
export interface CalculationError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * API request for calculation
 */
export interface CalculationRequest {
  countries: CountryCode[];
  trademarkClasses: TrademarkClass[];
  filingType: FilingType;
  options?: string[];
  priority?: "standard" | "expedited" | "premium";
}

/**
 * API response for calculation
 */
export interface CalculationResponse {
  success: boolean;
  data?: CalculationResult;
  error?: CalculationError;
}

/**
 * Create branded TrademarkClass
 */
export function createTrademarkClass(classNumber: number): TrademarkClass | null {
  if (classNumber < 1 || classNumber > 45) {
    return null;
  }
  return classNumber as TrademarkClass;
}

/**
 * Validate trademark classes
 */
export function validateTrademarkClasses(classes: TrademarkClass[]): boolean {
  return classes.length > 0 && classes.every(c => c >= 1 && c <= 45);
}

/**
 * Get category for trademark class
 */
export function getClassCategory(classNumber: TrademarkClass): "goods" | "services" {
  return classNumber <= 34 ? "goods" : "services";
}

/**
 * Priority fee multiplier
 */
export const PRIORITY_MULTIPLIERS: Record<string, number> = {
  standard: 1.0,
  expedited: 1.5,
  premium: 2.0
};
