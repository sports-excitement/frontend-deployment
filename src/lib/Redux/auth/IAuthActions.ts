import { AsyncThunk } from '@reduxjs/toolkit';
import { LoginFormData, RegisterFormData, ResetPasswordData, AuthState } from '@/hooks/auth/IAuth';

/**
 * Interface for Auth Redux Actions
 */
export interface IAuthActions {
  loginAction: AsyncThunk<any, LoginFormData, {}>;
  registerAction: AsyncThunk<any, RegisterFormData, {}>;
  logoutAction: AsyncThunk<any, void, {}>;
  resetPasswordRequestAction: AsyncThunk<any, string, {}>;
  resetPasswordAction: AsyncThunk<any, ResetPasswordData, {}>;
} 