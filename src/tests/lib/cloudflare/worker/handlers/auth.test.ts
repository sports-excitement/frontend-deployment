import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AuthHandler } from '@/lib/cloudflare/worker/handlers/auth';
import { MockKV, server } from '@/tests/setup';
import { http, HttpResponse } from 'msw';

// Mock Firebase Auth API responses
const mockLoginSuccess = {
  idToken: 'mock-id-token',
  refreshToken: 'mock-refresh-token',
  expiresIn: '3600',
  localId: 'mock-user-id',
  email: 'test@example.com',
  registered: true
};

const mockRegisterSuccess = {
  idToken: 'mock-id-token',
  refreshToken: 'mock-refresh-token',
  expiresIn: '3600',
  localId: 'mock-user-id',
  email: 'test@example.com'
};

const mockRefreshSuccess = {
  id_token: 'new-mock-id-token',
  refresh_token: 'new-mock-refresh-token',
  expires_in: '3600'
};

const mockAuthError = {
  error: {
    code: 400,
    message: 'INVALID_PASSWORD',
    errors: [
      {
        message: 'INVALID_PASSWORD',
        domain: 'global',
        reason: 'invalid'
      }
    ]
  }
};

// Mock environment with KV namespace
const mockEnv = {
  FIREBASE_API_KEY: 'test-api-key',
  SESSION_KV: new MockKV(),
  REDUX_STATE_KV: new MockKV()
};

describe('AuthHandler', () => {
  let authHandler: AuthHandler;
  
  beforeEach(() => {
    // Reset all mocks
    vi.resetAllMocks();
    
    // Create a new instance of AuthHandler with mock environment
    authHandler = new AuthHandler(mockEnv as any);
    
    // Set up MSW handlers for Firebase Auth API
    server.use(
      // Login endpoint
      http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', async () => {
        return HttpResponse.json(mockLoginSuccess);
      }),
      
      // Register endpoint
      http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp', async () => {
        return HttpResponse.json(mockRegisterSuccess);
      }),
      
      // Token refresh endpoint
      http.post('https://securetoken.googleapis.com/v1/token', async () => {
        return HttpResponse.json(mockRefreshSuccess);
      })
    );
  });

  describe('handleLogin', () => {
    test('should successfully log in a user with valid credentials', async () => {
      // Create request object with login credentials
      const request = new Request('https://example.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
      
      // Call the login handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { sessionId: string; expiresAt: number };
      
      // Validate response
      expect(response.status).toBe(200);
      expect(responseData).toHaveProperty('sessionId');
      expect(responseData).toHaveProperty('expiresAt');
    });
    
    test('should return an error with invalid credentials', async () => {
      // Override the Firebase Auth API to return an error
      server.use(
        http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', async () => {
          return HttpResponse.json(mockAuthError, { status: 400 });
        })
      );
      
      // Create request object with invalid credentials
      const request = new Request('https://example.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'wrong-password'
        })
      });
      
      // Call the login handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { error: string };
      
      // Validate response
      expect(response.status).toBe(401);
      expect(responseData).toHaveProperty('error');
    });
  });
  
  describe('handleRegister', () => {
    test('should successfully register a new user', async () => {
      // Create request object with registration data
      const request = new Request('https://example.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'newuser@example.com',
          password: 'password123',
          displayName: 'New User'
        })
      });
      
      // Call the register handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { sessionId: string; expiresAt: number };
      
      // Validate response
      expect(response.status).toBe(201);
      expect(responseData).toHaveProperty('sessionId');
      expect(responseData).toHaveProperty('expiresAt');
    });
    
    test('should return an error if registration fails', async () => {
      // Override the Firebase Auth API to return an error
      server.use(
        http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp', async () => {
          return HttpResponse.json({
            error: {
              code: 400,
              message: 'EMAIL_EXISTS',
              errors: [
                {
                  message: 'EMAIL_EXISTS',
                  domain: 'global',
                  reason: 'invalid'
                }
              ]
            }
          }, { status: 400 });
        })
      );
      
      // Create request object with registration data
      const request = new Request('https://example.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'existing@example.com',
          password: 'password123',
          displayName: 'Existing User'
        })
      });
      
      // Call the register handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { error: string };
      
      // Validate response
      expect(response.status).toBe(400);
      expect(responseData).toHaveProperty('error');
    });
  });
  
  describe('handleTokenRefresh', () => {
    test('should successfully refresh a token', async () => {
      // Set up a session in the mock KV store
      const sessionId = 'test-session-id';
      const sessionData = {
        userId: 'mock-user-id',
        email: 'test@example.com',
        displayName: 'Test User',
        firebaseToken: 'old-token',
        refreshToken: 'old-refresh-token',
        createdAt: Math.floor(Date.now() / 1000) - 3600,
        expiresAt: Math.floor(Date.now() / 1000) + 3600
      };
      
      await mockEnv.SESSION_KV.put(sessionId, JSON.stringify(sessionData));
      
      // Create request object for token refresh
      const request = new Request('https://example.com/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId
        })
      });
      
      // Call the token refresh handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { sessionId: string; expiresAt: number };
      
      // Validate response
      expect(response.status).toBe(200);
      expect(responseData).toHaveProperty('sessionId');
      expect(responseData).toHaveProperty('expiresAt');
      
      // Verify that the session was updated in KV
      const updatedSessionString = await mockEnv.SESSION_KV.get(sessionId);
      const updatedSession = JSON.parse(updatedSessionString as string);
      
      expect(updatedSession.firebaseToken).toBe('new-mock-id-token');
      expect(updatedSession.refreshToken).toBe('new-mock-refresh-token');
    });
    
    test('should return an error if refresh token is invalid', async () => {
      // Override the Firebase Auth API to return an error
      server.use(
        http.post('https://securetoken.googleapis.com/v1/token', async () => {
          return HttpResponse.json({
            error: {
              code: 400,
              message: 'INVALID_REFRESH_TOKEN'
            }
          }, { status: 400 });
        })
      );
      
      // Set up a session in the mock KV store
      const sessionId = 'test-session-invalid';
      const sessionData = {
        userId: 'mock-user-id',
        email: 'test@example.com',
        displayName: 'Test User',
        firebaseToken: 'old-token',
        refreshToken: 'invalid-refresh-token',
        createdAt: Math.floor(Date.now() / 1000) - 3600,
        expiresAt: Math.floor(Date.now() / 1000) + 3600
      };
      
      await mockEnv.SESSION_KV.put(sessionId, JSON.stringify(sessionData));
      
      // Create request object for token refresh
      const request = new Request('https://example.com/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId
        })
      });
      
      // Call the token refresh handler
      const response = await authHandler.handleRequest(request);
      
      // Validate response
      expect(response.status).toBe(401);
      
      // Verify that the session was deleted from KV
      const deletedSession = await mockEnv.SESSION_KV.get(sessionId);
      expect(deletedSession).toBeNull();
    });
  });
  
  describe('handleLogout', () => {
    test('should successfully log out a user', async () => {
      // Set up a session in the mock KV store
      const sessionId = 'test-logout-session';
      const sessionData = {
        userId: 'mock-user-id',
        email: 'test@example.com',
        displayName: 'Test User',
        firebaseToken: 'token',
        refreshToken: 'refresh-token',
        createdAt: Math.floor(Date.now() / 1000) - 3600,
        expiresAt: Math.floor(Date.now() / 1000) + 3600
      };
      
      // Also add some state data
      await mockEnv.SESSION_KV.put(sessionId, JSON.stringify(sessionData));
      await mockEnv.REDUX_STATE_KV.put(sessionId, JSON.stringify({ some: 'state' }));
      
      // Create request object for logout
      const request = new Request('https://example.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId
        })
      });
      
      // Call the logout handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { success: boolean };
      
      // Validate response
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      
      // Verify that the session and state were deleted from KV
      const deletedSession = await mockEnv.SESSION_KV.get(sessionId);
      const deletedState = await mockEnv.REDUX_STATE_KV.get(sessionId);
      
      expect(deletedSession).toBeNull();
      expect(deletedState).toBeNull();
    });
  });
  
  describe('handleValidateSession', () => {
    test('should return success for a valid session', async () => {
      // Set up a session in the mock KV store
      const sessionId = 'test-validate-session';
      const sessionData = {
        userId: 'mock-user-id',
        email: 'test@example.com',
        displayName: 'Test User',
        firebaseToken: 'token',
        refreshToken: 'refresh-token',
        createdAt: Math.floor(Date.now() / 1000) - 3600,
        expiresAt: Math.floor(Date.now() / 1000) + 3600
      };
      
      await mockEnv.SESSION_KV.put(sessionId, JSON.stringify(sessionData));
      
      // Create request object for session validation
      const request = new Request('https://example.com/api/auth/validate?sessionId=' + sessionId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Call the validate session handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { valid: boolean; sessionId: string };
      
      // Validate response
      expect(response.status).toBe(200);
      expect(responseData.valid).toBe(true);
      expect(responseData).toHaveProperty('sessionId');
    });
    
    test('should return error for an invalid or expired session', async () => {
      // Request with non-existent session ID
      const request = new Request('https://example.com/api/auth/validate?sessionId=non-existent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Call the validate session handler
      const response = await authHandler.handleRequest(request);
      const responseData = await response.json() as { error: string; valid: boolean };
      
      // Validate response
      expect(response.status).toBe(401);
      expect(responseData).toHaveProperty('error');
      expect(responseData.valid).toBe(false);
    });
  });
});
