import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks';
import styles from './ThemeToggle.module.css';

export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'ghost';
  tooltipPosition?: 'top' | 'bottom';
  ariaLabel?: string;
}

export const ThemeToggle = ({
  className = '',
  size = 'md',
  variant = 'default',
  ariaLabel,
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  };

  const variantClasses = {
    default: styles.variantDefault,
    outlined: styles.variantOutlined,
    ghost: styles.variantGhost,
  };

  const isDark = theme === 'dark';
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  const defaultLabel = isDark
    ? 'Switch to light theme'
    : 'Switch to dark theme';

  const buttonLabel = ariaLabel || defaultLabel;

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${styles.button}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={buttonLabel}
      aria-pressed={isDark}
      type="button"
      title={buttonLabel}
    >
      <span className={styles.iconContainer}>
        {isDark ? (
          <Moon
            size={iconSize}
            className={styles.moonIcon}
            aria-hidden="true"
          />
        ) : (
          <Sun
            size={iconSize}
            className={styles.sunIcon}
            aria-hidden="true"
          />
        )}
      </span>

      {/* Animated background for visual feedback */}
      <span className={styles.background} aria-hidden="true" />
    </button>
  );
};
