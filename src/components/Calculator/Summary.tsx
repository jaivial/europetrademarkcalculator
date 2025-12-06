import React from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { selectedCountryAtom } from '@/store/atoms/selectedCountryAtom';
import { registrationTypeAtom } from '@/store/atoms/registrationTypeAtom';
import { numberOfClassesAtom } from '@/store/atoms/numberOfClassesAtom';
import { selectedServicesAtom } from '@/store/atoms/selectedServicesAtom';
import { calculatedPriceAtom } from '@/store/atoms/calculatedPriceAtom';
import { SummaryCard } from './SummaryCard';
import styles from './Summary.module.css';

export interface SummaryProps {
  onProceedClick?: () => void;
  proceedButtonLabel?: string;
  className?: string;
}

const SERVICE_LABELS: Record<string, string> = {
  monitoring: 'monitoring',
  legalSupport: 'legalSupport',
  fastTrack: 'fastTrack'
};

export const Summary: React.FC<SummaryProps> = ({
  onProceedClick,
  proceedButtonLabel = 'proceed',
  className = ''
}) => {
  const { t } = useTranslation('calculator');

  const [selectedCountry] = useAtom(selectedCountryAtom);
  const [registrationType] = useAtom(registrationTypeAtom);
  const [numberOfClasses] = useAtom(numberOfClassesAtom);
  const [selectedServices] = useAtom(selectedServicesAtom);
  const [calculatedPrice] = useAtom(calculatedPriceAtom);

  const handleProceedClick = () => {
    if (onProceedClick) {
      onProceedClick();
    }
  };

  return (
    <div
      className={`${styles.summaryContainer} ${className}`}
      role="region"
      aria-label={t('summary')}
    >
      <div className={styles.summaryHeader}>
        <h2 className={styles.summaryTitle}>{t('summary')}</h2>
      </div>

      <div className={styles.summaryContent}>
        {/* Selected Country Card */}
        <SummaryCard
          label={t('country', { ns: 'common' })}
          value={selectedCountry?.name || t('noCountrySelected')}
          icon="globe"
          highlighted={false}
        />

        {/* Registration Type Card */}
        <SummaryCard
          label={t('registrationType')}
          value={t(registrationType || 'standard')}
          icon="document"
          highlighted={false}
        />

        {/* Number of Classes Card */}
        <SummaryCard
          label={t('numberOfClasses')}
          value={`${numberOfClasses}`}
          icon="layers"
          highlighted={false}
        />

        {/* Selected Services Card */}
        {selectedServices && selectedServices.length > 0 && (
          <SummaryCard
            label={t('optionalServices')}
            value={selectedServices
              .map(service => t(SERVICE_LABELS[service] || service))
              .join(', ')}
            icon="star"
            highlighted={false}
          />
        )}

        {/* Final Price Card - Highlighted */}
        <SummaryCard
          label={t('totalPrice')}
          value={`${calculatedPrice?.toFixed(2) || '0.00'} ${t('currency', { ns: 'common' })}`}
          icon="euro"
          highlighted={true}
          className={styles.priceCard}
        />
      </div>

      {/* CTA Button */}
      <div className={styles.ctaSection}>
        <button
          className={styles.proceedButton}
          onClick={handleProceedClick}
          type="button"
          aria-label={t(proceedButtonLabel)}
        >
          <span className={styles.proceedButtonText}>
            {t(proceedButtonLabel)}
          </span>
          <span className={styles.proceedButtonArrow}>→</span>
        </button>
      </div>

      {/* Summary Footer - Optional Disclaimer */}
      <div className={styles.summaryFooter}>
        <p className={styles.summaryDisclaimer}>
          {t('priceEstimate')}
        </p>
      </div>
    </div>
  );
};

export default Summary;
