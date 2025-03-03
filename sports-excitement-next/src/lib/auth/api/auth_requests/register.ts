import { FirebaseAuthResponse, LoginRequest } from '../types';

/**
 * Handles user registration requests.
 * @param {LoginRequest} request - The registration credentials including email and password.
 * @returns {Promise<FirebaseAuthResponse>} - The authentication response containing token and user info.
 * @throws {Error} - When registration fails or network error occurs.
 * @example
 * const session = await register({ email: 'user@example.com', password: 'password' });
 */
export const register = async (request: LoginRequest): Promise<FirebaseAuthResponse> => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
