import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import authReducer, { 
  login, 
  register, 
  logout,
  resetPasswordRequest,
  resetPassword,
  clearErrors
} from './authSlice';
import { supabase } from '@/lib/db/supabaseClient';

// Mock Supabase client
vi.mock('@/lib/db/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
      getSession: vi.fn()
    }
  }
}));

describe('Auth Slice', () => {
  // Setup test store
  const createTestStore = () => {
    return configureStore({
      reducer: {
        auth: authReducer
      }
    });
  };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('Reducers', () => {
    it('should handle initial state', () => {
      const store = createTestStore();
      expect(store.getState().auth).toEqual({
        idToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        sessionId: null
      });
    });

    it('should handle clearErrors', () => {
      const store = createTestStore();
      
      // Set an error first
      store.dispatch({ 
        type: login.rejected.type, 
        payload: 'Test error message' 
      });
      expect(store.getState().auth.error).toBe('Test error message');
      
      // Clear the error
      store.dispatch(clearErrors());
      expect(store.getState().auth.error).toBeNull();
    });
  });

  describe('Login', () => {
    it('should handle login.pending', () => {
      const store = createTestStore();
      store.dispatch({ type: login.pending.type });
      expect(store.getState().auth.loading).toBe(true);
      expect(store.getState().auth.error).toBeNull();
    });

    it('should handle login.fulfilled', () => {
      const store = createTestStore();
      const mockPayload = { 
        idToken: 'test-token', 
        refreshToken: 'test-refresh-token' 
      };
      
      store.dispatch({ 
        type: login.fulfilled.type, 
        payload: mockPayload 
      });
      
      expect(store.getState().auth.loading).toBe(false);
      expect(store.getState().auth.idToken).toBe('test-token');
      expect(store.getState().auth.refreshToken).toBe('test-refresh-token');
      expect(store.getState().auth.error).toBeNull();
    });

    it('should handle login.rejected', () => {
      const store = createTestStore();
      store.dispatch({ 
        type: login.rejected.type, 
        payload: 'Invalid credentials'
      });
      
      expect(store.getState().auth.loading).toBe(false);
      expect(store.getState().auth.error).toBe('Invalid credentials');
    });

    it('should call signInWithPassword on login action', async () => {
      const store = createTestStore();
      const credentials = { email: 'test@example.com', password: 'password123' };
      const mockResponse = {
        data: {
          session: {
            access_token: 'mock-access-token',
            refresh_token: 'mock-refresh-token'
          }
        },
        error: null
      };
      
      // Mock the Supabase response
      (supabase.auth.signInWithPassword as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
      
      await store.dispatch(login(credentials));
      
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: credentials.email,
        password: credentials.password
      });
    });
  });

  describe('Logout', () => {
    it('should handle logout.fulfilled', () => {
      const store = createTestStore();
      
      // Set some tokens first
      store.dispatch({ 
        type: login.fulfilled.type, 
        payload: { 
          idToken: 'test-token', 
          refreshToken: 'test-refresh-token' 
        }
      });
      
      // Then logout
      store.dispatch({ type: logout.fulfilled.type });
      
      expect(store.getState().auth.idToken).toBeNull();
      expect(store.getState().auth.refreshToken).toBeNull();
      expect(store.getState().auth.loading).toBe(false);
    });

    it('should call signOut on logout action', async () => {
      const store = createTestStore();
      const mockResponse = { error: null };
      
      // Mock the Supabase response
      (supabase.auth.signOut as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
      
      await store.dispatch(logout());
      
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  // Additional test cases for register, resetPasswordRequest, and resetPassword would follow
  // similar patterns but are omitted for brevity
}); 