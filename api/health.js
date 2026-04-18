// API Health Check Endpoint for Vercel Functions
// This provides a simple health check for monitoring and deployment verification

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  try {
    // Basic health check response
    const healthData = {
      ok: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'JADTRA Consulting Website',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      vercel: {
        region: process.env.VERCEL_REGION || 'unknown',
        url: process.env.VERCEL_URL || 'local'
      }
    };

    // Check if Supabase is configured (optional health check)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      healthData.supabase = {
        configured: true,
        url: supabaseUrl.replace(/https?:\/\//, '').split('/')[0] // Show domain only
      };
    } else {
      healthData.supabase = {
        configured: false,
        message: 'Supabase environment variables not configured'
      };
    }

    // Return successful health check
    return res.status(200).json(healthData);

  } catch (error) {
    console.error('Health check error:', error);
    
    return res.status(500).json({
      ok: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}
