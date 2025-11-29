import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return (<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>);
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Main auth hook logic
const useProvideAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        const parsedUser = JSON.parse(savedUser);
        
        // Verify token is still valid
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setUser(parsedUser);
        } else {
          // Token is invalid, clear storage
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        // Navigate based on user role
        const dashboardRoutes = {
          student: '/student/dashboard',
          recruiter: '/recruiter/dashboard',
          admin: '/admin/dashboard'
        };
        
        navigate(dashboardRoutes[data.user.role] || '/');
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        // Navigate to appropriate dashboard
        const dashboardRoutes = {
          student: '/student/dashboard',
          recruiter: '/recruiter/dashboard'
        };
        
        navigate(dashboardRoutes[data.user.role] || '/');
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Registration failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  // Update user profile
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((roles) => {
    if (!user) return false;
    if (typeof roles === 'string') {
      return user.role === roles;
    }
    return roles.includes(user.role);
  }, [user]);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!user && !!localStorage.getItem('token');
  }, [user]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    updateUser,
    hasRole,
    isAuthenticated
  };
};

// Standalone hook for simple auth checks
export const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setIsAuth(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return { isAuth, user, loading };
};

export default useAuth;