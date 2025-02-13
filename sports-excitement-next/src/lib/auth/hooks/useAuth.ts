import { useState, useCallback } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail, User } from 'firebase/auth';
import { loginWithEmailPassword, registerWithEmailPassword } from '../api';
import { AuthState, RegisterRequest } from '../types';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    loading: false,
    error: null,
    user: null
  });

  const handleError = useCallback((error: unknown) => {
    setState(prev => ({
      ...prev,
      loading: false,
      error: error instanceof Error ? error.message : 'An error occurred'
    }));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await loginWithEmailPassword(email, password);
      // Create a User object from the response
      const user: User = {
        uid: response.localId,
        email: response.email,
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: response.refreshToken,
        tenantId: null,
        delete: async () => { throw new Error('Not implemented'); },
        getIdToken: async () => response.idToken,
        getIdTokenResult: async () => ({ token: response.idToken } as any),
        reload: async () => {},
        toJSON: () => ({}),
        displayName: null,
        phoneNumber: null,
        photoURL: null,
        providerId: 'password'
      };

      setState(prev => ({
        ...prev,
        loading: false,
        user,
        error: null
      }));
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [handleError]);

  const register = useCallback(async (data: RegisterRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await registerWithEmailPassword(data);
      // Create a User object from the response
      const user: User = {
        uid: response.localId,
        email: response.email,
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: response.refreshToken,
        tenantId: null,
        delete: async () => { throw new Error('Not implemented'); },
        getIdToken: async () => response.idToken,
        getIdTokenResult: async () => ({ token: response.idToken } as any),
        reload: async () => {},
        toJSON: () => ({}),
        displayName: data.fullName,
        phoneNumber: null,
        photoURL: null,
        providerId: 'password'
      };

      setState(prev => ({
        ...prev,
        loading: false,
        user,
        error: null
      }));
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [handleError]);

  const loginWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setState(prev => ({
        ...prev,
        loading: false,
        user: result.user,
        error: null
      }));
      return result.user;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [handleError]);

  const resetPassword = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await sendPasswordResetEmail(auth, email);
      setState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [handleError]);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await signOut(auth);
      setState(prev => ({
        ...prev,
        loading: false,
        user: null,
        error: null
      }));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [handleError]);

  return {
    ...state,
    login,
    register,
    loginWithGoogle,
    resetPassword,
    logout
  };
}
