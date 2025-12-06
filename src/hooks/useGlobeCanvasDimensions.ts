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

  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
