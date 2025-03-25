// Vitest setup file

// Mock global objects that might be missing in the test environment
if (typeof window === 'undefined') {
  global.window = {} as any;
}

// Configure Jest-like globals for the test environment
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Setup custom matchers - commented out until proper type definitions are available
// import matchers from '@testing-library/jest-dom/matchers';
// expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Suppress console errors in tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes?.('Warning:') ||
    args[0]?.includes?.('Error:') ||
    args[0]?.includes?.('Invalid hook call')
  ) {
    return;
  }
  originalConsoleError(...args);
}; 