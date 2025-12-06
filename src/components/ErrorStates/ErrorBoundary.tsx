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
  const { t } = useTranslation('common');

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
            aria-label={t('retry', 'Retry')}
          >
            {t('retry', 'Try Again')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundary;
export { ErrorBoundaryFallback };
