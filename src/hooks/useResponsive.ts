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

  // Get breakpoint
  const currentBreakpoint = useBreakpoint();

  // Initialize resize listeners on mount
  useEffect(() => {
    initializeResizeEffect();
  }, [initializeResizeEffect]);

  // Calculate breakpoint-specific checks using direct breakpoint comparison
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  const isMobile = currentIndex <= breakpointOrder.indexOf('sm');
  const isTablet = currentBreakpoint === 'md';
  const isDesktop = currentIndex >= breakpointOrder.indexOf('lg');
  const isWidescreen = currentIndex >= breakpointOrder.indexOf('xl');
  const isExtraWide = currentIndex >= breakpointOrder.indexOf('xxl');
  const isMaxWide = currentIndex >= breakpointOrder.indexOf('xxxl');
  const isUltraWide = currentBreakpoint === 'xxxl';

  // Helper functions that can be called with breakpoint parameters
  const isAbove = (bp: Breakpoint) => currentIndex >= breakpointOrder.indexOf(bp);
  const isBelow = (bp: Breakpoint) => currentIndex <= breakpointOrder.indexOf(bp);
  const isInRange = (from: Breakpoint, to?: Breakpoint) => {
    const fromIndex = breakpointOrder.indexOf(from);
    if (!to) return currentIndex >= fromIndex;
    const toIndex = breakpointOrder.indexOf(to);
    return currentIndex >= fromIndex && currentIndex <= toIndex;
  };

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
    isBreakpointOrAbove: isAbove,
    isBreakpointOrBelow: isBelow,
    isBreakpointInRange: isInRange,

    // Media query helper
    matchesMediaQuery: (condition: MediaQueryCondition) => {
      // Note: This is a wrapper function, actual hook call would need to be at top level
      // For now, we can't call useMediaQuery here - users should call it separately
      // This is a placeholder that would require refactoring to use properly
      const { width, height } = dimensions;
      if (condition.minWidth && width < condition.minWidth) return false;
      if (condition.maxWidth && width > condition.maxWidth) return false;
      if (condition.minHeight && height < condition.minHeight) return false;
      if (condition.maxHeight && height > condition.maxHeight) return false;
      return true;
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
 *     Content here
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
