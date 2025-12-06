// src/components/Calculator/OptionGroup.tsx
import React from 'react';
import { OptionItem } from './OptionItem';
import styles from './OptionGroup.module.css';

export interface OptionGroupProps {
  title: string;
  description?: string;
  type: 'classes' | 'filing-types' | 'services';
  items: any[];
  selectedItems: (number | string)[];
  onItemToggle: (item: number | string | any) => void;
  isRadio?: boolean;
  maxItems?: number;
  minItems?: number;
  className?: string;
}

/**
 * OptionGroup - Reusable component for displaying grouped options
 * Renders checkbox list or radio button list based on isRadio prop
 * Responsive grid layout adjusts from 1 to 4 columns based on viewport
 */
export const OptionGroup: React.FC<OptionGroupProps> = ({
  title,
  description,
  type,
  items,
  selectedItems,
  onItemToggle,
  isRadio = false,
  maxItems,
  className = ''
}) => {
  const handleItemClick = (item: any) => {
    if (isRadio) {
      // For radio buttons, toggle the item or deselect if already selected
      const itemValue = item.id || item.number || item;
      onItemToggle(itemValue);
    } else {
      // For checkboxes, toggle inclusion in selection
      onItemToggle(item.id || item.number || item);
    }
  };

  const getItemId = (item: any): number | string => {
    return item.id || item.number || item;
  };

  const isItemSelected = (item: any): boolean => {
    const itemId = getItemId(item);
    return selectedItems.includes(itemId);
  };

  return (
    <fieldset className={`${styles.optionGroup} ${className}`}>
      <div className={styles.optionGroupHeader}>
        <legend className={styles.optionGroupTitle}>{title}</legend>
        {description && (
          <p className={styles.optionGroupDescription}>{description}</p>
        )}
      </div>

      <div className={`${styles.optionGroupItems} ${styles[`type-${type}`]}`}>
        {items.map((item) => (
          <OptionItem
            key={getItemId(item)}
            id={getItemId(item).toString()}
            label={item.name || item.label}
            description={item.description}
            isSelected={isItemSelected(item)}
            isRadio={isRadio}
            type={type}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>

      {maxItems && (
        <div className={styles.optionGroupFooter}>
          <small className={styles.optionGroupHint}>
            Maximum {maxItems} selections allowed
          </small>
        </div>
      )}
    </fieldset>
  );
};

export default OptionGroup;
