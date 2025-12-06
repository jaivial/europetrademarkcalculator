import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getDevToolsConfig,
  withDevTools,
  isDevToolsEnabled,
  getEnvironmentInfo,
  type DevToolsConfig,
} from './JotaiDevTools';
import React from 'react';

describe('JotaiDevTools', () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    // Mock window for each test
    globalThis.window = {} as any;
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    // Restore original environment
    globalThis.window = originalWindow;
    vi.unstubAllEnvs();
  });

  describe('getDevToolsConfig', () => {
    it('returns disabled config in production', () => {
      vi.stubEnv('MODE', 'production');

      const config = getDevToolsConfig();

      expect(config.enabled).toBe(false);
      expect(config.name).toBe('Jotai DevTools');
      expect(config.useReduxExtension).toBe(false);
    });

    it('returns enabled config in development', () => {
      vi.stubEnv('MODE', 'development');

      const config = getDevToolsConfig();

      expect(config.enabled).toBe(true);
      expect(config.name).toBe('Jotai DevTools');
    });

    it('respects user-provided configuration overrides', () => {
      vi.stubEnv('MODE', 'development');

      const userConfig: Partial<DevToolsConfig> = {
        enabled: false,
        name: 'Custom DevTools',
        useReduxExtension: false,
      };

      const config = getDevToolsConfig(userConfig);

      expect(config.enabled).toBe(false);
      expect(config.name).toBe('Custom DevTools');
      expect(config.useReduxExtension).toBe(false);
    });

    it('detects Redux DevTools extension when available', () => {
      vi.stubEnv('MODE', 'development');

      // Mock window with Redux DevTools
      globalThis.window = {
        __REDUX_DEVTOOLS_EXTENSION__: {},
      } as any;

      const config = getDevToolsConfig();

      expect(config.useReduxExtension).toBe(true);
    });

    it('handles missing Redux DevTools extension', () => {
      vi.stubEnv('MODE', 'development');

      // Mock window without Redux DevTools
      globalThis.window = {} as any;

      const config = getDevToolsConfig();

      expect(config.useReduxExtension).toBe(false);
    });

    it('handles missing window object safely', () => {
      vi.stubEnv('MODE', 'development');

      // Remove window
      delete (globalThis as any).window;

      const config = getDevToolsConfig();

      expect(config.useReduxExtension).toBe(false);
    });
  });

  describe('withDevTools', () => {
    it('returns original component when disabled', () => {
      vi.stubEnv('MODE', 'production');

      const component = React.createElement('div', {}, 'Test');
      const result = withDevTools(component);

      expect(result).toBe(component);
    });

    it('returns component when enabled in development', () => {
      vi.stubEnv('MODE', 'development');

      const component = React.createElement('div', {}, 'Test');
      const result = withDevTools(component);

      expect(result).toBe(component);
    });

    it('handles errors gracefully', () => {
      vi.stubEnv('MODE', 'development');
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Mock window with problematic extension
      globalThis.window = {
        __REDUX_DEVTOOLS_EXTENSION__: {
          get connect() {
            throw new Error('Connection failed');
          }
        },
      } as any;

      const component = React.createElement('div', {}, 'Test');
      const result = withDevTools(component);

      // Should still return the component despite error
      expect(result).toBe(component);

      consoleSpy.mockRestore();
    });

    it('accepts custom configuration', () => {
      vi.stubEnv('MODE', 'development');

      const component = React.createElement('div', {}, 'Test');
      const config: Partial<DevToolsConfig> = {
        enabled: true,
        name: 'Custom',
      };

      const result = withDevTools(component, config);

      expect(result).toBe(component);
    });
  });

  describe('isDevToolsEnabled', () => {
    it('returns true in development mode', () => {
      vi.stubEnv('MODE', 'development');

      expect(isDevToolsEnabled()).toBe(true);
    });

    it('returns false in production mode', () => {
      vi.stubEnv('MODE', 'production');

      expect(isDevToolsEnabled()).toBe(false);
    });

    it('returns false in test mode', () => {
      vi.stubEnv('MODE', 'test');

      expect(isDevToolsEnabled()).toBe(false);
    });
  });

  describe('getEnvironmentInfo', () => {
    it('returns correct info for production', () => {
      vi.stubEnv('MODE', 'production');
      globalThis.window = {} as any;

      const info = getEnvironmentInfo();

      expect(info.isProduction).toBe(true);
      expect(info.isDevelopment).toBe(false);
      expect(info.isTest).toBe(false);
      expect(info.reduxDevToolsAvailable).toBe(false);
    });

    it('returns correct info for development', () => {
      vi.stubEnv('MODE', 'development');
      globalThis.window = {} as any;

      const info = getEnvironmentInfo();

      expect(info.isProduction).toBe(false);
      expect(info.isDevelopment).toBe(true);
      expect(info.isTest).toBe(false);
    });

    it('returns correct info for test', () => {
      vi.stubEnv('MODE', 'test');
      globalThis.window = {} as any;

      const info = getEnvironmentInfo();

      expect(info.isProduction).toBe(false);
      expect(info.isDevelopment).toBe(false);
      expect(info.isTest).toBe(true);
    });

    it('detects Redux DevTools when available', () => {
      vi.stubEnv('MODE', 'development');
      globalThis.window = {
        __REDUX_DEVTOOLS_EXTENSION__: {},
      } as any;

      const info = getEnvironmentInfo();

      expect(info.reduxDevToolsAvailable).toBe(true);
    });

    it('handles missing window safely', () => {
      delete (globalThis as any).window;

      const info = getEnvironmentInfo();

      expect(info.reduxDevToolsAvailable).toBe(false);
    });
  });
});
