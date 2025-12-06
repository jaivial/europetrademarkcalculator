import React, { useRef } from 'react';
import * as THREE from 'three';

const AtmosphereGlow: React.FC = () => {
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Custom shader for glow effect
  const glowVertexShader = `
    varying vec3 vertexNormal;
    varying vec3 vertexPosition;

    void main() {
      vertexNormal = normalize(normalMatrix * normal);
      vertexPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const glowFragmentShader = `
    varying vec3 vertexNormal;
    varying vec3 vertexPosition;

    uniform vec3 glowColor;
    uniform float glowIntensity;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vertexPosition);
      float rim = pow(1.0 - dot(vertexNormal, viewDir), 2.0);

      gl_FragColor = vec4(glowColor, rim * glowIntensity);
    }
  `;

  // Create shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    uniforms: {
      glowColor: { value: new THREE.Color(0x4da6ff) },
      glowIntensity: { value: 0.5 },
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
    side: THREE.BackSide,
  });

  return (
    <mesh ref={atmosphereRef} scale={1.15}>
      {/* Slightly larger sphere for glow effect */}
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default AtmosphereGlow;
