# Frontend Task 018: Theme Toggle Component

## Metadata
- **Task**: 18 of 40
- **Area**: Frontend
- **Feature**: UI Controls - Theme Toggle
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a fully accessible Theme Toggle button component that allows users to switch between dark and light themes. Uses the Jotai-based useTheme hook (NO useState) with sun/moon SVG icons from lucide-react, supports responsive sizing from 200px to 3000px viewport widths, and includes comprehensive keyboard accessibility with aria labels and focus states.

---

## Subtasks

### Subtask 018.1: ThemeToggle Component

#### Status
status: pending

#### Objective
Create the ThemeToggle button component with icon switching, Jotai state integration, and complete keyboard accessibility.

#### Context
This component is the primary user interaction point for theme switching. It must use the useTheme hook from Jotai (NOT useState) to toggle between light and dark themes. Must display sun icon for light theme and moon icon for dark theme, with smooth transitions. Critical for UX - users need an obvious way to switch themes.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/ui/ThemeToggle/ThemeToggle.tsx` - Main component file
- `src/components/ui/ThemeToggle/index.ts` - Export file

#### Implementation

```typescript
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks';
import styles from './ThemeToggle.module.css';

export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'ghost';
  tooltipPosition?: 'top' | 'bottom';
  ariaLabel?: string;
}

export const ThemeToggle = ({
  className = '',
  size = 'md',
  variant = 'default',
  tooltipPosition = 'top',
  ariaLabel,
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  };

  const variantClasses = {
    default: styles.variantDefault,
    outlined: styles.variantOutlined,
    ghost: styles.variantGhost,
  };

  const isDark = theme === 'dark';
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  const defaultLabel = isDark
    ? 'Switch to light theme'
    : 'Switch to dark theme';

  const buttonLabel = ariaLabel || defaultLabel;

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${styles.button}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={buttonLabel}
      aria-pressed={isDark}
      type="button"
      title={buttonLabel}
    >
      <span className={styles.iconContainer}>
        {isDark ? (
          <Moon
            size={iconSize}
            className={styles.moonIcon}
            aria-hidden="true"
          />
        ) : (
          <Sun
            size={iconSize}
            className={styles.sunIcon}
            aria-hidden="true"
          />
        )}
      </span>

      {/* Animated background for visual feedback */}
      <span className={styles.background} aria-hidden="true" />
    </button>
  );
};
```

#### Props Interface
```typescript
interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'ghost';
  tooltipPosition?: 'top' | 'bottom';
  ariaLabel?: string;
}
```

#### Acceptance Criteria
- [ ] Component renders without errors
- [ ] Uses useTheme hook from Jotai (NOT useState)
- [ ] Displays sun icon when theme is 'light'
- [ ] Displays moon icon when theme is 'dark'
- [ ] onClick handler calls toggleTheme from useTheme
- [ ] aria-label properly describes theme switch action
- [ ] aria-pressed attribute set correctly based on isDark state
- [ ] Icons have aria-hidden="true" to prevent redundant announcements
- [ ] Component accepts size prop: 'sm', 'md', 'lg'
- [ ] Component accepts variant prop: 'default', 'outlined', 'ghost'
- [ ] No console errors or warnings
- [ ] Type-safe with full TypeScript support

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/components/ui/ThemeToggle/ThemeToggle.tsx
```

---

### Subtask 018.2: ThemeToggle Styles Module

#### Status
status: pending

#### Objective
Create responsive CSS module with styles for button, icons, and variants supporting 200px-3000px viewport widths.

#### Context
Styling must support extreme responsive ranges (200px to 3000px) with smooth transitions. Button must be clearly clickable on all screen sizes with appropriate padding and sizing. Icons should transition smoothly between themes. Focus states critical for keyboard users.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/ui/ThemeToggle/ThemeToggle.module.css` - Component styles

#### Implementation

```css
/* Base Button Styles */
.button {
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  flex-shrink: 0;
  z-index: 1;
}

/* Remove default button styles */
.button::-moz-focus-inner {
  border: none;
  padding: 0;
}

/* Focus states for keyboard accessibility */
.button:focus-visible {
  outline: 2px solid;
  outline-offset: 2px;
}

/* Icon Container */
.iconContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover .iconContainer {
  transform: scale(1.1);
}

.button:active .iconContainer {
  transform: scale(0.95);
}

/* Icon Animations */
.sunIcon,
.moonIcon {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sunIcon {
  animation: rotateSun 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.moonIcon {
  animation: rotateMoon 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animated background element */
.background {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.button:hover .background {
  opacity: 1;
}

/* Size Variants */
.sizeSm {
  width: clamp(28px, 5vw, 40px);
  height: clamp(28px, 5vw, 40px);
  padding: clamp(4px, 0.8vw, 6px);
  border-radius: clamp(4px, 0.8vw, 8px);
  font-size: clamp(0.75rem, 1vw, 1rem);
}

.sizeMd {
  width: clamp(36px, 6vw, 48px);
  height: clamp(36px, 6vw, 48px);
  padding: clamp(6px, 1vw, 8px);
  border-radius: clamp(6px, 1vw, 10px);
  font-size: clamp(0.875rem, 1.2vw, 1.125rem);
}

.sizeLg {
  width: clamp(44px, 7vw, 56px);
  height: clamp(44px, 7vw, 56px);
  padding: clamp(8px, 1.2vw, 10px);
  border-radius: clamp(8px, 1.2vw, 12px);
  font-size: clamp(1rem, 1.4vw, 1.25rem);
}

/* Variant: Default */
.variantDefault {
  background-color: var(--button-bg-default, #f0f0f0);
  color: var(--button-text-default, #1a1a1a);
}

.variantDefault:hover {
  background-color: var(--button-bg-default-hover, #e0e0e0);
}

.variantDefault:focus-visible {
  outline-color: var(--focus-color, #0066cc);
}

.variantDefault .background {
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.1), rgba(0, 102, 204, 0.05));
}

/* Dark theme for variant default */
:global(.dark) .variantDefault {
  background-color: var(--button-bg-default-dark, #2d2d2d);
  color: var(--button-text-default-dark, #f0f0f0);
}

:global(.dark) .variantDefault:hover {
  background-color: var(--button-bg-default-dark-hover, #3d3d3d);
}

/* Variant: Outlined */
.variantOutlined {
  border: 1px solid var(--button-border-outlined, #d0d0d0);
  color: var(--button-text-outlined, #1a1a1a);
  background-color: transparent;
}

.variantOutlined:hover {
  background-color: var(--button-bg-outlined-hover, rgba(0, 0, 0, 0.04));
  border-color: var(--button-border-outlined-hover, #a0a0a0);
}

.variantOutlined:focus-visible {
  outline-color: var(--focus-color, #0066cc);
}

/* Dark theme for variant outlined */
:global(.dark) .variantOutlined {
  border-color: var(--button-border-outlined-dark, #4d4d4d);
  color: var(--button-text-outlined-dark, #f0f0f0);
}

:global(.dark) .variantOutlined:hover {
  background-color: var(--button-bg-outlined-dark-hover, rgba(255, 255, 255, 0.08));
  border-color: var(--button-border-outlined-dark-hover, #6d6d6d);
}

/* Variant: Ghost */
.variantGhost {
  color: var(--button-text-ghost, #1a1a1a);
  background-color: transparent;
}

.variantGhost:hover {
  background-color: var(--button-bg-ghost-hover, rgba(0, 0, 0, 0.08));
}

.variantGhost:focus-visible {
  outline-color: var(--focus-color, #0066cc);
}

/* Dark theme for variant ghost */
:global(.dark) .variantGhost {
  color: var(--button-text-ghost-dark, #f0f0f0);
}

:global(.dark) .variantGhost:hover {
  background-color: var(--button-bg-ghost-dark-hover, rgba(255, 255, 255, 0.12));
}

/* Animation: Sun rotation */
@keyframes rotateSun {
  from {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(0deg);
  }
}

/* Animation: Moon rotation */
@keyframes rotateMoon {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
}

/* Responsive adjustments for extreme small viewports */
@media (max-width: 320px) {
  .sizeSm {
    width: 28px;
    height: 28px;
    padding: 4px;
    border-radius: 4px;
  }

  .sizeMd {
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 6px;
  }

  .sizeLg {
    width: 44px;
    height: 44px;
    padding: 8px;
    border-radius: 8px;
  }
}

/* Responsive adjustments for extreme large viewports */
@media (min-width: 2560px) {
  .sizeSm {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 8px;
  }

  .sizeMd {
    width: 48px;
    height: 48px;
    padding: 8px;
    border-radius: 10px;
  }

  .sizeLg {
    width: 56px;
    height: 56px;
    padding: 10px;
    border-radius: 12px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  .button:focus-visible {
    outline-width: 3px;
  }

  .variantDefault {
    border: 1px solid transparent;
  }

  .variantDefault:focus-visible {
    border-color: var(--focus-color, #0066cc);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .button,
  .iconContainer,
  .sunIcon,
  .moonIcon,
  .background {
    transition: none;
    animation: none;
  }
}

/* Print styles */
@media print {
  .button {
    display: none;
  }
}
```

#### Acceptance Criteria
- [ ] Button styles responsive from 200px to 3000px
- [ ] Uses clamp() for fluid sizing
- [ ] Three size variants work correctly (sm, md, lg)
- [ ] Three visual variants look distinct (default, outlined, ghost)
- [ ] Dark theme support with :global(.dark) selector
- [ ] Icon animations smooth and appropriate
- [ ] Focus-visible states clearly visible for keyboard users
- [ ] Hover and active states provide visual feedback
- [ ] Supports prefers-reduced-motion for accessibility
- [ ] Supports high-contrast mode
- [ ] No layout shift on theme toggle
- [ ] Print styles prevent button from printing

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify CSS syntax
npx postcss src/components/ui/ThemeToggle/ThemeToggle.module.css --syntax postcss
```

---

### Subtask 018.3: ThemeToggle Tests and Index Export

#### Status
status: pending

#### Objective
Create comprehensive unit tests and index export file for ThemeToggle component.

#### Context
Tests must verify all props work correctly, theme switching works via Jotai hook, keyboard accessibility is functional, and component renders properly in both themes. Index file provides clean exports for consumers.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/ui/ThemeToggle/ThemeToggle.test.tsx` - Unit tests
- `src/components/ui/ThemeToggle/index.ts` - Export file

#### Implementation

**ThemeToggle.test.tsx**:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks';

// Mock the useTheme hook
vi.mock('@/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle Component', () => {
  const mockToggleTheme = vi.fn();
  const mockUseTheme = useTheme as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      preference: 'light',
      isSystemTheme: false,
      setTheme: vi.fn(),
      toggleTheme: mockToggleTheme,
      cycleTheme: vi.fn(),
      isDark: false,
      isLight: true,
    });
  });

  describe('Rendering', () => {
    it('should render button element', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with default size (md)', () => {
      const { container } = render(<ThemeToggle />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('sizeMd');
    });

    it('should render with custom size', () => {
      const { container } = render(<ThemeToggle size="lg" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('sizeLg');
    });

    it('should render with custom variant', () => {
      const { container } = render(<ThemeToggle variant="outlined" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('variantOutlined');
    });

    it('should accept custom className', () => {
      const { container } = render(<ThemeToggle className="custom-class" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
    });
  });

  describe('Theme Icon Display', () => {
    it('should display sun icon when theme is light', () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        preference: 'light',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: false,
        isLight: true,
      });

      render(<ThemeToggle />);
      const sunIcon = document.querySelector('svg.sunIcon');
      expect(sunIcon).toBeInTheDocument();
    });

    it('should display moon icon when theme is dark', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        preference: 'dark',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: true,
        isLight: false,
      });

      render(<ThemeToggle />);
      const moonIcon = document.querySelector('svg.moonIcon');
      expect(moonIcon).toBeInTheDocument();
    });

    it('icons should have aria-hidden attribute', () => {
      render(<ThemeToggle />);
      const svgs = screen.getAllByRole('img', { hidden: true });
      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for light theme', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
    });

    it('should have proper aria-label for dark theme', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        preference: 'dark',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: true,
        isLight: false,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
    });

    it('should accept custom aria-label', () => {
      const customLabel = 'Custom theme toggle label';
      render(<ThemeToggle ariaLabel={customLabel} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', customLabel);
    });

    it('should set aria-pressed based on theme', () => {
      const { rerender } = render(<ThemeToggle />);
      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'false');

      mockUseTheme.mockReturnValue({
        theme: 'dark',
        preference: 'dark',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: true,
        isLight: false,
      });

      rerender(<ThemeToggle />);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should have title attribute for tooltip', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title');
    });
  });

  describe('Interaction', () => {
    it('should call toggleTheme on click', async () => {
      const user = userEvent.setup();
      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('should call toggleTheme on keyboard activation', async () => {
      const user = userEvent.setup();
      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('should call toggleTheme on Space key', async () => {
      const user = userEvent.setup();
      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props Variants', () => {
    it('should support all size variants', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      sizes.forEach((size) => {
        const { container, unmount } = render(<ThemeToggle size={size} />);
        const button = container.querySelector('button');
        expect(button?.className).toContain(`size${size.charAt(0).toUpperCase()}${size.charAt(1)}`);
        unmount();
      });
    });

    it('should support all variant styles', () => {
      const variants: Array<'default' | 'outlined' | 'ghost'> = ['default', 'outlined', 'ghost'];
      variants.forEach((variant) => {
        const { container, unmount } = render(<ThemeToggle variant={variant} />);
        const button = container.querySelector('button');
        expect(button?.className).toContain(`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`);
        unmount();
      });
    });
  });

  describe('Type Safety', () => {
    it('should render without TypeScript errors', () => {
      render(<ThemeToggle size="md" variant="default" className="test" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
```

**index.ts**:
```typescript
export { ThemeToggle } from './ThemeToggle';
export type { ThemeToggleProps } from './ThemeToggle';
```

#### Acceptance Criteria
- [ ] Tests pass with 100% success rate
- [ ] All component props tested
- [ ] Theme switching tested via mock hook
- [ ] Keyboard accessibility tested (Enter, Space)
- [ ] aria-label and aria-pressed tested
- [ ] All size variants tested
- [ ] All visual variants tested
- [ ] Icon display tested for both themes
- [ ] Custom className support tested
- [ ] Index export file exports component and types
- [ ] No console errors during test execution
- [ ] Tests follow Vitest patterns and best practices

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm test -- ThemeToggle.test.tsx
npm run type-check -- src/components/ui/ThemeToggle/
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/ui/ThemeToggle/ThemeToggle.tsx`
- `src/components/ui/ThemeToggle/ThemeToggle.module.css`
- `src/components/ui/ThemeToggle/ThemeToggle.test.tsx`
- `src/components/ui/ThemeToggle/index.ts`

### Imports From Existing Code
- `lucide-react` - Sun and Moon icons (available from task 001 dependencies)
- `@/hooks` - useTheme hook (created in task 002)
- TypeScript and React types (available from task 001)

### Exports For Other Code
- `ThemeToggle` component - Available for import as `@/components/ui/ThemeToggle`
- `ThemeToggleProps` type - For proper typing in consuming components

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Type check all files
npm run type-check -- src/components/ui/ThemeToggle/

# Run tests
npm test -- ThemeToggle.test.tsx

# Run lint (when configured)
npm run lint -- src/components/ui/ThemeToggle/ || true

# Verify all files exist
test -f src/components/ui/ThemeToggle/ThemeToggle.tsx && echo "ThemeToggle.tsx OK"
test -f src/components/ui/ThemeToggle/ThemeToggle.module.css && echo "ThemeToggle.module.css OK"
test -f src/components/ui/ThemeToggle/ThemeToggle.test.tsx && echo "ThemeToggle.test.tsx OK"
test -f src/components/ui/ThemeToggle/index.ts && echo "index.ts OK"

# Type safety check
npm run type-check
```

---

## Parallelization Notes
- All 3 subtasks in this task can run completely in parallel
- Subtask 018.1 (Component) is independent of styling and tests
- Subtask 018.2 (Styles) is independent of component logic
- Subtask 018.3 (Tests/Export) depends only on component interface, not implementation
- Each subtask owns exclusive files with no overlap
- No subtask depends on another subtask's output
- All subtasks can be implemented simultaneously without any ordering requirements
- Component can be implemented, styled, tested, and exported in any order
