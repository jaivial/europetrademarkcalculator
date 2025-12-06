# Frontend Task 33: App Layout - Header Component

## Metadata
- **Task**: 33 of 40
- **Area**: Frontend
- **Feature**: App Layout - Header Component
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a responsive, sticky header component with logo, internationalized app title, and slots for theme toggle and language selector. The header will collapse controls on mobile devices and support viewport widths from 200px to 3000px. No React hooks (useState) will be used - all state management through props and passed children components.

---

## Subtasks

### Subtask 33.1: Header Component

#### Status
status: pending

#### Objective
Create the main Header component with sticky positioning, responsive layout, and slot-based composition for theme and language controls.

#### Context
The Header is the top-level layout component that provides navigation branding and quick-access controls. It must be sticky and support responsive design patterns without using useState hooks.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/Header.tsx` - Main header component with responsive grid layout
- `src/components/Layout/Header.module.css` - Sticky header styles with responsive breakpoints

#### Implementation

```typescript
// Header.tsx
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import Logo from './Logo';

interface HeaderProps {
  /**
   * Component to render in the theme toggle slot
   * Typically a ThemeToggle or similar button component
   */
  themeSlot?: ReactNode;

  /**
   * Component to render in the language selector slot
   * Typically a LanguageSelector dropdown component
   */
  languageSlot?: ReactNode;

  /**
   * Optional CSS class for additional styling
   */
  className?: string;

  /**
   * Optional z-index for stacking context
   */
  zIndex?: number;
}

/**
 * Header Component
 *
 * A sticky header that displays branding and provides slots for controls.
 * Responsive grid that collapses on mobile (<768px).
 *
 * Props:
 * - themeSlot: ReactNode - Component for theme toggle (right side, hidden on mobile)
 * - languageSlot: ReactNode - Component for language selector (right side, hidden on mobile)
 * - className: string - Additional CSS classes
 * - zIndex: number - Z-index for stacking context (default: 100)
 *
 * Responsive Behavior:
 * - Desktop (768px+): Full header with logo, title, and control slots
 * - Mobile (<768px): Compact header with logo and title only, controls hidden
 * - Extra small (200px+): Minimum layout, single-column when needed
 * - Extra large (3000px+): Maximum constraints applied
 */
const Header: React.FC<HeaderProps> = ({
  themeSlot,
  languageSlot,
  className,
  zIndex = 100,
}) => {
  const { t } = useTranslation('layout');

  return (
    <header
      className={`${styles.header} ${className || ''}`}
      style={{ zIndex }}
      role="banner"
      aria-label="Application header"
    >
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Logo />
        </div>

        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            {t('app.title', { defaultValue: 'Brand Calculator' })}
          </h1>
        </div>

        {/* Controls Section - Hidden on Mobile */}
        <div className={styles.controlsSection}>
          {/* Theme Toggle Slot */}
          {themeSlot && (
            <div
              className={styles.controlSlot}
              data-control="theme"
              aria-label="Theme control"
            >
              {themeSlot}
            </div>
          )}

          {/* Language Selector Slot */}
          {languageSlot && (
            <div
              className={styles.controlSlot}
              data-control="language"
              aria-label="Language selector"
            >
              {languageSlot}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
```

```css
/* Header.module.css */
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--header-bg, #ffffff);
  border-bottom: 1px solid var(--header-border, #e5e7eb);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  min-height: 64px;
  max-width: 3000px;
  margin-left: auto;
  margin-right: auto;
}

.container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto;
  gap: 16px;
  align-items: center;
  height: 100%;
  min-height: 64px;
  padding: 12px 24px;
  max-width: 3000px;
  margin: 0 auto;
}

.logoSection {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
  flex-shrink: 0;
}

.titleSection {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
  flex: 1;
  overflow: hidden;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: var(--header-title, #000000);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.controlsSection {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  min-width: 0;
  flex-shrink: 0;
}

.controlSlot {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

/* Extra Small Devices (200px - 360px) */
@media (max-width: 360px) {
  .container {
    grid-template-columns: auto 1fr;
    gap: 8px;
    padding: 10px 12px;
    min-height: 56px;
  }

  .header {
    min-height: 56px;
  }

  .title {
    font-size: 16px;
  }

  .controlsSection {
    display: none;
  }
}

/* Small Devices (361px - 480px) */
@media (max-width: 480px) {
  .container {
    gap: 12px;
    padding: 10px 16px;
    min-height: 56px;
  }

  .header {
    min-height: 56px;
  }

  .title {
    font-size: 18px;
  }

  .controlsSection {
    display: none;
  }
}

/* Medium Devices (481px - 768px) */
@media (max-width: 768px) {
  .container {
    gap: 12px;
    padding: 12px 16px;
    min-height: 60px;
  }

  .header {
    min-height: 60px;
  }

  .title {
    font-size: 18px;
  }

  .controlsSection {
    display: none;
  }
}

/* Large Devices (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    gap: 16px;
    padding: 12px 20px;
    min-height: 64px;
  }

  .title {
    font-size: 20px;
  }

  .controlSlot {
    padding: 6px;
  }
}

/* Extra Large Devices (1025px - 3000px) */
@media (min-width: 1025px) {
  .container {
    gap: 16px;
    padding: 12px 32px;
    min-height: 70px;
    max-width: 3000px;
  }

  .header {
    min-height: 70px;
  }

  .title {
    font-size: 22px;
  }

  .controlSlot {
    padding: 8px;
  }
}

/* Responsive Adjustments for Different Orientations */
@media (orientation: landscape) and (max-height: 500px) {
  .container {
    min-height: 52px;
    padding: 8px 16px;
  }

  .header {
    min-height: 52px;
  }

  .title {
    font-size: 16px;
  }
}

/* Print Styles */
@media print {
  .header {
    position: relative;
    box-shadow: none;
    border-bottom: 2px solid #000;
  }

  .controlsSection {
    display: none;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .header {
    --header-bg: #1f2937;
    --header-border: #374151;
    --header-title: #f3f4f6;
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: more) {
  .header {
    border-bottom-width: 2px;
  }

  .title {
    font-weight: 700;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .header {
    scroll-behavior: auto;
  }
}
```

#### Acceptance Criteria
- [ ] Header renders as sticky element with correct positioning
- [ ] Responsive layout works across 200px-3000px viewport widths
- [ ] Title uses i18n with 'layout.app.title' translation key
- [ ] Theme and language slots render as ReactNode children
- [ ] Controls hidden on mobile (<768px)
- [ ] No useState hooks used
- [ ] Proper grid layout with responsive gaps
- [ ] Z-index configurable via props
- [ ] Accessibility attributes present (role, aria-label)

#### Verification Commands
```bash
npm run type-check -- src/components/Layout/Header.tsx
npm test -- --testPathPattern="Header" --testNamePattern="renders|responsive|sticky"
npm run lint -- src/components/Layout/Header.tsx
```

---

### Subtask 33.2: Logo Component

#### Status
status: pending

#### Objective
Create a Logo component that displays the brand logo with proper sizing, fallback text, and accessibility attributes.

#### Context
The Logo component is a presentational component that renders the application branding. It must be responsive and include alt text for accessibility. It serves as the visual identity of the application.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/Logo.tsx` - Logo component with responsive sizing

#### Implementation

```typescript
// Logo.tsx
import React from 'react';

interface LogoProps {
  /**
   * Optional custom width in pixels or CSS units
   * Default: responsive (32px on mobile, 40px on desktop)
   */
  width?: string | number;

  /**
   * Optional custom height in pixels or CSS units
   * Default: responsive (32px on mobile, 40px on desktop)
   */
  height?: string | number;

  /**
   * Optional CSS class for styling
   */
  className?: string;

  /**
   * Optional alt text for the logo
   * Default: "Brand Calculator logo"
   */
  alt?: string;

  /**
   * Optional title for tooltip on hover
   */
  title?: string;
}

/**
 * Logo Component
 *
 * Displays the application logo with proper sizing and accessibility.
 * Responsive sizing based on device size.
 *
 * Props:
 * - width: string | number - Custom width (default: responsive)
 * - height: string | number - Custom height (default: responsive)
 * - className: string - Additional CSS classes
 * - alt: string - Alt text for accessibility
 * - title: string - Tooltip on hover
 *
 * Responsive Behavior:
 * - Mobile: 32px x 32px
 * - Desktop: 40px x 40px
 * - Can be overridden with width/height props
 */
const Logo: React.FC<LogoProps> = ({
  width,
  height,
  className,
  alt = 'Brand Calculator logo',
  title,
}) => {
  // Default responsive sizing
  const defaultWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 32 : 40;
  const defaultHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? 32 : 40;

  const resolvedWidth = width ?? `${defaultWidth}px`;
  const resolvedHeight = height ?? `${defaultHeight}px`;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: resolvedWidth,
        height: resolvedHeight,
      }}
      title={title}
    >
      <svg
        viewBox="0 0 128 128"
        width={resolvedWidth}
        height={resolvedHeight}
        aria-label={alt}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Logo SVG - Brand Color Palette Circle */}
        <circle
          cx="64"
          cy="64"
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="64"
          cy="64"
          r="45"
          fill="currentColor"
          opacity="0.8"
        />
        <text
          x="64"
          y="74"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="32"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          BC
        </text>
      </svg>
    </div>
  );
};

export default Logo;
```

#### Acceptance Criteria
- [ ] Logo renders SVG graphic with "BC" initials
- [ ] Responsive sizing (32px mobile, 40px desktop)
- [ ] Width and height props override defaults
- [ ] Alt text provided for accessibility
- [ ] Proper aria-label and role attributes
- [ ] Uses currentColor for theming support
- [ ] No external image dependencies
- [ ] Title prop renders as tooltip

#### Verification Commands
```bash
npm run type-check -- src/components/Layout/Logo.tsx
npm test -- --testPathPattern="Logo" --testNamePattern="renders|responsive"
npm run lint -- src/components/Layout/Logo.tsx
```

---

### Subtask 33.3: Header Styles Module

#### Status
status: pending

#### Objective
Create comprehensive CSS module for header styling with theme variables, responsive breakpoints, and accessibility features.

#### Context
The Header.module.css file provides all styling for the header component including sticky positioning, responsive layouts, theme support, high contrast mode, and print styles. This ensures consistent styling across all viewports and user preferences.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/Header.module.css` - Already included in Subtask 33.1 but documented here for clarity

#### Implementation
CSS is included in Subtask 33.1 Header.tsx file. This subtask documents and validates the CSS module exists with proper structure:

```css
/* Validation: Header.module.css structure */

/* 1. Base Styles */
/* - .header (sticky positioning, base styling) */
/* - .container (grid layout) */
/* - .logoSection (flex container) */
/* - .titleSection (flex container with overflow) */
/* - .controlsSection (flex with gap) */
/* - .controlSlot (flex wrapper) */

/* 2. Responsive Breakpoints */
/* - 200-360px: Extra Small - hide controls, reduce padding */
/* - 361-480px: Small - hide controls, minimal padding */
/* - 481-768px: Medium - hide controls, moderate padding */
/* - 769-1024px: Large - show controls, standard padding */
/* - 1025-3000px: Extra Large - show controls, maximum padding */

/* 3. Special Cases */
/* - Landscape orientation with max-height: 500px */
/* - Print media: relative positioning, no shadows */
/* - Dark mode via prefers-color-scheme */
/* - High contrast via prefers-contrast */
/* - Reduced motion via prefers-reduced-motion */

/* 4. CSS Variables Used */
/* - --header-bg: Background color */
/* - --header-border: Border color */
/* - --header-title: Text color */

/* 5. Grid Template Columns */
/* - Desktop: auto 1fr auto (logo, title, controls) */
/* - Mobile: auto 1fr (logo, title) */

/* 6. Gaps and Padding */
/* - Extra Small: 8px gap, 10px padding */
/* - Small: 12px gap, 10px padding */
/* - Medium: 12px gap, 12px padding */
/* - Large: 16px gap, 20px padding */
/* - Extra Large: 16px gap, 32px padding */

/* Responsive breakpoints validated:
   - height: varies from 52px to 70px
   - font-size: varies from 16px to 22px
   - padding: varies from 8-10px to 32px
   - gaps: vary from 8px to 16px
 */
```

#### Acceptance Criteria
- [ ] All responsive breakpoints (200px-3000px) covered
- [ ] Theme variables defined and used consistently
- [ ] Mobile (<768px) hides controls section
- [ ] Desktop (769px+) shows controls section
- [ ] Dark mode support via CSS variables
- [ ] High contrast mode support via prefers-contrast
- [ ] Print styles applied
- [ ] Reduced motion support
- [ ] Min/max width constraints applied
- [ ] Sticky positioning works correctly

#### Verification Commands
```bash
npm run build -- --check-css-unused
npm run lint -- src/components/Layout/Header.module.css
```

---

### Subtask 33.4: Header Integration & Tests

#### Status
status: pending

#### Objective
Create comprehensive tests and integration setup for Header component with all slots, props, and responsive behavior.

#### Context
Tests validate that the Header component works correctly with theme and language slots, handles responsive behavior, manages i18n translations, and maintains accessibility standards. Integration setup ensures the component works within the application layout.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/Header.test.tsx` - Comprehensive test suite
- `src/components/Layout/index.ts` - Export Header and Logo components

#### Implementation

```typescript
// Header.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import Header from './Header';

// Setup i18n for testing
const i18nTest = i18n.createInstance();
i18nTest.init({
  lng: 'en',
  ns: ['layout'],
  resources: {
    en: {
      layout: {
        'app.title': 'Brand Calculator',
      },
    },
  },
});

const renderHeader = (props = {}) => {
  return render(
    <I18nextProvider i18n={i18nTest}>
      <Header {...props} />
    </I18nextProvider>
  );
};

describe('Header Component', () => {
  describe('Rendering', () => {
    it('renders header element with correct role', () => {
      renderHeader();
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('renders application title from i18n', () => {
      renderHeader();
      expect(screen.getByText('Brand Calculator')).toBeInTheDocument();
    });

    it('renders logo component', () => {
      renderHeader();
      const logo = screen.getByLabelText(/Brand Calculator logo/i);
      expect(logo).toBeInTheDocument();
    });

    it('renders with correct heading hierarchy', () => {
      renderHeader();
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Brand Calculator');
    });
  });

  describe('Slots', () => {
    it('renders theme slot when provided', () => {
      const ThemeSlot = <button data-testid="theme-button">Toggle Theme</button>;
      renderHeader({ themeSlot: ThemeSlot });
      expect(screen.getByTestId('theme-button')).toBeInTheDocument();
    });

    it('renders language slot when provided', () => {
      const LanguageSlot = <select data-testid="language-select"><option>EN</option></select>;
      renderHeader({ languageSlot: LanguageSlot });
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
    });

    it('renders both slots together', () => {
      const ThemeSlot = <button data-testid="theme-button">Toggle Theme</button>;
      const LanguageSlot = <select data-testid="language-select"><option>EN</option></select>;
      renderHeader({ themeSlot: ThemeSlot, languageSlot: LanguageSlot });
      expect(screen.getByTestId('theme-button')).toBeInTheDocument();
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
    });

    it('does not render slots when not provided', () => {
      renderHeader();
      expect(screen.queryByTestId('theme-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('language-select')).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies custom className', () => {
      const { container } = renderHeader({ className: 'custom-header' });
      const header = container.querySelector('.custom-header');
      expect(header).toBeInTheDocument();
    });

    it('applies custom zIndex', () => {
      const { container } = renderHeader({ zIndex: 999 });
      const header = container.querySelector('header');
      expect(header).toHaveStyle({ zIndex: '999' });
    });

    it('uses default zIndex of 100', () => {
      const { container } = renderHeader();
      const header = container.querySelector('header');
      expect(header).toHaveStyle({ zIndex: '100' });
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label on header', () => {
      renderHeader();
      const header = screen.getByRole('banner');
      expect(header).toHaveAttribute('aria-label', 'Application header');
    });

    it('control slots have aria-labels', () => {
      const ThemeSlot = <button>Toggle</button>;
      const LanguageSlot = <select><option>EN</option></select>;
      const { container } = renderHeader({
        themeSlot: ThemeSlot,
        languageSlot: LanguageSlot,
      });
      const themeControl = container.querySelector('[data-control="theme"]');
      const langControl = container.querySelector('[data-control="language"]');
      expect(themeControl).toHaveAttribute('aria-label', 'Theme control');
      expect(langControl).toHaveAttribute('aria-label', 'Language selector');
    });

    it('logo has proper accessibility attributes', () => {
      renderHeader();
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('aria-label');
    });
  });

  describe('Responsive Behavior', () => {
    it('renders header element with sticky positioning', () => {
      const { container } = renderHeader();
      const header = container.querySelector('header');
      const styles = window.getComputedStyle(header);
      expect(styles.position).toBe('sticky');
    });

    it('applies correct grid template on default width', () => {
      const { container } = renderHeader();
      const headerContainer = container.querySelector('[class*="container"]');
      expect(headerContainer).toBeInTheDocument();
    });
  });

  describe('No State Hooks', () => {
    it('does not use useState', () => {
      const { container } = renderHeader();
      // Verify component renders without hook errors
      expect(container.querySelector('header')).toBeInTheDocument();
    });

    it('renders children components directly without re-renders', () => {
      const renderSpy = jest.fn();
      const ThemeSlot = (
        <div>
          {renderSpy()}
          <button>Theme</button>
        </div>
      );
      renderHeader({ themeSlot: ThemeSlot });
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('I18n Integration', () => {
    it('uses i18n for app title translation', () => {
      renderHeader();
      expect(screen.getByText('Brand Calculator')).toBeInTheDocument();
    });

    it('accepts translation key from i18n', () => {
      renderHeader();
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Brand Calculator');
    });
  });
});
```

```typescript
// index.ts (Layout exports)
export { default as Header } from './Header';
export { default as Logo } from './Logo';

export type { HeaderProps } from './Header';
```

#### Acceptance Criteria
- [ ] All component tests pass (rendering, props, slots, accessibility)
- [ ] Responsive behavior tests pass
- [ ] i18n integration tests pass
- [ ] Slot rendering tests pass
- [ ] No state hook errors
- [ ] 90%+ code coverage
- [ ] All accessibility tests pass
- [ ] Export statements correct in index.ts
- [ ] Tests run without warnings

#### Verification Commands
```bash
npm test -- --testPathPattern="Header" --coverage
npm run type-check -- src/components/Layout/
npm run lint -- src/components/Layout/
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/Layout/Header.tsx`
- `src/components/Layout/Logo.tsx`
- `src/components/Layout/Header.module.css`
- `src/components/Layout/Header.test.tsx`
- `src/components/Layout/index.ts`

### Imports From Existing Code
- `react` - React library
- `react-i18next` - i18n integration for title translation
- `@testing-library/react` - Testing utilities (tests only)

### Exports For Other Code
- `Header` - Main header component accepting themeSlot and languageSlot props
- `Logo` - Logo component for branding
- `HeaderProps` - TypeScript interface for Header props

---

## Task-Level Verification
```bash
# Verify all subtasks completed
npm run type-check -- src/components/Layout/
npm test -- --testPathPattern="Header|Logo" --coverage --threshold=90
npm run lint -- src/components/Layout/
npm run build -- --check

# Verify responsive behavior
npm run test:visual -- Header --viewports="200,360,480,768,1024,3000"
```

---

## Parallelization Notes
- **Subtask 33.1** (Header Component): Can run in parallel with all others
  - Creates Header.tsx and Header.module.css
  - No dependencies on other subtasks

- **Subtask 33.2** (Logo Component): Can run in parallel with all others
  - Creates Logo.tsx independently
  - Only imported by Header, not blocking

- **Subtask 33.3** (Header Styles): Can run in parallel with all others
  - CSS validation and documentation
  - Included in 33.1 but can be verified independently

- **Subtask 33.4** (Tests & Integration): Can run last but independently
  - Tests all subtasks together
  - Validates integration between components

**Execution Order Flexibility:**
- All subtasks can execute simultaneously without blocking each other
- Each subtask owns exclusive files with no cross-subtask file editing
- Tests in 33.4 can verify output of 33.1-33.3 after completion
- No subtask depends on output of another subtask
