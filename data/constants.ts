/**
 * Shared constants used across all services
 * @module data/constants
 */

/**
 * Time constants
 */
export const FIVE_SECONDS_MS = 5 * 1000;
export const THIRTY_SECONDS_MS = 30 * 1000;
export const FIVE_MINUTES_SEC = 5 * 60;
export const FIFTY_MINUTES_SEC = 15 * 60;
export const ONE_HOUR_SEC = 60 * 60;
export const ONE_HOUR_MS = 60 * 60 * 1000;
export const ONE_DAY_SEC = 24 * 60 * 60;
export const SEVEN_DAYS_SEC = 7 * 24 * 60 * 60;

/**
 * API rate limits (requests per time period)
 */
export const RATE_LIMITS = {
  /** Scraper service: requests per hour per source */
  SCRAPER_PER_SOURCE: 50,
  
  /** API Gateway: requests per minute per user */
  API_PER_USER: 100,
  
  /** Auth service: login attempts per minute */
  LOGIN_ATTEMPTS: 5,
  
  /** Public API: requests per hour without auth */
  PUBLIC_API: 1000,
} as const;

/**
 * JWT token expiry times (in seconds)
 */
export const TOKEN_EXPIRY = {
  /** Access token expiry */
  ACCESS_TOKEN: FIFTY_MINUTES_SEC,
  
  /** Refresh token expiry */
  REFRESH_TOKEN: SEVEN_DAYS_SEC,
  
  /** Password reset token expiry */
  PASSWORD_RESET: ONE_HOUR_SEC,
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  /** Default page size for API responses */
  DEFAULT_PAGE_SIZE: 20,
  
  /** Maximum page size allowed */
  MAX_PAGE_SIZE: 100,
  
  /** Default page number */
  DEFAULT_PAGE: 1,
} as const;

/**
 * Trend aggregation timeframes
 */
export const TIMEFRAMES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

/**
 * Cache TTL (Time To Live) in seconds
 */
export const CACHE_TTL = {
  /** Trending skills cache */
  TRENDING_SKILLS: FIFTY_MINUTES_SEC,
  
  /** Job search results */
  JOB_SEARCH: FIVE_MINUTES_SEC,
  
  /** Salary statistics */
  SALARY_STATS: ONE_HOUR_SEC,
  
  /** Market insights */
  MARKET_INSIGHTS: ONE_HOUR_SEC,
  
  /** User session */
  USER_SESSION: ONE_DAY_SEC,
} as const;

/**
 * Scraper configuration
 */
export const SCRAPER_CONFIG = {
  /** Scraping interval in milliseconds */
  INTERVAL: ONE_HOUR_MS,
  
  /** Request timeout in milliseconds */
  TIMEOUT: THIRTY_SECONDS_MS,
  
  /** Maximum retry attempts */
  MAX_RETRIES: 3,
  
  /** Delay between retries (ms) */
  RETRY_DELAY: FIVE_SECONDS_MS,
  
  /** User agent string */
  USER_AGENT: 'Mozilla/5.0 (compatible; JobMarketBot/1.0)',
} as const;

/**
 * NLP service configuration
 */
export const NLP_CONFIG = {
  /** Minimum confidence score for skill extraction */
  MIN_CONFIDENCE: 0.6,
  
  /** Maximum skills to extract per job */
  MAX_SKILLS_PER_JOB: 50,
  
  /** Batch size for processing */
  BATCH_SIZE: 10,
} as const;

/**
 * Kafka topic names
 */
export const KAFKA_TOPICS = {
  /** Raw scraped jobs */
  JOBS_RAW: 'jobs.raw',
  
  /** Jobs enriched with NLP data */
  JOBS_ENRICHED: 'jobs.enriched',
  
  /** Errors and failed jobs */
  JOBS_ERROR: 'jobs.error',
} as const;

/**
 * Redis key prefixes
 */
export const REDIS_KEYS = {
  /** Rate limiting */
  RATE_LIMIT: 'rate_limit',
  
  /** Job deduplication */
  JOB_SEEN: 'job_seen',
  
  /** Trending skills cache */
  TRENDING_SKILLS: 'trending_skills',
  
  /** User sessions */
  SESSION: 'session',
  
  /** Refresh tokens */
  REFRESH_TOKEN: 'refresh_token',
} as const;

/**
 * Password requirements
 */
export const PASSWORD_REQUIREMENTS = {
  /** Minimum length */
  MIN_LENGTH: 8,
  
  /** Maximum length */
  MAX_LENGTH: 128,
  
  /** Require uppercase letter */
  REQUIRE_UPPERCASE: true,
  
  /** Require lowercase letter */
  REQUIRE_LOWERCASE: true,
  
  /** Require number */
  REQUIRE_NUMBER: true,
  
  /** Require special character */
  REQUIRE_SPECIAL: true,
  
  /** Special characters allowed */
  SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

/**
 * Supported currencies
 */
export const CURRENCIES = ['USD', 'EUR', 'GBP', 'ILS', 'CAD', 'AUD'] as const;

/**
 * Supported countries
 */
export const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Israel',
  'Netherlands',
] as const;

/**
 * Default skill categories for taxonomy
 */
export const SKILL_CATEGORIES = [
  'programming_language',
  'framework',
  'database',
  'cloud_platform',
  'devops_tool',
  'ml_library',
  'soft_skill',
  'other',
] as const;

/**
 * HTTP status codes (common ones)
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Error codes for API responses
 */
export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  UNAUTHORIZED: 'UNAUTHORIZED',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_EMAIL: 'INVALID_EMAIL',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  PASSWORD_MISMATCH: 'PASSWORD_MISMATCH',
  
  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

/**
 * Service ports (for local development)
 */
export const SERVICE_PORTS = {
  SCRAPER: 3000,
  NLP: 3002,
  AGGREGATION: 3003,
  AUTH: 3001,
  API_GATEWAY: 4000,
  FRONTEND: 5173,
} as const;

/**
 * Environment types
 */
export const ENVIRONMENTS = ['development', 'staging', 'production'] as const;

/**
 * Log levels
 */
export const LOG_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'] as const;