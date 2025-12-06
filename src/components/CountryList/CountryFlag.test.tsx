import { render, screen } from '@testing-library/react';
import { CountryFlag } from './CountryFlag';

describe('CountryFlag Component', () => {
  describe('Rendering', () => {
    it('should render flag emoji for US', () => {
      render(<CountryFlag countryCode="US" countryName="United States" />);

      const flag = screen.getByRole('img');
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveTextContent('🇺🇸');
    });

    it('should render flag emoji for DE', () => {
      render(<CountryFlag countryCode="DE" countryName="Germany" />);

      const flag = screen.getByRole('img');
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveTextContent('🇩🇪');
    });

    it('should render flag emoji for FR', () => {
      render(<CountryFlag countryCode="FR" countryName="France" />);

      const flag = screen.getByRole('img');
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveTextContent('🇫🇷');
    });

    it('should render flag emoji for GB', () => {
      render(<CountryFlag countryCode="GB" countryName="United Kingdom" />);

      const flag = screen.getByRole('img');
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveTextContent('🇬🇧');
    });

    it('should handle lowercase country codes', () => {
      render(<CountryFlag countryCode="es" countryName="Spain" />);

      const flag = screen.getByRole('img');
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveTextContent('🇪🇸');
    });
  });

  describe('Accessibility', () => {
    it('should have correct role attribute', () => {
      render(<CountryFlag countryCode="IT" countryName="Italy" />);

      const flag = screen.getByRole('img');
      expect(flag).toHaveAttribute('role', 'img');
    });

    it('should have correct aria-label', () => {
      render(<CountryFlag countryCode="NL" countryName="Netherlands" />);

      const flag = screen.getByRole('img');
      expect(flag).toHaveAttribute('aria-label', 'Netherlands flag');
    });

    it('should have title attribute with country name', () => {
      render(<CountryFlag countryCode="BE" countryName="Belgium" />);

      const flag = screen.getByRole('img');
      expect(flag).toHaveAttribute('title', 'Belgium');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      render(
        <CountryFlag
          countryCode="AT"
          countryName="Austria"
          className="custom-flag-class"
        />
      );

      const flag = screen.getByRole('img');
      expect(flag).toHaveClass('custom-flag-class');
    });

    it('should work without className', () => {
      render(<CountryFlag countryCode="CH" countryName="Switzerland" />);

      const flag = screen.getByRole('img');
      expect(flag).toBeInTheDocument();
    });
  });

  describe('Multiple Country Codes', () => {
    it('should render correctly for SE', () => {
      render(<CountryFlag countryCode="SE" countryName="Sweden" />);

      expect(screen.getByRole('img')).toHaveTextContent('🇸🇪');
    });

    it('should render correctly for PL', () => {
      render(<CountryFlag countryCode="PL" countryName="Poland" />);

      expect(screen.getByRole('img')).toHaveTextContent('🇵🇱');
    });

    it('should render correctly for GR', () => {
      render(<CountryFlag countryCode="GR" countryName="Greece" />);

      expect(screen.getByRole('img')).toHaveTextContent('🇬🇷');
    });

    it('should render correctly for CZ', () => {
      render(<CountryFlag countryCode="CZ" countryName="Czech Republic" />);

      expect(screen.getByRole('img')).toHaveTextContent('🇨🇿');
    });
  });
});
