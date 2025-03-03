import { FirebaseAuthResponse } from '../types';

/**
 * Handles email verification requests.
 * @param {string} token - The verification token sent to the user's email.
 * @returns {Promise<FirebaseAuthResponse>} - The response indicating the success of the verification.
 * @throws {Error} - When the verification fails or network error occurs.
 * @example
 * await verify('verification-token');
 */
export const verify = async (token: string): Promise<FirebaseAuthResponse> => {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    if (!response.ok) throw new Error('Verification failed');
    return await response.json();
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};
