import { atom } from 'jotai';
import { selectedCountryAtom } from './countryAtom';
import { selectedTrademarkClassesAtom } from './trademarkClassesAtom';
import { selectedFilingTypeAtom } from './filingTypeAtom';
import { optionalServicesAtom, servicesBasePriceAtom } from './optionalServicesAtom';

/**
 * Base price per class (default before country adjustment)
 */
const BASE_PRICE_PER_CLASS = 100;

/**
 * Base registration fee (fixed cost per country registration)
 */
const BASE_REGISTRATION_FEE = 50;

/**
 * Tax rate (20% by default, can vary by country)
 */
const DEFAULT_TAX_RATE = 0.2;

/**
 * Price breakdown item
 */
export interface PriceBreakdownItem {
  label: string;
  description?: string;
  quantity?: number;
  unitPrice?: number;
  total: number;
  type: 'base' | 'service' | 'tax' | 'discount';
}

/**
 * Complete price breakdown
 */
export interface PriceBreakdown {
  items: PriceBreakdownItem[];
  subtotal: number;
  taxRate: number;
  tax: number;
  discount: number;
  total: number;
}

/**
 * Derived atom: Base registration price
 * Registration fee + (price per class * number of selected classes)
 */
export const baseRegistrationPriceAtom = atom((get) => {
  const classCount = get(selectedTrademarkClassesAtom).length;

  if (classCount === 0) return 0;

  const country = get(selectedCountryAtom);
  const filingType = get(selectedFilingTypeAtom);

  let pricePerClass = BASE_PRICE_PER_CLASS;
  let registrationFee = BASE_REGISTRATION_FEE;

  if (country && country.brandRegistration) {
    pricePerClass = country.brandRegistration.pricePerClass;
    registrationFee = country.brandRegistration.basePrice;
  }

  const filingMultipliers: Record<string, number> = {
    standard: 1.0,
    express: 1.5,
    priority: 2.0,
  };

  const multiplier = filingMultipliers[filingType] || 1.0;

  return registrationFee + pricePerClass * classCount * multiplier;
});

/**
 * Derived atom: Subtotal (base + services)
 */
export const subtotalPriceAtom = atom((get) => {
  const basePrice = get(baseRegistrationPriceAtom);
  const servicesPrice = get(servicesBasePriceAtom);
  return basePrice + servicesPrice;
});

/**
 * Derived atom: Tax amount
 */
export const taxAmountAtom = atom((get) => {
  const subtotal = get(subtotalPriceAtom);
  return Math.round(subtotal * DEFAULT_TAX_RATE * 100) / 100;
});

/**
 * Derived atom: Total price (subtotal + tax)
 */
export const totalPriceAtom = atom((get) => {
  const subtotal = get(subtotalPriceAtom);
  const tax = get(taxAmountAtom);
  return subtotal + tax;
});

/**
 * Derived atom: Price breakdown for display
 */
export const priceBreakdownAtom = atom((get) => {
  const classCount = get(selectedTrademarkClassesAtom).length;
  const country = get(selectedCountryAtom);
  const filingType = get(selectedFilingTypeAtom);
  const services = get(optionalServicesAtom);

  const basePrice = get(baseRegistrationPriceAtom);
  const subtotal = get(subtotalPriceAtom);
  const tax = get(taxAmountAtom);
  const total = get(totalPriceAtom);

  const items: PriceBreakdownItem[] = [];

  if (classCount > 0) {
    let pricePerClass = BASE_PRICE_PER_CLASS;
    let registrationFee = BASE_REGISTRATION_FEE;

    if (country && country.brandRegistration) {
      pricePerClass = country.brandRegistration.pricePerClass;
      registrationFee = country.brandRegistration.basePrice;
    }

    items.push({
      label: 'Registration Fee',
      description: 'Base fee for brand registration',
      total: registrationFee,
      type: 'base',
    });

    items.push({
      label: 'Classes',
      description: `${classCount} Nice Classification class(es)`,
      quantity: classCount,
      unitPrice: pricePerClass,
      total: pricePerClass * classCount,
      type: 'base',
    });

    if (filingType !== 'standard') {
      const multipliers: Record<string, string> = {
        express: 'Express filing (1.5x multiplier)',
        priority: 'Priority filing (2.0x multiplier)',
      };
      items.push({
        label: `${filingType.charAt(0).toUpperCase() + filingType.slice(1)} Filing`,
        description: multipliers[filingType],
        total: basePrice - registrationFee - pricePerClass * classCount,
        type: 'base',
      });
    }
  }

  if (services.monitoring) {
    items.push({
      label: 'Trademark Monitoring',
      description: 'Monitor for infringements (12 months)',
      total: 50,
      type: 'service',
    });
  }

  if (services.legalSupport) {
    items.push({
      label: 'Legal Support',
      description: 'Legal consultation and support',
      total: 200,
      type: 'service',
    });
  }

  if (services.fastTrack) {
    items.push({
      label: 'Fast Track',
      description: 'Expedited examination',
      total: 150,
      type: 'service',
    });
  }

  if (tax > 0) {
    items.push({
      label: 'Tax',
      description: 'Value Added Tax / Sales Tax (20%)',
      total: tax,
      type: 'tax',
    });
  }

  return {
    items,
    subtotal,
    taxRate: DEFAULT_TAX_RATE,
    tax,
    discount: 0,
    total,
  } as PriceBreakdown;
});

/**
 * Derived atom: Formatted total price
 */
export const formattedTotalPriceAtom = atom((get) => {
  const total = get(totalPriceAtom);
  return total.toFixed(2);
});

/**
 * Derived atom: Price summary string
 */
export const priceSummaryAtom = atom((get) => {
  const total = get(totalPriceAtom);
  const classCount = get(selectedTrademarkClassesAtom).length;
  const servicesCount = Object.values(get(optionalServicesAtom)).filter(
    Boolean
  ).length;

  if (classCount === 0) return 'Select classes to calculate price';

  return `${classCount} class(es) + ${servicesCount} service(s) = €${total.toFixed(2)}`;
});
