import { createTransport } from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required.' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address.' 
      });
    }

    // Sanitize inputs
    const sanitizeInput = (input) => {
      return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                  .replace(/<[^>]+>/g, '')
                  .trim();
    };

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: sanitizeInput(company || ''),
      service: sanitizeInput(service || ''),
      message: sanitizeInput(message)
    };

    // Email transporter
    const transporter = createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD
      }
    });

    // Email to you
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: process.env.ZOHO_EMAIL,
      subject: `New Contact Form - ${sanitizedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Company:</strong> ${sanitizedData.company || 'Not provided'}</p>
        <p><strong>Service Needed:</strong> ${sanitizedData.service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message}</p>
        <hr>
        <p><small>Submitted from: ${req.headers.origin || 'Unknown'}</small></p>
      `
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: sanitizedData.email,
      subject: 'Thank you for contacting Lumeo Group',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${sanitizedData.name},</p>
        <p>Thank you for contacting Lumeo Group. We've received your message and will get back to you within 24 hours.</p>
        
        <h3>Your submission details:</h3>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Company:</strong> ${sanitizedData.company || 'Not provided'}</p>
        <p><strong>Service Needed:</strong> ${sanitizedData.service || 'Not specified'}</p>
        <p><strong>Message:</strong> ${sanitizedData.message}</p>
        
        <p>Best regards,<br>The Lumeo Group Team</p>
        <hr>
        <p><small>This is an automated response. Please do not reply to this email.</small></p>
      `
    });

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
}
