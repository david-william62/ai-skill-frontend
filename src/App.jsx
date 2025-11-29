import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Landing Pages
import Home from './pages/landing/Home';
import About from './pages/landing/About';
import Contact from './pages/landing/Contact';
import Features from './pages/landing/Features';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOTP from './pages/auth/VerifyOTP';

// Route Groups
import StudentRoutes from './routes/StudentRoutes';
import RecruiterRoutes from './routes/RecruiterRoutes';
import AdminRoutes from './routes/AdminRoutes';

// Error Pages
import NotFound from './pages/error/NotFound';
import Unauthorized from './pages/error/Unauthorized';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-100">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Protected Route Groups */}
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route path="/recruiter/*" element={<RecruiterRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}