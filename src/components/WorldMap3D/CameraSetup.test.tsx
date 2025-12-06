import { describe, it, expect } from 'vitest';
import { CAMERA_PRESETS } from './CameraSetup';

describe('CameraSetup', () => {
  it('should export camera presets', () => {
    expect(CAMERA_PRESETS).toBeDefined();
    expect(typeof CAMERA_PRESETS).toBe('object');
  });

  it('should have default preset', () => {
    expect(CAMERA_PRESETS.default).toBeDefined();
    expect(CAMERA_PRESETS.default.name).toBe('Default View');
    expect(CAMERA_PRESETS.default.position).toEqual([0, 20, 30]);
    expect(CAMERA_PRESETS.default.target).toEqual([0, 0, 0]);
    expect(CAMERA_PRESETS.default.fov).toBe(75);
  });

  it('should have topDown preset', () => {
    expect(CAMERA_PRESETS.topDown).toBeDefined();
    expect(CAMERA_PRESETS.topDown.name).toBe('Top Down');
    expect(CAMERA_PRESETS.topDown.position).toEqual([0, 50, 0.1]);
  });

  it('should have side preset', () => {
    expect(CAMERA_PRESETS.side).toBeDefined();
    expect(CAMERA_PRESETS.side.name).toBe('Side View');
    expect(CAMERA_PRESETS.side.position).toEqual([50, 0, 0]);
  });

  it('should have front preset', () => {
    expect(CAMERA_PRESETS.front).toBeDefined();
    expect(CAMERA_PRESETS.front.name).toBe('Front View');
    expect(CAMERA_PRESETS.front.position).toEqual([0, 0, 50]);
  });

  it('should have isometric preset', () => {
    expect(CAMERA_PRESETS.isometric).toBeDefined();
    expect(CAMERA_PRESETS.isometric.name).toBe('Isometric');
    expect(CAMERA_PRESETS.isometric.position).toEqual([30, 25, 30]);
  });

  it('should have duration for all presets', () => {
    Object.values(CAMERA_PRESETS).forEach(preset => {
      expect(preset.duration).toBeGreaterThan(0);
    });
  });
});
