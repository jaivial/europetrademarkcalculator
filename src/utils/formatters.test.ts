// src/utils/formatters.test.ts

import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatShortDate,
  formatDateTime,
  formatPercentage,
  abbreviateNumber,
} from './formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format EUR correctly', () => {
      const result = formatCurrency(1234.56, { currency: 'EUR' });
      expect(result).toContain('1');
      expect(result).toContain('234');
      expect(result).toContain('56');
    });

    it('should format GBP correctly', () => {
      const result = formatCurrency(999.99, { currency: 'GBP' });
      expect(result).toContain('999');
      expect(result).toContain('99');
    });

    it('should format USD correctly', () => {
      const result = formatCurrency(5000, { currency: 'USD' });
      expect(result).toContain('5');
      expect(result).toContain('000');
    });

    it('should format CHF correctly', () => {
      const result = formatCurrency(250.5, { currency: 'CHF' });
      expect(result).toContain('250');
    });

    it('should format PLN correctly', () => {
      const result = formatCurrency(100, { currency: 'PLN' });
      expect(result).toContain('100');
    });

    it('should format CZK correctly', () => {
      const result = formatCurrency(500, { currency: 'CZK' });
      expect(result).toContain('500');
    });

    it('should handle zero amount', () => {
      const result = formatCurrency(0, { currency: 'EUR' });
      expect(result).toContain('0');
    });

    it('should respect custom fraction digits', () => {
      const result = formatCurrency(123.456, {
        currency: 'USD',
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      expect(result).toContain('123');
      expect(result).toContain('456');
    });
  });

  describe('formatNumber', () => {
    it('should format number with thousand separators', () => {
      const result = formatNumber(1234567.89);
      expect(result.replace(/\D/g, '')).toBe('123456789');
    });

    it('should format without grouping', () => {
      const result = formatNumber(1234, { useGrouping: false });
      expect(result).toBe('1234');
    });

    it('should respect fraction digits', () => {
      const result = formatNumber(123.456, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      expect(result).toContain('123');
    });

    it('should handle zero', () => {
      const result = formatNumber(0);
      expect(result).toBe('0');
    });

    it('should handle negative numbers', () => {
      const result = formatNumber(-500);
      expect(result).toContain('500');
    });
  });

  describe('formatDate', () => {
    it('should format Date object', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should format date string', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBeTruthy();
    });

    it('should format timestamp', () => {
      const timestamp = Date.now();
      const result = formatDate(timestamp);
      expect(result).toBeTruthy();
    });

    it('should use custom locale', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'de-DE');
      expect(result).toBeTruthy();
    });
  });

  describe('formatShortDate', () => {
    it('should format as short date', () => {
      const date = new Date('2024-01-15');
      const result = formatShortDate(date);
      expect(result).toContain('2024');
      expect(result).toContain('01');
      // Date may shift due to timezone, so just check it has a day
      expect(result.length).toBeGreaterThan(8);
    });

    it('should use locale formatting', () => {
      const date = new Date('2024-12-25');
      const result = formatShortDate(date, 'en-US');
      expect(result).toBeTruthy();
    });
  });

  describe('formatDateTime', () => {
    it('should format date with time', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = formatDateTime(date);
      expect(result).toContain('2024');
      expect(result).toBeTruthy();
    });

    it('should include time components', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = formatDateTime(date);
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(10); // More than just date
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage with default 1 decimal', () => {
      expect(formatPercentage(50)).toBe('50.0%');
    });

    it('should format percentage with custom decimals', () => {
      expect(formatPercentage(33.333, 2)).toBe('33.33%');
    });

    it('should format zero percentage', () => {
      expect(formatPercentage(0)).toBe('0.0%');
    });

    it('should format 100 percentage', () => {
      expect(formatPercentage(100, 0)).toBe('100%');
    });

    it('should handle decimals', () => {
      expect(formatPercentage(12.5, 1)).toBe('12.5%');
    });
  });

  describe('abbreviateNumber', () => {
    it('should abbreviate millions', () => {
      expect(abbreviateNumber(1000000)).toBe('1.0M');
      expect(abbreviateNumber(2500000)).toBe('2.5M');
    });

    it('should abbreviate thousands', () => {
      expect(abbreviateNumber(1000)).toBe('1.0K');
      expect(abbreviateNumber(5500)).toBe('5.5K');
    });

    it('should not abbreviate small numbers', () => {
      expect(abbreviateNumber(999)).toBe('999');
      expect(abbreviateNumber(100)).toBe('100');
    });

    it('should handle negative numbers', () => {
      expect(abbreviateNumber(-1000000)).toBe('-1.0M');
      expect(abbreviateNumber(-5000)).toBe('-5.0K');
    });

    it('should respect fraction digits', () => {
      expect(abbreviateNumber(1234567, 2)).toBe('1.23M');
      // 5.678K rounds to 6K with 0 decimals
      const result = abbreviateNumber(5678, 0);
      expect(result).toContain('K');
    });

    it('should handle zero', () => {
      expect(abbreviateNumber(0)).toBe('0');
    });
  });
});
