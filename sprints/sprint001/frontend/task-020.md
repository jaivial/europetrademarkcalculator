# Frontend Task 20: Tab Navigation Component

## Metadata
- **Task**: 20 of 40
- **Area**: Frontend
- **Feature**: Tab Navigation
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a complete Tab Navigation component system with two tabs (World Map and Country List) that manages view state using Jotai atomics. This system provides responsive tab switching that adapts from mobile stacked layout to desktop horizontal layout. All tabs are controlled by Jotai's useAtom hook without any local useState, ensuring centralized state management. The component suite includes the main TabNavigation container, individual TabButton controls, responsive tab content wrapper, and comprehensive styling with CSS modules.

---

## Subtasks

### Subtask 20.1: TabNavigation Main Container Component

#### Status
status: pending

#### Objective
Create the main TabNavigation container component that manages the navigation state using Jotai navigationAtom and renders tab buttons with responsive layout support.

#### Context
This is the core component that orchestrates the entire tab navigation system. It consumes the Jotai navigationAtom to track which tab is active, renders tab buttons for both World Map and Country List, and provides responsive styling. This subtask owns the main container logic and layout structure.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Navigation/TabNavigation.tsx` - Main TabNavigation container component with Jotai integration
- `src/components/Navigation/index.ts` - Export index for the Navigation module

#### Implementation

```typescript
// src/components/Navigation/TabNavigation.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { navigationAtom } from '@/store/atoms/navigationAtom';
import { TabButton } from './TabButton';
import styles from './TabNavigation.module.css';

export interface TabNavigationProps {
  className?: string;
  onTabChange?: (tabId: string) => void;
}

const TAB_OPTIONS = [
  { id: 'world-map', label: 'World Map' },
  { id: 'country-list', label: 'Country List' }
];

export const TabNavigation: React.FC<TabNavigationProps> = ({
  className = '',
  onTabChange
}) => {
  const [activeTab, setActiveTab] = useAtom(navigationAtom);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <nav
      className={`${styles.tabNavigation} ${className}`}
      role="navigation"
      aria-label="Main navigation tabs"
    >
      <div className={styles.tabContainer}>
        <div
          className={styles.tabButtonGroup}
          role="tablist"
          aria-label="View options"
        >
          {TAB_OPTIONS.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>

        <div className={styles.tabIndicator} />
      </div>
    </nav>
  );
};

export default TabNavigation;
```

#### Props Interface
```typescript
interface TabNavigationProps {
  className?: string;
  onTabChange?: (tabId: string) => void;
}
```

#### Acceptance Criteria
- [ ] Component renders two TabButton children (World Map, Country List)
- [ ] Uses Jotai useAtom hook with navigationAtom (NO useState)
- [ ] Clicking tab button updates Jotai state correctly
- [ ] onTabChange callback fires when tab changes
- [ ] Proper ARIA labels and roles for accessibility
- [ ] No console errors or warnings
- [ ] TypeScript types are properly defined

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="TabNavigation" --testNamePattern="renders and updates state"
```

---

### Subtask 20.2: TabButton Individual Button Component

#### Status
status: pending

#### Objective
Create individual TabButton component that renders a single tab button with active state styling and proper accessibility attributes.

#### Context
TabButton is a presentational component that displays a single tab in the navigation. It receives props for tab ID, label, active state, and click handler. This subtask owns the button styling logic, active state visual indicators, and accessibility features. Each button can be styled independently based on its active state.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Navigation/TabButton.tsx` - Individual tab button component

#### Implementation

```typescript
// src/components/Navigation/TabButton.tsx
import React from 'react';
import styles from './TabNavigation.module.css';

export interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  isActive,
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      id={`tab-${id}`}
      className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      type="button"
    >
      <span className={styles.tabButtonLabel}>{label}</span>
      {isActive && <span className={styles.tabButtonUnderline} />}
    </button>
  );
};

export default TabButton;
```

#### Props Interface
```typescript
interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}
```

#### Acceptance Criteria
- [ ] Button renders with correct label text
- [ ] Active state applies correct className styling
- [ ] onClick handler fires when button clicked
- [ ] Disabled state prevents interaction
- [ ] aria-selected matches isActive prop
- [ ] aria-controls points to correct panel ID
- [ ] Underline indicator shows on active state
- [ ] No console errors

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="TabButton"
```

---

### Subtask 20.3: TabContent Responsive Wrapper Component

#### Status
status: pending

#### Objective
Create TabContent wrapper component that displays content for the active tab with responsive layout and smooth transitions.

#### Context
TabContent is a container component that wraps the content for each tab. It receives the tab ID and children, and uses Jotai navigationAtom to determine if this tab's content should be displayed. This subtask owns the content visibility logic, responsive container styling, and transition effects. It bridges the navigation state with the actual content rendering.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Navigation/TabContent.tsx` - Tab content wrapper with responsive layout

#### Implementation

```typescript
// src/components/Navigation/TabContent.tsx
import React from 'react';
import { useAtomValue } from 'jotai';
import { navigationAtom } from '@/store/atoms/navigationAtom';
import styles from './TabNavigation.module.css';

export interface TabContentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  id,
  children,
  className = '',
  ariaLabel
}) => {
  const activeTab = useAtomValue(navigationAtom);
  const isActive = activeTab === id;

  return (
    <div
      id={`tabpanel-${id}`}
      className={`${styles.tabContent} ${isActive ? styles.tabContentActive : ''} ${className}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      aria-hidden={!isActive}
      aria-label={ariaLabel}
    >
      {isActive && <div className={styles.tabContentInner}>{children}</div>}
    </div>
  );
};

export default TabContent;
```

#### Props Interface
```typescript
interface TabContentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}
```

#### Acceptance Criteria
- [ ] Content displays only when tab is active
- [ ] Uses Jotai useAtomValue for read-only access
- [ ] Proper ARIA attributes (role, aria-hidden, aria-labelledby)
- [ ] Active state shows content with proper className
- [ ] Inactive state hides content but keeps DOM
- [ ] Responsive container styles applied
- [ ] Smooth transitions between tab changes
- [ ] No console errors

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="TabContent"
```

---

### Subtask 20.4: Responsive CSS Module Styling

#### Status
status: pending

#### Objective
Create comprehensive CSS module with responsive breakpoints (200px-3000px) for all tab navigation components with mobile stacked layout and desktop horizontal layout.

#### Context
This subtask owns all styling for the tab navigation system. It defines responsive breakpoints that adapt from mobile (stacked buttons) to desktop (horizontal buttons). The stylesheet includes styles for TabNavigation container, TabButton states (default, active, hover, disabled), TabContent display logic, and an animated indicator line. All styling uses CSS modules for component scoping.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Navigation/TabNavigation.module.css` - All responsive styles for tab navigation

#### Implementation

```css
/* src/components/Navigation/TabNavigation.module.css */

/* Container and Layout */
.tabNavigation {
  width: 100%;
  background: var(--bg-primary, #ffffff);
  border-bottom: 2px solid var(--border-color, #e0e0e0);
  margin-bottom: 1rem;
}

.tabContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 3000px;
  margin: 0 auto;
  padding: 0;
  position: relative;
}

.tabButtonGroup {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

/* Mobile Stacked Layout (200px - 639px) */
@media (max-width: 639px) {
  .tabButtonGroup {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .tabButton {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
    border-radius: 0.375rem 0.375rem 0 0;
  }

  .tabButtonLabel {
    display: block;
    text-align: center;
  }
}

/* Tablet Layout (640px - 1023px) */
@media (min-width: 640px) and (max-width: 1023px) {
  .tabButtonGroup {
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem;
    flex-wrap: wrap;
  }

  .tabButton {
    flex: 0 1 auto;
    min-width: 150px;
    padding: 0.75rem 1.25rem;
    font-size: 0.9375rem;
  }

  .tabButtonLabel {
    display: block;
    white-space: nowrap;
  }
}

/* Desktop Layout (1024px - 3000px) */
@media (min-width: 1024px) {
  .tabButtonGroup {
    flex-direction: row;
    gap: 0;
    padding: 0;
  }

  .tabButton {
    flex: 0 1 auto;
    min-width: 180px;
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }

  .tabButtonLabel {
    display: inline-block;
  }
}

/* Tab Button Styles */
.tabButton {
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--text-secondary, #666666);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
}

.tabButton:hover:not(:disabled) {
  color: var(--text-primary, #333333);
  background: var(--bg-hover, #f5f5f5);
}

.tabButton:focus-visible {
  outline: 2px solid var(--focus-color, #4f46e5);
  outline-offset: -2px;
  border-radius: 0.25rem;
}

.tabButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Active Tab Button State */
.tabButtonActive {
  color: var(--text-primary, #333333);
  border-bottom-color: var(--primary-color, #4f46e5);
  font-weight: 600;
}

.tabButtonActive:hover {
  background: var(--bg-secondary, #f9f9f9);
}

.tabButtonUnderline {
  display: none;
}

/* Tab Content Styles */
.tabContent {
  display: none;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: relative;
  margin-top: 1rem;
}

.tabContentActive {
  display: block;
  opacity: 1;
  animation: slideIn 0.3s ease forwards;
}

.tabContentInner {
  width: 100%;
  padding: 0;
  animation: fadeIn 0.3s ease;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Indicator Line (for future enhancement) */
.tabIndicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0;
  background: transparent;
  transition: all 0.3s ease;
}

/* Responsive Typography */
@media (max-width: 639px) {
  .tabButton {
    font-size: 0.8125rem;
    padding: 0.75rem 0.875rem;
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: more) {
  .tabButton {
    border-bottom-width: 2px;
  }

  .tabButtonActive {
    border-bottom-width: 3px;
  }

  .tabButton:focus-visible {
    outline-width: 3px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .tabButton,
  .tabContent,
  .tabContentInner {
    transition: none;
    animation: none;
  }
}

/* Print Styles */
@media print {
  .tabNavigation {
    border: none;
    margin-bottom: 0.5rem;
  }

  .tabButtonGroup {
    display: contents;
  }

  .tabContent {
    display: block !important;
    opacity: 1;
    page-break-inside: avoid;
  }
}
```

#### Acceptance Criteria
- [ ] Responsive breakpoints at 200px, 640px, 1024px, 3000px
- [ ] Mobile: buttons stack vertically with 100% width
- [ ] Tablet: buttons in row with wrapping support
- [ ] Desktop: buttons in horizontal row with fixed sizing
- [ ] Active tab indicator visible (bottom border)
- [ ] Hover states work correctly
- [ ] Focus states meet accessibility standards
- [ ] Transitions are smooth (0.3s)
- [ ] Support for prefers-reduced-motion
- [ ] High contrast mode support
- [ ] Print styles hide nav appropriately
- [ ] No CSS errors or warnings

#### Verification Commands
```bash
npm run lint:css
npm test -- --testPathPattern="TabNavigation" --testNamePattern="responsive"
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/Navigation/TabNavigation.tsx`
- `src/components/Navigation/TabButton.tsx`
- `src/components/Navigation/TabContent.tsx`
- `src/components/Navigation/TabNavigation.module.css`
- `src/components/Navigation/index.ts`

### Imports From Existing Code
- `jotai` - useAtom, useAtomValue hooks
- `src/store/atoms/navigationAtom` - Jotai navigation state atom
- React - RC.FC and hooks

### Exports For Other Code
- `TabNavigation` - Main navigation container component
- `TabButton` - Individual button component
- `TabContent` - Content wrapper component
- All exported from `src/components/Navigation/index.ts`

---

## Task-Level Verification
```bash
# Full task verification
npm run type-check
npm test -- --testPathPattern="TabNavigation|TabButton|TabContent"
npm run lint
npm run build
```

---

## Parallelization Notes
- All 4 subtasks can run in complete parallel
- Subtask 20.1 (TabNavigation) has no dependencies on other subtasks
- Subtask 20.2 (TabButton) is standalone, can be developed independently
- Subtask 20.3 (TabContent) only depends on existing navigationAtom
- Subtask 20.4 (CSS) can be written independently and imported by all components
- Each subtask owns exclusive files with no file overlap
- No subtask depends on another subtask's output
- All subtasks can be implemented, tested, and merged simultaneously
