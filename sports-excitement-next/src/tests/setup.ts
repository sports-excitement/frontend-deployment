import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

// Mock Env variables
vi.stubGlobal('ENV', {
  FIREBASE_API_KEY: 'test-api-key',
});

// Create MSW server for mocking HTTP requests
export const server = setupServer();

// Enable request interception before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers between tests
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

// Mock KV store implementation
export class MockKV {
  private store = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.store.get(key) || null;
  }

  async put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}
