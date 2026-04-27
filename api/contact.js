// API Contact Form Endpoint for Vercel Functions
// Handles contact form submissions with validation and security
import { createClient } from '@supabase/supabase-js';

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

    let storedInDatabase = false;
    let storageError = null;

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    const supabaseKey = supabaseServiceRoleKey || supabaseAnonKey;

    // Best-effort persistence. If DB is not configured yet, keep endpoint usable.
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from('contact_submissions').insert({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone || null,
          company: contactData.company || null,
          subject: contactData.subject,
          message: contactData.message,
          attachments: null,
          status: 'new',
          source: 'web_form',
          metadata: {
            ip: contactData.ip,
            userAgent: contactData.userAgent,
          },
        });

        if (error) {
          storageError = error.message;
          console.error('Failed to store contact submission:', error);
        } else {
          storedInDatabase = true;
        }
      } catch (dbError) {
        storageError = dbError?.message || 'Unknown database error';
        console.error('Contact submission database error:', dbError);
      }
    }

    console.log('Contact form submission received:', {
      email: contactData.email,
      storedInDatabase,
      storageError,
    });

    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: `contact_${Date.now()}`,
        submittedAt: contactData.timestamp,
        storedInDatabase,
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
