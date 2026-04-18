// Web Vitals API Endpoint for Vercel Functions
// Handles web vitals data collection for performance monitoring

interface WebVitalsData {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  page: string;
  userAgent: string;
  timestamp: number;
  sessionId: string;
  deviceType?: string;
  connectionType?: string;
  memoryInfo?: number;
}

export default async function handler(req: any, res: any) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
      return handleGet(req, res);
    case 'OPTIONS':
      return handleOptions(req, res);
    default:
      return res.status(405).json({
        error: 'Method not allowed',
        message: 'Only POST, GET, and OPTIONS methods are supported',
        allowedMethods: ['POST', 'GET', 'OPTIONS']
      });
  }
}

async function handlePost(req: any, res: any) {
  try {
    // Parse request body
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    // Validate required fields
    const { metric, value, rating, page, userAgent, timestamp, sessionId } = body as WebVitalsData;
    
    if (!metric || typeof value !== 'number' || !rating || !page || !userAgent || !timestamp || !sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'metric, value, rating, page, userAgent, timestamp, and sessionId are required'
      });
    }

    // Validate rating
    const validRatings = ['good', 'needs-improvement', 'poor'];
    if (!validRatings.includes(rating)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rating value',
        message: 'Rating must be one of: good, needs-improvement, poor'
      });
    }

    // Validate metric
    const validMetrics = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'];
    if (!validMetrics.includes(metric)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid metric value',
        message: `Metric must be one of: ${validMetrics.join(', ')}`
      });
    }

    // Prepare web vitals data
    const webVitalsData = {
      metric,
      value,
      rating,
      page,
      userAgent,
      timestamp,
      sessionId,
      deviceType: body.deviceType || 'unknown',
      connectionType: body.connectionType || 'unknown',
      memoryInfo: body.memoryInfo || null,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      receivedAt: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };

    // Log web vitals data
    console.log('Web Vitals Data:', webVitalsData);

    // TODO: Store in Supabase or other database
    // const { data, error } = await supabase
    //   .from('web_vitals')
    //   .insert([webVitalsData]);

    return res.status(200).json({
      success: true,
      message: 'Web vitals recorded successfully',
      receivedAt: webVitalsData.receivedAt,
      data: {
        metric,
        rating,
        value
      }
    });

  } catch (error) {
    console.error('Error processing web vitals:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process web vitals data'
    });
  }
}

async function handleGet(req: any, res: any) {
  try {
    // Return web vitals statistics or summary
    return res.status(200).json({
      success: true,
      message: 'Web Vitals API endpoint',
      description: 'Accepts web vitals data for performance monitoring',
      supportedMetrics: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'],
      supportedRatings: ['good', 'needs-improvement', 'poor'],
      endpoint: '/api/analytics/web-vitals',
      method: 'POST',
      environment: process.env.NODE_ENV || 'development'
    });

  } catch (error) {
    console.error('Error in GET handler:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleOptions(req: any, res: any) {
  return res.status(200).json({
    message: 'Web Vitals API endpoint',
    allowedMethods: ['POST', 'GET', 'OPTIONS'],
    description: 'Accepts web vitals data for performance monitoring',
    cors: {
      allowedOrigins: ['*'],
      allowedMethods: ['POST', 'GET', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  });
}
