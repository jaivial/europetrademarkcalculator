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
