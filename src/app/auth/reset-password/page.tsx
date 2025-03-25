"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/cloudflare/api/auth/hooks/useAuth';
import PrimaryButton from '@/components/common/PrimaryButton';

interface ResetPasswordState {
  email: string;
  message: string | null;
  error: string | null;
  loading: boolean;
}

const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [state, setState] = useState<ResetPasswordState>({
    email: '',
    message: null,
    error: null,
    loading: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: null, message: null }));

    try {
      await resetPassword(state.email);
      setState(prev => ({
        ...prev,
        loading: false,
        message: 'Password reset email sent! Check your inbox.'
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to send reset email'
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {state.error}
          </div>
        )}

        {state.message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {state.message}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={state.email}
              onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
              className="
                mt-1 block w-full px-3 py-2
                border border-gray-300 rounded-lg
                text-sm text-gray-900
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
              "
              placeholder="Enter your email"
            />
          </div>

          <div>
            <PrimaryButton
              text={state.loading ? 'Sending...' : 'Send Reset Link'}
              className="w-full"
              disabled={state.loading}
            />
          </div>
        </form>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="font-medium text-orange-500 hover:text-orange-400"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
