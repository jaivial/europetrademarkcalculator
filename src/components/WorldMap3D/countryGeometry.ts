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
