// Frontend Security Utilities

// XSS Protection - Sanitize user input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
};

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 128;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (password.length > maxLength) {
    errors.push(`Password must not exceed ${maxLength} characters`);
  }
  
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate file uploads
export const validateFile = (file) => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg'
  ];
  
  const errors = [];
  
  if (file.size > maxSize) {
    errors.push('File size must not exceed 50MB');
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Only DOCX, PDF, and image files are allowed');
  }
  
  // Check file name for malicious patterns
  const maliciousPatterns = [
    /\.\./,
    /[<>:"|?*]/,
    /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i
  ];
  
  if (maliciousPatterns.some(pattern => pattern.test(file.name))) {
    errors.push('Invalid file name');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// CSRF Token management
export const getCSRFToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

// Secure local storage wrapper
export const secureStorage = {
  set: (key, value) => {
    try {
      const encrypted = btoa(JSON.stringify(value));
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  },
  
  get: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return JSON.parse(atob(encrypted));
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};

// Rate limiting for frontend requests
class RateLimiter {
  constructor() {
    this.requests = new Map();
  }
  
  canMakeRequest(endpoint, limit = 10, windowMs = 60000) {
    const now = Date.now();
    const key = endpoint;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const requests = this.requests.get(key);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Input validation for forms
export const validateFormInput = (value, type, options = {}) => {
  const errors = [];
  
  // Common validations
  if (options.required && (!value || value.trim() === '')) {
    errors.push('This field is required');
  }
  
  if (value && options.minLength && value.length < options.minLength) {
    errors.push(`Minimum length is ${options.minLength} characters`);
  }
  
  if (value && options.maxLength && value.length > options.maxLength) {
    errors.push(`Maximum length is ${options.maxLength} characters`);
  }
  
  // Type-specific validations
  switch (type) {
    case 'email':
      if (value && !isValidEmail(value)) {
        errors.push('Please enter a valid email address');
      }
      break;
      
    case 'name':
      if (value && !/^[a-zA-Z\s]+$/.test(value)) {
        errors.push('Name can only contain letters and spaces');
      }
      break;
      
    case 'title':
      if (value && !/^[a-zA-Z0-9\s\-\:\.\,\(\)]+$/.test(value)) {
        errors.push('Title contains invalid characters');
      }
      break;
      
    case 'keywords':
      if (value && !/^[a-zA-Z0-9\s\-]+$/.test(value)) {
        errors.push('Keywords can only contain letters, numbers, spaces, and hyphens');
      }
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Secure API request wrapper
export const secureApiRequest = async (url, options = {}) => {
  // Check rate limiting
  if (!rateLimiter.canMakeRequest(url)) {
    throw new Error('Too many requests. Please try again later.');
  }
  
  // Add security headers
  const secureOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers
    }
  };
  
  // Add CSRF token if available
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    secureOptions.headers['X-CSRF-Token'] = csrfToken;
  }
  
  try {
    const response = await fetch(url, secureOptions);
    
    // Log suspicious responses
    if (response.status === 429) {
      console.warn('Rate limit exceeded for:', url);
    }
    
    if (response.status >= 400) {
      console.warn('API request failed:', {
        url,
        status: response.status,
        statusText: response.statusText
      });
    }
    
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Content Security Policy violation handler
export const handleCSPViolation = (event) => {
  console.warn('CSP Violation:', {
    blockedURI: event.blockedURI,
    violatedDirective: event.violatedDirective,
    originalPolicy: event.originalPolicy,
    timestamp: new Date().toISOString()
  });
  
  // Report to security monitoring service if available
  if (window.securityMonitoring) {
    window.securityMonitoring.reportCSPViolation(event);
  }
};

// Initialize security event listeners
export const initializeSecurity = () => {
  // Listen for CSP violations
  document.addEventListener('securitypolicyviolation', handleCSPViolation);
  
  // Prevent right-click context menu in production
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }
  
  // Disable F12 and other developer tools shortcuts in production
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    });
  }
};

export default {
  sanitizeInput,
  isValidEmail,
  validatePassword,
  validateFile,
  secureStorage,
  rateLimiter,
  validateFormInput,
  secureApiRequest,
  initializeSecurity
};
