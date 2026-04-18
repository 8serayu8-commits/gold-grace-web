// Simple API endpoint template
// Based on Next.js App Router example but adapted for Vercel Functions

export default async function handler(req, res) {
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
        ok: false,
        error: 'Method not allowed',
        message: 'Only GET, POST, and OPTIONS methods are supported',
        allowedMethods: ['GET', 'POST', 'OPTIONS']
      });
  }
}

async function handlePost(req, res) {
  try {
    // Parse request body (if any)
    let body = {};
    if (req.body) {
      try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch (error) {
        return res.status(400).json({
          ok: false,
          error: 'Invalid JSON in request body'
        });
      }
    }

    // Simple ping response
    return res.status(200).json({
      ok: true,
      message: 'Ping successful!',
      method: 'POST',
      timestamp: new Date().toISOString(),
      receivedData: body
    });

  } catch (error) {
    console.error('Error in POST handler:', error);
    return res.status(500).json({
      ok: false,
      error: 'Internal server error'
    });
  }
}

async function handleGet(req, res) {
  try {
    // Simple ping response for GET requests
    return res.status(200).json({
      ok: true,
      message: 'Ping successful!',
      method: 'GET',
      timestamp: new Date().toISOString(),
      server: 'Vercel Functions',
      environment: process.env.NODE_ENV || 'development'
    });

  } catch (error) {
    console.error('Error in GET handler:', error);
    return res.status(500).json({
      ok: false,
      error: 'Internal server error'
    });
  }
}

async function handleOptions(req, res) {
  return res.status(200).json({
    ok: true,
    message: 'Ping API endpoint',
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
    description: 'Simple ping endpoint for testing API connectivity',
    cors: {
      allowedOrigins: ['*'],
      allowedMethods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  });
}
