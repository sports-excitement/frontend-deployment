import { useState } from 'react';
import { auth } from '@/lib/cloudflare/api/auth'; 

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        // Placeholder for login logic
        console.log('Login function called with:', email, password);
    };

    const logout = async () => {
        // Placeholder for logout logic
        console.log('Logout function called');
    };

    const resetPassword = async (email: string) => {
        // Placeholder for reset password logic
        console.log('Reset password function called for:', email);
    };

    const register = async (registerData: { email: string; password: string; fullName: string; }) => {
        // Placeholder for registration logic
        console.log('Register function called with:', registerData);
    };

    const loginWithGoogle = async () => {
        // Placeholder for Google login logic
        console.log('Google login function called');
        try {
            const provider = new auth.GoogleAuthProvider();
            const result = await auth.signInWithPopup(provider);
            return result.user; // Return the user object
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Google login failed');
        }
    };

    return { login, logout, resetPassword, register, loginWithGoogle, loading, error };
};

export { useAuth };
