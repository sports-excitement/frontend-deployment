import { FirebaseAuthResponse, LoginRequest } from '../types';

/**
 * Creates a new authentication session
 * @param {LoginRequest} request - The login credentials including email and password
 * @returns {Promise<FirebaseAuthResponse>} - The authentication response containing token and user info
 * @throws {Error} - When authentication fails or network error occurs
 * @example
 * const session = await create_auth_session({ email: 'user@example.com', password: 'password' });
 */
export const create_auth_session = async (request: LoginRequest): Promise<FirebaseAuthResponse> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Authentication failed');
    return await response.json();
  } catch (error) {
    console.error('Error creating auth session:', error);
    throw error;
  }
};
