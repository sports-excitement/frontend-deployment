import { NextResponse } from 'next/server';
import { registerWithEmailPassword } from '@/lib/auth/api';
import { RegisterRequest } from '@/lib/auth/types';

export async function POST(request: Request) {
  try {
    const body = await request.json() as RegisterRequest;
    
    if (!body.email || !body.password || !body.fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    const response = await registerWithEmailPassword(body);
    
    return NextResponse.json({
      success: true,
      ...response
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      },
      { status: 400 }
    );
  }
}
