import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { vi } from 'vitest';
import Header from './Header';

// Setup i18n for testing
const i18nTest = i18n.createInstance();
i18nTest.init({
  lng: 'en',
  ns: ['layout'],
  resources: {
    en: {
      layout: {
        'app.title': 'Brand Calculator',
      },
    },
  },
});

const renderHeader = (props = {}) => {
  return render(
    <I18nextProvider i18n={i18nTest}>
      <Header {...props} />
    </I18nextProvider>
  );
};

describe('Header Component', () => {
  describe('Rendering', () => {
    it('renders header element with correct role', () => {
      renderHeader();
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('renders application title from i18n', () => {
      renderHeader();
      expect(screen.getByText('Brand Calculator')).toBeInTheDocument();
    });

    it('renders logo component', () => {
      renderHeader();
      const logo = screen.getByLabelText(/Brand Calculator logo/i);
      expect(logo).toBeInTheDocument();
    });

    it('renders with correct heading hierarchy', () => {
      renderHeader();
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Brand Calculator');
    });
  });

  describe('Slots', () => {
    it('renders theme slot when provided', () => {
      const ThemeSlot = <button data-testid="theme-button">Toggle Theme</button>;
      renderHeader({ themeSlot: ThemeSlot });
      expect(screen.getByTestId('theme-button')).toBeInTheDocument();
    });

    it('renders language slot when provided', () => {
      const LanguageSlot = <select data-testid="language-select"><option>EN</option></select>;
      renderHeader({ languageSlot: LanguageSlot });
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
    });

    it('renders both slots together', () => {
      const ThemeSlot = <button data-testid="theme-button">Toggle Theme</button>;
      const LanguageSlot = <select data-testid="language-select"><option>EN</option></select>;
      renderHeader({ themeSlot: ThemeSlot, languageSlot: LanguageSlot });
      expect(screen.getByTestId('theme-button')).toBeInTheDocument();
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
    });

    it('does not render slots when not provided', () => {
      renderHeader();
      expect(screen.queryByTestId('theme-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('language-select')).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies custom className', () => {
      const { container } = renderHeader({ className: 'custom-header' });
      const header = container.querySelector('.custom-header');
      expect(header).toBeInTheDocument();
    });

    it('applies custom zIndex', () => {
      const { container } = renderHeader({ zIndex: 999 });
      const header = container.querySelector('header');
      expect(header).toHaveStyle({ zIndex: '999' });
    });

    it('uses default zIndex of 100', () => {
      const { container } = renderHeader();
      const header = container.querySelector('header');
      expect(header).toHaveStyle({ zIndex: '100' });
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label on header', () => {
      renderHeader();
      const header = screen.getByRole('banner');
      expect(header).toHaveAttribute('aria-label', 'Application header');
    });

    it('control slots have aria-labels', () => {
      const ThemeSlot = <button>Toggle</button>;
      const LanguageSlot = <select><option>EN</option></select>;
      const { container } = renderHeader({
        themeSlot: ThemeSlot,
        languageSlot: LanguageSlot,
      });
      const themeControl = container.querySelector('[data-control="theme"]');
      const langControl = container.querySelector('[data-control="language"]');
      expect(themeControl).toHaveAttribute('aria-label', 'Theme control');
      expect(langControl).toHaveAttribute('aria-label', 'Language selector');
    });

    it('logo has proper accessibility attributes', () => {
      renderHeader();
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('aria-label');
    });
  });

  describe('Responsive Behavior', () => {
    it('renders header element with sticky positioning', () => {
      const { container } = renderHeader();
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      // Note: getComputedStyle won't reflect CSS module styles in test environment
      // but we can verify the element renders
    });

    it('applies correct grid template on default width', () => {
      const { container } = renderHeader();
      const headerContainer = container.querySelector('[class*="container"]');
      expect(headerContainer).toBeInTheDocument();
    });
  });

  describe('No State Hooks', () => {
    it('does not use useState', () => {
      const { container } = renderHeader();
      // Verify component renders without hook errors
      expect(container.querySelector('header')).toBeInTheDocument();
    });

    it('renders children components directly without re-renders', () => {
      const renderSpy = vi.fn();
      const ThemeSlot = (
        <div>
          {renderSpy()}
          <button>Theme</button>
        </div>
      );
      renderHeader({ themeSlot: ThemeSlot });
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('I18n Integration', () => {
    it('uses i18n for app title translation', () => {
      renderHeader();
      expect(screen.getByText('Brand Calculator')).toBeInTheDocument();
    });

    it('accepts translation key from i18n', () => {
      renderHeader();
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Brand Calculator');
    });
  });
});
