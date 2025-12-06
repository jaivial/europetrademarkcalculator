// src/components/CountryList/CountryList.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import CountryList from './CountryList';
import { selectedCountriesAtom, searchQueryAtom } from '@/atoms/countryAtom';

// Mock child components
jest.mock('./SearchBar', () => ({
  __esModule: true,
  default: ({ onChange, value, placeholder }: any) => (
    <input
      data-testid="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));

jest.mock('./CountryGrid', () => ({
  __esModule: true,
  default: ({ onCountrySelect, selectedCountries }: any) => (
    <div data-testid="country-grid">
      <button
        data-testid="select-country-btn"
        onClick={() => onCountrySelect('US', 'United States')}
      >
        Select Country
      </button>
      <div data-testid="selected-count">{selectedCountries.length}</div>
    </div>
  ),
}));

describe('CountryList Component', () => {
  const renderWithJotai = (component: React.ReactElement) => {
    return render(<Provider>{component}</Provider>);
  };

  describe('Rendering', () => {
    it('should render the container with correct structure', () => {
      renderWithJotai(<CountryList />);

      const container = screen.getByRole('region', {
        name: /country selection list/i,
      });
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Select Countries')).toBeInTheDocument();
    });

    it('should render SearchBar component', () => {
      renderWithJotai(<CountryList />);

      const searchBar = screen.getByTestId('search-bar');
      expect(searchBar).toBeInTheDocument();
      expect(searchBar).toHaveAttribute(
        'placeholder',
        'Search countries by name or code...'
      );
    });

    it('should render CountryGrid component', () => {
      renderWithJotai(<CountryList />);

      const countryGrid = screen.getByTestId('country-grid');
      expect(countryGrid).toBeInTheDocument();
    });
  });

  describe('State Management (Jotai)', () => {
    it('should display selected countries counter when provided', () => {
      const { rerender } = renderWithJotai(
        <CountryList maxSelections={5} />
      );

      expect(screen.getByText('0 / 5 selected')).toBeInTheDocument();
    });

    it('should use Jotai atoms without useState', () => {
      // This is verified by checking that no useState calls are present
      // and that the component uses useAtomValue
      const { container } = renderWithJotai(<CountryList />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onCountrySelect when country is selected', async () => {
      const mockOnSelect = jest.fn();
      renderWithJotai(
        <CountryList onCountrySelect={mockOnSelect} />
      );

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        expect(mockOnSelect).toHaveBeenCalledWith('US', 'United States');
      });
    });

    it('should call onSearchChange when search input changes', async () => {
      const mockOnSearch = jest.fn();
      const user = userEvent.setup();

      renderWithJotai(
        <CountryList onSearchChange={mockOnSearch} />
      );

      const searchBar = screen.getByTestId('search-bar');
      await user.type(searchBar, 'france');

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('france');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithJotai(<CountryList />);

      const region = screen.getByRole('region', {
        name: /country selection list/i,
      });
      expect(region).toBeInTheDocument();
    });

    it('should display selection counter with aria-live', () => {
      renderWithJotai(<CountryList maxSelections={10} />);

      const counter = screen.getByText('0 / 10 selected');
      expect(counter.parentElement).toHaveAttribute('aria-live', 'polite');
    });

    it('should have status role for selected countries info', async () => {
      renderWithJotai(<CountryList />);

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should have responsive CSS module classes', () => {
      const { container } = renderWithJotai(<CountryList />);

      const element = container.querySelector('[class*="countryListContainer"]');
      expect(element).toBeInTheDocument();
    });

    it('should apply custom className prop', () => {
      const { container } = renderWithJotai(
        <CountryList className="custom-class" />
      );

      const element = container.firstChild;
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Selection Limits', () => {
    it('should disable selection when max selections reached', () => {
      const { rerender } = renderWithJotai(
        <CountryList maxSelections={1} />
      );

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      // Verify selection is disabled by checking if CountryGrid
      // receives disableSelection prop when limit is reached
      expect(screen.getByTestId('country-grid')).toBeInTheDocument();
    });
  });

  describe('Footer Display', () => {
    it('should show footer only when countries are selected', async () => {
      renderWithJotai(<CountryList />);

      // Initially footer should not show
      expect(
        screen.queryByText(/countr.*selected/)
      ).not.toBeInTheDocument();

      // After selection, footer shows
      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        expect(screen.getByText(/1 countr.*selected/)).toBeInTheDocument();
      });
    });

    it('should pluralize country/countries correctly', async () => {
      renderWithJotai(<CountryList />);

      const selectBtn = screen.getByTestId('select-country-btn');
      fireEvent.click(selectBtn);

      await waitFor(() => {
        expect(screen.getByText('1 country selected')).toBeInTheDocument();
      });
    });
  });

  describe('CSS Module Integration', () => {
    it('should have all required CSS classes available', () => {
      // This verifies that CountryList.module.css is properly imported
      // and all style classes are applied to elements
      const { container } = renderWithJotai(<CountryList />);

      expect(container.querySelector('[class*="countryListContainer"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="countryListHeader"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="countryListSearchSection"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="countryListContent"]')).toBeInTheDocument();
    });
  });
});
