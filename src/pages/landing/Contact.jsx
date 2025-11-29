import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for contacting us! We will get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactInfoCard
              icon={Mail}
              title="Email Us"
              info="support@internmatch.ai"
              subInfo="We'll respond within 24 hours"
              color="blue"
            />
            <ContactInfoCard
              icon={Phone}
              title="Call Us"
              info="+91 1234567890"
              subInfo="Mon-Fri from 9am to 6pm"
              color="green"
            />
            <ContactInfoCard
              icon={MapPin}
              title="Visit Us"
              info="123 Tech Park, Bangalore"
              subInfo="Karnataka, India - 560001"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitStatus.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="student">Student Support</option>
                    <option value="recruiter">Recruiter Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>
              
              {/* FAQ Link */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <MessageSquare className="text-blue-600 mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Quick Answers</h3>
                    <p className="text-gray-600 mb-3">
                      Check our FAQ section for instant answers to common questions.
                    </p>
                    <a href="/faq" className="text-blue-600 hover:underline font-semibold">
                      Visit FAQ →
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <Clock className="text-green-600 mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <SocialLink icon={Facebook} href="https://facebook.com" color="blue" />
                  <SocialLink icon={Twitter} href="https://twitter.com" color="blue" />
                  <SocialLink icon={Linkedin} href="https://linkedin.com" color="blue" />
                  <SocialLink icon={Instagram} href="https://instagram.com" color="pink" />
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p>Map View</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Our support team is available during business hours to help you
          </p>
          <a
            href="tel:+911234567890"
            className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Phone size={20} className="mr-2" />
            Call Now: +91 1234567890
          </a>
        </div>
      </section>
    </div>
  );
};

// Component: Contact Info Card
const ContactInfoCard = ({ icon: Icon, title, info, subInfo, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color]} mb-6`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-900 font-semibold mb-1">{info}</p>
      <p className="text-gray-600 text-sm">{subInfo}</p>
    </div>
  );
};

// Component: Social Link
const SocialLink = ({ icon: Icon, href, color }) => {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    pink: 'bg-pink-600 hover:bg-pink-700'
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${colorClasses[color]} text-white p-3 rounded-full transition-colors`}
    >
      <Icon size={20} />
    </a>
  );
};

export default Contact;