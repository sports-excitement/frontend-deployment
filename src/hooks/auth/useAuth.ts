import { useAppDispatch, useAppSelector } from '@/lib/Redux/store';
import { 
  loginAction, 
  registerAction, 
  logoutAction, 
  resetPasswordRequestAction, 
  resetPasswordAction 
} from '@/lib/Redux/auth/authActions';
import { 
  IAuthHook, 
  IAuthClass, 
  LoginFormData, 
  RegisterFormData, 
  ResetPasswordData 
} from './IAuth';

/**
 * Auth class that implements the IAuthClass interface
 */
export class Auth implements IAuthClass {
  /**
   * Hook to use auth functionality
   */
  useAuth(): IAuthHook {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state.auth);

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

    const resetPassword = async (verificationCode: string, newPassword: string) => {
      const resetData: ResetPasswordData = {
        verificationCode,
        newPassword
      };
      return dispatch(resetPasswordAction(resetData));
    };

    return {
      // Auth state
      state,
      
      // Auth actions
      login,
      signup,
      logout,
      forgotPassword,
      resetPassword,
    };
  }
}

// Convenience static method to use the hook
export const useAuth = (): IAuthHook => {
  return new Auth().useAuth();
}
