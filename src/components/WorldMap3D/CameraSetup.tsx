import { Vector3, PerspectiveCamera } from 'three';
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

    if (camera instanceof PerspectiveCamera) {
      camera.fov = mergedConfig.initialFov;
      camera.near = mergedConfig.near;
      camera.far = mergedConfig.far;

      if (mergedConfig.aspect !== undefined) {
        camera.aspect = mergedConfig.aspect;
      }

      camera.updateProjectionMatrix();
    }
  }, [camera, mergedConfig]);

  const resetCamera = useCallback(() => {
    camera.position.set(
      mergedConfig.initialPosition[0],
      mergedConfig.initialPosition[1],
      mergedConfig.initialPosition[2]
    );
    if (camera instanceof PerspectiveCamera) {
      camera.fov = mergedConfig.initialFov;
      camera.updateProjectionMatrix();
    }
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

        if (preset.fov !== undefined && camera instanceof PerspectiveCamera) {
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
