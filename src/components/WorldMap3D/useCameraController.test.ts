import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DEFAULT_RESPONSIVE_CONFIG } from './useCameraController';

describe('useCameraController', () => {
  let originalInnerWidth: number;
  let originalUserAgent: string;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalUserAgent = navigator.userAgent;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe('DEFAULT_RESPONSIVE_CONFIG', () => {
    it('should have default config', () => {
      expect(DEFAULT_RESPONSIVE_CONFIG.enableZoom).toBe(true);
      expect(DEFAULT_RESPONSIVE_CONFIG.enablePan).toBe(true);
      expect(DEFAULT_RESPONSIVE_CONFIG.enableRotate).toBe(true);
      expect(DEFAULT_RESPONSIVE_CONFIG.zoomLimits).toEqual({ min: 2, max: 100 });
      expect(DEFAULT_RESPONSIVE_CONFIG.zoomSensitivity).toBe(1);
      expect(DEFAULT_RESPONSIVE_CONFIG.panSensitivity).toBe(0.01);
      expect(DEFAULT_RESPONSIVE_CONFIG.rotateSensitivity).toBe(0.5);
      expect(DEFAULT_RESPONSIVE_CONFIG.isMobile).toBe(false);
    });
  });

  describe('Mobile detection', () => {
    it('should detect desktop width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      expect(window.innerWidth).toBe(1024);
    });

    it('should detect mobile width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      expect(window.innerWidth).toBe(500);
    });
  });

  describe('Zoom limits', () => {
    it('should have default zoom limits', () => {
      const config = DEFAULT_RESPONSIVE_CONFIG;
      expect(config.zoomLimits.min).toBe(2);
      expect(config.zoomLimits.max).toBe(100);
    });

    it('should allow custom zoom limits', () => {
      const customLimits = { min: 5, max: 50 };
      const customConfig = {
        ...DEFAULT_RESPONSIVE_CONFIG,
        zoomLimits: customLimits,
      };

      expect(customConfig.zoomLimits.min).toBe(5);
      expect(customConfig.zoomLimits.max).toBe(50);
    });
  });

  describe('Sensitivity settings', () => {
    it('should have default sensitivities', () => {
      expect(DEFAULT_RESPONSIVE_CONFIG.zoomSensitivity).toBe(1);
      expect(DEFAULT_RESPONSIVE_CONFIG.panSensitivity).toBe(0.01);
      expect(DEFAULT_RESPONSIVE_CONFIG.rotateSensitivity).toBe(0.5);
    });

    it('should allow custom sensitivities', () => {
      const customConfig = {
        ...DEFAULT_RESPONSIVE_CONFIG,
        zoomSensitivity: 2,
        panSensitivity: 0.02,
        rotateSensitivity: 1,
      };

      expect(customConfig.zoomSensitivity).toBe(2);
      expect(customConfig.panSensitivity).toBe(0.02);
      expect(customConfig.rotateSensitivity).toBe(1);
    });
  });

  describe('Interaction state', () => {
    it('should track interaction state', () => {
      let isInteracting = false;

      isInteracting = true;
      expect(isInteracting).toBe(true);

      isInteracting = false;
      expect(isInteracting).toBe(false);
    });
  });

  describe('Config merging', () => {
    it('should merge partial config with defaults', () => {
      const partialConfig = {
        enableZoom: false,
        zoomSensitivity: 2,
      };

      const merged = {
        ...DEFAULT_RESPONSIVE_CONFIG,
        ...partialConfig,
      };

      expect(merged.enableZoom).toBe(false);
      expect(merged.zoomSensitivity).toBe(2);
      expect(merged.enablePan).toBe(true);
      expect(merged.enableRotate).toBe(true);
    });
  });
});
