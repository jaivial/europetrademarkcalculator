import React from 'react';

interface LogoProps {
  /**
   * Optional custom width in pixels or CSS units
   * Default: responsive (32px on mobile, 40px on desktop)
   */
  width?: string | number;

  /**
   * Optional custom height in pixels or CSS units
   * Default: responsive (32px on mobile, 40px on desktop)
   */
  height?: string | number;

  /**
   * Optional CSS class for styling
   */
  className?: string;

  /**
   * Optional alt text for the logo
   * Default: "EU Brand Calculator"
   */
  alt?: string;

  /**
   * Optional title for tooltip on hover
   */
  title?: string;
}

/**
 * Logo Component
 *
 * Displays the EU Brand Calculator logo (EU flag with calculator icon).
 * Responsive sizing based on device size.
 *
 * Props:
 * - width: string | number - Custom width (default: responsive)
 * - height: string | number - Custom height (default: responsive)
 * - className: string - Additional CSS classes
 * - alt: string - Alt text for accessibility
 * - title: string - Tooltip on hover
 *
 * Responsive Behavior:
 * - Mobile: 36px x 36px
 * - Desktop: 44px x 44px
 * - Can be overridden with width/height props
 */
const Logo: React.FC<LogoProps> = ({
  width,
  height,
  className,
  alt = 'EU Brand Calculator',
  title = 'EU Brand Registration Calculator',
}) => {
  // Default responsive sizing
  const defaultSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 36 : 44;

  const resolvedWidth = width ?? defaultSize;
  const resolvedHeight = height ?? defaultSize;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: typeof resolvedWidth === 'number' ? `${resolvedWidth}px` : resolvedWidth,
        height: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
      }}
      title={title}
    >
      <img
        src="/favicon.ico"
        alt={alt}
        width={resolvedWidth}
        height={resolvedHeight}
        style={{
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default Logo;
