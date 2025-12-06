import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import SceneLighting from './SceneLighting';
import EarthMesh from './EarthMesh';
import AtmosphereGlow from './AtmosphereGlow';
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
            {/* Earth sphere mesh with rotation */}
            <EarthMesh rotationSpeed={autoRotate ? 1 : 0} />

            {/* Atmosphere glow effect around the globe */}
            <AtmosphereGlow />
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
export type { WorldMap3DProps };
