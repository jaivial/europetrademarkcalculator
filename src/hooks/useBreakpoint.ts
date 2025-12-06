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
