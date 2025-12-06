import { useCallback, useMemo, useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import { selectedCountryAtom, Country, EUROPEAN_COUNTRIES } from '@/atoms/countryAtom';
import styles from './EuropeMap.module.css';

// Jotai atoms for map state (NO useState)
export const hoveredCountryAtom = atom<string | null>(null);
// Track if panel has been shown (to trigger re-focus only on first selection)
export const panelShownAtom = atom<boolean>(false);
// Track if device is touch-capable (disable hover on mobile)
export const isTouchDeviceAtom = atom<boolean>(false);

// Generate region values for coloring
const generateRegionValues = (
  selectedCode: string | null,
  hoveredCode: string | null
): Record<string, number> => {
  const values: Record<string, number> = {};

  EUROPEAN_COUNTRIES.forEach((country) => {
    if (country.code === selectedCode) {
      values[country.code] = 4; // Selected - bright blue
    } else if (country.code === hoveredCode) {
      values[country.code] = 3; // Hovered - light blue
    } else if (country.brandRegistration) {
      values[country.code] = 2; // Has pricing - green
    } else {
      values[country.code] = 1; // In list, no pricing - gray
    }
  });

  return values;
};

// Capital city coordinates for European countries
const CAPITALS: Record<string, [number, number]> = {
  DE: [52.52, 13.405], // Berlin
  FR: [48.8566, 2.3522], // Paris
  ES: [40.4168, -3.7038], // Madrid
  IT: [41.9028, 12.4964], // Rome
  GB: [51.5074, -0.1278], // London
  NL: [52.3676, 4.9041], // Amsterdam
  BE: [50.8503, 4.3517], // Brussels
  PT: [38.7223, -9.1393], // Lisbon
  AT: [48.2082, 16.3738], // Vienna
  CH: [46.9481, 7.4474], // Bern
  PL: [52.2297, 21.0122], // Warsaw
  SE: [59.3293, 18.0686], // Stockholm
  NO: [59.9139, 10.7522], // Oslo
  DK: [55.6761, 12.5683], // Copenhagen
  FI: [60.1699, 24.9384], // Helsinki
  IE: [53.3498, -6.2603], // Dublin
  GR: [37.9838, 23.7275], // Athens
  CZ: [50.0755, 14.4378], // Prague
  HU: [47.4979, 19.0402], // Budapest
  RO: [44.4268, 26.1025], // Bucharest
  BG: [42.6977, 23.3219], // Sofia
  HR: [45.815, 15.9819], // Zagreb
  SK: [48.1486, 17.1077], // Bratislava
  SI: [46.0569, 14.5058], // Ljubljana
  EE: [59.437, 24.7536], // Tallinn
  LV: [56.9496, 24.1052], // Riga
  LT: [54.6872, 25.2797], // Vilnius
  LU: [49.6116, 6.1319], // Luxembourg
};

// Generate markers for countries with pricing
const generateMarkers = (countries: readonly Country[]) => {
  return countries
    .filter((c) => c.brandRegistration && CAPITALS[c.code])
    .map((country) => ({
      latLng: CAPITALS[country.code],
      name: `${country.flag} ${country.name} - €${country.brandRegistration!.basePrice}+`,
    }));
};

// Props interface
interface EuropeMapProps {
  className?: string;
  onCountrySelect?: (country: Country | null) => void;
}

/**
 * EuropeMap Component
 *
 * Simple VectorMap using @react-jvectormap
 * Focused on Europe with country selection via Jotai atoms
 */
export const EuropeMap: React.FC<EuropeMapProps> = ({
  className = '',
  onCountrySelect,
}) => {
  const { t } = useTranslation('map');
  const containerRef = useRef<HTMLDivElement>(null);

  // Jotai state
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);
  const [hoveredCountry, setHoveredCountry] = useAtom(hoveredCountryAtom);
  const [, setPanelShown] = useAtom(panelShownAtom);
  const [isTouchDevice, setIsTouchDevice] = useAtom(isTouchDeviceAtom);

  // Detect touch device on mount
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };
    checkTouch();

    // Also listen for changes (e.g., connecting a mouse to a tablet)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const handleChange = () => checkTouch();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setIsTouchDevice]);

  // Track previous selected country to detect first selection
  const prevSelectedRef = useRef<Country | null>(null);

  // Re-center and zoom on Europe when first country is selected (panel appears)
  useEffect(() => {
    const wasEmpty = prevSelectedRef.current === null;
    const isNowSelected = selectedCountry !== null;

    // Update ref for next render
    prevSelectedRef.current = selectedCountry;

    // Only zoom when going from no selection to a selection
    if (wasEmpty && isNowSelected) {
      // Wait for panel animation and resize, then re-focus
      const refocusTimeout = setTimeout(() => {
        if (containerRef.current) {
          // Find the jvectormap container and its map object via jQuery
          const jvmContainer = containerRef.current.querySelector('.jvectormap-container');
          const $ = (window as any).jvm?.$ || (window as any).jQuery || (window as any).$;

          if ($ && jvmContainer) {
            const mapObject = $(jvmContainer).data('mapObject');

            if (mapObject && mapObject.setFocus) {
              // Use setFocus - the proper jvectormap API method
              // This focuses on a point (x, y as percentages) with a scale
              mapObject.setFocus({
                scale: 5,
                x: 0.5,
                y: 0.3,
                animate: true
              });
            }
          }
        }
      }, 400); // Wait for panel slide animation

      return () => clearTimeout(refocusTimeout);
    }
  }, [selectedCountry]);

  // Debug: Add click listener to zoom buttons to understand how they work
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleZoomClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('jvectormap-zoomin') || target.classList.contains('jvectormap-zoomout')) {
        const $ = (window as any).jvm?.$ || (window as any).jQuery || (window as any).$;
        const jvmContainer = container.querySelector('.jvectormap-container');

        if ($ && jvmContainer) {
          const mapObject = $(jvmContainer).data('mapObject');
          if (mapObject) {
            console.log('=== ZOOM BUTTON CLICKED ===');
            console.log('Button:', target.className);
            console.log('Current scale BEFORE:', mapObject.scale);
            console.log('Map dimensions:', { width: mapObject.width, height: mapObject.height });
            console.log('mapObject methods:', Object.keys(mapObject).filter(k => typeof mapObject[k] === 'function'));
            console.log('mapObject.setFocus exists:', typeof mapObject.setFocus);
            console.log('mapObject.setScale exists:', typeof mapObject.setScale);
            console.log('mapObject.zoomStep:', mapObject.params?.zoomStep);

            // Log scale after a brief delay to see the result
            setTimeout(() => {
              console.log('Current scale AFTER:', mapObject.scale);
            }, 100);
          }
        }
      }
    };

    container.addEventListener('click', handleZoomClick, true);
    return () => container.removeEventListener('click', handleZoomClick, true);
  }, []);

  // Force jvectormap to resize when container size actually changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastWidth = container.offsetWidth;
    let lastHeight = container.offsetHeight;
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const triggerResize = () => {
      // Dispatch window resize event to force jvectormap recalculation
      window.dispatchEvent(new Event('resize'));
    };

    // Use ResizeObserver to detect container size changes
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const newWidth = entry.contentRect.width;
      const newHeight = entry.contentRect.height;

      // Only trigger if size actually changed significantly (more than 5px)
      if (Math.abs(newWidth - lastWidth) > 5 || Math.abs(newHeight - lastHeight) > 5) {
        lastWidth = newWidth;
        lastHeight = newHeight;

        // Debounce the resize event
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(triggerResize, 100);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Find country by code
  const findCountry = useCallback((code: string): Country | undefined => {
    return EUROPEAN_COUNTRIES.find((c) => c.code === code);
  }, []);

  // Handle region click
  const handleRegionClick = useCallback(
    (_event: React.MouseEvent, code: string) => {
      const country = findCountry(code);
      if (country) {
        setSelectedCountry(country);
        onCountrySelect?.(country);
      }
    },
    [findCountry, setSelectedCountry, onCountrySelect]
  );

  // Handle region hover - disabled on touch devices
  const handleRegionOver = useCallback(
    (_event: React.MouseEvent, code: string) => {
      // Skip hover effects on touch devices
      if (isTouchDevice) return;

      const europeanCodes = EUROPEAN_COUNTRIES.map((c) => c.code);
      if (europeanCodes.includes(code)) {
        setHoveredCountry(code);
      }
    },
    [setHoveredCountry, isTouchDevice]
  );

  const handleRegionOut = useCallback(() => {
    // Skip hover effects on touch devices
    if (isTouchDevice) return;
    setHoveredCountry(null);
  }, [setHoveredCountry, isTouchDevice]);

  // Custom tooltip content - disabled on touch devices
  const handleRegionTipShow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any, el: any, code: string) => {
      // Hide tooltip on touch devices
      if (isTouchDevice) {
        (event as Event & { preventDefault?: () => void }).preventDefault?.();
        el.html('');
        return;
      }

      const country = findCountry(code);
      if (country) {
        const priceInfo = country.brandRegistration
          ? `<br/><span style="color: #38a169; font-weight: 600;">${t('from')} €${country.brandRegistration.basePrice}</span>`
          : `<br/><span style="color: #a0aec0;">${t('noPricing')}</span>`;

        el.html(`
          <div style="padding: 8px 12px; min-width: 150px;">
            <div style="font-size: 24px; margin-bottom: 4px;">${country.flag}</div>
            <div style="font-weight: 700; font-size: 16px;">${country.name}</div>
            ${priceInfo}
          </div>
        `);
      }
    },
    [findCountry, t, isTouchDevice]
  );

  // Region values for coloring
  const regionValues = useMemo(
    () => generateRegionValues(selectedCountry?.code || null, hoveredCountry),
    [selectedCountry, hoveredCountry]
  );

  // Markers for countries with pricing
  const markers = useMemo(
    () => generateMarkers(EUROPEAN_COUNTRIES),
    []
  );

  return (
    <div ref={containerRef} className={`${styles.mapWrapper} ${className}`}>
      <VectorMap
        map={worldMill}
        backgroundColor="#1a365d"
        zoomOnScroll={true}
        {...{ zoomButtons: true } as any}
        zoomMax={12}
        zoomMin={1}
        zoomStep={1.5}
        focusOn={{
          x: 0.5,
          y: 0.3,
          scale: 3,
          animate: true,
        }}
        regionStyle={{
          initial: {
            fill: '#e2e8f0',
            stroke: '#cbd5e0',
            strokeWidth: 0.5,
            fillOpacity: 1,
          },
          hover: {
            fillOpacity: 0.8,
            cursor: 'pointer',
          },
          selected: {
            fill: '#0066cc',
          },
          selectedHover: {
            fill: '#0052a3',
          },
        }}
        series={{
          regions: [
            {
              attribute: 'fill',
              values: regionValues,
              scale: [
                '#e2e8f0', // 0: Default (not in list)
                '#4a5568', // 1: In list, no pricing
                '#38a169', // 2: Has pricing (green)
                '#4da6ff', // 3: Hovered (light blue)
                '#0066cc', // 4: Selected (bright blue)
              ],
              normalizeFunction: 'linear',
            },
          ],
        }}
        markers={markers}
        markerStyle={{
          initial: {
            fill: '#0066cc',
            stroke: '#ffffff',
            strokeWidth: 1,
            r: 5,
          },
          hover: {
            fill: '#0052a3',
            stroke: '#ffffff',
            strokeWidth: 2,
            r: 7,
            cursor: 'pointer',
          },
        }}
        onRegionClick={handleRegionClick}
        onRegionOver={handleRegionOver}
        onRegionOut={handleRegionOut}
        onRegionTipShow={handleRegionTipShow}
      />
    </div>
  );
};

export default EuropeMap;
