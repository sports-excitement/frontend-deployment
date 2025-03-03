/**
 * Deletes and terminates an authentication session
 * @param {string} token - The authentication token to invalidate
 * @returns {Promise<void>} - Resolves when session is successfully terminated
 * @throws {Error} - When logout fails or network error occurs
 * @example
 * await delete_auth_session('your-auth-token');
 */
export const delete_auth_session = async (token: string): Promise<void> => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Logout failed');
  } catch (error) {
    console.error('Error deleting auth session:', error);
    throw error;
  }
};
