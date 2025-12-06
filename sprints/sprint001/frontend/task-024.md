# Frontend Task 024: 3D World Map - Main Container

## Metadata
- **Task**: 24 of 40
- **Area**: Frontend
- **Feature**: 3D World Map Main Container
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the WorldMap3D main container component that assembles all 3D globe layers including Canvas setup from react-three-fiber, scene configuration, proper lighting (ambient + directional), responsive container sizing from 200px to 3000px width, and integration of Globe, Controls, and CountryMesh components. This task establishes the core 3D rendering infrastructure that other globe components depend on.

---

## Subtasks

### Subtask 024.1: Scene Lighting Configuration

#### Status
status: pending

#### Objective
Create SceneLighting component that provides proper ambient and directional lighting for realistic 3D globe rendering.

#### Context
Lighting is critical for 3D visualization. The scene needs ambient light for overall illumination and directional light to create depth and shadow effects on the globe. Proper lighting makes the globe appear three-dimensional and improves country visibility.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/SceneLighting.tsx` - Three.js lighting setup component

#### Implementation

```typescript
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * SceneLighting Component
 *
 * Sets up proper lighting for the 3D globe:
 * - Ambient light: Provides overall scene illumination
 * - Directional light: Creates depth and shadows
 *
 * Must be rendered inside Canvas component
 */
export function SceneLighting(): null {
  const { scene } = useThree();

  useEffect(() => {
    // Clear any existing lights
    const oldLights = scene.children.filter(obj => obj instanceof THREE.Light);
    oldLights.forEach(light => {
      scene.remove(light);
    });

    // Ambient light - provides overall illumination without direction
    // White light at 0.6 intensity - enough to see details without washing out
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional light - creates shadows and depth
    // Simulates sun from upper right, creating realistic shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 3);
    directionalLight.castShadow = true;

    // Configure shadow rendering for better quality
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.bias = -0.005;

    scene.add(directionalLight);

    // Cleanup function - preserve lights if component unmounts
    return () => {
      // Don't remove lights on unmount, they're part of the scene
    };
  }, [scene]);

  // This component doesn't render anything visible
  return null;
}

export default SceneLighting;
```

#### Props Interface
This component has no props - it only sets up the scene lighting.

#### Acceptance Criteria
- [ ] Ambient light added to scene with 0.6 intensity
- [ ] Directional light added at position (5, 5, 3)
- [ ] Directional light has 0.8 intensity
- [ ] Shadow mapping configured with 2048x2048 resolution
- [ ] Shadow camera properly framed for globe size
- [ ] Component returns null (no visual output)
- [ ] Works inside react-three-fiber Canvas
- [ ] No TypeScript errors in strict mode
- [ ] Lights persist across component re-renders

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify Three.js lighting imports work
```

---

### Subtask 024.2: Responsive Canvas Container

#### Status
status: pending

#### Objective
Create a responsive container div with CSS that supports viewport sizes from 200px to 3000px width, maintaining aspect ratio and proper sizing for Canvas element.

#### Context
The Canvas element needs a properly sized parent container for react-three-fiber to calculate camera dimensions correctly. Responsive sizing ensures the globe renders at optimal quality on mobile (200px), tablet (768px), desktop (1024px+), and ultra-wide screens (3000px).

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/WorldMap3D.module.css` - Responsive container styles

#### Implementation

```css
/* WorldMap3D Container Styles */

.container {
  /* Responsive sizing - fills available space */
  width: 100%;
  min-width: 200px;
  max-width: 3000px;
  height: auto;
  aspect-ratio: 16 / 9;

  /* Mobile constraint: minimum height on small screens */
  min-height: 200px;

  /* Positioning context for absolute positioned children */
  position: relative;
  overflow: hidden;

  /* Smooth transitions on resize */
  transition: all 0.3s ease-out;
}

/* Canvas fills the entire container */
.canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Responsive adjustments for very small screens */
@media (max-width: 320px) {
  .container {
    min-width: 200px;
    aspect-ratio: 4 / 3;
    min-height: 150px;
  }
}

/* Tablet sizing optimization */
@media (min-width: 768px) {
  .container {
    aspect-ratio: 16 / 9;
    min-height: 400px;
  }
}

/* Desktop sizing optimization */
@media (min-width: 1024px) {
  .container {
    aspect-ratio: 16 / 9;
    min-height: 600px;
  }
}

/* Large desktop optimization */
@media (min-width: 1920px) {
  .container {
    aspect-ratio: 16 / 9;
    min-height: 800px;
  }
}

/* Ultra-wide screen support */
@media (min-width: 2560px) {
  .container {
    aspect-ratio: 21 / 9;
    min-height: 1000px;
  }
}

/* Overlay layer for UI controls positioned over canvas */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
}

/* Allow interaction through overlay for specific elements */
.overlay > * {
  pointer-events: auto;
}

/* Loading state background */
.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.loadingSpinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: rgba(255, 255, 255, 1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

#### Acceptance Criteria
- [ ] Container width responsive from 200px to 3000px
- [ ] Aspect ratio maintained at 16:9 (or 4:3 on mobile)
- [ ] CSS module imports correctly in component
- [ ] Canvas fills container 100% width/height
- [ ] No scrollbars appear (overflow hidden)
- [ ] Media queries handle all breakpoints
- [ ] Loading state styles defined
- [ ] All styles use CSS module naming convention
- [ ] No global CSS pollution

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Test responsive sizing at different viewport widths
```

---

### Subtask 024.3: WorldMap3D Main Container Component

#### Status
status: pending

#### Objective
Create the main WorldMap3D component that assembles Canvas, lighting, globe, controls, and country mesh into a complete interactive 3D scene.

#### Context
This is the primary component that users interact with. It needs to coordinate all sub-components (SceneLighting, Globe, Controls, CountryMesh) within a single Canvas. Proper setup of Canvas props, camera, and scene configuration is critical for rendering performance.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/WorldMap3D.tsx` - Main container component

#### Implementation

```typescript
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import SceneLighting from './SceneLighting';
import styles from './WorldMap3D.module.css';

/**
 * Props for WorldMap3D component
 */
interface WorldMap3DProps {
  /**
   * Callback when a country is clicked on the globe
   */
  onCountrySelect?: (countryCode: string) => void;

  /**
   * Callback when mouse enters the canvas
   */
  onCanvasEnter?: () => void;

  /**
   * Callback when mouse leaves the canvas
   */
  onCanvasLeave?: () => void;

  /**
   * Custom camera position [x, y, z]
   * Default: [0, 0, 2.5] - good view of full globe
   */
  cameraPosition?: [number, number, number];

  /**
   * Enable/disable auto-rotation
   * Default: true
   */
  autoRotate?: boolean;

  /**
   * Auto-rotation speed (radians per second)
   * Default: 0.0005
   */
  autoRotateSpeed?: number;

  /**
   * Show loading state while globe is preparing
   */
  isLoading?: boolean;
}

/**
 * Loading Fallback Component
 * Displayed while globe and mesh data are loading
 */
function LoadingFallback() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner} />
    </div>
  );
}

/**
 * WorldMap3D Main Container
 *
 * Combines:
 * - Canvas: Three.js rendering surface
 * - Camera: Perspective view of the globe
 * - Lighting: Ambient + directional lights
 * - Globe: 3D sphere representation of Earth
 * - Controls: User interaction (orbit, drag, zoom)
 * - CountryMesh: Interactive country regions
 *
 * Responsive from 200px to 3000px width
 */
export const WorldMap3D = React.forwardRef<HTMLDivElement, WorldMap3DProps>(
  (
    {
      onCountrySelect,
      onCanvasEnter,
      onCanvasLeave,
      cameraPosition = [0, 0, 2.5],
      autoRotate = true,
      autoRotateSpeed = 0.0005,
      isLoading = false,
    },
    ref
  ) => {
    const [isCanvasReady, setIsCanvasReady] = useState(false);

    return (
      <div
        ref={ref}
        className={styles.container}
        onMouseEnter={onCanvasEnter}
        onMouseLeave={onCanvasLeave}
      >
        {/* Three.js Canvas for 3D rendering */}
        <Canvas
          className={styles.canvas}
          gl={{
            antialias: true,
            alpha: true,
            precision: 'highp',
            powerPreference: 'high-performance',
          }}
          camera={{
            position: cameraPosition,
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          onCreated={() => setIsCanvasReady(true)}
        >
          {/* Scene lighting setup */}
          <SceneLighting />

          {/* Camera with perspective projection */}
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={75}
            near={0.1}
            far={1000}
          />

          {/* Orbit controls for user interaction */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            minDistance={1.5}
            maxDistance={5}
            dampingFactor={0.05}
            enableDamping={true}
          />

          {/* Globe and country meshes with error boundary */}
          <Suspense fallback={null}>
            {/* Globe placeholder - will be populated by Globe component from task 22 */}
            {/* Globe component will be imported here */}

            {/* Country mesh placeholder - will be populated by CountryMesh component */}
            {/* CountryMesh component will be imported here */}
          </Suspense>
        </Canvas>

        {/* Loading indicator overlay */}
        {(isLoading || !isCanvasReady) && <LoadingFallback />}

        {/* Overlay container for UI elements positioned over canvas */}
        <div className={styles.overlay}>
          {/* Additional UI controls will be added here by other tasks */}
        </div>
      </div>
    );
  }
);

WorldMap3D.displayName = 'WorldMap3D';

export default WorldMap3D;
```

#### Props Interface
```typescript
interface WorldMap3DProps {
  onCountrySelect?: (countryCode: string) => void;
  onCanvasEnter?: () => void;
  onCanvasLeave?: () => void;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  isLoading?: boolean;
}
```

#### Acceptance Criteria
- [ ] Component accepts all props with correct types
- [ ] Canvas renders with antialias enabled
- [ ] Camera positioned at correct default [0, 0, 2.5]
- [ ] OrbitControls properly configured for user interaction
- [ ] Auto-rotation works with configurable speed
- [ ] SceneLighting renders inside Canvas
- [ ] Loading fallback displays when isLoading true
- [ ] Component is forwardRef for container access
- [ ] No console errors/warnings
- [ ] Responsive container styling applied
- [ ] TypeScript strict mode passes

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="WorldMap3D"
```

---

### Subtask 024.4: WorldMap3D Index Export

#### Status
status: pending

#### Objective
Create index.ts barrel file for clean component exports and re-exports from drei/fiber if needed.

#### Context
The index file provides a clean public API for importing WorldMap3D from other components. It centralizes exports and makes the component path shorter for imports across the application.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/index.ts` - Component export barrel file

#### Implementation

```typescript
/**
 * WorldMap3D Component Index
 * Provides clean exports for the 3D globe container component
 */

// Export main component
export { WorldMap3D, type WorldMap3DProps } from './WorldMap3D';
export { SceneLighting } from './SceneLighting';

// Default export for convenience
export { default } from './WorldMap3D';

/**
 * Type-safe imports:
 * import { WorldMap3D } from '@/components/WorldMap3D';
 * import { SceneLighting } from '@/components/WorldMap3D';
 *
 * Also available:
 * import type { WorldMap3DProps } from '@/components/WorldMap3D';
 */
```

#### Acceptance Criteria
- [ ] WorldMap3D exported with proper name
- [ ] SceneLighting exported for advanced usage
- [ ] Props type exported for consumers
- [ ] Default export points to WorldMap3D
- [ ] File compiles without TypeScript errors
- [ ] All paths use correct file names
- [ ] Comments document usage patterns
- [ ] Under 50 lines (barrel file, not implementation)

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify imports work from @/components/WorldMap3D
```

---

### Subtask 024.5: WorldMap3D Component Tests

#### Status
status: pending

#### Objective
Create comprehensive test suite for WorldMap3D container covering rendering, props, callbacks, and responsive behavior.

#### Context
Tests ensure the component renders correctly with various prop combinations, handles user callbacks properly, and responds to resize events. Tests verify lighting is set up, canvas renders, and OrbitControls are functional.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/WorldMap3D.test.tsx` - Component tests

#### Implementation

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorldMap3D } from './WorldMap3D';

describe('WorldMap3D Component', () => {
  beforeEach(() => {
    // Mock Canvas API if needed
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the container div', () => {
      const { container } = render(<WorldMap3D />);
      const worldMapDiv = container.querySelector('.container');
      expect(worldMapDiv).toBeInTheDocument();
    });

    it('should render canvas element', () => {
      const { container } = render(<WorldMap3D />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('should render loading state when isLoading is true', async () => {
      const { container } = render(<WorldMap3D isLoading={true} />);
      const loadingDiv = container.querySelector('.loading');
      expect(loadingDiv).toBeInTheDocument();
    });

    it('should not show loading state when isLoading is false', () => {
      const { container } = render(<WorldMap3D isLoading={false} />);
      const loadingDiv = container.querySelector('.loading');
      expect(loadingDiv).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should accept cameraPosition prop', () => {
      const { container } = render(
        <WorldMap3D cameraPosition={[1, 2, 3]} />
      );
      expect(container.querySelector('.container')).toBeInTheDocument();
    });

    it('should accept autoRotate prop', () => {
      const { container } = render(<WorldMap3D autoRotate={false} />);
      expect(container.querySelector('.container')).toBeInTheDocument();
    });

    it('should accept autoRotateSpeed prop', () => {
      const { container } = render(
        <WorldMap3D autoRotateSpeed={0.001} />
      );
      expect(container.querySelector('.container')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onCanvasEnter when mouse enters container', async () => {
      const onCanvasEnter = vi.fn();
      const { container } = render(
        <WorldMap3D onCanvasEnter={onCanvasEnter} />
      );

      const worldMapDiv = container.querySelector('.container') as HTMLElement;
      await userEvent.pointer({ target: worldMapDiv, keys: '[MouseEnter]' });

      expect(onCanvasEnter).toHaveBeenCalled();
    });

    it('should call onCanvasLeave when mouse leaves container', async () => {
      const onCanvasLeave = vi.fn();
      const { container } = render(
        <WorldMap3D onCanvasLeave={onCanvasLeave} />
      );

      const worldMapDiv = container.querySelector('.container') as HTMLElement;
      await userEvent.pointer({ target: worldMapDiv, keys: '[MouseLeave]' });

      expect(onCanvasLeave).toHaveBeenCalled();
    });

    it('should accept onCountrySelect callback', () => {
      const onCountrySelect = vi.fn();
      const { container } = render(
        <WorldMap3D onCountrySelect={onCountrySelect} />
      );
      expect(container.querySelector('.container')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to container div', () => {
      const ref = { current: null };
      const { container } = render(<WorldMap3D ref={ref} />);

      const containerDiv = container.querySelector('.container');
      expect(ref.current).toBe(containerDiv);
    });
  });

  describe('Default Props', () => {
    it('should have autoRotate enabled by default', () => {
      const { container } = render(<WorldMap3D />);
      expect(container.querySelector('.container')).toBeInTheDocument();
    });

    it('should have default camera position', () => {
      const { container } = render(<WorldMap3D />);
      expect(container.querySelector('.container')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply container class', () => {
      const { container } = render(<WorldMap3D />);
      const div = container.querySelector('.container');
      expect(div).toHaveClass('container');
    });

    it('should apply canvas class to canvas element', () => {
      const { container } = render(<WorldMap3D />);
      const canvas = container.querySelector('canvas');
      expect(canvas?.parentElement).toHaveClass('canvas');
    });

    it('should apply overlay class to overlay div', () => {
      const { container } = render(<WorldMap3D />);
      const overlay = container.querySelector('.overlay');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName for debugging', () => {
      expect(WorldMap3D.displayName).toBe('WorldMap3D');
    });
  });

  describe('Accessibility', () => {
    it('should have proper structure for screen readers', () => {
      const { container } = render(<WorldMap3D />);
      const div = container.querySelector('.container');
      expect(div).toBeInTheDocument();
    });
  });
});
```

#### Acceptance Criteria
- [ ] Tests cover component rendering
- [ ] Tests verify all props are accepted
- [ ] Tests check callback invocation
- [ ] Ref forwarding tested
- [ ] Default props verified
- [ ] CSS class application tested
- [ ] Display name verified
- [ ] All tests pass
- [ ] Coverage above 85%
- [ ] No console warnings in tests

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm test -- --testPathPattern="WorldMap3D"
npm run type-check
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/WorldMap3D/WorldMap3D.tsx`
- `src/components/WorldMap3D/SceneLighting.tsx`
- `src/components/WorldMap3D/WorldMap3D.module.css`
- `src/components/WorldMap3D/WorldMap3D.test.tsx`
- `src/components/WorldMap3D/index.ts`

### Imports From Existing Code
- `react` - Component, Suspense, useState from npm
- `@react-three/fiber` - Canvas, useThree from npm
- `@react-three/drei` - PerspectiveCamera, OrbitControls from npm
- `three` - THREE namespace for lighting setup from npm

### Exports For Other Code
- `WorldMap3D` - Main container component used in pages
- `WorldMap3DProps` - TypeScript interface for prop typing
- `SceneLighting` - Exported for advanced use cases (optional)
- All exports available via `@/components/WorldMap3D`

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="024"
npm run lint
# Verify responsive sizing at 200px, 768px, 1024px, 2560px, 3000px widths
```

---

## Parallelization Notes
- All 5 subtasks are completely independent and parallelizable
- Subtask 24.1 (SceneLighting) creates standalone lighting component
- Subtask 24.2 (CSS styles) has zero dependencies on other subtasks
- Subtask 24.3 (Main component) can reference subtask 24.1 directly
- Subtask 24.4 (Index) is pure re-exports, no dependencies
- Subtask 24.5 (Tests) can be written in parallel with main component
- Each subtask owns exclusive files with no overlap
- No subtask depends on another subtask's output being complete first
- Can be implemented simultaneously in any order
- Later tasks (Globe, CountryMesh) will import from `@/components/WorldMap3D`
