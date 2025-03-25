import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  LoginFormData, 
  RegisterFormData, 
  ResetPasswordData 
} from '@/hooks/auth/IAuth';
import { supabase } from '@/lib/db/supabaseClient';
import { IAuthActions } from '@/lib/Redux/auth/IAuthActions';

// Auth Actions Implementation
export const loginAction = createAsyncThunk(
  'auth/login',
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) throw new Error(error.message);
      
      return {
        idToken: data.session?.access_token || null,
        refreshToken: data.session?.refresh_token || null
      };
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const registerAction = createAsyncThunk(
  'auth/register',
  async (userData: RegisterFormData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      });
      
      if (error) throw new Error(error.message);
      
      return {
        idToken: data.session?.access_token || null,
        refreshToken: data.session?.refresh_token || null
      };
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const resetPasswordRequestAction = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (email: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password'
      });
      
      if (error) throw new Error(error.message);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) throw new Error(error.message);
      
      // After password update, we need to get the session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw new Error(sessionError.message);
      
      return {
        idToken: sessionData.session?.access_token || null,
        refreshToken: sessionData.session?.refresh_token || null
      };
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

// Export actions as an object that implements IAuthActions
export const authActions: IAuthActions = {
  loginAction,
  registerAction,
  logoutAction,
  resetPasswordRequestAction,
  resetPasswordAction
}; 