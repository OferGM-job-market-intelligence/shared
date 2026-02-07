/**
 * Formatting utility functions
 * @module utils/formatters
 */

/**
 * Format salary with currency symbol
 * @param amount - Salary amount
 * @param currency - Currency code (default: USD)
 * @returns Formatted salary string (e.g., "$120,000")
 */
export function formatSalary(amount: number, currency: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}

/**
 * Format salary range
 * @param min - Minimum salary
 * @param max - Maximum salary
 * @param currency - Currency code (default: USD)
 * @returns Formatted range string (e.g., "$100,000 - $150,000")
 */
export function formatSalaryRange(
  min: number | null,
  max: number | null,
  currency: string = 'USD'
): string {
  if (min === null && max === null) {
    return 'Not specified';
  }

  if (min === null) {
    return `Up to ${formatSalary(max!, currency)}`;
  }

  if (max === null) {
    return `From ${formatSalary(min, currency)}`;
  }

  return `${formatSalary(min, currency)} - ${formatSalary(max, currency)}`;
}

/**
 * Format date to human-readable string
 * @param date - Date to format
 * @param format - Format type ('short' | 'long' | 'relative')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }

  if (format === 'relative') {
    return formatRelativeTime(date);
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Format date to relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  } else if (diffWeek < 4) {
    return `${diffWeek} week${diffWeek !== 1 ? 's' : ''} ago`;
  } else if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffYear} year${diffYear !== 1 ? 's' : ''} ago`;
  }
}

/**
 * Format number with thousands separator
 * @param num - Number to format
 * @returns Formatted number string (e.g., "1,234,567")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format percentage
 * @param value - Percentage value (0-100)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string (e.g., "75.5%")
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format location string from Location object
 * @param location - Location object
 * @returns Formatted location string (e.g., "San Francisco, CA, USA")
 */
export function formatLocation(location: {
  city?: string;
  state?: string;
  country?: string;
}): string {
  const parts: string[] = [];

  if (location.city) parts.push(location.city);
  if (location.state) parts.push(location.state);
  if (location.country) parts.push(location.country);

  return parts.join(', ') || 'Location not specified';
}

/**
 * Truncate text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  if (!text) return '';

  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format experience level to display text
 * @param level - Experience level enum value
 * @returns Formatted display text
 */
export function formatExperienceLevel(level: string): string {
  const mapping: Record<string, string> = {
    entry: 'Entry Level',
    mid: 'Mid Level',
    senior: 'Senior',
    lead: 'Lead / Principal',
    unknown: 'Not Specified',
  };

  return mapping[level] || capitalizeWords(level);
}

/**
 * Format job source to display name
 * @param source - Job source enum value
 * @returns Formatted display name
 */
export function formatJobSource(source: string): string {
  const mapping: Record<string, string> = {
    linkedin: 'LinkedIn',
    indeed: 'Indeed',
    glassdoor: 'Glassdoor',
  };

  return mapping[source] || capitalizeWords(source);
}

/**
 * Format file size to human-readable string
 * @param bytes - File size in bytes
 * @returns Formatted size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format duration in milliseconds to human-readable string
 * @param ms - Duration in milliseconds
 * @returns Formatted duration string (e.g., "2h 30m")
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format skill name (ensure proper capitalization)
 * @param skillName - Skill name to format
 * @returns Formatted skill name
 */
export function formatSkillName(skillName: string): string {
  if (!skillName) return '';

  // Special cases for common acronyms/names
  const specialCases: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    nodejs: 'Node.js',
    'node.js': 'Node.js',
    reactjs: 'React',
    'react.js': 'React',
    vuejs: 'Vue.js',
    'vue.js': 'Vue.js',
    angularjs: 'Angular',
    mongodb: 'MongoDB',
    postgresql: 'PostgreSQL',
    mysql: 'MySQL',
    graphql: 'GraphQL',
    aws: 'AWS',
    gcp: 'GCP',
    sql: 'SQL',
    html: 'HTML',
    css: 'CSS',
    api: 'API',
    rest: 'REST',
    json: 'JSON',
    xml: 'XML',
    ui: 'UI',
    ux: 'UX',
    css3: 'CSS3',
    html5: 'HTML5',
  };

  const normalized = skillName.toLowerCase().trim();

  if (specialCases[normalized]) {
    return specialCases[normalized];
  }

  // Default: capitalize first letter
  return skillName.charAt(0).toUpperCase() + skillName.slice(1);
}

/**
 * Format trend direction to display text with emoji
 * @param direction - Trend direction
 * @returns Formatted text with emoji
 */
export function formatTrendDirection(direction: string): string {
  const mapping: Record<string, string> = {
    up: '📈 Trending Up',
    down: '📉 Trending Down',
    stable: '➡️ Stable',
  };

  return mapping[direction] || direction;
}

/**
 * Format change percentage with sign
 * @param value - Percentage value
 * @returns Formatted percentage with + or - sign
 */
export function formatChangePercentage(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${formatPercentage(value)}`;
}

/**
 * Pluralize word based on count
 * @param count - Number of items
 * @param singular - Singular form
 * @param plural - Plural form (default: singular + 's')
 * @returns Pluralized word
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  if (count === 1) {
    return singular;
  }
  return plural || singular + 's';
}

/**
 * Format list of items with commas and "and"
 * @param items - Array of items
 * @returns Formatted list string (e.g., "item1, item2, and item3")
 */
export function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return String(items[0]);
  if (items.length === 2) return items.join(' and ');

  return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}