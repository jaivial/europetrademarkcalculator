import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../useCalculator';
import type { CountryCode, TrademarkClass } from '@/types';
import { createCountryCode, createTrademarkClass, FilingType } from '@/types';

/**
 * useCalculator Hook Tests
 * Comprehensive tests for calculator state management
 */

describe('useCalculator', () => {
  // Helper to create test data
  const testCountry: CountryCode = createCountryCode('DE') as CountryCode;
  const testCountry2: CountryCode = createCountryCode('FR') as CountryCode;
  const testClass: TrademarkClass = createTrademarkClass(5)!;
  const testClass2: TrademarkClass = createTrademarkClass(35)!;

  describe('initial state', () => {
    it('should start with empty countries', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.selectedCountries).toEqual([]);
    });

    it('should start with empty classes', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.selectedClasses).toEqual([]);
    });

    it('should start with individual filing type', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.filingType).toBe(FilingType.Individual);
    });

    it('should start with standard priority', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.priorityLevel).toBe('standard');
    });

    it('should start with empty options', () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.selectedOptions).toEqual([]);
    });
  });

  describe('country operations', () => {
    it('should add a country', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.selectedCountries).toContain(testCountry);
    });

    it('should prevent duplicate countries', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.addCountry(testCountry);
      });

      expect(result.current.selectedCountries.length).toBe(1);
    });

    it('should remove a country', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.removeCountry(testCountry);
      });

      expect(result.current.selectedCountries).not.toContain(testCountry);
    });

    it('should check if country is selected', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.isCountrySelected(testCountry)).toBe(true);
      expect(result.current.isCountrySelected(testCountry2)).toBe(false);
    });

    it('should set multiple countries', () => {
      const { result } = renderHook(() => useCalculator());
      const countries = [testCountry, testCountry2];

      act(() => {
        result.current.setCountries(countries);
      });

      expect(result.current.selectedCountries).toEqual(countries);
    });
  });

  describe('class operations', () => {
    it('should add a trademark class', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.selectedClasses).toContain(testClass);
    });

    it('should prevent duplicate classes', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.addClass(testClass);
      });

      expect(result.current.selectedClasses.length).toBe(1);
    });

    it('should remove a trademark class', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.removeClass(testClass);
      });

      expect(result.current.selectedClasses).not.toContain(testClass);
    });

    it('should check if class is selected', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.isClassSelected(testClass)).toBe(true);
      expect(result.current.isClassSelected(testClass2)).toBe(false);
    });

    it('should set multiple classes', () => {
      const { result } = renderHook(() => useCalculator());
      const classes = [testClass, testClass2];

      act(() => {
        result.current.setClasses(classes);
      });

      expect(result.current.selectedClasses).toEqual(classes);
    });

    it('should update class count', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.addClass(testClass2);
      });

      expect(result.current.classCount).toBe(2);
    });
  });

  describe('option operations', () => {
    it('should add an option', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
      });

      expect(result.current.selectedOptions).toContain(optionId);
    });

    it('should prevent duplicate options', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
        result.current.addOption(optionId);
      });

      expect(result.current.selectedOptions.length).toBe(1);
    });

    it('should remove an option', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
        result.current.removeOption(optionId);
      });

      expect(result.current.selectedOptions).not.toContain(optionId);
    });

    it('should toggle an option', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.toggleOption(optionId);
      });

      expect(result.current.isOptionSelected(optionId)).toBe(true);

      act(() => {
        result.current.toggleOption(optionId);
      });

      expect(result.current.isOptionSelected(optionId)).toBe(false);
    });

    it('should check if option is selected', () => {
      const { result } = renderHook(() => useCalculator());
      const optionId = 'monitoring';

      act(() => {
        result.current.addOption(optionId);
      });

      expect(result.current.isOptionSelected(optionId)).toBe(true);
      expect(result.current.isOptionSelected('legal-support')).toBe(false);
    });
  });

  describe('filing type and priority', () => {
    it('should set filing type', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.setFilingType(FilingType.Collective);
      });

      expect(result.current.filingType).toBe(FilingType.Collective);
    });

    it('should set priority level', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.setPriority('expedited');
      });

      expect(result.current.priorityLevel).toBe('expedited');
    });
  });

  describe('state predicates', () => {
    it('should report hasCountries correctly', () => {
      const { result } = renderHook(() => useCalculator());

      expect(result.current.hasCountries).toBe(false);

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.hasCountries).toBe(true);
    });

    it('should report hasClasses correctly', () => {
      const { result } = renderHook(() => useCalculator());

      expect(result.current.hasClasses).toBe(false);

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.hasClasses).toBe(true);
    });

    it('should report isReady only when both countries and classes exist', () => {
      const { result } = renderHook(() => useCalculator());

      expect(result.current.isReady).toBe(false);

      act(() => {
        result.current.addCountry(testCountry);
      });

      expect(result.current.isReady).toBe(false);

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.isReady).toBe(true);
    });
  });

  describe('price calculations', () => {
    it('should calculate price breakdown for basic selection', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.priceBreakdown).toBeDefined();
      expect(result.current.priceBreakdown.classesCount).toBe(1);
      expect(result.current.priceBreakdown.total).toBeGreaterThan(0);
    });

    it('should include options in price calculation', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
        result.current.addOption('monitoring');
      });

      const priceWithOption = result.current.priceBreakdown.total;

      const { result: result2 } = renderHook(() => useCalculator());
      act(() => {
        result2.current.addClass(testClass);
      });

      const priceWithoutOption = result2.current.priceBreakdown.total;

      expect(priceWithOption).toBeGreaterThan(priceWithoutOption);
    });

    it('should apply priority multiplier', () => {
      const { result: standardResult } = renderHook(() => useCalculator());

      act(() => {
        standardResult.current.addClass(testClass);
      });

      const standardPrice = standardResult.current.priceBreakdown.total;

      const { result: expeditedResult } = renderHook(() => useCalculator());

      act(() => {
        expeditedResult.current.addClass(testClass);
        expeditedResult.current.setPriority('expedited');
      });

      const expeditedPrice = expeditedResult.current.priceBreakdown.total;

      expect(expeditedPrice).toBeGreaterThan(standardPrice);
    });

    it('should provide totalPrice property', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addClass(testClass);
      });

      expect(result.current.totalPrice).toBe(result.current.priceBreakdown.total);
    });
  });

  describe('clear and reset', () => {
    it('should clear all state', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.addClass(testClass);
        result.current.setFilingType(FilingType.Collective);
        result.current.addOption('monitoring');
        result.current.setPriority('expedited');
      });

      act(() => {
        result.current.clear();
      });

      expect(result.current.selectedCountries).toEqual([]);
      expect(result.current.selectedClasses).toEqual([]);
      expect(result.current.filingType).toBe(FilingType.Individual);
      expect(result.current.selectedOptions).toEqual([]);
      expect(result.current.priorityLevel).toBe('standard');
    });
  });

  describe('config snapshot', () => {
    it('should return current config', () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.addCountry(testCountry);
        result.current.addClass(testClass);
        result.current.setFilingType(FilingType.Collective);
        result.current.addOption('monitoring');
      });

      const config = result.current.getConfig();

      expect(config.selectedCountries).toEqual([testCountry]);
      expect(config.selectedClasses).toEqual([testClass]);
      expect(config.filingType).toBe(FilingType.Collective);
      expect(config.selectedOptions).toEqual(['monitoring']);
    });
  });
});
