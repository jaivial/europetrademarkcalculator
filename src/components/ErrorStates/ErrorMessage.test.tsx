import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import ErrorMessage from './ErrorMessage';
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
          dismiss: 'Dismiss',
        },
        errors: {
          code: 'Error Code',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorMessage message="An error occurred" />
      </I18nextProvider>
    );

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  it('renders all optional fields', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorMessage
          message="Error message"
          details="Error details"
          code="ERR001"
        />
      </I18nextProvider>
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Error details')).toBeInTheDocument();
    expect(screen.getByText(/ERR001/)).toBeInTheDocument();
  });

  it('shows dismiss button when dismissable is true', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorMessage message="Error" dismissable={true} />
      </I18nextProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('hides dismiss button when dismissable is false', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorMessage message="Error" dismissable={false} />
      </I18nextProvider>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('dismisses error when dismiss button clicked', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ErrorMessage message="Error" dismissable={true} />
      </I18nextProvider>
    );

    const dismissButton = screen.getByRole('button');
    fireEvent.click(dismissButton);

    expect(container.textContent).not.toContain('Error');
  });

  it('calls onDismiss callback', () => {
    const onDismiss = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorMessage message="Error" onDismiss={onDismiss} />
      </I18nextProvider>
    );

    const dismissButton = screen.getByRole('button');
    fireEvent.click(dismissButton);

    expect(onDismiss).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorMessage message="Error" />
      </I18nextProvider>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });
});
