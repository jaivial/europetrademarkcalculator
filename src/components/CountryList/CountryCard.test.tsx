import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { CountryCard } from './CountryCard';
import type { CountryData } from './CountryCard';

const mockCountry: CountryData = {
  code: 'US',
  name: 'United States',
};

const mockCountryDisabled: CountryData = {
  code: 'GB',
  name: 'United Kingdom',
  disabled: true,
};

describe('CountryCard Component', () => {
  // Wrapper for Jotai Provider
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider>{component}</Provider>);
  };

  describe('Rendering', () => {
    it('should render country card with correct content', () => {
      renderWithProvider(<CountryCard country={mockCountry} />);

      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('US')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /United States flag/i })).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      renderWithProvider(
        <CountryCard country={mockCountry} className="custom-class" />
      );

      const card = screen.getByRole('button');
      expect(card).toHaveClass('custom-class');
    });

    it('should have correct accessibility attributes', () => {
      renderWithProvider(<CountryCard country={mockCountry} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('aria-label', 'Select United States');
      expect(card).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Selection States', () => {
    it('should show selected state when selected prop is true', () => {
      renderWithProvider(<CountryCard country={mockCountry} selected={true} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-pressed', 'true');
    });

    it('should show unselected state when selected prop is false', () => {
      renderWithProvider(<CountryCard country={mockCountry} selected={false} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      renderWithProvider(
        <CountryCard country={mockCountry} onClick={handleClick} />
      );

      const card = screen.getByRole('button');
      await userEvent.click(card);

      expect(handleClick).toHaveBeenCalledWith(mockCountry);
    });

    it('should handle keyboard navigation with Enter key', async () => {
      const handleClick = vi.fn();
      renderWithProvider(
        <CountryCard country={mockCountry} onClick={handleClick} />
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalled();
    });

    it('should handle keyboard navigation with Space key', async () => {
      const handleClick = vi.fn();
      renderWithProvider(
        <CountryCard country={mockCountry} onClick={handleClick} />
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: ' ' });

      expect(handleClick).toHaveBeenCalled();
    });

    it('should not trigger click when disabled', async () => {
      const handleClick = vi.fn();
      renderWithProvider(
        <CountryCard
          country={mockCountryDisabled}
          onClick={handleClick}
        />
      );

      const card = screen.getByRole('button');
      await userEvent.click(card);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled card with correct attributes', () => {
      renderWithProvider(<CountryCard country={mockCountryDisabled} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabindex', '-1');
      expect(card).toHaveAttribute('aria-disabled', 'true');
    });

    it('should prevent selection when disabled', async () => {
      const handleClick = vi.fn();
      renderWithProvider(
        <CountryCard
          country={mockCountryDisabled}
          onClick={handleClick}
        />
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Test IDs', () => {
    it('should have default test ID based on country code', () => {
      renderWithProvider(<CountryCard country={mockCountry} />);

      expect(screen.getByTestId('country-card-US')).toBeInTheDocument();
    });

    it('should use custom test ID when provided', () => {
      renderWithProvider(
        <CountryCard country={mockCountry} testId="custom-test-id" />
      );

      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
    });
  });

  describe('Multiple Countries', () => {
    it('should render Germany correctly', () => {
      const germany: CountryData = { code: 'DE', name: 'Germany' };
      renderWithProvider(<CountryCard country={germany} />);

      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.getByText('DE')).toBeInTheDocument();
    });

    it('should render France correctly', () => {
      const france: CountryData = { code: 'FR', name: 'France' };
      renderWithProvider(<CountryCard country={france} />);

      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('FR')).toBeInTheDocument();
    });

    it('should render Spain correctly', () => {
      const spain: CountryData = { code: 'ES', name: 'Spain' };
      renderWithProvider(<CountryCard country={spain} />);

      expect(screen.getByText('Spain')).toBeInTheDocument();
      expect(screen.getByText('ES')).toBeInTheDocument();
    });
  });
});
