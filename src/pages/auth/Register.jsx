import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Building2, GraduationCap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validatePasswordMatch, validateName } from '../../utils/validators';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) newErrors.name = nameValidation.message;

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.message;

    const passValidation = validatePassword(formData.password);
    if (!passValidation.valid) newErrors.password = passValidation.message;

    const matchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (!matchValidation.valid) newErrors.confirmPassword = matchValidation.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center py-20 px-4"></div>
      <div className="absolute"></div>
    </>
  )
}