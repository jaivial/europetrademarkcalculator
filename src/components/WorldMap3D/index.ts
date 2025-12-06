/**
 * WorldMap3D Components
 *
 * Exports 3D globe and related components for brand calculator visualization
 */

// Main container component
export { WorldMap3D, type WorldMap3DProps } from './WorldMap3D';
export { SceneLighting } from './SceneLighting';

// Globe components
export { default as Globe } from './Globe';
export { default as EarthMesh } from './EarthMesh';
export { default as AtmosphereGlow } from './AtmosphereGlow';

// Type exports
export type { GlobeProps } from './Globe';

/**
 * Usage example:
 *
 * import { Globe } from '@/components/WorldMap3D';
 *
 * <Globe
 *   rotationSpeed={0.8}
 *   enableControls={true}
 *   onReady={() => console.log('Globe ready')}
 * />
 */

// Country selection layer exports
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
