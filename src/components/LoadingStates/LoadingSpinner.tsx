import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoadingStates.module.css';

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner in pixels
   * Responsive: 24px on mobile, 48px on desktop
   * Supports range from 24px to 128px
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Optional loading message to display below spinner
   * If not provided, uses i18n default message
   */
  message?: string;

  /**
   * Show or hide the loading message
   * Default: true
   */
  showMessage?: boolean;

  /**
   * Custom class name for styling
   */
  className?: string;

  /**
   * Accessibility label for screen readers
   */
  ariaLabel?: string;
}

/**
 * LoadingSpinner Component
 * Displays an animated spinner for loading states
 * Responsive and accessible with i18n support
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message,
  showMessage = true,
  className,
  ariaLabel,
}) => {
  const { t } = useTranslation('common');

  const sizeMap = {
    small: 24,
    medium: 48,
    large: 128,
  };

  const spinnerSize = sizeMap[size];
  const displayMessage = message || t('loading', 'Loading...');

  return (
    <div
      className={`${styles.spinnerContainer} ${className || ''}`}
      role="status"
      aria-label={ariaLabel || t('loadingIndicator', 'Loading indicator')}
    >
      <div
        className={styles.spinner}
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          borderWidth: `${Math.max(2, spinnerSize / 12)}px`,
        }}
      />

      {showMessage && (
        <p className={styles.loadingMessage}>{displayMessage}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
