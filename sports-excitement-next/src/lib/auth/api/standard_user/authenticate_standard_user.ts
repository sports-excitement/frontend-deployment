import { FirebaseError } from 'firebase/app';
import { LoginRequest, LoginResponse, isErrorResponse, isLoginResponse } from '../types';
import { handleAuthResponse } from './shared';

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
