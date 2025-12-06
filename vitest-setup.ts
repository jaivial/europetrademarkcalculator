import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Mock ResizeObserver for react-three-fiber Canvas
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock WebGLRenderingContext for Three.js
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  canvas: {},
  drawingBufferWidth: 800,
  drawingBufferHeight: 600,
} as unknown as WebGLRenderingContext);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
