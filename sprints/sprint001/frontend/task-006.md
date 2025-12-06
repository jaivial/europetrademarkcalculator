# Frontend Task 006: Core Jotai Atoms - Navigation State

## Metadata
- **Task**: 6 of 40
- **Area**: Frontend
- **Feature**: Navigation State Management
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 2
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create specialized Jotai atoms for managing tab navigation state between the two main application views: 3D World Map and Country List. This task establishes the core navigation infrastructure using Jotai atoms with localStorage persistence and derived atoms for convenient UI integration.

---

## Subtasks

### Subtask 006.1: Active Tab Atom with localStorage Persistence

#### Status
status: pending

#### Objective
Create the primary navigation atom (activeTabAtom) that manages which tab is currently displayed, with localStorage persistence and validation.

#### Context
The application has two main views: 'world-map' for the interactive 3D globe and 'country-list' for browsing countries in a list format. The active tab state must persist across browser sessions and validate tab values against allowed types. NO useState - only Jotai atoms.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/navigationAtom.ts` - Navigation state management (main implementation)

#### Implementation

```typescript
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

/**
 * Navigation tab types - the two main application views
 */
export type NavigationTab = 'world-map' | 'country-list';

/**
 * Tab metadata for display and configuration
 */
export interface TabMetadata {
  id: NavigationTab;
  label: string;
  icon: string;
  description: string;
}

/**
 * Available navigation tabs with metadata
 */
export const NAVIGATION_TABS: readonly TabMetadata[] = [
  {
    id: 'world-map',
    label: 'World Map',
    icon: '🌍',
    description: 'Interactive 3D world map to select countries'
  },
  {
    id: 'country-list',
    label: 'Country List',
    icon: '📋',
    description: 'Browse countries in a searchable list view'
  },
] as const;

/**
 * Validate that a value is a valid navigation tab
 */
const isValidTab = (value: unknown): value is NavigationTab => {
  return NAVIGATION_TABS.some(tab => tab.id === value);
};

/**
 * Active tab atom with localStorage persistence
 * Stores the currently selected tab ('world-map' or 'country-list')
 * Default: 'world-map'
 * Persists to localStorage key: 'brand-calculator-active-tab'
 */
export const activeTabAtom = atomWithStorage<NavigationTab>(
  'brand-calculator-active-tab',
  'world-map',
  undefined,
  { getOnInit: true }
);

/**
 * Derived atom: Get metadata for the currently active tab
 * Provides label, icon, and description of the active tab
 */
export const activeTabMetadataAtom = atom(
  (get) => {
    const activeTab = get(activeTabAtom);
    return NAVIGATION_TABS.find(tab => tab.id === activeTab) || NAVIGATION_TABS[0];
  }
);

/**
 * Derived atom: Check if World Map tab is currently active
 * Returns true if activeTab === 'world-map'
 */
export const isWorldMapActiveAtom = atom(
  (get) => get(activeTabAtom) === 'world-map'
);

/**
 * Derived atom: Check if Country List tab is currently active
 * Returns true if activeTab === 'country-list'
 */
export const isCountryListActiveAtom = atom(
  (get) => get(activeTabAtom) === 'country-list'
);

/**
 * Derived atom: Get array of all available tabs
 * Useful for rendering tab navigation UI
 */
export const availableTabsAtom = atom(
  () => NAVIGATION_TABS
);

/**
 * Write-only atom: Navigate to a specific tab
 * Validates tab ID before setting
 * Usage: const [, navigateToTab] = useAtom(navigateToTabAtom); navigateToTab('country-list');
 */
export const navigateToTabAtom = atom(
  null,
  (get, set, tabId: NavigationTab) => {
    if (!isValidTab(tabId)) {
      console.warn(`Invalid tab ID: ${tabId}. Defaulting to 'world-map'.`);
      set(activeTabAtom, 'world-map');
      return;
    }
    set(activeTabAtom, tabId);
  }
);

/**
 * Write-only atom: Navigate to World Map tab
 * Shorthand for navigateToTabAtom('world-map')
 * Usage: const [, goToWorldMap] = useAtom(navigateToWorldMapAtom); goToWorldMap();
 */
export const navigateToWorldMapAtom = atom(
  null,
  (get, set) => {
    set(activeTabAtom, 'world-map');
  }
);

/**
 * Write-only atom: Navigate to Country List tab
 * Shorthand for navigateToTabAtom('country-list')
 * Usage: const [, goToCountryList] = useAtom(navigateToCountryListAtom); goToCountryList();
 */
export const navigateToCountryListAtom = atom(
  null,
  (get, set) => {
    set(activeTabAtom, 'country-list');
  }
);

/**
 * Write-only atom: Toggle between tabs
 * Switches from current tab to the other tab
 * Usage: const [, toggleTab] = useAtom(toggleNavigationTabAtom); toggleTab();
 */
export const toggleNavigationTabAtom = atom(
  null,
  (get, set) => {
    const currentTab = get(activeTabAtom);
    const nextTab: NavigationTab = currentTab === 'world-map' ? 'country-list' : 'world-map';
    set(activeTabAtom, nextTab);
  }
);
```

#### Props Interface (if component)
Not applicable - this is state management, not a component.

#### Acceptance Criteria
- [ ] activeTabAtom persists to localStorage
- [ ] Default tab is 'world-map'
- [ ] Tab validation prevents invalid values
- [ ] All derived atoms working correctly
- [ ] Type-safe NavigationTab type
- [ ] NAVIGATION_TABS constant properly defined
- [ ] All write atoms functional
- [ ] NO useState used

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify no TypeScript errors
```

---

### Subtask 006.2: Navigation Atom Index Export

#### Status
status: pending

#### Objective
Create index.ts barrel export for the navigation atom module, enabling clean imports across the application.

#### Context
Centralizes all navigation atom exports so components can import from '@/atoms' or '@/atoms/navigationAtom' instead of dealing with individual atom files. Provides organized exports for all atoms, types, and constants.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/index.ts` - ADD navigation atom exports (update if file exists from other tasks)

#### Implementation

```typescript
/**
 * Central export for all Jotai atoms
 * Import from '@/atoms' instead of individual files
 */

// Theme atoms
export {
  type Theme,
  themeAtom,
  isDarkModeAtom,
  toggleThemeAtom,
  initializeThemeAtom,
} from './themeAtom';

// Language atoms
export {
  type Language,
  type LanguageMetadata,
  SUPPORTED_LANGUAGES,
  LANGUAGE_METADATA,
  languageAtom,
  currentLanguageMetadataAtom,
  setLanguageAtom,
} from './languageAtom';

// Country atoms
export {
  type Country,
  type ContinentFilter,
  selectedCountryAtom,
  countrySearchAtom,
  continentFilterAtom,
  hasSelectedCountryAtom,
  selectedCountryCodeAtom,
  selectCountryAtom,
  clearCountrySelectionAtom,
  updateSearchAtom,
  updateContinentFilterAtom,
  resetFiltersAtom,
} from './countryAtom';

// Calculator atoms
export {
  type RegistrationType,
  type OptionalServices,
  type CalculatorState,
  calculatorStateAtom,
  numberOfClassesAtom,
  registrationTypeAtom,
  optionalServicesAtom,
  basePriceAtom,
  servicesPriceAtom,
  totalPriceAtom,
  resetCalculatorAtom,
} from './calculatorAtom';

// Navigation atoms
export {
  type NavigationTab,
  type TabMetadata,
  NAVIGATION_TABS,
  activeTabAtom,
  activeTabMetadataAtom,
  isWorldMapActiveAtom,
  isCountryListActiveAtom,
  availableTabsAtom,
  navigateToTabAtom,
  navigateToWorldMapAtom,
  navigateToCountryListAtom,
  toggleNavigationTabAtom,
} from './navigationAtom';
```

#### Acceptance Criteria
- [ ] All navigation atoms exported
- [ ] All navigation types exported
- [ ] Constants exported (NAVIGATION_TABS)
- [ ] Clean import paths enabled (e.g., `import { activeTabAtom } from '@/atoms'`)
- [ ] TypeScript types preserved
- [ ] No runtime overhead
- [ ] Barrel export correctly aggregates all atoms

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify imports from '@/atoms' work correctly
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/navigationAtom.ts`
- `src/atoms/index.ts` (navigation atom section/exports)

### Imports From Existing Code
- `jotai` - from package.json (Task 001)
- `jotai/utils` - for atomWithStorage

### Exports For Other Code
- `activeTabAtom` - Primary tab state for UI components
- `isWorldMapActiveAtom` - Convenient boolean check for World Map tab
- `isCountryListActiveAtom` - Convenient boolean check for Country List tab
- `navigateToTabAtom` - Generic navigation action
- `navigateToWorldMapAtom` - Shorthand to switch to World Map
- `navigateToCountryListAtom` - Shorthand to switch to Country List
- `toggleNavigationTabAtom` - Toggle between tabs
- `NAVIGATION_TABS` - Tab metadata for rendering navigation UI
- `NavigationTab` - Type for tab values
- `TabMetadata` - Type for tab configuration

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
# Test imports work
node -e "const atoms = require('./src/atoms/index.ts'); console.log('Navigation atoms:', Object.keys(atoms).filter(k => k.includes('Tab')));"
```

---

## Parallelization Notes
- Both subtasks can run in parallel
- Subtask 006.1 creates the atom implementation
- Subtask 006.2 aggregates exports in index.ts
- Subtask 006.1 does not depend on 006.2
- Subtask 006.2 only needs 006.1's file to exist
- Can be completed before or after other atom tasks (Tasks 002, 003, 004, 005)
- Navigation atoms are independent and don't reference other atoms
- All subtasks own exclusive files/sections
