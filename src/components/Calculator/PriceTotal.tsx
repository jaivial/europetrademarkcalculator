import { useTranslation } from 'react-i18next';
import styles from './PriceBreakdown.module.css';

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
  const { t, i18n } = useTranslation('calculator');

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
      aria-label={t('totalPrice')}
    >
      {/* Subtotal */}
      <div className={styles.priceTotalRow}>
        <span className={styles.priceTotalLabel}>{t('subtotal')}</span>
        <span className={styles.priceTotalAmount}>{formatCurrency(subtotal)}</span>
      </div>

      {/* Tax row (only if tax rate > 0) */}
      {taxRate > 0 && (
        <>
          <div className={styles.priceTotalDivider} />
          <div className={styles.priceTotalRow}>
            <span className={styles.priceTotalLabel}>
              {t('tax')} ({(taxRate * 100).toFixed(0)}%)
            </span>
            <span className={styles.priceTotalAmount}>{formatCurrency(taxAmount)}</span>
          </div>
        </>
      )}

      {/* Tax notice */}
      {taxRate === 0 && !includesTax && (
        <div className={styles.priceTotalNotice}>
          <span>{t('priceExclusive')}</span>
        </div>
      )}

      {/* Final Total */}
      <div className={styles.priceTotalDivider} />
      <div className={styles.priceTotalFinal}>
        <span className={styles.priceTotalLabel}>{t('totalPrice')}</span>
        <span className={styles.priceTotalFinalAmount}>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

export default PriceTotal;
