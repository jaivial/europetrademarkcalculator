# Frontend Task 029: Calculator - Option Selector Component

## Metadata
- **Task**: 29 of 40
- **Area**: Frontend
- **Feature**: Option Selector (Classes, Filing Types, Services)
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a complete option selection component system for the brand registration calculator. This system allows users to select Nice Classification trademark classes (1-45), filing types (standard, expedited, priority), and optional services (monitoring, legal support, fast-track) via checkboxes and toggles. All state management uses the useCalculator hook powered by Jotai atoms (NO useState allowed). The component suite is fully responsive from 200px to 3000px width and includes the main OptionSelector container, reusable OptionGroup, individual OptionItem controls, and comprehensive CSS module styling. Each subtask is independent and can be implemented in parallel.

---

## Subtasks

### Subtask 029.1: OptionSelector Main Container Component

#### Status
status: pending

#### Objective
Create the main OptionSelector container component that orchestrates trademark class, filing type, and optional services selections using Jotai-based useCalculator hook.

#### Context
OptionSelector is the primary container component that manages the entire option selection workflow. It displays three distinct groups (Nice Classes, Filing Types, Optional Services), uses Jotai atoms via useCalculator hook to manage selections without any useState, and provides responsive layout support from 200px-3000px. This subtask owns the main container logic, layout structure, and integration with the useCalculator hook.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/OptionSelector.tsx` - Main OptionSelector container component
- `src/components/Calculator/OptionSelector.module.css` - Styles for the main container

#### Implementation

```typescript
// src/components/Calculator/OptionSelector.tsx
import React from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { NICE_CLASSES, FILING_TYPES, OPTIONAL_SERVICES } from '@/data/calculatorOptions';
import { OptionGroup } from './OptionGroup';
import styles from './OptionSelector.module.css';

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
    setSelectedClasses,
    filingType,
    setFilingType,
    selectedServices,
    setSelectedServices
  } = useCalculator();

  const handleClassToggle = (classNumber: number) => {
    const newSelection = selectedClasses.includes(classNumber)
      ? selectedClasses.filter(c => c !== classNumber)
      : [...selectedClasses, classNumber];
    setSelectedClasses(newSelection);

    if (onSelectionChange) {
      onSelectionChange({
        classes: newSelection,
        filingType,
        services: selectedServices
      });
    }
  };

  const handleFilingTypeChange = (type: string) => {
    setFilingType(type);

    if (onSelectionChange) {
      onSelectionChange({
        classes: selectedClasses,
        filingType: type,
        services: selectedServices
      });
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(s => s !== serviceId)
      : [...selectedServices, serviceId];
    setSelectedServices(newServices);

    if (onSelectionChange) {
      onSelectionChange({
        classes: selectedClasses,
        filingType,
        services: newServices
      });
    }
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
          selectedItems={selectedClasses}
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
          selectedItems={filingType ? [filingType] : []}
          onItemToggle={(item) => handleFilingTypeChange(item.toString())}
          isRadio={true}
        />

        {/* Optional Services Section */}
        <OptionGroup
          title="Optional Services"
          description="Add extra services to your registration"
          type="services"
          items={OPTIONAL_SERVICES}
          selectedItems={selectedServices}
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
            {filingType
              ? FILING_TYPES.find(f => f.id === filingType)?.name || 'Unknown'
              : 'Not selected'}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Services:</span>
          <span className={styles.summaryValue}>
            {selectedServices.length > 0
              ? `${selectedServices.length} selected`
              : 'None selected'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OptionSelector;
```

#### CSS Module

```css
/* src/components/Calculator/OptionSelector.module.css */
.optionSelector {
  width: 100%;
  padding: 1rem;
  min-width: 200px;
  max-width: 3000px;
}

.optionSelectorContainer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.optionSelectorSummary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-background-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border-subtle);
}

.summaryItem {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summaryLabel {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summaryValue {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .optionSelector {
    padding: 0.75rem;
  }

  .optionSelectorContainer {
    gap: 1.5rem;
  }

  .optionSelectorSummary {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .summaryLabel {
    font-size: 0.8125rem;
  }

  .summaryValue {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .optionSelector {
    padding: 0.5rem;
  }

  .optionSelectorContainer {
    gap: 1rem;
  }

  .optionSelectorSummary {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}
```

#### Props Interface
```typescript
interface OptionSelectorProps {
  className?: string;
  onSelectionChange?: (state: any) => void;
}
```

#### Acceptance Criteria
- [ ] Component renders three OptionGroup children (Classes, Filing Types, Services)
- [ ] Uses Jotai useCalculator hook (NO useState)
- [ ] Selections update Jotai state correctly
- [ ] Summary section displays current selections
- [ ] onSelectionChange callback fires when selections change
- [ ] Responsive layout from 200px-3000px width
- [ ] Proper ARIA labels and roles for accessibility
- [ ] No console errors or warnings
- [ ] TypeScript types are properly defined

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="OptionSelector" --testNamePattern="renders and manages state"
```

---

### Subtask 029.2: OptionGroup Reusable Group Component

#### Status
status: pending

#### Objective
Create a reusable OptionGroup component that displays a group of related options (classes, filing types, or services) with proper sectioning and layout.

#### Context
OptionGroup is a presentational component that renders a section of related options. It accepts an array of items and can render them as either checkboxes (for multi-select) or radio buttons (for single-select). It manages rendering logic, group header/description, and delegated item handling. This subtask owns the group layout structure and item rendering orchestration.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/OptionGroup.tsx` - Reusable option group component
- `src/components/Calculator/OptionGroup.module.css` - Styles for option groups

#### Implementation

```typescript
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
  minItems,
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
```

#### CSS Module

```css
/* src/components/Calculator/OptionGroup.module.css */
.optionGroup {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-standard);
  border-radius: 0.75rem;
  width: 100%;
  box-sizing: border-box;
}

.optionGroupHeader {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.optionGroupTitle {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  padding: 0;
}

.optionGroupDescription {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.optionGroupItems {
  display: grid;
  gap: 1rem;
  width: 100%;
}

/* Grid layout based on option type */
.optionGroupItems.type-classes {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.optionGroupItems.type-filing-types {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.optionGroupItems.type-services {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.optionGroupFooter {
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-subtle);
}

.optionGroupHint {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  display: block;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .optionGroup {
    padding: 1.25rem;
    gap: 1.25rem;
  }

  .optionGroupTitle {
    font-size: 1.125rem;
  }

  .optionGroupDescription {
    font-size: 0.875rem;
  }

  .optionGroupItems.type-classes {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  .optionGroupItems.type-filing-types {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  .optionGroupItems.type-services {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
}

@media (max-width: 768px) {
  .optionGroup {
    padding: 1rem;
    gap: 1rem;
  }

  .optionGroupTitle {
    font-size: 1rem;
  }

  .optionGroupDescription {
    font-size: 0.8125rem;
  }

  .optionGroupItems.type-classes {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }

  .optionGroupItems.type-filing-types {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .optionGroupItems.type-services {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .optionGroup {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .optionGroupTitle {
    font-size: 0.9375rem;
  }

  .optionGroupDescription {
    font-size: 0.75rem;
  }

  .optionGroupItems {
    gap: 0.75rem;
  }

  .optionGroupItems.type-classes {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }

  .optionGroupItems.type-filing-types {
    grid-template-columns: 1fr;
  }

  .optionGroupItems.type-services {
    grid-template-columns: 1fr;
  }
}
```

#### Props Interface
```typescript
interface OptionGroupProps {
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
```

#### Acceptance Criteria
- [ ] Component renders all items from items array
- [ ] Proper grid layout for classes/filing types/services
- [ ] Shows group header with title
- [ ] Shows optional description text
- [ ] Delegates item clicks to onItemToggle callback
- [ ] Responsive layout from 200px-3000px width
- [ ] Proper accessibility with fieldset and legend
- [ ] No console errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="OptionGroup" --testNamePattern="renders items and handles clicks"
```

---

### Subtask 029.3: OptionItem Individual Option Component

#### Status
status: pending

#### Objective
Create an OptionItem component that renders a single selectable option with checkbox or radio button, label, and optional description.

#### Context
OptionItem is a presentational component that displays a single option as either a checkbox or radio button. It handles visual selection state, label rendering, optional description text, and click events. This subtask owns the individual option styling, input control rendering, and option-specific layout logic.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/OptionItem.tsx` - Individual option item component
- `src/components/Calculator/OptionItem.module.css` - Styles for individual items

#### Implementation

```typescript
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
```

#### CSS Module

```css
/* src/components/Calculator/OptionItem.module.css */
.optionItem {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border: 2px solid var(--color-border-subtle);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  min-height: 60px;
}

.optionItem:hover:not(.optionItemDisabled) {
  border-color: var(--color-border-standard);
  background: var(--color-background-tertiary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.optionItem:focus-within {
  outline: none;
  border-color: var(--color-interactive-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.optionItemSelected {
  border-color: var(--color-interactive-primary);
  background: var(--color-interactive-primary-subtle);
}

.optionItemSelected:hover {
  background: var(--color-interactive-primary-light);
}

.optionItemDisabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: var(--color-background-secondary);
}

.optionItemDisabled:hover {
  border-color: var(--color-border-subtle);
  background: var(--color-background-secondary);
  box-shadow: none;
}

.optionItemInput {
  appearance: none;
  -webkit-appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  margin-top: 0.125rem;
  border: 2px solid var(--color-border-standard);
  border-radius: 0.375rem;
  background: var(--color-background-primary);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

/* Radio button style */
.type-filing-types .optionItemInput {
  border-radius: 50%;
}

.optionItemInput:checked {
  background: var(--color-interactive-primary);
  border-color: var(--color-interactive-primary);
}

.optionItemInput:disabled {
  cursor: not-allowed;
  background: var(--color-background-secondary);
  border-color: var(--color-border-subtle);
}

.optionItemContent {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.optionItemLabel {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.optionItemDescription {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.optionItemCheckmark {
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.optionItem:has(input:checked) .optionItemCheckmark {
  opacity: 1;
}

.optionItem:has(input:checked) .optionItemCheckmark::after {
  content: '✓';
  color: var(--color-interactive-primary);
  font-weight: 700;
  font-size: 1rem;
}

/* Type-specific styling */
.type-classes {
  min-height: 80px;
}

.type-filing-types {
  min-height: 70px;
}

.type-services {
  min-height: 90px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .optionItem {
    padding: 0.875rem;
    gap: 0.625rem;
    min-height: 50px;
  }

  .optionItemInput {
    width: 1.125rem;
    height: 1.125rem;
    min-width: 1.125rem;
  }

  .optionItemLabel {
    font-size: 0.875rem;
  }

  .optionItemDescription {
    font-size: 0.75rem;
  }

  .optionItemCheckmark {
    width: 1.125rem;
    height: 1.125rem;
    min-width: 1.125rem;
  }

  .type-classes {
    min-height: 70px;
  }

  .type-filing-types {
    min-height: 60px;
  }

  .type-services {
    min-height: 80px;
  }
}

@media (max-width: 480px) {
  .optionItem {
    padding: 0.75rem;
    gap: 0.5rem;
    min-height: 45px;
  }

  .optionItemInput {
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
  }

  .optionItemLabel {
    font-size: 0.8125rem;
  }

  .optionItemDescription {
    font-size: 0.6875rem;
  }

  .optionItemCheckmark {
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
  }

  .type-classes {
    min-height: 60px;
  }

  .type-filing-types {
    min-height: 50px;
  }

  .type-services {
    min-height: 70px;
  }
}
```

#### Props Interface
```typescript
interface OptionItemProps {
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
```

#### Acceptance Criteria
- [ ] Component renders checkbox or radio button based on isRadio prop
- [ ] Label displays correctly
- [ ] Optional description displays when provided
- [ ] isSelected state applies correct styling
- [ ] onClick handler fires when clicked
- [ ] Disabled state prevents interaction
- [ ] Visual feedback (checkmark) appears when selected
- [ ] Responsive sizing from 200px-3000px width
- [ ] Proper ARIA attributes for accessibility
- [ ] No console errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="OptionItem" --testNamePattern="renders and toggles selection"
```

---

### Subtask 029.4: Calculator Data Constants & Configuration

#### Status
status: pending

#### Objective
Create the complete data configuration file containing Nice Classification classes (1-45), filing types, and optional services data structures.

#### Context
This data file provides all the configuration data needed by the OptionSelector component. It defines the 45 Nice Classification classes with names and descriptions, filing type options (standard, expedited, priority), and optional services (monitoring, legal support, fast-track). This subtask owns the data schema design, all constant definitions, and type safety for the configuration.

#### Files to Create/Modify (Exclusive Ownership)
- `src/data/calculatorOptions.ts` - All calculator options configuration

#### Implementation

```typescript
// src/data/calculatorOptions.ts

/**
 * Nice Classification Class definition
 */
export interface NiceClass {
  number: number;
  name: string;
  description: string;
}

/**
 * Filing type option definition
 */
export interface FilingType {
  id: string;
  name: string;
  description: string;
  processingDays: number;
  priceMultiplier: number;
}

/**
 * Optional service definition
 */
export interface OptionalService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

/**
 * NICE Classification Classes (1-45)
 * Complete database of trademark classes with descriptions
 */
export const NICE_CLASSES: NiceClass[] = [
  {
    number: 1,
    name: 'Chemical Substances',
    description: 'Chemicals for use in industry, science, photography'
  },
  {
    number: 2,
    name: 'Paints and Coatings',
    description: 'Paints, varnishes, lacquers, colorants, dyes'
  },
  {
    number: 3,
    name: 'Cosmetics and Cleaning',
    description: 'Non-medicated cosmetics, toiletries, cleaning preparations'
  },
  {
    number: 4,
    name: 'Industrial Oils and Fats',
    description: 'Industrial oils, fats, lubricants, fuels, illuminants'
  },
  {
    number: 5,
    name: 'Pharmaceuticals',
    description: 'Pharmaceuticals, medical and veterinary preparations'
  },
  {
    number: 6,
    name: 'Metals',
    description: 'Unwrought and semi-wrought common metals and alloys'
  },
  {
    number: 7,
    name: 'Machinery',
    description: 'Machines, machine tools, motors, engines'
  },
  {
    number: 8,
    name: 'Hand Tools',
    description: 'Hand tools, instruments, cutlery, side arms, razors'
  },
  {
    number: 9,
    name: 'Electrical and Scientific',
    description: 'Electrical, electronic, optical apparatus and instruments'
  },
  {
    number: 10,
    name: 'Medical Instruments',
    description: 'Surgical, medical, dental, veterinary apparatus'
  },
  {
    number: 11,
    name: 'Lighting and Heating',
    description: 'Apparatus for lighting, heating, cooking, refrigerating'
  },
  {
    number: 12,
    name: 'Vehicles',
    description: 'Vehicles, apparatus for locomotion by land, air, water'
  },
  {
    number: 13,
    name: 'Firearms',
    description: 'Firearms, ammunition, projectiles, explosives'
  },
  {
    number: 14,
    name: 'Jewelry',
    description: 'Precious metals, jewelry, precious stones, horological instruments'
  },
  {
    number: 15,
    name: 'Musical Instruments',
    description: 'Musical instruments, parts and accessories'
  },
  {
    number: 16,
    name: 'Paper and Printing',
    description: 'Paper, cardboard, printed matter, photographs'
  },
  {
    number: 17,
    name: 'Plastics and Rubber',
    description: 'Unprocessed and semi-processed rubber, gum, mica'
  },
  {
    number: 18,
    name: 'Leather Goods',
    description: 'Leather, imitations of leather, animal skins, trunks'
  },
  {
    number: 19,
    name: 'Construction Materials',
    description: 'Building materials (non-metallic), rigid pipes, asphalt'
  },
  {
    number: 20,
    name: 'Furniture',
    description: 'Furniture, mirrors, picture frames'
  },
  {
    number: 21,
    name: 'Kitchenware',
    description: 'Household or kitchen utensils and containers, combs'
  },
  {
    number: 22,
    name: 'Ropes and Fabrics',
    description: 'Ropes, string, nets, tents, sails, bags'
  },
  {
    number: 23,
    name: 'Yarns and Threads',
    description: 'Yarns and threads for textile use'
  },
  {
    number: 24,
    name: 'Textiles',
    description: 'Textiles and textile goods, curtains, carpets'
  },
  {
    number: 25,
    name: 'Clothing',
    description: 'Clothing, footwear, headwear'
  },
  {
    number: 26,
    name: 'Clothing Accessories',
    description: 'Lace, ribbons, braids, embroidery, buttons, zippers'
  },
  {
    number: 27,
    name: 'Carpets and Rugs',
    description: 'Carpets, rugs, mats, wall hangings'
  },
  {
    number: 28,
    name: 'Sporting Goods',
    description: 'Games, toys, sports and outdoor equipment'
  },
  {
    number: 29,
    name: 'Meats and Processed Foods',
    description: 'Meat, fish, poultry, game, processed and preserved foods'
  },
  {
    number: 30,
    name: 'Staple Foods',
    description: 'Coffee, tea, cocoa, sugar, rice, flour, bread, pastries'
  },
  {
    number: 31,
    name: 'Raw Agricultural Products',
    description: 'Grains, seeds, fresh fruits and vegetables, plants'
  },
  {
    number: 32,
    name: 'Beverages',
    description: 'Beers, non-alcoholic beverages, mineral and aerated waters'
  },
  {
    number: 33,
    name: 'Alcoholic Beverages',
    description: 'Alcoholic beverages, wines, spirits, liqueurs'
  },
  {
    number: 34,
    name: 'Tobacco and Smokers Articles',
    description: 'Tobacco and tobacco substitutes, smokers articles'
  },
  {
    number: 35,
    name: 'Advertising and Business Services',
    description: 'Advertising, business management, office functions'
  },
  {
    number: 36,
    name: 'Financial Services',
    description: 'Insurance, financial affairs, monetary affairs'
  },
  {
    number: 37,
    name: 'Construction and Repair Services',
    description: 'Building construction, repair, installation services'
  },
  {
    number: 38,
    name: 'Telecommunications',
    description: 'Telecommunications services'
  },
  {
    number: 39,
    name: 'Transportation and Storage',
    description: 'Transportation, packaging, storage, travel arrangement'
  },
  {
    number: 40,
    name: 'Processing and Transformation',
    description: 'Treatment of materials, custom manufacturing'
  },
  {
    number: 41,
    name: 'Education and Entertainment',
    description: 'Education, entertainment, sporting and cultural activities'
  },
  {
    number: 42,
    name: 'Software and IT Services',
    description: 'Scientific and technological services, software development'
  },
  {
    number: 43,
    name: 'Food and Beverage Services',
    description: 'Provision of food and beverages, accommodation services'
  },
  {
    number: 44,
    name: 'Medical and Veterinary Services',
    description: 'Medical, veterinary, hygienic, beauty care services'
  },
  {
    number: 45,
    name: 'Legal and Social Services',
    description: 'Legal services, security services, social services'
  }
];

/**
 * Filing type options
 * Different registration processing speeds
 */
export const FILING_TYPES: FilingType[] = [
  {
    id: 'standard',
    name: 'Standard Registration',
    description: 'Normal processing time (8-12 weeks)',
    processingDays: 56,
    priceMultiplier: 1.0
  },
  {
    id: 'expedited',
    name: 'Expedited Registration',
    description: 'Faster processing (4-6 weeks)',
    processingDays: 35,
    priceMultiplier: 1.5
  },
  {
    id: 'priority',
    name: 'Priority Registration',
    description: 'Fastest processing (2-3 weeks)',
    processingDays: 18,
    priceMultiplier: 2.0
  }
];

/**
 * Optional services
 * Additional services to enhance registration
 */
export const OPTIONAL_SERVICES: OptionalService[] = [
  {
    id: 'monitoring',
    name: 'Trademark Monitoring',
    description: 'Monitor for similar trademark applications',
    basePrice: 150
  },
  {
    id: 'legal-support',
    name: 'Legal Support Package',
    description: 'Professional legal advice and documentation',
    basePrice: 300
  },
  {
    id: 'fast-track',
    name: 'Fast-Track Processing',
    description: 'Priority queue for expedited review',
    basePrice: 200
  }
];

/**
 * Helper function to get nice class by number
 */
export function getNiceClassByNumber(number: number): NiceClass | undefined {
  return NICE_CLASSES.find(c => c.number === number);
}

/**
 * Helper function to get filing type by id
 */
export function getFilingTypeById(id: string): FilingType | undefined {
  return FILING_TYPES.find(f => f.id === id);
}

/**
 * Helper function to get service by id
 */
export function getServiceById(id: string): OptionalService | undefined {
  return OPTIONAL_SERVICES.find(s => s.id === id);
}

/**
 * Validate nice class number (1-45)
 */
export function isValidNiceClassNumber(number: any): number is number {
  return typeof number === 'number' && number >= 1 && number <= 45;
}

/**
 * Validate filing type id
 */
export function isValidFilingTypeId(id: any): id is string {
  return FILING_TYPES.some(f => f.id === id);
}

/**
 * Validate service id
 */
export function isValidServiceId(id: any): id is string {
  return OPTIONAL_SERVICES.some(s => s.id === id);
}
```

#### Acceptance Criteria
- [ ] All 45 Nice Classification classes defined with names and descriptions
- [ ] Filing types include standard, expedited, and priority
- [ ] Optional services defined (monitoring, legal support, fast-track)
- [ ] TypeScript interfaces properly defined for all data structures
- [ ] Helper functions for lookups (getNiceClassByNumber, getFilingTypeById, etc.)
- [ ] Validation functions for data validation
- [ ] All exports are properly typed
- [ ] No console errors on import
- [ ] Data is immutable (const arrays)

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify data constants export correctly
```

---

### Subtask 029.5: Component Index Export & Documentation

#### Status
status: pending

#### Objective
Create the index.ts barrel file for the Calculator component module and add comprehensive component documentation.

#### Context
The index file provides a clean public API for importing OptionSelector and related components from the Calculator module. It aggregates all component exports in one location, making imports cleaner (e.g., `import { OptionSelector } from '@/components/Calculator'`). This subtask owns the module's public API and ensures consistency across component exports.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Calculator/index.ts` - Calculator module barrel export file
- `src/components/Calculator/README.md` - Component documentation

#### Implementation

```typescript
// src/components/Calculator/index.ts
/**
 * Calculator Components Module
 *
 * This module exports all calculator-related components for brand registration pricing.
 * Components use Jotai atoms (NO useState) for state management via useCalculator hook.
 *
 * All components are responsive from 200px to 3000px viewport width.
 */

export { OptionSelector, type OptionSelectorProps } from './OptionSelector';
export { OptionGroup, type OptionGroupProps } from './OptionGroup';
export { OptionItem, type OptionItemProps } from './OptionItem';

/**
 * Component hierarchy:
 *
 * OptionSelector (main container)
 *   ├── OptionGroup (classes section)
 *   │   └── OptionItem[] (individual class checkboxes)
 *   ├── OptionGroup (filing types section)
 *   │   └── OptionItem[] (radio buttons)
 *   └── OptionGroup (services section)
 *       └── OptionItem[] (individual service checkboxes)
 *
 * State management:
 * - All components use Jotai atoms via useCalculator hook
 * - No local React state (useState forbidden)
 * - Atomic updates for selections
 *
 * Styling:
 * - CSS modules for component-scoped styles
 * - Responsive grid layouts
 * - Dark/light theme support via CSS variables
 * - Mobile-first design approach
 */

/**
 * Data and configuration:
 * - NICE_CLASSES (1-45 trademark classes)
 * - FILING_TYPES (standard, expedited, priority)
 * - OPTIONAL_SERVICES (monitoring, legal support, fast-track)
 *
 * Import from '@/data/calculatorOptions'
 */

/**
 * Usage example:
 *
 * import { OptionSelector } from '@/components/Calculator';
 * import { useCalculator } from '@/hooks/useCalculator';
 *
 * function MyComponent() {
 *   const { selectedClasses, filingType, selectedServices } = useCalculator();
 *
 *   return (
 *     <OptionSelector
 *       onSelectionChange={(state) => {
 *         console.log('Selections changed:', state);
 *       }}
 *     />
 *   );
 * }
 */
```

#### README Documentation

```markdown
# Calculator Components Module

## Overview

The Calculator module provides a complete option selection system for the brand registration calculator. Users can select:
- **Trademark Classes**: Nice Classification 1-45 (multi-select checkboxes)
- **Filing Types**: Standard, Expedited, Priority (single-select radio buttons)
- **Optional Services**: Monitoring, Legal Support, Fast-Track (multi-select checkboxes)

## Components

### OptionSelector
Main container component that manages the entire option selection workflow.

**Props:**
```typescript
interface OptionSelectorProps {
  className?: string;
  onSelectionChange?: (state: any) => void;
}
```

**Features:**
- Displays three OptionGroup sections
- Uses Jotai atoms via useCalculator hook (NO useState)
- Summary section showing current selections
- Responsive from 200px-3000px viewport width

**Example:**
```tsx
import { OptionSelector } from '@/components/Calculator';

export function MyCalculator() {
  return (
    <OptionSelector
      onSelectionChange={(state) => {
        console.log('Classes:', state.classes);
        console.log('Filing type:', state.filingType);
        console.log('Services:', state.services);
      }}
    />
  );
}
```

### OptionGroup
Reusable component for displaying a group of related options.

**Props:**
```typescript
interface OptionGroupProps {
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
```

**Features:**
- Flexible grid layout that adapts to option type
- Radio button or checkbox modes
- Header with optional description
- Responsive from 200px-3000px width

### OptionItem
Individual selectable option (checkbox or radio button).

**Props:**
```typescript
interface OptionItemProps {
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
```

**Features:**
- Checkbox or radio button input
- Visual selection feedback
- Optional description text
- Keyboard accessible
- Responsive sizing

## State Management

All components use Jotai atoms for state management. The `useCalculator` hook provides access to:

```typescript
const {
  selectedClasses,        // number[] - Selected NICE class numbers (1-45)
  setSelectedClasses,     // (classes: number[]) => void
  filingType,             // string | null - Selected filing type ID
  setFilingType,          // (type: string) => void
  selectedServices,       // string[] - Selected service IDs
  setSelectedServices     // (services: string[]) => void
} = useCalculator();
```

**Important:** NO useState is allowed. All state must use Jotai atoms.

## Data Configuration

Configuration data is imported from `@/data/calculatorOptions`:

```typescript
import {
  NICE_CLASSES,      // NiceClass[] - All 45 trademark classes
  FILING_TYPES,      // FilingType[] - Filing options
  OPTIONAL_SERVICES  // OptionalService[] - Additional services
} from '@/data/calculatorOptions';
```

## Responsive Design

All components are fully responsive:
- **Desktop (1024px+)**: 3-4 columns for most grids
- **Tablet (768-1023px)**: 2-3 columns
- **Mobile (480-767px)**: Single column for most layouts
- **Small mobile (<480px)**: Stack all items vertically

## Styling

Components use CSS modules with the following structure:
- `OptionSelector.module.css` - Main container styles
- `OptionGroup.module.css` - Group container styles
- `OptionItem.module.css` - Individual item styles

CSS variables for theming (light/dark mode):
```css
--color-background-primary
--color-background-secondary
--color-background-tertiary
--color-text-primary
--color-text-secondary
--color-interactive-primary
--color-border-standard
--color-border-subtle
```

## Accessibility

All components follow WCAG 2.1 AA standards:
- Proper semantic HTML (fieldset, legend, labels)
- ARIA attributes (role, aria-selected, aria-label)
- Keyboard navigation support
- Focus indicators
- Sufficient color contrast

## Testing

Components are tested with Vitest:
```bash
npm test -- --testPathPattern="Calculator"
```

Test coverage includes:
- Component rendering
- State management
- User interactions
- Responsive layouts
- Accessibility attributes

## Performance

- Lightweight CSS modules (no runtime styling)
- Memoization where appropriate
- No unnecessary re-renders
- Efficient Jotai atom updates
```

#### Acceptance Criteria
- [ ] OptionSelector exported with proper types
- [ ] OptionGroup exported with proper types
- [ ] OptionItem exported with proper types
- [ ] Module documentation is comprehensive and accurate
- [ ] Usage examples are clear and runnable
- [ ] Component hierarchy is documented
- [ ] State management documentation is clear
- [ ] Responsive design approach documented
- [ ] Accessibility features documented
- [ ] No TypeScript errors in index file

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify all exports are accessible
node -e "const m = require('./src/components/Calculator/index.ts'); console.log(Object.keys(m))"
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/Calculator/OptionSelector.tsx`
- `src/components/Calculator/OptionSelector.module.css`
- `src/components/Calculator/OptionGroup.tsx`
- `src/components/Calculator/OptionGroup.module.css`
- `src/components/Calculator/OptionItem.tsx`
- `src/components/Calculator/OptionItem.module.css`
- `src/data/calculatorOptions.ts`
- `src/components/Calculator/index.ts`
- `src/components/Calculator/README.md`

### Imports From Existing Code
- `@/hooks/useCalculator` - Jotai hook for calculator state (from task 5)
- `jotai` - atom state management library (from dependencies in task 1)
- `react` - React library (from dependencies in task 1)
- CSS variable theme system (from task 2-4)

### Exports For Other Code
- `OptionSelector` - main component for option selection
- `OptionGroup` - reusable group component
- `OptionItem` - individual option component
- `NICE_CLASSES`, `FILING_TYPES`, `OPTIONAL_SERVICES` - configuration data
- All component types for TypeScript consumers

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="Calculator"
npm run lint -- src/components/Calculator src/data/calculatorOptions.ts
```

---

## Parallelization Notes
- All 5 subtasks in this task can run in complete parallel
- Subtask 1 (OptionSelector) uses components from 2-3 but can be written in parallel
- Subtask 2 (OptionGroup) uses OptionItem from 3 but can be written in parallel
- Subtask 3 (OptionItem) has no dependencies on other subtasks
- Subtask 4 (Data constants) is independent of all other subtasks
- Subtask 5 (Index/docs) aggregates 1-4 but depends on nothing specific
- All subtasks own exclusive files with no shared file editing
- No subtask produces output required by another subtask
- Can be implemented in any order; final structure is: 1 + 2 + 3 + 4 → 5 (index aggregation)
- All subtasks use only npm dependencies and existing hooks, no inter-task dependencies
