import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormData, RegisterFormData } from '@/lib/cloudflare/api/auth/types';

import { AuthService } from '@/lib/cloudflare/api/auth/service';

export interface AuthState {
  idToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  sessionId: string | null;
}

const initialState: AuthState = {
  idToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  sessionId: null,
};

const authService = new AuthService();

export const loginAction = createAsyncThunk(
  'auth/login',
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const registerAction = createAsyncThunk(
  'auth/register',
  async (userData: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
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
      const data = { email };
      await authService.resetPasswordRequest(data);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  'auth/resetPassword',
  async (verificationCode: { verificationCode: string }, { rejectWithValue }) => {
    try {
      const data = { code: verificationCode.verificationCode, token: "placeholder", newPassword: "placeholder" };
      const response = await authService.resetPassword(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.idToken = action.payload.idToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.idToken = action.payload.idToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loading = false;
        state.idToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logoutAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordRequestAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordRequestAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPasswordRequestAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.idToken = action.payload.idToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(resetPasswordAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
