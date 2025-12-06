# Frontend Task 23: 3D World Map Camera Controls

## Metadata
- **Task**: 23 of 40
- **Area**: Frontend
- **Feature**: 3D World Map - Camera Controls
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Implement comprehensive camera control system for the 3D globe component using @react-three/drei OrbitControls. This task creates reusable, responsive controls supporting both mouse and touch interactions, with configurable zoom limits and smooth rotation mechanics. All subtasks are independent and can be developed in parallel.

---

## Subtasks

### Subtask 23.1: OrbitControls Wrapper Component

#### Status
status: pending

#### Objective
Create a wrapper component around @react-three/drei OrbitControls with configurable properties and event handlers for smooth camera movement.

#### Context
The OrbitControls component needs to be wrapped with sensible defaults and configuration options that can be shared across the 3D world map. This subtask establishes the foundation for camera interaction.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/Controls.tsx` - Main controls wrapper component
- `src/components/WorldMap3D/Controls.test.tsx` - Unit tests for controls component

#### Implementation

```typescript
import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export interface ControlsConfig {
  enableZoom: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  dampingFactor: number;
  rotateSpeed: number;
  zoomSpeed: number;
  panSpeed: number;
}

export interface ControlsProps {
  config?: Partial<ControlsConfig>;
  onCameraChange?: (position: [number, number, number], target: [number, number, number]) => void;
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
}

const DEFAULT_CONFIG: ControlsConfig = {
  enableZoom: true,
  enablePan: true,
  enableRotate: true,
  autoRotate: false,
  autoRotateSpeed: 2,
  minDistance: 2,
  maxDistance: 100,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
  dampingFactor: 0.05,
  rotateSpeed: 1,
  zoomSpeed: 1,
  panSpeed: 1,
};

const Controls = React.forwardRef<any, ControlsProps>(
  ({ config = {}, onCameraChange, onInteractionStart, onInteractionEnd }, ref) => {
    const controlsRef = useRef<any>(null);
    const { camera } = useThree();
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    useEffect(() => {
      if (!controlsRef.current) return;

      const controls = controlsRef.current;

      const handleInteractionStart = () => {
        if (onInteractionStart) {
          onInteractionStart();
        }
      };

      const handleInteractionEnd = () => {
        if (onInteractionEnd) {
          onInteractionEnd();
        }
      };

      const handleChange = () => {
        if (onCameraChange) {
          const position: [number, number, number] = [
            camera.position.x,
            camera.position.y,
            camera.position.z,
          ];
          const target: [number, number, number] = [
            controls.target.x,
            controls.target.y,
            controls.target.z,
          ];
          onCameraChange(position, target);
        }
      };

      controls.addEventListener('start', handleInteractionStart);
      controls.addEventListener('end', handleInteractionEnd);
      controls.addEventListener('change', handleChange);

      return () => {
        controls.removeEventListener('start', handleInteractionStart);
        controls.removeEventListener('end', handleInteractionEnd);
        controls.removeEventListener('change', handleChange);
      };
    }, [camera, onCameraChange, onInteractionStart, onInteractionEnd]);

    return (
      <OrbitControls
        ref={(el) => {
          controlsRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        enableZoom={mergedConfig.enableZoom}
        enablePan={mergedConfig.enablePan}
        enableRotate={mergedConfig.enableRotate}
        autoRotate={mergedConfig.autoRotate}
        autoRotateSpeed={mergedConfig.autoRotateSpeed}
        minDistance={mergedConfig.minDistance}
        maxDistance={mergedConfig.maxDistance}
        minPolarAngle={mergedConfig.minPolarAngle}
        maxPolarAngle={mergedConfig.maxPolarAngle}
        dampingFactor={mergedConfig.dampingFactor}
        rotateSpeed={mergedConfig.rotateSpeed}
        zoomSpeed={mergedConfig.zoomSpeed}
        panSpeed={mergedConfig.panSpeed}
        enableDamping={true}
      />
    );
  }
);

Controls.displayName = 'Controls';

export default Controls;
```

#### Props Interface
```typescript
interface ControlsProps {
  config?: Partial<ControlsConfig>;
  onCameraChange?: (position: [number, number, number], target: [number, number, number]) => void;
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
}

interface ControlsConfig {
  enableZoom: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  dampingFactor: number;
  rotateSpeed: number;
  zoomSpeed: number;
  panSpeed: number;
}
```

#### Acceptance Criteria
- [ ] Controls component renders without errors
- [ ] All config properties are properly applied to OrbitControls
- [ ] Event callbacks (onCameraChange, onInteractionStart, onInteractionEnd) are triggered correctly
- [ ] Damping is enabled for smooth camera motion
- [ ] Default configuration provides sensible defaults
- [ ] Component can be used with forwardRef
- [ ] TypeScript types are fully defined
- [ ] Tests pass with 100% coverage

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="Controls"
npm run lint -- src/components/WorldMap3D/Controls.tsx
```

---

### Subtask 23.2: Camera Setup and Initialization

#### Status
status: pending

#### Objective
Create camera setup utilities that initialize the camera with optimal position, field of view, and look-at target for the 3D globe.

#### Context
The camera needs to be positioned correctly to view the entire globe with proper perspective. This subtask handles initial camera configuration and provides utilities for camera reset and preset views.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/CameraSetup.tsx` - Camera initialization and presets
- `src/components/WorldMap3D/CameraSetup.test.tsx` - Unit tests

#### Implementation

```typescript
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect, useCallback } from 'react';

export interface CameraPreset {
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
  duration?: number;
}

export interface CameraSetupConfig {
  initialFov: number;
  initialPosition: [number, number, number];
  initialTarget: [number, number, number];
  near: number;
  far: number;
  aspect?: number;
}

const DEFAULT_CAMERA_CONFIG: CameraSetupConfig = {
  initialFov: 75,
  initialPosition: [0, 20, 30],
  initialTarget: [0, 0, 0],
  near: 0.1,
  far: 2000,
};

export const CAMERA_PRESETS: Record<string, CameraPreset> = {
  default: {
    name: 'Default View',
    position: [0, 20, 30],
    target: [0, 0, 0],
    fov: 75,
    duration: 800,
  },
  topDown: {
    name: 'Top Down',
    position: [0, 50, 0.1],
    target: [0, 0, 0],
    fov: 75,
    duration: 600,
  },
  side: {
    name: 'Side View',
    position: [50, 0, 0],
    target: [0, 0, 0],
    fov: 75,
    duration: 600,
  },
  front: {
    name: 'Front View',
    position: [0, 0, 50],
    target: [0, 0, 0],
    fov: 75,
    duration: 600,
  },
  isometric: {
    name: 'Isometric',
    position: [30, 25, 30],
    target: [0, 0, 0],
    fov: 75,
    duration: 800,
  },
};

export const useCameraSetup = (config: Partial<CameraSetupConfig> = {}) => {
  const { camera } = useThree();
  const mergedConfig = { ...DEFAULT_CAMERA_CONFIG, ...config };

  useEffect(() => {
    // Initialize camera
    camera.position.set(
      mergedConfig.initialPosition[0],
      mergedConfig.initialPosition[1],
      mergedConfig.initialPosition[2]
    );

    camera.fov = mergedConfig.initialFov;
    camera.near = mergedConfig.near;
    camera.far = mergedConfig.far;

    if (mergedConfig.aspect !== undefined) {
      camera.aspect = mergedConfig.aspect;
    }

    camera.updateProjectionMatrix();
  }, [camera, mergedConfig]);

  const resetCamera = useCallback(() => {
    camera.position.set(
      mergedConfig.initialPosition[0],
      mergedConfig.initialPosition[1],
      mergedConfig.initialPosition[2]
    );
    camera.fov = mergedConfig.initialFov;
    camera.updateProjectionMatrix();
  }, [camera, mergedConfig]);

  const moveToPreset = useCallback(
    (preset: CameraPreset) => {
      const startPos = camera.position.clone();
      const endPos = new Vector3(...preset.position);
      const duration = preset.duration || 800;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-in-out cubic)
        const easeProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        camera.position.lerpVectors(startPos, endPos, easeProgress);

        if (preset.fov !== undefined) {
          const startFov = camera.fov;
          camera.fov = startFov + (preset.fov - startFov) * easeProgress;
          camera.updateProjectionMatrix();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    },
    [camera]
  );

  const getViewDirection = useCallback((): Vector3 => {
    const direction = new Vector3();
    camera.getWorldDirection(direction);
    return direction;
  }, [camera]);

  const getDistance = useCallback((): number => {
    return camera.position.length();
  }, [camera]);

  return {
    resetCamera,
    moveToPreset,
    getViewDirection,
    getDistance,
    camera,
  };
};

export const CameraSetup = ({
  config = {},
  children,
}: {
  config?: Partial<CameraSetupConfig>;
  children?: React.ReactNode;
}) => {
  useCameraSetup(config);
  return <>{children}</>;
};

export default CameraSetup;
```

#### Acceptance Criteria
- [ ] Camera initializes with correct position and field of view
- [ ] All camera presets (topDown, side, front, isometric) work correctly
- [ ] Camera animations smooth with proper easing
- [ ] resetCamera function returns camera to initial state
- [ ] getViewDirection and getDistance hooks work correctly
- [ ] Camera aspect ratio updates when window resizes
- [ ] TypeScript types properly defined
- [ ] Tests verify all preset transitions

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="CameraSetup"
npm run lint -- src/components/WorldMap3D/CameraSetup.tsx
```

---

### Subtask 23.3: Touch and Mouse Input Handlers

#### Status
status: pending

#### Objective
Create utility functions for handling both touch and mouse input events with proper event normalization and gesture detection for mobile responsiveness.

#### Context
Different input methods (mouse, touch, trackpad) need normalized handling. This subtask provides utility functions for detecting gestures, calculating deltas, and supporting pinch-to-zoom on touch devices.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/controlUtils.ts` - Touch and mouse input utilities
- `src/components/WorldMap3D/controlUtils.test.ts` - Unit tests for utilities

#### Implementation

```typescript
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

  const currentDistance = Math.hypot(
    touch2.clientX - touch1.clientX,
    touch2.clientY - touch1.clientY
  );

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
  zoomLimits: Partial<ZoomLimits> = {}
): number => {
  const limits = { ...DEFAULT_ZOOM_LIMITS, ...zoomLimits };
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
  let timeoutId: NodeJS.Timeout | null = null;

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};
```

#### Acceptance Criteria
- [ ] Mouse events normalized correctly
- [ ] Touch events normalized correctly
- [ ] Pinch gesture detection works with two-finger touch
- [ ] Zoom clamping respects min/max limits
- [ ] Trackpad scroll detection works accurately
- [ ] Pan delta calculations correct for camera distance and FOV
- [ ] All utility functions properly typed
- [ ] Tests cover all input types and edge cases

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="controlUtils"
npm run lint -- src/components/WorldMap3D/controlUtils.ts
```

---

### Subtask 23.4: Responsive Camera Controller Hook

#### Status
status: pending

#### Objective
Create a custom React hook that manages camera controls responsively across different device types and window sizes with automatic control adaptation.

#### Context
The hook provides a high-level API for managing all camera controls, handling window resize events, and adapting control sensitivity based on device type (mobile vs desktop). This enables responsive camera interactions across all devices.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/useCameraController.ts` - Responsive camera controller hook
- `src/components/WorldMap3D/useCameraController.test.ts` - Hook tests

#### Implementation

```typescript
import { useEffect, useRef, useCallback, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { clampZoom, calculateZoomDelta, calculatePanDelta } from './controlUtils';

export interface ResponsiveCameraConfig {
  enableZoom: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  zoomLimits: { min: number; max: number };
  zoomSensitivity: number;
  panSensitivity: number;
  rotateSensitivity: number;
  isMobile: boolean;
}

export const DEFAULT_RESPONSIVE_CONFIG: ResponsiveCameraConfig = {
  enableZoom: true,
  enablePan: true,
  enableRotate: true,
  zoomLimits: { min: 2, max: 100 },
  zoomSensitivity: 1,
  panSensitivity: 0.01,
  rotateSensitivity: 0.5,
  isMobile: false,
};

const MOBILE_BREAKPOINT = 768;

/**
 * Detect if device is mobile
 */
const detectMobileDevice = (): boolean => {
  return (
    window.innerWidth < MOBILE_BREAKPOINT ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
};

/**
 * Custom hook for responsive camera control
 */
export const useCameraController = (
  config: Partial<ResponsiveCameraConfig> = {}
) => {
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(() => detectMobileDevice());
  const [isInteracting, setIsInteracting] = useState(false);

  const mergedConfig = {
    ...DEFAULT_RESPONSIVE_CONFIG,
    isMobile,
    ...config,
  };

  const stateRef = useRef({
    lastTouchDistance: 0,
    lastWheelTime: 0,
    wheelDeltaQueue: [] as number[],
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = detectMobileDevice();
      setIsMobile(newIsMobile);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  // Handle mouse wheel zoom
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!mergedConfig.enableZoom) return;

      event.preventDefault();

      const delta = calculateZoomDelta(
        event.deltaY,
        mergedConfig.zoomSensitivity,
        mergedConfig.zoomLimits
      );

      const currentDistance = camera.position.length();
      const newDistance = clampZoom(
        currentDistance / delta,
        mergedConfig.zoomLimits
      );

      const direction = camera.position.normalize();
      camera.position.copy(direction.multiplyScalar(newDistance));

      // Track wheel events for trackpad detection
      const now = Date.now();
      stateRef.current.wheelDeltaQueue.push(now);

      // Keep only last 5 wheel events (500ms window)
      stateRef.current.wheelDeltaQueue = stateRef.current.wheelDeltaQueue.filter(
        (time) => now - time < 500
      );

      stateRef.current.lastWheelTime = now;
    },
    [camera, mergedConfig]
  );

  // Handle touch zoom (pinch)
  const handleTouchZoom = useCallback(
    (event: TouchEvent) => {
      if (!mergedConfig.enableZoom || event.touches.length !== 2) return;

      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (stateRef.current.lastTouchDistance === 0) {
        stateRef.current.lastTouchDistance = currentDistance;
        return;
      }

      const scale =
        currentDistance / stateRef.current.lastTouchDistance;
      const zoomDelta = scale < 1 ? 0.9 : 1.1;

      const currentZoom = camera.position.length();
      const newZoom = clampZoom(
        currentZoom / zoomDelta,
        mergedConfig.zoomLimits
      );

      const direction = camera.position.normalize();
      camera.position.copy(direction.multiplyScalar(newZoom));

      stateRef.current.lastTouchDistance = currentDistance;
    },
    [camera, mergedConfig]
  );

  // Reset touch state
  const handleTouchEnd = useCallback(() => {
    stateRef.current.lastTouchDistance = 0;
  }, []);

  // Register event listeners
  useEffect(() => {
    const container = document.querySelector('canvas');
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchmove', handleTouchZoom, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    const handleInteractionStart = () => setIsInteracting(true);
    const handleInteractionEnd = () => setIsInteracting(false);

    container.addEventListener('mousedown', handleInteractionStart);
    container.addEventListener('mouseup', handleInteractionEnd);
    container.addEventListener('touchstart', handleInteractionStart);
    container.addEventListener('touchend', handleInteractionEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchmove', handleTouchZoom);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleInteractionStart);
      container.removeEventListener('mouseup', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [handleWheel, handleTouchZoom, handleTouchEnd]);

  const getConfig = useCallback(() => mergedConfig, [mergedConfig]);

  const setZoomLimits = useCallback((min: number, max: number) => {
    mergedConfig.zoomLimits = { min, max };
  }, [mergedConfig]);

  const resetInteraction = useCallback(() => {
    setIsInteracting(false);
    stateRef.current.lastTouchDistance = 0;
  }, []);

  return {
    config: mergedConfig,
    isMobile,
    isInteracting,
    getConfig,
    setZoomLimits,
    resetInteraction,
    camera,
  };
};

export default useCameraController;
```

#### Acceptance Criteria
- [ ] Hook detects mobile device correctly
- [ ] Wheel zoom works on desktop
- [ ] Pinch zoom works on touch devices
- [ ] Zoom respects min/max limits
- [ ] Interaction state tracked correctly
- [ ] Window resize handled properly
- [ ] Event listeners cleaned up on unmount
- [ ] Mobile and desktop configs adapt automatically
- [ ] All TypeScript types defined
- [ ] Tests verify all input methods

#### Verification Commands
```bash
npm run type-check
npm test -- --testPathPattern="useCameraController"
npm run lint -- src/components/WorldMap3D/useCameraController.ts
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/WorldMap3D/Controls.tsx`
- `src/components/WorldMap3D/Controls.test.tsx`
- `src/components/WorldMap3D/CameraSetup.tsx`
- `src/components/WorldMap3D/CameraSetup.test.tsx`
- `src/components/WorldMap3D/controlUtils.ts`
- `src/components/WorldMap3D/controlUtils.test.ts`
- `src/components/WorldMap3D/useCameraController.ts`
- `src/components/WorldMap3D/useCameraController.test.ts`

### Imports From Existing Code
- `@react-three/fiber` - useThree hook for camera access
- `@react-three/drei` - OrbitControls component
- `three` - Vector3 for camera math
- React - Core hooks (useRef, useCallback, useEffect, useState)

### Exports For Other Code
- `Controls` - Main controls wrapper component
- `ControlsConfig` - Configuration interface for controls
- `ControlsProps` - Props interface for controls component
- `CameraSetup` - Camera initialization component
- `useCameraSetup` - Hook for camera setup
- `CAMERA_PRESETS` - Predefined camera view presets
- `useCameraController` - Main responsive camera controller hook
- All utility functions from `controlUtils.ts` - Touch/mouse event handling

---

## Task-Level Verification

```bash
# Type checking
npm run type-check

# Run all tests for this task
npm test -- --testPathPattern="(Controls|CameraSetup|controlUtils|useCameraController)"

# Linting
npm run lint -- src/components/WorldMap3D/

# Build verification
npm run build
```

---

## Parallelization Notes

- **All 4 subtasks are completely independent** and can be developed in parallel
- Subtask 23.1 (Controls) can run first, last, or simultaneously with others
- Subtask 23.2 (CameraSetup) depends only on Three.js and React, not on other subtasks
- Subtask 23.3 (controlUtils) provides utilities but has no dependencies on other subtasks
- Subtask 23.4 (useCameraController) imports from 23.3 but can be developed in parallel since 23.3 is self-contained
- Each subtask owns exclusive files with no cross-file modifications
- All subtasks can be merged to main branch independently

---

## Implementation Notes

### Key Features
1. **OrbitControls Integration**: Uses @react-three/drei's OrbitControls with sensible defaults
2. **Responsive Design**: Automatic adaptation to mobile vs desktop with breakpoint detection
3. **Touch Support**: Full pinch-to-zoom and pan gestures for mobile
4. **Zoom Limits**: Configurable min/max zoom with smooth clamping
5. **Camera Presets**: Multiple preset views (topDown, side, front, isometric)
6. **Smooth Animation**: Easing functions for camera transitions
7. **Input Normalization**: Unified handling of mouse, touch, and trackpad inputs
8. **Performance**: Debounced updates and efficient event handling

### Browser Compatibility
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with touch support
- Fallback for non-touch devices

### Dependencies
- @react-three/fiber (^8.0.0)
- @react-three/drei (^9.0.0)
- three (^r128)
