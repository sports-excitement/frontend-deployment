import { ExecutionContext } from '@cloudflare/workers-types';
import { AuthHandler } from '@/lib/cloudflare/worker/handlers/auth';
import { CloudflareEnv } from '@/lib/cloudflare/api/auth/types';
import { Environment } from '@/lib/cloudflare/worker/types';

// Extend the globalThis interface to include our KV namespaces
declare global {
  var SESSION_KV: KVNamespace | undefined;
  var REDUX_STATE_KV: KVNamespace | undefined;
}

interface ValidationResult {
  success: boolean;
  error?: string;
}

export async function handleApiRequest(request: Request, env: CloudflareEnv): Promise<Response> {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // Auth endpoints are handled directly by the AuthHandler
  if (path.startsWith('/api/auth')) {
    // Type cast and augment CloudflareEnv to match Environment
    const workerEnv: Environment = {
      ...env,
      SESSION_KV: env.SESSION_KV || globalThis.SESSION_KV as KVNamespace,
      REDUX_STATE_KV: env.REDUX_STATE_KV || globalThis.REDUX_STATE_KV as KVNamespace,
      JWT_SECRET: env.JWT_SECRET || process.env.JWT_SECRET as string || 'default-jwt-secret'
    };
    
    const authHandler = new AuthHandler(workerEnv);
    return authHandler.handleRequest(request);
  }

  // For non-auth endpoints, validate the authorization
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'No authorization header' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return new Response(JSON.stringify({ error: 'Invalid authorization header format' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // For other APIs, we need to check the session validity
  // Use the session ID from the request or headers
  const sessionId = token; // Assuming token is the session ID
  
  // Access Session KV through the appropriate environment binding
  const sessionKV = env.SESSION_KV || globalThis.SESSION_KV as KVNamespace;
  if (!sessionKV) {
    return new Response(JSON.stringify({ error: 'Session storage not available' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const sessionData = await sessionKV.get(sessionId);
  
  if (!sessionData) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Continue processing the request
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function handleRequest(request: Request, env: CloudflareEnv, ctx: ExecutionContext): Promise<Response> {
  try {
    const url = new URL(request.url);
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env);
    }
    
    // For non-API requests, return a 404
    return new Response('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response('Internal server error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

export default {
  async fetch(
    request: Request,
    env: CloudflareEnv,
    ctx: ExecutionContext
  ): Promise<Response> {
    return handleRequest(request, env, ctx);
  }
};
