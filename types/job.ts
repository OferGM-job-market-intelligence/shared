/**
 * Job-related types and interfaces
 * Matches MongoDB job_market.jobs collection schema
 * @module types/job
 */

/**
 * Job board sources for scraping
 */
export type JobSource = 'linkedin' | 'indeed' | 'glassdoor';

/**
 * Experience level classifications
 */
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'unknown';

/**
 * Salary period types
 */
export type SalaryPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';

/**
 * Currency codes (ISO 4217)
 */
export type Currency = 'USD' | 'EUR' | 'GBP' | 'ILS' | 'CAD' | 'AUD';

/**
 * Employment types
 */
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';

/**
 * Job location information
 */
export interface Location {
  /** City name */
  city?: string;
  /** State or province code */
  state?: string;
  /** Country name or code */
  country?: string;
  /** Full address string (optional) */
  address?: string;
  /** Remote work indicator */
  remote?: boolean;
}

/**
 * Salary information
 */
export interface Salary {
  /** Minimum salary */
  min: number | null;
  /** Maximum salary */
  max: number | null;
  /** Currency code */
  currency: Currency;
  /** Payment period */
  period: SalaryPeriod;
}

/**
 * Company information
 */
export interface Company {
  /** Company name */
  name: string;
  /** Company website URL */
  website?: string;
  /** Company size range */
  size?: string;
  /** Industry/sector */
  industry?: string;
}

/**
 * Job posting entity
 * Represents a scraped job from any source
 */
export interface JobPosting {
  /** Unique job identifier (format: source_id, e.g., "linkedin_12345") */
  job_id: string;
  
  /** Job title */
  title: string;
  
  /** Company name (or Company object) */
  company: string | Company;
  
  /** Job location */
  location?: Location;
  
  /** Full job description (HTML or plain text) */
  description: string;
  
  /** Skills extracted by NLP service (null until processed) */
  skills_extracted: string[] | null;
  
  /** Salary information (null if not provided) */
  salary: Salary | null;
  
  /** Experience level (classified by NLP or from posting) */
  experience_level: ExperienceLevel;
  
  /** Original job posting URL */
  url?: string;
  
  /** When this job was scraped */
  scraped_at: Date;
  
  /** Job board source */
  source: JobSource;
  
  /** Job posted date (from source, if available) */
  posted_at?: Date;
  
  /** Job application deadline (if specified) */
  expires_at?: Date;
  
  /** Employment type (full-time, part-time, contract, etc.) */
  employment_type?: EmploymentType;
  
  /** Required qualifications list */
  requirements?: string[];
  
  /** Benefits mentioned in posting */
  benefits?: string[];
  
  /** Application instructions or URL */
  application_url?: string;
  
  /** Number of applicants (if available from source) */
  applicant_count?: number;
}

/**
 * Job posting creation payload (before scraping)
 */
export interface JobPostingCreate {
  job_id: string;
  title: string;
  company: string;
  description: string;
  source: JobSource;
  location?: Location;
  salary?: Salary;
  url?: string;
  posted_at?: Date;
}

/**
 * Job search filters
 */
export interface JobSearchFilters {
  /** Filter by skills */
  skills?: string[];
  
  /** Filter by location */
  location?: {
    city?: string;
    state?: string;
    country?: string;
    remote?: boolean;
  };
  
  /** Filter by experience level */
  experience_level?: ExperienceLevel[];
  
  /** Filter by job source */
  source?: JobSource[];
  
  /** Minimum salary filter */
  min_salary?: number;
  
  /** Maximum salary filter */
  max_salary?: number;
  
  /** Filter by employment type */
  employment_type?: string[];
  
  /** Text search in title/description */
  search?: string;
  
  /** Posted within last N days */
  posted_within_days?: number;
}

/**
 * Job search results with pagination
 */
export interface JobSearchResults {
  /** Array of job postings */
  jobs: JobPosting[];
  
  /** Total count of matching jobs */
  total: number;
  
  /** Current page number (1-indexed) */
  page: number;
  
  /** Number of results per page */
  limit: number;
  
  /** Total number of pages */
  total_pages: number;
  
  /** Whether there are more results */
  has_more: boolean;
}

/**
 * Job statistics summary
 */
export interface JobStats {
  /** Total number of jobs */
  total_jobs: number;
  
  /** Jobs by source */
  by_source: Record<JobSource, number>;
  
  /** Jobs by experience level */
  by_experience: Record<ExperienceLevel, number>;
  
  /** Average salary by experience level */
  avg_salary: Record<ExperienceLevel, number | null>;
  
  /** Most common skills */
  top_skills: Array<{ skill: string; count: number }>;
  
  /** Most hiring companies */
  top_companies: Array<{ company: string; count: number }>;
}