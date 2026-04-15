import { NextRequest, NextResponse } from 'next/server';

// Web Vitals data interface
interface WebVitalsData {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  page: string;
  userAgent: string;
  timestamp: number;
  sessionId: string;
}

// Vercel serverless function handler
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const { metric, value, rating, page, userAgent, timestamp, sessionId } = body as WebVitalsData;
    
    if (!metric || typeof value !== 'number' || !rating || !page || !userAgent || !timestamp || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    const validRatings = ['good', 'needs-improvement', 'poor'];
    if (!validRatings.includes(rating)) {
      return NextResponse.json(
        { error: 'Invalid rating value' },
        { status: 400 }
      );
    }

    // Log web vitals data (in production, you'd store this in a database)
    console.log('Web Vitals Data:', {
      metric,
      value,
      rating,
      page,
      userAgent,
      timestamp,
      sessionId,
      receivedAt: new Date().toISOString(),
    });

    // TODO: Store in database (e.g., Vercel KV, Upstash, or external analytics service)
    // await storeWebVitals(data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Web vitals recorded successfully',
        receivedAt: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing web vitals:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods to prevent 405 errors
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only POST method is supported for web vitals endpoint',
      allowedMethods: ['POST']
    },
    { status: 405 }
  );
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only POST method is supported for web vitals endpoint',
      allowedMethods: ['POST']
    },
    { status: 405 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only POST method is supported for web vitals endpoint',
      allowedMethods: ['POST']
    },
    { status: 405 }
  );
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only POST method is supported for web vitals endpoint',
      allowedMethods: ['POST']
    },
    { status: 405 }
  );
}

// Fallback handler for any other methods
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { 
      message: 'Web Vitals API endpoint',
      allowedMethods: ['POST'],
      description: 'Accepts web vitals data for performance monitoring'
    },
    { 
      status: 200,
      headers: {
        'Allow': 'POST, OPTIONS'
      }
    }
  );
}
