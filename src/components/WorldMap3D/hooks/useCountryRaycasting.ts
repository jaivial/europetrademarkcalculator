import { useRef, useCallback } from 'react';
import * as THREE from 'three';

export interface RaycastOptions {
  camera?: THREE.Camera;
  recursive?: boolean;
}

export function useCountryRaycasting(options: RaycastOptions = {}) {
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  const updateMousePosition = useCallback(
    (event: MouseEvent | { clientX: number; clientY: number }) => {
      if (!event) return;

      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y =
        -(event.clientY - rect.top) / rect.height * 2 + 1;
    },
    []
  );

  const raycast = useCallback(
    (objects: THREE.Object3D[], camera: THREE.Camera) => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      return raycasterRef.current.intersectObjects(
        objects,
        options.recursive ?? false
      );
    },
    [options.recursive]
  );

  const getMousePosition = useCallback(() => {
    return mouseRef.current.clone();
  }, []);

  return {
    raycaster: raycasterRef.current,
    mousePosition: mouseRef.current,
    updateMousePosition,
    raycast,
    getMousePosition,
  };
}
