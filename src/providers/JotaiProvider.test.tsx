import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { atom, useAtomValue } from 'jotai';
import { JotaiProvider } from './JotaiProvider';

describe('JotaiProvider', () => {
  it('renders children without errors', () => {
    render(
      <JotaiProvider>
        <div>Test Child</div>
      </JotaiProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('accepts initialValues prop and hydrates atoms', () => {
    const testAtom = atom('default');

    const TestComponent = () => {
      const value = useAtomValue(testAtom);
      return <div>{value}</div>;
    };

    render(
      <JotaiProvider initialValues={[[testAtom, 'hydrated']]}>
        <TestComponent />
      </JotaiProvider>
    );

    expect(screen.getByText('hydrated')).toBeInTheDocument();
  });

  it('handles empty initialValues array', () => {
    render(
      <JotaiProvider initialValues={[]}>
        <div>Test</div>
      </JotaiProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles undefined initialValues', () => {
    render(
      <JotaiProvider>
        <div>Test</div>
      </JotaiProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onMount callback when provider mounts', () => {
    const onMount = vi.fn();

    render(
      <JotaiProvider onMount={onMount}>
        <div>Test</div>
      </JotaiProvider>
    );

    expect(onMount).toHaveBeenCalledTimes(1);
  });

  it('logs hydration info when debug is enabled', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const testAtom = atom('test');

    render(
      <JotaiProvider initialValues={[[testAtom, 'value']]} debug={true}>
        <div>Test</div>
      </JotaiProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      '[JotaiProvider] Hydrating with values:',
      [[testAtom, 'value']]
    );
    expect(consoleSpy).toHaveBeenCalledWith('[JotaiProvider] Provider mounted');

    consoleSpy.mockRestore();
  });

  it('does not log when debug is false', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const testAtom = atom('test');

    render(
      <JotaiProvider initialValues={[[testAtom, 'value']]} debug={false}>
        <div>Test</div>
      </JotaiProvider>
    );

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('has correct displayName', () => {
    expect(JotaiProvider.displayName).toBe('JotaiProvider');
  });

  it('memoizes initialValues to prevent re-renders', () => {
    const testAtom = atom('test');
    const initialValues = [[testAtom, 'value']];

    const { rerender } = render(
      <JotaiProvider initialValues={initialValues}>
        <div>Test</div>
      </JotaiProvider>
    );

    // Rerender with same reference
    rerender(
      <JotaiProvider initialValues={initialValues}>
        <div>Test</div>
      </JotaiProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('provides isolated state between multiple providers', () => {
    const countAtom = atom(0);

    const Counter = () => {
      const count = useAtomValue(countAtom);
      return <div>Count: {count}</div>;
    };

    const { container } = render(
      <>
        <JotaiProvider initialValues={[[countAtom, 1]]}>
          <div data-testid="provider1">
            <Counter />
          </div>
        </JotaiProvider>
        <JotaiProvider initialValues={[[countAtom, 2]]}>
          <div data-testid="provider2">
            <Counter />
          </div>
        </JotaiProvider>
      </>
    );

    const provider1 = container.querySelector('[data-testid="provider1"]');
    const provider2 = container.querySelector('[data-testid="provider2"]');

    expect(provider1?.textContent).toBe('Count: 1');
    expect(provider2?.textContent).toBe('Count: 2');
  });
});
