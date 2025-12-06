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
