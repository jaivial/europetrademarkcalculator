import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { PriceBreakdown } from './PriceBreakdown';
import {
  selectedCountriesAtom,
  selectedClassesAtom,
  selectedOptionsAtom,
  priorityLevelAtom,
} from '@/atoms/calculatorAtom';
import { useHydrateAtoms } from 'jotai/utils';

// Helper component to set initial atom values
function HydrateAtoms({
  initialValues,
  children
}: {
  initialValues: Array<[any, any]>;
  children: React.ReactNode;
}) {
  useHydrateAtoms(initialValues);
  return <>{children}</>;
}

function renderWithProvider(
  ui: React.ReactElement,
  initialAtomValues: Array<[any, any]> = []
) {
  return render(
    <Provider>
      <HydrateAtoms initialValues={initialAtomValues}>
        <I18nextProvider i18n={i18next}>
          {ui}
        </I18nextProvider>
      </HydrateAtoms>
    </Provider>
  );
}

describe('PriceBreakdown', () => {
  beforeAll(async () => {
    await i18next
      .use(initReactI18next)
      .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
          en: {
            common: {},
            calculator: {
              noCountrySelected: 'No country selected',
              priceBreakdown: 'Price Breakdown',
              perClass: 'per class',
              baseFee: 'Base Fee',
              monitoring: 'Trademark Monitoring',
              legalSupport: 'Legal Support',
              fastTrack: 'Fast Track Processing',
              standard: 'Standard',
              expedited: 'Expedited',
              premium: 'Premium',
              priorityDescription: 'Fastest processing',
              subtotal: 'Subtotal',
              tax: 'Tax',
              totalPrice: 'Total Price',
            },
          },
        },
        interpolation: {
          escapeValue: false,
        },
      });
  });

  beforeEach(() => {
    i18next.changeLanguage('en');
  });

  it('shows empty state when no countries selected', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, []],
      [selectedClassesAtom, [1, 2]],
    ]);

    expect(screen.getByText(/No country selected/i)).toBeInTheDocument();
  });

  it('shows empty state when no classes selected', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, []],
    ]);

    expect(screen.getByText(/No country selected/i)).toBeInTheDocument();
  });

  it('displays base price per class', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1, 2, 3]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'standard'],
    ]);

    expect(screen.getByText(/per class/i)).toBeInTheDocument();
    // 3 classes * 1 country * 100 EUR = 300 EUR
    expect(screen.getByText(/300/)).toBeInTheDocument();
  });

  it('displays filing fee', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'standard'],
    ]);

    expect(screen.getByText(/Base Fee/i)).toBeInTheDocument();
    // 1 country * 250 EUR = 250 EUR
    expect(screen.getByText(/250/)).toBeInTheDocument();
  });

  it('displays selected services', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, ['monitoring']],
      [priorityLevelAtom, 'standard'],
    ]);

    expect(screen.getByText(/Trademark Monitoring/i)).toBeInTheDocument();
  });

  it('calculates correct totals', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'standard'],
    ]);

    // Base: 100, Filing: 250 = 350 subtotal
    expect(screen.getByText(/350/)).toBeInTheDocument();
  });

  it('applies priority multiplier for expedited', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'expedited'],
    ]);

    // Base: 100 + Filing: 250 = 350 * 1.5 = 525
    expect(screen.getByText(/expedited/i)).toBeInTheDocument();
  });

  it('shows premium notice for premium priority', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'premium'],
    ]);

    expect(screen.getByText(/Fastest processing/i)).toBeInTheDocument();
  });

  it('calculates correctly for multiple countries', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE', 'FR', 'IT']],
      [selectedClassesAtom, [1, 2]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'standard'],
    ]);

    // 2 classes * 3 countries * 100 = 600
    expect(screen.getByText(/600/)).toBeInTheDocument();
  });

  it('includes tax calculation', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'standard'],
    ]);

    expect(screen.getByText(/Tax/i)).toBeInTheDocument();
    expect(screen.getByText(/19%/)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProvider(<PriceBreakdown testId="test-breakdown" />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, []],
      [priorityLevelAtom, 'standard'],
    ]);

    const breakdown = screen.getByTestId('test-breakdown');
    expect(breakdown).toHaveAttribute('role', 'region');
    expect(breakdown).toHaveAttribute('aria-label');
  });

  it('displays all selected services with correct prices', () => {
    renderWithProvider(<PriceBreakdown />, [
      [selectedCountriesAtom, ['DE']],
      [selectedClassesAtom, [1]],
      [selectedOptionsAtom, ['monitoring', 'legalSupport']],
      [priorityLevelAtom, 'standard'],
    ]);

    expect(screen.getByText(/Trademark Monitoring/i)).toBeInTheDocument();
    expect(screen.getByText(/Legal Support/i)).toBeInTheDocument();
  });
});
