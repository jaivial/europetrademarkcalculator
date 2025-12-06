// src/utils/calculations.test.ts

import { describe, it, expect } from 'vitest';
import {
  calculateTax,
  calculateWithTax,
  calculateSubtotal,
  applyDiscount,
  calculateTotal,
  calculateAverage,
  applyMarkup,
  calculateMultiCountryTax,
  calculateProgressiveRate,
  roundToCent,
  isValidCalculation,
} from './calculations';

describe('calculations', () => {
  describe('calculateTax', () => {
    it('should calculate tax correctly', () => {
      expect(calculateTax(100, 0.19)).toBe(19);
    });

    it('should round to 2 decimals', () => {
      expect(calculateTax(100, 0.195)).toBe(19.5);
    });

    it('should handle zero subtotal', () => {
      expect(calculateTax(0, 0.19)).toBe(0);
    });

    it('should handle zero tax rate', () => {
      expect(calculateTax(100, 0)).toBe(0);
    });

    it('should calculate complex tax', () => {
      expect(calculateTax(123.45, 0.21)).toBe(25.92);
    });
  });

  describe('calculateWithTax', () => {
    it('should calculate total with tax', () => {
      const result = calculateWithTax(100, 0.19);
      expect(result.subtotal).toBe(100);
      expect(result.taxAmount).toBe(19);
      expect(result.total).toBe(119);
      expect(result.taxRate).toBe(0.19);
    });

    it('should round all values to 2 decimals', () => {
      const result = calculateWithTax(99.99, 0.21);
      expect(result.subtotal).toBe(99.99);
      expect(result.taxAmount).toBe(21);
      expect(result.total).toBe(120.99);
    });

    it('should handle zero subtotal', () => {
      const result = calculateWithTax(0, 0.19);
      expect(result.total).toBe(0);
    });

    it('should calculate with high tax rate', () => {
      const result = calculateWithTax(100, 0.27);
      expect(result.taxAmount).toBe(27);
      expect(result.total).toBe(127);
    });
  });

  describe('calculateSubtotal', () => {
    it('should calculate subtotal from total', () => {
      expect(calculateSubtotal(119, 0.19)).toBe(100);
    });

    it('should reverse calculateWithTax', () => {
      const withTax = calculateWithTax(100, 0.21);
      const subtotal = calculateSubtotal(withTax.total, 0.21);
      expect(subtotal).toBe(100);
    });

    it('should handle zero total', () => {
      expect(calculateSubtotal(0, 0.19)).toBe(0);
    });

    it('should round to 2 decimals', () => {
      const result = calculateSubtotal(121, 0.21);
      expect(result).toBe(100);
    });
  });

  describe('applyDiscount', () => {
    it('should apply discount correctly', () => {
      const result = applyDiscount(100, 10);
      expect(result.originalAmount).toBe(100);
      expect(result.discountAmount).toBe(10);
      expect(result.finalAmount).toBe(90);
      expect(result.discountPercentage).toBe(10);
    });

    it('should handle 0% discount', () => {
      const result = applyDiscount(100, 0);
      expect(result.discountAmount).toBe(0);
      expect(result.finalAmount).toBe(100);
    });

    it('should handle 100% discount', () => {
      const result = applyDiscount(100, 100);
      expect(result.discountAmount).toBe(100);
      expect(result.finalAmount).toBe(0);
    });

    it('should throw error for negative discount', () => {
      expect(() => applyDiscount(100, -10)).toThrow(
        'Discount percentage must be between 0 and 100'
      );
    });

    it('should throw error for discount over 100', () => {
      expect(() => applyDiscount(100, 150)).toThrow(
        'Discount percentage must be between 0 and 100'
      );
    });

    it('should round all values', () => {
      const result = applyDiscount(99.99, 15);
      expect(result.originalAmount).toBe(99.99);
      expect(result.discountAmount).toBe(15);
      expect(result.finalAmount).toBe(84.99);
    });
  });

  describe('calculateTotal', () => {
    it('should calculate total from items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ];
      expect(calculateTotal(items)).toBe(35);
    });

    it('should handle empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });

    it('should handle single item', () => {
      const items = [{ price: 25, quantity: 4 }];
      expect(calculateTotal(items)).toBe(100);
    });

    it('should handle decimal prices', () => {
      const items = [
        { price: 19.99, quantity: 2 },
        { price: 9.99, quantity: 1 },
      ];
      expect(calculateTotal(items)).toBe(49.97);
    });

    it('should round to 2 decimals', () => {
      const items = [{ price: 10.333, quantity: 3 }];
      expect(calculateTotal(items)).toBe(31);
    });
  });

  describe('calculateAverage', () => {
    it('should calculate average price', () => {
      const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
      expect(calculateAverage(items)).toBe(20);
    });

    it('should handle empty array', () => {
      expect(calculateAverage([])).toBe(0);
    });

    it('should handle single item', () => {
      const items = [{ price: 42 }];
      expect(calculateAverage(items)).toBe(42);
    });

    it('should round to 2 decimals', () => {
      const items = [{ price: 10 }, { price: 11 }];
      expect(calculateAverage(items)).toBe(10.5);
    });

    it('should calculate average with decimals', () => {
      const items = [{ price: 9.99 }, { price: 19.99 }, { price: 29.99 }];
      expect(calculateAverage(items)).toBe(19.99);
    });
  });

  describe('applyMarkup', () => {
    it('should apply markup correctly', () => {
      expect(applyMarkup(100, 20)).toBe(120);
    });

    it('should handle 0% markup', () => {
      expect(applyMarkup(100, 0)).toBe(100);
    });

    it('should handle 100% markup', () => {
      expect(applyMarkup(50, 100)).toBe(100);
    });

    it('should round to 2 decimals', () => {
      expect(applyMarkup(99.99, 15)).toBe(114.99);
    });

    it('should handle decimal base price', () => {
      expect(applyMarkup(19.99, 25)).toBe(24.99);
    });
  });

  describe('calculateMultiCountryTax', () => {
    it('should calculate tax for multiple countries', () => {
      const taxRates = {
        DE: 0.19,
        FR: 0.20,
        UK: 0.20,
      };
      const result = calculateMultiCountryTax(100, taxRates);
      expect(result.DE).toBe(19);
      expect(result.FR).toBe(20);
      expect(result.UK).toBe(20);
    });

    it('should handle empty tax rates', () => {
      const result = calculateMultiCountryTax(100, {});
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should handle single country', () => {
      const result = calculateMultiCountryTax(100, { US: 0.08 });
      expect(result.US).toBe(8);
    });

    it('should round all tax amounts', () => {
      const taxRates = {
        A: 0.195,
        B: 0.215,
      };
      const result = calculateMultiCountryTax(100, taxRates);
      expect(result.A).toBe(19.5);
      expect(result.B).toBe(21.5);
    });
  });

  describe('calculateProgressiveRate', () => {
    it('should apply multiple markups progressively', () => {
      const result = calculateProgressiveRate(100, [10, 10]);
      // 100 + 10% = 110, 110 + 10% = 121
      expect(result).toBe(121);
    });

    it('should handle empty rates', () => {
      expect(calculateProgressiveRate(100, [])).toBe(100);
    });

    it('should handle single rate', () => {
      expect(calculateProgressiveRate(100, [20])).toBe(120);
    });

    it('should apply rates in order', () => {
      const result = calculateProgressiveRate(100, [10, 20, 5]);
      // 100 + 10% = 110
      // 110 + 20% = 132
      // 132 + 5% = 138.6
      expect(result).toBe(138.6);
    });
  });

  describe('roundToCent', () => {
    it('should round to 2 decimals', () => {
      expect(roundToCent(10.123)).toBe(10.12);
      expect(roundToCent(10.126)).toBe(10.13);
    });

    it('should handle whole numbers', () => {
      expect(roundToCent(10)).toBe(10);
    });

    it('should handle already rounded numbers', () => {
      expect(roundToCent(10.12)).toBe(10.12);
    });

    it('should handle negative numbers', () => {
      expect(roundToCent(-10.456)).toBe(-10.46);
    });

    it('should handle zero', () => {
      expect(roundToCent(0)).toBe(0);
    });
  });

  describe('isValidCalculation', () => {
    it('should validate valid calculation', () => {
      const calc = {
        subtotal: 100,
        taxAmount: 19,
        total: 119,
        taxRate: 0.19,
      };
      expect(isValidCalculation(calc)).toBe(true);
    });

    it('should reject negative subtotal', () => {
      const calc = {
        subtotal: -100,
        taxAmount: 19,
        total: 119,
        taxRate: 0.19,
      };
      expect(isValidCalculation(calc)).toBe(false);
    });

    it('should reject negative tax amount', () => {
      const calc = {
        subtotal: 100,
        taxAmount: -19,
        total: 119,
        taxRate: 0.19,
      };
      expect(isValidCalculation(calc)).toBe(false);
    });

    it('should reject negative total', () => {
      const calc = {
        subtotal: 100,
        taxAmount: 19,
        total: -119,
        taxRate: 0.19,
      };
      expect(isValidCalculation(calc)).toBe(false);
    });

    it('should reject negative tax rate', () => {
      const calc = {
        subtotal: 100,
        taxAmount: 19,
        total: 119,
        taxRate: -0.19,
      };
      expect(isValidCalculation(calc)).toBe(false);
    });

    it('should accept zero values', () => {
      const calc = {
        subtotal: 0,
        taxAmount: 0,
        total: 0,
        taxRate: 0,
      };
      expect(isValidCalculation(calc)).toBe(true);
    });
  });
});
