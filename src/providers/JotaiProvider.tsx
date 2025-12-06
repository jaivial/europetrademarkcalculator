import { ReactNode, useMemo, useEffect } from 'react';
import { Provider, createStore } from 'jotai';
import type { ReactElement } from 'react';

/**
 * Props for the JotaiProvider component
 */
export interface JotaiProviderProps {
  /**
   * Child components to wrap with Jotai Provider
   */
  children: ReactNode;
  /**
   * Optional initial atom values for hydration
   * Useful for SSR and state restoration
   */
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
 * @param props.onMount - Optional callback when provider mounts
 * @param props.debug - Enable hydration logging in development
 * @returns JotaiProvider wrapper element
 */
export const JotaiProvider = ({
  children,
  initialValues,
  onMount,
  debug = false,
}: JotaiProviderProps): ReactElement => {
  // Create a store with initial values for hydration support
  const store = useMemo(() => {
    if (!initialValues || initialValues.length === 0) {
      return createStore();
    }

    if (debug) {
      console.log('[JotaiProvider] Hydrating with values:', initialValues);
    }

    const newStore = createStore();
    initialValues.forEach(([atom, value]) => {
      newStore.set(atom, value);
    });

    return newStore;
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
    <Provider store={store}>
      {children}
    </Provider>
  );
};

// Display name for debugging
JotaiProvider.displayName = 'JotaiProvider';

export default JotaiProvider;
