# Shared Resources

Shared types, data, and utilities used across all Job Market Intelligence microservices.

## 📁 Structure
```
shared/
├── types/          # TypeScript interfaces & types
├── data/           # Skill taxonomy, constants
└── utils/          # Common utility functions
```

## 🔧 Usage

### In Services
```typescript
// TypeScript services (scraper, api-gateway)
import { JobPosting, Skill } from '@job-market/shared/types';

// Use types
const job: JobPosting = {
  job_id: 'linkedin_123',
  title: 'Software Engineer',
  // ...
};
```

### In Python Service
```python
# Copy types/job.py to nlp-service
from types.job import JobPosting
```

## 📦 Contents

### Types

- `job.ts` - JobPosting, Location, Salary interfaces
- `skill.ts` - Skill, SkillTrend, SkillCategory types
- `user.ts` - User, TokenPair, AuthRequest types
- `analytics.ts` - MarketInsights, SalaryStats types

### Data

- `skill-taxonomy.json` - 500+ skills with categories & aliases
- `constants.ts` - Shared constants (API limits, timeframes)

### Utils

- `validators.ts` - Common validation functions
- `formatters.ts` - Date, currency, text formatters

## 🚀 Development
```bash
# Install dependencies
npm install

# Build (if needed)
npm run build
```

## 📋 Adding New Types

1. Create file in `types/`
2. Export from `types/index.ts`
3. Update version in package.json
4. Commit and push

## 🔗 Used By

- [scraper-service](https://github.com/job-market-intelligence/scraper-service)
- [nlp-service](https://github.com/job-market-intelligence/nlp-service)
- [aggregation-service](https://github.com/job-market-intelligence/aggregation-service)
- [auth-service](https://github.com/job-market-intelligence/auth-service)
- [api-gateway](https://github.com/job-market-intelligence/api-gateway)
- [frontend](https://github.com/job-market-intelligence/frontend)