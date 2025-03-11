/**
 * Environment interface for Cloudflare Worker
 * Contains bindings for KV namespaces and environment variables
 */
export interface Environment {
  // KV namespaces
  SESSION_KV: KVNamespace;
  REDUX_STATE_KV: KVNamespace;
  
  // Environment variables
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  JWT_SECRET: string;
  
  // Additional bindings as needed
}

/**
 * Session data stored in KV
 */
export interface SessionData {
  userId: string;
  email: string;
  displayName?: string;
  firebaseToken: string;
  refreshToken: string;
  createdAt: number;
  expiresAt: number;
}

/**
 * Redux state snapshot stored in KV
 */
export interface ReduxStateSnapshot {
  auth: {
    user: {
      uid: string;
      email: string;
      displayName?: string;
    } | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  };
  [key: string]: any; // Allow additional slices
}

/**
 * Response with CORS headers
 */
export interface CorsResponse extends Response {
  headers: Headers;
}
