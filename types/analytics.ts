/**
 * Analytics and market insights types
 * @module types/analytics
 */

import { ExperienceLevel, JobSource, Location } from './job.ts';
import { SkillCategory, TrendDirection } from './skill.ts';

/**
 * Comparison types
 */
export type ComparisonType = 'skills' | 'locations' | 'companies' | 'sources';

/**
 * Export types
 */
export type ExportType = 'jobs' | 'skills' | 'trends' | 'analytics';

/**
 * Export formatting types
 */
export type ExportFormatType = 'csv' | 'json' | 'excel'; 

/**
 * Salary statistics for a given criteria
 */
export interface SalaryStats {
  /** Number of jobs analyzed */
  sample_size: number;
  
  /** Minimum salary found */
  min: number | null;
  
  /** Maximum salary found */
  max: number | null;
  
  /** Mean (average) salary */
  mean: number | null;
  
  /** Median salary */
  median: number | null;
  
  /** 25th percentile */
  percentile_25: number | null;
  
  /** 75th percentile */
  percentile_75: number | null;
  
  /** Standard deviation */
  std_dev: number | null;
  
  /** Currency code */
  currency: string;
}

/**
 * Salary statistics by experience level
 */
export interface SalaryByExperience {
  experience_level: ExperienceLevel;
  stats: SalaryStats;
}

/**
 * Salary statistics by location
 */
export interface SalaryByLocation {
  location: Location;
  stats: SalaryStats;
}

/**
 * Market insights for a timeframe
 */
export interface MarketInsights {
  /** Timeframe for these insights */
  timeframe: 'daily' | 'weekly' | 'monthly';
  
  /** Start date of timeframe */
  start_date: Date;
  
  /** End date of timeframe */
  end_date: Date;
  
  /** Total jobs analyzed */
  total_jobs: number;
  
  /** Most in-demand skills */
  top_skills: Array<{
    skill: string;
    mentions: number;
    trend: TrendDirection;
    change_percentage: number;
  }>;
  
  /** Companies hiring most */
  top_companies: Array<{
    company: string;
    job_count: number;
  }>;
  
  /** Salary statistics by experience level */
  salary_by_experience: SalaryByExperience[];
  
  /** Top hiring locations */
  top_locations: Array<{
    city: string;
    state?: string;
    country: string;
    job_count: number;
  }>;
  
  /** Remote job statistics */
  remote_jobs: {
    count: number;
    percentage: number;
  };
  
  /** Job distribution by source */
  jobs_by_source: Record<JobSource, number>;
}

/**
 * Skill demand analysis
 */
export interface SkillDemandAnalysis {
  skill: string;
  category: SkillCategory;
  total_mentions: number;
  trend_direction: TrendDirection;
  change_percentage: number;
  avg_salary: number | null;
  top_paired_skills: Array<{
    skill: string;
    co_occurrence_count: number;
  }>;
  geographic_distribution: Array<{
    location: string;
    count: number;
  }>;
}

/**
 * Time series data point for charts
 */
export interface TimeSeriesDataPoint {
  date: Date;
  value: number;
  label?: string;
}

/**
 * Skill trend over time (for charts)
 */
export interface SkillTrendChart {
  skill: string;
  data_points: TimeSeriesDataPoint[];
  trend_direction: TrendDirection;
  total_change_percentage: number;
}

/**
 * Market comparison metrics
 */
export interface MarketComparison {
  /** Comparison type */
  type: ComparisonType;
  
  /** Items being compared */
  items: string[];
  
  /** Metrics for comparison */
  metrics: Array<{
    item: string;
    job_count: number;
    avg_salary: number | null;
    trend: TrendDirection;
    market_share_percentage: number;
  }>;
  
  /** Timeframe */
  timeframe: string;
}

/**
 * Dashboard summary statistics
 */
export interface DashboardStats {
  /** Total jobs in database */
  total_jobs: number;
  
  /** Jobs added in last 24 hours */
  jobs_today: number;
  
  /** Total unique skills tracked */
  total_skills: number;
  
  /** Total companies */
  total_companies: number;
  
  /** Average salary across all jobs */
  avg_salary: number | null;
  
  /** Most trending skill right now */
  top_trending_skill: {
    skill: string;
    mentions: number;
    change_percentage: number;
  } | null;
  
  /** Last update timestamp */
  last_updated: Date;
}

/**
 * Filters for analytics queries
 */
export interface AnalyticsFilters {
  /** Date range */
  date_range?: {
    start: Date;
    end: Date;
  };
  
  /** Filter by skills */
  skills?: string[];
  
  /** Filter by locations */
  locations?: Location[];
  
  /** Filter by experience levels */
  experience_levels?: ExperienceLevel[];
  
  /** Filter by sources */
  sources?: JobSource[];
  
  /** Filter by skill categories */
  skill_categories?: SkillCategory[];
}

/**
 * Export data format for CSV/Excel
 */
export interface ExportData {
  /** Export type */
  type: ExportType;
  
  format: ExportFormatType;
  
  /** Data rows */
  data: Record<string, any>[];
  
  /** Column headers */
  headers: string[];
  
  /** Filters applied */
  filters?: AnalyticsFilters;
  
  /** Export timestamp */
  exported_at: Date;
}