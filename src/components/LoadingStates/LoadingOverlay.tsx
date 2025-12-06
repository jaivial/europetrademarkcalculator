import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';
import styles from './LoadingStates.module.css';

export interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  isVisible: boolean;

  /**
   * Message to display on overlay
   * If not provided, uses i18n default message
   */
  message?: string;

  /**
   * Opacity of backdrop (0-1)
   * Default: 0.7
   */
  backdropOpacity?: number;

  /**
   * Whether to show cancel button
   * Default: false
   */
  showCancel?: boolean;

  /**
   * Callback when cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * Size of spinner
   * Default: 'large'
   */
  spinnerSize?: 'small' | 'medium' | 'large';

  /**
   * z-index for overlay
   * Default: 1000
   */
  zIndex?: number;
}

/**
 * LoadingOverlay Component
 * Full-page or container overlay with spinner
 * Prevents user interaction while loading
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message,
  backdropOpacity = 0.7,
  showCancel = false,
  onCancel,
  spinnerSize = 'large',
  zIndex = 1000,
}) => {
  const { t } = useTranslation('common');

  if (!isVisible) {
    return null;
  }

  const displayMessage = message || t('loading', 'Loading...');

  return (
    <div
      className={styles.overlayContainer}
      style={{
        zIndex,
        backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
      }}
      role="status"
      aria-label={t('loadingOverlay', 'Loading overlay')}
      aria-live="polite"
    >
      <div className={styles.overlayContent}>
        <LoadingSpinner
          size={spinnerSize}
          message={displayMessage}
          showMessage={true}
        />

        {showCancel && onCancel && (
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            aria-label={t('cancel', 'Cancel')}
          >
            {t('cancel', 'Cancel')}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
