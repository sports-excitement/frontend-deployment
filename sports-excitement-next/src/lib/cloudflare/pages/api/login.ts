import { signInWithEmailPassword } from '@/lib/auth/api';

interface LoginRequest {
  email: string;
  password: string;
}

export async function onRequest(context: EventContext<Env, any, any>) {
  try {
    const { email, password } = await context.request.json() as LoginRequest;
    
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await signInWithEmailPassword(
      email, 
      password, 
      context.env.FIREBASE_API_KEY
    );

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Login failed' }), 
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
