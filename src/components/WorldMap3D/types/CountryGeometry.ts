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
