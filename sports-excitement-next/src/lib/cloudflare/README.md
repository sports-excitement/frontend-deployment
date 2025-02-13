# Cloudflare Integration

This module provides edge-optimized middleware and frontend hosting using Cloudflare Workers and Pages.

## Features

* Firebase Authentication at edge locations
* DDoS protection with rate limiting
* KV storage caching layer
* Full TypeScript type safety
* CI/CD ready deployment

## Credential Management

### Firebase Credentials

The application uses two sets of Firebase credentials:

1. **Admin SDK Credentials (Private)**
   * Stored as Cloudflare Worker Secrets
   * Used for server-side operations
   * Set up using wrangler CLI:
   ```bash
wrangler secret put FIREBASE_ADMIN_PROJECT_ID
wrangler secret put FIREBASE_ADMIN_PRIVATE_KEY
wrangler secret put FIREBASE_ADMIN_CLIENT_EMAIL
```

2. **Public Firebase Config**
   * Stored in wrangler.toml [vars]
   * Used for client-side Firebase initialization
   * Configure in wrangler.toml:
   ```toml
[vars]
FIREBASE_API_KEY = "your-api-key"
FIREBASE_AUTH_DOMAIN = "your-domain"
FIREBASE_PROJECT_ID = "your-project-id"
```

## Setup

1. Install dependencies:
   ```bash
npm install firebase-admin @cloudflare/workers-types wrangler
```

2. Configure Firebase credentials:
   * Get your Firebase Admin SDK service account key from Firebase Console
   * Set up secrets using wrangler CLI (see Credential Management section)
   * Update public Firebase config in wrangler.toml

3. Deploy:
   ```bash
npm run deploy:cloudflare
```

## Architecture

* `/workers`: Contains Cloudflare Workers code
  * `/middleware`: Auth, validation, and rate limiting
  * `handlers.ts`: Main request handler
* `/pages`: Cloudflare Pages configuration
  * `/api`: API routes
* `/adapters`: Firebase function adapters
* `/types`: TypeScript type definitions

## Usage

```typescript
// Example API route
import { wrapFirebaseFunction } from '../adapters/firebase';

const validationRules = {
  email: { required: true, pattern: /^\S+@\S+$/ }
};

export const onRequest = wrapFirebaseFunction(myHandler, validationRules);
```

## Security Notes

* Never commit Firebase Admin SDK credentials to version control
* Always use Cloudflare Worker Secrets for sensitive information
* Public Firebase config is safe to include in client-side code
* Use environment-specific configurations for development/production
