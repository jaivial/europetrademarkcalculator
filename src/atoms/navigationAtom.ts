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
  (_get, set, tabId: NavigationTab) => {
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
  (_get, set) => {
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
  (_get, set) => {
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
