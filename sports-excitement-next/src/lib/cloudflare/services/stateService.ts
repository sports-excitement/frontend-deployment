import { ApiResponse } from '@/lib/cloudflare/api/auth/types';

/**
 * Service for interacting with Cloudflare Worker state endpoints
 * Handles synchronization of Redux state with backend storage
 */
export class ReduxStateService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = '/api/state';
  }

  /**
   * Fetch the current Redux state from Cloudflare
   */
  async getState<T>(sessionId: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        }
      });

      const data = await response.json() as { error?: string; state?: T };
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch state',
          statusCode: response.status
        };
      }

      // Ensure data.state exists before returning success
      if (!data.state) {
        return {
          success: false,
          error: 'State not found in response',
          statusCode: response.status
        };
      }

      return {
        success: true,
        data: data.state,
        statusCode: response.status
      };
    } catch (error) {
      console.error('Error fetching state:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: 500
      };
    }
  }

  /**
   * Update the Redux state in Cloudflare
   */
  async updateState<T>(sessionId: string, state: T): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({ state })
      });

      const data = await response.json() as { error?: string };
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update state',
          statusCode: response.status
        };
      }

      return {
        success: true,
        statusCode: response.status
      };
    } catch (error) {
      console.error('Error updating state:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: 500
      };
    }
  }
}
