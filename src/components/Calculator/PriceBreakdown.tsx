import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import styles from './PriceBreakdown.module.css';
import { PriceItem } from './PriceItem';
import { PriceTotal } from './PriceTotal';
import {
  selectedCountriesAtom,
  selectedClassesAtom,
  selectedOptionsAtom,
  priorityLevelAtom,
} from '@/atoms/calculatorAtom';

export interface PriceBreakdownProps {
  testId?: string;
}

// Mock pricing data - in real app this would come from API or config
const PRICE_PER_CLASS = 100;
const BASE_FILING_FEE = 250;
const SERVICE_COSTS: Record<string, number> = {
  monitoring: 50,
  legalSupport: 150,
  fastTrack: 200,
};
const PRIORITY_MULTIPLIERS = {
  standard: 1.0,
  expedited: 1.5,
  premium: 2.0,
};
const TAX_RATE = 0.19; // 19% VAT

export function PriceBreakdown({ testId }: PriceBreakdownProps) {
  const { t } = useTranslation('calculator');
  const selectedCountries = useAtomValue(selectedCountriesAtom);
  const selectedClasses = useAtomValue(selectedClassesAtom);
  const selectedOptions = useAtomValue(selectedOptionsAtom);
  const priorityLevel = useAtomValue(priorityLevelAtom);

  // Early return if no data
  if (!selectedCountries || selectedCountries.length === 0 || !selectedClasses || selectedClasses.length === 0) {
    return (
      <div className={styles.priceBreakdownEmpty} data-testid={testId}>
        <p>{t('noCountrySelected')}</p>
      </div>
    );
  }

  // Calculate line items based on calculator state
  const numberOfClasses = selectedClasses.length;
  const numberOfCountries = selectedCountries.length;

  // Base price calculation
  const basePrice = numberOfClasses * PRICE_PER_CLASS * numberOfCountries;

  // Filing fee (per country)
  const filingFee = BASE_FILING_FEE * numberOfCountries;

  // Services price
  const servicesPrice = (selectedOptions || []).reduce((sum, service) => {
    const serviceCost = SERVICE_COSTS[service] || 0;
    return sum + (serviceCost * numberOfClasses * numberOfCountries);
  }, 0);

  // Apply priority multiplier
  const priorityMultiplier = PRIORITY_MULTIPLIERS[priorityLevel] || 1.0;
  const subtotalBeforePriority = basePrice + filingFee + servicesPrice;
  const subtotal = subtotalBeforePriority * priorityMultiplier;

  const taxRate = TAX_RATE;

  return (
    <div
      className={styles.priceBreakdown}
      data-testid={testId || 'price-breakdown'}
      role="region"
      aria-label={t('priceBreakdown')}
    >
      {/* Header */}
      <h3 className={styles.priceBreakdownTitle}>
        {t('priceBreakdown')}
      </h3>

      {/* Price items container */}
      <div className={styles.priceItems} role="table">
        {/* Base price per class */}
        <PriceItem
          label={t('perClass')}
          amount={basePrice}
          quantity={numberOfClasses * numberOfCountries}
          unitPrice={PRICE_PER_CLASS}
          currency="EUR"
          testId="price-item-base"
        />

        {/* Filing fee */}
        {filingFee > 0 && (
          <PriceItem
            label={t('baseFee')}
            amount={filingFee}
            quantity={numberOfCountries}
            unitPrice={BASE_FILING_FEE}
            currency="EUR"
            testId="price-item-filing"
          />
        )}

        {/* Service fees - grouped or itemized */}
        {selectedOptions && selectedOptions.length > 0 && (
          <>
            <div className={styles.priceItemDivider} />
            {selectedOptions.map((service) => {
              const serviceCost = SERVICE_COSTS[service] || 0;
              const totalServiceCost = serviceCost * numberOfClasses * numberOfCountries;

              return (
                <PriceItem
                  key={service}
                  label={t(`calculator.${service}`)}
                  amount={totalServiceCost}
                  quantity={numberOfClasses * numberOfCountries}
                  unitPrice={serviceCost}
                  currency="EUR"
                  testId={`price-item-${service}`}
                />
              );
            })}
          </>
        )}

        {/* Priority fee (if not standard) */}
        {priorityLevel !== 'standard' && (
          <>
            <div className={styles.priceItemDivider} />
            <PriceItem
              label={t(`calculator.${priorityLevel}`)}
              amount={subtotalBeforePriority * (priorityMultiplier - 1)}
              currency="EUR"
              variant="highlight"
              testId="price-item-priority"
            />
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
        includesTax={false}
        testId="price-total"
      />

      {/* Additional info notice */}
      {priorityLevel === 'premium' && (
        <div className={styles.priceBreakdownNote}>
          <span className={styles.noteText}>
            {t('priorityDescription')}
          </span>
        </div>
      )}
    </div>
  );
}

export default PriceBreakdown;
