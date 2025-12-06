import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { PriceItem } from './PriceItem';

describe('PriceItem', () => {
  beforeAll(async () => {
    await i18next
      .use(initReactI18next)
      .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
          en: {
            common: {},
            calculator: {},
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

  it('renders label and amount', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Base Fee" amount={100} />
      </I18nextProvider>
    );

    expect(screen.getByText('Base Fee')).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it('formats currency correctly for EUR', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Filing Fee" amount={250.50} currency="EUR" />
      </I18nextProvider>
    );

    const amountElement = screen.getByText(/250/);
    expect(amountElement).toBeInTheDocument();
    expect(amountElement.textContent).toContain('250');
  });

  it('displays quantity and unit price when provided', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem
          label="Per Class"
          amount={300}
          quantity={3}
          unitPrice={100}
        />
      </I18nextProvider>
    );

    expect(screen.getByText('Per Class')).toBeInTheDocument();
    expect(screen.getByText(/3x/)).toBeInTheDocument();
  });

  it('applies default variant styling', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Test" amount={100} variant="default" testId="test-item" />
      </I18nextProvider>
    );

    const item = screen.getByTestId('test-item');
    expect(item.className).toContain('default');
  });

  it('applies highlight variant styling', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Total" amount={500} variant="highlight" testId="highlight-item" />
      </I18nextProvider>
    );

    const item = screen.getByTestId('highlight-item');
    expect(item.className).toContain('highlight');
  });

  it('uses custom testId when provided', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Test" amount={100} testId="custom-test-id" />
      </I18nextProvider>
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('formats currency for German locale', async () => {
    await i18next.changeLanguage('de');

    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Gebühr" amount={1234.56} currency="EUR" />
      </I18nextProvider>
    );

    const amountElement = screen.getByText(/1.*234/);
    expect(amountElement).toBeInTheDocument();
  });

  it('renders without quantity when not provided', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Base Fee" amount={100} />
      </I18nextProvider>
    );

    expect(screen.queryByText(/x/)).not.toBeInTheDocument();
  });

  it('has proper accessibility role', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <PriceItem label="Test" amount={100} testId="accessible-item" />
      </I18nextProvider>
    );

    const item = screen.getByTestId('accessible-item');
    expect(item).toHaveAttribute('role', 'row');
  });
});
