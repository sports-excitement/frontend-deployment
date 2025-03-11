import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ReduxStateService } from '@/lib/cloudflare/services/stateService';
import { server } from '@/tests/setup';
import { http, HttpResponse } from 'msw';

describe('ReduxStateService', () => {
  let stateService: ReduxStateService;
  const sessionId = 'test-session-id';
  const testState = {
    auth: {
      idToken: 'mock-id-token',
      refreshToken: 'mock-refresh-token',
      loading: false,
      error: null,
      sessionId: 'test-session-id'
    },
    user: {
      profile: {
        name: 'Test User',
        email: 'test@example.com'
      }
    }
  };

  beforeEach(() => {
    // Reset all mocks
    vi.resetAllMocks();
    
    // Create a new instance of ReduxStateService
    stateService = new ReduxStateService();
    
    // Set up MSW handlers for state endpoint
    server.use(
      // GET state endpoint
      http.get('/api/state', () => {
        // For simplicity in tests, we'll assume session ID is always valid
        return HttpResponse.json({
          state: testState
        }, { status: 200 });
      }),
      
      // POST state endpoint
      http.post('/api/state', async ({ request }) => {
        try {
          // Ensure request body contains state
          const body = await request.json() as { state?: unknown };
          if (!body || !body.state) {
            return HttpResponse.json({
              error: 'State is required'
            }, { status: 400 });
          }
          
          return HttpResponse.json({}, { status: 200 });
        } catch (error) {
          return HttpResponse.json({
            error: 'Invalid JSON'
          }, { status: 400 });
        }
      })
    );
  });

  describe('getState', () => {
    test('should successfully fetch state', async () => {
      // Call getState method
      const response = await stateService.getState(sessionId);
      
      // Validate response
      expect(response.success).toBe(true);
      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual(testState);
    });
    
    test('should handle error when fetching state', async () => {
      // Override server handler to return an error
      server.use(
        http.get('/api/state', () => {
          return HttpResponse.json({
            error: 'Failed to retrieve state'
          }, { status: 500 });
        })
      );
      
      // Call getState method
      const response = await stateService.getState(sessionId);
      
      // Validate response
      expect(response.success).toBe(false);
      expect(response.statusCode).toBe(500);
      expect(response.error).toBe('Failed to retrieve state');
    });
    
    test('should handle missing session ID', async () => {
      // Override server handler to return an error for missing session ID
      server.use(
        http.get('/api/state', () => {
          return HttpResponse.json({
            error: 'Missing session ID'
          }, { status: 401 });
        })
      );
      
      // Call getState method with empty session ID
      const response = await stateService.getState('');
      
      // Validate response
      expect(response.success).toBe(false);
      expect(response.statusCode).toBe(401);
      expect(response.error).toBe('Missing session ID');
    });
  });
  
  describe('updateState', () => {
    test('should successfully update state', async () => {
      // Call updateState method
      const response = await stateService.updateState(sessionId, testState);
      
      // Validate response
      expect(response.success).toBe(true);
      expect(response.statusCode).toBe(200);
    });
    
    test('should handle error when updating state', async () => {
      // Override server handler to return an error
      server.use(
        http.post('/api/state', () => {
          return HttpResponse.json({
            error: 'Failed to update state'
          }, { status: 500 });
        })
      );
      
      // Call updateState method
      const response = await stateService.updateState(sessionId, testState);
      
      // Validate response
      expect(response.success).toBe(false);
      expect(response.statusCode).toBe(500);
      expect(response.error).toBe('Failed to update state');
    });
    
    test('should handle network errors', async () => {
      // Override server handler to simulate network error
      server.use(
        http.post('/api/state', () => {
          return HttpResponse.error();
        })
      );
      
      // Call updateState method
      const response = await stateService.updateState(sessionId, testState);
      
      // Validate response
      expect(response.success).toBe(false);
      expect(response.statusCode).toBe(500);
      expect(response.error).toContain('Error');
    });
  });
});
