export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword && !!password;
};

export const validateName = (name) => {
  if (!name) return false;
  const regex = /^[A-Za-z\s'.-]{3,}$/;
  return regex.test(name.trim());
};

const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

const validateMinLength = (value, min) => {
  return value && value.length >= min;
};

const validateMaxLength = (value, max) => {
  return value && value.length <= max;
};

const isDisposableEmail = (email) => {
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
};

export const validators = {
  email: validateEmail,
  password: validatePassword,
  phone: validatePhone,
  url: validateUrl,
  required: isRequired,
  minLength: validateMinLength,
  maxLength: validateMaxLength,
  isDisposableEmail,
  name: validateName,
  passwordMatch: validatePasswordMatch,
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