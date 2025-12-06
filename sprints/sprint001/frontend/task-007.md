# Frontend Task 7: TypeScript Type Definitions

## Metadata
- **Task**: 7 of 40
- **Area**: Frontend
- **Feature**: TypeScript Type System
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400
- **Status**: pending

---

## Task Overview
Create comprehensive TypeScript type definitions and interfaces for the entire Brand Calculator application. This task establishes the type system foundation that all other frontend tasks depend on. Each subtask creates a self-contained type module covering different aspects of the application domain: geographic data, calculator domain models, UI theming, and navigation structures.

---

## Subtasks

### Subtask 7.1: Country and Geographic Types

#### Status
status: pending

#### Objective
Create comprehensive types for countries, geographic data, and location-based features used throughout the application.

#### Context
Countries are referenced in trademark filing, region-specific pricing, and localization features. This subtask provides the core geographic types that multiple features depend on. These types are independent and can be created without waiting for other subtasks.

#### Files to Create/Modify (Exclusive Ownership)
- `src/types/country.ts` - Country, region, and geographic data types

#### Implementation

```typescript
/**
 * Country and Geographic Data Types
 * Used for: trademark filing regions, pricing, localization
 */

/**
 * ISO 3166-1 alpha-2 country code
 * @example "US", "UK", "DE", "JP"
 */
export type CountryCode = string & { readonly __brand: "CountryCode" };

/**
 * ISO 3166-1 alpha-3 country code
 * @example "USA", "GBR", "DEU", "JPN"
 */
export type CountryCodeAlpha3 = string & { readonly __brand: "CountryCodeAlpha3" };

/**
 * Country information with geographic and administrative data
 */
export interface Country {
  code: CountryCode;
  codeAlpha3: CountryCodeAlpha3;
  name: string;
  commonName?: string;
  flagEmoji: string;
  region: Region;
  subregion?: string;
  timezone: string;
  coordinates: Coordinates;
  currency: CurrencyInfo;
  languages: string[];
  isEU: boolean;
  isWIPOMember: boolean;
  trademarkOffice?: string;
}

/**
 * Geographic region for classification
 */
export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania"
}

/**
 * Geographic coordinates (latitude, longitude)
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Currency information for a country
 */
export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  exchangeRateToUSD: number;
}

/**
 * Grouped countries by region
 */
export interface CountryGroup {
  region: Region;
  countries: Country[];
  count: number;
}

/**
 * Country search/filter parameters
 */
export interface CountryFilterParams {
  query?: string;
  region?: Region;
  isEU?: boolean;
  isWIPOMember?: boolean;
  sortBy?: "name" | "code" | "region";
  sortOrder?: "asc" | "desc";
}

/**
 * Country response from API
 */
export interface CountryResponse extends Country {
  createdAt: string;
  updatedAt: string;
}

/**
 * Create branded type for CountryCode
 */
export function createCountryCode(code: string): CountryCode {
  return code as CountryCode;
}

/**
 * Create branded type for CountryCodeAlpha3
 */
export function createCountryCodeAlpha3(code: string): CountryCodeAlpha3 {
  return code as CountryCodeAlpha3;
}
```

#### Acceptance Criteria
- [ ] All country types are properly branded types where applicable
- [ ] Country interface includes all geographic and administrative properties
- [ ] Region enum covers all UN regions
- [ ] Currency and coordinate types are well-defined
- [ ] Filter parameters support common search scenarios
- [ ] No circular dependencies with other type files
- [ ] TypeScript compiles without errors
- [ ] JSDoc comments explain type usage

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/types/country.ts
npx tsc --noEmit src/types/country.ts
```

---

### Subtask 7.2: Calculator Domain Types

#### Status
status: pending

#### Objective
Create comprehensive types for calculator domain models including trademark classes, filing types, options, and pricing structures.

#### Context
These types model the core business logic of the brand calculator: trademark classes, filing types, cost calculations, and pricing breakdowns. They are completely independent from other type subtasks and establish the language for pricing and trademark calculations.

#### Files to Create/Modify (Exclusive Ownership)
- `src/types/calculator.ts` - Calculator, pricing, and trademark domain types

#### Implementation

```typescript
/**
 * Calculator Domain Types
 * Used for: trademark calculations, pricing, filing options
 */

import type { CountryCode } from "./country";

/**
 * Trademark class according to Nice Classification
 * Classes 1-34 are goods, 35-45 are services
 * @see https://www.wipo.int/nice/en/
 */
export type TrademarkClass = number & { readonly __brand: "TrademarkClass" };

/**
 * Filing type for trademark applications
 */
export enum FilingType {
  Individual = "individual",
  Collective = "collective",
  Certification = "certification"
}

/**
 * Trademark class detail with pricing
 */
export interface TrademarkClassInfo {
  classNumber: TrademarkClass;
  category: "goods" | "services";
  description: string;
  examples: string[];
  basePrice: number;
}

/**
 * Filing option with associated costs
 */
export interface FilingOption {
  id: string;
  type: FilingType;
  description: string;
  baseCost: number;
  additionalPerClass: number;
  validityYears: number;
  renewalCost: number;
  features: string[];
}

/**
 * Calculator option that can be selected/deselected
 */
export interface CalculatorOption {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "additional" | "service" | "premium";
  isSelected: boolean;
  dependencies?: string[];
  conflictsWith?: string[];
}

/**
 * Price breakdown for a trademark calculation
 */
export interface PriceBreakdown {
  filingBaseCost: number;
  classesCount: number;
  perClassCost: number;
  classesTotalCost: number;
  selectedOptions: PriceItem[];
  optionsTotal: number;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  estimatedProcessingDays: number;
}

/**
 * Individual price item in breakdown
 */
export interface PriceItem {
  label: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: "base" | "class" | "option" | "tax";
}

/**
 * Calculator configuration and state
 */
export interface CalculatorConfig {
  selectedCountries: CountryCode[];
  selectedClasses: TrademarkClass[];
  filingType: FilingType;
  selectedOptions: string[];
  includeInternational: boolean;
  priority: "standard" | "expedited" | "premium";
}

/**
 * Calculator calculation result
 */
export interface CalculationResult {
  id: string;
  config: CalculatorConfig;
  breakdown: PriceBreakdown;
  timestamp: string;
  expiresAt: string;
}

/**
 * Calculation error response
 */
export interface CalculationError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * API request for calculation
 */
export interface CalculationRequest {
  countries: CountryCode[];
  trademarkClasses: TrademarkClass[];
  filingType: FilingType;
  options?: string[];
  priority?: "standard" | "expedited" | "premium";
}

/**
 * API response for calculation
 */
export interface CalculationResponse {
  success: boolean;
  data?: CalculationResult;
  error?: CalculationError;
}

/**
 * Create branded TrademarkClass
 */
export function createTrademarkClass(classNumber: number): TrademarkClass | null {
  if (classNumber < 1 || classNumber > 45) {
    return null;
  }
  return classNumber as TrademarkClass;
}

/**
 * Validate trademark classes
 */
export function validateTrademarkClasses(classes: TrademarkClass[]): boolean {
  return classes.length > 0 && classes.every(c => c >= 1 && c <= 45);
}

/**
 * Get category for trademark class
 */
export function getClassCategory(classNumber: TrademarkClass): "goods" | "services" {
  return classNumber <= 34 ? "goods" : "services";
}

/**
 * Priority fee multiplier
 */
export const PRIORITY_MULTIPLIERS: Record<string, number> = {
  standard: 1.0,
  expedited: 1.5,
  premium: 2.0
};
```

#### Acceptance Criteria
- [ ] TrademarkClass is a branded type with validation (1-45)
- [ ] FilingType enum covers all filing types
- [ ] PriceBreakdown includes all cost components
- [ ] CalculationResult is immutable
- [ ] All types are properly exported
- [ ] Helper functions validate domain constraints
- [ ] No circular imports or dependencies
- [ ] TypeScript compiles without errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/types/calculator.ts
npx tsc --noEmit src/types/calculator.ts
```

---

### Subtask 7.3: Theme and UI Types

#### Status
status: pending

#### Objective
Create TypeScript types for theming, UI colors, typography, and visual design system.

#### Context
UI component styling and theming requires consistent type definitions. This subtask defines the theme structure, color palettes, typography scales, and design tokens independent of component implementation.

#### Files to Create/Modify (Exclusive Ownership)
- `src/types/theme.ts` - Theme, color, typography, and design token types

#### Implementation

```typescript
/**
 * Theme and UI Types
 * Used for: styling, dark/light mode, design tokens
 */

/**
 * Available theme modes
 */
export enum ThemeMode {
  Light = "light",
  Dark = "dark",
  Auto = "auto"
}

/**
 * Color palette structure
 */
export interface ColorPalette {
  primary: ColorShades;
  secondary: ColorShades;
  success: ColorShades;
  warning: ColorShades;
  error: ColorShades;
  neutral: ColorShades;
  background: ColorShades;
  surface: ColorShades;
}

/**
 * Color shades from light to dark
 */
export interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Typography scales
 */
export interface Typography {
  h1: FontStyle;
  h2: FontStyle;
  h3: FontStyle;
  h4: FontStyle;
  h5: FontStyle;
  h6: FontStyle;
  body: FontStyle;
  bodySmall: FontStyle;
  caption: FontStyle;
  button: FontStyle;
  code: FontStyle;
}

/**
 * Font style definition
 */
export interface FontStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
}

/**
 * Spacing scale
 */
export type SpacingScale = Record<string, string>;

/**
 * Border radius scale
 */
export interface BorderRadiusScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

/**
 * Shadow definitions
 */
export interface ShadowScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

/**
 * Transition timing functions
 */
export interface Transitions {
  fast: string;
  base: string;
  slow: string;
}

/**
 * Complete theme definition
 */
export interface Theme {
  mode: ThemeMode;
  colors: ColorPalette;
  typography: Typography;
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
  transitions: Transitions;
  zIndex: ZIndexScale;
}

/**
 * Z-index scale for layering
 */
export interface ZIndexScale {
  hide: number;
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
  notification: number;
}

/**
 * Theme configuration options
 */
export interface ThemeConfig {
  defaultMode: ThemeMode;
  enableSystemPreference: boolean;
  enableTransitions: boolean;
  customPalette?: Partial<ColorPalette>;
}

/**
 * Responsive breakpoint names
 */
export enum Breakpoint {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
  Wide = "wide"
}

/**
 * Breakpoint pixel values
 */
export interface BreakpointValues {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

/**
 * Media query helpers
 */
export interface MediaQueries {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
  touch: string;
  hover: string;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  applyCustomTheme: (config: Partial<Theme>) => void;
}

/**
 * CSS variable names for theming
 */
export const CSS_VARIABLES = {
  colorPrimary500: "--color-primary-500",
  colorPrimary600: "--color-primary-600",
  colorNeutral900: "--color-neutral-900",
  spacingUnit: "--spacing-unit",
  borderRadiusMd: "--border-radius-md",
  transitionBase: "--transition-base",
  zIndexModal: "--z-index-modal"
} as const;

/**
 * Get current theme based on mode
 */
export type ThemeResolver = (mode: ThemeMode) => Theme;
```

#### Acceptance Criteria
- [ ] ThemeMode enum covers all supported modes
- [ ] ColorPalette includes all color categories
- [ ] ColorShades provides complete color scale (50-950)
- [ ] Typography defines all text styles
- [ ] Spacing scale supports responsive design
- [ ] Border radius and shadow scales are comprehensive
- [ ] Z-index scale prevents overlap issues
- [ ] CSS variables are documented
- [ ] All types exported and documented
- [ ] TypeScript compiles without errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/types/theme.ts
npx tsc --noEmit src/types/theme.ts
```

---

### Subtask 7.4: Navigation and Tab Types

#### Status
status: pending

#### Objective
Create TypeScript types for navigation, routing, tabs, and page state management.

#### Context
Navigation and page structure require consistent type definitions. This subtask defines tab types, navigation state, route definitions, and UI navigation patterns, independent of other type modules.

#### Files to Create/Modify (Exclusive Ownership)
- `src/types/navigation.ts` - Navigation, routing, and tab types
- `src/types/index.ts` - Central export file for all types

#### Implementation

```typescript
/**
 * Navigation and Tab Types
 * Used for: routing, tabs, page navigation, state
 */

/**
 * Main application tabs
 */
export enum TabType {
  Calculator = "calculator",
  Results = "results",
  History = "history",
  Settings = "settings",
  Help = "help"
}

/**
 * Tab configuration
 */
export interface Tab {
  id: TabType;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
  badge?: number | string;
  href?: string;
}

/**
 * Navigation item in menu
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  href: string;
  children?: NavigationItem[];
  disabled?: boolean;
  badge?: number | string;
  divider?: boolean;
}

/**
 * Route definition
 */
export interface Route {
  path: string;
  name: string;
  component?: string;
  icon?: string;
  label: string;
  children?: Route[];
  requiresAuth?: boolean;
  public?: boolean;
  layout?: "default" | "minimal" | "fullscreen";
}

/**
 * Navigation state
 */
export interface NavigationState {
  currentTab: TabType;
  currentRoute: string;
  previousRoute?: string;
  breadcrumbs: BreadcrumbItem[];
  isOpen: boolean;
}

/**
 * Breadcrumb item for navigation trail
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
  disabled?: boolean;
  icon?: string;
}

/**
 * Tab change event
 */
export interface TabChangeEvent {
  previousTab: TabType;
  currentTab: TabType;
  timestamp: string;
}

/**
 * Navigation history entry
 */
export interface NavigationHistoryEntry {
  route: string;
  tab: TabType;
  timestamp: string;
  data?: Record<string, unknown>;
}

/**
 * Sidebar configuration
 */
export interface SidebarConfig {
  items: NavigationItem[];
  collapsed: boolean;
  width: number;
  minWidth: number;
  maxWidth: number;
  collapsible: boolean;
  rememberState: boolean;
}

/**
 * Header navigation configuration
 */
export interface HeaderConfig {
  showLogo: boolean;
  showBreadcrumbs: boolean;
  showSearch: boolean;
  showThemeToggle: boolean;
  actions?: NavigationItem[];
}

/**
 * Navigation context value
 */
export interface NavigationContextValue {
  state: NavigationState;
  navigate: (route: string, tab?: TabType) => void;
  setTab: (tab: TabType) => void;
  goBack: () => void;
  goForward: () => void;
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  toggleSidebar: () => void;
}

/**
 * Page configuration with layout
 */
export interface PageConfig {
  title: string;
  description?: string;
  icon?: string;
  layout: "default" | "minimal" | "fullscreen";
  showHeader: boolean;
  showSidebar: boolean;
  showFooter: boolean;
  requiredAuth: boolean;
}

/**
 * Tab with state
 */
export interface TabState extends Tab {
  isActive: boolean;
  isCached: boolean;
  data?: Record<string, unknown>;
}

/**
 * Navigation event types
 */
export enum NavigationEventType {
  TabChange = "tab:change",
  RouteChange = "route:change",
  NavigationOpen = "navigation:open",
  NavigationClose = "navigation:close",
  HistoryPush = "history:push"
}

/**
 * Navigation event
 */
export interface NavigationEvent {
  type: NavigationEventType;
  payload: Record<string, unknown>;
  timestamp: string;
}

/**
 * Query parameters for routes
 */
export interface RouteQuery {
  [key: string]: string | string[] | undefined;
}

/**
 * Route parameters
 */
export interface RouteParams {
  [key: string]: string | undefined;
}
```

#### Index Types File (src/types/index.ts)

```typescript
/**
 * Central export file for all TypeScript types
 * This file re-exports all types from individual modules
 */

// Country and geographic types
export type { Country, CountryCode, CountryCodeAlpha3, Coordinates, CurrencyInfo } from "./country";
export { Region } from "./country";
export type { CountryGroup, CountryFilterParams, CountryResponse } from "./country";
export { createCountryCode, createCountryCodeAlpha3 } from "./country";

// Calculator domain types
export type { TrademarkClass, TrademarkClassInfo, FilingOption, CalculatorOption } from "./calculator";
export { FilingType, PRIORITY_MULTIPLIERS } from "./calculator";
export type {
  PriceBreakdown,
  PriceItem,
  CalculatorConfig,
  CalculationResult,
  CalculationError,
  CalculationRequest,
  CalculationResponse
} from "./calculator";
export { createTrademarkClass, validateTrademarkClasses, getClassCategory } from "./calculator";

// Theme and UI types
export type { ColorPalette, ColorShades, Typography, FontStyle, SpacingScale } from "./theme";
export type { BorderRadiusScale, ShadowScale, Transitions, Theme, ZIndexScale } from "./theme";
export { ThemeMode, Breakpoint, CSS_VARIABLES } from "./theme";
export type { ThemeConfig, BreakpointValues, MediaQueries, ThemeContextValue } from "./theme";

// Navigation types
export type { NavigationItem, Route, NavigationState, BreadcrumbItem } from "./navigation";
export type { TabChangeEvent, NavigationHistoryEntry, SidebarConfig, HeaderConfig } from "./navigation";
export { TabType, NavigationEventType } from "./navigation";
export type { NavigationContextValue, PageConfig, TabState, NavigationEvent } from "./navigation";
export type { Tab, RouteQuery, RouteParams } from "./navigation";
```

#### Acceptance Criteria
- [ ] TabType enum covers all main navigation tabs
- [ ] NavigationState includes current tab, route, and breadcrumbs
- [ ] Route definition supports nested routes
- [ ] Navigation history entry supports data payload
- [ ] All types are properly exported from index.ts
- [ ] No circular imports between type modules
- [ ] All enums and interfaces documented with JSDoc
- [ ] TypeScript compiles without errors on all files

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/types/
npx tsc --noEmit src/types/
npm run lint -- src/types/
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/types/country.ts` - All country and geographic types
- `src/types/calculator.ts` - All calculator domain types
- `src/types/theme.ts` - All theme and UI types
- `src/types/navigation.ts` - All navigation types
- `src/types/index.ts` - Central type export file

### Imports From Existing Code
- None (this is a pure type definition task)

### Exports For Other Code
- All types defined in this task are exported from `src/types/index.ts`
- All other frontend tasks will import types from `src/types`
- Components, hooks, and services depend on these type definitions

---

## Task-Level Verification

```bash
# Navigate to project
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Type check all type files
npm run type-check -- src/types/

# Full TypeScript compilation check
npx tsc --noEmit src/types/

# Lint all type files
npm run lint -- src/types/

# Verify all types export correctly from index
npx tsc --noEmit src/types/index.ts
```

---

## Parallelization Notes

- All 4 subtasks can run completely in parallel
- Each subtask owns exclusive type files
- No subtask depends on another subtask's types
- All subtasks are pure type definitions (no runtime code)
- All subtasks compile independently without errors
- Final index.ts aggregates all exports - can run last if needed
- No circular dependencies between type modules

---

## Implementation Priority

1. **Subtask 7.1** (Country types) - Foundation for geographic data
2. **Subtask 7.2** (Calculator types) - Core business logic types
3. **Subtask 7.3** (Theme types) - UI and styling types
4. **Subtask 7.4** (Navigation types) - Router and navigation types

Can all be executed simultaneously; order shown is suggested logical grouping only.

---

## Notes for Implementer

- Each type file should have a header comment explaining its purpose
- Use branded types (e.g., `TrademarkClass`) for domain concepts to prevent type confusion
- Include JSDoc comments on all exported types and functions
- Provide helper functions where domain constraints need validation
- Keep interfaces focused and cohesive
- Use `as const` for configuration objects where appropriate
- Export types AND helpers/functions for type creation
- No runtime code - pure type definitions only
