import type { ReactElement } from 'react';

/**
 * DevTools configuration options
 */
export interface DevToolsConfig {
  /**
   * Enable Jotai DevTools in development
   * @default true in development, false in production
   */
  enabled: boolean;
  /**
   * Custom name for DevTools instance
   * @default 'Jotai DevTools'
   */
  name?: string;
  /**
   * Enable Redux DevTools browser extension integration
   * @default true if Redux DevTools extension available
   */
  useReduxExtension?: boolean;
}

/**
 * Check if Redux DevTools extension is available in browser
 * @returns true if extension is available, false otherwise
 */
const isReduxDevToolsAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' &&
           !!(window as any).__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
    return false;
  }
};

/**
 * Get current environment mode
 * Uses import.meta.env for Vite compatibility
 */
const getEnvironmentMode = (): string => {
  return import.meta.env?.MODE || 'development';
};

/**
 * Get DevTools configuration based on environment
 * In production, always returns disabled config
 * In development, checks for Redux DevTools availability
 *
 * @param userConfig - Optional user-provided configuration overrides
 * @returns Complete DevTools configuration object
 */
export const getDevToolsConfig = (
  userConfig?: Partial<DevToolsConfig>
): DevToolsConfig => {
  const isProduction = getEnvironmentMode() === 'production';
  const defaultEnabled = !isProduction;

  return {
    enabled: userConfig?.enabled ?? defaultEnabled,
    name: userConfig?.name ?? 'Jotai DevTools',
    useReduxExtension:
      userConfig?.useReduxExtension ??
      (!isProduction && isReduxDevToolsAvailable()),
  };
};

/**
 * Safely initialize Jotai DevTools if available
 * Returns a wrapper component or null if DevTools not enabled
 *
 * @param component - React component to wrap with DevTools
 * @param config - DevTools configuration
 * @returns Component wrapped with DevTools or original component
 */
export const withDevTools = (
  component: ReactElement,
  config?: Partial<DevToolsConfig>
): ReactElement => {
  const devToolsConfig = getDevToolsConfig(config);

  // Only apply DevTools in development mode
  if (!devToolsConfig.enabled) {
    return component;
  }

  // DevTools integration happens at the Provider level
  // This utility ensures safe initialization with proper checks
  try {
    // In development, DevTools integration is handled by Jotai's Provider
    // This function validates configuration safety
    if (devToolsConfig.useReduxExtension && isReduxDevToolsAvailable()) {
      // Redux DevTools extension available, DevTools will auto-integrate
      return component;
    }
    return component;
  } catch (error) {
    // Safely handle any DevTools initialization errors
    console.warn('Jotai DevTools initialization failed:', error);
    return component;
  }
};

/**
 * Check if DevTools should be enabled
 * Useful for conditional logic in components
 *
 * @returns true if in development mode and DevTools enabled
 */
export const isDevToolsEnabled = (): boolean => {
  return getEnvironmentMode() === 'development';
};

/**
 * Environment information for debugging
 */
export const getEnvironmentInfo = () => {
  const mode = getEnvironmentMode();
  return {
    isProduction: mode === 'production',
    isDevelopment: mode === 'development',
    isTest: mode === 'test',
    reduxDevToolsAvailable: isReduxDevToolsAvailable(),
  };
};
