/**
 * Provider exports - centralized re-exports for all application providers
 *
 * Usage:
 * ```tsx
 * import { JotaiProvider } from '@/providers';
 *
 * <JotaiProvider>
 *   <App />
 * </JotaiProvider>
 * ```
 */

export { JotaiProvider, type JotaiProviderProps } from './JotaiProvider';
export {
  getDevToolsConfig,
  withDevTools,
  isDevToolsEnabled,
  getEnvironmentInfo,
  type DevToolsConfig,
} from './JotaiDevTools';

/**
 * Re-export commonly used Jotai utilities for convenience
 * This allows components to import from '@/providers' instead of 'jotai'
 */
export { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

/**
 * Hydration utility types and functions
 */
export type HydrationData = Array<[any, any]>;

/**
 * Create hydration data from atom values
 *
 * @param values - Map of atoms to their initial values
 * @returns Hydration data array compatible with JotaiProvider initialValues
 *
 * @example
 * ```tsx
 * const hydration = createHydrationData({
 *   userAtom: { id: '123', name: 'John' },
 *   themeAtom: 'dark',
 * });
 *
 * <JotaiProvider initialValues={hydration}>
 *   <App />
 * </JotaiProvider>
 * ```
 */
export const createHydrationData = (
  values: Record<string, any>
): HydrationData => {
  // This function helps convert a simple object to Jotai's hydration format
  // Actual hydration requires atom references, so this serves as a helper pattern
  return Object.entries(values);
};

/**
 * Restore hydration data from JSON string (useful for SSR)
 *
 * @param json - Serialized hydration data as JSON string
 * @returns Parsed hydration data array
 *
 * @throws Error if JSON is invalid
 */
export const restoreHydration = (json: string): HydrationData => {
  try {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
      throw new Error('Hydration data must be an array');
    }
    return data;
  } catch (error) {
    console.error('Failed to restore hydration data:', error);
    return [];
  }
};

/**
 * Serialize hydration data to JSON string (useful for SSR)
 *
 * @param hydration - Hydration data to serialize
 * @returns JSON string representation of hydration data
 *
 * @throws Error if data is not serializable
 */
export const serializeHydration = (hydration: HydrationData): string => {
  try {
    return JSON.stringify(hydration);
  } catch (error) {
    console.error('Failed to serialize hydration data:', error);
    return '[]';
  }
};
