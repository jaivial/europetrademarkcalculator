import React from 'react';
import styles from './Summary.module.css';

export interface SummaryCardProps {
  label: string;
  value: string | number;
  icon?: 'globe' | 'document' | 'layers' | 'star' | 'euro';
  highlighted?: boolean;
  className?: string;
}

const ICON_SYMBOLS: Record<string, string> = {
  globe: '🌍',
  document: '📄',
  layers: '📚',
  star: '⭐',
  euro: '€'
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  icon = 'document',
  highlighted = false,
  className = ''
}) => {
  return (
    <div
      className={`
        ${styles.summaryCard}
        ${highlighted ? styles.summaryCardHighlighted : ''}
        ${className}
      `}
      role="region"
      aria-label={`${label}: ${value}`}
    >
      {icon && (
        <div className={styles.cardIcon}>
          <span className={styles.iconSymbol} aria-hidden="true">
            {ICON_SYMBOLS[icon] || '📄'}
          </span>
        </div>
      )}

      <div className={styles.cardContent}>
        <div className={styles.cardLabel}>
          <label className={styles.labelText}>{label}</label>
        </div>
        <div className={styles.cardValue}>
          <span className={styles.valueText}>{value}</span>
        </div>
      </div>

      {highlighted && (
        <div className={styles.highlightBadge} aria-hidden="true">
          ✓
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
