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
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
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

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
