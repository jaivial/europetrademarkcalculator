# Calculator Component

Main container component that assembles OptionSelector, PriceBreakdown, and Summary components with conditional rendering based on country selection.

## Features

- **Conditional Rendering**: Only displays calculator interface when a country is selected
- **Responsive Layout**: Mobile stacked, tablet flexible, desktop sidebar layout
- **Jotai Integration**: Uses atoms for state management (NO useState)
- **Accessibility**: Full ARIA labels and keyboard navigation support
- **Empty State**: User-friendly message when no country selected

## Props

```typescript
interface CalculatorProps {
  className?: string;
  onCalculate?: (result: CalculationResult) => void;
}

interface CalculationResult {
  basePrice: number;
  servicesPrice: number;
  totalPrice: number;
  country: string;
  numberOfClasses: number;
}
```

## Usage

```tsx
import { Calculator } from '@/components/Calculator';

function App() {
  const handleCalculate = (result) => {
    console.log('Calculation complete:', result);
  };

  return (
    <Calculator
      className="custom-calculator"
      onCalculate={handleCalculate}
    />
  );
}
```

## Layout

### Mobile (200px - 639px)
- Single column stacked layout
- Full-width sections
- Optimized for touch interaction
- Compact spacing

### Tablet (640px - 1023px)
- Single column stacked layout with more spacing
- Full-width sections
- Improved typography sizing
- Better vertical spacing

### Desktop (1024px+)
- Grid layout with sidebar
- OptionSelector on left (sticky)
- PriceBreakdown and Summary on right
- Optimized for keyboard navigation

## Conditional Rendering

- **Shows Empty State** when `countryAtom` has no selected country
- **Shows Calculator** when country is selected via `countryAtom`
- Empty state includes icon and instructional message

## Responsiveness

Supports all screen sizes from 200px to 3000px width with appropriate layout and typography adjustments at each breakpoint.

## Accessibility

- Full ARIA labels and roles
- Proper heading hierarchy
- Focus indicators for keyboard navigation
- High contrast mode support
- Reduced motion support

## State Management

Uses Jotai `countryAtom` for country selection state. No internal component state (useState) is used. All state is managed through atoms for global consistency.
