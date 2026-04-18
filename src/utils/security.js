// src/utils/security.js - Security utilities and middleware

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map();

// Rate limiting middleware
export const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return (identifier) => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!rateLimitStore.has(identifier)) {
      rateLimitStore.set(identifier, []);
    }
    
    const requests = rateLimitStore.get(identifier);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: Math.min(...validRequests) + windowMs
      };
    }
    
    // Add current request
    validRequests.push(now);
    rateLimitStore.set(identifier, validRequests);
    
    return {
      allowed: true,
      remaining: maxRequests - validRequests.length,
      resetTime: Math.min(...validRequests) + windowMs
    };
  };
};

// Generate client identifier for rate limiting
export const getClientIdentifier = () => {
  // In production, use IP address from headers
  // For client-side, use a combination of user agent and timestamp
  const userAgent = navigator.userAgent;
  const sessionId = sessionStorage.getItem('sessionId') || generateSessionId();
  sessionStorage.setItem('sessionId', sessionId);
  
  return btoa(`${userAgent}-${sessionId}`).substring(0, 32);
};

// Generate session ID
const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Content Security Policy
export const cspHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://tfaogdqrmpzpgmrithoo.supabase.co",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '),
  
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// CSRF protection
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Store CSRF token
export const storeCSRFToken = (token) => {
  sessionStorage.setItem('csrfToken', token);
  return token;
};

// Validate CSRF token
export const validateCSRFToken = (token) => {
  const storedToken = sessionStorage.getItem('csrfToken');
  return storedToken && token === storedToken;
};

// Security headers for API requests
export const getSecureHeaders = () => {
  const csrfToken = sessionStorage.getItem('csrfToken') || generateCSRFToken();
  storeCSRFToken(csrfToken);
  
  return {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
  };
};

// Input validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)$/,
  slug: /^[a-z0-9-]+$/,
  title: /^.{1,200}$/,
  content: /^.{1,50000}$/
};

// Validate input against pattern
export const validateInput = (value, patternName) => {
  const pattern = validationPatterns[patternName];
  if (!pattern) return { valid: false, error: 'Unknown validation pattern' };
  
  return {
    valid: pattern.test(value),
    error: pattern.test(value) ? null : `Invalid ${patternName} format`
  };
};

// SQL injection prevention (for client-side validation only)
export const preventSQLInjection = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove SQL injection patterns
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(--|#|\/\*|\*\/)/g,
    /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi,
    /(\bWHERE\b\s+\d+\s*=\s*\d+)/gi
  ];
  
  let sanitized = input;
  sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized.trim();
};

// XSS prevention
export const preventXSS = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Security audit log
export const logSecurityEvent = (event, details = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details: {
      ...details,
      userAgent: navigator.userAgent,
      url: window.location.href
    }
  };
  
  // In production, send to security monitoring service
  console.warn('Security Event:', logEntry);
  
  // Store critical events locally
  if (event === 'SECURITY_BREACH' || event === 'SUSPICIOUS_ACTIVITY') {
    const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
    logs.push(logEntry);
    
    // Keep only last 100 events
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    
    localStorage.setItem('securityLogs', JSON.stringify(logs));
  }
};

// Check for suspicious activity
export const detectSuspiciousActivity = () => {
  const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
  const recentLogs = logs.filter(log => 
    new Date(log.timestamp) > new Date(Date.now() - 60 * 60 * 1000) // Last hour
  );
  
  // Check for multiple failed login attempts
  const failedLogins = recentLogs.filter(log => log.event === 'LOGIN_FAILED');
  if (failedLogins.length > 5) {
    logSecurityEvent('SUSPICIOUS_ACTIVITY', {
      type: 'MULTIPLE_FAILED_LOGINS',
      count: failedLogins.length
    });
    return true;
  }
  
  return false;
};

export default {
  rateLimit,
  getClientIdentifier,
  cspHeaders,
  generateCSRFToken,
  storeCSRFToken,
  validateCSRFToken,
  getSecureHeaders,
  validationPatterns,
  validateInput,
  preventSQLInjection,
  preventXSS,
  logSecurityEvent,
  detectSuspiciousActivity
};
