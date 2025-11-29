export const validators = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  password: (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  },

  phone: (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  },

  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  required: (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },

  minLength: (value, min) => {
    return value && value.length >= min;
  },

  maxLength: (value, max) => {
    return value && value.length <= max;
  },

  isDisposableEmail: (email) => {
    const disposableDomains = [
      'tempmail.com',
      'throwawaymail.com',
      'mailinator.com',
      'yopmail.com',
      '10minutemail.com',
      'guerrillamail.com',
      'maildrop.cc',
      'getairmail.com',
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    return disposableDomains.includes(domain);
  },
};

export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = values[field];

    fieldRules.forEach((rule) => {
      if (errors[field]) return;

      if (rule.required && !validators.required(value)) {
        errors[field] = rule.message || `${field} is required`;
      }

      if (rule.email && !validators.email(value)) {
        errors[field] = rule.message || 'Invalid email address';
      }

      if (rule.password && !validators.password(value)) {
        errors[field] = rule.message || 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }

      if (rule.minLength && !validators.minLength(value, rule.minLength)) {
        errors[field] = rule.message || `Minimum ${rule.minLength} characters required`;
      }

      if (rule.match && value !== values[rule.match]) {
        errors[field] = rule.message || 'Values do not match';
      }
    });
  });

  return errors;
};