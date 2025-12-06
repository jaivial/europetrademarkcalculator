export interface InputEvent {
  type: 'mouse' | 'touch' | 'trackpad';
  position: [number, number];
  delta: [number, number];
  scale?: number;
  pressure?: number;
  timestamp: number;
}

export interface TouchGesture {
  type: 'pinch' | 'pan' | 'rotate';
  scale: number;
  rotation: number;
  position: [number, number];
}

export interface ZoomLimits {
  min: number;
  max: number;
}

const DEFAULT_ZOOM_LIMITS: ZoomLimits = {
  min: 2,
  max: 100,
};

/**
 * Normalize mouse event to common input format
 */
export const normalizeMouseEvent = (event: MouseEvent): InputEvent => {
  return {
    type: 'mouse',
    position: [event.clientX, event.clientY],
    delta: [event.movementX, event.movementY],
    pressure: event.buttons > 0 ? 1 : 0,
    timestamp: event.timeStamp,
  };
};

/**
 * Normalize touch event to common input format
 */
export const normalizeTouchEvent = (event: TouchEvent): InputEvent => {
  const touch = event.touches[0] || event.changedTouches[0];
  return {
    type: 'touch',
    position: [touch.clientX, touch.clientY],
    delta: [0, 0],
    pressure: touch.force,
    timestamp: event.timeStamp,
  };
};

/**
 * Detect pinch gesture from two-finger touch
 */
export const detectPinchGesture = (event: TouchEvent): TouchGesture | null => {
  if (event.touches.length !== 2) return null;

  const touch1 = event.touches[0];
  const touch2 = event.touches[1];

  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const centerX = (touch1.clientX + touch2.clientX) / 2;
  const centerY = (touch1.clientY + touch2.clientY) / 2;

  return {
    type: 'pinch',
    scale: 1, // Will be calculated as ratio of current to previous distance
    rotation: 0,
    position: [centerX, centerY],
  };
};

/**
 * Calculate zoom level based on wheel delta
 */
export const calculateZoomDelta = (
  wheelDelta: number,
  sensitivity: number = 1,
  _zoomLimits: Partial<ZoomLimits> = {}
): number => {
  const zoomFactor = wheelDelta > 0 ? 1.1 : 0.9;
  return Math.pow(zoomFactor, sensitivity);
};

/**
 * Clamp zoom value within limits
 */
export const clampZoom = (zoom: number, limits: Partial<ZoomLimits> = {}): number => {
  const { min, max } = { ...DEFAULT_ZOOM_LIMITS, ...limits };
  return Math.max(min, Math.min(max, zoom));
};

/**
 * Calculate rotation from two-finger touch
 */
export const calculateTouchRotation = (
  touch1: Touch,
  touch2: Touch,
  previousTouch1?: Touch,
  previousTouch2?: Touch
): number => {
  if (!previousTouch1 || !previousTouch2) return 0;

  const currentAngle = Math.atan2(
    touch2.clientY - touch1.clientY,
    touch2.clientX - touch1.clientX
  );

  const previousAngle = Math.atan2(
    previousTouch2.clientY - previousTouch1.clientY,
    previousTouch2.clientX - previousTouch1.clientX
  );

  return currentAngle - previousAngle;
};

/**
 * Check if event is a trackpad scroll (based on duration and smoothness)
 */
export const isTrackpadScroll = (wheelEvents: WheelEvent[]): boolean => {
  if (wheelEvents.length < 2) return false;

  const deltaTime =
    wheelEvents[wheelEvents.length - 1].timeStamp -
    wheelEvents[0].timeStamp;

  // Trackpad scrolls typically have smaller deltas and faster frequency
  const averageDeltaY =
    wheelEvents.reduce((sum, e) => sum + Math.abs(e.deltaY), 0) /
    wheelEvents.length;

  return deltaTime < 300 && averageDeltaY < 50;
};

/**
 * Smooth zoom velocity (for momentum scrolling)
 */
export const smoothZoomVelocity = (
  deltaZ: number,
  friction: number = 0.95
): number => {
  return deltaZ * friction;
};

/**
 * Calculate camera position after pan
 */
export const calculatePanDelta = (
  screenDelta: [number, number],
  distance: number,
  fov: number,
  sensitivity: number = 0.01
): [number, number] => {
  const vFOV = (fov * Math.PI) / 180; // convert vertical FOV to radians
  const height = 2 * Math.tan(vFOV / 2) * distance;
  const width = height * window.innerWidth / window.innerHeight;

  return [
    (screenDelta[0] / window.innerWidth) * width * sensitivity,
    -(screenDelta[1] / window.innerHeight) * height * sensitivity,
  ];
};

/**
 * Validate input event
 */
export const isValidInputEvent = (event: unknown): event is InputEvent => {
  const input = event as InputEvent;
  return (
    typeof input === 'object' &&
    input !== null &&
    ['mouse', 'touch', 'trackpad'].includes(input.type) &&
    Array.isArray(input.position) &&
    input.position.length === 2 &&
    typeof input.timestamp === 'number'
  );
};

/**
 * Debounce camera updates
 */
export const createCameraUpdateDebounce = (callback: () => void, delay: number = 16) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};
