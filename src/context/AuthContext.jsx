import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { getToken, setToken, removeToken, decodeToken } from '../utils/tokenManager';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
      } else {
        removeToken();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      const decoded = decodeToken(response.token);
      setUser(decoded);
      
      // Redirect based on role
      const redirectPath = {
        student: '/student/dashboard',
        recruiter: '/recruiter/dashboard',
        admin: '/admin/dashboard',
      };
      navigate(redirectPath[decoded.role] || '/');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  const forgotPassword = async (email) => {
    try {
      await authService.forgotPassword(email);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      await authService.verifyOTP(email, otp);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      await authService.resetPassword(email, otp, newPassword);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};