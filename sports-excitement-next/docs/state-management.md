# State Management in Sports Excitement

## Overview
Sports Excitement uses Redux for frontend state management, with a focus on type safety, validation, and rate limiting. This setup helps prevent spam and ensures data integrity.

## Key Components

### 1. Redux Store
- Centralized state management
- TypeScript integration for type safety
- Development tools enabled in non-production environments
- Custom middleware for validation and rate limiting

### 2. Middleware

#### Rate Limiting
```typescript
// Configuration
windowMs: 60000,    // 1 minute window
maxRequests: 30     // 30 requests per minute
```

Features:
- Per-user rate limiting
- Configurable time windows
- Request counting with automatic reset
- Graceful error handling

#### Validation
- Form validation rules
- Pattern matching
- Length restrictions
- Required field checking
- Custom error messages

### 3. Error Handling
The error system handles two types of errors:
1. Validation Errors
   - Field-specific error messages
   - Form validation state
   - Custom validation rules

2. Rate Limit Errors
   - User-friendly error messages
   - Retry-after information
   - Automatic request blocking

## Usage Example

```typescript
// Dispatching an action with validation
dispatch({
  type: 'auth/login',
  payload: {
    email: 'user@example.com',
    password: 'password123'
  }
});

// Handling errors in components
const errors = useAppSelector(state => state.error.validationErrors);
const rateLimit = useAppSelector(state => state.error.rateLimitError);
```

## Best Practices
1. Always use typed selectors and dispatch
2. Clear errors when forms are reset
3. Handle rate limit errors gracefully
4. Validate data before dispatching actions

## Configuration
Validation rules and rate limits can be adjusted in `store.ts`:
- Modify `validationRules` for different form requirements
- Adjust `rateLimitConfig` for different rate limiting needs

## Error Messages
Standard error messages are provided for:
- Invalid email format
- Password requirements
- Required fields
- Rate limit exceeded
