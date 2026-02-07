# @job-market/shared

Shared TypeScript types, constants, and utilities for the Job Market Intelligence Platform.

This package ensures type safety and consistency across all microservices (scraper, NLP, aggregation, auth, API gateway) and the frontend.

## 📦 What's Included

### Types

- **job.ts** - Job posting types matching MongoDB schema
- **skill.ts** - Skill and trend analysis types
- **user.ts** - User, authentication, and session types
- **analytics.ts** - Market insights and statistics types

### Data

- **constants.ts** - Shared constants (rate limits, TTLs, error codes, etc.)

### Utilities

- **validators.ts** - Validation functions (email, password, URL, etc.)
- **formatters.ts** - Formatting functions (salary, date, location, etc.)

---

## 🚀 Installation

This package is used internally across the Job Market Intelligence Platform services.

### In TypeScript Services (Scraper, API Gateway, Frontend)

```typescript
import { JobPosting, Skill, formatSalary } from '@job-market/shared';
```

### In Python Service (NLP)

Copy the type definitions as reference:

```bash
cp types/job.ts ../nlp-service/docs/types-reference.md
```

### In Go Services (Aggregation, Auth)

Use types as Go struct reference.

---

## 📚 Usage Examples

### Job Types

```typescript
import { JobPosting, JobSource, ExperienceLevel } from '@job-market/shared';

const job: JobPosting = {
  job_id: 'linkedin_12345',
  title: 'Senior Software Engineer',
  company: 'Tech Corp',
  location: {
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
  },
  description: 'We are looking for...',
  skills_extracted: null, // Filled by NLP service
  salary: {
    min: 120000,
    max: 180000,
    currency: 'USD',
    period: SalaryPeriod.YEAR,
  },
  experience_level: ExperienceLevel.SENIOR,
  scraped_at: new Date(),
  source: JobSource.LINKEDIN,
};
```

### Skill Types

```typescript
import { Skill, SkillTrend, SkillCategory } from '@job-market/shared';

const pythonSkill: Skill = {
  canonical_name: 'Python',
  aliases: ['python', 'Python3', 'py'],
  category: SkillCategory.PROGRAMMING_LANGUAGE,
  related_skills: ['Django', 'Flask', 'FastAPI'],
};

const trend: SkillTrend = {
  skill_id: 'Python',
  date: new Date(),
  mentions_count: 1250,
  avg_salary_min: 90000,
  avg_salary_max: 150000,
  trend_direction: TrendDirection.UP,
  timeframe: TrendTimeframe.DAILY,
  change_percentage: 5.2,
};
```

### User & Auth Types

```typescript
import { 
  User, 
  LoginRequest, 
  SignupRequest, 
  TokenPair 
} from '@job-market/shared';

const loginReq: LoginRequest = {
  email: 'user@example.com',
  password: 'SecurePass123!',
};

const signupReq: SignupRequest = {
  email: 'newuser@example.com',
  password: 'SecurePass123!',
  confirm_password: 'SecurePass123!',
  profile: {
    name: 'John Doe',
    job_title: 'Software Engineer',
  },
};

const tokens: TokenPair = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  token_type: 'Bearer',
  expires_in: 900, // 15 minutes
};
```

### Constants

```typescript
import {
  RATE_LIMITS,
  TOKEN_EXPIRY,
  CACHE_TTL,
  ERROR_CODES,
} from '@job-market/shared';

// Rate limiting
if (requestCount > RATE_LIMITS.LOGIN_ATTEMPTS) {
  throw new Error(ERROR_CODES.RATE_LIMIT_EXCEEDED);
}

// Cache TTL
redis.setex(key, CACHE_TTL.TRENDING_SKILLS, data);

// Token generation
const accessTokenExpiry = Date.now() + TOKEN_EXPIRY.ACCESS_TOKEN * 1000;
```

### Validators

```typescript
import {
  isValidEmail,
  validatePassword,
  validateSalaryRange,
  isValidUrl,
} from '@job-market/shared';

// Email validation
if (!isValidEmail(email)) {
  throw new Error('Invalid email format');
}

// Password validation
const { isValid, error } = validatePassword(password);
if (!isValid) {
  throw new Error(error);
}

// Salary range validation
const salaryCheck = validateSalaryRange(100000, 150000);
if (!salaryCheck.isValid) {
  throw new Error(salaryCheck.error);
}

// URL validation
if (!isValidUrl(jobUrl)) {
  throw new Error('Invalid job URL');
}
```

### Formatters

```typescript
import {
  formatSalary,
  formatSalaryRange,
  formatDate,
  formatRelativeTime,
  formatLocation,
  formatSkillName,
} from '@job-market/shared';

// Salary formatting
console.log(formatSalary(120000)); // "$120,000"
console.log(formatSalaryRange(100000, 150000)); // "$100,000 - $150,000"

// Date formatting
console.log(formatDate(new Date(), 'short')); // "Feb 7, 2026"
console.log(formatDate(new Date(), 'long')); // "February 7, 2026"
console.log(formatRelativeTime(yesterday)); // "1 day ago"

// Location formatting
console.log(formatLocation({
  city: 'San Francisco',
  state: 'CA',
  country: 'United States',
})); // "San Francisco, CA, United States"

// Skill name formatting
console.log(formatSkillName('javascript')); // "JavaScript"
console.log(formatSkillName('nodejs')); // "Node.js"
```

---

## 🏗️ Type Structure

### MongoDB Schema Alignment

All types in this package are designed to **exactly match** the MongoDB schema defined in the database.

| Type | MongoDB Collection | Purpose |
|------|-------------------|---------|
| `JobPosting` | `jobs` | Scraped job postings |
| `Skill` | `skills` | Skill taxonomy |
| `SkillTrend` | `skill_trends` | Aggregated trend data |
| `User` | `users` | User accounts |

### Type Relationships

```
JobPosting
├── location: Location
├── salary: Salary
├── skills_extracted: string[]  (references Skill.canonical_name)
├── experience_level: ExperienceLevel (enum)
└── source: JobSource (enum)

Skill
├── canonical_name: string (unique)
├── aliases: string[]
├── category: SkillCategory (enum)
└── related_skills: string[]  (references other Skill.canonical_name)

SkillTrend
├── skill_id: string  (references Skill.canonical_name)
├── date: Date
├── mentions_count: number
├── trend_direction: TrendDirection (enum)
└── timeframe: TrendTimeframe (enum)

User
├── email: string (unique)
├── password_hash: string
├── role: UserRole (enum)
├── profile: UserProfile (optional)
└── preferences: UserPreferences (optional)
```

---

## 🔧 Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

---

## 📖 Type Documentation

### Enums

#### JobSource
```typescript
enum JobSource {
  LINKEDIN = 'linkedin',
  INDEED = 'indeed',
  GLASSDOOR = 'glassdoor',
}
```

#### ExperienceLevel
```typescript
enum ExperienceLevel {
  ENTRY = 'entry',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  UNKNOWN = 'unknown',
}
```

#### SkillCategory
```typescript
type SkillCategory =
  | 'programming_language'
  | 'framework'
  | 'database'
  | 'cloud_platform'
  | 'devops_tool'
  | 'ml_library'
  | 'soft_skill'
  | 'other';
```

#### UserRole
```typescript
type UserRole = 'user' | 'premium' | 'admin';
```

---

## 🔗 Used By

- [scraper-service](https://github.com/OferGM-job-market-intelligence/scraper-service) - TypeScript/Bun.js
- [api-gateway](https://github.com/OferGM-job-market-intelligence/api-gateway) - TypeScript/Bun.js
- [frontend](https://github.com/OferGM-job-market-intelligence/frontend) - React/TypeScript
- [nlp-service](https://github.com/OferGM-job-market-intelligence/nlp-service) - Python (reference)
- [aggregation-service](https://github.com/OferGM-job-market-intelligence/aggregation-service) - Go (reference)
- [auth-service](https://github.com/OferGM-job-market-intelligence/auth-service) - Go (reference)

---

## 📋 Adding New Types

When adding new types:

1. **Create type file** in `types/` directory
2. **Export from index.ts**
3. **Update this README** with usage examples
4. **Add to package.json exports** if needed
5. **Update MongoDB schema** if database-related
6. **Commit with conventional commit message**

Example:
```bash
# Create new type file
touch types/company.ts

# Add exports to index.ts
echo "export * from './types/company';" >> index.ts

# Commit
git add .
git commit -m "feat(types): add Company type definition"
git push origin main
```

---

## 🛠️ Best Practices

### Type Safety

✅ **DO**: Use strict TypeScript configuration
✅ **DO**: Avoid `any` types
✅ **DO**: Use enums for fixed sets of values
✅ **DO**: Make optional fields explicitly optional with `?`

❌ **DON'T**: Use `as any` to bypass type checking
❌ **DON'T**: Define types inline - use this shared package
❌ **DON'T**: Mix enums and string unions inconsistently

### Validation

✅ **DO**: Validate user input with validator functions
✅ **DO**: Use validators before database writes
✅ **DO**: Return meaningful error messages

### Formatting

✅ **DO**: Use formatter functions for consistent display
✅ **DO**: Format data for UI presentation
✅ **DO**: Keep formatting logic centralized

---

## 📝 Version History

### 1.0.0 (2026-02-07)
- Initial release
- Complete type definitions for all services
- Validation and formatting utilities
- Shared constants

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 🤝 Contributing

This is part of the Job Market Intelligence Platform. See the main [project documentation](https://github.com/OferGM-job-market-intelligence/.github) for contribution guidelines.

---

**Last Updated**: Day 5 - February 7, 2026  
**Status**: Complete ✅