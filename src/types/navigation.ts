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
