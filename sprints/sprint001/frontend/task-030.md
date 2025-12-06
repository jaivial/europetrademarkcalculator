# Frontend Task 030: Calculator - Price Breakdown Component

## Metadata
- **Task**: 30 of 40
- **Area**: Frontend
- **Feature**: Price Breakdown Display
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a complete Price Breakdown component system for displaying itemized costs in the calculator. Includes the main PriceBreakdown container, individual PriceItem rows, summary PriceTotal section, and responsive styling. All components use Jotai for state management, support multi-language labels via i18n, include proper currency formatting with locale awareness, and render responsively from 200px to 3000px viewport width.

---

## Subtasks

### Subtask 030.1: PriceItem Component

#### Status
status: pending

#### Objective
Create PriceItem component that displays a single line item with label, amount, and optional unit pricing information.

#### Context
PriceItem is a reusable sub-component used multiple times in the breakdown. Each item shows a label (e.g., "Per Class Fee"), an amount, and optionally a unit price calculation. This component needs proper typography, spacing, currency formatting, and responsive design.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/PriceItem.tsx` - PriceItem component
- `src/components/Calculator/PriceItem.test.tsx` - Unit tests
- `src/components/Calculator/index.ts` - Export for component (append only, create if missing)

#### Implementation

```typescript
import { useTranslation } from 'react-i18next';
import styles from './PriceBreakdown.module.css';

export interface PriceItemProps {
  label: string;
  amount: number;
  currency?: string;
  quantity?: number;
  unitPrice?: number;
  variant?: 'default' | 'highlight';
  testId?: string;
}

export function PriceItem({
  label,
  amount,
  currency = 'EUR',
  quantity,
  unitPrice,
  variant = 'default',
  testId,
}: PriceItemProps) {
  const { i18n } = useTranslation();

  // Format currency based on locale
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(i18n.language === 'de' ? 'de-DE' :
                                i18n.language === 'nl' ? 'nl-NL' :
                                i18n.language === 'pl' ? 'pl-PL' :
                                i18n.language === 'sv' ? 'sv-SE' :
                                i18n.language === 'el' ? 'el-GR' :
                                'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div
      className={`${styles.priceItem} ${styles[variant]}`}
      data-testid={testId || 'price-item'}
      role="row"
    >
      <div className={styles.priceItemLabel}>
        <span className={styles.labelText}>{label}</span>
        {quantity && unitPrice && (
          <span className={styles.unitPrice}>
            {quantity}x {formatCurrency(unitPrice)}
          </span>
        )}
      </div>

      <div className={styles.priceItemAmount}>
        <span className={styles.amountValue}>{formatCurrency(amount)}</span>
      </div>
    </div>
  );
}

export default PriceItem;
```

#### Props Interface
```typescript
interface PriceItemProps {
  // The label text displayed on the left (e.g., "Filing Fee", "Per Class")
  label: string;

  // The monetary amount to display (in base currency units)
  amount: number;

  // Currency code (default: EUR), affects Intl formatting
  currency?: string;

  // Optional: quantity for calculation display (e.g., "3x €100")
  quantity?: number;

  // Optional: unit price for calculation display (e.g., "3x €100")
  unitPrice?: number;

  // Visual variant: 'default' for normal items, 'highlight' for subtotal/total
  variant?: 'default' | 'highlight';

  // Optional: data-testid for testing
  testId?: string;
}
```

#### Acceptance Criteria
- [ ] Component accepts and correctly displays label and amount
- [ ] Currency formatting respects i18n locale setting
- [ ] Calculation display (quantity x unit price) renders when provided
- [ ] Responsive layout works from 200px to 3000px width
- [ ] Variant prop correctly applies 'default' and 'highlight' styling
- [ ] Component is fully typed with TypeScript
- [ ] No console errors or warnings
- [ ] Tests cover label, amount, currency, and variant rendering

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- PriceItem.test.tsx
npm run lint -- src/components/Calculator/PriceItem.tsx
```

---

### Subtask 030.2: PriceTotal Component

#### Status
status: pending

#### Objective
Create PriceTotal component that displays subtotal, tax, and grand total sections with clear separation and emphasis.

#### Context
PriceTotal shows the summary calculations. It displays subtotal at normal emphasis, tax information with calculated percentage, and final total with prominent styling. This component must handle multiple currencies and calculate tax based on provided rates. All labels come from i18n.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/PriceTotal.tsx` - PriceTotal component
- `src/components/Calculator/PriceTotal.test.tsx` - Unit tests

#### Implementation

```typescript
import { useTranslation } from 'react-i18next';
import styles from './PriceBreakdown.module.css';
import { PriceItem } from './PriceItem';

export interface PriceTotalProps {
  subtotal: number;
  taxRate?: number; // As decimal (e.g., 0.19 for 19%)
  currency?: string;
  includesTax?: boolean;
  testId?: string;
}

export function PriceTotal({
  subtotal,
  taxRate = 0,
  currency = 'EUR',
  includesTax = false,
  testId,
}: PriceTotalProps) {
  const { t, i18n } = useTranslation();

  // Format currency based on locale
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(i18n.language === 'de' ? 'de-DE' :
                                i18n.language === 'nl' ? 'nl-NL' :
                                i18n.language === 'pl' ? 'pl-PL' :
                                i18n.language === 'sv' ? 'sv-SE' :
                                i18n.language === 'el' ? 'el-GR' :
                                'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <div
      className={styles.priceTotal}
      data-testid={testId || 'price-total'}
      role="region"
      aria-label={t('calculator.totalPrice')}
    >
      {/* Subtotal */}
      <div className={styles.priceTotalRow}>
        <span className={styles.priceTotalLabel}>{t('pricing.basePrice')}</span>
        <span className={styles.priceTotalAmount}>{formatCurrency(subtotal)}</span>
      </div>

      {/* Tax row (only if tax rate > 0) */}
      {taxRate > 0 && (
        <>
          <div className={styles.priceTotalDivider} />
          <div className={styles.priceTotalRow}>
            <span className={styles.priceTotalLabel}>
              {t('common.tax')} ({(taxRate * 100).toFixed(0)}%)
            </span>
            <span className={styles.priceTotalAmount}>{formatCurrency(taxAmount)}</span>
          </div>
        </>
      )}

      {/* Tax notice */}
      {taxRate === 0 && !includesTax && (
        <div className={styles.priceTotalNotice}>
          <span>{t('pricing.vatNotIncluded')}</span>
        </div>
      )}

      {/* Final Total */}
      <div className={styles.priceTotalDivider} />
      <div className={styles.priceTotalFinal}>
        <span className={styles.priceTotalLabel}>{t('calculator.totalPrice')}</span>
        <span className={styles.priceTotalFinalAmount}>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

export default PriceTotal;
```

#### Props Interface
```typescript
interface PriceTotalProps {
  // Subtotal amount before tax (in base currency units)
  subtotal: number;

  // Tax rate as decimal (e.g., 0.19 for 19% VAT)
  taxRate?: number;

  // Currency code (default: EUR)
  currency?: string;

  // Whether the tax is included in subtotal (affects display text)
  includesTax?: boolean;

  // Optional: data-testid for testing
  testId?: string;
}
```

#### Acceptance Criteria
- [ ] Displays subtotal correctly
- [ ] Calculates and displays tax when taxRate > 0
- [ ] Shows "VAT not included" notice when tax rate is 0
- [ ] Final total is correctly calculated (subtotal + tax)
- [ ] Currency formatting respects locale from i18n
- [ ] Visual hierarchy clear: subtotal < total emphasis
- [ ] Responsive layout from 200px to 3000px width
- [ ] All labels use i18n translations
- [ ] Tests verify calculations and display
- [ ] Accessible with ARIA labels

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- PriceTotal.test.tsx
npm run lint -- src/components/Calculator/PriceTotal.tsx
```

---

### Subtask 030.3: PriceBreakdown Component

#### Status
status: pending

#### Objective
Create main PriceBreakdown container component that composes PriceItem and PriceTotal, reading calculator state from Jotai atom.

#### Context
PriceBreakdown is the main orchestrator that reads the calculator state from Jotai, calculates itemized costs, and arranges PriceItem and PriceTotal components. It handles the business logic for determining which line items to show (based on selected services), calculating per-class costs, filing fees, and total calculations. All state comes from Jotai atoms (NO useState).

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/PriceBreakdown.tsx` - Main component
- `src/components/Calculator/PriceBreakdown.test.tsx` - Unit tests

#### Implementation

```typescript
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import styles from './PriceBreakdown.module.css';
import { PriceItem } from './PriceItem';
import { PriceTotal } from './PriceTotal';
import {
  calculatorAtom,
  selectedCountryAtom,
  selectedServicesAtom
} from '@/atoms/calculatorAtom';
import type { PriceBreakdownData } from '@/types/calculator';

export interface PriceBreakdownProps {
  testId?: string;
}

export function PriceBreakdown({ testId }: PriceBreakdownProps) {
  const { t, i18n } = useTranslation();
  const calculator = useAtomValue(calculatorAtom);
  const selectedCountry = useAtomValue(selectedCountryAtom);
  const selectedServices = useAtomValue(selectedServicesAtom);

  // Early return if no data
  if (!calculator || !selectedCountry) {
    return (
      <div className={styles.priceBreakdownEmpty}>
        <p>{t('common.noData')}</p>
      </div>
    );
  }

  // Calculate line items based on calculator state
  const basePrice = calculator.numberOfClasses * (selectedCountry.pricePerClass || 0);

  const filingFee = selectedCountry.filingFee || 0;

  const servicesPrice = (selectedServices || []).reduce((sum, service) => {
    const serviceCost = calculator.services[service] || 0;
    return sum + (serviceCost * calculator.numberOfClasses);
  }, 0);

  const subtotal = basePrice + filingFee + servicesPrice;
  const taxRate = selectedCountry.taxRate || 0;

  return (
    <div
      className={styles.priceBreakdown}
      data-testid={testId || 'price-breakdown'}
      role="region"
      aria-label={t('pricing.priceBreakdown')}
    >
      {/* Header */}
      <h3 className={styles.priceBreakdownTitle}>
        {t('pricing.priceBreakdown')}
      </h3>

      {/* Price items container */}
      <div className={styles.priceItems} role="table">
        {/* Base price per class */}
        <PriceItem
          label={t('calculator.perClass')}
          amount={basePrice}
          quantity={calculator.numberOfClasses}
          unitPrice={selectedCountry.pricePerClass || 0}
          currency="EUR"
          testId="price-item-base"
        />

        {/* Filing fee */}
        {filingFee > 0 && (
          <PriceItem
            label={t('calculator.basePrice')}
            amount={filingFee}
            currency="EUR"
            testId="price-item-filing"
          />
        )}

        {/* Service fees - grouped or itemized */}
        {selectedServices && selectedServices.length > 0 && (
          <>
            <div className={styles.priceItemDivider} />
            {selectedServices.map((service) => {
              const serviceCost = calculator.services[service] || 0;
              const totalServiceCost = serviceCost * calculator.numberOfClasses;

              return (
                <PriceItem
                  key={service}
                  label={t(`calculator.${service}`)}
                  amount={totalServiceCost}
                  quantity={calculator.numberOfClasses}
                  unitPrice={serviceCost}
                  currency="EUR"
                  testId={`price-item-${service}`}
                />
              );
            })}
          </>
        )}

        {/* Divider before totals */}
        <div className={styles.priceItemDivider} />
      </div>

      {/* Total section */}
      <PriceTotal
        subtotal={subtotal}
        taxRate={taxRate}
        currency="EUR"
        includesTax={selectedCountry.includesTax || false}
        testId="price-total"
      />

      {/* Savings notice if applicable */}
      {calculator.registrationType === 'express' && (
        <div className={styles.priceBreakdownNote}>
          <span className={styles.noteText}>
            {t('calculator.savings')}: {t('calculator.express')}
          </span>
        </div>
      )}
    </div>
  );
}

export default PriceBreakdown;
```

#### Props Interface
```typescript
interface PriceBreakdownProps {
  // Optional: data-testid for testing
  testId?: string;
}
```

#### Acceptance Criteria
- [ ] Component reads from calculatorAtom, selectedCountryAtom, selectedServicesAtom via useAtomValue
- [ ] NO useState hooks used - all state from Jotai atoms
- [ ] Displays base price with per-class calculation
- [ ] Shows filing fee when applicable
- [ ] Lists selected services with per-class calculations
- [ ] Calculates and displays correct totals
- [ ] Integrates PriceItem and PriceTotal sub-components
- [ ] All labels use i18n translations
- [ ] Responsive layout works from 200px to 3000px width
- [ ] Shows empty state when no calculator data
- [ ] Tests verify calculations and state integration
- [ ] Currency formatting uses locale from i18n

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- PriceBreakdown.test.tsx
npm run lint -- src/components/Calculator/PriceBreakdown.tsx
```

---

### Subtask 030.4: PriceBreakdown Styling & Responsive Layout

#### Status
status: pending

#### Objective
Create comprehensive CSS module with responsive layout supporting 200px to 3000px width, proper typography, spacing, currency alignment, and visual hierarchy.

#### Context
The styling module defines all visual presentation for the price breakdown system. Must handle responsive design across extreme viewport ranges, ensure proper alignment of prices/labels, implement visual hierarchy for emphasis, support dark/light themes, and provide accessible color contrast. Uses CSS module with camelCase convention per project setup.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/PriceBreakdown.module.css` - All component styling

#### Implementation

```css
/* =========================== */
/* PriceBreakdown Container    */
/* =========================== */

.priceBreakdown {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--color-bg-secondary, #f5f5f5);
  border: 1px solid var(--color-border-primary, #e0e0e0);
}

.priceBreakdown:dark {
  background-color: var(--color-bg-secondary, #1e1e1e);
  border-color: var(--color-border-primary, #333333);
}

.priceBreakdownTitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary, #000000);
  margin: 0;
  padding: 0;
  text-transform: capitalize;
}

.priceBreakdown:dark .priceBreakdownTitle {
  color: var(--color-text-primary, #ffffff);
}

/* Empty state */
.priceBreakdownEmpty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
  text-align: center;
  color: var(--color-text-secondary, #666666);
  font-size: 0.9rem;
}

.priceBreakdownEmpty p {
  margin: 0;
}

/* Notes and additional info */
.priceBreakdownNote {
  padding: 0.75rem 1rem;
  background-color: var(--color-success-bg, #e8f5e9);
  border-left: 3px solid var(--color-success, #4caf50);
  border-radius: 4px;
  font-size: 0.85rem;
}

.priceBreakdown:dark .priceBreakdownNote {
  background-color: var(--color-success-bg, #1b5e20);
  border-left-color: var(--color-success, #81c784);
}

.noteText {
  color: var(--color-success-text, #1b5e20);
  font-weight: 500;
}

.priceBreakdown:dark .noteText {
  color: var(--color-success-text, #81c784);
}

/* =========================== */
/* Price Items Container       */
/* =========================== */

.priceItems {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.priceItemDivider {
  height: 1px;
  background-color: var(--color-border-secondary, #d0d0d0);
  margin: 0.5rem 0;
}

.priceBreakdown:dark .priceItemDivider {
  background-color: var(--color-border-secondary, #404040);
}

/* =========================== */
/* PriceItem Styles            */
/* =========================== */

.priceItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  font-size: 0.9rem;
}

.priceItem.default {
  color: var(--color-text-secondary, #555555);
}

.priceItem.highlight {
  font-weight: 600;
  padding: 0.75rem;
  background-color: var(--color-highlight-bg, #fafafa);
  border-radius: 4px;
  color: var(--color-text-primary, #000000);
}

.priceBreakdown:dark .priceItem.highlight {
  background-color: var(--color-highlight-bg, #2a2a2a);
  color: var(--color-text-primary, #ffffff);
}

.priceItemLabel {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.labelText {
  font-weight: 500;
}

.unitPrice {
  font-size: 0.75rem;
  color: var(--color-text-tertiary, #999999);
  font-weight: normal;
}

.priceItem.highlight .unitPrice {
  color: var(--color-text-secondary, #666666);
}

.priceItemAmount {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  white-space: nowrap;
}

.amountValue {
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-align: right;
  min-width: 80px;
}

/* =========================== */
/* Price Total Styles          */
/* =========================== */

.priceTotal {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1rem 0;
  border-top: 2px solid var(--color-border-primary, #e0e0e0);
}

.priceBreakdown:dark .priceTotal {
  border-top-color: var(--color-border-primary, #333333);
}

.priceTotalRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary, #555555);
}

.priceTotalLabel {
  flex: 1;
  font-weight: 500;
}

.priceTotalAmount {
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-align: right;
  min-width: 80px;
  white-space: nowrap;
}

.priceTotalDivider {
  height: 1px;
  background-color: var(--color-border-secondary, #e8e8e8);
  margin: 0.5rem 0;
}

.priceBreakdown:dark .priceTotalDivider {
  background-color: var(--color-border-secondary, #3a3a3a);
}

/* Final total styling */
.priceTotalFinal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary, #000000);
}

.priceBreakdown:dark .priceTotalFinal {
  color: var(--color-text-primary, #ffffff);
}

.priceTotalFinalAmount {
  font-family: 'Courier New', monospace;
  text-align: right;
  min-width: 100px;
  white-space: nowrap;
  font-size: 1.2rem;
  color: var(--color-success, #4caf50);
}

.priceBreakdown:dark .priceTotalFinalAmount {
  color: var(--color-success, #81c784);
}

/* Tax notice */
.priceTotalNotice {
  padding: 0.5rem 0;
  font-size: 0.75rem;
  color: var(--color-text-tertiary, #999999);
  font-style: italic;
  margin: 0.5rem 0 0 0;
}

/* =========================== */
/* Responsive Design 200-3000px */
/* =========================== */

/* Extra small (200px - 320px) */
@media (max-width: 320px) {
  .priceBreakdown {
    padding: 1rem;
    gap: 0.75rem;
  }

  .priceItem {
    font-size: 0.8rem;
    padding: 0.5rem 0;
  }

  .amountValue {
    min-width: 60px;
    font-size: 0.9rem;
  }

  .priceTotalFinal {
    font-size: 1rem;
    gap: 0.5rem;
  }

  .priceTotalFinalAmount {
    min-width: 70px;
    font-size: 1rem;
  }

  .labelText {
    word-break: break-word;
  }
}

/* Small (321px - 480px) */
@media (max-width: 480px) {
  .priceBreakdown {
    padding: 1rem;
  }

  .priceItem {
    font-size: 0.85rem;
  }

  .amountValue {
    min-width: 70px;
  }

  .priceTotalFinal {
    font-size: 1.05rem;
  }

  .priceTotalFinalAmount {
    min-width: 80px;
    font-size: 1.1rem;
  }
}

/* Medium (481px - 768px) */
@media (max-width: 768px) {
  .priceBreakdown {
    padding: 1.25rem;
  }

  .priceItem {
    font-size: 0.9rem;
  }

  .amountValue {
    min-width: 80px;
  }

  .priceTotalFinal {
    font-size: 1.1rem;
  }

  .priceTotalFinalAmount {
    min-width: 90px;
    font-size: 1.15rem;
  }
}

/* Large (769px - 1024px) */
@media (min-width: 769px) {
  .priceBreakdown {
    max-width: 600px;
    margin: 0 auto;
  }

  .priceItem {
    font-size: 0.95rem;
    padding: 0.85rem 0;
  }

  .amountValue {
    min-width: 100px;
  }

  .priceTotalFinal {
    font-size: 1.15rem;
  }

  .priceTotalFinalAmount {
    min-width: 110px;
    font-size: 1.25rem;
  }
}

/* XL (1025px - 2560px) */
@media (min-width: 1025px) {
  .priceBreakdown {
    max-width: 700px;
    padding: 2rem;
  }

  .priceItem {
    font-size: 1rem;
    padding: 1rem 0;
  }

  .amountValue {
    min-width: 120px;
  }

  .priceTotalFinal {
    font-size: 1.2rem;
    padding: 1.5rem 0;
  }

  .priceTotalFinalAmount {
    min-width: 130px;
    font-size: 1.3rem;
  }
}

/* XXL (2561px - 3000px+) */
@media (min-width: 2561px) {
  .priceBreakdown {
    max-width: 900px;
    padding: 2.5rem;
    gap: 1.5rem;
  }

  .priceItem {
    font-size: 1.1rem;
    padding: 1.25rem 0;
  }

  .amountValue {
    min-width: 150px;
    font-size: 1.1rem;
  }

  .priceTotalFinal {
    font-size: 1.35rem;
    padding: 2rem 0;
  }

  .priceTotalFinalAmount {
    min-width: 160px;
    font-size: 1.5rem;
  }
}

/* =========================== */
/* Accessibility & Focus       */
/* =========================== */

.priceItem:focus,
.priceTotalRow:focus {
  outline: 2px solid var(--color-focus, #0066cc);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .priceBreakdown {
    background-color: var(--color-bg-secondary, #1e1e1e);
    border-color: var(--color-border-primary, #333333);
  }

  .priceBreakdownTitle {
    color: var(--color-text-primary, #ffffff);
  }

  .priceItem.default {
    color: var(--color-text-secondary, #cccccc);
  }

  .priceTotalRow {
    color: var(--color-text-secondary, #cccccc);
  }

  .priceTotalFinal {
    color: var(--color-text-primary, #ffffff);
  }

  .priceTotalFinalAmount {
    color: var(--color-success, #81c784);
  }
}

/* Print styles */
@media print {
  .priceBreakdown {
    border: 1px solid #000;
    page-break-inside: avoid;
  }

  .priceTotalFinal {
    font-weight: 900;
    border-top: 2px solid #000;
    border-bottom: 3px double #000;
  }
}
```

#### Acceptance Criteria
- [ ] CSS module created with camelCase convention
- [ ] All component styles properly defined (.priceBreakdown, .priceItem, .priceTotal, etc.)
- [ ] Responsive breakpoints cover 200px-3000px viewport width
- [ ] Font sizes scale appropriately per viewport size
- [ ] Currency alignment consistent across all price displays
- [ ] Dark mode support via CSS variables and media query
- [ ] Visual hierarchy clear (emphasis on totals, lighter on details)
- [ ] Spacing and padding scale with viewport
- [ ] No console errors when imported
- [ ] Proper contrast ratios for accessibility
- [ ] Print styles included for PDF export

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
# Check CSS module syntax
npx postcss src/components/Calculator/PriceBreakdown.module.css --no-map 2>&1 | head -20
# Verify imports work
npm run type-check
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/Calculator/PriceItem.tsx`
- `src/components/Calculator/PriceItem.test.tsx`
- `src/components/Calculator/PriceTotal.tsx`
- `src/components/Calculator/PriceTotal.test.tsx`
- `src/components/Calculator/PriceBreakdown.tsx`
- `src/components/Calculator/PriceBreakdown.test.tsx`
- `src/components/Calculator/PriceBreakdown.module.css`

### Imports From Existing Code
- `Jotai`: `useAtomValue` - Read-only state access from calculator atoms
- `react-i18next`: `useTranslation` - Multi-language label support
- `@/atoms/calculatorAtom` - `calculatorAtom`, `selectedCountryAtom`, `selectedServicesAtom` (created in task 2)
- `@/types/calculator` - Type definitions for calculator state
- CSS module features and theme variables from project setup (task 1)

### Exports For Other Code
- `PriceBreakdown` - Main component for calculator display
- `PriceItem` - Sub-component for itemized lines
- `PriceTotal` - Sub-component for totals display
- Component types: `PriceBreakdownProps`, `PriceItemProps`, `PriceTotalProps`

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Type checking
npm run type-check

# Run all subtask tests
npm test -- --testPathPattern="Price(Item|Total|Breakdown)"

# Lint components
npm run lint -- src/components/Calculator/Price*.tsx

# Verify CSS module
npx postcss src/components/Calculator/PriceBreakdown.module.css --no-map > /dev/null && echo "CSS valid"

# Build test
npm run build 2>&1 | grep -i "error" | head -5
```

---

## Parallelization Notes
- All 4 subtasks are completely independent and can run in parallel
- Subtask 030.1 (PriceItem) needs no dependencies from others
- Subtask 030.2 (PriceTotal) uses PriceItem but could be built in parallel (tested separately)
- Subtask 030.3 (PriceBreakdown) uses components from 030.1 and 030.2 but implementation is independent
- Subtask 030.4 (Styling) is completely independent CSS, no code dependencies
- Each subtask owns exclusive files with no file sharing
- All subtasks can be completed first, last, or simultaneously
- No cross-subtask imports or dependencies in component implementation
- PriceItem and PriceTotal work as standalone components even before integration
- CSS module can be written before or after components - purely styling concern
