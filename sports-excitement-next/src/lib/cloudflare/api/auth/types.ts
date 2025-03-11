// Type definitions for authentication API

export interface RegisterFormData {
    email: string;
    password: string;
    fullName: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface FirebaseAuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    displayName?: string;
    emailVerified?: boolean;
}

export interface TokenRefreshRequest {
    refreshToken: string;
}

export interface TokenRefreshResponse {
    idToken: string;
    refreshToken: string;
    expiresIn: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirmation {
    token: string;
    newPassword: string;
}

export interface PasswordChangeRequest {
    currentPassword: string;
    newPassword: string;
}

export interface EmailVerificationRequest {
    email: string;
}

export interface EmailVerificationConfirmation {
    verificationCode: string;
}

export interface AccountUnlockRequest {
    verificationCode: string;
}

export interface SecurityLog {
    timestamp: string;
    activity: string;
    ipAddress: string;
    deviceInfo: string;
    success: boolean;
}

export interface AuthUser {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    securityLogs: SecurityLog[];
    isEmailVerified: boolean;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    statusCode: number;
}

export interface CloudflareEnv {
    // Firebase configuration
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    
    // KV namespaces
    SESSION_KV: KVNamespace;
    REDUX_STATE_KV: KVNamespace;
    
    // Security
    JWT_SECRET: string;
}
