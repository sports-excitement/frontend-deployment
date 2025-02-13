# Authentication System

The authentication system uses Firebase Authentication REST API for user management and authentication.

## Architecture

- Uses Firebase Auth REST API for authentication
- Runs on Cloudflare Workers using standard HTTP/HTTPS protocols
- Simple request/response flow with proper error handling

## Setup

1. Add your Firebase API key to your environment variables:
```toml
FIREBASE_API_KEY = "your-api-key"
```
2. Import and use the auth API:
```typescript
import { signInWithEmailPassword } from '@/lib/auth/api';

// Sign in a user
const response = await signInWithEmailPassword(email, password, apiKey);
```

## API Reference

### `signInWithEmailPassword(email: string, password: string, apiKey: string)`

Signs in a user with email and password.

Returns:
```typescript
interface LoginResponse {
  token: string;
  user: {
    uid: string;
    email: string;
    emailVerified: boolean;
  }
}
```

## Error Handling

The API throws errors with proper error messages that can be caught and handled:
```typescript
try {
  const response = await signInWithEmailPassword(email, password, apiKey);
} catch (error) {
  // Handle authentication error
  console.error(error.message);
}
