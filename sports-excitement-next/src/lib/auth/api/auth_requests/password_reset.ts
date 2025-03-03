import { FirebaseAuthResponse } from '../types';

/**
 * Handles password reset requests.
 * @param {string} email - The email address of the user requesting a password reset.
 * @returns {Promise<FirebaseAuthResponse>} - The response indicating the success of the password reset request.
 * @throws {Error} - When the password reset fails or network error occurs.
 * @example
 * await password_reset('user@example.com');
 */
export const password_reset = async (email: string): Promise<FirebaseAuthResponse> => {
  try {
    const response = await fetch('/api/auth/password_reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!response.ok) throw new Error('Password reset failed');
    return await response.json();
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
