import { useAppDispatch, useAppSelector } from '@/lib/Redux/store';
import {
  login,
  register,
  logout,
  resetPasswordRequest,
  resetPassword,
  clearErrors
} from '@/lib/Redux/auth/authSlice';

/**
 * Authentication form data interfaces
 */
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  verificationCode: string;
  newPassword: string;
}

/**
 * Auth state interface
 */
export interface AuthState {
  idToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  sessionId: string | null;
}

/**
 * Auth hook interface that provides auth functionality
 */
export interface IAuthHook {
  // State
  state: AuthState;
  isAuthenticated: boolean;
  
  // Actions
  login: (data: LoginFormData) => Promise<any>;
  signup: (data: RegisterFormData) => Promise<any>;
  logout: () => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (verificationCode: string, newPassword: string) => Promise<any>;
  clearErrors: () => void;
}

/**
 * Hook that provides authentication functionality
 * This is a custom hook for functional components
 * @returns Auth hook with state and methods
 */
export const useAuth = (): IAuthHook => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.auth);

  /**
   * Login with email and password
   * @param data Login credentials
   * @returns Promise with the action result
   */
  const handleLogin = async (data: LoginFormData) => {
    return dispatch(login(data));
  };

  /**
   * Register a new user
   * @param data Registration data
   * @returns Promise with the action result
   */
  const handleSignup = async (data: RegisterFormData) => {
    return dispatch(register(data));
  };

  /**
   * Logout the current user
   * @returns Promise with the action result
   */
  const handleLogout = async () => {
    return dispatch(logout());
  };

  /**
   * Request password reset email
   * @param email User's email address
   * @returns Promise with the action result
   */
  const handleForgotPassword = async (email: string) => {
    return dispatch(resetPasswordRequest(email));
  };

  /**
   * Complete password reset process
   * @param verificationCode Code from the reset email
   * @param newPassword New password to set
   * @returns Promise with the action result
   */
  const handleResetPassword = async (verificationCode: string, newPassword: string) => {
    const resetData: ResetPasswordData = {
      verificationCode,
      newPassword
    };
    return dispatch(resetPassword(resetData));
  };

  /**
   * Clear any auth errors
   */
  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  /**
   * Determine if user is authenticated
   */
  const isAuthenticated = state.idToken !== null && state.refreshToken !== null;

  return {
    // State
    state,
    isAuthenticated,
    
    // Actions
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    clearErrors: handleClearErrors
  };
}; 