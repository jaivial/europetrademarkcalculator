import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { PriceTotal } from './PriceTotal';

describe('PriceTotal', () => {
  beforeAll(async () => {
    await i18next
      .use(initReactI18next)
      .init({
        lng: 'en',
        fallbackLng: 'en',
        defaultNS: 'calculator',
        resources: {
          en: {
            calculator: {
              subtotal: 'Subtotal',
              tax: 'Tax',
              totalPrice: 'Total Price',
              priceExclusive: 'Price excludes taxes',
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

  it('renders subtotal correctly', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1000} />
      </I18nextProvider>
    );

    // Check that the component renders
    expect(container.querySelector('.priceTotalRow')).toBeInTheDocument();
    expect(screen.getByText(/1,000/)).toBeInTheDocument();
  });

  it('calculates and displays tax when taxRate > 0', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1000} taxRate={0.19} />
      </I18nextProvider>
    );

    // Check tax row exists
    const taxRows = container.querySelectorAll('.priceTotalRow');
    expect(taxRows.length).toBeGreaterThan(1); // Should have subtotal + tax
    expect(screen.getByText(/19%/)).toBeInTheDocument();
    expect(screen.getByText(/190/)).toBeInTheDocument(); // 19% of 1000
  });

  it('calculates correct total (subtotal + tax)', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1000} taxRate={0.20} />
      </I18nextProvider>
    );

    // Total should be 1200 (1000 + 20%)
    expect(screen.getByText(/1,200/)).toBeInTheDocument();
  });

  it('displays tax notice when taxRate is 0 and not included', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1000} taxRate={0} includesTax={false} />
      </I18nextProvider>
    );

    // Check tax notice is rendered
    const notice = container.querySelector('.priceTotalNotice');
    expect(notice).toBeInTheDocument();
  });

  it('does not display tax notice when tax is included', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1000} taxRate={0} includesTax={true} />
      </I18nextProvider>
    );

    // Check tax notice is not rendered
    const notice = container.querySelector('.priceTotalNotice');
    expect(notice).not.toBeInTheDocument();
  });

  it('formats currency based on locale', async () => {
    await i18next.changeLanguage('de');

    render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1234.56} currency="EUR" />
      </I18nextProvider>
    );

    const amounts = screen.getAllByText(/1.*234/);
    expect(amounts.length).toBeGreaterThan(0);
  });

  it('uses custom testId when provided', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1000} testId="custom-total" />
      </I18nextProvider>
    );

    expect(screen.getByTestId('custom-total')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={1000} testId="accessible-total" />
      </I18nextProvider>
    );

    const element = screen.getByTestId('accessible-total');
    expect(element).toHaveAttribute('role', 'region');
    expect(element).toHaveAttribute('aria-label');
  });

  it('displays total without tax when taxRate is 0', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={500} taxRate={0} />
      </I18nextProvider>
    );

    // Should have subtotal row and final total but no tax row (only 2 rows, not 3)
    const taxRows = container.querySelectorAll('.priceTotalRow');
    expect(taxRows.length).toBe(1); // Only subtotal row, no tax row
    // Total should equal subtotal
    const totalElements = screen.getAllByText(/500/);
    expect(totalElements.length).toBeGreaterThanOrEqual(1);
  });

  it('calculates decimal tax rates correctly', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={100} taxRate={0.195} />
      </I18nextProvider>
    );

    // 19.5% should be displayed as 19% or 20% (rounded)
    expect(container.querySelector('.priceTotalRow')).toBeInTheDocument();
    expect(screen.getByText(/19%|20%/)).toBeInTheDocument();
  });

  it('handles zero subtotal correctly', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <PriceTotal subtotal={0} taxRate={0.19} />
      </I18nextProvider>
    );

    // Component should render
    expect(container.querySelector('.priceTotal')).toBeInTheDocument();
    // Should show 0.00 formatted
    const zeroElements = screen.getAllByText(/0\.00/);
    expect(zeroElements.length).toBeGreaterThan(0);
  });
});
