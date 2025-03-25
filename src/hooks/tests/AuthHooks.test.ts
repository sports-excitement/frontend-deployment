import { useAuth } from '../AuthHooks';
import { 
  login, 
  logout, 
  register,
  resetPasswordRequest,
  resetPassword,
  clearErrors
} from '@/lib/Redux/auth/authSlice';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the useAppDispatch and useAppSelector hooks directly
vi.mock('@/lib/Redux/store', () => {
  return {
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn()
  };
});

// Import the mocked hooks
import { useAppDispatch, useAppSelector } from '@/lib/Redux/store';

// Mock Redux actions
vi.mock('@/lib/Redux/auth/authSlice', () => ({
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  resetPasswordRequest: vi.fn(),
  resetPassword: vi.fn(),
  clearErrors: vi.fn()
}));

// Get the mocked functions with proper typing
const mockedLogin = login as unknown as ReturnType<typeof vi.fn>;
const mockedRegister = register as unknown as ReturnType<typeof vi.fn>;
const mockedLogout = logout as unknown as ReturnType<typeof vi.fn>;
const mockedResetPasswordRequest = resetPasswordRequest as unknown as ReturnType<typeof vi.fn>;
const mockedResetPassword = resetPassword as unknown as ReturnType<typeof vi.fn>;
const mockedClearErrors = clearErrors as unknown as ReturnType<typeof vi.fn>;

// Mock hooks test utilities
// Note: We're not using @testing-library/react-hooks due to compatibility issues with React 19
// This is a simplified test approach using direct function calls
const mockRenderHook = (hook: any) => {
  const result = { current: hook() };
  return { 
    result,
    rerender: () => { result.current = hook(); }
  };
};

describe('AuthHooks', () => {
  const mockDispatch = vi.fn();
  const mockState = {
    idToken: 'mock-token',
    refreshToken: 'mock-refresh-token',
    loading: false,
    error: null,
    sessionId: null
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Set up mock dispatch
    (useAppDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);
    
    // Set up mock selector
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) => 
      selector({ auth: mockState })
    );
    
    // Setup action return values
    mockDispatch.mockResolvedValue({ type: 'mockAction' });
    
    // Setup redux action creators
    mockedLogin.mockReturnValue({ type: 'auth/login' });
    mockedRegister.mockReturnValue({ type: 'auth/register' });
    mockedLogout.mockReturnValue({ type: 'auth/logout' });
    mockedResetPasswordRequest.mockReturnValue({ type: 'auth/resetPasswordRequest' });
    mockedResetPassword.mockReturnValue({ type: 'auth/resetPassword' });
    mockedClearErrors.mockReturnValue({ type: 'auth/clearErrors' });
  });
  
  describe('useAuth', () => {
    it('should return the auth hook with state and methods', () => {
      const { result } = mockRenderHook(() => useAuth());
      
      expect(result.current.state).toEqual(mockState);
      expect(result.current.isAuthenticated).toBe(true);
      expect(typeof result.current.login).toBe('function');
      expect(typeof result.current.signup).toBe('function');
      expect(typeof result.current.logout).toBe('function');
      expect(typeof result.current.forgotPassword).toBe('function');
      expect(typeof result.current.resetPassword).toBe('function');
      expect(typeof result.current.clearErrors).toBe('function');
    });
    
    it('should dispatch login action when login is called', async () => {
      const { result } = mockRenderHook(() => useAuth());
      const credentials = { email: 'test@example.com', password: 'password123' };
      
      await result.current.login(credentials);
      
      expect(mockedLogin).toHaveBeenCalledWith(credentials);
      expect(mockDispatch).toHaveBeenCalled();
    });
    
    it('should dispatch logout action when logout is called', async () => {
      const { result } = mockRenderHook(() => useAuth());
      
      await result.current.logout();
      
      expect(mockedLogout).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalled();
    });
    
    it('should determine authentication status correctly', () => {
      const { result, rerender } = mockRenderHook(() => useAuth());
      
      // Initially authenticated
      expect(result.current.isAuthenticated).toBe(true);
      
      // Change state to unauthenticated
      (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) => 
        selector({ auth: { ...mockState, idToken: null, refreshToken: null } })
      );
      
      rerender();
      
      // Should now be unauthenticated
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
}); 