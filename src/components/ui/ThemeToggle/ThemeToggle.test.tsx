import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks';

// Mock the useTheme hook
vi.mock('@/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle Component', () => {
  const mockToggleTheme = vi.fn();
  const mockUseTheme = useTheme as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      preference: 'light',
      isSystemTheme: false,
      setTheme: vi.fn(),
      toggleTheme: mockToggleTheme,
      cycleTheme: vi.fn(),
      isDark: false,
      isLight: true,
    });
  });

  describe('Rendering', () => {
    it('should render button element', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with default size (md)', () => {
      const { container } = render(<ThemeToggle />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('sizeMd');
    });

    it('should render with custom size', () => {
      const { container } = render(<ThemeToggle size="lg" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('sizeLg');
    });

    it('should render with custom variant', () => {
      const { container } = render(<ThemeToggle variant="outlined" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('variantOutlined');
    });

    it('should accept custom className', () => {
      const { container } = render(<ThemeToggle className="custom-class" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
    });
  });

  describe('Theme Icon Display', () => {
    it('should display sun icon when theme is light', () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        preference: 'light',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: false,
        isLight: true,
      });

      render(<ThemeToggle />);
      const sunIcon = document.querySelector('svg.sunIcon');
      expect(sunIcon).toBeInTheDocument();
    });

    it('should display moon icon when theme is dark', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        preference: 'dark',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: true,
        isLight: false,
      });

      render(<ThemeToggle />);
      const moonIcon = document.querySelector('svg.moonIcon');
      expect(moonIcon).toBeInTheDocument();
    });

    it('icons should have aria-hidden attribute', () => {
      const { container } = render(<ThemeToggle />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for light theme', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
    });

    it('should have proper aria-label for dark theme', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        preference: 'dark',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: true,
        isLight: false,
      });

      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
    });

    it('should accept custom aria-label', () => {
      const customLabel = 'Custom theme toggle label';
      render(<ThemeToggle ariaLabel={customLabel} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', customLabel);
    });

    it('should set aria-pressed based on theme', () => {
      const { rerender } = render(<ThemeToggle />);
      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'false');

      mockUseTheme.mockReturnValue({
        theme: 'dark',
        preference: 'dark',
        isSystemTheme: false,
        setTheme: vi.fn(),
        toggleTheme: mockToggleTheme,
        cycleTheme: vi.fn(),
        isDark: true,
        isLight: false,
      });

      rerender(<ThemeToggle />);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should have title attribute for tooltip', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title');
    });
  });

  describe('Interaction', () => {
    it('should call toggleTheme on click', async () => {
      const user = userEvent.setup();
      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('should call toggleTheme on keyboard activation', async () => {
      const user = userEvent.setup();
      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('should call toggleTheme on Space key', async () => {
      const user = userEvent.setup();
      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props Variants', () => {
    it('should support all size variants', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      sizes.forEach((size) => {
        const { container, unmount } = render(<ThemeToggle size={size} />);
        const button = container.querySelector('button');
        expect(button?.className).toContain(`size${size.charAt(0).toUpperCase()}${size.charAt(1)}`);
        unmount();
      });
    });

    it('should support all variant styles', () => {
      const variants: Array<'default' | 'outlined' | 'ghost'> = ['default', 'outlined', 'ghost'];
      variants.forEach((variant) => {
        const { container, unmount } = render(<ThemeToggle variant={variant} />);
        const button = container.querySelector('button');
        expect(button?.className).toContain(`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`);
        unmount();
      });
    });
  });

  describe('Type Safety', () => {
    it('should render without TypeScript errors', () => {
      render(<ThemeToggle size="md" variant="default" className="test" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
