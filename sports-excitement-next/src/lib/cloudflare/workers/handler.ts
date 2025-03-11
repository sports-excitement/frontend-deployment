import { CloudflareEnv } from '@/lib/cloudflare/api/auth/types';
import { handleRequest as handleAuthRequest } from '@/lib/cloudflare/workers/api/auth/worker';
import { store } from '@/lib/Redux/store';

/**
 * CloudflareWorkerHandler class
 * Manages Cloudflare Worker request handling and routing
 */
export class CloudflareWorkerHandler {
  /**
   * Handle all API requests coming through Cloudflare Workers
   */
  static async handleApiRequest(request: Request, env: CloudflareEnv): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Initialize Redux store if needed for state management
    const reduxStore = store;

    // Route to appropriate handler based on path
    if (path.startsWith('/api/auth')) {
      return handleAuthRequest(request, env);
    }

    // Handle other API routes
    // ...

    // Return 404 for unmatched routes
    return new Response(JSON.stringify({
      success: false,
      error: 'Route not found',
      statusCode: 404
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  /**
   * Add required CORS headers to responses
   */
  static addCorsHeaders(response: Response): Response {
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  /**
   * Handle CORS preflight requests
   */
  static handleCorsPreflightRequest(): Response {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  /**
   * Main fetch handler for the Cloudflare Worker
   * Entry point for all requests
   */
  static async fetch(request: Request, env: CloudflareEnv): Promise<Response> {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return this.handleCorsPreflightRequest();
    }

    try {
      // Handle API requests
      const url = new URL(request.url);
      if (url.pathname.startsWith('/api')) {
        return this.handleApiRequest(request, env);
      }

      // For non-API routes, return a 404
      return new Response('Not found', { status: 404 });
    } catch (error) {
      // Handle any unhandled errors
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Worker error:', errorMessage);
      
      return new Response(JSON.stringify({
        success: false,
        error: errorMessage,
        statusCode: 500
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
}
