import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import EarthMesh from './EarthMesh';
import AtmosphereGlow from './AtmosphereGlow';
import styles from './Globe.module.css';

export interface GlobeProps {
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
