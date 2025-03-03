import { FirebaseAuthResponse } from '../types';

/**
 * Updates and refreshes an existing authentication session
 * @param {string} token - The authentication token to refresh
 * @returns {Promise<FirebaseAuthResponse>} - The refreshed session information
 * @throws {Error} - When session refresh fails or network error occurs
 * @example
 * const session = await update_auth_session('your-auth-token');
 */
export const update_auth_session = async (token: string): Promise<FirebaseAuthResponse> => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Session refresh failed');
    return await response.json();
  } catch (error) {
    console.error('Error updating auth session:', error);
    throw error;
  }
};
