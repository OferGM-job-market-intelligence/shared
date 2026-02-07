/**
 * Shared types and utilities
 * @module @job-market/shared
 */

// Types
export * from './types/job.ts';
export * from './types/skill.ts';
export * from './types/user.ts';
export * from './types/analytics.ts';

// Utils
export * from './utils/validators.ts';
export * from './utils/formatters.ts';

// Constants
export * from './data/constants.ts';

// Re-export commonly used types for convenience
export type {
  JobPosting,
  JobPostingCreate,
  JobSearchFilters,
  JobSearchResults,
  Location,
  Salary,
} from './types/job.ts';

export type {
  Skill,
  SkillTrend,
  SkillWithTrends,
  TrendingSkills,
  SkillGap,
  SkillExtractionResult,
} from './types/skill.ts';

export type {
  User,
  UserPublic,
  UserProfile,
  TokenPair,
  JWTPayload,
  LoginRequest,
  SignupRequest,
  AuthResponse,
} from './types/user.ts';

export type {
  SalaryStats,
  MarketInsights,
  DashboardStats,
  SkillDemandAnalysis,
  TimeSeriesDataPoint,
} from './types/analytics.ts';

// Export enums for runtime use
export { JobSource, ExperienceLevel, SalaryPeriod } from './types/job.ts';
export { SkillCategory, TrendDirection, TrendTimeframe } from './types/skill.ts';
export { UserRole } from './types/user.ts';

/**
 * Package version
 */
export const VERSION = '1.0.0';

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@job-market/shared',
  version: VERSION,
  description: 'Shared types, constants, and utilities for Job Market Intelligence Platform',
  repository: 'https://github.com/OferGM-job-market-intelligence/shared',
} as const;