# Frontend Task 039: Loading & Error States Components

## Metadata
- **Task**: 39 of 40
- **Area**: Frontend
- **Feature**: Loading and Error State Components
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create reusable loading and error state components for the application. Build LoadingSpinner for inline loading states, LoadingOverlay for full-page/modal overlays, ErrorBoundary as a class-based React error boundary, and ErrorMessage component with i18n support for displaying error messages to users. These components will be used throughout the application for handling async operations and error states with responsive sizing from 200px to 3000px viewports.

---

## Subtasks

### Subtask 039.1: LoadingSpinner Component

#### Status
status: pending

#### Objective
Create a responsive LoadingSpinner component that displays an animated spinner for inline loading states with customizable size and message.

#### Context
The LoadingSpinner component is used for inline loading indicators (e.g., inside cards, buttons, or sections). Must support responsive sizing from 200px to 3000px and accept optional loading message. Uses CSS animations for smooth spinning effect.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/LoadingStates/LoadingSpinner.tsx` - Main spinner component
- `src/components/LoadingStates/LoadingSpinner.test.tsx` - Component tests
- `src/components/LoadingStates/LoadingStates.module.css` - Spinner styles

#### Implementation

**src/components/LoadingStates/LoadingSpinner.tsx**:
```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoadingStates.module.css';

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner in pixels
   * Responsive: 24px on mobile, 48px on desktop
   * Supports range from 24px to 128px
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Optional loading message to display below spinner
   * If not provided, uses i18n default message
   */
  message?: string;

  /**
   * Show or hide the loading message
   * Default: true
   */
  showMessage?: boolean;

  /**
   * Custom class name for styling
   */
  className?: string;

  /**
   * Accessibility label for screen readers
   */
  ariaLabel?: string;
}

/**
 * LoadingSpinner Component
 * Displays an animated spinner for loading states
 * Responsive and accessible with i18n support
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message,
  showMessage = true,
  className,
  ariaLabel,
}) => {
  const { t } = useTranslation();

  const sizeMap = {
    small: 24,
    medium: 48,
    large: 128,
  };

  const spinnerSize = sizeMap[size];
  const displayMessage = message || t('common.loading', 'Loading...');

  return (
    <div
      className={`${styles.spinnerContainer} ${className || ''}`}
      role="status"
      aria-label={ariaLabel || t('common.loadingIndicator', 'Loading indicator')}
    >
      <div
        className={styles.spinner}
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          borderWidth: `${Math.max(2, spinnerSize / 12)}px`,
        }}
      />

      {showMessage && (
        <p className={styles.loadingMessage}>{displayMessage}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
```

**src/components/LoadingStates/LoadingSpinner.test.tsx**:
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';
import i18n from '@/i18n';

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
```

#### Acceptance Criteria
- [ ] LoadingSpinner renders without errors
- [ ] Supports three size options (small, medium, large)
- [ ] Message displays by default and hides when showMessage=false
- [ ] Custom message overrides i18n default
- [ ] Responsive styling from 200px to 3000px viewport
- [ ] Proper accessibility attributes (role, aria-label)
- [ ] i18n integration for default messages
- [ ] All props are typed correctly
- [ ] Tests pass with 90%+ coverage
- [ ] No console errors or warnings

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- LoadingSpinner
```

---

### Subtask 039.2: LoadingOverlay Component

#### Status
status: pending

#### Objective
Create a LoadingOverlay component for full-page or modal overlay loading states with backdrop and optional cancel functionality.

#### Context
The LoadingOverlay component displays a full-page or container overlay with spinner and optional cancel button. Used for operations that block user interaction. Must be responsive and support custom backdrop opacity.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/LoadingStates/LoadingOverlay.tsx` - Overlay component
- `src/components/LoadingStates/LoadingOverlay.test.tsx` - Component tests
- `src/components/LoadingStates/LoadingStates.module.css` - Updated with overlay styles (shared CSS file)

#### Implementation

**src/components/LoadingStates/LoadingOverlay.tsx**:
```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';
import styles from './LoadingStates.module.css';

export interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  isVisible: boolean;

  /**
   * Message to display on overlay
   * If not provided, uses i18n default message
   */
  message?: string;

  /**
   * Opacity of backdrop (0-1)
   * Default: 0.7
   */
  backdropOpacity?: number;

  /**
   * Whether to show cancel button
   * Default: false
   */
  showCancel?: boolean;

  /**
   * Callback when cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * Size of spinner
   * Default: 'large'
   */
  spinnerSize?: 'small' | 'medium' | 'large';

  /**
   * z-index for overlay
   * Default: 1000
   */
  zIndex?: number;
}

/**
 * LoadingOverlay Component
 * Full-page or container overlay with spinner
 * Prevents user interaction while loading
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message,
  backdropOpacity = 0.7,
  showCancel = false,
  onCancel,
  spinnerSize = 'large',
  zIndex = 1000,
}) => {
  const { t } = useTranslation();

  if (!isVisible) {
    return null;
  }

  const displayMessage = message || t('common.loading', 'Loading...');

  return (
    <div
      className={styles.overlayContainer}
      style={{
        zIndex,
        backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
      }}
      role="status"
      aria-label={t('common.loadingOverlay', 'Loading overlay')}
      aria-live="polite"
    >
      <div className={styles.overlayContent}>
        <LoadingSpinner
          size={spinnerSize}
          message={displayMessage}
          showMessage={true}
        />

        {showCancel && onCancel && (
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            aria-label={t('common.cancel', 'Cancel')}
          >
            {t('common.cancel', 'Cancel')}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
```

**src/components/LoadingStates/LoadingOverlay.test.tsx**:
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import LoadingOverlay from './LoadingOverlay';
import i18n from '@/i18n';

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
```

#### Acceptance Criteria
- [ ] LoadingOverlay does not render when isVisible=false
- [ ] LoadingOverlay renders when isVisible=true
- [ ] Backdrop opacity customizable from 0-1
- [ ] Cancel button shows/hides based on showCancel prop
- [ ] onCancel callback fires when cancel button clicked
- [ ] Custom z-index applied correctly
- [ ] i18n support for message and button text
- [ ] Proper accessibility attributes (role, aria-label, aria-live)
- [ ] Responsive design for 200px-3000px viewports
- [ ] Tests pass with 90%+ coverage

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- LoadingOverlay
```

---

### Subtask 039.3: Loading Styles Module

#### Status
status: pending

#### Objective
Create CSS module with responsive styles for LoadingSpinner and LoadingOverlay components supporting 200px to 3000px viewports.

#### Context
The CSS module provides all styling for loading components. Must support responsive sizing, animations, and proper contrast for accessibility. Uses media queries to adapt to different screen sizes.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/LoadingStates/LoadingStates.module.css` - All loading component styles

#### Implementation

**src/components/LoadingStates/LoadingStates.module.css**:
```css
/* Spinner Container */
.spinnerContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
}

/* Spinner Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Dark mode spinner */
:global(.dark) .spinner {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid rgba(255, 255, 255, 0.9);
}

/* Loading Message */
.loadingMessage {
  margin: 0;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  font-weight: 500;
}

:global(.dark) .loadingMessage {
  color: rgba(255, 255, 255, 0.8);
}

/* Overlay Container */
.overlayContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
}

/* Overlay Content */
.overlayContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  max-width: 90vw;
  max-height: 90vh;
}

:global(.dark) .overlayContent {
  background: #1a1a1a;
}

/* Cancel Button */
.cancelButton {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: #dc2626;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancelButton:hover {
  background-color: #b91c1c;
}

.cancelButton:active {
  background-color: #991b1b;
}

.cancelButton:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

:global(.dark) .cancelButton:focus {
  outline-color: #60a5fa;
}

/* Responsive Sizing - Mobile (200px - 640px) */
@media (max-width: 640px) {
  .spinnerContainer {
    gap: 0.75rem;
    padding: 1rem;
  }

  .loadingMessage {
    font-size: 0.875rem;
  }

  .overlayContent {
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .cancelButton {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
}

/* Responsive Sizing - Tablet (641px - 1024px) */
@media (min-width: 641px) and (max-width: 1024px) {
  .spinnerContainer {
    gap: 1rem;
    padding: 1.5rem;
  }

  .loadingMessage {
    font-size: 1rem;
  }

  .overlayContent {
    gap: 1.75rem;
    padding: 2rem;
  }

  .cancelButton {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

/* Responsive Sizing - Desktop (1025px - 3000px) */
@media (min-width: 1025px) {
  .spinnerContainer {
    gap: 1.25rem;
    padding: 2rem;
  }

  .loadingMessage {
    font-size: 1.125rem;
  }

  .overlayContent {
    gap: 2.5rem;
    padding: 2.5rem;
  }

  .cancelButton {
    padding: 0.875rem 1.75rem;
    font-size: 1.125rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border: 2px solid rgba(0, 0, 0, 0.3);
  }
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  .spinnerContainer {
    border: 1px solid currentColor;
    border-radius: 0.25rem;
  }

  .spinner {
    border: 6px solid rgba(0, 0, 0, 0.2);
    border-top: 6px solid rgba(0, 0, 0, 1);
  }
}
```

#### Acceptance Criteria
- [ ] Spinner animation smooth and continuous
- [ ] Styles responsive from 200px to 3000px
- [ ] Dark mode support for both components
- [ ] Cancel button has proper hover/active/focus states
- [ ] Reduced motion preference respected
- [ ] High contrast mode supported
- [ ] Proper color contrast for accessibility
- [ ] No layout shift on mode changes
- [ ] CSS compiles without errors
- [ ] Backdrop blur effect works across browsers

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run build
# Verify CSS module compiles
```

---

### Subtask 039.4: ErrorBoundary Class Component

#### Status
status: pending

#### Objective
Create ErrorBoundary as a class-based component that catches React errors and displays user-friendly error messages with i18n support.

#### Context
React Error Boundaries must be class components. ErrorBoundary catches errors in child components and displays a fallback UI. Must support custom error messages, error logging, and i18n for user messages.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/ErrorStates/ErrorBoundary.tsx` - Class component error boundary
- `src/components/ErrorStates/ErrorBoundary.test.tsx` - Component tests
- `src/components/ErrorStates/ErrorStates.module.css` - Error styles

#### Implementation

**src/components/ErrorStates/ErrorBoundary.tsx**:
```typescript
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorStates.module.css';

export interface ErrorBoundaryProps {
  children: ReactNode;

  /**
   * Custom fallback error message
   * If not provided, uses i18n default message
   */
  fallbackMessage?: string;

  /**
   * Whether to show error details in development
   * Default: true in development, false in production
   */
  showDetails?: boolean;

  /**
   * Callback when error is caught
   * Useful for error logging/tracking
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;

  /**
   * Whether to show reset button
   * Default: true
   */
  showReset?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 * Catches errors in child components and displays fallback UI
 * Must be a class component (React requirement for error boundaries)
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  private resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          fallbackMessage={this.props.fallbackMessage}
          showDetails={this.props.showDetails}
          showReset={this.props.showReset}
          onReset={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorBoundaryFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  fallbackMessage?: string;
  showDetails?: boolean;
  showReset?: boolean;
  onReset: () => void;
}

/**
 * Fallback UI component displayed when error is caught
 * This is a functional component (can't be part of class component render directly)
 */
const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  errorInfo,
  fallbackMessage,
  showDetails = process.env.NODE_ENV === 'development',
  showReset = true,
  onReset,
}) => {
  const { t } = useTranslation();

  const displayMessage = fallbackMessage || t(
    'errors.boundaryFallback',
    'Something went wrong. Please try refreshing the page.'
  );

  return (
    <div className={styles.errorBoundary} role="alert">
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>
          {t('errors.title', 'Error')}
        </h2>

        <p className={styles.errorMessage}>{displayMessage}</p>

        {showDetails && error && errorInfo && (
          <details className={styles.errorDetails}>
            <summary>
              {t('errors.details', 'Error Details')}
            </summary>
            <pre className={styles.errorStack}>
              {error.toString()}
              {'\n\n'}
              {errorInfo.componentStack}
            </pre>
          </details>
        )}

        {showReset && (
          <button
            className={styles.resetButton}
            onClick={onReset}
            aria-label={t('common.retry', 'Retry')}
          >
            {t('common.retry', 'Try Again')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundary;
export { ErrorBoundaryFallback };
```

**src/components/ErrorStates/ErrorBoundary.test.tsx**:
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import ErrorBoundary from './ErrorBoundary';
import i18n from '@/i18n';

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
```

#### Acceptance Criteria
- [ ] ErrorBoundary is a class component (React requirement)
- [ ] Catches and displays errors from child components
- [ ] Custom fallback message overrides i18n default
- [ ] Error details shown in development mode
- [ ] Error details hidden in production
- [ ] Reset button resets error state
- [ ] onError callback fires when error caught
- [ ] i18n support for all messages
- [ ] Proper accessibility attributes (role="alert")
- [ ] Tests pass with 90%+ coverage

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- ErrorBoundary
```

---

### Subtask 039.5: ErrorMessage Component & Error Styles

#### Status
status: pending

#### Objective
Create ErrorMessage component for displaying error messages with icons and optional dismissal, plus CSS module with responsive error styles supporting 200px to 3000px.

#### Context
The ErrorMessage component displays user-friendly error messages with proper styling and accessibility. Supports inline errors, alerts, and dismissable notifications. CSS module provides responsive styling for both light and dark modes.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/ErrorStates/ErrorMessage.tsx` - Error message component
- `src/components/ErrorStates/ErrorMessage.test.tsx` - Component tests
- `src/components/ErrorStates/ErrorStates.module.css` - Error styles (shared)
- `src/components/ErrorStates/index.ts` - Export barrel file

#### Implementation

**src/components/ErrorStates/ErrorMessage.tsx**:
```typescript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorStates.module.css';

export interface ErrorMessageProps {
  /**
   * Error message to display
   */
  message: string;

  /**
   * Type of error display
   * 'inline': Within content area
   * 'alert': Block with background
   * 'banner': Full-width at top/bottom
   * Default: 'inline'
   */
  type?: 'inline' | 'alert' | 'banner';

  /**
   * Whether error can be dismissed
   * Default: true
   */
  dismissable?: boolean;

  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;

  /**
   * Detailed error description
   */
  details?: string;

  /**
   * Error code or identifier
   */
  code?: string;

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * ErrorMessage Component
 * Displays error messages with optional dismissal
 * Responsive and accessible with i18n support
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'inline',
  dismissable = true,
  onDismiss,
  details,
  code,
  className,
}) => {
  const { t } = useTranslation();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  const handleDismiss = (): void => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={`${styles.errorMessage} ${styles[`errorMessage${type}`]} ${className || ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.errorIcon}>
        <span aria-hidden="true">⚠️</span>
      </div>

      <div className={styles.errorBody}>
        <p className={styles.errorText}>{message}</p>

        {details && (
          <p className={styles.errorDetails}>{details}</p>
        )}

        {code && (
          <p className={styles.errorCode}>
            {t('errors.code', 'Error Code')}: {code}
          </p>
        )}
      </div>

      {dismissable && (
        <button
          className={styles.dismissButton}
          onClick={handleDismiss}
          aria-label={t('common.dismiss', 'Dismiss')}
          title={t('common.dismiss', 'Dismiss')}
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
```

**src/components/ErrorStates/ErrorMessage.test.tsx**:
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import ErrorMessage from './ErrorMessage';
import i18n from '@/i18n';

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
```

**src/components/ErrorStates/ErrorStates.module.css** (update with error styles):
```css
/* ErrorBoundary Styles */
.errorBoundary {
  padding: 2rem;
  margin: 1rem;
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

:global(.dark) .errorBoundary {
  background-color: #7f1d1d;
  border-color: #991b1b;
}

.errorContent {
  max-width: 600px;
  text-align: center;
}

.errorTitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: #7f1d1d;
  margin: 0 0 1rem 0;
}

:global(.dark) .errorTitle {
  color: #fca5a5;
}

.errorMessage {
  font-size: 1rem;
  color: #991b1b;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

:global(.dark) .errorMessage {
  color: #fecaca;
}

.errorDetails {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
}

:global(.dark) .errorDetails {
  background-color: rgba(0, 0, 0, 0.3);
}

.errorStack {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.75rem;
  overflow-x: auto;
  color: #1f2937;
  margin: 0.5rem 0 0 0;
}

:global(.dark) .errorStack {
  color: #e5e7eb;
}

.resetButton {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.resetButton:hover {
  background-color: #1d4ed8;
}

.resetButton:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* ErrorMessage Styles */
.errorMessage {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  background-color: #fee2e2;
  border-left: 4px solid #dc2626;
  border-radius: 0.375rem;
}

:global(.dark) .errorMessage {
  background-color: rgba(220, 38, 38, 0.1);
  border-left-color: #ef4444;
}

.errorMessagealert {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-left: 4px solid #dc2626;
}

.errorMessagebanner {
  width: 100%;
  border-radius: 0;
  border-left: none;
  border-bottom: 4px solid #dc2626;
}

.errorIcon {
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1.5rem;
}

.errorBody {
  flex: 1;
}

.errorText {
  margin: 0;
  font-size: 1rem;
  color: #7f1d1d;
  font-weight: 500;
}

:global(.dark) .errorText {
  color: #fecaca;
}

.errorDetailsText {
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
  color: #991b1b;
  opacity: 0.8;
}

:global(.dark) .errorDetailsText {
  color: #fca5a5;
}

.errorCode {
  margin: 0.5rem 0 0 0;
  font-size: 0.75rem;
  color: #991b1b;
  opacity: 0.6;
  font-family: monospace;
}

:global(.dark) .errorCode {
  color: #fca5a5;
}

.dismissButton {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #991b1b;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
}

.dismissButton:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.dismissButton:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

:global(.dark) .dismissButton {
  color: #fca5a5;
}

:global(.dark) .dismissButton:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Responsive Sizing */
@media (max-width: 640px) {
  .errorBoundary {
    padding: 1.5rem;
    margin: 0.5rem;
    min-height: 10rem;
  }

  .errorTitle {
    font-size: 1.25rem;
  }

  .errorMessage {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .errorText {
    font-size: 0.875rem;
  }

  .dismissButton {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1rem;
  }
}

@media (min-width: 1025px) {
  .errorBoundary {
    padding: 2.5rem;
    margin: 1.5rem;
    min-height: 14rem;
  }

  .errorMessage {
    padding: 1.25rem;
    gap: 1.25rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .resetButton,
  .dismissButton {
    transition: none;
  }
}
```

**src/components/ErrorStates/index.ts**:
```typescript
/**
 * Error States Components Index
 * Exports all error state components and utilities
 */

export { default as ErrorBoundary } from './ErrorBoundary';
export { default as ErrorMessage } from './ErrorMessage';
export type { ErrorBoundaryProps } from './ErrorBoundary';
export type { ErrorMessageProps } from './ErrorMessage';
```

#### Acceptance Criteria
- [ ] ErrorMessage renders with correct type (inline, alert, banner)
- [ ] Dismiss button shows/hides based on dismissable prop
- [ ] onDismiss callback fires when dismissed
- [ ] Error details and code display when provided
- [ ] i18n support for all text
- [ ] Proper accessibility attributes (role="alert", aria-live)
- [ ] Responsive styling 200px-3000px
- [ ] Dark mode support
- [ ] Index file exports all components
- [ ] Tests pass with 90%+ coverage

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- ErrorMessage
npm test -- ErrorBoundary
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/LoadingStates/LoadingSpinner.tsx`
- `src/components/LoadingStates/LoadingOverlay.tsx`
- `src/components/LoadingStates/LoadingStates.module.css`
- `src/components/LoadingStates/LoadingSpinner.test.tsx`
- `src/components/LoadingStates/LoadingOverlay.test.tsx`
- `src/components/LoadingStates/index.ts`
- `src/components/ErrorStates/ErrorBoundary.tsx`
- `src/components/ErrorStates/ErrorMessage.tsx`
- `src/components/ErrorStates/ErrorStates.module.css`
- `src/components/ErrorStates/ErrorBoundary.test.tsx`
- `src/components/ErrorStates/ErrorMessage.test.tsx`
- `src/components/ErrorStates/index.ts`

### Imports From Existing Code
- `react` - Base React library (npm dependency)
- `react-i18next` - i18n integration (npm dependency)
- `@testing-library/react` - Component testing (npm dependency)
- `@/i18n` - i18n configuration (created in task 7)

### Exports For Other Code
- `LoadingSpinner` - For inline loading states
- `LoadingOverlay` - For full-page/modal loading overlays
- `ErrorBoundary` - Wraps component trees to catch errors
- `ErrorMessage` - For displaying user-friendly error messages
- All components available via `@/components/LoadingStates` and `@/components/ErrorStates`

---

## Task-Level Verification

```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm test -- --testPathPattern="LoadingSpinner|LoadingOverlay|ErrorBoundary|ErrorMessage"
npm run lint -- src/components/LoadingStates src/components/ErrorStates
```

---

## Parallelization Notes
- All 5 subtasks are completely independent
- Subtask 039.1 (LoadingSpinner) creates the base spinner component
- Subtask 039.2 (LoadingOverlay) imports LoadingSpinner but can be written in parallel
- Subtask 039.3 (CSS) can be created in parallel (shared CSS module)
- Subtask 039.4 (ErrorBoundary) is fully independent (class component)
- Subtask 039.5 (ErrorMessage) is fully independent (creates its own styles in shared CSS)
- Each subtask owns exclusive files and can run first, last, or simultaneously
- No subtask depends on another subtask's output
- All subtasks can be implemented in parallel without blocking
