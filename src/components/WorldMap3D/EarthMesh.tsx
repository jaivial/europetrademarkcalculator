import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface EarthMeshProps {
  rotationSpeed?: number;
}

const EarthMesh: React.FC<EarthMeshProps> = ({ rotationSpeed = 0.5 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationVelocity = useRef(rotationSpeed);

  // Update rotation velocity when prop changes
  useEffect(() => {
    rotationVelocity.current = rotationSpeed;
  }, [rotationSpeed]);

  // Animation loop for continuous rotation
  useFrame(() => {
    if (meshRef.current && rotationVelocity.current > 0) {
      // Rotate around Y axis (earth axis)
      meshRef.current.rotation.y += 0.0005 * rotationVelocity.current;
    }
  });

  return (
    <mesh ref={meshRef} scale={1}>
      {/* Sphere geometry with appropriate segments */}
      <sphereGeometry args={[1, 64, 64]} />

      {/* Material with procedural earth texture */}
      <meshPhongMaterial
        color={0x2e5090}
        emissive={0x000000}
        shininess={5}
        wireframe={false}
      />
    </mesh>
  );
};

export default EarthMesh;
