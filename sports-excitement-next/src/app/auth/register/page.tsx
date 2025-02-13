import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useAuth } from '@/lib/auth/hooks/useAuth';
import type { RegisterRequest } from '@/lib/auth/types';

interface RegisterFormData extends RegisterRequest {
  confirmPassword: string;
}

interface RegistrationState {
  isRegistered: boolean;
  message: string | null;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { register, loginWithGoogle, loading, error } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [state, setState] = useState<RegistrationState>({
    isRegistered: false,
    message: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): string | null => {
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      setState({
        isRegistered: true,
        message: `Hello ${formData.fullName}, your account has been created successfully!`
      });
    } catch (error) {
      // Error is handled by the useAuth hook
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const user = await loginWithGoogle();
      setState({
        isRegistered: true,
        message: `Hello ${user.displayName || ''}, your account has been created successfully!`
      });
    } catch (error) {
      // Error is handled by the useAuth hook
    }
  };

  if (state.isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900">
              Registration Successful!
            </h2>
            <p className="text-green-600 font-medium text-lg">
              {state.message}
            </p>
            <p className="text-gray-600">
              Welcome to Sports Excitement. Start Exploring!
            </p>
            <PrimaryButton
              text="Continue"
              className="mt-6"
              onClick={() => router.push('/dashboard')}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to create your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="
                  mt-1 block w-full px-3 py-2
                  border border-gray-300 rounded-lg
                  text-sm text-gray-900
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                "
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="
                  mt-1 block w-full px-3 py-2
                  border border-gray-300 rounded-lg
                  text-sm text-gray-900
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                "
                placeholder="hello@yourmail.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="
                  mt-1 block w-full px-3 py-2
                  border border-gray-300 rounded-lg
                  text-sm text-gray-900
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                "
                placeholder="Enter password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="
                  mt-1 block w-full px-3 py-2
                  border border-gray-300 rounded-lg
                  text-sm text-gray-900
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                "
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <PrimaryButton
              text={loading ? 'Creating account...' : 'Create account'}
              className="w-full"
              disabled={loading}
            />
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading}
              className="
                w-full px-4 py-2
                flex items-center justify-center
                border border-gray-300 rounded-full
                text-sm font-medium text-gray-700
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500
                transition-colors duration-200
              "
            >
              <Image
                src="https://loodibee.com/wp-content/uploads/Google-Symbol.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-orange-500 hover:text-orange-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
