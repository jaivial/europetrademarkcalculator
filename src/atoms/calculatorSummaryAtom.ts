import { atom } from 'jotai';
import { selectedTrademarkClassesAtom, totalSelectedClassesAtom } from './trademarkClassesAtom';
import { selectedFilingTypeAtom, currentFilingTypeConfigAtom } from './filingTypeAtom';
import { selectedServicesDataAtom } from './optionalServicesAtom';
import {
  baseRegistrationPriceAtom,
  totalPriceAtom,
  subtotalPriceAtom,
  taxAmountAtom,
  priceBreakdownAtom,
} from './priceCalculationAtom';
import { selectedCountryAtom } from './countryAtom';

/**
 * Complete calculator summary
 */
export interface CalculatorSummary {
  country: { code: string | null; name: string | null; isSelected: boolean };
  classesCount: number;
  selectedClasses: number[];
  filingType: string;
  processingDays: number;
  servicesCount: number;
  servicesSelected: string[];
  basePrice: number;
  servicesPrice: number;
  subtotal: number;
  tax: number;
  total: number;
  breakdown: any;
}

/**
 * Derived atom: Complete calculator summary
 */
export const calculatorSummaryAtom = atom((get) => {
  const country = get(selectedCountryAtom);
  const selectedClasses = get(selectedTrademarkClassesAtom);
  const classCount = get(totalSelectedClassesAtom);
  const filingType = get(selectedFilingTypeAtom);
  const filingConfig = get(currentFilingTypeConfigAtom);
  const servicesData = get(selectedServicesDataAtom);
  const basePrice = get(baseRegistrationPriceAtom);
  const subtotal = get(subtotalPriceAtom);
  const tax = get(taxAmountAtom);
  const total = get(totalPriceAtom);
  const breakdown = get(priceBreakdownAtom);

  return {
    country: {
      code: country?.code ?? null,
      name: country?.name ?? null,
      isSelected: country !== null,
    },
    classesCount: classCount,
    selectedClasses: selectedClasses,
    filingType: filingType,
    processingDays: filingConfig.processingDays,
    servicesCount: servicesData.length,
    servicesSelected: servicesData.map((s) => s.label),
    basePrice: basePrice,
    servicesPrice: subtotal - basePrice,
    subtotal: subtotal,
    tax: tax,
    total: total,
    breakdown: breakdown,
  } as CalculatorSummary;
});

/**
 * Derived atom: Is calculator ready to submit?
 */
export const isCalculatorReadyAtom = atom((get) => {
  const summary = get(calculatorSummaryAtom);
  return summary.country.isSelected && summary.classesCount > 0;
});

/**
 * Derived atom: Calculator validation status
 */
export const calculatorValidationAtom = atom((get) => {
  const summary = get(calculatorSummaryAtom);
  const errors: string[] = [];

  if (!summary.country.isSelected) {
    errors.push('Country not selected');
  }

  if (summary.classesCount === 0) {
    errors.push('At least one class must be selected');
  }

  if (summary.classesCount > 45) {
    errors.push('Maximum 45 classes allowed');
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
});
