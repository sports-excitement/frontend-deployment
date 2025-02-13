/// <reference types="@cloudflare/workers-types" />

interface Env {
  // Firebase Admin SDK Secrets (stored as Cloudflare Worker Secrets)
  FIREBASE_ADMIN_PROJECT_ID: string;
  FIREBASE_ADMIN_PRIVATE_KEY: string;
  FIREBASE_ADMIN_CLIENT_EMAIL: string;
  
  // Firebase Public Config (stored in vars)
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  
  // Security
  RATE_LIMITER: DurableObjectNamespace;
  
  // Storage
  CACHE_STORE: KVNamespace;
}

declare global {
  function getMiniflareBindings(): Env;
  
  interface Request {
    user?: any;
  }
}
