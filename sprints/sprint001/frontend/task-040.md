# Frontend Task 40: Responsive Utilities & Breakpoint Hooks

## Metadata
- **Task**: 40 of 40
- **Area**: Frontend
- **Feature**: Responsive Design Infrastructure
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a comprehensive responsive design system using Jotai atoms for window state management and custom hooks for media query handling. This task establishes the foundation for responsive behavior across the application without using React's useState hook. All subtasks are independent and can be implemented in parallel using Jotai's atomic state management and debounced resize handling.

---

## Subtasks

### Subtask 40.1: Window Atom State Management

#### Status
status: pending

#### Objective
Create a Jotai atom for managing window dimensions and media query state with debounced updates on resize.

#### Context
This atom serves as the single source of truth for window dimensions across the application. By centralizing window state in Jotai, all responsive hooks can subscribe to a single atom without duplicating resize listeners or causing multiple re-renders.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/windowAtom.ts` - Window dimension state management with debounced updates

#### Implementation

```typescript
import { atom } from 'jotai';

export interface WindowDimensions {
  width: number;
  height: number;
  timestamp: number;
}

// Initial window dimensions
const getInitialDimensions = (): WindowDimensions => {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768, timestamp: Date.now() };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    timestamp: Date.now(),
  };
};

// Base atom for window dimensions
export const windowDimensionsAtom = atom<WindowDimensions>(getInitialDimensions());

// Debounce utility for resize handler
const createDebouncedResizeHandler = (callback: () => void, delay: number = 150) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null;
    }, delay);
  };
};

// Effect atom to handle window resize events
export const windowResizeEffectAtom = atom(null, (get, set) => {
  if (typeof window === 'undefined') return;

  const updateDimensions = () => {
    set(windowDimensionsAtom, {
      width: window.innerWidth,
      height: window.innerHeight,
      timestamp: Date.now(),
    });
  };

  const debouncedUpdate = createDebouncedResizeHandler(updateDimensions, 150);

  window.addEventListener('resize', debouncedUpdate);
  window.addEventListener('orientationchange', debouncedUpdate);

  return () => {
    window.removeEventListener('resize', debouncedUpdate);
    window.removeEventListener('orientationchange', debouncedUpdate);
  };
});

// Atom for breakpoint values (in pixels)
export const breakpointsAtom = atom({
  xs: 200,
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
  xxl: 2560,
  xxxl: 3000,
});

export type BreakpointKey = keyof typeof breakpointsAtom extends atom<infer U> ? keyof U : never;
```

#### Acceptance Criteria
- [ ] windowDimensionsAtom stores width, height, and timestamp
- [ ] getInitialDimensions handles SSR correctly (returns default for non-browser)
- [ ] createDebouncedResizeHandler debounces resize events at 150ms
- [ ] windowResizeEffectAtom registers resize and orientationchange listeners
- [ ] Cleanup function properly removes event listeners
- [ ] breakpointsAtom defines all required breakpoints (200, 375, 768, 1024, 1440, 2560, 3000)
- [ ] TypeScript types are properly exported

#### Verification Commands
```bash
npx tsc --noEmit src/atoms/windowAtom.ts
```

---

### Subtask 40.2: useMediaQuery Hook

#### Status
status: pending

#### Objective
Create a custom hook that evaluates media queries using Jotai atoms and window dimensions for reactive responsive behavior.

#### Context
The useMediaQuery hook provides a declarative way to check media queries (e.g., "min-width: 768px") and reactively update component logic based on window dimensions stored in the windowDimensionsAtom. This enables responsive behavior without CSS media queries alone.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useMediaQuery.ts` - Media query evaluation hook using Jotai atoms

#### Implementation

```typescript
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { windowDimensionsAtom, windowResizeEffectAtom } from '../atoms/windowAtom';

export interface MediaQueryCondition {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

/**
 * Custom hook for evaluating media queries based on window dimensions
 * Uses Jotai atoms to avoid useState and manage window state globally
 *
 * @param condition - Media query condition object with min/max width/height
 * @returns boolean indicating if the condition is met
 *
 * @example
 * const isMobile = useMediaQuery({ maxWidth: 767 });
 * const isDesktop = useMediaQuery({ minWidth: 1024 });
 * const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
 */
export const useMediaQuery = (condition: MediaQueryCondition): boolean => {
  // Initialize resize effect to ensure listeners are attached
  const initializeResizeEffect = useSetAtom(windowResizeEffectAtom);

  // Get current window dimensions
  const dimensions = useAtomValue(windowDimensionsAtom);

  // Initialize resize listeners on mount
  useEffect(() => {
    initializeResizeEffect();
  }, [initializeResizeEffect]);

  // Evaluate the condition
  if (condition.minWidth && dimensions.width < condition.minWidth) {
    return false;
  }
  if (condition.maxWidth && dimensions.width > condition.maxWidth) {
    return false;
  }
  if (condition.minHeight && dimensions.height < condition.minHeight) {
    return false;
  }
  if (condition.maxHeight && dimensions.height > condition.maxHeight) {
    return false;
  }

  return true;
};

/**
 * Query builder for common media query patterns
 * Provides a fluent API for building conditions
 *
 * @example
 * const condition = mediaQuery()
 *   .minWidth(768)
 *   .maxWidth(1023)
 *   .build();
 * const isTablet = useMediaQuery(condition);
 */
export class MediaQueryBuilder {
  private condition: MediaQueryCondition = {};

  minWidth(width: number): this {
    this.condition.minWidth = width;
    return this;
  }

  maxWidth(width: number): this {
    this.condition.maxWidth = width;
    return this;
  }

  minHeight(height: number): this {
    this.condition.minHeight = height;
    return this;
  }

  maxHeight(height: number): this {
    this.condition.maxHeight = height;
    return this;
  }

  build(): MediaQueryCondition {
    return { ...this.condition };
  }
}

export const mediaQuery = () => new MediaQueryBuilder();
```

#### Acceptance Criteria
- [ ] useMediaQuery correctly evaluates minWidth conditions
- [ ] useMediaQuery correctly evaluates maxWidth conditions
- [ ] useMediaQuery correctly evaluates minHeight conditions
- [ ] useMediaQuery correctly evaluates maxHeight conditions
- [ ] Hook initializes resize effect on first mount
- [ ] Conditions can be combined (e.g., minWidth AND maxWidth)
- [ ] MediaQueryBuilder provides fluent API
- [ ] Hook returns boolean type
- [ ] No console errors on mount/unmount

#### Verification Commands
```bash
npx tsc --noEmit src/hooks/useMediaQuery.ts
```

---

### Subtask 40.3: useBreakpoint Hook

#### Status
status: pending

#### Objective
Create a custom hook that provides responsive breakpoint detection (xs, sm, md, lg, xl, xxl, xxxl) based on window width.

#### Context
The useBreakpoint hook simplifies checking which breakpoint tier the window currently falls into. This is essential for responsive design patterns that need to know "am I on mobile?" or "am I on desktop?" and update layouts accordingly. It works with the predefined breakpoints (200, 375, 768, 1024, 1440, 2560, 3000).

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useBreakpoint.ts` - Breakpoint detection hook

#### Implementation

```typescript
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { windowDimensionsAtom, windowResizeEffectAtom, breakpointsAtom } from '../atoms/windowAtom';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export interface BreakpointRange {
  from: Breakpoint;
  to?: Breakpoint;
}

/**
 * Custom hook that returns the current breakpoint tier
 * Uses Jotai atoms to avoid useState and manage state globally
 *
 * @returns Current breakpoint: 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', or 'xxxl'
 *
 * @example
 * const breakpoint = useBreakpoint();
 * if (breakpoint === 'md' || breakpoint === 'lg') {
 *   // Desktop layout
 * } else {
 *   // Mobile layout
 * }
 */
export const useBreakpoint = (): Breakpoint => {
  // Initialize resize effect
  const initializeResizeEffect = useSetAtom(windowResizeEffectAtom);

  // Get current dimensions and breakpoints
  const dimensions = useAtomValue(windowDimensionsAtom);
  const breakpoints = useAtomValue(breakpointsAtom);

  // Initialize resize listeners on mount
  useEffect(() => {
    initializeResizeEffect();
  }, [initializeResizeEffect]);

  const width = dimensions.width;

  // Determine current breakpoint based on width
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints.xxl) return 'xl';
  if (width < breakpoints.xxxl) return 'xxl';
  return 'xxxl';
};

/**
 * Check if current breakpoint matches or exceeds a minimum breakpoint
 *
 * @param minBreakpoint - Minimum breakpoint to match
 * @returns boolean indicating if current breakpoint >= minBreakpoint
 *
 * @example
 * const isTabletOrLarger = useIsBreakpointOrAbove('md');
 */
export const useIsBreakpointOrAbove = (minBreakpoint: Breakpoint): boolean => {
  const currentBreakpoint = useBreakpoint();
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  const minIndex = breakpointOrder.indexOf(minBreakpoint);

  return currentIndex >= minIndex;
};

/**
 * Check if current breakpoint matches or is below a maximum breakpoint
 *
 * @param maxBreakpoint - Maximum breakpoint to match
 * @returns boolean indicating if current breakpoint <= maxBreakpoint
 *
 * @example
 * const isMobileOrTablet = useIsBreakpointOrBelow('md');
 */
export const useIsBreakpointOrBelow = (maxBreakpoint: Breakpoint): boolean => {
  const currentBreakpoint = useBreakpoint();
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  const maxIndex = breakpointOrder.indexOf(maxBreakpoint);

  return currentIndex <= maxIndex;
};

/**
 * Check if current breakpoint falls within a specific range
 *
 * @param from - Minimum breakpoint (inclusive)
 * @param to - Maximum breakpoint (inclusive, optional)
 * @returns boolean indicating if current breakpoint is within range
 *
 * @example
 * const isTablet = useIsBreakpointInRange('sm', 'md');
 */
export const useIsBreakpointInRange = (from: Breakpoint, to?: Breakpoint): boolean => {
  const isAbove = useIsBreakpointOrAbove(from);
  if (!to) return isAbove;
  const isBelow = useIsBreakpointOrBelow(to);
  return isAbove && isBelow;
};
```

#### Acceptance Criteria
- [ ] useBreakpoint returns correct breakpoint for width < 375
- [ ] useBreakpoint returns correct breakpoint for width 375-767
- [ ] useBreakpoint returns correct breakpoint for width 768-1023
- [ ] useBreakpoint returns correct breakpoint for width 1024-1439
- [ ] useBreakpoint returns correct breakpoint for width 1440-2559
- [ ] useBreakpoint returns correct breakpoint for width 2560-2999
- [ ] useBreakpoint returns correct breakpoint for width >= 3000
- [ ] useIsBreakpointOrAbove works correctly
- [ ] useIsBreakpointOrBelow works correctly
- [ ] useIsBreakpointInRange works correctly with both bounds
- [ ] All helpers initialize resize effect on mount

#### Verification Commands
```bash
npx tsc --noEmit src/hooks/useBreakpoint.ts
```

---

### Subtask 40.4: useResponsive Hook

#### Status
status: pending

#### Objective
Create a comprehensive useResponsive hook that returns an object with all responsive information and helper methods.

#### Context
The useResponsive hook provides a single hook that returns all responsive information in one object, including current breakpoint, breakpoint checks, dimensions, and media query helpers. This reduces the need to call multiple hooks and provides a complete responsive API in a single call.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useResponsive.ts` - Comprehensive responsive hook

#### Implementation

```typescript
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { windowDimensionsAtom, windowResizeEffectAtom, breakpointsAtom } from '../atoms/windowAtom';
import { useBreakpoint, useIsBreakpointOrAbove, useIsBreakpointOrBelow, useIsBreakpointInRange, Breakpoint } from './useBreakpoint';
import { useMediaQuery, MediaQueryCondition } from './useMediaQuery';

export interface ResponsiveState {
  // Dimensions
  width: number;
  height: number;

  // Current breakpoint
  breakpoint: Breakpoint;

  // Breakpoint checks
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWidescreen: boolean;
  isExtraWide: boolean;
  isMaxWide: boolean;
  isUltraWide: boolean;

  // Utility methods
  isBreakpointOrAbove: (breakpoint: Breakpoint) => boolean;
  isBreakpointOrBelow: (breakpoint: Breakpoint) => boolean;
  isBreakpointInRange: (from: Breakpoint, to?: Breakpoint) => boolean;
  matchesMediaQuery: (condition: MediaQueryCondition) => boolean;

  // Timestamp for external detection of changes
  timestamp: number;
}

/**
 * Comprehensive responsive state hook
 * Provides all responsive information in a single object
 * Uses Jotai atoms to avoid useState and manage state globally
 *
 * @returns ResponsiveState object with dimensions, breakpoint, and helper methods
 *
 * @example
 * const responsive = useResponsive();
 *
 * if (responsive.isMobile) {
 *   return <MobileLayout />;
 * }
 *
 * return (
 *   <div>
 *     Current: {responsive.breakpoint}
 *     Width: {responsive.width}
 *     Height: {responsive.height}
 *   </div>
 * );
 */
export const useResponsive = (): ResponsiveState => {
  // Initialize resize effect
  const initializeResizeEffect = useSetAtom(windowResizeEffectAtom);

  // Get all necessary data
  const dimensions = useAtomValue(windowDimensionsAtom);
  const breakpoints = useAtomValue(breakpointsAtom);

  // Get breakpoint and helper functions
  const currentBreakpoint = useBreakpoint();
  const isAbove = useIsBreakpointOrAbove;
  const isBelow = useIsBreakpointOrBelow;
  const isInRange = useIsBreakpointInRange;

  // Initialize resize listeners on mount
  useEffect(() => {
    initializeResizeEffect();
  }, [initializeResizeEffect]);

  // Calculate breakpoint-specific checks
  const isMobile = isInRange('xs', 'sm');
  const isTablet = isInRange('md');
  const isDesktop = isAbove('lg');
  const isWidescreen = isAbove('xl');
  const isExtraWide = isAbove('xxl');
  const isMaxWide = isAbove('xxxl');
  const isUltraWide = currentBreakpoint === 'xxxl';

  return {
    // Dimensions
    width: dimensions.width,
    height: dimensions.height,

    // Current breakpoint
    breakpoint: currentBreakpoint,

    // Semantic breakpoint checks
    isMobile,
    isTablet,
    isDesktop,
    isWidescreen,
    isExtraWide,
    isMaxWide,
    isUltraWide,

    // Utility methods
    isBreakpointOrAbove,
    isBreakpointOrBelow,
    isBreakpointInRange,

    // Media query helper
    matchesMediaQuery: (condition: MediaQueryCondition) => {
      return useMediaQuery(condition);
    },

    // Timestamp for change detection
    timestamp: dimensions.timestamp,
  };
};

/**
 * Hook for getting responsive configuration for common patterns
 * Useful for pre-configured responsive layouts
 *
 * @example
 * const responsive = useResponsive();
 * const config = getResponsiveConfig(responsive);
 *
 * return (
 *   <div style={{
 *     columns: config.columnCount,
 *     gap: config.gapSize,
 *   }}>
 *     {/* Content */}
 *   </div>
 * );
 */
export const getResponsiveConfig = (responsive: ResponsiveState) => ({
  // Grid column counts
  columnCount: responsive.isMobile ? 1 : responsive.isTablet ? 2 : responsive.isDesktop ? 3 : 4,

  // Spacing sizes
  gapSize: responsive.isMobile ? '8px' : responsive.isTablet ? '12px' : '16px',
  paddingInline: responsive.isMobile ? '12px' : responsive.isTablet ? '16px' : '24px',
  paddingBlock: responsive.isMobile ? '12px' : '16px',

  // Font sizes
  fontSize: responsive.isMobile ? '14px' : responsive.isTablet ? '15px' : '16px',

  // Component sizes
  buttonHeight: responsive.isMobile ? '36px' : '40px',
  iconSize: responsive.isMobile ? 20 : 24,

  // Layout flags
  showSidebar: responsive.isDesktop,
  showMobileMenu: responsive.isMobile,
  compactMode: responsive.isMobile,
});
```

#### Acceptance Criteria
- [ ] useResponsive returns ResponsiveState object with all fields
- [ ] width and height match window dimensions
- [ ] breakpoint matches current breakpoint
- [ ] isMobile is true only for xs and sm breakpoints
- [ ] isTablet is true only for md breakpoint
- [ ] isDesktop is true for lg and above
- [ ] isWidescreen is true for xl and above
- [ ] isExtraWide is true for xxl and above
- [ ] isMaxWide is true for xxxl and above
- [ ] isUltraWide is true only for xxxl
- [ ] All utility methods return correct boolean values
- [ ] matchesMediaQuery accepts MediaQueryCondition objects
- [ ] timestamp updates on resize
- [ ] No TypeScript errors
- [ ] getResponsiveConfig provides sensible defaults

#### Verification Commands
```bash
npx tsc --noEmit src/hooks/useResponsive.ts
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/atoms/windowAtom.ts`
- `src/hooks/useMediaQuery.ts`
- `src/hooks/useBreakpoint.ts`
- `src/hooks/useResponsive.ts`

### Imports From Existing Code
- `jotai` - Atom state management library
- `react` - React utilities (useEffect)

### Exports For Other Code
- `windowDimensionsAtom` - Window dimension state
- `windowResizeEffectAtom` - Resize effect initialization
- `breakpointsAtom` - Breakpoint configuration
- `useMediaQuery` - Media query hook
- `MediaQueryBuilder` - Query builder for conditions
- `useBreakpoint` - Breakpoint detection hook
- `useIsBreakpointOrAbove` - Check if at or above breakpoint
- `useIsBreakpointOrBelow` - Check if at or below breakpoint
- `useIsBreakpointInRange` - Check if within breakpoint range
- `useResponsive` - Comprehensive responsive state hook
- `getResponsiveConfig` - Get responsive configuration object

---

## Task-Level Verification
```bash
# Type check all files
npx tsc --noEmit src/atoms/windowAtom.ts src/hooks/useMediaQuery.ts src/hooks/useBreakpoint.ts src/hooks/useResponsive.ts

# Lint all files
npm run lint -- src/atoms/windowAtom.ts src/hooks/useMediaQuery.ts src/hooks/useBreakpoint.ts src/hooks/useResponsive.ts
```

---

## Parallelization Notes
- **Subtask 40.1** must complete first as it defines the atoms used by all hooks
- **Subtasks 40.2, 40.3, 40.4** can run in parallel after 40.1 completes
- All subtasks own exclusive files with no overlap
- Each subtask is independently testable
- All subtasks are under 400 lines
- No cross-subtask dependencies (all import from windowAtom only)
