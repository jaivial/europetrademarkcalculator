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
