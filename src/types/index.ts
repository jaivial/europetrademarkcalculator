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
