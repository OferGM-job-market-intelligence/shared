/**
 * Validation utility functions
 * @module utils/validators
 */

import { PASSWORD_REQUIREMENTS } from '../data/constants.ts';

/**
 * Email validation regex (RFC 5322 simplified)
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with isValid flag and error message if invalid
 */
export function validatePassword(password: string): {
  isValid: boolean;
  error?: string;
} {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`,
    };
  }

  if (password.length > PASSWORD_REQUIREMENTS.MAX_LENGTH) {
    return {
      isValid: false,
      error: `Password must not exceed ${PASSWORD_REQUIREMENTS.MAX_LENGTH} characters`,
    };
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBER && !/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL) {
    const specialChars = PASSWORD_REQUIREMENTS.SPECIAL_CHARS.split('').join('\\');
    const specialRegex = new RegExp(`[${specialChars}]`);
    if (!specialRegex.test(password)) {
      return {
        isValid: false,
        error: 'Password must contain at least one special character',
      };
    }
  }

  return { isValid: true };
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns true if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate job ID format (source_id pattern)
 * @param jobId - Job ID to validate
 * @returns true if valid format, false otherwise
 */
export function isValidJobId(jobId: string): boolean {
  if (!jobId || typeof jobId !== 'string') {
    return false;
  }
  
  // Format: source_id (e.g., "linkedin_12345", "indeed_abc123")
  const jobIdRegex = /^(linkedin|indeed|glassdoor)_[\w-]+$/;
  return jobIdRegex.test(jobId);
}

/**
 * Validate salary range
 * @param min - Minimum salary
 * @param max - Maximum salary
 * @returns Object with isValid flag and error message if invalid
 */
export function validateSalaryRange(
  min: number | null,
  max: number | null
): {
  isValid: boolean;
  error?: string;
} {
  if (min === null && max === null) {
    return { isValid: true }; // Both null is acceptable
  }

  if (min !== null && min < 0) {
    return { isValid: false, error: 'Minimum salary cannot be negative' };
  }

  if (max !== null && max < 0) {
    return { isValid: false, error: 'Maximum salary cannot be negative' };
  }

  if (min !== null && max !== null && min > max) {
    return {
      isValid: false,
      error: 'Minimum salary cannot be greater than maximum salary',
    };
  }

  return { isValid: true };
}

/**
 * Validate date range
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Object with isValid flag and error message if invalid
 */
export function validateDateRange(
  startDate: Date,
  endDate: Date
): {
  isValid: boolean;
  error?: string;
} {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return { isValid: false, error: 'Invalid date objects' };
  }

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return { isValid: false, error: 'Invalid date values' };
  }

  if (startDate > endDate) {
    return { isValid: false, error: 'Start date must be before end date' };
  }

  return { isValid: true };
}

/**
 * Validate pagination parameters
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Object with isValid flag and error message if invalid
 */
export function validatePagination(
  page: number,
  pageSize: number
): {
  isValid: boolean;
  error?: string;
} {
  if (!Number.isInteger(page) || page < 1) {
    return { isValid: false, error: 'Page must be a positive integer' };
  }

  if (!Number.isInteger(pageSize) || pageSize < 1) {
    return { isValid: false, error: 'Page size must be a positive integer' };
  }

  if (pageSize > 100) {
    return { isValid: false, error: 'Page size cannot exceed 100' };
  }

  return { isValid: true };
}

/**
 * Sanitize string input (remove potentially harmful characters)
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags and content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Validate skill name format
 * @param skillName - Skill name to validate
 * @returns true if valid, false otherwise
 */
export function isValidSkillName(skillName: string): boolean {
  if (!skillName || typeof skillName !== 'string') {
    return false;
  }

  // Skill name should be 1-50 characters, alphanumeric with spaces, dots, hyphens, plusses
  const skillRegex = /^[a-zA-Z0-9\s.+#-]{1,50}$/;
  return skillRegex.test(skillName.trim());
}

/**
 * Validate MongoDB ObjectId format
 * @param id - ID string to validate
 * @returns true if valid ObjectId format, false otherwise
 */
export function isValidObjectId(id: string): boolean {
  if (!id || typeof id !== 'string') {
    return false;
  }
  
  // MongoDB ObjectId is 24 hex characters
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

/**
 * Validate numeric range
 * @param value - Value to check
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns true if within range, false otherwise
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return typeof value === 'number' && value >= min && value <= max;
}

/**
 * Check if array contains only unique values
 * @param arr - Array to check
 * @returns true if all values are unique, false otherwise
 */
export function hasUniqueValues<T>(arr: T[]): boolean {
  return new Set(arr).size === arr.length;
}

/**
 * Validate that all required fields are present in object
 * @param obj - Object to validate
 * @param requiredFields - Array of required field names
 * @returns Object with isValid flag and missing fields if invalid
 */
export function validateRequiredFields<T extends Record<string, any>>(
  obj: T,
  requiredFields: (keyof T)[]
): {
  isValid: boolean;
  missingFields?: string[];
} {
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (obj[field] === undefined || obj[field] === null) {
      missingFields.push(String(field));
    }
  }

  if (missingFields.length > 0) {
    return { isValid: false, missingFields };
  }

  return { isValid: true };
}