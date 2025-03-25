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
  state: AuthState;
  login: (data: LoginFormData) => Promise<any>;
  signup: (data: RegisterFormData) => Promise<any>;
  logout: () => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (verificationCode: string, newPassword: string) => Promise<any>;
}

/**
 * Auth service interface
 */
export interface IAuthClass {
  useAuth: () => IAuthHook;
} 