/**
 * Skill-related types and interfaces
 * Matches MongoDB job_market.skills and skill_trends collections
 * @module types/skill
 */

/**
 * Skill categories
 * Updated Day 6: Added 'testing' category to match skill-taxonomy.json
 */
export type SkillCategory =
  | 'programming_language'
  | 'framework'
  | 'database'
  | 'cloud_platform'
  | 'devops_tool'
  | 'ml_library'
  | 'testing'
  | 'soft_skill'
  | 'other';

/**
 * Trend direction indicators
 */
export type TrendDirection = 'up' | 'down' | 'stable';

/**
 * Timeframe for trend aggregations
 */
export type TrendTimeframe = 'daily' | 'weekly' | 'monthly';

/**
 * Skill entity
 * Represents a skill in the taxonomy
 */
export interface Skill {
  /** Canonical/standardized skill name (e.g., "Python", "React") */
  canonical_name: string;
  
  /** Alternative names and spellings */
  aliases: string[];
  
  /** Skill category */
  category: SkillCategory;
  
  /** Related or complementary skills */
  related_skills: string[];
  
  /** Optional description */
  description?: string;
  
  /** Optional URL to documentation/learning resources */
  learn_url?: string;
  
  /** Difficulty level (1-5) */
  difficulty?: number;
}

/**
 * Skill taxonomy entry (matches skill-taxonomy.json format)
 * Used when loading taxonomy from JSON file
 */
export interface SkillTaxonomyEntry {
  /** Canonical/standardized skill name */
  canonical: string;
  
  /** Alternative names and spellings */
  aliases: string[];
  
  /** Skill category */
  category: SkillCategory;
  
  /** Related or complementary skills */
  related: string[];
}

/**
 * Skill taxonomy file structure
 */
export interface SkillTaxonomy {
  metadata: {
    version: string;
    total_skills: number;
    last_updated: string;
    description: string;
    categories: SkillCategory[];
  };
  skills: SkillTaxonomyEntry[];
}

/**
 * Skill trend data point
 * Represents aggregated trend data for a specific skill
 */
export interface SkillTrend {
  /** Reference to skill canonical name */
  skill_id: string;
  
  /** Date of this trend data point */
  date: Date;
  
  /** Number of job postings mentioning this skill */
  mentions_count: number;
  
  /** Average minimum salary for jobs with this skill */
  avg_salary_min: number | null;
  
  /** Average maximum salary for jobs with this skill */
  avg_salary_max: number | null;
  
  /** Trend direction compared to previous period */
  trend_direction: TrendDirection;
  
  /** Aggregation timeframe */
  timeframe: TrendTimeframe;
  
  /** Percentage change from previous period */
  change_percentage?: number;
}

/**
 * Skill with enriched trend data
 * Combines skill info with latest trends
 */
export interface SkillWithTrends extends Skill {
  /** Latest trend data */
  latest_trend: SkillTrend | null;
  
  /** Historical trends (last 30 days) */
  trends: SkillTrend[];
  
  /** Current popularity rank */
  rank?: number;
}

/**
 * Trending skills summary
 */
export interface TrendingSkills {
  /** Timeframe for these trends */
  timeframe: TrendTimeframe;
  
  /** Date of latest data */
  as_of_date: Date;
  
  /** Top trending skills */
  skills: SkillWithTrends[];
  
  /** Total skills tracked */
  total_skills: number;
}

/**
 * Skill search filters
 */
export interface SkillSearchFilters {
  /** Filter by category */
  category?: SkillCategory[];
  
  /** Text search in skill names */
  search?: string;
  
  /** Filter by related skills */
  related_to?: string[];
  
  /** Minimum mentions count */
  min_mentions?: number;
  
  /** Trend direction filter */
  trend_direction?: TrendDirection[];
}

/**
 * Skill comparison data
 */
export interface SkillComparison {
  /** Skills being compared */
  skills: string[];
  
  /** Comparison metrics */
  metrics: {
    skill: string;
    mentions_count: number;
    avg_salary: number | null;
    trend_direction: TrendDirection;
    change_percentage: number;
  }[];
  
  /** Timeframe for comparison */
  timeframe: TrendTimeframe;
}

/**
 * Skill gap analysis
 * Compares user skills against market demand
 */
export interface SkillGap {
  /** User's current skills */
  current_skills: string[];
  
  /** Skills in high demand */
  trending_skills: string[];
  
  /** Skills user is missing (high demand) */
  missing_skills: string[];
  
  /** Skills user has (low demand) */
  underutilized_skills: string[];
  
  /** Recommended skills to learn */
  recommended_skills: Array<{
    skill: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    avg_salary_boost: number | null;
  }>;
}

/**
 * Skill statistics by category
 */
export interface SkillStatsByCategory {
  category: SkillCategory;
  total_skills: number;
  total_mentions: number;
  avg_salary: number | null;
  top_skills: Array<{ skill: string; mentions: number }>;
}

/**
 * Skill extraction result (from NLP service)
 */
export interface SkillExtractionResult {
  /** Job ID that was processed */
  job_id: string;
  
  /** Extracted skill names */
  skills: string[];
  
  /** Confidence scores for each skill (0-1) */
  confidence_scores: Record<string, number>;
  
  /** Processing timestamp */
  extracted_at: Date;
  
  /** NLP model version used */
  model_version?: string;
}