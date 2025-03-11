import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@/lib/Redux/store';
import { ReduxStateService } from '../services/stateService';
import { AuthState } from '@/lib/Redux/slices/authSlice';

/**
 * Redux middleware that synchronizes state changes with Cloudflare Workers
 * Only syncs auth state changes to minimize network traffic
 */
export const cloudflareSyncMiddleware: Middleware<{}, RootState> = store => next => (action: any) => {
  // Process the action normally first
  const result = next(action);
  
  // Only sync certain actions to reduce unnecessary network calls
  if (action.type.startsWith('auth/') && 
      !action.type.includes('pending') && 
      !action.type.includes('rejected')) {
    
    const state = store.getState();
    const sessionId = (state.auth as AuthState).sessionId;
    
    // Only sync if we have a session ID
    if (sessionId) {
      const stateService = new ReduxStateService();
      
      // Sync state to Cloudflare without blocking
      stateService.updateState(sessionId, { auth: state.auth })
        .catch((error: any) => {
          console.error('Failed to sync state with Cloudflare:', error);
          // Dispatch a non-blocking error action
          store.dispatch({ 
            type: 'cloudflare/syncFailed', 
            payload: { error: error.message } 
          });
        });
    }
  }
  
  return result;
};

export default cloudflareSyncMiddleware;
