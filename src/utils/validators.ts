// src/utils/validators.ts

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  return { isValid: true };
}

/**
 * Validate phone number (international format)
 * @param phone - Phone number to validate
 * @returns Validation result
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Allow +, digits, spaces, dashes, parentheses
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  // Should have at least 7 digits
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) {
    return { isValid: false, error: 'Phone number too short' };
  }

  return { isValid: true };
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns Validation result
 */
export function validateURL(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate string length
 * @param value - String to validate
 * @param minLength - Minimum length
 * @param maxLength - Maximum length
 * @returns Validation result
 */
export function validateLength(
  value: string,
  minLength: number = 0,
  maxLength: number = 255
): ValidationResult {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `Must be at least ${minLength} characters`,
    };
  }

  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `Must be no more than ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validate positive number
 * @param value - Number to validate
 * @param allowZero - Whether to allow zero
 * @returns Validation result
 */
export function validatePositiveNumber(
  value: number,
  allowZero: boolean = true
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Must be a valid number' };
  }

  if (!allowZero && value === 0) {
    return { isValid: false, error: 'Must be greater than zero' };
  }

  if (value < 0) {
    return { isValid: false, error: 'Must be positive' };
  }

  return { isValid: true };
}

/**
 * Validate required field
 * @param value - Value to validate
 * @param fieldName - Name of field for error message
 * @returns Validation result
 */
export function validateRequired(
  value: unknown,
  fieldName: string = 'This field'
): ValidationResult {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validate minimum numeric value
 * @param value - Number to validate
 * @param minimum - Minimum allowed value
 * @returns Validation result
 */
export function validateMinimum(
  value: number,
  minimum: number
): ValidationResult {
  if (value < minimum) {
    return {
      isValid: false,
      error: `Must be at least ${minimum}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate maximum numeric value
 * @param value - Number to validate
 * @param maximum - Maximum allowed value
 * @returns Validation result
 */
export function validateMaximum(
  value: number,
  maximum: number
): ValidationResult {
  if (value > maximum) {
    return {
      isValid: false,
      error: `Must be no more than ${maximum}`,
    };
  }

  return { isValid: true };
}

/**
 * Custom validation with regex pattern
 * @param value - Value to validate
 * @param pattern - Regex pattern
 * @param errorMessage - Custom error message
 * @returns Validation result
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  errorMessage: string = 'Invalid format'
): ValidationResult {
  if (!pattern.test(value)) {
    return { isValid: false, error: errorMessage };
  }

  return { isValid: true };
}
