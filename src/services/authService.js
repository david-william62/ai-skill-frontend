import api from './api';

export const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  verifyOTP: async (email, otp) => {
    return api.post('/auth/verify-otp', { email, otp });
  },

  resetPassword: async (email, otp, newPassword) => {
    return api.post('/auth/reset-password', { email, otp, newPassword });
  },

  refreshToken: async () => {
    return api.post('/auth/refresh-token');
  },
};