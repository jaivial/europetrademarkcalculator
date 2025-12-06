import { useRef, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import * as THREE from 'three';
import {
  selectedCountryAtom,
  hoveredCountryAtom,
} from '@/atoms/worldMapAtoms';
import { coordinatesToPosition, calculateCentroid } from './countryGeometry';

interface CountryCoordinates {
  lat: number;
  lng: number;
}

export interface CountryHighlightProps {
  countryCode: string;
  coordinates: CountryCoordinates[];
  radius?: number;
}

/**
 * CountryHighlight Component - Visual feedback for hovered/selected countries
 * Renders glow, outline, or color changes to indicate state
 */
export function CountryHighlight({
  countryCode,
  coordinates,
  radius = 1,
}: CountryHighlightProps) {
  const groupRef = useRef<THREE.Group>(null);
  const highlightMeshRef = useRef<THREE.Mesh | null>(null);
  const glowMeshRef = useRef<THREE.Mesh | null>(null);

  // Get state from Jotai atoms
  const selectedCountry = useAtomValue(selectedCountryAtom);
  const hoveredCountry = useAtomValue(hoveredCountryAtom);

  const isSelected = selectedCountry === countryCode;
  const isHovered = hoveredCountry === countryCode;

  // Create highlight geometry
  useEffect(() => {
    if (!groupRef.current) return;

    // Clear previous highlights
    groupRef.current.clear();

    // Calculate country centroid for glow position
    const centroid = calculateCentroid(coordinates);
    const centroidPos = coordinatesToPosition(
      centroid.lat,
      centroid.lng,
      radius * 1.05
    );

    // Hover highlight - outline effect
    if (isHovered) {
      const outlineGeometry = new THREE.SphereGeometry(0.15, 8, 8);
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x4299e1),
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      });

      const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
      outlineMesh.position.copy(centroidPos);
      outlineMesh.scale.set(1, 1, 1);
      groupRef.current.add(outlineMesh);
      highlightMeshRef.current = outlineMesh;
    }

    // Selection highlight - bright glow
    if (isSelected) {
      const glowGeometry = new THREE.SphereGeometry(0.2, 12, 12);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xfbb040),
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });

      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.position.copy(centroidPos);
      groupRef.current.add(glowMesh);
      glowMeshRef.current = glowMesh;

      // Add pulsing animation
      let animationId: number;
      let time = 0;

      const animate = () => {
        time += 0.05;
        if (glowMeshRef.current) {
          const scale = 1 + Math.sin(time) * 0.1;
          glowMeshRef.current.scale.set(scale, scale, scale);
          const material = glowMeshRef.current.material as THREE.MeshBasicMaterial;
          material.opacity = 0.6 + Math.cos(time * 0.5) * 0.2;
        }
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationId);
    }
  }, [isHovered, isSelected, countryCode, coordinates, radius]);

  // Update highlight visibility
  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.visible = isHovered || isSelected;
  }, [isHovered, isSelected]);

  return <group ref={groupRef} />;
}

export default CountryHighlight;
