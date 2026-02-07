/**
 * User and authentication types
 * Matches MongoDB job_market.users collection and auth service
 * @module types/user
 */

/**
 * User roles
 */
export type UserRole = 'user' | 'premium' | 'admin';

/**
 * User entity
 */
export interface User {
  /** User's email address (unique identifier) */
  email: string;
  
  /** Bcrypt hashed password */
  password_hash: string;
  
  /** User role */
  role: UserRole;
  
  /** Account creation timestamp */
  created_at: Date;
  
  /** Last login timestamp */
  last_login: Date | null;
  
  /** User profile information (optional) */
  profile?: UserProfile;
  
  /** User preferences (optional) */
  preferences?: UserPreferences;
}

/**
 * User profile information
 */
export interface UserProfile {
  /** Full name */
  name?: string;
  
  /** Current job title */
  job_title?: string;
  
  /** Years of experience */
  years_experience?: number;
  
  /** Current company */
  company?: string;
  
  /** Location */
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  
  /** Skills the user has */
  skills?: string[];
  
  /** User's LinkedIn profile URL */
  linkedin_url?: string;
  
  /** User's GitHub profile URL */
  github_url?: string;
  
  /** User's portfolio website */
  website_url?: string;
}

/**
 * User preferences
 */
export interface UserPreferences {
  /** Email notification settings */
  notifications: {
    skill_trends: boolean;
    new_jobs: boolean;
    weekly_digest: boolean;
  };
  
  /** Preferred job search filters */
  job_alerts?: {
    skills?: string[];
    locations?: string[];
    min_salary?: number;
    experience_levels?: string[];
  };
  
  /** Dashboard customization */
  dashboard?: {
    favorite_skills?: string[];
    hidden_sources?: string[];
  };
}

/**
 * Public user data (safe to send to client)
 */
export interface UserPublic {
  email: string;
  role: UserRole;
  created_at: Date;
  last_login: Date | null;
  profile?: UserProfile;
  preferences?: UserPreferences;
}

/**
 * JWT token pair
 */
export interface TokenPair {
  /** Access token (short-lived, 15 minutes) */
  access_token: string;
  
  /** Refresh token (long-lived, 7 days) */
  refresh_token: string;
  
  /** Token type (always "Bearer") */
  token_type: 'Bearer';
  
  /** Access token expiry in seconds */
  expires_in: number;
}

/**
 * JWT payload
 */
export interface JWTPayload {
  /** User email */
  email: string;
  
  /** User role */
  role: UserRole;
  
  /** Issued at timestamp */
  iat: number;
  
  /** Expiry timestamp */
  exp: number;
  
  /** Token type */
  type: 'access' | 'refresh';
}

/**
 * Login request payload
 */
export interface LoginRequest {
  /** User email */
  email: string;
  
  /** Plain text password */
  password: string;
}

/**
 * Signup request payload
 */
export interface SignupRequest {
  /** User email */
  email: string;
  
  /** Plain text password (min 8 characters) */
  password: string;
  
  /** Password confirmation */
  confirm_password: string;
  
  /** Optional profile information */
  profile?: Partial<UserProfile>;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  /** User data (without password_hash) */
  user: UserPublic;
  
  /** JWT tokens */
  tokens: TokenPair;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refresh_token: string;
}

/**
 * Password change request
 */
export interface PasswordChangeRequest {
  current_password: string;
  
  new_password: string;
  
  confirm_new_password: string;
}

/**
 * Password reset request (forgot password)
 */
export interface PasswordResetRequest {
  /** User email */
  email: string;
}

/**
 * Password reset confirmation (with token from email)
 */
export interface PasswordResetConfirm {
  /** Reset token from email */
  token: string;

  new_password: string;
  
  /** New password confirmation */
  confirm_new_password: string;
}

/**
 * User update payload
 */
export interface UserUpdateRequest {
  /** Profile updates */
  profile?: Partial<UserProfile>;
  
  /** Preference updates */
  preferences?: Partial<UserPreferences>;
}

/**
 * Login attempt tracking (for rate limiting)
 */
export interface LoginAttempt {
  email: string;
  ip_address: string;
  timestamp: Date;
  success: boolean;
  user_agent?: string;
}

/**
 * Session information
 */
export interface Session {
  /** Session ID */
  session_id: string;
  
  /** User email */
  email: string;
  
  /** Refresh token (stored in Redis) */
  refresh_token: string;
  
  created_at: Date;
  
  expires_at: Date;
  
  /** Last activity timestamp */
  last_activity: Date;
  
  /** Client info */
  client_info?: {
    ip_address: string;
    user_agent: string;
  };
}