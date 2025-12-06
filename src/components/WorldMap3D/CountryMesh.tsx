import { useRef, useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import * as THREE from 'three';
import {
  selectedCountryAtom,
  hoveredCountryAtom,
} from '@/atoms/worldMapAtoms';
import { coordinatesToPosition } from './countryGeometry';

interface CountryCoordinates {
  lat: number;
  lng: number;
}

export interface CountryMeshProps {
  countryCode: string;
  countryName: string;
  coordinates: CountryCoordinates[];
  radius?: number;
  meshRef?: React.RefObject<THREE.Group>;
}

/**
 * CountryMesh Component - Renders a clickable country on the 3D globe
 * Uses Jotai for state management (no useState)
 */
export function CountryMesh({
  countryCode,
  countryName,
  coordinates,
  radius = 1,
  meshRef,
}: CountryMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Jotai state atoms
  const setSelectedCountry = useSetAtom(selectedCountryAtom);
  const setHoveredCountry = useSetAtom(hoveredCountryAtom);
  const hoveredCountry = useAtomValue(hoveredCountryAtom);
  const selectedCountry = useAtomValue(selectedCountryAtom);

  // Create country geometry and material
  useEffect(() => {
    if (!groupRef.current) return;

    // Clear existing meshes
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    groupRef.current.clear();
    meshRefs.current = [];

    // Create material for country
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x4a5568),
      emissive: new THREE.Color(0x2d3748),
      shininess: 30,
      wireframe: false,
    });

    // Create individual vertex groups as separate meshes for better interaction
    for (let i = 0; i < coordinates.length - 2; i++) {
      const geometry = new THREE.BufferGeometry();

      const triangleCoords = [
        coordinates[0],
        coordinates[i + 1],
        coordinates[i + 2],
      ];

      const positions: number[] = [];
      const normals: number[] = [];

      triangleCoords.forEach((coord) => {
        const pos = coordinatesToPosition(coord.lat, coord.lng, radius);
        positions.push(pos.x, pos.y, pos.z);

        const normal = pos.clone().normalize();
        normals.push(normal.x, normal.y, normal.z);
      });

      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), 3)
      );
      geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), 3)
      );

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = {
        countryCode,
        countryName,
        isCountryMesh: true,
      };

      groupRef.current.add(mesh);
      meshRefs.current.push(mesh);
    }

    // Assign to external ref if provided
    if (meshRef && groupRef.current) {
      // TypeScript readonly workaround - we're intentionally setting this ref
      (meshRef as React.MutableRefObject<THREE.Group | null>).current = groupRef.current;
    }
  }, [countryCode, countryName, coordinates, radius, meshRef]);

  // Handle mouse move for hover detection
  const handleMouseMove = (event: MouseEvent) => {
    if (!groupRef.current) return;

    // Normalize mouse position to [-1, 1]
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    mouseRef.current.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    mouseRef.current.y = -(event.clientY - rect.top) / rect.height * 2 + 1;

    // Perform raycasting
    const camera = (window as any).__THREE_CAMERA;
    if (!camera) return;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const intersects = raycasterRef.current.intersectObjects(
      meshRefs.current,
      false
    );

    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      if (mesh.userData?.countryCode === countryCode) {
        setHoveredCountry(countryCode);
      }
    } else {
      if (hoveredCountry === countryCode) {
        setHoveredCountry(null);
      }
    }
  };

  // Handle click for selection
  const handleClick = (event: MouseEvent) => {
    if (!groupRef.current) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    mouseRef.current.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    mouseRef.current.y = -(event.clientY - rect.top) / rect.height * 2 + 1;

    const camera = (window as any).__THREE_CAMERA;
    if (!camera) return;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const intersects = raycasterRef.current.intersectObjects(
      meshRefs.current,
      false
    );

    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      if (mesh.userData?.countryCode === countryCode) {
        // Toggle selection
        if (selectedCountry === countryCode) {
          setSelectedCountry(null);
        } else {
          setSelectedCountry(countryCode);
        }
      }
    }
  };

  // Attach event listeners
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [countryCode, hoveredCountry, selectedCountry]);

  return <group ref={groupRef} />;
}

export default CountryMesh;
