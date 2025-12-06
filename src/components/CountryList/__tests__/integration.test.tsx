import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useAtomValue } from 'jotai';
import { CountryCard } from '../CountryCard';
import { CountryFlag } from '../CountryFlag';
import type { CountryData } from '../CountryCard';
import { selectedCountryAtom } from '@/atoms/countryAtom';

describe('CountryCard Integration Tests', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider>{component}</Provider>);
  };

  describe('CountryCard with CountryFlag Integration', () => {
    it('should render CountryCard with CountryFlag component', () => {
      const country: CountryData = { code: 'DE', name: 'Germany' };
      renderWithProvider(<CountryCard country={country} />);

      // Verify CountryFlag is rendered inside CountryCard
      const flag = screen.getByRole('img', { name: /Germany flag/i });
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveTextContent('🇩🇪');
    });

    it('should render multiple country cards with different flags', () => {
      const countries: CountryData[] = [
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'ES', name: 'Spain' },
      ];

      renderWithProvider(
        <>
          {countries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </>
      );

      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('Spain')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /Germany flag/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /France flag/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /Spain flag/i })).toBeInTheDocument();
    });
  });

  describe('CountryCard with Jotai State Integration', () => {
    it('should integrate with Jotai selectedCountryAtom', async () => {
      const country: CountryData = { code: 'IT', name: 'Italy' };

      // Component to read the selected country from atom
      const SelectedCountryDisplay = () => {
        const selected = useAtomValue(selectedCountryAtom);
        return <div data-testid="selected-display">{selected?.name || 'None'}</div>;
      };

      renderWithProvider(
        <>
          <CountryCard country={country} />
          <SelectedCountryDisplay />
        </>
      );

      // Initially no country selected
      expect(screen.getByTestId('selected-display')).toHaveTextContent('None');

      // Click the country card
      const card = screen.getByRole('button', { name: /Select Italy/i });
      await userEvent.click(card);

      // Verify the country was selected in the atom
      expect(screen.getByTestId('selected-display')).toHaveTextContent('Italy');
    });

    it('should update selection when clicking different cards', async () => {
      const countries: CountryData[] = [
        { code: 'NL', name: 'Netherlands' },
        { code: 'BE', name: 'Belgium' },
      ];

      const SelectedCountryDisplay = () => {
        const selected = useAtomValue(selectedCountryAtom);
        return <div data-testid="selected-display">{selected?.code || 'None'}</div>;
      };

      renderWithProvider(
        <>
          {countries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
          <SelectedCountryDisplay />
        </>
      );

      // Click Netherlands
      await userEvent.click(screen.getByRole('button', { name: /Select Netherlands/i }));
      expect(screen.getByTestId('selected-display')).toHaveTextContent('NL');

      // Click Belgium
      await userEvent.click(screen.getByRole('button', { name: /Select Belgium/i }));
      expect(screen.getByTestId('selected-display')).toHaveTextContent('BE');
    });
  });

  describe('CountryFlag Standalone Integration', () => {
    it('should render CountryFlag independently', () => {
      render(<CountryFlag countryCode="AT" countryName="Austria" />);

      const flag = screen.getByRole('img', { name: /Austria flag/i });
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveTextContent('🇦🇹');
    });

    it('should apply custom className to CountryFlag', () => {
      render(
        <CountryFlag
          countryCode="CH"
          countryName="Switzerland"
          className="large-flag"
        />
      );

      const flag = screen.getByRole('img');
      expect(flag).toHaveClass('large-flag');
    });
  });

  describe('Full User Flow Integration', () => {
    it('should support full selection workflow', async () => {
      const countries: CountryData[] = [
        { code: 'SE', name: 'Sweden' },
        { code: 'PL', name: 'Poland' },
        { code: 'GR', name: 'Greece' },
      ];

      const SelectedInfo = () => {
        const selected = useAtomValue(selectedCountryAtom);
        return (
          <div data-testid="selection-info">
            {selected ? `${selected.name} (${selected.code})` : 'No selection'}
          </div>
        );
      };

      renderWithProvider(
        <>
          <div>
            {countries.map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
          <SelectedInfo />
        </>
      );

      // Initially no selection
      expect(screen.getByTestId('selection-info')).toHaveTextContent('No selection');

      // Select Sweden
      await userEvent.click(screen.getByRole('button', { name: /Select Sweden/i }));
      expect(screen.getByTestId('selection-info')).toHaveTextContent('Sweden (SE)');

      // Select Poland via keyboard
      const polandCard = screen.getByRole('button', { name: /Select Poland/i });
      polandCard.focus();
      await userEvent.keyboard('{Enter}');
      expect(screen.getByTestId('selection-info')).toHaveTextContent('Poland (PL)');

      // Select Greece via Space key
      const greeceCard = screen.getByRole('button', { name: /Select Greece/i });
      greeceCard.focus();
      await userEvent.keyboard(' ');
      expect(screen.getByTestId('selection-info')).toHaveTextContent('Greece (GR)');
    });
  });

  describe('Accessibility Integration', () => {
    it('should maintain keyboard navigation across multiple cards', async () => {
      const countries: CountryData[] = [
        { code: 'CZ', name: 'Czech Republic' },
        { code: 'DE', name: 'Germany' },
      ];

      renderWithProvider(
        <>
          {countries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </>
      );

      const cards = screen.getAllByRole('button');
      expect(cards).toHaveLength(2);

      // All cards should be keyboard accessible
      cards.forEach((card) => {
        expect(card).toHaveAttribute('tabindex', '0');
      });
    });

    it('should handle disabled cards correctly in navigation', () => {
      const countries: CountryData[] = [
        { code: 'FR', name: 'France' },
        { code: 'IT', name: 'Italy', disabled: true },
        { code: 'ES', name: 'Spain' },
      ];

      renderWithProvider(
        <>
          {countries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </>
      );

      const franceCard = screen.getByRole('button', { name: /Select France/i });
      const italyCard = screen.getByRole('button', { name: /Select Italy/i });
      const spainCard = screen.getByRole('button', { name: /Select Spain/i });

      expect(franceCard).toHaveAttribute('tabindex', '0');
      expect(italyCard).toHaveAttribute('tabindex', '-1');
      expect(spainCard).toHaveAttribute('tabindex', '0');
    });
  });
});
