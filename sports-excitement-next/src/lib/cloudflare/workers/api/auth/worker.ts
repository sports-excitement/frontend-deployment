import { 
  LoginFormData, 
  RegisterFormData, 
  FirebaseAuthResponse, 
  TokenRefreshRequest, 
  PasswordResetRequest, 
  PasswordResetConfirmation,
  PasswordChangeRequest,
  EmailVerificationRequest,
  EmailVerificationConfirmation,
  AccountUnlockRequest,
  ApiResponse,
  CloudflareEnv
} from '@/lib/cloudflare/api/auth/types';

/**
 * Firebase Authentication API Client
 * Handles communication with Firebase Auth REST API
 */
export class FirebaseAuthClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async sendRequest<T>(endpoint: string, method: string, data?: any): Promise<T> {
    const url = `https://identitytoolkit.googleapis.com/v1/${endpoint}?key=${this.apiKey}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error?.message || 'Firebase Auth request failed');
    }
    
    return responseData as T;
  }

  /**
   * Sign up a new user with email and password
   */
  async signUp(email: string, password: string): Promise<FirebaseAuthResponse> {
    return this.sendRequest<FirebaseAuthResponse>('accounts:signUp', 'POST', {
      email,
      password,
      returnSecureToken: true
    });
  }

  /**
   * Sign in an existing user with email and password
   */
  async signIn(email: string, password: string): Promise<FirebaseAuthResponse> {
    return this.sendRequest<FirebaseAuthResponse>('accounts:signInWithPassword', 'POST', {
      email,
      password,
      returnSecureToken: true
    });
  }

  /**
   * Refresh an ID token
   */
  async refreshToken(refreshToken: string): Promise<any> {
    const url = `https://securetoken.googleapis.com/v1/token?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    
    const data: any = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Token refresh failed');
    }
    
    return {
      idToken: data.id_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    await this.sendRequest<void>('accounts:sendOobCode', 'POST', {
      requestType: 'PASSWORD_RESET',
      email,
    });
  }

  /**
   * Confirm password reset with code
   */
  async confirmPasswordReset(oobCode: string, newPassword: string): Promise<void> {
    await this.sendRequest<void>('accounts:resetPassword', 'POST', {
      oobCode,
      newPassword,
    });
  }

  /**
   * Change password (requires ID token)
   */
  async changePassword(idToken: string, password: string): Promise<void> {
    await this.sendRequest<void>('accounts:update', 'POST', {
      idToken,
      password,
      returnSecureToken: true,
    });
  }

  /**
   * Send email verification
   */
  async sendEmailVerification(idToken: string): Promise<void> {
    await this.sendRequest<void>('accounts:sendOobCode', 'POST', {
      requestType: 'VERIFY_EMAIL',
      idToken,
    });
  }

  /**
   * Confirm email verification
   */
  async confirmEmailVerification(oobCode: string): Promise<void> {
    await this.sendRequest<void>('accounts:update', 'POST', {
      oobCode,
    });
  }

  /**
   * Get user data by token
   */
  async getUserData(idToken: string): Promise<any> {
    return this.sendRequest<any>('accounts:lookup', 'POST', {
      idToken,
    });
  }
}

/**
 * Base Request Handler for Cloudflare API
 */
abstract class BaseRequestHandler {
  protected env: CloudflareEnv;
  protected firebaseClient: FirebaseAuthClient;

  constructor(env: CloudflareEnv) {
    this.env = env;
    this.firebaseClient = new FirebaseAuthClient(env.FIREBASE_API_KEY);
  }

  /**
   * Create a successful response
   */
  protected createSuccessResponse<T>(data: T, statusCode = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      statusCode
    };

    return new Response(JSON.stringify(response), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create an error response
   */
  protected createErrorResponse(error: string, statusCode = 400): Response {
    const response: ApiResponse = {
      success: false,
      error,
      statusCode
    };

    return new Response(JSON.stringify(response), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Parse the request body as JSON
   */
  protected async parseRequestBody<T>(request: Request): Promise<T> {
    try {
      return await request.json() as T;
    } catch (error) {
      throw new Error('Invalid JSON in request body');
    }
  }

  /**
   * Extract token from Authorization header
   */
  protected extractToken(request: Request): string | null {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Verify the Firebase ID token
   */
  protected async verifyIdToken(token: string): Promise<any> {
    try {
      const userData = await this.firebaseClient.getUserData(token);
      return userData.users[0];
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Handle the request
   */
  abstract handle(request: Request): Promise<Response>;
}

/**
 * Auth Request Handler for signup
 */
export class SignupHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const { email, password } = await this.parseRequestBody<RegisterFormData>(request);
      
      if (!email || !password) {
        return this.createErrorResponse('Email and password are required', 400);
      }

      const authData = await this.firebaseClient.signUp(email, password);
      
      return this.createSuccessResponse(authData, 201);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 400);
    }
  }
}

/**
 * Auth Request Handler for login
 */
export class LoginHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const { email, password } = await this.parseRequestBody<LoginFormData>(request);
      
      if (!email || !password) {
        return this.createErrorResponse('Email and password are required', 400);
      }

      const authData = await this.firebaseClient.signIn(email, password);
      
      return this.createSuccessResponse(authData, 200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 401);
    }
  }
}

/**
 * Auth Request Handler for token refresh
 */
export class TokenRefreshHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const { refreshToken } = await this.parseRequestBody<TokenRefreshRequest>(request);
      
      if (!refreshToken) {
        return this.createErrorResponse('Refresh token is required', 400);
      }

      const tokenData = await this.firebaseClient.refreshToken(refreshToken);
      
      return this.createSuccessResponse(tokenData, 200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 401);
    }
  }
}

/**
 * Auth Request Handler for password reset request
 */
export class PasswordResetRequestHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const { email } = await this.parseRequestBody<PasswordResetRequest>(request);
      
      if (!email) {
        return this.createErrorResponse('Email is required', 400);
      }

      await this.firebaseClient.sendPasswordResetEmail(email);
      
      return this.createSuccessResponse({ message: 'Password reset email sent' }, 200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 400);
    }
  }
}

/**
 * Auth Request Handler for password reset with token
 */
export class PasswordResetHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const { token, newPassword } = await this.parseRequestBody<PasswordResetConfirmation>(request);
      
      if (!token || !newPassword) {
        return this.createErrorResponse('Token and new password are required', 400);
      }

      await this.firebaseClient.confirmPasswordReset(token, newPassword);
      
      return this.createSuccessResponse({ message: 'Password reset successfully' }, 200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 400);
    }
  }
}

/**
 * Auth Request Handler for password change
 */
export class PasswordChangeHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const token = this.extractToken(request);
      if (!token) {
        return this.createErrorResponse('Authentication required', 401);
      }

      const { newPassword } = await this.parseRequestBody<PasswordChangeRequest>(request);
      
      if (!newPassword) {
        return this.createErrorResponse('New password is required', 400);
      }

      await this.firebaseClient.changePassword(token, newPassword);
      
      return this.createSuccessResponse({ message: 'Password changed successfully' }, 200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 401);
    }
  }
}

/**
 * Auth Request Handler for email verification request
 */
export class EmailVerificationRequestHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const token = this.extractToken(request);
      if (!token) {
        return this.createErrorResponse('Authentication required', 401);
      }

      await this.firebaseClient.sendEmailVerification(token);
      
      return this.createSuccessResponse({ message: 'Verification email sent' }, 200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 400);
    }
  }
}

/**
 * Auth Request Handler for email verification
 */
export class EmailVerificationHandler extends BaseRequestHandler {
  async handle(request: Request): Promise<Response> {
    try {
      if (request.method !== 'POST') {
        return this.createErrorResponse('Method not allowed', 405);
      }

      const { verificationCode } = await this.parseRequestBody<EmailVerificationConfirmation>(request);
      
      if (!verificationCode) {
        return this.createErrorResponse('Verification code is required', 400);
      }

      await this.firebaseClient.confirmEmailVerification(verificationCode);
      
      return this.createSuccessResponse({ message: 'Email verified successfully' }, 200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return this.createErrorResponse(errorMessage, 400);
    }
  }
}

/**
 * Auth Request Router to handle routing to the correct handler
 */
export class AuthRouter {
  private env: CloudflareEnv;
  private routes: Map<string, BaseRequestHandler>;

  constructor(env: CloudflareEnv) {
    this.env = env;
    this.routes = new Map();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Authentication endpoints
    this.routes.set('/auth/signup', new SignupHandler(this.env));
    this.routes.set('/auth/login', new LoginHandler(this.env));
    
    // Token management
    this.routes.set('/auth/token/refresh', new TokenRefreshHandler(this.env));
    
    // Password management
    this.routes.set('/auth/password/reset-request', new PasswordResetRequestHandler(this.env));
    this.routes.set('/auth/password/reset', new PasswordResetHandler(this.env));
    this.routes.set('/auth/password/change', new PasswordChangeHandler(this.env));
    
    // Email verification
    this.routes.set('/auth/email/verify-request', new EmailVerificationRequestHandler(this.env));
    this.routes.set('/auth/email/verify', new EmailVerificationHandler(this.env));
    
    // Add other route handlers as needed
  }

  /**
   * Handle CORS preflight requests
   */
  private handleCorsPreflightRequest(): Response {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  /**
   * Add CORS headers to the response
   */
  private addCorsHeaders(response: Response): Response {
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  /**
   * Route the request to the appropriate handler
   */
  async route(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return this.handleCorsPreflightRequest();
    }

    // Find the handler for the route
    const handler = this.routes.get(path);
    
    if (!handler) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Route not found',
        statusCode: 404
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    try {
      // Handle the request
      const response = await handler.handle(request);
      
      // Add CORS headers to the response
      return this.addCorsHeaders(response);
    } catch (error) {
      // Handle unexpected errors
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorResponse = new Response(JSON.stringify({ 
        success: false, 
        error: errorMessage,
        statusCode: 500
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return this.addCorsHeaders(errorResponse);
    }
  }
}

/**
 * Main fetch handler for the Cloudflare Worker
 */
export async function handleRequest(request: Request, env: CloudflareEnv): Promise<Response> {
  const router = new AuthRouter(env);
  return router.route(request);
}
