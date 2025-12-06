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
