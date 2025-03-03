import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export interface FirebaseAuthResponse {
  token: string;
  user: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  displayName?: string;
  fullName: string;
}

export interface LoginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface RegisterResponse extends LoginResponse {
  registered: true;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  loginWithGoogle: () => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface ErrorResponse {
  message?: string;
}

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return typeof obj === 'object' && obj !== null && ('message' in obj || Object.keys(obj).length === 0);
}

export function isLoginResponse(obj: unknown): obj is LoginResponse {
  return typeof obj === 'object' && obj !== null &&
    'idToken' in obj && typeof obj.idToken === 'string' &&
    'email' in obj && typeof obj.email === 'string' &&
    'refreshToken' in obj && typeof obj.refreshToken === 'string' &&
    'expiresIn' in obj && typeof obj.expiresIn === 'string' &&
    'localId' in obj && typeof obj.localId === 'string';
}
