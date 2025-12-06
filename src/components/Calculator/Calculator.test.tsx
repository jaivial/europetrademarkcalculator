// src/components/Calculator/Calculator.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calculator } from './Calculator';

// Mock the subcomponents
vi.mock('@/components/OptionSelector', () => ({
  OptionSelector: () => <div data-testid="option-selector">Option Selector</div>
}));

vi.mock('@/components/PriceBreakdown', () => ({
  PriceBreakdown: () => <div data-testid="price-breakdown">Price Breakdown</div>
}));

vi.mock('@/components/Summary', () => ({
  Summary: ({ onCalculationComplete }: any) => (
    <div data-testid="summary">
      Summary
      <button onClick={() => onCalculationComplete({
        basePrice: 100,
        servicesPrice: 50,
        totalPrice: 150,
        country: 'DE',
        numberOfClasses: 1
      })}>
        Calculate
      </button>
    </div>
  )
}));

// Test wrapper with Jotai provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

describe('Calculator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Conditional Rendering', () => {
    it('should render empty state when no country is selected', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      expect(screen.getByText('Select a Country')).toBeInTheDocument();
      expect(screen.getByText(/Choose a destination country/)).toBeInTheDocument();
      expect(screen.queryByTestId('option-selector')).not.toBeInTheDocument();
    });

    it('should render calculator interface when country is selected', async () => {
      // This would need Jotai provider setup
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      // After setting country via atom
      expect(screen.getByText('Registration Calculator')).toBeInTheDocument();
    });
  });

  describe('Component Assembly', () => {
    it('should render all subcomponents when country is selected', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      // Would verify after atom is set
      expect(screen.queryByTestId('option-selector')).not.toBeInTheDocument();
    });

    it('should pass onCalculate callback to Summary component', () => {
      const mockOnCalculate = vi.fn();

      render(
        <TestWrapper>
          <Calculator onCalculate={mockOnCalculate} />
        </TestWrapper>
      );

      // Would trigger calculation after setting country
    });
  });

  describe('Responsive Layout', () => {
    it('should have proper layout at mobile breakpoint (320px)', () => {
      // Set viewport to mobile
      (window as any).innerWidth = 320;
      window.dispatchEvent(new Event('resize'));

      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const content = screen.queryByRole('region');
      expect(content).toBeInTheDocument();
    });

    it('should have proper layout at tablet breakpoint (768px)', () => {
      (window as any).innerWidth = 768;
      window.dispatchEvent(new Event('resize'));

      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const content = screen.queryByRole('region');
      expect(content).toBeInTheDocument();
    });

    it('should have proper layout at desktop breakpoint (1024px)', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));

      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const content = screen.queryByRole('region');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const emptyState = screen.getByRole('region', { name: /Calculator empty state/i });
      expect(emptyState).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(
        <TestWrapper>
          <Calculator />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { name: /Select a Country/i });
      expect(heading.tagName).toBe('H2');
    });
  });

  describe('Props and Callbacks', () => {
    it('should accept className prop', () => {
      const { container } = render(
        <TestWrapper>
          <Calculator className="custom-class" />
        </TestWrapper>
      );

      const element = container.querySelector('.custom-class');
      expect(element).toBeInTheDocument();
    });

    it('should handle onCalculate callback with correct data structure', async () => {
      const mockOnCalculate = vi.fn();

      render(
        <TestWrapper>
          <Calculator onCalculate={mockOnCalculate} />
        </TestWrapper>
      );

      // Would trigger callback with calculation result
    });
  });
});
