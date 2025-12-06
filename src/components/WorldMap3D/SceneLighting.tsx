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
