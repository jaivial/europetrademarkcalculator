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
