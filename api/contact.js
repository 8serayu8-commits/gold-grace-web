// API Contact Form Endpoint for Vercel Functions
// Handles contact form submissions with validation and security

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const { name, email, subject, message, company, phone } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Name, email, and message are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Name validation (min 2 characters)
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Invalid name',
        message: 'Name must be at least 2 characters long'
      });
    }

    // Message validation (min 10 characters)
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Invalid message',
        message: 'Message must be at least 10 characters long'
      });
    }

    // In a real implementation, you would:
    // 1. Store in database (Supabase)
    // 2. Send email notification
    // 3. Add to CRM
    // 4. Rate limiting check
    // 5. Spam filtering

    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'Contact Form Submission',
      message: message.trim(),
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    // For now, just return success (in production, integrate with email service/database)
    console.log('Contact form submission:', contactData);

    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: `contact_${Date.now()}`,
        submittedAt: contactData.timestamp
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process contact form submission'
    });
  }
}
