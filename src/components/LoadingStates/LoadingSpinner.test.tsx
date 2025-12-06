import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n for tests
const i18n = i18next.createInstance();
i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        common: {
          loading: 'Loading...',
          loadingIndicator: 'Loading indicator',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

describe('LoadingSpinner', () => {
  it('renders spinner with default message', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingSpinner />
      </I18nextProvider>
    );

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('renders custom message when provided', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingSpinner message="Calculating..." />
      </I18nextProvider>
    );

    expect(screen.getByText('Calculating...')).toBeInTheDocument();
  });

  it('hides message when showMessage is false', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingSpinner message="Loading" showMessage={false} />
      </I18nextProvider>
    );

    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders with correct size classes', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <LoadingSpinner size="large" />
      </I18nextProvider>
    );

    const spinner = container.querySelector('.spinner');
    expect(spinner).toHaveStyle('width: 128px');
  });

  it('has proper accessibility attributes', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingSpinner ariaLabel="Fetching data" />
      </I18nextProvider>
    );

    const spinner = screen.getByRole('status', { name: 'Fetching data' });
    expect(spinner).toBeInTheDocument();
  });
});
