import {
  LoginFormData,
  RegisterFormData,
  FirebaseAuthResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  PasswordResetRequest,
  PasswordResetConfirmation,
  PasswordChangeRequest,
  EmailVerificationRequest,
  EmailVerificationConfirmation,
  AccountUnlockRequest,
  SecurityLog,
  ApiResponse
} from '@/lib/cloudflare/api/auth/types';

/**
 * Authentication Service for Firebase Auth through Cloudflare Workers
 * Handles all authentication-related API calls
 */
export class AuthService {
  private baseUrl: string;
  
  constructor() {
    // This will be proxied through Cloudflare workers
    this.baseUrl = '/api/auth';
  }

  /**
   * Common method to handle API requests
   */
  private async request<T>(endpoint: string, method: string, data?: any): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    
    // Get the response as JSON
    let responseData: T;
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      if (!response.ok) {
        const errorBody: any = await response.json();
        throw new Error(errorBody.error.message || 'Request failed');
      }
      const responseData: T = await response.json();
      return responseData;
    } catch (error: any) {
      throw new Error(error.message || 'Request failed');
    }
    
    // If response is not ok, throw an error
    // if (!response.ok) {
    //   throw new Error(responseData.error || 'Request failed');
    // }
    
    // return responseData;
  }

  /**
   * User Registration
   */
  public async signup(userData: RegisterFormData): Promise<FirebaseAuthResponse> {
    return this.request<FirebaseAuthResponse>('/signup', 'POST', userData);
  }

  /**
   * User Login
   */
  public async login(credentials: LoginFormData): Promise<FirebaseAuthResponse> {
    return this.request<FirebaseAuthResponse>('/login', 'POST', credentials);
  }

  /**
   * User Logout
   */
  public async logout(): Promise<void> {
    await this.request<void>('/logout', 'POST');
  }

  /**
   * Google OAuth Login
   */
  public async googleOAuth(): Promise<FirebaseAuthResponse> {
    return this.request<FirebaseAuthResponse>('/oauth/google', 'POST');
  }

  /**
   * Apple OAuth Login
   */
  public async appleOAuth(): Promise<FirebaseAuthResponse> {
    return this.request<FirebaseAuthResponse>('/oauth/apple', 'POST');
  }

  /**
   * Refresh Auth Token
   */
  public async refreshToken(data: TokenRefreshRequest): Promise<TokenRefreshResponse> {
    return this.request<TokenRefreshResponse>('/token/refresh', 'POST', data);
  }

  /**
   * Revoke Auth Token
   */
  public async revokeToken(): Promise<void> {
    await this.request<void>('/token/revoke', 'POST');
  }

  /**
   * Request Password Reset Email
   */
  public async resetPasswordRequest(data: PasswordResetRequest): Promise<void> {
    await this.request<void>('/password/reset-request', 'POST', data);
  }

  /**
   * Reset Password with Token
   */
  public async resetPassword(data: PasswordResetConfirmation): Promise<void> {
    await this.request<void>('/password/reset', 'POST', data);
  }

  /**
   * Change Password (for authenticated users)
   */
  public async changePassword(data: PasswordChangeRequest): Promise<void> {
    await this.request<void>('/password/change', 'POST', data);
  }

  /**
   * Request Email Verification
   */
  public async verifyEmailRequest(data: EmailVerificationRequest): Promise<void> {
    await this.request<void>('/email/verify-request', 'POST', data);
  }

  /**
   * Verify Email with Code
   */
  public async verifyEmail(data: EmailVerificationConfirmation): Promise<void> {
    await this.request<void>('/email/verify', 'POST', data);
  }

  /**
   * Get Security Logs
   */
  public async getSecurityLogs(): Promise<SecurityLog[]> {
    return this.request<SecurityLog[]>('/security-logs', 'GET');
  }

  /**
   * Lock Account
   */
  public async lockAccount(): Promise<void> {
    await this.request<void>('/account/lock', 'POST');
  }

  /**
   * Unlock Account
   */
  public async unlockAccount(data: AccountUnlockRequest): Promise<void> {
    await this.request<void>('/account/unlock', 'POST', data);
  }
}
