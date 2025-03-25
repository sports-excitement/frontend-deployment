import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  LoginFormData, 
  RegisterFormData, 
  ResetPasswordData,
  AuthState 
} from '@/hooks/AuthHooks';
import { supabase } from '@/lib/db/supabaseClient';

/**
 * Initial auth state
 */
const initialState: AuthState = {
  idToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  sessionId: null,
};

/**
 * Async thunk for login
 */
export const login = createAsyncThunk(
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

/**
 * Async thunk for register
 */
export const register = createAsyncThunk(
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

/**
 * Async thunk for logout
 */
export const logout = createAsyncThunk(
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

/**
 * Async thunk for password reset request
 */
export const resetPasswordRequest = createAsyncThunk(
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

/**
 * Async thunk for password reset
 */
export const resetPassword = createAsyncThunk(
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

/**
 * Auth slice containing reducers and actions
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.idToken = action.payload.idToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.idToken = action.payload.idToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.idToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Reset Password Request
      .addCase(resetPasswordRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPasswordRequest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.idToken = action.payload.idToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;

// Export a comprehensive auth API object for better discovery
export const authAPI = {
  login,
  register,
  logout,
  resetPasswordRequest,
  resetPassword,
  clearErrors
}; 