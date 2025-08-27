import express from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting middleware
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

const checkRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const limit = rateLimit.get(ip);
  
  if (now > limit.resetTime) {
    limit.count = 1;
    limit.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }
  
  if (limit.count >= MAX_REQUESTS) {
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.' 
    });
  }
  
  limit.count++;
  next();
};

// Email transporter configuration
const transporter = createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD
  }
});

// Email validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Sanitize input
const sanitizeInput = (input) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/<[^>]+>/g, '')
              .trim();
};

// Contact form endpoint
app.post('/api/contact', checkRateLimit, async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required.' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address.' 
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: sanitizeInput(company || ''),
      service: sanitizeInput(service || ''),
      message: sanitizeInput(message)
    };

    // Email to you
    const mailToYou = {
      from: process.env.ZOHO_EMAIL,
      to: process.env.ZOHO_EMAIL,
      subject: `New Contact Form Submission - ${sanitizedData.name}`,
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
    };

    // Confirmation email to user
    const mailToUser = {
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
    };

    // Send emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToUser);

    res.json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
