import { NextResponse } from 'next/server';
import { loginWithEmailPassword } from '@/lib/auth/api';
import { LoginRequest } from '@/lib/auth/types';

export async function POST(request: Request) {
  try {
    const body = await request.json() as LoginRequest;
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = await loginWithEmailPassword(body.email, body.password);
    
    return NextResponse.json({
      success: true,
      ...response
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      },
      { status: 401 }
    );
  }
}
