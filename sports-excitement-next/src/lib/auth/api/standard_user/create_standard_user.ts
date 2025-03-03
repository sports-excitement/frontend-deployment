import { FirebaseError } from 'firebase/app';
import { RegisterRequest, RegisterResponse, isErrorResponse, isLoginResponse } from '../types';

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
      const errorData = await response.json() as { message?: string };
      const message = isErrorResponse(errorData) ? errorData.message : 'Registration failed';
      throw new FirebaseError('auth/invalid-request', message || 'Registration failed');
    }

    const responseData = await response.json() as RegisterResponse;
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
