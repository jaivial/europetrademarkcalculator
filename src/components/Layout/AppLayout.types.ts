// AppLayout.types.ts

import { ReactNode, CSSProperties } from 'react';

/**
 * Header variant type
 * Determines the header appearance and behavior
 */
export type HeaderVariant = 'default' | 'minimal' | 'expanded';

/**
 * Footer variant type
 * Determines the footer appearance and layout
 */
export type FooterVariant = 'default' | 'minimal';

/**
 * Layout breakpoint type
 * Defines responsive layout breakpoints
 */
export type LayoutBreakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultrawide';

/**
 * Layout spacing configuration
 * Customizable spacing values for the layout
 */
export interface LayoutSpacing {
  /** Vertical padding for main content area */
  mainVertical?: string;
  /** Horizontal padding for content container */
  containerHorizontal?: string;
  /** Gap between child elements in container */
  containerGap?: string;
  /** Mobile horizontal padding */
  containerHorizontalSm?: string;
  /** Tablet horizontal padding */
  containerHorizontalMd?: string;
  /** Desktop horizontal padding */
  containerHorizontalLg?: string;
  /** Ultra-wide horizontal padding */
  containerHorizontalXl?: string;
}

/**
 * Layout theme configuration
 * Color and styling properties for the layout
 */
export interface LayoutTheme {
  /** Main background color */
  backgroundColor?: string;
  /** Secondary background color for main area */
  backgroundColorSecondary?: string;
  /** Tertiary background color for footer */
  backgroundColorTertiary?: string;
  /** Main text color */
  textColor?: string;
  /** Border color */
  borderColor?: string;
  /** Shadow color */
  shadowColor?: string;
  /** Shadow color for light effects */
  shadowColorLight?: string;
}

/**
 * Responsive layout configuration
 * Container query and breakpoint settings
 */
export interface ResponsiveConfig {
  /** Enable container queries */
  enableContainerQueries?: boolean;
  /** Mobile breakpoint width */
  mobileBp?: number; // default: 767
  /** Tablet breakpoint width */
  tabletBp?: number; // default: 1199
  /** Desktop breakpoint width */
  desktopBp?: number; // default: 2399
  /** Minimum content width */
  minWidth?: number; // default: 200
  /** Maximum content width */
  maxWidth?: number; // default: 3000
}

/**
 * Layout context value
 * Shared layout state and configuration
 */
export interface LayoutContextValue {
  /** Current active breakpoint */
  breakpoint: LayoutBreakpoint;
  /** Header variant */
  headerVariant: HeaderVariant;
  /** Footer variant */
  footerVariant: FooterVariant;
  /** Current viewport width in pixels */
  viewportWidth: number;
  /** Whether layout is in mobile view */
  isMobile: boolean;
  /** Whether layout is in tablet view */
  isTablet: boolean;
  /** Whether layout is in desktop view */
  isDesktop: boolean;
  /** Layout theme configuration */
  theme: LayoutTheme;
  /** Spacing configuration */
  spacing: LayoutSpacing;
}

/**
 * AppLayout component props
 * Configuration options for the layout container
 */
export interface AppLayoutProps {
  /** Children components rendered in the main content area */
  children: ReactNode;

  /** Optional CSS class name for additional styling */
  className?: string;

  /** Optional inline styles */
  style?: CSSProperties;

  /** Header variant controlling appearance and height */
  headerVariant?: HeaderVariant;

  /** Footer variant controlling appearance and layout */
  footerVariant?: FooterVariant;

  /** Custom spacing configuration */
  spacing?: Partial<LayoutSpacing>;

  /** Custom theme configuration */
  theme?: Partial<LayoutTheme>;

  /** Responsive configuration */
  responsiveConfig?: Partial<ResponsiveConfig>;

  /** Callback when layout breakpoint changes */
  onBreakpointChange?: (breakpoint: LayoutBreakpoint) => void;

  /** Whether to enable debug mode with borders and colors */
  debug?: boolean;

  /** Custom layout container element (default: div) */
  as?: React.ElementType;

  /** ARIA label for the layout region */
  ariaLabel?: string;

  /** ARIA live region politeness (for dynamic content updates) */
  ariaLive?: 'polite' | 'assertive' | 'off';

  /** Role attribute for semantic meaning */
  role?: string;
}

/**
 * Layout section configuration
 * Settings for header, main, and footer sections
 */
export interface LayoutSectionConfig {
  /** Enable sticky positioning */
  sticky?: boolean;
  /** Custom padding */
  padding?: string | number;
  /** Custom margin */
  margin?: string | number;
  /** Background color override */
  backgroundColor?: string;
  /** Border configuration */
  border?: {
    width?: string | number;
    color?: string;
    style?: string;
  };
}

/**
 * Complete layout configuration
 * Centralized configuration for all layout aspects
 */
export interface AppLayoutConfig {
  /** Responsive settings */
  responsive: ResponsiveConfig;
  /** Theme settings */
  theme: LayoutTheme;
  /** Spacing settings */
  spacing: LayoutSpacing;
  /** Header section configuration */
  headerConfig?: LayoutSectionConfig;
  /** Main content section configuration */
  mainConfig?: LayoutSectionConfig;
  /** Footer section configuration */
  footerConfig?: LayoutSectionConfig;
}

/**
 * Default AppLayout configuration
 */
export const DEFAULT_LAYOUT_CONFIG: AppLayoutConfig = {
  responsive: {
    enableContainerQueries: true,
    mobileBp: 767,
    tabletBp: 1199,
    desktopBp: 2399,
    minWidth: 200,
    maxWidth: 3000,
  },
  theme: {
    backgroundColor: '#ffffff',
    backgroundColorSecondary: '#fafafa',
    backgroundColorTertiary: '#f5f5f5',
    textColor: '#000000',
    borderColor: '#e5e5e5',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowColorLight: 'rgba(0, 0, 0, 0.05)',
  },
  spacing: {
    mainVertical: '1rem',
    containerHorizontal: '1rem',
    containerGap: '1.5rem',
    containerHorizontalSm: '1rem',
    containerHorizontalMd: '1.5rem',
    containerHorizontalLg: '2rem',
    containerHorizontalXl: '3rem',
  },
};
