import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { forgotPassword, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPassword(email);
    if (result.success) {
      setSent(true);
      setTimeout(() => {
        navigate('/verify-otp', { state: { email, type: 'reset' } });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      {/* Background */}
      <div className="absolute w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[100px] top-[20%] left-[10%] animate-pulse opacity-40"></div>

      <div className="relative z-10 w-full max-w-md glass-card p-8">
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-cyan-400 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Login
        </Link>

        <h2 className="text-3xl font-bold mb-2 gradient-text">
          Forgot Password?
        </h2>
        <p className="text-white/60 mb-8">
          No worries! Enter your email and we'll send you a reset code.
        </p>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="text-green-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Check Your Email</h3>
            <p className="text-white/60">
              We've sent a verification code to<br />
              <span className="text-cyan-400">{email}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field pl-10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}