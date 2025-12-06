import { describe, it, expect, vi } from 'vitest';
import {
  normalizeMouseEvent,
  normalizeTouchEvent,
  detectPinchGesture,
  calculateZoomDelta,
  clampZoom,
  calculateTouchRotation,
  isTrackpadScroll,
  smoothZoomVelocity,
  calculatePanDelta,
  isValidInputEvent,
  createCameraUpdateDebounce,
} from './controlUtils';

describe('controlUtils', () => {
  describe('normalizeMouseEvent', () => {
    it('should normalize mouse event', () => {
      const mouseEvent = {
        clientX: 100,
        clientY: 200,
        movementX: 5,
        movementY: 10,
        buttons: 1,
        timeStamp: 1000,
      } as MouseEvent;

      const result = normalizeMouseEvent(mouseEvent);

      expect(result.type).toBe('mouse');
      expect(result.position).toEqual([100, 200]);
      expect(result.delta).toEqual([5, 10]);
      expect(result.pressure).toBe(1);
      expect(result.timestamp).toBe(1000);
    });

    it('should set pressure to 0 when no buttons pressed', () => {
      const mouseEvent = {
        clientX: 0,
        clientY: 0,
        movementX: 0,
        movementY: 0,
        buttons: 0,
        timeStamp: 0,
      } as MouseEvent;

      const result = normalizeMouseEvent(mouseEvent);
      expect(result.pressure).toBe(0);
    });
  });

  describe('normalizeTouchEvent', () => {
    it('should normalize touch event', () => {
      const touchEvent = {
        touches: [{
          clientX: 50,
          clientY: 75,
          force: 0.5,
        }],
        timeStamp: 2000,
      } as unknown as TouchEvent;

      const result = normalizeTouchEvent(touchEvent);

      expect(result.type).toBe('touch');
      expect(result.position).toEqual([50, 75]);
      expect(result.pressure).toBe(0.5);
      expect(result.timestamp).toBe(2000);
    });
  });

  describe('detectPinchGesture', () => {
    it('should return null for single touch', () => {
      const touchEvent = {
        touches: [{ clientX: 0, clientY: 0 }],
      } as unknown as TouchEvent;

      const result = detectPinchGesture(touchEvent);
      expect(result).toBeNull();
    });

    it('should detect pinch gesture with two touches', () => {
      const touchEvent = {
        touches: [
          { clientX: 0, clientY: 0 },
          { clientX: 100, clientY: 0 },
        ],
      } as unknown as TouchEvent;

      const result = detectPinchGesture(touchEvent);

      expect(result).not.toBeNull();
      expect(result?.type).toBe('pinch');
      expect(result?.position).toEqual([50, 0]);
    });
  });

  describe('calculateZoomDelta', () => {
    it('should return zoom factor for positive delta', () => {
      const result = calculateZoomDelta(1);
      expect(result).toBeCloseTo(1.1);
    });

    it('should return zoom factor for negative delta', () => {
      const result = calculateZoomDelta(-1);
      expect(result).toBeCloseTo(0.9);
    });

    it('should respect sensitivity', () => {
      const result = calculateZoomDelta(1, 2);
      expect(result).toBeCloseTo(1.21); // 1.1^2
    });
  });

  describe('clampZoom', () => {
    it('should clamp value within default limits', () => {
      expect(clampZoom(1)).toBe(2);
      expect(clampZoom(50)).toBe(50);
      expect(clampZoom(150)).toBe(100);
    });

    it('should respect custom limits', () => {
      const limits = { min: 5, max: 20 };
      expect(clampZoom(1, limits)).toBe(5);
      expect(clampZoom(50, limits)).toBe(20);
    });
  });

  describe('calculateTouchRotation', () => {
    it('should return 0 without previous touches', () => {
      const touch1 = { clientX: 0, clientY: 0 } as Touch;
      const touch2 = { clientX: 10, clientY: 0 } as Touch;

      const result = calculateTouchRotation(touch1, touch2);
      expect(result).toBe(0);
    });

    it('should calculate rotation angle', () => {
      const touch1 = { clientX: 0, clientY: 0 } as Touch;
      const touch2 = { clientX: 10, clientY: 0 } as Touch;
      const prevTouch1 = { clientX: 0, clientY: 0 } as Touch;
      const prevTouch2 = { clientX: 0, clientY: 10 } as Touch;

      const result = calculateTouchRotation(touch1, touch2, prevTouch1, prevTouch2);
      expect(typeof result).toBe('number');
    });
  });

  describe('isTrackpadScroll', () => {
    it('should return false for single event', () => {
      const events = [{ timeStamp: 0, deltaY: 10 } as WheelEvent];
      expect(isTrackpadScroll(events)).toBe(false);
    });

    it('should detect trackpad scroll', () => {
      const events = [
        { timeStamp: 0, deltaY: 10 } as WheelEvent,
        { timeStamp: 100, deltaY: 20 } as WheelEvent,
      ];
      expect(isTrackpadScroll(events)).toBe(true);
    });

    it('should return false for mouse wheel', () => {
      const events = [
        { timeStamp: 0, deltaY: 100 } as WheelEvent,
        { timeStamp: 500, deltaY: 100 } as WheelEvent,
      ];
      expect(isTrackpadScroll(events)).toBe(false);
    });
  });

  describe('smoothZoomVelocity', () => {
    it('should apply default friction', () => {
      const result = smoothZoomVelocity(10);
      expect(result).toBe(9.5);
    });

    it('should apply custom friction', () => {
      const result = smoothZoomVelocity(10, 0.9);
      expect(result).toBe(9);
    });
  });

  describe('calculatePanDelta', () => {
    it('should calculate pan delta', () => {
      const result = calculatePanDelta([100, 100], 50, 75, 0.01);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(typeof result[0]).toBe('number');
      expect(typeof result[1]).toBe('number');
    });
  });

  describe('isValidInputEvent', () => {
    it('should validate correct input event', () => {
      const event = {
        type: 'mouse',
        position: [0, 0],
        delta: [0, 0],
        timestamp: 1000,
      };

      expect(isValidInputEvent(event)).toBe(true);
    });

    it('should reject invalid input event', () => {
      expect(isValidInputEvent(null)).toBe(false);
      expect(isValidInputEvent({})).toBe(false);
      expect(isValidInputEvent({ type: 'invalid' })).toBe(false);
    });
  });

  describe('createCameraUpdateDebounce', () => {
    it('should create debounced function', () => {
      const callback = vi.fn();
      const debounced = createCameraUpdateDebounce(callback, 50);

      expect(typeof debounced).toBe('function');
    });

    it('should debounce callback execution', async () => {
      const callback = vi.fn();
      const debounced = createCameraUpdateDebounce(callback, 10);

      debounced();
      debounced();
      debounced();

      expect(callback).not.toHaveBeenCalled();

      await new Promise(resolve => setTimeout(resolve, 20));
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
