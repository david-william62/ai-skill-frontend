import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import authService from '../../services/authService';
import toast from 'react-hot-toast';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email;
  const type = location.state?.type || 'verify'; // 'verify' or 'reset'

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    try {
      setLoading(true);
      
      if (type === 'reset') {
        navigate('/reset-password', { state: { email, otp: otpString } });
      } else {
        await authService.verifyOTP(email, otpString);
        toast.success('Email verified successfully!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.forgotPassword(email);
      toast.success('OTP resent successfully');
      setResendTimer(60);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="absolute w-[300px] h-[300px] bg-purple-600 rounded-full blur-[100px] bottom-[20%] right-[10%] animate-pulse opacity-40"></div>

      <div className="relative z-10 w-full max-w-md glass-card p-8 text-center">
        <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-cyan-400" size={32} />
        </div>

        <h2 className="text-3xl font-bold mb-2 gradient-text">
          Verify OTP
        </h2>
        <p className="text-white/60 mb-8">
          Enter the 6-digit code sent to<br />
          <span className="text-cyan-400">{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold bg-white/10 border border-white/20 
                           rounded-xl text-white focus:border-cyan-400 focus:outline-none 
                           focus:ring-2 focus:ring-cyan-400/20 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 mb-6"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {/* Resend */}
        <div className="text-white/60">
          Didn't receive the code?{' '}
          {resendTimer > 0 ? (
            <span>Resend in {resendTimer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <RefreshCw size={14} />
              Resend
            </button>
          )}
        </div>
      </div>
    </div>
  );
}