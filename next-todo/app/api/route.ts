import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = {
    message: 'Hello, Next.js API',
    data: '',
  };
  return NextResponse.json(response, { status: 200 });
}
