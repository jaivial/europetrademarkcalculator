import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import LoadingOverlay from './LoadingOverlay';
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
          loadingOverlay: 'Loading overlay',
          loadingIndicator: 'Loading indicator',
          cancel: 'Cancel',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

describe('LoadingOverlay', () => {
  it('does not render when isVisible is false', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <LoadingOverlay isVisible={false} />
      </I18nextProvider>
    );

    expect(container.querySelector('.overlayContainer')).not.toBeInTheDocument();
  });

  it('renders when isVisible is true', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingOverlay isVisible={true} />
      </I18nextProvider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays custom message', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingOverlay isVisible={true} message="Processing..." />
      </I18nextProvider>
    );

    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('renders cancel button when showCancel is true', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingOverlay isVisible={true} showCancel={true} />
      </I18nextProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <LoadingOverlay
          isVisible={true}
          showCancel={true}
          onCancel={onCancel}
        />
      </I18nextProvider>
    );

    const cancelButton = screen.getByRole('button');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('applies correct z-index', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <LoadingOverlay isVisible={true} zIndex={2000} />
      </I18nextProvider>
    );

    const overlay = container.querySelector('.overlayContainer');
    expect(overlay).toHaveStyle('z-index: 2000');
  });
});
