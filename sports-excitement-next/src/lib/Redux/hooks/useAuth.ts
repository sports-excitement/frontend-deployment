import { AuthService } from '@/lib/cloudflare/api/auth/service';
import { LoginFormData, RegisterFormData } from '@/lib/cloudflare/api/auth/types';
import { useAppDispatch, useAppSelector } from '@/lib/Redux/store';
import { 
  loginAction, 
  registerAction, 
  logoutAction, 
  resetPasswordRequestAction, 
  resetPasswordAction 
} from '@/lib/Redux/slices/authSlice';

/**
 * Custom hook for authentication
 * Provides easy access to auth state and actions
 */
export interface AuthHook {
  state: any;
  login: (data: LoginFormData) => Promise<any>;
  signup: (data: RegisterFormData) => Promise<any>;
  logout: () => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  verifyPassword: (verificationCode: string) => Promise<any>;
}

export class Auth {
  /**
   * Hook to use auth functionality
   */
  static useAuth(): AuthHook {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state.auth);
    const authService = new AuthService();

    const login = async (data: LoginFormData) => {
      return dispatch(loginAction(data));
    };

    const signup = async (data: RegisterFormData) => {
      return dispatch(registerAction(data));
    };

    const logout = async () => {
      return dispatch(logoutAction());
    };

    const forgotPassword = async (email: string) => {
      return dispatch(resetPasswordRequestAction(email));
    };

    const verifyPassword = async (verificationCode: string) => {
      return dispatch(resetPasswordAction({ verificationCode }));
    };

    return {
      // Auth state
      state,
      
      // Auth actions
      login,
      signup,
      logout,
      forgotPassword,
      verifyPassword,
    };
  }
}
