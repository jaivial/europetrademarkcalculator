// src/utils/responsive.test.ts
// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import {
  Breakpoint,
  BREAKPOINT_PIXELS,
  BREAKPOINT_RANGES,
  getCurrentBreakpoint,
  isBreakpointOrLarger,
  isBreakpointSmaller,
  isWithinBreakpoint,
  getMediaQuery,
  getMediaQueryRange,
  getTailwindBreakpoint,
  isMobileDevice,
  isTabletDevice,
  isDesktopDevice,
  getResponsiveValue,
  createResponsiveSizeHelper,
} from './responsive';

describe('responsive', () => {
  describe('constants', () => {
    it('should have correct breakpoint pixels', () => {
      expect(BREAKPOINT_PIXELS[Breakpoint.XS]).toBe(200);
      expect(BREAKPOINT_PIXELS[Breakpoint.SM]).toBe(576);
      expect(BREAKPOINT_PIXELS[Breakpoint.MD]).toBe(768);
      expect(BREAKPOINT_PIXELS[Breakpoint.LG]).toBe(1024);
      expect(BREAKPOINT_PIXELS[Breakpoint.XL]).toBe(1280);
      expect(BREAKPOINT_PIXELS[Breakpoint.XXL]).toBe(1920);
    });

    it('should have correct breakpoint ranges', () => {
      expect(BREAKPOINT_RANGES[Breakpoint.XS]).toEqual([200, 575]);
      expect(BREAKPOINT_RANGES[Breakpoint.SM]).toEqual([576, 767]);
      expect(BREAKPOINT_RANGES[Breakpoint.MD]).toEqual([768, 1023]);
      expect(BREAKPOINT_RANGES[Breakpoint.LG]).toEqual([1024, 1279]);
      expect(BREAKPOINT_RANGES[Breakpoint.XL]).toEqual([1280, 1919]);
      expect(BREAKPOINT_RANGES[Breakpoint.XXL]).toEqual([1920, 3000]);
    });
  });

  describe('getCurrentBreakpoint', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return XS for width < 576', () => {
      mockWindow(400);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.XS);
    });

    it('should return SM for width 576-767', () => {
      mockWindow(650);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.SM);
    });

    it('should return MD for width 768-1023', () => {
      mockWindow(900);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.MD);
    });

    it('should return LG for width 1024-1279', () => {
      mockWindow(1100);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.LG);
    });

    it('should return XL for width 1280-1919', () => {
      mockWindow(1500);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.XL);
    });

    it('should return XXL for width >= 1920', () => {
      mockWindow(2000);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.XXL);
    });

    it('should handle exact breakpoint widths', () => {
      mockWindow(576);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.SM);
      mockWindow(768);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.MD);
      mockWindow(1024);
      expect(getCurrentBreakpoint()).toBe(Breakpoint.LG);
    });
  });

  describe('isBreakpointOrLarger', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return true when width >= breakpoint', () => {
      mockWindow(1024);
      expect(isBreakpointOrLarger(Breakpoint.LG)).toBe(true);
      expect(isBreakpointOrLarger(Breakpoint.MD)).toBe(true);
    });

    it('should return false when width < breakpoint', () => {
      mockWindow(500);
      expect(isBreakpointOrLarger(Breakpoint.MD)).toBe(false);
    });

    it('should handle exact breakpoint width', () => {
      mockWindow(768);
      expect(isBreakpointOrLarger(Breakpoint.MD)).toBe(true);
    });
  });

  describe('isBreakpointSmaller', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return true when width < breakpoint', () => {
      mockWindow(500);
      expect(isBreakpointSmaller(Breakpoint.MD)).toBe(true);
    });

    it('should return false when width >= breakpoint', () => {
      mockWindow(1024);
      expect(isBreakpointSmaller(Breakpoint.LG)).toBe(false);
      expect(isBreakpointSmaller(Breakpoint.MD)).toBe(false);
    });

    it('should handle exact breakpoint width', () => {
      mockWindow(768);
      expect(isBreakpointSmaller(Breakpoint.MD)).toBe(false);
    });
  });

  describe('isWithinBreakpoint', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return true when within range', () => {
      mockWindow(900);
      expect(isWithinBreakpoint(Breakpoint.MD)).toBe(true);
    });

    it('should return false when outside range', () => {
      mockWindow(500);
      expect(isWithinBreakpoint(Breakpoint.MD)).toBe(false);
      mockWindow(1100);
      expect(isWithinBreakpoint(Breakpoint.MD)).toBe(false);
    });

    it('should handle range boundaries', () => {
      mockWindow(768);
      expect(isWithinBreakpoint(Breakpoint.MD)).toBe(true);
      mockWindow(1023);
      expect(isWithinBreakpoint(Breakpoint.MD)).toBe(true);
    });
  });

  describe('getMediaQuery', () => {
    it('should generate min-width query by default', () => {
      expect(getMediaQuery(Breakpoint.MD)).toBe('(min-width: 768px)');
    });

    it('should generate max-width query when maxOnly is true', () => {
      expect(getMediaQuery(Breakpoint.MD, true)).toBe('(max-width: 767px)');
    });

    it('should work for all breakpoints', () => {
      expect(getMediaQuery(Breakpoint.XS)).toBe('(min-width: 200px)');
      expect(getMediaQuery(Breakpoint.SM)).toBe('(min-width: 576px)');
      expect(getMediaQuery(Breakpoint.LG)).toBe('(min-width: 1024px)');
    });
  });

  describe('getMediaQueryRange', () => {
    it('should generate range query', () => {
      expect(getMediaQueryRange(Breakpoint.MD)).toBe(
        '(min-width: 768px) and (max-width: 1023px)'
      );
    });

    it('should work for all breakpoints', () => {
      expect(getMediaQueryRange(Breakpoint.XS)).toBe(
        '(min-width: 200px) and (max-width: 575px)'
      );
      expect(getMediaQueryRange(Breakpoint.XXL)).toBe(
        '(min-width: 1920px) and (max-width: 3000px)'
      );
    });
  });

  describe('getTailwindBreakpoint', () => {
    it('should return correct Tailwind prefixes', () => {
      expect(getTailwindBreakpoint(Breakpoint.XS)).toBe('');
      expect(getTailwindBreakpoint(Breakpoint.SM)).toBe('sm:');
      expect(getTailwindBreakpoint(Breakpoint.MD)).toBe('md:');
      expect(getTailwindBreakpoint(Breakpoint.LG)).toBe('lg:');
      expect(getTailwindBreakpoint(Breakpoint.XL)).toBe('xl:');
      expect(getTailwindBreakpoint(Breakpoint.XXL)).toBe('2xl:');
    });
  });

  describe('isMobileDevice', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return true for mobile widths', () => {
      mockWindow(400);
      expect(isMobileDevice()).toBe(true);
      mockWindow(600);
      expect(isMobileDevice()).toBe(true);
    });

    it('should return false for tablet/desktop widths', () => {
      mockWindow(768);
      expect(isMobileDevice()).toBe(false);
      mockWindow(1200);
      expect(isMobileDevice()).toBe(false);
    });
  });

  describe('isTabletDevice', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return true for tablet widths', () => {
      mockWindow(768);
      expect(isTabletDevice()).toBe(true);
      mockWindow(900);
      expect(isTabletDevice()).toBe(true);
    });

    it('should return false for mobile/desktop widths', () => {
      mockWindow(600);
      expect(isTabletDevice()).toBe(false);
      mockWindow(1200);
      expect(isTabletDevice()).toBe(false);
    });
  });

  describe('isDesktopDevice', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return true for desktop widths', () => {
      mockWindow(1024);
      expect(isDesktopDevice()).toBe(true);
      mockWindow(1920);
      expect(isDesktopDevice()).toBe(true);
    });

    it('should return false for mobile/tablet widths', () => {
      mockWindow(600);
      expect(isDesktopDevice()).toBe(false);
      mockWindow(800);
      expect(isDesktopDevice()).toBe(false);
    });
  });

  describe('getResponsiveValue', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return value for current breakpoint', () => {
      mockWindow(900);
      const values = {
        [Breakpoint.MD]: 'medium',
        [Breakpoint.LG]: 'large',
      };
      expect(getResponsiveValue(values, 'default')).toBe('medium');
    });

    it('should return default when breakpoint not in values', () => {
      mockWindow(400);
      const values = {
        [Breakpoint.MD]: 'medium',
      };
      expect(getResponsiveValue(values, 'default')).toBe('default');
    });

    it('should work with different value types', () => {
      mockWindow(1024);
      const values = {
        [Breakpoint.LG]: 24,
        [Breakpoint.XL]: 32,
      };
      expect(getResponsiveValue(values, 16)).toBe(24);
    });
  });

  describe('createResponsiveSizeHelper', () => {
    const mockWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('should return size for current breakpoint', () => {
      mockWindow(900);
      const helper = createResponsiveSizeHelper({
        [Breakpoint.MD]: 18,
        [Breakpoint.LG]: 24,
      });
      expect(helper()).toBe(18);
    });

    it('should fallback to closest smaller breakpoint', () => {
      mockWindow(1500);
      const helper = createResponsiveSizeHelper({
        [Breakpoint.MD]: 16,
        [Breakpoint.LG]: 20,
      });
      expect(helper()).toBe(20);
    });

    it('should return default fallback when no sizes match', () => {
      mockWindow(400);
      const helper = createResponsiveSizeHelper({
        [Breakpoint.LG]: 24,
      });
      expect(helper()).toBe(16); // Default fallback
    });

    it('should handle all breakpoints', () => {
      mockWindow(2000);
      const helper = createResponsiveSizeHelper({
        [Breakpoint.XS]: 12,
        [Breakpoint.SM]: 14,
        [Breakpoint.MD]: 16,
        [Breakpoint.LG]: 18,
        [Breakpoint.XL]: 20,
        [Breakpoint.XXL]: 24,
      });
      expect(helper()).toBe(24);
    });
  });
});
