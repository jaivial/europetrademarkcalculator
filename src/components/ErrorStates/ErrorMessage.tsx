import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorStates.module.css';

export interface ErrorMessageProps {
  /**
   * Error message to display
   */
  message: string;

  /**
   * Type of error display
   * 'inline': Within content area
   * 'alert': Block with background
   * 'banner': Full-width at top/bottom
   * Default: 'inline'
   */
  type?: 'inline' | 'alert' | 'banner';

  /**
   * Whether error can be dismissed
   * Default: true
   */
  dismissable?: boolean;

  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;

  /**
   * Detailed error description
   */
  details?: string;

  /**
   * Error code or identifier
   */
  code?: string;

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * ErrorMessage Component
 * Displays error messages with optional dismissal
 * Responsive and accessible with i18n support
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'inline',
  dismissable = true,
  onDismiss,
  details,
  code,
  className,
}) => {
  const { t } = useTranslation('common');
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  const handleDismiss = (): void => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={`${styles.errorMessageContainer} ${styles[`errorMessage${type}`]} ${className || ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.errorIcon}>
        <span aria-hidden="true">⚠️</span>
      </div>

      <div className={styles.errorBody}>
        <p className={styles.errorText}>{message}</p>

        {details && (
          <p className={styles.errorDetailsText}>{details}</p>
        )}

        {code && (
          <p className={styles.errorCode}>
            {t('errors.code', 'Error Code')}: {code}
          </p>
        )}
      </div>

      {dismissable && (
        <button
          className={styles.dismissButton}
          onClick={handleDismiss}
          aria-label={t('dismiss', 'Dismiss')}
          title={t('dismiss', 'Dismiss')}
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
