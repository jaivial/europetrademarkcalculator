// src/components/CountryList/EmptyState.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CountryGrid.module.css';

export interface EmptyStateProps {
  className?: string;
  showIcon?: boolean;
  message?: string;
  suggestion?: string;
}

/**
 * EmptyState Component
 * Displays a friendly message when no countries are available
 * Supports i18n with fallback English messages
 *
 * Features:
 * - Multi-language support via i18next
 * - Accessible with proper ARIA labels
 * - Customizable message and suggestion text
 * - Optional icon display for visual emphasis
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  className = '',
  showIcon = true,
  message,
  suggestion,
}) => {
  const { t } = useTranslation();

  // Get messages from i18n with fallback to defaults
  const emptyMessage = message || t('countryGrid.emptyState.title', 'No countries found');
  const emptySuggestion =
    suggestion ||
    t(
      'countryGrid.emptyState.suggestion',
      'Try adjusting your search filters or clear your search to see all countries.'
    );

  return (
    <div
      className={`${styles.emptyState} ${className}`}
      role="region"
      aria-label="No countries available"
      aria-live="polite"
    >
      {/* Icon Section */}
      {showIcon && (
        <div className={styles.emptyStateIcon}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M32 4C16.536 4 4 16.536 4 32c0 15.464 12.536 28 28 28s28-12.536 28-28S47.464 4 32 4zm0 52c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"
              fill="currentColor"
            />
            <path
              d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {/* Message Section */}
      <div className={styles.emptyStateContent}>
        <h3 className={styles.emptyStateTitle}>{emptyMessage}</h3>
        <p className={styles.emptyStateSuggestion}>{emptySuggestion}</p>
      </div>

      {/* Optional: Action Button */}
      <div className={styles.emptyStateAction}>
        <p className={styles.emptyStateHint}>
          {t(
            'countryGrid.emptyState.hint',
            'Use the filters above to search or browse countries'
          )}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
