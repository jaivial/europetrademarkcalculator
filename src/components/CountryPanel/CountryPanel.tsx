import { useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { selectedCountryAtom } from '@/atoms/countryAtom';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import confetti from 'canvas-confetti';
import styles from './CountryPanel.module.css';

// Registration type options
export type RegistrationType = 'standard' | 'express' | 'priority';

// Optional services
export interface OptionalServices {
  monitoring: boolean;
  legalSupport: boolean;
  fastTrack: boolean;
}

// Calculator state atoms (Jotai only - NO useState)
export const numberOfClassesAtom = atomWithStorage<number>('numberOfClasses', 1);
export const registrationTypeAtom = atomWithStorage<RegistrationType>('registrationType', 'standard');
export const optionalServicesAtom = atomWithStorage<OptionalServices>('optionalServices', {
  monitoring: false,
  legalSupport: false,
  fastTrack: false,
});
export const quoteRevealedAtom = atom<boolean>(false);

// Derived atoms for price calculation
export const basePriceAtom = atom((get) => {
  const country = get(selectedCountryAtom);
  const classes = get(numberOfClassesAtom);

  if (!country?.brandRegistration) return 0;

  const { basePrice, pricePerClass } = country.brandRegistration;
  return basePrice + (classes * pricePerClass);
});

export const registrationMultiplierAtom = atom((get) => {
  const type = get(registrationTypeAtom);
  switch (type) {
    case 'express': return 1.5;
    case 'priority': return 2.0;
    default: return 1.0;
  }
});

export const servicesCostAtom = atom((get) => {
  const services = get(optionalServicesAtom);
  let cost = 0;

  if (services.monitoring) cost += 150;
  if (services.legalSupport) cost += 300;
  if (services.fastTrack) cost += 200;

  return cost;
});

export const totalPriceAtom = atom((get) => {
  const basePrice = get(basePriceAtom);
  const multiplier = get(registrationMultiplierAtom);
  const servicesCost = get(servicesCostAtom);

  return Math.round(basePrice * multiplier + servicesCost);
});

// Props interface
interface CountryPanelProps {
  className?: string;
  onClose?: () => void;
}

/**
 * CountryPanel Component
 *
 * Shows country details and calculator options when a country is selected
 * All state managed via Jotai atoms - NO useState
 */
export const CountryPanel: React.FC<CountryPanelProps> = ({ className = '', onClose }) => {
  const { t } = useTranslation('calculator');

  // Jotai atoms
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);
  const [numberOfClasses, setNumberOfClasses] = useAtom(numberOfClassesAtom);
  const [registrationType, setRegistrationType] = useAtom(registrationTypeAtom);
  const [optionalServices, setOptionalServices] = useAtom(optionalServicesAtom);
  const [quoteRevealed, setQuoteRevealed] = useAtom(quoteRevealedAtom);

  // Derived values
  const basePrice = useAtomValue(basePriceAtom);
  const servicesCost = useAtomValue(servicesCostAtom);
  const totalPrice = useAtomValue(totalPriceAtom);
  const multiplier = useAtomValue(registrationMultiplierAtom);

  // Handle close/deselect
  const handleClose = () => {
    setSelectedCountry(null);
    setQuoteRevealed(false);
    onClose?.();
  };

  // Toggle service
  const toggleService = (service: keyof OptionalServices) => {
    setOptionalServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  // Handle get quote button click - reveals quote section with confetti
  const handleGetQuote = () => {
    setQuoteRevealed(true);

    // Fire confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#003399', '#FFCC00', '#009933', '#FF6600'],
    });

    // Second burst for more effect
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#003399', '#FFCC00'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#009933', '#FF6600'],
      });
    }, 200);
  };

  // If no country selected, don't render
  if (!selectedCountry) {
    return null;
  }

  const hasPricing = !!selectedCountry.brandRegistration;

  return (
    <div className={`${styles.panel} ${className}`}>
      {/* Header with country info */}
      <div className={styles.header}>
        <div className={styles.countryInfo}>
          <span className={styles.flag}>{selectedCountry.flag || '🌍'}</span>
          <div className={styles.countryDetails}>
            <h2 className={styles.countryName}>{selectedCountry.name}</h2>
            <span className={styles.countryMeta}>
              {selectedCountry.continent} • {selectedCountry.code}
            </span>
          </div>
        </div>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label={t('close', { ns: 'common' })}
        >
          ×
        </button>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {hasPricing ? (
          <>
            {/* Number of Classes */}
            <div className={styles.section}>
              <label className={styles.label}>
                {t('numberOfClasses')}
              </label>
              <div className={styles.classSelector}>
                <button
                  className={styles.classButton}
                  onClick={() => setNumberOfClasses((prev) => Math.max(1, prev - 1))}
                  disabled={numberOfClasses <= 1}
                  aria-label="Decrease classes"
                >
                  −
                </button>
                <span className={styles.classCount}>{numberOfClasses}</span>
                <button
                  className={styles.classButton}
                  onClick={() => setNumberOfClasses((prev) => Math.min(45, prev + 1))}
                  disabled={numberOfClasses >= 45}
                  aria-label="Increase classes"
                >
                  +
                </button>
              </div>
              <span className={styles.hint}>
                {t('classesInfo')}
              </span>
            </div>

            {/* Registration Type */}
            <div className={styles.section}>
              <label className={styles.label}>
                {t('registrationType')}
              </label>
              <div className={styles.typeOptions}>
                {(['standard', 'express', 'priority'] as RegistrationType[]).map((type) => (
                  <button
                    key={type}
                    className={`${styles.typeButton} ${registrationType === type ? styles.active : ''}`}
                    onClick={() => setRegistrationType(type)}
                  >
                    <span className={styles.typeName}>
                      {t(type)}
                    </span>
                    <span className={styles.typeMultiplier}>
                      {type === 'standard' ? '1x' : type === 'express' ? '1.5x' : '2x'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Services */}
            <div className={styles.section}>
              <label className={styles.label}>
                {t('optionalServices')}
              </label>
              <div className={styles.services}>
                <label className={styles.serviceItem}>
                  <input
                    type="checkbox"
                    checked={optionalServices.monitoring}
                    onChange={() => toggleService('monitoring')}
                  />
                  <span className={styles.serviceInfo}>
                    <span className={styles.serviceName}>
                      {t('monitoring')}
                    </span>
                    <span className={styles.servicePrice}>+€150</span>
                  </span>
                </label>
                <label className={styles.serviceItem}>
                  <input
                    type="checkbox"
                    checked={optionalServices.legalSupport}
                    onChange={() => toggleService('legalSupport')}
                  />
                  <span className={styles.serviceInfo}>
                    <span className={styles.serviceName}>
                      {t('legalSupport')}
                    </span>
                    <span className={styles.servicePrice}>+€300</span>
                  </span>
                </label>
                <label className={styles.serviceItem}>
                  <input
                    type="checkbox"
                    checked={optionalServices.fastTrack}
                    onChange={() => toggleService('fastTrack')}
                  />
                  <span className={styles.serviceInfo}>
                    <span className={styles.serviceName}>
                      {t('fastTrack')}
                    </span>
                    <span className={styles.servicePrice}>+€200</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className={styles.priceSection}>
              <div className={styles.priceRow}>
                <span>{t('baseFee')}</span>
                <span>€{basePrice}</span>
              </div>
              {servicesCost > 0 && (
                <div className={styles.priceRow}>
                  <span>{t('serviceFees')}</span>
                  <span>€{servicesCost}</span>
                </div>
              )}
              <div className={styles.totalRow}>
                <span>{t('totalPrice')}</span>
                <span className={styles.totalPrice}>€{totalPrice}</span>
              </div>
            </div>

            {/* Action Button - hidden when quote is revealed */}
            {!quoteRevealed && (
              <button className={styles.actionButton} onClick={handleGetQuote}>
                {t('getQuote')}
              </button>
            )}

            {/* Quote Revealed Section */}
            {quoteRevealed && (
              <div className={styles.quoteSection}>
                <div className={styles.quoteHeader}>
                  <span className={styles.quoteIcon}>🎉</span>
                  <h3 className={styles.quoteTitle}>{t('yourQuote')}</h3>
                </div>

                <div className={styles.quoteCard}>
                  <div className={styles.quoteCountry}>
                    <span className={styles.quoteFlag}>{selectedCountry.flag || '🌍'}</span>
                    <span className={styles.quoteCountryName}>{selectedCountry.name}</span>
                  </div>

                  <div className={styles.quoteSummary}>
                    <div className={styles.quoteLine}>
                      <span>{t('numberOfClasses')}</span>
                      <span>{numberOfClasses}</span>
                    </div>
                    <div className={styles.quoteLine}>
                      <span>{t('registrationType')}</span>
                      <span>{t(registrationType)} ({multiplier}x)</span>
                    </div>
                    {optionalServices.monitoring && (
                      <div className={styles.quoteLine}>
                        <span>{t('monitoring')}</span>
                        <span>+€150</span>
                      </div>
                    )}
                    {optionalServices.legalSupport && (
                      <div className={styles.quoteLine}>
                        <span>{t('legalSupport')}</span>
                        <span>+€300</span>
                      </div>
                    )}
                    {optionalServices.fastTrack && (
                      <div className={styles.quoteLine}>
                        <span>{t('fastTrack')}</span>
                        <span>+€200</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.quoteDivider} />

                  <div className={styles.quoteTotal}>
                    <span>{t('totalPrice')}</span>
                    <span className={styles.quoteTotalPrice}>€{totalPrice}</span>
                  </div>

                  <p className={styles.quoteNote}>{t('quoteNote')}</p>
                </div>

                <button
                  className={styles.newQuoteButton}
                  onClick={() => setQuoteRevealed(false)}
                >
                  {t('newQuote')}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.noPricing}>
            <p>{t('noPricingAvailable', { country: selectedCountry.name })}</p>
            <p className={styles.noPricingHint}>
              {t('contactForPricing')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryPanel;
