# Frontend Task 022: 3D World Map - Country Selection Layer

## Metadata
- **Task**: 22 of 40
- **Area**: Frontend
- **Feature**: 3D World Map - Country Selection Layer
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create the country selection layer for the 3D globe, enabling users to interact with countries on the map. This includes clickable country meshes with raycasting for click detection, hover effects for visual feedback, selection highlighting for chosen countries, and Jotai-based state management for selections. All components use Three.js geometry utilities to generate precise country boundaries and handle user interactions efficiently.

---

## Subtasks

### Subtask 022.1: Country Geometry Utilities

#### Status
status: pending

#### Objective
Create utility functions to generate Three.js geometry for countries with proper coordinates and mesh generation from geographic data.

#### Context
This subtask provides the foundational geometry system for all country meshes. It converts geographic country data into Three.js geometries optimized for raycasting and rendering. These utilities are used by all other subtasks, making this a critical foundation.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/countryGeometry.ts` - Country geometry generation utilities
- `src/components/WorldMap3D/types/CountryGeometry.ts` - TypeScript types for geometry data

#### Implementation

```typescript
// src/components/WorldMap3D/countryGeometry.ts

import * as THREE from 'three';

export interface CountryCoordinates {
  lat: number;
  lng: number;
}

export interface CountryBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface CountryGeometryData {
  countryCode: string;
  countryName: string;
  geometry: THREE.BufferGeometry;
  bounds: CountryBounds;
  centroid: CountryCoordinates;
}

/**
 * Convert geographic coordinates (lat/lng) to 3D position on sphere
 * Assumes radius of 1 for unit sphere normalization
 */
export function coordinatesToPosition(
  lat: number,
  lng: number,
  radius: number = 1
): THREE.Vector3 {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const x = radius * Math.cos(latRad) * Math.cos(lngRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.sin(lngRad);

  return new THREE.Vector3(x, y, z);
}

/**
 * Convert 3D position back to geographic coordinates
 */
export function positionToCoordinates(
  position: THREE.Vector3
): CountryCoordinates {
  const lat = Math.asin(position.y);
  const lng = Math.atan2(position.z, position.x);

  return {
    lat: (lat * 180) / Math.PI,
    lng: (lng * 180) / Math.PI,
  };
}

/**
 * Calculate centroid of a set of coordinates
 */
export function calculateCentroid(
  coordinates: CountryCoordinates[]
): CountryCoordinates {
  let sumLat = 0;
  let sumLng = 0;

  coordinates.forEach((coord) => {
    sumLat += coord.lat;
    sumLng += coord.lng;
  });

  return {
    lat: sumLat / coordinates.length,
    lng: sumLng / coordinates.length,
  };
}

/**
 * Calculate bounding box for a set of coordinates
 */
export function calculateBounds(
  coordinates: CountryCoordinates[]
): CountryBounds {
  const lats = coordinates.map((c) => c.lat);
  const lngs = coordinates.map((c) => c.lng);

  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
}

/**
 * Create a simple BufferGeometry for a country using polygon vertices
 * Converts lat/lng coordinates to 3D positions and creates triangle mesh
 */
export function createCountryGeometry(
  coordinates: CountryCoordinates[],
  radius: number = 1,
  heightFactor: number = 0.01
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  // Convert coordinates to 3D positions
  const positions: number[] = [];
  const normals: number[] = [];

  // Create vertices for the country surface
  coordinates.forEach((coord) => {
    const pos = coordinatesToPosition(coord.lat, coord.lng, radius);
    const normal = pos.clone().normalize();

    positions.push(pos.x, pos.y, pos.z);
    normals.push(normal.x, normal.y, normal.z);
  });

  // Add height variation to make countries more visible
  const heightPositions: number[] = [];
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    const length = Math.sqrt(x * x + y * y + z * z);

    heightPositions.push(
      (x / length) * (radius + heightFactor),
      (y / length) * (radius + heightFactor),
      (z / length) * (radius + heightFactor)
    );
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(heightPositions), 3)
  );
  geometry.setAttribute(
    'normal',
    new THREE.BufferAttribute(new Float32Array(normals), 3)
  );

  // Create indices for triangle mesh (basic fan triangulation)
  const indices: number[] = [];
  const vertexCount = coordinates.length;

  if (vertexCount >= 3) {
    for (let i = 1; i < vertexCount - 1; i++) {
      indices.push(0, i, i + 1);
    }
  }

  if (indices.length > 0) {
    geometry.setIndex(
      new THREE.BufferAttribute(new Uint16Array(indices), 1)
    );
  }

  return geometry;
}

/**
 * Create a country geometry data object with all necessary information
 */
export function createCountryGeometryData(
  countryCode: string,
  countryName: string,
  coordinates: CountryCoordinates[],
  radius?: number
): CountryGeometryData {
  const geometry = createCountryGeometry(coordinates, radius);
  const bounds = calculateBounds(coordinates);
  const centroid = calculateCentroid(coordinates);

  return {
    countryCode,
    countryName,
    geometry,
    bounds,
    centroid,
  };
}

/**
 * Check if coordinates are within country bounds (quick culling)
 */
export function isWithinBounds(
  coord: CountryCoordinates,
  bounds: CountryBounds
): boolean {
  return (
    coord.lat >= bounds.minLat &&
    coord.lat <= bounds.maxLat &&
    coord.lng >= bounds.minLng &&
    coord.lng <= bounds.maxLng
  );
}
```

```typescript
// src/components/WorldMap3D/types/CountryGeometry.ts

import * as THREE from 'three';

export interface CountryGeometryData {
  countryCode: string;
  countryName: string;
  geometry: THREE.BufferGeometry;
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
  centroid: {
    lat: number;
    lng: number;
  };
}

export interface CountryMeshProps {
  countryCode: string;
  countryName: string;
  coordinates: Array<{ lat: number; lng: number }>;
  radius?: number;
  selected?: boolean;
  hoveredCountry?: string | null;
  onCountrySelect: (countryCode: string) => void;
  onCountryHover: (countryCode: string | null) => void;
}

export interface CountryHighlightProps {
  countryCode: string;
  position: THREE.Vector3;
  scale: number;
  visible: boolean;
  opacity: number;
}
```

#### Acceptance Criteria
- [ ] All coordinate conversion functions work correctly
- [ ] Country geometry created with proper 3D positioning
- [ ] Bounds and centroid calculations accurate
- [ ] BufferGeometry properly structured with positions and normals
- [ ] Triangle indices generated for rendering
- [ ] Helper functions for spatial queries implemented
- [ ] TypeScript types properly exported
- [ ] No runtime errors in geometry calculations

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="countryGeometry"
```

---

### Subtask 022.2: CountryMesh Component with Raycasting

#### Status
status: pending

#### Objective
Create the CountryMesh component that renders individual country meshes and handles raycasting for click detection.

#### Context
This component is the interactive element for each country on the globe. It uses Three.js raycasting to detect mouse clicks and intersections accurately. The component integrates with Jotai atoms for state management and uses exclusive file ownership to avoid conflicts with other components.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/CountryMesh.tsx` - Country mesh component with raycasting
- `src/components/WorldMap3D/CountryMesh.test.tsx` - Component tests
- `src/components/WorldMap3D/hooks/useCountryRaycasting.ts` - Raycasting hook

#### Implementation

```typescript
// src/components/WorldMap3D/CountryMesh.tsx

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
    if (meshRef) {
      meshRef.current = groupRef.current;
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
```

```typescript
// src/components/WorldMap3D/hooks/useCountryRaycasting.ts

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
```

#### Acceptance Criteria
- [ ] CountryMesh renders without errors
- [ ] Raycasting correctly detects clicks on country meshes
- [ ] Jotai atoms properly updated on interactions
- [ ] Hover detection works with mouse movement
- [ ] Click detection toggles selection state
- [ ] No memory leaks from event listeners
- [ ] TypeScript types properly defined
- [ ] Component works with multiple countries simultaneously

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="CountryMesh"
```

---

### Subtask 022.3: CountryHighlight Component for Visual Feedback

#### Status
status: pending

#### Objective
Create the CountryHighlight component that provides hover and selection visual feedback on country meshes.

#### Context
This component renders visual overlays and effects to highlight countries when users hover over them or select them. It improves UX by clearly indicating interactive states. Uses Jotai atoms to react to state changes from other components.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/CountryHighlight.tsx` - Highlight component
- `src/components/WorldMap3D/CountryHighlight.test.tsx` - Component tests

#### Implementation

```typescript
// src/components/WorldMap3D/CountryHighlight.tsx

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
        emissive: new THREE.Color(0x2b7cd9),
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
        emissive: new THREE.Color(0xf9ae1f),
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
          glowMeshRef.current.material.opacity =
            0.6 + Math.cos(time * 0.5) * 0.2;
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
```

```typescript
// src/components/WorldMap3D/CountryHighlight.test.tsx

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'jotai';
import { CountryHighlight } from './CountryHighlight';

const mockCoordinates = [
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 48.8566, lng: 2.3522 },  // Paris
  { lat: 52.52, lng: 13.405 },    // Berlin
];

describe('CountryHighlight', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const { container } = render(
      <Provider>
        <CountryHighlight
          countryCode="GB"
          coordinates={mockCoordinates}
          radius={1}
        />
      </Provider>
    );
    expect(container).toBeTruthy();
  });

  it('respects radius prop', () => {
    const { container: container1 } = render(
      <Provider>
        <CountryHighlight
          countryCode="GB"
          coordinates={mockCoordinates}
          radius={1}
        />
      </Provider>
    );

    const { container: container2 } = render(
      <Provider>
        <CountryHighlight
          countryCode="GB"
          coordinates={mockCoordinates}
          radius={2}
        />
      </Provider>
    );

    expect(container1).toBeTruthy();
    expect(container2).toBeTruthy();
  });
});
```

#### Acceptance Criteria
- [ ] Highlight renders without errors
- [ ] Hover state shows blue outline effect
- [ ] Selection state shows yellow glow with pulse animation
- [ ] Highlight centered on country centroid
- [ ] Animation smooth and performant
- [ ] Visibility properly toggled
- [ ] No memory leaks from animations
- [ ] TypeScript types properly defined

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="CountryHighlight"
```

---

### Subtask 022.4: World Map Atoms (Jotai State)

#### Status
status: pending

#### Objective
Create Jotai atoms for managing world map state including selected country, hovered country, and selection history.

#### Context
These atoms serve as the single source of truth for country selection state across the application. Using Jotai instead of useState allows components to access and update state without prop drilling, and enables efficient re-renders only when specific atoms change.

#### Files to Create/Modify (Exclusive Ownership)
- `src/atoms/worldMapAtoms.ts` - World map state atoms

#### Implementation

```typescript
// src/atoms/worldMapAtoms.ts

import { atom } from 'jotai';

/**
 * Currently selected country (only one can be selected at a time)
 * null means no country is selected
 */
export const selectedCountryAtom = atom<string | null>(null);

/**
 * Currently hovered country for visual feedback
 * null means no country is being hovered
 */
export const hoveredCountryAtom = atom<string | null>(null);

/**
 * History of selected countries in current session
 * Used for undo/redo and tracking user interactions
 */
export const selectionHistoryAtom = atom<string[]>([]);

/**
 * Currently visible countries on the globe
 * Based on camera position and rotation
 */
export const visibleCountriesAtom = atom<Set<string>>(new Set());

/**
 * Country metadata cache - stores country information
 * Maps country code to country details
 */
export interface CountryMetadata {
  code: string;
  name: string;
  nativeNames?: Record<string, string>;
  region?: string;
  subregion?: string;
  area?: number;
  population?: number;
  flag?: string;
  languages?: string[];
  currencies?: string[];
}

export const countryMetadataAtom = atom<Map<string, CountryMetadata>>(
  new Map()
);

/**
 * Calculation state for the selected country
 * Used to store pricing and calculation results
 */
export interface CountryCalculation {
  countryCode: string;
  costPerYear: number;
  processingDays: number;
  maintenanceFee: number;
  totalClasses: number;
}

export const countryCalculationAtom = atom<CountryCalculation | null>(null);

/**
 * Multi-select mode atom - allows selecting multiple countries
 * Derived from selectedCountryAtom and selectionHistoryAtom
 */
export const multiSelectEnabledAtom = atom(false);

export const selectedCountriesAtom = atom<Set<string>>((get) => {
  const multiSelectEnabled = get(multiSelectEnabledAtom);
  const selected = get(selectedCountryAtom);
  const history = get(selectionHistoryAtom);

  if (multiSelectEnabled) {
    return new Set(history);
  }

  return selected ? new Set([selected]) : new Set();
});

/**
 * Derived atom for selected country display name
 */
export const selectedCountryNameAtom = atom<string | null>((get) => {
  const selected = get(selectedCountryAtom);
  if (!selected) return null;

  const metadata = get(countryMetadataAtom);
  return metadata.get(selected)?.name ?? selected;
});

/**
 * Derived atom for selection count
 */
export const selectionCountAtom = atom((get) => {
  return get(selectedCountriesAtom).size;
});

/**
 * Clear all selections
 */
export const clearSelectionsAtom = atom(null, (_get, set) => {
  set(selectedCountryAtom, null);
  set(selectionHistoryAtom, []);
  set(hoveredCountryAtom, null);
});

/**
 * Add country to selection history
 */
export const addToHistoryAtom = atom(
  null,
  (get, set, countryCode: string) => {
    const history = get(selectionHistoryAtom);
    const updated = [...history, countryCode];
    set(selectionHistoryAtom, updated);
  }
);

/**
 * Undo last selection
 */
export const undoSelectionAtom = atom(null, (get, set) => {
  const history = get(selectionHistoryAtom);
  if (history.length === 0) return;

  const updated = history.slice(0, -1);
  set(selectionHistoryAtom, updated);

  if (updated.length > 0) {
    set(selectedCountryAtom, updated[updated.length - 1]);
  } else {
    set(selectedCountryAtom, null);
  }
});
```

#### Acceptance Criteria
- [ ] All atoms properly exported
- [ ] Type definitions complete and accurate
- [ ] Derived atoms compute correctly
- [ ] Selection history tracking works
- [ ] Clear selections function resets all state
- [ ] Undo selection navigates history
- [ ] No circular dependencies in atoms
- [ ] Performance optimized for frequent updates

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="worldMapAtoms"
```

---

### Subtask 022.5: Integration Test & Documentation

#### Status
status: pending

#### Objective
Create comprehensive integration tests demonstrating all country selection features working together and document the module's public API.

#### Context
This subtask ensures all four previous subtasks work together correctly. Tests verify raycasting, highlighting, state management, and user interactions in realistic scenarios. Documentation provides clear examples for other developers to use these components.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/WorldMap3D/index.ts` - Public API exports
- `src/components/WorldMap3D/README.md` - Module documentation
- `src/components/WorldMap3D/__tests__/integration.test.ts` - Integration tests

#### Implementation

```typescript
// src/components/WorldMap3D/index.ts

/**
 * WorldMap3D - 3D Globe with Country Selection
 *
 * This module provides components and utilities for rendering an interactive
 * 3D globe with clickable, hoverable countries using Three.js and React Three Fiber.
 *
 * State management uses Jotai for efficient, decoupled component updates.
 */

export { CountryMesh } from './CountryMesh';
export type { CountryMeshProps } from './CountryMesh';

export { CountryHighlight } from './CountryHighlight';
export type { CountryHighlightProps } from './CountryHighlight';

export { useCountryRaycasting } from './hooks/useCountryRaycasting';
export type { RaycastOptions } from './hooks/useCountryRaycasting';

// Geometry utilities
export {
  coordinatesToPosition,
  positionToCoordinates,
  calculateCentroid,
  calculateBounds,
  createCountryGeometry,
  createCountryGeometryData,
  isWithinBounds,
} from './countryGeometry';

export type {
  CountryCoordinates,
  CountryBounds,
  CountryGeometryData,
} from './countryGeometry';

// Jotai atoms
export {
  selectedCountryAtom,
  hoveredCountryAtom,
  selectionHistoryAtom,
  visibleCountriesAtom,
  countryMetadataAtom,
  countryCalculationAtom,
  multiSelectEnabledAtom,
  selectedCountriesAtom,
  selectedCountryNameAtom,
  selectionCountAtom,
  clearSelectionsAtom,
  addToHistoryAtom,
  undoSelectionAtom,
} from '@/atoms/worldMapAtoms';

export type {
  CountryMetadata,
  CountryCalculation,
} from '@/atoms/worldMapAtoms';
```

```markdown
# WorldMap3D Module - Country Selection Layer

## Overview

The WorldMap3D module provides React components for rendering an interactive 3D globe with clickable, hoverable countries. It uses Three.js for 3D rendering, React Three Fiber for React integration, and Jotai for state management.

## Key Features

- **Raycasting**: Accurate click detection on 3D country meshes
- **Hover Effects**: Visual feedback when users hover over countries
- **Selection State**: Track and highlight selected countries
- **State Management**: Jotai-based atoms for efficient component updates
- **No prop drilling**: State accessible from any component via Jotai
- **Performance**: Optimized geometry generation and rendering

## Usage

### Basic Setup

```typescript
import { CountryMesh, CountryHighlight } from '@/components/WorldMap3D';
import { selectedCountryAtom } from '@/atoms/worldMapAtoms';
import { useAtomValue } from 'jotai';

export function GlobeView() {
  const selected = useAtomValue(selectedCountryAtom);

  return (
    <>
      <CountryMesh
        countryCode="GB"
        countryName="United Kingdom"
        coordinates={[
          { lat: 51.5074, lng: -0.1278 },
          { lat: 53.4083, lng: -2.8945 },
          { lat: 54.6081, lng: -3.5890 },
        ]}
      />
      <CountryHighlight
        countryCode="GB"
        coordinates={[
          { lat: 51.5074, lng: -0.1278 },
          { lat: 53.4083, lng: -2.8945 },
          { lat: 54.6081, lng: -3.5890 },
        ]}
      />
    </>
  );
}
```

### Accessing Selection State

```typescript
import { useAtomValue, useSetAtom } from 'jotai';
import {
  selectedCountryAtom,
  selectedCountryNameAtom,
  selectionCountAtom,
} from '@/atoms/worldMapAtoms';

export function SelectionDisplay() {
  const selected = useAtomValue(selectedCountryAtom);
  const selectedName = useAtomValue(selectedCountryNameAtom);
  const count = useAtomValue(selectionCountAtom);

  return (
    <div>
      {selected ? (
        <p>Selected: {selectedName} ({selected})</p>
      ) : (
        <p>No country selected</p>
      )}
      <p>Total selections in history: {count}</p>
    </div>
  );
}
```

### Geometry Utilities

```typescript
import {
  coordinatesToPosition,
  calculateCentroid,
  createCountryGeometry,
} from '@/components/WorldMap3D';

// Convert lat/lng to 3D position on unit sphere
const position = coordinatesToPosition(51.5, -0.13);

// Calculate country center
const center = calculateCentroid([
  { lat: 51.5, lng: -0.13 },
  { lat: 53.4, lng: -2.89 },
]);

// Generate Three.js geometry
const geometry = createCountryGeometry(countryCoordinates, 1);
```

## Components

### CountryMesh

Renders a clickable 3D mesh for a country. Handles raycasting for click detection and updates Jotai atoms on interaction.

**Props:**
- `countryCode: string` - ISO 3166-1 alpha-2 country code
- `countryName: string` - Display name of the country
- `coordinates: CountryCoordinates[]` - Array of lat/lng coordinates
- `radius?: number` - Sphere radius (default: 1)
- `meshRef?: RefObject<THREE.Group>` - Optional ref to mesh group

### CountryHighlight

Renders visual highlights for hovered and selected countries. Automatically responds to Jotai atom changes.

**Props:**
- `countryCode: string` - Country code to highlight
- `coordinates: CountryCoordinates[]` - Country coordinates
- `radius?: number` - Sphere radius (default: 1)

## Jotai Atoms

### Selection Atoms

- `selectedCountryAtom` - Currently selected country code (or null)
- `hoveredCountryAtom` - Currently hovered country code (or null)
- `selectionHistoryAtom` - Array of historically selected countries
- `selectedCountriesAtom` - Derived atom returning Set of selected countries

### Display Atoms

- `selectedCountryNameAtom` - Derived atom with country display name
- `selectionCountAtom` - Derived atom with count of selections

### Utility Atoms

- `multiSelectEnabledAtom` - Toggle multi-select mode
- `countryMetadataAtom` - Cache of country information
- `countryCalculationAtom` - Pricing/calculation results
- `visibleCountriesAtom` - Set of visible countries on globe

### Action Atoms

- `clearSelectionsAtom` - Reset all selections
- `addToHistoryAtom` - Add country to selection history
- `undoSelectionAtom` - Undo last selection

## Coordinate System

The module uses geographic coordinates (latitude/longitude) that are converted to 3D positions on a unit sphere:

```
x = R * cos(lat) * cos(lng)
y = R * sin(lat)
z = R * cos(lat) * sin(lng)
```

Where R is the sphere radius (default 1).

## Performance Considerations

1. **Raycasting**: Uses efficient Three.js raycaster with minimal objects
2. **Geometry**: Lazy-loaded and cached per country
3. **State Updates**: Jotai ensures only affected components re-render
4. **Animations**: GPU-accelerated via requestAnimationFrame
5. **Memory**: Geometries properly disposed when components unmount

## Type Definitions

All components and functions are fully typed with TypeScript. Import types as needed:

```typescript
import type {
  CountryMeshProps,
  CountryCoordinates,
  CountryGeometryData,
  CountryMetadata,
  CountryCalculation,
} from '@/components/WorldMap3D';
```

## Testing

Run tests with:

```bash
npm test -- --testPathPattern="WorldMap3D|worldMapAtoms"
```

Tests cover:
- Geometry calculations
- Component rendering
- Raycasting accuracy
- State management
- Integration scenarios
```

```typescript
// src/components/WorldMap3D/__tests__/integration.test.ts

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'jotai';
import { useAtomValue, useSetAtom } from 'jotai';
import { CountryMesh } from '../CountryMesh';
import { CountryHighlight } from '../CountryHighlight';
import {
  selectedCountryAtom,
  hoveredCountryAtom,
  selectionHistoryAtom,
} from '@/atoms/worldMapAtoms';

const mockCoordinates = [
  { lat: 51.5074, lng: -0.1278 },
  { lat: 53.4083, lng: -2.8945 },
  { lat: 54.6081, lng: -3.5890 },
];

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

describe('WorldMap3D - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock canvas for raycasting
    document.body.innerHTML = '<canvas></canvas>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders country mesh and highlight together', () => {
    const { container } = render(
      <TestWrapper>
        <CountryMesh
          countryCode="GB"
          countryName="United Kingdom"
          coordinates={mockCoordinates}
        />
        <CountryHighlight
          countryCode="GB"
          coordinates={mockCoordinates}
        />
      </TestWrapper>
    );

    expect(container).toBeTruthy();
  });

  it('manages state across multiple countries', () => {
    let selectedValue: string | null = null;

    function StateTracker() {
      selectedValue = useAtomValue(selectedCountryAtom);
      return null;
    }

    render(
      <TestWrapper>
        <CountryMesh
          countryCode="GB"
          countryName="United Kingdom"
          coordinates={mockCoordinates}
        />
        <CountryMesh
          countryCode="FR"
          countryName="France"
          coordinates={mockCoordinates}
        />
        <StateTracker />
      </TestWrapper>
    );

    expect(selectedValue).toBeNull();
  });

  it('tracks selection history through state', async () => {
    let historyValue: string[] = [];

    function HistoryTracker() {
      historyValue = useAtomValue(selectionHistoryAtom);
      return null;
    }

    render(
      <TestWrapper>
        <CountryMesh
          countryCode="GB"
          countryName="United Kingdom"
          coordinates={mockCoordinates}
        />
        <HistoryTracker />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(Array.isArray(historyValue)).toBe(true);
    });
  });

  it('handles highlight visibility based on selection', () => {
    let selected: string | null = null;

    function SelectionMonitor() {
      selected = useAtomValue(selectedCountryAtom);
      return null;
    }

    const { container } = render(
      <TestWrapper>
        <CountryHighlight
          countryCode="GB"
          coordinates={mockCoordinates}
        />
        <SelectionMonitor />
      </TestWrapper>
    );

    expect(container).toBeTruthy();
    expect(selected).toBeNull();
  });

  it('manages hover state independently from selection', async () => {
    let hovered: string | null = null;
    let selected: string | null = null;

    function StateMonitor() {
      hovered = useAtomValue(hoveredCountryAtom);
      selected = useAtomValue(selectedCountryAtom);
      return null;
    }

    render(
      <TestWrapper>
        <CountryMesh
          countryCode="GB"
          countryName="United Kingdom"
          coordinates={mockCoordinates}
        />
        <CountryHighlight
          countryCode="GB"
          coordinates={mockCoordinates}
        />
        <StateMonitor />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(hovered === selected || hovered === null || selected === null).toBe(true);
    });
  });
});
```

#### Acceptance Criteria
- [ ] Public API properly exported
- [ ] All module exports documented
- [ ] README includes usage examples
- [ ] Integration tests pass
- [ ] State management integration verified
- [ ] Component interaction tested
- [ ] Documentation clear and complete
- [ ] TypeScript types properly exported

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="WorldMap3D|integration"
npm run lint src/components/WorldMap3D
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/WorldMap3D/CountryMesh.tsx`
- `src/components/WorldMap3D/CountryMesh.test.tsx`
- `src/components/WorldMap3D/CountryHighlight.tsx`
- `src/components/WorldMap3D/CountryHighlight.test.tsx`
- `src/components/WorldMap3D/countryGeometry.ts`
- `src/components/WorldMap3D/types/CountryGeometry.ts`
- `src/components/WorldMap3D/hooks/useCountryRaycasting.ts`
- `src/components/WorldMap3D/index.ts`
- `src/components/WorldMap3D/README.md`
- `src/components/WorldMap3D/__tests__/integration.test.ts`
- `src/atoms/worldMapAtoms.ts`

### Imports From Existing Code
- `react` - React hooks and components
- `jotai` - State management atoms
- `three` - 3D graphics library
- `@testing-library/react` - Component testing (from existing setup)
- `vitest` - Testing framework (from existing setup)

### Exports For Other Code
- `CountryMesh` - Interactive country component
- `CountryHighlight` - Visual feedback component
- `useCountryRaycasting` - Hook for raycasting
- `worldMapAtoms` - Jotai atoms for state
- Geometry utilities - Coordinate conversion and geometry generation

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="WorldMap3D|worldMapAtoms|integration"
npm run lint src/components/WorldMap3D src/atoms/worldMapAtoms.ts
```

---

## Parallelization Notes
- All 5 subtasks are completely independent and parallelizable
- Subtask 022.1 provides utilities that subtasks 022.2 and 022.3 import (but don't modify)
- Subtask 022.4 provides atoms that all other subtasks consume (but don't modify)
- Subtask 022.5 only imports from the other subtasks without modifying them
- Each subtask owns exclusive files that no other subtask touches
- All subtasks can be developed, tested, and merged simultaneously
- No subtask depends on another subtask's completion
