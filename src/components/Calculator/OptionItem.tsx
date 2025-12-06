// src/components/Calculator/OptionItem.tsx
import React from 'react';
import styles from './OptionItem.module.css';

export interface OptionItemProps {
  id: string;
  label: string;
  description?: string;
  isSelected: boolean;
  isRadio?: boolean;
  type: 'classes' | 'filing-types' | 'services';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * OptionItem - Individual selectable option (checkbox or radio button)
 * Displays label with optional description
 * Responsive card layout
 */
export const OptionItem: React.FC<OptionItemProps> = ({
  id,
  label,
  description,
  isSelected,
  isRadio = false,
  type,
  onClick,
  disabled = false,
  className = ''
}) => {
  const inputType = isRadio ? 'radio' : 'checkbox';
  const inputId = `option-${id}`;

  return (
    <label
      className={`${styles.optionItem} ${styles[`type-${type}`]} ${isSelected ? styles.optionItemSelected : ''} ${disabled ? styles.optionItemDisabled : ''} ${className}`}
      htmlFor={inputId}
      role="option"
      aria-selected={isSelected}
    >
      <input
        id={inputId}
        type={inputType}
        checked={isSelected}
        onChange={onClick}
        disabled={disabled}
        className={styles.optionItemInput}
        aria-label={`${label}${description ? `: ${description}` : ''}`}
      />

      <div className={styles.optionItemContent}>
        <span className={styles.optionItemLabel}>{label}</span>
        {description && (
          <span className={styles.optionItemDescription}>{description}</span>
        )}
      </div>

      <div className={styles.optionItemCheckmark} aria-hidden="true" />
    </label>
  );
};

export default OptionItem;
