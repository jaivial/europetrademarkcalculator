import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import ErrorBoundary from './ErrorBoundary';
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
          retry: 'Try Again',
        },
        errors: {
          title: 'Error',
          boundaryFallback: 'Something went wrong. Please try refreshing the page.',
          details: 'Error Details',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Mock component that throws error
const ThrowError: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      </I18nextProvider>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('displays fallback UI when child component throws error', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </I18nextProvider>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays custom fallback message', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary fallbackMessage="Custom error message">
          <ThrowError />
        </ErrorBoundary>
      </I18nextProvider>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary showDetails={true}>
          <ThrowError />
        </ErrorBoundary>
      </I18nextProvider>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('hides error details when showDetails is false', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary showDetails={false}>
          <ThrowError />
        </ErrorBoundary>
      </I18nextProvider>
    );

    expect(screen.queryByText('Test error')).not.toBeInTheDocument();
  });

  it('calls onError callback when error is caught', () => {
    const onError = jest.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      </I18nextProvider>
    );

    expect(onError).toHaveBeenCalled();
  });

  it('renders reset button and calls onReset', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary showReset={true}>
          <ThrowError />
        </ErrorBoundary>
      </I18nextProvider>
    );

    const resetButton = screen.getByRole('button');
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    // Component should reset and children should render
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
