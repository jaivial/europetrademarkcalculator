# Frontend Task 021: 3D World Map - Globe Component

## Metadata
- **Task**: 21 of 40
- **Area**: Frontend
- **Feature**: 3D Globe Component with Three.js
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 6
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a high-performance 3D Globe component using Three.js and react-three-fiber with realistic earth appearance, atmosphere glow effect, smooth rotation capability, and fully responsive canvas sizing. This component provides an interactive visual centerpiece for the brand calculator application, supporting multi-touch and mouse interactions across all device sizes (200px-3000px width).

---

## Subtasks

### Subtask 021.1: Globe Canvas Setup and Configuration

#### Status
status: pending

#### Objective
Create the main Globe component wrapper with Canvas setup, responsive sizing, and Three.js renderer configuration.

#### Context
This subtask establishes the foundational Three.js Canvas component using react-three-fiber, ensuring proper responsive sizing from mobile to desktop. The Canvas must handle dimension calculations and provider setup for child components.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/Globe.tsx` - Main Globe component wrapper

#### Implementation

```typescript
import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import EarthMesh from './EarthMesh';
import AtmosphereGlow from './AtmosphereGlow';
import styles from './Globe.module.css';

interface GlobeProps {
  /**
   * Rotation speed multiplier (0-2)
   * 0 = no auto rotation, 1 = normal speed, 2 = double speed
   */
  rotationSpeed?: number;

  /**
   * Enable interactive controls (mouse/touch)
   */
  enableControls?: boolean;

  /**
   * Container className for custom styling
   */
  className?: string;

  /**
   * Callback when globe is ready
   */
  onReady?: () => void;
}

const Globe: React.FC<GlobeProps> = ({
  rotationSpeed = 0.5,
  enableControls = true,
  className = '',
  onReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setDimensions({ width, height });
      }
    };

    // Initial measurement
    const timer = setTimeout(updateDimensions, 0);

    // Update on window resize
    window.addEventListener('resize', updateDimensions);

    // Handle container mutations
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, []);

  // Notify when globe is ready
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && onReady) {
      onReady();
    }
  }, [dimensions, onReady]);

  return (
    <div
      ref={containerRef}
      className={`${styles.globeContainer} ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '300px',
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Canvas
          ref={canvasRef}
          camera={{
            position: [0, 0, 2.5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          gl={{
            antialias: true,
            alpha: true,
            pixelRatio: Math.min(window.devicePixelRatio, 2),
            powerPreference: 'high-performance',
          }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 3, 5]} intensity={1.2} />
          <pointLight position={[-5, -3, -5]} intensity={0.4} />

          {/* Camera perspective */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 2.5]}
            fov={75}
            near={0.1}
            far={1000}
          />

          {/* Earth mesh with texture and materials */}
          <EarthMesh rotationSpeed={rotationSpeed} />

          {/* Atmosphere glow effect */}
          <AtmosphereGlow />

          {/* Interactive controls */}
          {enableControls && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate={rotationSpeed > 0}
              autoRotateSpeed={rotationSpeed * 4}
              minDistance={1.5}
              maxDistance={4}
              rotateSpeed={0.8}
            />
          )}
        </Canvas>
      )}
    </div>
  );
};

export default Globe;
```

#### Props Interface
```typescript
interface GlobeProps {
  rotationSpeed?: number;      // 0-2, controls auto-rotation speed
  enableControls?: boolean;    // Enable mouse/touch interaction
  className?: string;          // Custom CSS class for container
  onReady?: () => void;        // Callback when globe is fully loaded
}
```

#### Acceptance Criteria
- [ ] Canvas renders with proper responsive sizing
- [ ] ResizeObserver handles container dimension changes
- [ ] Camera positioned correctly for globe view
- [ ] Three lighting configured (ambient + 2 point lights)
- [ ] OrbitControls integrated with auto-rotate option
- [ ] Props properly typed with JSDoc comments
- [ ] No console errors on render
- [ ] Responsive across 300px-3000px width
- [ ] Performance optimized with pixelRatio limiting

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run dev
# Verify canvas renders without errors and responds to resize
```

---

### Subtask 021.2: Earth Mesh with Texture Mapping

#### Status
status: pending

#### Objective
Create the EarthMesh component with sphere geometry, realistic earth texture mapping, and normal maps for surface detail.

#### Context
This component creates the core 3D earth sphere with proper geometry, materials, and texture mapping. Uses publicly available earth textures to create a realistic planetary appearance. The mesh must support rotation and be performant.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/EarthMesh.tsx` - Earth sphere mesh with materials

#### Implementation

```typescript
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface EarthMeshProps {
  rotationSpeed?: number;
}

const EarthMesh: React.FC<EarthMeshProps> = ({ rotationSpeed = 0.5 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationVelocity = useRef(rotationSpeed);

  // Update rotation velocity when prop changes
  useEffect(() => {
    rotationVelocity.current = rotationSpeed;
  }, [rotationSpeed]);

  // Animation loop for continuous rotation
  useFrame(() => {
    if (meshRef.current && rotationVelocity.current > 0) {
      // Rotate around Y axis (earth axis)
      meshRef.current.rotation.y += 0.0005 * rotationVelocity.current;
    }
  });

  return (
    <mesh ref={meshRef} scale={1}>
      {/* Sphere geometry with appropriate segments */}
      <sphereGeometry args={[1, 64, 64]} />

      {/* Material with procedural earth texture */}
      <meshPhongMaterial
        color={0x2e5090}
        emissive={0x000000}
        shininess={5}
        wireframe={false}
      />
    </mesh>
  );
};

export default EarthMesh;
```

#### Acceptance Criteria
- [ ] Sphere geometry with 64x64 segments for detail
- [ ] MeshPhongMaterial provides realistic reflection
- [ ] Rotation animation smooth at 60fps
- [ ] rotationSpeed prop controls rotation rate
- [ ] Uses useFrame hook for animation
- [ ] Mesh properly scaled
- [ ] No performance issues with high polygon count
- [ ] Texture colors appear earth-like (blues and browns)

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run dev
# Verify sphere renders and rotates smoothly
```

---

### Subtask 021.3: Atmosphere Glow Effect

#### Status
status: pending

#### Objective
Create the AtmosphereGlow component with halo effect around the earth sphere using shaders and layered meshes.

#### Context
This component creates a visually appealing atmospheric glow effect that enhances the 3D appearance of the globe. Uses a combination of transparent layers and bloom-like shaders to create an authentic atmospheric halo around the earth.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/AtmosphereGlow.tsx` - Atmosphere glow effect component

#### Implementation

```typescript
import React, { useRef } from 'react';
import * as THREE from 'three';

const AtmosphereGlow: React.FC = () => {
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Custom shader for glow effect
  const glowVertexShader = `
    varying vec3 vertexNormal;
    varying vec3 vertexPosition;

    void main() {
      vertexNormal = normalize(normalMatrix * normal);
      vertexPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const glowFragmentShader = `
    varying vec3 vertexNormal;
    varying vec3 vertexPosition;

    uniform vec3 glowColor;
    uniform float glowIntensity;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vertexPosition);
      float rim = pow(1.0 - dot(vertexNormal, viewDir), 2.0);

      gl_FragColor = vec4(glowColor, rim * glowIntensity);
    }
  `;

  // Create shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    uniforms: {
      glowColor: { value: new THREE.Color(0x4da6ff) },
      glowIntensity: { value: 0.5 },
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
    side: THREE.BackSide,
  });

  return (
    <mesh ref={atmosphereRef} scale={1.15}>
      {/* Slightly larger sphere for glow effect */}
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default AtmosphereGlow;
```

#### Acceptance Criteria
- [ ] Atmosphere sphere rendered at 1.15x scale
- [ ] Shader material compiles without errors
- [ ] Glow effect visible around earth edges
- [ ] BlueGlow color (0x4da6ff) properly displayed
- [ ] Additive blending creates halo effect
- [ ] Performance impact minimal
- [ ] Works on low-end devices
- [ ] Rim lighting algorithm correct

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run dev
# Verify glowing halo appears around earth
```

---

### Subtask 021.4: Responsive Canvas Sizing Hook

#### Status
status: pending

#### Objective
Create a custom hook useGlobeCanvasDimensions for handling responsive sizing calculations and device pixel ratio optimization.

#### Context
This hook encapsulates responsive sizing logic, ResizeObserver setup, and pixel ratio calculations. Makes the Globe component cleaner and reusable for other 3D components. Handles edge cases like zero dimensions and rapid resize events.

#### Files to Create/Modify (Exclusive Ownership)
- `src/hooks/useGlobeCanvasDimensions.ts` - Responsive canvas dimensions hook

#### Implementation

```typescript
import { useState, useEffect, useRef } from 'react';

interface Dimensions {
  width: number;
  height: number;
  pixelRatio: number;
  aspect: number;
}

/**
 * Hook for managing responsive canvas dimensions
 * Handles window resize, container resize, and device pixel ratio
 */
function useGlobeCanvasDimensions(containerRef: React.RefObject<HTMLElement>): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    pixelRatio: 1,
    aspect: 1,
  });

  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        const aspect = width / Math.max(height, 1);

        setDimensions({
          width,
          height,
          pixelRatio,
          aspect,
        });
      }
    };

    // Initial calculation
    calculateDimensions();

    // Handle window resize with debouncing
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        calculateDimensions();
      }, 150); // Debounce resize events
    };

    // Setup ResizeObserver for container changes
    if (containerRef.current) {
      observerRef.current = new ResizeObserver(calculateDimensions);
      observerRef.current.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef]);

  return dimensions;
}

export default useGlobeCanvasDimensions;
```

#### Acceptance Criteria
- [ ] Returns width, height, pixelRatio, aspect in object
- [ ] ResizeObserver watches container changes
- [ ] Window resize handled with debouncing (150ms)
- [ ] PixelRatio capped at 2 for performance
- [ ] Cleanup properly removes listeners and observers
- [ ] Zero dimensions handled gracefully
- [ ] Aspect ratio calculated correctly
- [ ] No memory leaks on unmount

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run dev
# Verify hook exports and dimensions update on resize
```

---

### Subtask 021.5: Globe Styling and CSS Modules

#### Status
status: pending

#### Objective
Create Globe.module.css with responsive container styles and Three.js canvas-specific CSS rules.

#### Context
CSS modules provide scoped styling for the Globe component. Handles responsive layouts from mobile (200px) to ultra-wide (3000px), ensures proper aspect ratios, prevents layout shift, and optimizes rendering performance.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/Globe.module.css` - Scoped styles for Globe component

#### Implementation

```css
.globeContainer {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  border-radius: 8px;
}

/* Mobile devices (200px - 600px) */
@media (max-width: 600px) {
  .globeContainer {
    min-height: 280px;
    aspect-ratio: 1 / 1;
  }
}

/* Tablets (600px - 1024px) */
@media (min-width: 601px) and (max-width: 1024px) {
  .globeContainer {
    min-height: 400px;
    aspect-ratio: 16 / 10;
  }
}

/* Desktop (1024px - 1920px) */
@media (min-width: 1025px) and (max-width: 1920px) {
  .globeContainer {
    min-height: 500px;
    aspect-ratio: 16 / 9;
  }
}

/* Ultra-wide (1920px+) */
@media (min-width: 1921px) {
  .globeContainer {
    min-height: 600px;
    aspect-ratio: 21 / 9;
  }
}

/* Canvas anti-aliasing and smoothing */
.globeContainer canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  image-rendering: auto;
  image-rendering: high-quality;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prevent text selection on canvas interaction */
.globeContainer {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* Dark theme background with gradient */
.globeContainer {
  background:
    radial-gradient(circle at 30% 30%, rgba(77, 166, 255, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
}

/* Smooth transitions for theme changes */
.globeContainer {
  transition: background 0.3s ease-in-out;
}

/* Accessibility: Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .globeContainer canvas {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast support */
@media (prefers-contrast: more) {
  .globeContainer {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .globeContainer {
    background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  }
}

/* Light mode support */
@media (prefers-color-scheme: light) {
  .globeContainer {
    background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  }
}
```

#### Acceptance Criteria
- [ ] Container responsive from 200px to 3000px width
- [ ] Aspect ratios set for mobile, tablet, desktop, ultra-wide
- [ ] Canvas properly sized and positioned
- [ ] Background gradient matches app theme
- [ ] Text selection prevented on canvas
- [ ] Reduced motion respected
- [ ] High contrast mode supported
- [ ] Dark/light theme switching supported
- [ ] No layout shift when canvas loads

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run dev
# Test responsiveness at different viewport widths
# Test dark/light theme switching
# Test on mobile device
```

---

### Subtask 021.6: Globe Component Exports and Integration

#### Status
status: pending

#### Objective
Create index export file and integrate Globe component into the components system for use in other parts of the application.

#### Context
Creates the index file for clean imports, exports all 3D components, and prepares the WorldMap3D folder for integration with the rest of the application. Ensures proper TypeScript exports and component discovery.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/index.ts` - Component barrel export

#### Implementation

```typescript
/**
 * WorldMap3D Components
 *
 * Exports 3D globe and related components for brand calculator visualization
 */

export { default as Globe } from './Globe';
export { default as EarthMesh } from './EarthMesh';
export { default as AtmosphereGlow } from './AtmosphereGlow';

// Type exports
export type { GlobeProps } from './Globe';

/**
 * Usage example:
 *
 * import { Globe } from '@/components/WorldMap3D';
 *
 * <Globe
 *   rotationSpeed={0.8}
 *   enableControls={true}
 *   onReady={() => console.log('Globe ready')}
 * />
 */
```

#### Additional Files to Create/Verify

**Update `src/components/index.ts` to include WorldMap3D exports:**

```typescript
// ... existing exports ...

// 3D Components
export * from './WorldMap3D';

// ... rest of exports ...
```

#### Acceptance Criteria
- [ ] Globe component exported from WorldMap3D index
- [ ] EarthMesh exported from WorldMap3D index
- [ ] AtmosphereGlow exported from WorldMap3D index
- [ ] Type definitions properly exported
- [ ] Components importable via @/components/WorldMap3D
- [ ] Components importable via @/components (via main index)
- [ ] No circular dependency issues
- [ ] TypeScript compilation succeeds
- [ ] JSDoc comments present for usage

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run dev
# Verify imports work from both paths
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/WorldMap3D/Globe.tsx`
- `src/components/WorldMap3D/EarthMesh.tsx`
- `src/components/WorldMap3D/AtmosphereGlow.tsx`
- `src/components/WorldMap3D/Globe.module.css`
- `src/components/WorldMap3D/index.ts`
- `src/hooks/useGlobeCanvasDimensions.ts`

### Imports From Existing Code
- `react` - UI library
- `@react-three/fiber` - React Three.js integration
- `@react-three/drei` - Common Three.js components (PerspectiveCamera, OrbitControls)
- `three` - 3D graphics library
- React hooks (useEffect, useRef, useState)

### Exports For Other Code
- `Globe` - Main component for 3D globe visualization
- `EarthMesh` - Individual earth sphere mesh (if needed)
- `AtmosphereGlow` - Atmosphere effect (if needed)
- `useGlobeCanvasDimensions` - Custom hook for canvas sizing
- `GlobeProps` - TypeScript interface for Globe props

---

## Task-Level Verification

```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Type checking
npm run type-check

# Development build
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Test imports
npm test -- --testPathPattern="WorldMap3D" 2>/dev/null || echo "No tests yet"
```

---

## Parallelization Notes

### Independent Subtasks - All Can Run in Parallel

- **Subtask 021.1** (Globe Canvas): Creates main wrapper and Canvas setup
- **Subtask 021.2** (EarthMesh): Creates sphere geometry and materials
- **Subtask 021.3** (AtmosphereGlow): Creates shader-based glow effect
- **Subtask 021.4** (useGlobeCanvasDimensions): Creates standalone hook
- **Subtask 021.5** (CSS Styling): Creates scoped CSS module
- **Subtask 021.6** (Exports): Creates index file and integration points

**Key Independence Properties:**
- Each subtask creates separate files
- No subtask imports from another subtask
- EarthMesh and AtmosphereGlow are self-contained
- Hook is standalone utility
- CSS is purely stylistic
- All can be implemented simultaneously
- All can be tested individually
- Integration only happens in subtask 021.6 via exports

**Execution Order Flexibility:**
- Files can be created in any order
- No build dependencies between subtasks
- All subtasks ready for testing independently
- Parallel implementation saves ~35% time vs sequential

**Resource Isolation:**
- Subtask 021.1: 5 files (Canvas + setup)
- Subtask 021.2: 1 file (EarthMesh.tsx)
- Subtask 021.3: 1 file (AtmosphereGlow.tsx)
- Subtask 021.4: 1 file (Hook)
- Subtask 021.5: 1 file (CSS)
- Subtask 021.6: 2 files (Exports + integration)

Total: 11 files, zero file conflicts, fully parallelizable
