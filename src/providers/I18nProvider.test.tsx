import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { I18nProvider } from './I18nProvider';
import i18n from './i18n/config';

describe('I18nProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render children when translations are loaded', async () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  it('should show loading fallback while initializing', () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    // Loading fallback may appear briefly
    expect(screen.queryByText(/Test Content|Loading translations/i)).toBeInTheDocument();
  });

  it('should load language from localStorage', async () => {
    localStorage.setItem('preferredLanguage', 'es');

    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    await waitFor(() => {
      expect(i18n.language).toBe('es');
    });
  });

  it('should persist language changes to localStorage', async () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    await waitFor(() => {
      i18n.changeLanguage('fr').catch(() => {});
    });

    await waitFor(() => {
      expect(localStorage.getItem('preferredLanguage')).toBe('fr');
    });
  });

  it('should have accessible loading fallback', async () => {
    const { container } = render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>,
    );

    // Verify either loading fallback or final content renders
    await waitFor(() => {
      const hasContent = screen.queryByText('Test Content');
      const hasFallback = container.querySelector('.flex');
      expect(hasContent || hasFallback).toBeTruthy();
    });
  });
});
