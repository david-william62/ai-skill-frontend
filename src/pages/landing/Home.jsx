import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Award,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [featuredInternships, setFeaturedInternships] = useState([]);
  const [stats, setStats] = useState({
    totalInternships: 0,
    totalCompanies: 0,
    successfulPlacements: 0,
    activeStudents: 0
  });

  useEffect(() => {
    fetchFeaturedInternships();
    fetchStats();
  }, []);

  const fetchFeaturedInternships = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/internships/featured');
      const data = await response.json();
      setFeaturedInternships(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching featured internships:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/internships?search=${searchTerm}&location=${location}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your Dream Internship with AI
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Smart matching powered by machine learning. Connect with top companies and kickstart your career.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  Search Internships
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </form>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/register?role=student"
                  className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  I'm a Student
                </Link>
                <Link
                  to="/register?role=recruiter"
                  className="bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors border-2 border-white"
                >
                  I'm a Recruiter
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src="/api/placeholder/600/400"
                alt="Students working"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              icon={Briefcase}
              value={stats.totalInternships.toLocaleString()}
              label="Active Internships"
              color="blue"
            />
            <StatCard
              icon={Users}
              value={stats.totalCompanies.toLocaleString()}
              label="Partner Companies"
              color="green"
            />
            <StatCard
              icon={Award}
              value={stats.successfulPlacements.toLocaleString()}
              label="Successful Placements"
              color="purple"
            />
            <StatCard
              icon={TrendingUp}
              value={stats.activeStudents.toLocaleString()}
              label="Active Students"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get matched with the perfect internship in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard
              step="1"
              title="Create Your Profile"
              description="Sign up and complete your profile with your skills, education, and preferences."
              icon="👤"
            />
            <ProcessCard
              step="2"
              title="AI Matches You"
              description="Our ML algorithm analyzes your profile and matches you with suitable internships."
              icon="🤖"
            />
            <ProcessCard
              step="3"
              title="Apply & Get Hired"
              description="Apply to matched opportunities and connect directly with recruiters."
              icon="🎯"
            />
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Internships
              </h2>
              <p className="text-xl text-gray-600">
                Hand-picked opportunities from top companies
              </p>
            </div>
            <Link
              to="/internships"
              className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInternships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/internships"
              className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore All Internships
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Success stories from students and recruiters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Priya Sharma"
              role="Software Engineering Intern at Google"
              image="/api/placeholder/100/100"
              rating={5}
              text="The AI matching was incredibly accurate! I found my dream internship within a week of signing up."
            />
            <TestimonialCard
              name="Rahul Kumar"
              role="Data Science Intern at Microsoft"
              image="/api/placeholder/100/100"
              rating={5}
              text="As a student, this platform made the internship search so much easier. The recommendations were spot-on!"
            />
            <TestimonialCard
              name="Anjali Patel"
              role="HR Manager at TechCorp"
              image="/api/placeholder/100/100"
              rating={5}
              text="We found exceptional talent through this platform. The quality of candidates is outstanding."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students and companies already using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=student"
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started as Student
            </Link>
            <Link
              to="/register?role=recruiter"
              className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-800 transition-colors border-2 border-white"
            >
              Post Internships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component: Stat Card
const StatCard = ({ icon: Icon, value, label, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${colorClasses[color]} mb-4`}>
        <Icon className="text-white" size={28} />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

// Component: Process Card
const ProcessCard = ({ step, title, description, icon }) => (
  <div className="relative bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
    <div className="text-6xl mb-4 text-center">{icon}</div>
    <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
      {step}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

// Component: Internship Card
const InternshipCard = ({ internship }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{internship.title}</h3>
        <p className="text-gray-600">{internship.company}</p>
      </div>
      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
        New
      </span>
    </div>
    
    <div className="space-y-2 mb-4">
      <div className="flex items-center text-sm text-gray-600">
        <MapPin size={16} className="mr-2" />
        {internship.location}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Clock size={16} className="mr-2" />
        {internship.duration}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Briefcase size={16} className="mr-2" />
        ₹{internship.stipend}/month
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {internship.skills?.slice(0, 3).map((skill, index) => (
        <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
          {skill}
        </span>
      ))}
    </div>

    <Link
      to={`/internships/${internship._id}`}
      className="block w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      View Details
    </Link>
  </div>
);

// Component: Testimonial Card
const TestimonialCard = ({ name, role, image, rating, text }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h4 className="font-bold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-current" />
      ))}
    </div>
    
    <p className="text-gray-600 italic">"{text}"</p>
  </div>
);

export default Home;