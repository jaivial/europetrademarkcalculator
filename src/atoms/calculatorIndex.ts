/**
 * Central export for all calculator-related Jotai atoms
 * Import from '@/atoms/calculator' instead of individual files
 */

export {
  type NiceClass,
  NICE_CLASSES,
  selectedTrademarkClassesAtom,
  totalSelectedClassesAtom,
  selectedClassesDataAtom,
  toggleClassAtom,
  selectClassesAtom,
  clearAllClassesAtom,
  selectAllClassesAtom,
} from './trademarkClassesAtom';

export {
  type FilingType,
  type FilingTypeConfig,
  FILING_TYPES,
  selectedFilingTypeAtom,
  currentFilingTypeConfigAtom,
  estimatedProcessingDaysAtom,
  filingCostMultiplierAtom,
  processingTimeRangeAtom,
  setFilingTypeAtom,
  resetFilingTypeAtom,
} from './filingTypeAtom';

export {
  type ServiceType,
  type ServiceConfig,
  type OptionalServicesState,
  SERVICES,
  optionalServicesAtom,
  selectedServicesCountAtom,
  selectedServiceIdsAtom,
  selectedServicesDataAtom,
  servicesBasePriceAtom,
  toggleServiceAtom,
  setServicesAtom,
  clearAllServicesAtom,
  selectAllServicesAtom,
} from './optionalServicesAtom';

export {
  type PriceBreakdownItem,
  type PriceBreakdown,
  baseRegistrationPriceAtom,
  subtotalPriceAtom,
  taxAmountAtom,
  totalPriceAtom,
  priceBreakdownAtom,
  formattedTotalPriceAtom,
  priceSummaryAtom,
} from './priceCalculationAtom';

export {
  type CalculatorSummary,
  calculatorSummaryAtom,
  isCalculatorReadyAtom,
  calculatorValidationAtom,
} from './calculatorSummaryAtom';
