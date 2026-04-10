import { Router } from 'express';
import nodemailer from 'nodemailer';
import Joi from 'joi';

const router = Router();

// Email validation schema
const emailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().min(1).max(200).required(),
  body: Joi.string().min(1).max(5000).required(),
  from: Joi.string().email().optional(),
  replyTo: Joi.string().email().optional(),
});

// Contact form validation schema
const contactFormSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  company: Joi.string().optional(),
  message: Joi.string().min(10).max(2000).required(),
  attachments: Joi.string().optional(),
});

// Create email transporter using RMail (or any SMTP service)
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.RMAIL_HOST || 'smtp.rmail.com',
    port: parseInt(process.env.RMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.RMAIL_USER,
      pass: process.env.RMAIL_PASS,
    },
  });
};

// Send email endpoint
router.post('/send', async (req, res) => {
  try {
    const { error, value } = emailSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details[0].message 
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: value.from || process.env.RMAIL_FROM,
      to: value.to,
      subject: value.subject,
      text: value.body,
      replyTo: value.replyTo,
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error: any) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

// Send contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    const { error, value } = contactFormSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details[0].message 
      });
    }

    const transporter = createTransporter();

    // Create HTML email for better formatting
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Contact Information</h3>
            <p><strong>Name:</strong> ${value.name}</p>
            <p><strong>Email:</strong> ${value.email}</p>
            ${value.phone ? `<p><strong>Phone:</strong> ${value.phone}</p>` : ''}
            ${value.company ? `<p><strong>Company:</strong> ${value.company}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Message</h3>
            <p style="white-space: pre-wrap; color: #555;">${value.message}</p>
          </div>
          
          ${value.attachments ? `
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-bottom: 15px;">Attachments</h3>
            <p style="white-space: pre-wrap; color: #555;">${value.attachments}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from JADTRA Consulting website contact form
            </p>
            <p style="color: #666; font-size: 12px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.RMAIL_FROM,
      to: process.env.CONTACT_EMAIL || 'info@jadtraconsulting.com',
      subject: `New Contact Form: ${value.subject || `Inquiry from ${value.name}`}`,
      html: htmlBody,
      replyTo: value.email,
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to the customer
    const autoReplyOptions = {
      from: process.env.RMAIL_FROM,
      to: value.email,
      subject: 'Thank you for contacting JADTRA Consulting',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Inquiry</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p style="color: #555; line-height: 1.6;">
                Dear ${value.name},
              </p>
              <p style="color: #555; line-height: 1.6;">
                Thank you for contacting JADTRA Consulting. We have received your message and our team will get back to you within 24-48 business hours.
              </p>
              <p style="color: #555; line-height: 1.6;">
                For urgent matters, please call us at +62 21 0000 0000.
              </p>
              <p style="color: #555; line-height: 1.6;">
                Best regards,<br>
                JADTRA Consulting Team
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 12px;">
                JADTRA Consulting | Trusted Business & Tax Advisory
              </p>
              <p style="color: #666; font-size: 12px;">
                Email: info@jadtraconsulting.com | Phone: +62 21 0000 0000
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

export { router as emailRoutes };
