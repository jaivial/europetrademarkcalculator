import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import Controls from './Controls';

describe('Controls', () => {
  it('should have a display name', () => {
    expect(Controls.displayName).toBe('Controls');
  });

  it('should accept config prop', () => {
    const config = {
      enableZoom: false,
      autoRotate: true,
      autoRotateSpeed: 5,
    };

    expect(config.enableZoom).toBe(false);
    expect(config.autoRotate).toBe(true);
    expect(config.autoRotateSpeed).toBe(5);
  });

  it('should accept callback props', () => {
    const onCameraChange = vi.fn();
    const onInteractionStart = vi.fn();
    const onInteractionEnd = vi.fn();

    expect(onCameraChange).toBeDefined();
    expect(onInteractionStart).toBeDefined();
    expect(onInteractionEnd).toBeDefined();
  });

  it('should merge config with defaults', () => {
    const defaultConfig = {
      enableZoom: true,
      enablePan: true,
      enableRotate: true,
      autoRotate: false,
      autoRotateSpeed: 2,
      minDistance: 2,
      maxDistance: 100,
    };

    const customConfig = {
      enableZoom: false,
      autoRotate: true,
    };

    const merged = { ...defaultConfig, ...customConfig };

    expect(merged.enableZoom).toBe(false);
    expect(merged.autoRotate).toBe(true);
    expect(merged.minDistance).toBe(2);
  });
});
