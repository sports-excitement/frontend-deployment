import { AuthHandler } from '@/lib/cloudflare/worker/handlers/auth';
import { StateHandler } from '@/lib/cloudflare/worker/handlers/state';
import { Environment } from '@/lib/cloudflare/worker/types';
import { createCorsHeaders, isValidSession } from '@/lib/cloudflare/worker/utils';

/**
 * Main Cloudflare Worker entrypoint
 * Handles all requests to the /api routes
 */
export default {
  async fetch(request: Request, env: Environment): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: createCorsHeaders(),
      });
    }

    try {
      // Auth routes don't require authentication
      if (path.startsWith('/api/auth')) {
        const authHandler = new AuthHandler(env);
        return await authHandler.handleRequest(request);
      }

      // All other API routes require authentication
      if (path.startsWith('/api/')) {
        // Extract session token from cookies or headers
        const sessionId = request.headers.get('X-Session-ID') || 
                          request.headers.get('Authorization')?.replace('Bearer ', '');
        
        if (!sessionId) {
          return new Response(JSON.stringify({ error: 'Missing session token' }), {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              ...createCorsHeaders()
            }
          });
        }

        // Validate the session
        const isValid = await isValidSession(sessionId, env);
        if (!isValid) {
          return new Response(JSON.stringify({ error: 'Invalid or expired session' }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              ...createCorsHeaders()
            }
          });
        }

        // Handle Redux state operations
        if (path.startsWith('/api/state')) {
          const stateHandler = new StateHandler(env);
          return await stateHandler.handleRequest(request, sessionId);
        }

        // Handle other API routes (could be expanded later)
        return new Response(JSON.stringify({ error: 'Not implemented' }), {
          status: 501,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Not an API route - pass through to origin
      return fetch(request);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }
};
