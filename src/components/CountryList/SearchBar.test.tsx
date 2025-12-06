import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'jotai';
import { countrySearchQueryAtom } from '@/atoms/countryAtom';
import { useAtom } from 'jotai';
import { SearchBar } from './SearchBar';

/**
 * Test wrapper component to provide Jotai context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider>{children}</Provider>
);

/**
 * Component to display atom state for testing
 */
const AtomStateDisplay: React.FC = () => {
  const [value] = useAtom(countrySearchQueryAtom);
  return <div data-testid="atom-state">{value}</div>;
};

describe('SearchBar Component - Debounce Tests', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Debounced Input', () => {
    it('should debounce input changes by 300ms default', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
          <AtomStateDisplay />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      // Type multiple characters rapidly
      fireEvent.change(input, { target: { value: 'a' } });
      expect(mockOnChange).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: 'ab' } });
      expect(mockOnChange).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: 'abc' } });
      expect(mockOnChange).not.toHaveBeenCalled();

      // Advance timers by 300ms
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('abc');
        expect(mockOnChange).toHaveBeenCalledTimes(1);
      });
    });

    it('should reset debounce timer on new input', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(200);
      expect(mockOnChange).not.toHaveBeenCalled();

      // New input resets timer
      fireEvent.change(input, { target: { value: 'test2' } });
      jest.advanceTimersByTime(200);
      expect(mockOnChange).not.toHaveBeenCalled();

      // Total 400ms passed, but only 200ms since last input
      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('test2');
      });
    });

    it('should allow custom debounce delay', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} debounceDelay={500} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'custom' } });
      jest.advanceTimersByTime(300);
      expect(mockOnChange).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('custom');
      });
    });
  });

  describe('Clear Button Functionality', () => {
    it('should show clear button only when search has value', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      // No clear button initially
      expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();

      // Type some text
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      // Clear button should appear
      await waitFor(() => {
        expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
      });
    });

    it('should clear search query and reset input', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
          <AtomStateDisplay />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      // Set search value
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('test');
      });

      // Clear search
      const clearButton = screen.getByLabelText(/clear search/i);
      fireEvent.click(clearButton);

      expect(input.value).toBe('');
      expect(mockOnChange).toHaveBeenCalledWith('');
      expect(mockOnChange).toHaveBeenCalledTimes(2);
    });

    it('should focus input after clearing', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      const clearButton = await screen.findByLabelText(/clear search/i);
      fireEvent.click(clearButton);

      expect(document.activeElement).toBe(input);
    });
  });

  describe('Cleanup and Edge Cases', () => {
    it('should cleanup debounce timer on unmount', () => {
      const mockOnChange = jest.fn();
      const { unmount } = render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });

      unmount();
      jest.advanceTimersByTime(300);

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should handle empty string input', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: '' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('');
      });
    });

    it('should handle special characters in search', async () => {
      const mockOnChange = jest.fn();
      render(
        <TestWrapper>
          <SearchBar onSearchChange={mockOnChange} />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test@#$%^&*()' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('test@#$%^&*()');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria labels', () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByLabelText(/search countries/i);
      expect(input).toBeInTheDocument();
    });

    it('should have clear button with aria label', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(300);

      const clearButton = await screen.findByLabelText(/clear search/i);
      expect(clearButton).toHaveAttribute('aria-label');
    });
  });
});
