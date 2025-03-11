import { Environment, ReduxStateSnapshot } from '@/lib/cloudflare/worker/types';
import { createCorsHeaders } from '../utils';

/**
 * Handler for Redux state operations
 * Manages persistence and retrieval of Redux state snapshots
 */
export class StateHandler {
  private env: Environment;
  private STATE_TTL = 604800; // 7 days in seconds

  constructor(env: Environment) {
    this.env = env;
  }

  /**
   * Route requests to the appropriate handler method
   */
  async handleRequest(request: Request, sessionId: string): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Route to appropriate handler
    if (path === '/api/state' && method === 'GET') {
      return await this.getState(sessionId);
    } 
    else if (path === '/api/state' && method === 'POST') {
      return await this.updateState(request, sessionId);
    }
    else {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }

  /**
   * Get the current Redux state for a session
   */
  private async getState(sessionId: string): Promise<Response> {
    try {
      // Get state from KV
      const stateString = await this.env.REDUX_STATE_KV.get(sessionId);
      
      if (!stateString) {
        // No state found, but that's ok - return empty state
        return new Response(JSON.stringify({
          state: null
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      const state: ReduxStateSnapshot = JSON.parse(stateString);
      
      // Return state to the client
      return new Response(JSON.stringify({
        state
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    } catch (error) {
      console.error('Get state error:', error);
      return new Response(JSON.stringify({ error: 'Failed to retrieve state' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }

  /**
   * Update the Redux state for a session
   */
  private async updateState(request: Request, sessionId: string): Promise<Response> {
    try {
      // Get state from request body
      const requestData = await request.json() as { state: ReduxStateSnapshot };
      const { state } = requestData;
      
      if (!state) {
        return new Response(JSON.stringify({ error: 'State is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Validate basic structure of state object
      const validState = this.validateState(state);
      if (!validState) {
        return new Response(JSON.stringify({ error: 'Invalid state structure' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Remove sensitive information from state before storage
      const sanitizedState = this.sanitizeState(state);

      // Store state in KV
      await this.env.REDUX_STATE_KV.put(
        sessionId, 
        JSON.stringify(sanitizedState),
        { expirationTtl: this.STATE_TTL }
      );

      // Return success
      return new Response(JSON.stringify({
        success: true
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    } catch (error) {
      console.error('Update state error:', error);
      return new Response(JSON.stringify({ error: 'Failed to update state' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }

  /**
   * Validate the structure of the state object
   */
  private validateState(state: any): boolean {
    // Minimal validation - ensure it's an object
    if (typeof state !== 'object' || state === null) {
      return false;
    }

    // Add additional validation as needed
    return true;
  }

  /**
   * Remove sensitive information from state before storage
   */
  private sanitizeState(state: any): ReduxStateSnapshot {
    // Create a deep copy to avoid mutations
    const sanitized = JSON.parse(JSON.stringify(state));
    
    // Remove sensitive auth information if present
    if (sanitized.auth) {
      // Keep only essential user info, remove tokens
      if (sanitized.auth.token) delete sanitized.auth.token;
      if (sanitized.auth.refreshToken) delete sanitized.auth.refreshToken;
      
      // Ensure user object only contains safe fields
      if (sanitized.auth.user) {
        sanitized.auth.user = {
          uid: sanitized.auth.user.uid,
          email: sanitized.auth.user.email,
          displayName: sanitized.auth.user.displayName
        };
      }
    }
    
    return sanitized;
  }
}
