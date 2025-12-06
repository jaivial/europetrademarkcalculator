# Frontend Task 005: Core Jotai Atoms - Calculator State

## Metadata
- **Task**: 5 of 15
- **Area**: Frontend
- **Feature**: Calculator State Management with Jotai
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create comprehensive Jotai atoms for the brand registration calculator state management. This task builds upon the global theme, language, and country atoms from Task 2 to provide calculator-specific state including trademark class selections, registration filing types, optional services, derived price calculations, and summary data. All state is managed through atoms - NO useState allowed.

---

## Subtasks

### Subtask 005.1: Nice Classification Classes Atom

#### Status
status: pending

#### Objective
Create Jotai atoms for managing Nice Classification trademark classes (1-45) with multi-select capability.

#### Context
Users select 1-45 Nice Classification classes for their brand registration. Each class has a number, name, and description. The atom tracks which classes are selected and provides derived data for pricing calculations. NO useState allowed.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/trademarkClassesAtom.ts` - Trademark class selection state

#### Implementation

```typescript
import { atom } from 'jotai';

/**
 * Nice Classification class definition
 */
export interface NiceClass {
  number: number;
  name: string;
  description: string;
}

/**
 * NICE Classification classes (1-45)
 * Complete database of trademark classes
 */
export const NICE_CLASSES: Record<number, NiceClass> = {
  1: {
    number: 1,
    name: 'Chemical substances',
    description: 'Chemicals for use in industry, science and photography; adhesives for use in industry; putties and other paste fillers',
  },
  2: {
    number: 2,
    name: 'Paints and coatings',
    description: 'Paints, varnishes, lacquers; preservatives against rust and deterioration of wood; colorants, dyes',
  },
  3: {
    number: 3,
    name: 'Cosmetics and cleaning',
    description: 'Non-medicated cosmetics and toiletries; abrasive products; cleaning preparations',
  },
  4: {
    number: 4,
    name: 'Industrial oils and fats',
    description: 'Industrial oils and fats; lubricants; fuels and illuminants',
  },
  5: {
    number: 5,
    name: 'Pharmaceuticals',
    description: 'Pharmaceuticals, medical and veterinary preparations; sanitary preparations',
  },
  6: {
    number: 6,
    name: 'Metals',
    description: 'Unwrought and semi-wrought common metals and their alloys',
  },
  7: {
    number: 7,
    name: 'Machinery',
    description: 'Machines, machine tools, motors and engines',
  },
  8: {
    number: 8,
    name: 'Hand tools',
    description: 'Hand tools and instruments; cutlery; side arms; razors',
  },
  9: {
    number: 9,
    name: 'Electrical and scientific',
    description: 'Electrical, electronic and optical apparatus and instruments',
  },
  10: {
    number: 10,
    name: 'Medical instruments',
    description: 'Surgical, medical, dental and veterinary apparatus and instruments',
  },
  11: {
    number: 11,
    name: 'Lighting and heating',
    description: 'Apparatus for lighting, heating, steam generating, cooking, refrigerating, drying',
  },
  12: {
    number: 12,
    name: 'Vehicles',
    description: 'Vehicles; apparatus for locomotion by land, air or water',
  },
  13: {
    number: 13,
    name: 'Firearms',
    description: 'Firearms; ammunition and projectiles; explosives; pyrotechnic articles',
  },
  14: {
    number: 14,
    name: 'Jewelry',
    description: 'Precious metals and their alloys; jewelry; precious stones; horological instruments',
  },
  15: {
    number: 15,
    name: 'Musical instruments',
    description: 'Musical instruments; parts and accessories for musical instruments',
  },
  16: {
    number: 16,
    name: 'Paper and printing',
    description: 'Paper and cardboard; printed matter; bookbinding material; photographs',
  },
  17: {
    number: 17,
    name: 'Plastics and rubber',
    description: 'Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica',
  },
  18: {
    number: 18,
    name: 'Leather goods',
    description: 'Leather and imitations of leather; animal skins; trunks and cases',
  },
  19: {
    number: 19,
    name: 'Construction materials',
    description: 'Building materials (non-metallic); nonmetallic rigid pipes; asphalt, pitch',
  },
  20: {
    number: 20,
    name: 'Furniture',
    description: 'Furniture, mirrors, picture frames; goods of wood, cork, reed',
  },
  21: {
    number: 21,
    name: 'Housewares',
    description: 'Household or kitchen utensils and containers; glassware; porcelain; earthenware',
  },
  22: {
    number: 22,
    name: 'Textiles and cordage',
    description: 'Ropes and string; nets; tents and tarpaulins; awnings; sacks',
  },
  23: {
    number: 23,
    name: 'Yarns and threads',
    description: 'Yarns and threads for textile use',
  },
  24: {
    number: 24,
    name: 'Textiles',
    description: 'Textiles and substitutes for textiles; bed and table covers',
  },
  25: {
    number: 25,
    name: 'Clothing and footwear',
    description: 'Clothing, footwear, headwear',
  },
  26: {
    number: 26,
    name: 'Lace and embroidery',
    description: 'Lace, braid and embroidery, and tape; buttons, hooks and eyes',
  },
  27: {
    number: 27,
    name: 'Carpets and rugs',
    description: 'Carpets, rugs, mats and matting; linoleum and other materials',
  },
  28: {
    number: 28,
    name: 'Toys and games',
    description: 'Games, toys and playthings; video game apparatus',
  },
  29: {
    number: 29,
    name: 'Meat and produce',
    description: 'Meat, fish, poultry and game; meat extracts; preserved foods',
  },
  30: {
    number: 30,
    name: 'Staple foods',
    description: 'Coffee, tea, cocoa, sugar, rice, tapioca, sago; flour and preparations',
  },
  31: {
    number: 31,
    name: 'Farming produce',
    description: 'Grains and agricultural, horticultural and forestry products',
  },
  32: {
    number: 32,
    name: 'Beverages',
    description: 'Beers; non-alcoholic beverages; mineral and aerated waters',
  },
  33: {
    number: 33,
    name: 'Alcoholic beverages',
    description: 'Alcoholic beverages (except beers)',
  },
  34: {
    number: 34,
    name: 'Tobacco and smoking',
    description: 'Tobacco and tobacco substitutes; cigarettes; smokers\' articles',
  },
  35: {
    number: 35,
    name: 'Advertising and business',
    description: 'Advertising; business management; business administration; office functions',
  },
  36: {
    number: 36,
    name: 'Insurance and finance',
    description: 'Insurance; financial affairs; monetary affairs; real estate affairs',
  },
  37: {
    number: 37,
    name: 'Construction services',
    description: 'Building construction; repair; installation services',
  },
  38: {
    number: 38,
    name: 'Telecommunications',
    description: 'Telecommunications',
  },
  39: {
    number: 39,
    name: 'Transportation services',
    description: 'Transport; packaging and storage of goods; travel arrangement',
  },
  40: {
    number: 40,
    name: 'Material treatment',
    description: 'Treatment of materials; recycling of waste and rubbish; purification',
  },
  41: {
    number: 41,
    name: 'Education and entertainment',
    description: 'Education; providing of training; entertainment; sporting and cultural activities',
  },
  42: {
    number: 42,
    name: 'Scientific and technical',
    description: 'Scientific and technological services; research and design; analysis and evaluation',
  },
  43: {
    number: 43,
    name: 'Food and drink services',
    description: 'Services for providing food and drink; temporary accommodation',
  },
  44: {
    number: 44,
    name: 'Medical and beauty',
    description: 'Medical services; veterinary services; beauty, health and personal care',
  },
  45: {
    number: 45,
    name: 'Legal and security',
    description: 'Legal services; security services; personal and social services',
  },
};

/**
 * Selected trademark classes atom
 * Array of class numbers 1-45
 */
export const selectedTrademarkClassesAtom = atom<number[]>([]);

/**
 * Derived atom: Total number of selected classes
 */
export const totalSelectedClassesAtom = atom(
  (get) => get(selectedTrademarkClassesAtom).length
);

/**
 * Derived atom: Selected classes data (full objects)
 */
export const selectedClassesDataAtom = atom((get) => {
  const selectedNumbers = get(selectedTrademarkClassesAtom);
  return selectedNumbers
    .sort((a, b) => a - b)
    .map((num) => NICE_CLASSES[num])
    .filter((cls) => cls !== undefined);
});

/**
 * Write-only atom: Toggle class selection
 */
export const toggleClassAtom = atom(
  null,
  (get, set, classNumber: number) => {
    const selected = get(selectedTrademarkClassesAtom);
    const isSelected = selected.includes(classNumber);

    if (isSelected) {
      set(
        selectedTrademarkClassesAtom,
        selected.filter((c) => c !== classNumber)
      );
    } else {
      set(selectedTrademarkClassesAtom, [...selected, classNumber]);
    }
  }
);

/**
 * Write-only atom: Select multiple classes
 */
export const selectClassesAtom = atom(
  null,
  (get, set, classNumbers: number[]) => {
    const validated = classNumbers.filter((n) => n >= 1 && n <= 45);
    set(selectedTrademarkClassesAtom, validated);
  }
);

/**
 * Write-only atom: Clear all selected classes
 */
export const clearAllClassesAtom = atom(
  null,
  (get, set) => {
    set(selectedTrademarkClassesAtom, []);
  }
);

/**
 * Write-only atom: Select all classes (1-45)
 */
export const selectAllClassesAtom = atom(
  null,
  (get, set) => {
    set(selectedTrademarkClassesAtom, Array.from({ length: 45 }, (_, i) => i + 1));
  }
);
```

#### Acceptance Criteria
- [ ] All 45 Nice classes defined with names and descriptions
- [ ] Selected classes stored as array of numbers
- [ ] Toggle class selection working
- [ ] Derived atoms for class data and count
- [ ] Clear and select all functionality
- [ ] Type-safe with TypeScript
- [ ] NO useState used

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

### Subtask 005.2: Registration Filing Type Atom

#### Status
status: pending

#### Objective
Create Jotai atoms for managing brand registration filing types (standard, express, priority).

#### Context
Users select a filing type that affects processing time and cost. Three options available: standard (normal cost and time), express (higher cost, faster processing), and priority (highest cost, fastest processing). All state through atoms only.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/filingTypeAtom.ts` - Filing type selection state

#### Implementation

```typescript
import { atom } from 'jotai';

/**
 * Filing type options
 */
export type FilingType = 'standard' | 'express' | 'priority';

/**
 * Filing type configuration
 */
export interface FilingTypeConfig {
  id: FilingType;
  label: string;
  description: string;
  processingDays: number;
  costMultiplier: number;
  icon: string;
}

/**
 * Filing type configurations
 */
export const FILING_TYPES: Record<FilingType, FilingTypeConfig> = {
  standard: {
    id: 'standard',
    label: 'Standard',
    description: 'Normal processing time (60-90 days)',
    processingDays: 75,
    costMultiplier: 1.0,
    icon: '📋',
  },
  express: {
    id: 'express',
    label: 'Express',
    description: 'Faster processing (30-45 days)',
    processingDays: 37,
    costMultiplier: 1.5,
    icon: '⚡',
  },
  priority: {
    id: 'priority',
    label: 'Priority',
    description: 'Fastest processing (15-20 days)',
    processingDays: 17,
    costMultiplier: 2.0,
    icon: '🚀',
  },
};

/**
 * Selected filing type atom
 * Default: standard
 */
export const selectedFilingTypeAtom = atom<FilingType>('standard');

/**
 * Derived atom: Current filing type configuration
 */
export const currentFilingTypeConfigAtom = atom((get) => {
  const fileType = get(selectedFilingTypeAtom);
  return FILING_TYPES[fileType];
});

/**
 * Derived atom: Estimated processing days
 */
export const estimatedProcessingDaysAtom = atom((get) => {
  const config = get(currentFilingTypeConfigAtom);
  return config.processingDays;
});

/**
 * Derived atom: Cost multiplier for current type
 */
export const filingCostMultiplierAtom = atom((get) => {
  const config = get(currentFilingTypeConfigAtom);
  return config.costMultiplier;
});

/**
 * Derived atom: Processing time range as string
 */
export const processingTimeRangeAtom = atom((get) => {
  const fileType = get(selectedFilingTypeAtom);
  const ranges: Record<FilingType, string> = {
    standard: '60-90 days',
    express: '30-45 days',
    priority: '15-20 days',
  };
  return ranges[fileType];
});

/**
 * Write-only atom: Change filing type
 */
export const setFilingTypeAtom = atom(
  null,
  (get, set, filingType: FilingType) => {
    if (!Object.keys(FILING_TYPES).includes(filingType)) {
      console.warn(`Invalid filing type: ${filingType}. Defaulting to 'standard'.`);
      set(selectedFilingTypeAtom, 'standard');
      return;
    }
    set(selectedFilingTypeAtom, filingType);
  }
);

/**
 * Write-only atom: Reset to standard filing type
 */
export const resetFilingTypeAtom = atom(
  null,
  (get, set) => {
    set(selectedFilingTypeAtom, 'standard');
  }
);
```

#### Acceptance Criteria
- [ ] Three filing types defined (standard, express, priority)
- [ ] Each type has label, description, processing time, cost multiplier
- [ ] Selected filing type stored in atom
- [ ] Derived atoms for config, multiplier, processing time
- [ ] Type validation when setting
- [ ] Default to standard filing type
- [ ] NO useState used

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

### Subtask 005.3: Optional Services Atom

#### Status
status: pending

#### Objective
Create Jotai atoms for managing optional services (monitoring, legal support, fast track).

#### Context
Users can add optional services to their registration for additional protection and support. Each service can be toggled independently and has its own pricing. All state managed through atoms.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/optionalServicesAtom.ts` - Optional services selection state

#### Implementation

```typescript
import { atom } from 'jotai';

/**
 * Optional service type
 */
export type ServiceType = 'monitoring' | 'legalSupport' | 'fastTrack';

/**
 * Service configuration
 */
export interface ServiceConfig {
  id: ServiceType;
  label: string;
  description: string;
  basePrice: number;
  isPerClass: boolean;
  icon: string;
}

/**
 * Service configurations
 */
export const SERVICES: Record<ServiceType, ServiceConfig> = {
  monitoring: {
    id: 'monitoring',
    label: 'Trademark Monitoring',
    description: 'Monitor for potential trademark infringements (12 months)',
    basePrice: 50,
    isPerClass: false,
    icon: '👁️',
  },
  legalSupport: {
    id: 'legalSupport',
    label: 'Legal Support',
    description: 'Legal consultation and support during registration process',
    basePrice: 200,
    isPerClass: false,
    icon: '⚖️',
  },
  fastTrack: {
    id: 'fastTrack',
    label: 'Fast Track',
    description: 'Expedited examination and priority handling',
    basePrice: 150,
    isPerClass: false,
    icon: '⚡',
  },
};

/**
 * Optional services state
 */
export interface OptionalServicesState {
  monitoring: boolean;
  legalSupport: boolean;
  fastTrack: boolean;
}

/**
 * Default services state
 */
const DEFAULT_SERVICES_STATE: OptionalServicesState = {
  monitoring: false,
  legalSupport: false,
  fastTrack: false,
};

/**
 * Optional services state atom
 */
export const optionalServicesAtom = atom<OptionalServicesState>(
  DEFAULT_SERVICES_STATE
);

/**
 * Derived atom: Count of selected services
 */
export const selectedServicesCountAtom = atom((get) => {
  const services = get(optionalServicesAtom);
  return Object.values(services).filter(Boolean).length;
});

/**
 * Derived atom: List of selected service IDs
 */
export const selectedServiceIdsAtom = atom((get) => {
  const services = get(optionalServicesAtom);
  return (Object.entries(services) as Array<[ServiceType, boolean]>)
    .filter(([, selected]) => selected)
    .map(([id]) => id);
});

/**
 * Derived atom: Get selected services data
 */
export const selectedServicesDataAtom = atom((get) => {
  const serviceIds = get(selectedServiceIdsAtom);
  return serviceIds.map((id) => SERVICES[id]);
});

/**
 * Derived atom: Total price of selected services
 */
export const servicesBasePriceAtom = atom((get) => {
  const services = get(optionalServicesAtom);
  let total = 0;

  if (services.monitoring) total += SERVICES.monitoring.basePrice;
  if (services.legalSupport) total += SERVICES.legalSupport.basePrice;
  if (services.fastTrack) total += SERVICES.fastTrack.basePrice;

  return total;
});

/**
 * Write-only atom: Toggle service
 */
export const toggleServiceAtom = atom(
  null,
  (get, set, serviceType: ServiceType) => {
    const services = get(optionalServicesAtom);

    if (!Object.keys(SERVICES).includes(serviceType)) {
      console.warn(`Invalid service type: ${serviceType}`);
      return;
    }

    set(optionalServicesAtom, {
      ...services,
      [serviceType]: !services[serviceType],
    });
  }
);

/**
 * Write-only atom: Set multiple services
 */
export const setServicesAtom = atom(
  null,
  (get, set, updates: Partial<OptionalServicesState>) => {
    const services = get(optionalServicesAtom);
    set(optionalServicesAtom, {
      ...services,
      ...updates,
    });
  }
);

/**
 * Write-only atom: Clear all services
 */
export const clearAllServicesAtom = atom(
  null,
  (get, set) => {
    set(optionalServicesAtom, DEFAULT_SERVICES_STATE);
  }
);

/**
 * Write-only atom: Select all services
 */
export const selectAllServicesAtom = atom(
  null,
  (get, set) => {
    set(optionalServicesAtom, {
      monitoring: true,
      legalSupport: true,
      fastTrack: true,
    });
  }
);
```

#### Acceptance Criteria
- [ ] Three services defined with pricing and descriptions
- [ ] Services state tracked independently
- [ ] Toggle individual services
- [ ] Count and list selected services
- [ ] Calculate total service price
- [ ] Type validation for service types
- [ ] Clear and select all functionality
- [ ] NO useState used

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

### Subtask 005.4: Price Calculation Atoms (Derived)

#### Status
status: pending

#### Objective
Create derived Jotai atoms for calculating base price, service prices, tax, and total price based on all calculator inputs.

#### Context
Price calculations depend on selected country (from countryAtom), number of classes, filing type, and optional services. These derived atoms compute all price-related values from base state atoms. All calculations happen in atoms, not components.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/priceCalculationAtom.ts` - Price calculation derived atoms

#### Implementation

```typescript
import { atom } from 'jotai';
import { selectedCountryCodeAtom, selectedCountryAtom } from './countryAtom';
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
```

#### Acceptance Criteria
- [ ] Base registration price calculated correctly
- [ ] Filing type multipliers applied (1.0x, 1.5x, 2.0x)
- [ ] Service prices included in total
- [ ] Tax calculation (20% default)
- [ ] Complete price breakdown generated
- [ ] Subtotal, tax, and total atoms separate
- [ ] Derived from all input atoms
- [ ] NO useState used

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

### Subtask 005.5: Calculator State Index & Summary Atom

#### Status
status: pending

#### Objective
Create barrel export index for calculator atoms and a summary atom combining all calculator data.

#### Context
Centralizes all calculator-related atom exports for clean imports. Also provides a comprehensive summary atom that combines all calculator state for easy access by components that need the full picture.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/calculatorIndex.ts` - Barrel export for calculator atoms
- `src/atoms/calculatorSummaryAtom.ts` - Summary atom with all calculator data

#### Implementation

**calculatorIndex.ts**:
```typescript
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
```

**calculatorSummaryAtom.ts**:
```typescript
import { atom } from 'jotai';
import { selectedTrademarkClassesAtom, totalSelectedClassesAtom } from './trademarkClassesAtom';
import { selectedFilingTypeAtom, currentFilingTypeConfigAtom } from './filingTypeAtom';
import { optionalServicesAtom, selectedServicesDataAtom } from './optionalServicesAtom';
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
  const services = get(optionalServicesAtom);
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
```

#### Acceptance Criteria
- [ ] All calculator atoms exported from index
- [ ] Types exported alongside atoms
- [ ] Summary atom combines all state
- [ ] Ready and validation atoms provided
- [ ] Clean import paths enabled
- [ ] TypeScript types preserved
- [ ] No runtime overhead
- [ ] NO useState used

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/trademarkClassesAtom.ts`
- `src/atoms/filingTypeAtom.ts`
- `src/atoms/optionalServicesAtom.ts`
- `src/atoms/priceCalculationAtom.ts`
- `src/atoms/calculatorIndex.ts`
- `src/atoms/calculatorSummaryAtom.ts`

### Imports From Existing Code
- `jotai` - from package.json (task 1)
- `countryAtom` - from task 2 (for price calculations)

### Exports For Other Code
- All calculator atoms for components
- Price calculation atoms for pricing display
- Summary atom for calculator components
- Type definitions for CalculatorSummary
- Validation atoms for form components

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
```

---

## Parallelization Notes
- All 5 subtasks can run in parallel
- Each subtask owns exclusive atom files
- No subtask depends on another subtask's output
- Subtask 5.4 imports from 5.1, 5.2, 5.3 (all can be created simultaneously)
- Subtask 5.5 imports from 5.1-5.4 (can be created after or simultaneously)
- All atoms are independent pieces that aggregate into complete state
- Price atoms update automatically when any input changes
- NO useState allowed - all state exclusively through Jotai atoms
