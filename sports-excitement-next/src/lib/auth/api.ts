import { FirebaseError } from 'firebase/app';
import { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from './types';

interface ErrorResponse {
  message?: string;
}

function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return typeof obj === 'object' && obj !== null && ('message' in obj || Object.keys(obj).length === 0);
}

function isLoginResponse(obj: unknown): obj is LoginResponse {
  return typeof obj === 'object' && obj !== null &&
    'idToken' in obj && typeof obj.idToken === 'string' &&
    'email' in obj && typeof obj.email === 'string' &&
    'refreshToken' in obj && typeof obj.refreshToken === 'string' &&
    'expiresIn' in obj && typeof obj.expiresIn === 'string' &&
    'localId' in obj && typeof obj.localId === 'string';
}

async function handleAuthResponse(response: Response): Promise<LoginResponse> {
  if (!response.ok) {
    const errorData = await response.json();
    const message = isErrorResponse(errorData) ? errorData.message : 'Authentication failed';
    throw new FirebaseError('auth/invalid-credentials', message || 'Authentication failed');
  }
  return response.json();
}

export async function signInWithEmailPassword(
  email: string, 
  password: string, 
  apiKey: string
): Promise<LoginResponse> {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  );

  const data = await handleAuthResponse(response);
  
  return {
    idToken: data.idToken,
    email: data.email,
    refreshToken: data.refreshToken,
    expiresIn: data.expiresIn,
    localId: data.localId,
    registered: data.registered ?? true
  };
}

export async function loginWithEmailPassword(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const message = isErrorResponse(errorData) ? errorData.message : 'Login failed';
      throw new FirebaseError('auth/invalid-credentials', message || 'Login failed');
    }

    const data = await response.json();
    if (!isLoginResponse(data)) {
      throw new FirebaseError('auth/invalid-response', 'Invalid response format from server');
    }

    return {
      idToken: data.idToken,
      email: data.email,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      localId: data.localId,
      registered: data.registered ?? true
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new FirebaseError('auth/unknown', error.message);
    }
    throw new FirebaseError('auth/unknown', 'An unknown error occurred');
  }
}

export async function registerWithEmailPassword(data: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const message = isErrorResponse(errorData) ? errorData.message : 'Registration failed';
      throw new FirebaseError('auth/invalid-request', message || 'Registration failed');
    }

    const responseData = await response.json();
    if (!isLoginResponse(responseData)) {
      throw new FirebaseError('auth/invalid-response', 'Invalid response format from server');
    }

    return {
      idToken: responseData.idToken,
      email: responseData.email,
      refreshToken: responseData.refreshToken,
      expiresIn: responseData.expiresIn,
      localId: responseData.localId,
      registered: true
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new FirebaseError('auth/unknown', error.message);
    }
    throw new FirebaseError('auth/unknown', 'An unknown error occurred');
  }
}

export async function validateFirebaseToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: token }),
    });

    return response.ok;
  } catch (error) {
    console.error('Token validation error:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}
