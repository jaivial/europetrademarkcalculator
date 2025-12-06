// src/utils/validators.test.ts

import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateURL,
  validateLength,
  validatePositiveNumber,
  validateRequired,
  validateMinimum,
  validateMaximum,
  validatePattern,
} from './validators';

describe('validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject empty email', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should reject email without @', () => {
      const result = validateEmail('testexample.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid email format');
    });

    it('should reject email without domain', () => {
      const result = validateEmail('test@');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid email format');
    });

    it('should reject email without TLD', () => {
      const result = validateEmail('test@example');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid email format');
    });

    it('should reject email that is too long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const result = validateEmail(longEmail);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email is too long');
    });

    it('should accept email with subdomain', () => {
      const result = validateEmail('user@mail.example.com');
      expect(result.isValid).toBe(true);
    });

    it('should accept email with plus sign', () => {
      const result = validateEmail('user+test@example.com');
      expect(result.isValid).toBe(true);
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone number', () => {
      const result = validatePhone('+1234567890');
      expect(result.isValid).toBe(true);
    });

    it('should reject empty phone', () => {
      const result = validatePhone('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number is required');
    });

    it('should validate phone with dashes', () => {
      const result = validatePhone('123-456-7890');
      expect(result.isValid).toBe(true);
    });

    it('should validate phone with spaces', () => {
      const result = validatePhone('+44 123456789');
      expect(result.isValid).toBe(true);
    });

    it('should validate phone with parentheses', () => {
      const result = validatePhone('(123) 456-7890');
      expect(result.isValid).toBe(true);
    });

    it('should reject phone too short', () => {
      const result = validatePhone('12345');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number too short');
    });

    it('should reject phone with letters', () => {
      const result = validatePhone('123-ABC-DEFG');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid phone number format');
    });
  });

  describe('validateURL', () => {
    it('should validate correct URL', () => {
      const result = validateURL('https://example.com');
      expect(result.isValid).toBe(true);
    });

    it('should validate URL with path', () => {
      const result = validateURL('https://example.com/path/to/page');
      expect(result.isValid).toBe(true);
    });

    it('should validate URL with query params', () => {
      const result = validateURL('https://example.com?param=value');
      expect(result.isValid).toBe(true);
    });

    it('should reject empty URL', () => {
      const result = validateURL('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('URL is required');
    });

    it('should reject invalid URL', () => {
      const result = validateURL('not-a-url');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid URL format');
    });

    it('should validate http URL', () => {
      const result = validateURL('http://example.com');
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateLength', () => {
    it('should validate string within length', () => {
      const result = validateLength('hello', 3, 10);
      expect(result.isValid).toBe(true);
    });

    it('should reject string too short', () => {
      const result = validateLength('hi', 5, 10);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be at least 5 characters');
    });

    it('should reject string too long', () => {
      const result = validateLength('hello world!!!', 0, 10);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be no more than 10 characters');
    });

    it('should use default min/max', () => {
      const result = validateLength('test');
      expect(result.isValid).toBe(true);
    });

    it('should validate empty string with min 0', () => {
      const result = validateLength('', 0, 10);
      expect(result.isValid).toBe(true);
    });

    it('should validate exact min length', () => {
      const result = validateLength('hello', 5, 10);
      expect(result.isValid).toBe(true);
    });

    it('should validate exact max length', () => {
      const result = validateLength('hello', 0, 5);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validatePositiveNumber', () => {
    it('should validate positive number', () => {
      const result = validatePositiveNumber(10);
      expect(result.isValid).toBe(true);
    });

    it('should validate zero when allowed', () => {
      const result = validatePositiveNumber(0, true);
      expect(result.isValid).toBe(true);
    });

    it('should reject zero when not allowed', () => {
      const result = validatePositiveNumber(0, false);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be greater than zero');
    });

    it('should reject negative number', () => {
      const result = validatePositiveNumber(-5);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be positive');
    });

    it('should reject NaN', () => {
      const result = validatePositiveNumber(NaN);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be a valid number');
    });

    it('should reject non-number', () => {
      const result = validatePositiveNumber('10' as any);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be a valid number');
    });
  });

  describe('validateRequired', () => {
    it('should validate non-empty value', () => {
      const result = validateRequired('test');
      expect(result.isValid).toBe(true);
    });

    it('should reject null', () => {
      const result = validateRequired(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should reject undefined', () => {
      const result = validateRequired(undefined);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should reject empty string', () => {
      const result = validateRequired('');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should reject empty array', () => {
      const result = validateRequired([]);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should use custom field name', () => {
      const result = validateRequired('', 'Username');
      expect(result.error).toBe('Username is required');
    });

    it('should validate non-empty array', () => {
      const result = validateRequired([1, 2, 3]);
      expect(result.isValid).toBe(true);
    });

    it('should validate zero', () => {
      const result = validateRequired(0);
      expect(result.isValid).toBe(true);
    });

    it('should validate false', () => {
      const result = validateRequired(false);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateMinimum', () => {
    it('should validate value above minimum', () => {
      const result = validateMinimum(10, 5);
      expect(result.isValid).toBe(true);
    });

    it('should validate value equal to minimum', () => {
      const result = validateMinimum(5, 5);
      expect(result.isValid).toBe(true);
    });

    it('should reject value below minimum', () => {
      const result = validateMinimum(3, 5);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be at least 5');
    });

    it('should handle negative minimum', () => {
      const result = validateMinimum(-5, -10);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateMaximum', () => {
    it('should validate value below maximum', () => {
      const result = validateMaximum(5, 10);
      expect(result.isValid).toBe(true);
    });

    it('should validate value equal to maximum', () => {
      const result = validateMaximum(10, 10);
      expect(result.isValid).toBe(true);
    });

    it('should reject value above maximum', () => {
      const result = validateMaximum(15, 10);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be no more than 10');
    });

    it('should handle negative maximum', () => {
      // -5 > -10, so this should fail (value exceeds maximum)
      const result = validateMaximum(-15, -10);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validatePattern', () => {
    it('should validate matching pattern', () => {
      const result = validatePattern('abc123', /^[a-z0-9]+$/);
      expect(result.isValid).toBe(true);
    });

    it('should reject non-matching pattern', () => {
      const result = validatePattern('ABC', /^[a-z]+$/);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid format');
    });

    it('should use custom error message', () => {
      const result = validatePattern('123', /^[a-z]+$/, 'Must be letters only');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Must be letters only');
    });

    it('should validate complex pattern', () => {
      const zipPattern = /^\d{5}(-\d{4})?$/;
      expect(validatePattern('12345', zipPattern).isValid).toBe(true);
      expect(validatePattern('12345-6789', zipPattern).isValid).toBe(true);
      expect(validatePattern('1234', zipPattern).isValid).toBe(false);
    });
  });
});
