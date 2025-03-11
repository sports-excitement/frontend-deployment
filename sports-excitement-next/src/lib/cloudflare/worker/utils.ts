import { Environment } from '@/lib/cloudflare/worker/types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create CORS headers for cross-origin requests
 */
export function createCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Session-ID',
    'Access-Control-Max-Age': '86400'
  };
}

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return uuidv4();
}

/**
 * Validate a session token
 */
export async function isValidSession(sessionId: string, env: Environment): Promise<boolean> {
  try {
    // Get session from KV
    const sessionString = await env.SESSION_KV.get(sessionId);
    if (!sessionString) {
      return false;
    }

    const session = JSON.parse(sessionString);
    
    // Check expiration
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (session.expiresAt < nowInSeconds) {
      return false;
    }

    // Verify Firebase token (could add more validation if needed)
    // This is a basic validation - we're trusting KV storage for now
    // For more security, we could verify the token with Firebase
    return true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
}

/**
 * Encrypt sensitive data
 * (This would use env.JWT_SECRET in a real implementation)
 */
export function encryptData(data: any, env: Environment): string {
  // Simple implementation - in production, use proper encryption
  const encryptedData = JSON.stringify(data);
  return encryptedData;
}

/**
 * Decrypt sensitive data
 * (This would use env.JWT_SECRET in a real implementation)
 */
export function decryptData(encryptedData: string, env: Environment): any {
  // Simple implementation - in production, use proper decryption
  const data = JSON.parse(encryptedData);
  return data;
}
