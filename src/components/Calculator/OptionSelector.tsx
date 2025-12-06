// src/components/Calculator/OptionSelector.tsx
import React from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { NICE_CLASSES, FILING_TYPES, OPTIONAL_SERVICES } from '@/data/calculatorOptions';
import { OptionGroup } from './OptionGroup';
import styles from './OptionSelector.module.css';
import type { TrademarkClass } from '@/types';

export interface OptionSelectorProps {
  className?: string;
  onSelectionChange?: (state: any) => void;
}

/**
 * OptionSelector - Main component for selecting trademark classes, filing types, and services
 * Uses Jotai atoms via useCalculator hook (NO useState)
 * Responsive from 200px to 3000px viewport width
 */
export const OptionSelector: React.FC<OptionSelectorProps> = ({
  className = '',
  onSelectionChange
}) => {
  // Jotai hook for calculator state management
  const {
    selectedClasses,
    setClasses,
    selectedOptions,
    setOptions,
    priorityLevel,
    setPriority
  } = useCalculator();

  const handleClassToggle = (classNumber: number) => {
    const newSelection = selectedClasses.includes(classNumber as TrademarkClass)
      ? selectedClasses.filter(c => c !== classNumber)
      : [...selectedClasses, classNumber as TrademarkClass];
    setClasses(newSelection);

    if (onSelectionChange) {
      onSelectionChange({
        classes: newSelection,
        filingType: priorityLevel,
        services: selectedOptions
      });
    }
  };

  const handleFilingTypeChange = (type: string) => {
    setPriority(type as 'standard' | 'expedited' | 'premium');

    if (onSelectionChange) {
      onSelectionChange({
        classes: selectedClasses,
        filingType: type,
        services: selectedOptions
      });
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    const newServices = selectedOptions.includes(serviceId)
      ? selectedOptions.filter(s => s !== serviceId)
      : [...selectedOptions, serviceId];
    setOptions(newServices);

    if (onSelectionChange) {
      onSelectionChange({
        classes: selectedClasses,
        filingType: priorityLevel,
        services: newServices
      });
    }
  };

  // Map filing type priority to ID for display
  const getCurrentFilingTypeId = (): string => {
    const priorityMap: Record<string, string> = {
      'standard': 'standard',
      'expedited': 'expedited',
      'premium': 'priority'
    };
    return priorityMap[priorityLevel] || 'standard';
  };

  return (
    <div
      className={`${styles.optionSelector} ${className}`}
      role="region"
      aria-label="Registration options selector"
    >
      <div className={styles.optionSelectorContainer}>
        {/* Nice Classification Classes Section */}
        <OptionGroup
          title="Trademark Classes (Nice Classification 1-45)"
          description="Select all classes that apply to your brand"
          type="classes"
          items={Object.values(NICE_CLASSES)}
          selectedItems={selectedClasses.map(c => Number(c))}
          onItemToggle={handleClassToggle}
          maxItems={45}
          minItems={1}
        />

        {/* Filing Types Section */}
        <OptionGroup
          title="Registration Type"
          description="Choose your registration processing speed"
          type="filing-types"
          items={FILING_TYPES}
          selectedItems={[getCurrentFilingTypeId()]}
          onItemToggle={(item) => handleFilingTypeChange(item.toString())}
          isRadio={true}
        />

        {/* Optional Services Section */}
        <OptionGroup
          title="Optional Services"
          description="Add extra services to your registration"
          type="services"
          items={OPTIONAL_SERVICES}
          selectedItems={selectedOptions}
          onItemToggle={handleServiceToggle}
          maxItems={OPTIONAL_SERVICES.length}
        />
      </div>

      {/* Summary Section */}
      <div className={styles.optionSelectorSummary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Selected Classes:</span>
          <span className={styles.summaryValue}>
            {selectedClasses.length > 0
              ? `${selectedClasses.length} of 45`
              : 'None selected'}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Filing Type:</span>
          <span className={styles.summaryValue}>
            {FILING_TYPES.find(f => f.id === getCurrentFilingTypeId())?.name || 'Not selected'}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Services:</span>
          <span className={styles.summaryValue}>
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : 'None selected'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OptionSelector;
