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
