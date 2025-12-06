// src/components/Calculator/index.ts
/**
 * Calculator Components Module
 *
 * This module exports all calculator-related components for brand registration pricing.
 * Components use Jotai atoms (NO useState) for state management via useCalculator hook.
 *
 * All components are responsive from 200px to 3000px viewport width.
 */

export { OptionSelector, type OptionSelectorProps } from './OptionSelector';
export { OptionGroup, type OptionGroupProps } from './OptionGroup';
export { OptionItem, type OptionItemProps } from './OptionItem';

// Legacy calculator exports
export { Calculator, type CalculatorProps, type CalculationResult } from './Calculator';
export { Calculator as default } from './Calculator';

export { Summary } from './Summary';
export type { SummaryProps } from './Summary';

export { SummaryCard } from './SummaryCard';
export type { SummaryCardProps } from './SummaryCard';

// Price Breakdown Components
export { PriceItem } from './PriceItem';
export type { PriceItemProps } from './PriceItem';

export { PriceTotal } from './PriceTotal';
export type { PriceTotalProps } from './PriceTotal';

export { PriceBreakdown } from './PriceBreakdown';
export type { PriceBreakdownProps } from './PriceBreakdown';

/**
 * Component hierarchy:
 *
 * OptionSelector (main container)
 *   ├── OptionGroup (classes section)
 *   │   └── OptionItem[] (individual class checkboxes)
 *   ├── OptionGroup (filing types section)
 *   │   └── OptionItem[] (radio buttons)
 *   └── OptionGroup (services section)
 *       └── OptionItem[] (individual service checkboxes)
 *
 * State management:
 * - All components use Jotai atoms via useCalculator hook
 * - No local React state (useState forbidden)
 * - Atomic updates for selections
 *
 * Styling:
 * - CSS modules for component-scoped styles
 * - Responsive grid layouts
 * - Dark/light theme support via CSS variables
 * - Mobile-first design approach
 */

/**
 * Data and configuration:
 * - NICE_CLASSES (1-45 trademark classes)
 * - FILING_TYPES (standard, expedited, priority)
 * - OPTIONAL_SERVICES (monitoring, legal support, fast-track)
 *
 * Import from '@/data/calculatorOptions'
 */

/**
 * Usage example:
 *
 * import { OptionSelector } from '@/components/Calculator';
 * import { useCalculator } from '@/hooks/useCalculator';
 *
 * function MyComponent() {
 *   const { selectedClasses, filingType, selectedServices } = useCalculator();
 *
 *   return (
 *     <OptionSelector
 *       onSelectionChange={(state) => {
 *         console.log('Selections changed:', state);
 *       }}
 *     />
 *   );
 * }
 */
