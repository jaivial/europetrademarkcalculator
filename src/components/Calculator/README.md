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
