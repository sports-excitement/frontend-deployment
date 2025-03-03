import { FirebaseAuthResponse } from '../types';

/**
 * Reads and validates an existing authentication session
 * @param {string} token - The authentication token to validate
 * @returns {Promise<FirebaseAuthResponse>} - The validated session information
 * @throws {Error} - When session validation fails or network error occurs
 * @example
 * const session = await read_auth_session('your-auth-token');
 */
export const read_auth_session = async (token: string): Promise<FirebaseAuthResponse> => {
  try {
    const response = await fetch(`/api/auth/session?token=${token}`);
    if (!response.ok) throw new Error('Session validation failed');
    return await response.json();
  } catch (error) {
    console.error('Error reading auth session:', error);
    throw error;
  }
};
