export { default as Header } from './Header';
export { default as Logo } from './Logo';
export { Footer } from './Footer';
export { default as LanguageSelector, SUPPORTED_LANGUAGES } from './LanguageSelector';
export type { LanguageCode } from './LanguageSelector';

// AppLayout Module
export { default as AppLayout } from './AppLayout';
export type { AppLayoutProps } from './AppLayout';

export type {
  HeaderVariant,
  FooterVariant,
  LayoutBreakpoint,
  LayoutSpacing,
  LayoutTheme,
  ResponsiveConfig,
  LayoutContextValue,
  LayoutSectionConfig,
  AppLayoutConfig,
} from './AppLayout.types';

export { DEFAULT_LAYOUT_CONFIG } from './AppLayout.types';
