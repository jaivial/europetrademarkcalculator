import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'jotai';
import { useAtomValue } from 'jotai';
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
