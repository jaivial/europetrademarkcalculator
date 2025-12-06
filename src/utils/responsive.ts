// src/utils/responsive.ts

export enum Breakpoint {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

export const BREAKPOINT_PIXELS: Record<Breakpoint, number> = {
  [Breakpoint.XS]: 200,
  [Breakpoint.SM]: 576,
  [Breakpoint.MD]: 768,
  [Breakpoint.LG]: 1024,
  [Breakpoint.XL]: 1280,
  [Breakpoint.XXL]: 1920,
};

export const BREAKPOINT_RANGES: Record<Breakpoint, [number, number]> = {
  [Breakpoint.XS]: [200, 575],
  [Breakpoint.SM]: [576, 767],
  [Breakpoint.MD]: [768, 1023],
  [Breakpoint.LG]: [1024, 1279],
  [Breakpoint.XL]: [1280, 1919],
  [Breakpoint.XXL]: [1920, 3000],
};

/**
 * Get current breakpoint based on window width
 * @returns Current breakpoint
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') {
    return Breakpoint.MD; // Default for SSR
  }

  const width = window.innerWidth;

  if (width < BREAKPOINT_PIXELS[Breakpoint.SM]) return Breakpoint.XS;
  if (width < BREAKPOINT_PIXELS[Breakpoint.MD]) return Breakpoint.SM;
  if (width < BREAKPOINT_PIXELS[Breakpoint.LG]) return Breakpoint.MD;
  if (width < BREAKPOINT_PIXELS[Breakpoint.XL]) return Breakpoint.LG;
  if (width < BREAKPOINT_PIXELS[Breakpoint.XXL]) return Breakpoint.XL;

  return Breakpoint.XXL;
}

/**
 * Check if current width matches or exceeds breakpoint
 * @param breakpoint - Breakpoint to check
 * @returns True if current width >= breakpoint width
 */
export function isBreakpointOrLarger(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return true;

  return window.innerWidth >= BREAKPOINT_PIXELS[breakpoint];
}

/**
 * Check if current width is smaller than breakpoint
 * @param breakpoint - Breakpoint to check
 * @returns True if current width < breakpoint width
 */
export function isBreakpointSmaller(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;

  return window.innerWidth < BREAKPOINT_PIXELS[breakpoint];
}

/**
 * Check if current width is within breakpoint range
 * @param breakpoint - Breakpoint to check
 * @returns True if width is within range
 */
export function isWithinBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;

  const [min, max] = BREAKPOINT_RANGES[breakpoint];
  return window.innerWidth >= min && window.innerWidth <= max;
}

/**
 * Get CSS media query string for breakpoint
 * @param breakpoint - Breakpoint to generate query for
 * @param maxOnly - If true, generates max-width query
 * @returns Media query string
 */
export function getMediaQuery(
  breakpoint: Breakpoint,
  maxOnly: boolean = false
): string {
  const pixels = BREAKPOINT_PIXELS[breakpoint];

  if (maxOnly) {
    return `(max-width: ${pixels - 1}px)`;
  }

  return `(min-width: ${pixels}px)`;
}

/**
 * Generate CSS media query for breakpoint range
 * @param breakpoint - Breakpoint to generate range query for
 * @returns Media query string
 */
export function getMediaQueryRange(breakpoint: Breakpoint): string {
  const [min, max] = BREAKPOINT_RANGES[breakpoint];
  return `(min-width: ${min}px) and (max-width: ${max}px)`;
}

/**
 * Get tailwind breakpoint class prefix
 * @param breakpoint - Breakpoint to get class for
 * @returns Tailwind breakpoint prefix (e.g., 'md:', 'lg:')
 */
export function getTailwindBreakpoint(breakpoint: Breakpoint): string {
  const tailwindMap: Record<Breakpoint, string> = {
    [Breakpoint.XS]: '',
    [Breakpoint.SM]: 'sm:',
    [Breakpoint.MD]: 'md:',
    [Breakpoint.LG]: 'lg:',
    [Breakpoint.XL]: 'xl:',
    [Breakpoint.XXL]: '2xl:',
  };

  return tailwindMap[breakpoint];
}

/**
 * Check if device is mobile (less than tablet width)
 * @returns True if width < MD breakpoint
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return window.innerWidth < BREAKPOINT_PIXELS[Breakpoint.MD];
}

/**
 * Check if device is tablet (MD to LG)
 * @returns True if width is in tablet range
 */
export function isTabletDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const width = window.innerWidth;
  return (
    width >= BREAKPOINT_PIXELS[Breakpoint.MD] &&
    width < BREAKPOINT_PIXELS[Breakpoint.LG]
  );
}

/**
 * Check if device is desktop (LG or larger)
 * @returns True if width >= LG breakpoint
 */
export function isDesktopDevice(): boolean {
  if (typeof window === 'undefined') return true;

  return window.innerWidth >= BREAKPOINT_PIXELS[Breakpoint.LG];
}

/**
 * Get responsive value based on current breakpoint
 * @param values - Map of breakpoint to value
 * @param defaultValue - Default value if breakpoint not found
 * @returns Value for current breakpoint
 */
export function getResponsiveValue<T>(
  values: Partial<Record<Breakpoint, T>>,
  defaultValue: T
): T {
  const current = getCurrentBreakpoint();
  return values[current] ?? defaultValue;
}

/**
 * Create responsive size helper (e.g., for font sizes)
 * @param sizes - Map of breakpoint to size value
 * @returns Function that returns size for current breakpoint
 */
export function createResponsiveSizeHelper(
  sizes: Partial<Record<Breakpoint, number>>
): () => number {
  return () => {
    const current = getCurrentBreakpoint();
    const size = sizes[current];

    if (size !== undefined) return size;

    // Fallback to closest smaller breakpoint
    const allBreakpoints = Object.values(Breakpoint);
    for (let i = allBreakpoints.indexOf(current); i >= 0; i--) {
      const bp = allBreakpoints[i] as Breakpoint;
      if (sizes[bp] !== undefined) return sizes[bp]!;
    }

    return 16; // Default fallback
  };
}
