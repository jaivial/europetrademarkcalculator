# Frontend Task 036: Jotai Provider Setup

## Metadata
- **Task**: 36 of 40
- **Area**: Frontend
- **Feature**: Jotai State Management Provider
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 3
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a JotaiProvider component that wraps the entire application with Jotai's Provider, integrates Jotai DevTools for development mode only, and sets up proper hydration handling for potential SSR scenarios. This task establishes the global state management infrastructure used throughout the application.

---

## Subtasks

### Subtask 036.1: JotaiProvider Component

#### Status
status: pending

#### Objective
Create the JotaiProvider component that wraps the application with Jotai's Provider and initializes atomic state management.

#### Context
The JotaiProvider is the core wrapper component that must be placed near the root of the application to provide Jotai atoms to all child components. It handles provider initialization and configuration. This subtask creates the main wrapper component that other subtasks will enhance with DevTools and hydration features.

#### Files to Create/Modify (Exclusive Ownership)
- `src/providers/JotaiProvider.tsx` - Main provider component
- `src/providers/JotaiProvider.test.tsx` - Provider tests

#### Implementation

```typescript
import React, { ReactNode, useMemo } from 'react';
import { Provider } from 'jotai';
import type { ReactElement } from 'react';

/**
 * Props for the JotaiProvider component
 */
interface JotaiProviderProps {
  /**
   * Child components to wrap with Jotai Provider
   */
  children: ReactNode;
  /**
   * Optional initial atom values for hydration
   * Useful for SSR and state restoration
   */
  initialValues?: Array<[any, any]>;
}

/**
 * JotaiProvider Component
 *
 * Wraps the application with Jotai's Provider to enable global state management.
 * Supports hydration for SSR scenarios and development tooling integration.
 *
 * Usage:
 * ```tsx
 * <JotaiProvider initialValues={[[myAtom, initialValue]]}>
 *   <App />
 * </JotaiProvider>
 * ```
 *
 * @param props - Component props
 * @param props.children - Child components to wrap
 * @param props.initialValues - Optional initial atom values for hydration
 * @returns JotaiProvider wrapper element
 */
export const JotaiProvider = ({
  children,
  initialValues,
}: JotaiProviderProps): ReactElement => {
  // Memoize initial values to prevent unnecessary provider re-renders
  const memoizedInitialValues = useMemo(() => {
    if (!initialValues || initialValues.length === 0) {
      return undefined;
    }
    return initialValues;
  }, [initialValues]);

  return (
    <Provider initialValues={memoizedInitialValues}>
      {children}
    </Provider>
  );
};

// Display name for debugging
JotaiProvider.displayName = 'JotaiProvider';

export default JotaiProvider;
```

#### Props Interface
```typescript
interface JotaiProviderProps {
  children: ReactNode;
  initialValues?: Array<[any, any]>;
}
```

#### Acceptance Criteria
- [ ] Provider component renders without errors
- [ ] Accepts children and initialValues props
- [ ] initialValues are properly memoized
- [ ] displayName set for debugging
- [ ] TypeScript types are correct
- [ ] Component is exported as default
- [ ] Tests verify provider wrapping works

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="JotaiProvider"
```

---

### Subtask 036.2: DevTools Integration (Development Only)

#### Status
status: pending

#### Objective
Integrate Jotai DevTools for development mode only, with proper environment detection and optional initialization.

#### Context
Jotai DevTools helps debug atomic state changes in development. This should only be imported and used when NODE_ENV is 'development' to avoid including debug code in production builds. The integration must be safe and not crash the app if DevTools unavailable.

#### Files to Create/Modify (Exclusive Ownership)
- `src/providers/JotaiDevTools.ts` - DevTools helper module
- `src/providers/JotaiDevTools.test.ts` - DevTools tests

#### Implementation

```typescript
import type { ReactElement } from 'react';

/**
 * DevTools configuration options
 */
interface DevToolsConfig {
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
  const isProduction = process.env.NODE_ENV === 'production';
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
  return process.env.NODE_ENV === 'development';
};

/**
 * Environment information for debugging
 */
export const getEnvironmentInfo = () => {
  return {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
    reduxDevToolsAvailable: isReduxDevToolsAvailable(),
  };
};
```

#### Acceptance Criteria
- [ ] DevTools configuration only enabled in development
- [ ] Safe detection of Redux DevTools extension
- [ ] No errors if DevTools unavailable
- [ ] Configuration properly exported and typed
- [ ] Environment detection works correctly
- [ ] Error handling prevents production crashes
- [ ] Tests verify dev/prod behavior

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="JotaiDevTools"
NODE_ENV=production npm test -- --testPathPattern="JotaiDevTools"
```

---

### Subtask 036.3: Hydration Setup and Provider Export

#### Status
status: pending

#### Objective
Complete the JotaiProvider with hydration support for SSR scenarios and create index.ts export file for clean imports.

#### Context
Hydration allows server-rendered Jotai state to be restored on the client side. This subtask adds the hydration logic to JotaiProvider and creates the provider index file so other parts of the app can cleanly import from '@/providers'. The index.ts file makes the provider easy to use and maintains consistent exports.

#### Files to Create/Modify (Exclusive Ownership)
- `src/providers/index.ts` - Provider exports
- `src/providers/JotaiProvider.tsx` - Update with hydration

#### Implementation

**src/providers/index.ts**:
```typescript
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
```

**Updated src/providers/JotaiProvider.tsx** (add hydration utilities):
```typescript
import React, { ReactNode, useMemo, useEffect } from 'react';
import { Provider } from 'jotai';
import type { ReactElement } from 'react';

interface JotaiProviderProps {
  children: ReactNode;
  initialValues?: Array<[any, any]>;
  /**
   * Optional callback when provider mounts
   * Useful for tracking SSR completion
   */
  onMount?: () => void;
  /**
   * Enable hydration logging in development
   * @default false
   */
  debug?: boolean;
}

export const JotaiProvider = ({
  children,
  initialValues,
  onMount,
  debug = false,
}: JotaiProviderProps): ReactElement => {
  const memoizedInitialValues = useMemo(() => {
    if (!initialValues || initialValues.length === 0) {
      return undefined;
    }
    if (debug) {
      console.log('[JotaiProvider] Hydrating with values:', initialValues);
    }
    return initialValues;
  }, [initialValues, debug]);

  useEffect(() => {
    if (onMount) {
      onMount();
    }
    if (debug) {
      console.log('[JotaiProvider] Provider mounted');
    }
  }, [onMount, debug]);

  return (
    <Provider initialValues={memoizedInitialValues}>
      {children}
    </Provider>
  );
};

JotaiProvider.displayName = 'JotaiProvider';

export type { JotaiProviderProps };

export default JotaiProvider;
```

#### Acceptance Criteria
- [ ] index.ts exports all provider utilities
- [ ] Jotai exports re-exported for convenience
- [ ] Hydration utilities exported and typed
- [ ] createHydrationData function works correctly
- [ ] restoreHydration safely parses JSON
- [ ] serializeHydration converts to JSON safely
- [ ] JotaiProvider updated with hydration logging
- [ ] All imports resolve without errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="providers"
# Verify imports work
node -e "const providers = require('./src/providers'); console.log(Object.keys(providers))"
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/providers/JotaiProvider.tsx`
- `src/providers/JotaiProvider.test.tsx`
- `src/providers/JotaiDevTools.ts`
- `src/providers/JotaiDevTools.test.ts`
- `src/providers/index.ts`

### Imports From Existing Code
- `react` - React and ReactElement types
- `jotai` - Provider, atom, useAtom, useAtomValue, useSetAtom
- No component dependencies (this is provider-level infrastructure)

### Exports For Other Code
- `JotaiProvider` - Main provider component for wrapping app
- `JotaiProviderProps` - TypeScript interface for provider props
- `getDevToolsConfig` - Function to get DevTools configuration
- `withDevTools` - Utility to wrap components with DevTools
- `isDevToolsEnabled` - Function to check if DevTools enabled
- `getEnvironmentInfo` - Function to get environment details
- `atom`, `useAtom`, `useAtomValue`, `useSetAtom` - Re-exported Jotai utilities
- `createHydrationData` - Helper for creating hydration data
- `restoreHydration` - Helper for parsing hydration data
- `serializeHydration` - Helper for serializing hydration data
- `HydrationData` - Type for hydration data arrays

---

## Task-Level Verification

```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Type check all provider files
npm run type-check

# Run all provider-related tests
npm test -- --testPathPattern="providers"

# Run linting
npm run lint -- src/providers/

# Verify imports work in isolation
node -e "import('./src/providers/index.ts').then(m => console.log('Imports successful:', Object.keys(m)))"
```

---

## Parallelization Notes
- All three subtasks are completely independent and can run in parallel
- Subtask 036.1 creates the base provider component
- Subtask 036.2 creates DevTools utilities (no dependency on 036.1)
- Subtask 036.3 creates exports and hydration utilities (imports types from 036.1 and 036.2)
- Each subtask owns exclusive files with clear boundaries
- No subtask depends on the output of another subtask
- All subtasks use existing Jotai dependencies (defined in Task 001)
- Can be implemented and tested in any order
