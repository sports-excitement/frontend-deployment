import { Environment, SessionData } from '@/lib/cloudflare/worker/types';
import { createCorsHeaders, generateSessionId } from '../utils';

/**
 * Handler for all authentication-related endpoints
 */
export class AuthHandler {
  private env: Environment;
  private SESSION_TTL = 86400; // 24 hours in seconds

  constructor(env: Environment) {
    this.env = env;
  }

  /**
   * Route requests to the appropriate handler method
   */
  async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Route to appropriate handler
    if (path === '/api/auth/login' && method === 'POST') {
      return await this.handleLogin(request);
    } 
    else if (path === '/api/auth/register' && method === 'POST') {
      return await this.handleRegister(request);
    } 
    else if (path === '/api/auth/refresh' && method === 'POST') {
      return await this.handleTokenRefresh(request);
    } 
    else if (path === '/api/auth/logout' && method === 'POST') {
      return await this.handleLogout(request);
    }
    else if (path === '/api/auth/session' && method === 'GET') {
      return await this.getSession(request);
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
   * Handle login requests
   * Validates credentials with Firebase and creates a session
   */
  private async handleLogin(request: Request): Promise<Response> {
    try {
      const requestData = await request.json() as { email: string; password: string };
      const { email, password } = requestData;
      
      // Validate request body
      if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Call Firebase REST API to authenticate
      const firebaseResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.env.FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
          })
        }
      );

      const firebaseData = await firebaseResponse.json() as {
        localId: string;
        email: string;
        displayName?: string;
        idToken: string;
        refreshToken: string;
        expiresIn: string;
        error?: { message: string };
      };
      
      if (!firebaseResponse.ok) {
        return new Response(JSON.stringify({ error: firebaseData.error?.message || 'Authentication failed' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Create a new session
      const sessionId = generateSessionId();
      const nowInSeconds = Math.floor(Date.now() / 1000);
      
      const sessionData: SessionData = {
        userId: firebaseData.localId,
        email: firebaseData.email,
        displayName: firebaseData.displayName || undefined,
        firebaseToken: firebaseData.idToken,
        refreshToken: firebaseData.refreshToken,
        createdAt: nowInSeconds,
        expiresAt: nowInSeconds + parseInt(firebaseData.expiresIn)
      };

      // Store session in KV
      await this.env.SESSION_KV.put(
        sessionId, 
        JSON.stringify(sessionData),
        { expirationTtl: this.SESSION_TTL }
      );

      // Return session information to the client
      return new Response(JSON.stringify({
        sessionId,
        user: {
          uid: sessionData.userId,
          email: sessionData.email,
          displayName: sessionData.displayName
        },
        expiresAt: sessionData.expiresAt
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }

  /**
   * Handle registration requests
   * Creates a new user in Firebase and creates a session
   */
  private async handleRegister(request: Request): Promise<Response> {
    try {
      const requestData = await request.json() as { email: string; password: string; displayName?: string };
      const { email, password, displayName } = requestData;
      
      // Validate request body
      if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Call Firebase REST API to create user
      const firebaseResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.env.FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            displayName,
            returnSecureToken: true
          })
        }
      );

      const firebaseData = await firebaseResponse.json() as {
        localId: string;
        email: string;
        displayName?: string;
        idToken: string;
        refreshToken: string;
        expiresIn: string;
        error?: { message: string };
      };
      
      if (!firebaseResponse.ok) {
        return new Response(JSON.stringify({ error: firebaseData.error?.message || 'Registration failed' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Create a new session
      const sessionId = generateSessionId();
      const nowInSeconds = Math.floor(Date.now() / 1000);
      
      const sessionData: SessionData = {
        userId: firebaseData.localId,
        email: firebaseData.email,
        displayName: displayName || undefined,
        firebaseToken: firebaseData.idToken,
        refreshToken: firebaseData.refreshToken,
        createdAt: nowInSeconds,
        expiresAt: nowInSeconds + parseInt(firebaseData.expiresIn)
      };

      // Store session in KV
      await this.env.SESSION_KV.put(
        sessionId, 
        JSON.stringify(sessionData),
        { expirationTtl: this.SESSION_TTL }
      );

      // Return session information to the client
      return new Response(JSON.stringify({
        sessionId,
        user: {
          uid: sessionData.userId,
          email: sessionData.email,
          displayName: sessionData.displayName
        },
        expiresAt: sessionData.expiresAt
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return new Response(JSON.stringify({ error: 'Registration failed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }

  /**
   * Handle token refresh requests
   * Refreshes the Firebase token using the refresh token
   */
  private async handleTokenRefresh(request: Request): Promise<Response> {
    try {
      const requestData = await request.json() as { sessionId: string };
      const { sessionId } = requestData;
      
      if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Session ID is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Get session from KV
      const sessionString = await this.env.SESSION_KV.get(sessionId);
      if (!sessionString) {
        return new Response(JSON.stringify({ error: 'Session not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      const sessionData: SessionData = JSON.parse(sessionString);
      
      // Call Firebase API to refresh token
      const firebaseResponse = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${this.env.FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `grant_type=refresh_token&refresh_token=${sessionData.refreshToken}`
        }
      );

      const firebaseData = await firebaseResponse.json() as {
        id_token: string;
        refresh_token: string;
        expires_in: string;
        error?: { message: string };
      };
      
      if (!firebaseResponse.ok) {
        // If refresh fails, invalidate the session
        await this.env.SESSION_KV.delete(sessionId);
        
        return new Response(JSON.stringify({ error: 'Session expired' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Update session with new token info
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const updatedSessionData: SessionData = {
        ...sessionData,
        firebaseToken: firebaseData.id_token,
        refreshToken: firebaseData.refresh_token,
        expiresAt: nowInSeconds + parseInt(firebaseData.expires_in)
      };

      // Store updated session in KV
      await this.env.SESSION_KV.put(
        sessionId, 
        JSON.stringify(updatedSessionData),
        { expirationTtl: this.SESSION_TTL }
      );

      // Return updated token info to the client
      return new Response(JSON.stringify({
        sessionId,
        expiresAt: updatedSessionData.expiresAt
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      return new Response(JSON.stringify({ error: 'Token refresh failed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }

  /**
   * Handle logout requests
   * Invalidates the session in KV
   */
  private async handleLogout(request: Request): Promise<Response> {
    try {
      const requestData = await request.json() as { sessionId: string };
      const { sessionId } = requestData;
      
      if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Session ID is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Delete session from KV
      await this.env.SESSION_KV.delete(sessionId as string);
      
      // Also delete any associated Redux state
      await this.env.REDUX_STATE_KV.delete(sessionId as string);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
      return new Response(JSON.stringify({ error: 'Logout failed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }

  /**
   * Get current session data
   */
  private async getSession(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      const sessionId = url.searchParams.get('sessionId') || 
                        request.headers.get('X-Session-ID') || 
                        request.headers.get('Authorization')?.replace('Bearer ', '');
      
      if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Session ID is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      // Get session from KV
      const sessionString = await this.env.SESSION_KV.get(sessionId);
      if (!sessionString) {
        return new Response(JSON.stringify({ error: 'Session not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...createCorsHeaders()
          }
        });
      }

      const sessionData: SessionData = JSON.parse(sessionString);
      
      // Check if session is expired
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (sessionData.expiresAt < nowInSeconds) {
        // Session expired, try to refresh
        return this.handleTokenRefresh(new Request(request.url, {
          method: 'POST',
          headers: request.headers,
          body: JSON.stringify({ sessionId })
        }));
      }

      // Return session information to the client (excluding sensitive data)
      return new Response(JSON.stringify({
        sessionId,
        user: {
          uid: sessionData.userId,
          email: sessionData.email,
          displayName: sessionData.displayName
        },
        expiresAt: sessionData.expiresAt
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    } catch (error) {
      console.error('Get session error:', error);
      return new Response(JSON.stringify({ error: 'Failed to retrieve session' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...createCorsHeaders()
        }
      });
    }
  }
}
