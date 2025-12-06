import { useEffect, useRef, useCallback, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { clampZoom, calculateZoomDelta } from './controlUtils';

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
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
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

      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);

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
