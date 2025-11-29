import React from 'react';
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  Briefcase, 
  TrendingUp,
  Heart,
  Shield,
  Zap
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About InternMatch AI</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing internship recruitment through artificial intelligence and machine learning
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To bridge the gap between talented students and forward-thinking companies through 
                intelligent matching algorithms, making internship recruitment efficient, fair, and 
                accessible to everyone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8">
              <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the world's leading AI-powered internship platform, where every student 
                finds their ideal opportunity and every company discovers exceptional talent through 
                data-driven insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              InternMatch AI was born from a simple observation: the traditional internship 
              recruitment process was broken. Students spent countless hours searching for 
              opportunities that matched their skills, while companies struggled to find the 
              right talent from thousands of applications.
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Founded in 2024 by a team of passionate engineers and educators, we set out to 
              create a solution that would benefit both students and recruiters. By leveraging 
              the power of machine learning and natural language processing, we developed an 
              intelligent matching system that understands the nuances of skills, preferences, 
              and requirements.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we're proud to serve thousands of students and hundreds of companies, 
              facilitating meaningful connections that launch careers and drive innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={Heart}
              title="Student-Centric"
              description="We put students first, ensuring every feature is designed to make their journey easier and more successful."
              color="red"
            />
            <ValueCard
              icon={Shield}
              title="Trust & Transparency"
              description="We believe in honest communication and transparent processes, building trust with every interaction."
              color="blue"
            />
            <ValueCard
              icon={Zap}
              title="Innovation"
              description="We continuously improve our AI algorithms and platform features to stay ahead of the curve."
              color="yellow"
            />
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactStat number="10,000+" label="Students Placed" />
            <ImpactStat number="500+" label="Partner Companies" />
            <ImpactStat number="95%" label="Match Accuracy" />
            <ImpactStat number="4.8/5" label="User Rating" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            A diverse group of experts passionate about education and technology
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              name="Dr. Amit Verma"
              role="CEO & Co-Founder"
              image="/api/placeholder/300/300"
              bio="PhD in Machine Learning, Former Google Research Scientist"
            />
            <TeamMember
              name="Sneha Kapoor"
              role="CTO & Co-Founder"
              image="/api/placeholder/300/300"
              bio="Ex-Microsoft Engineer, AI/ML Expert"
            />
            <TeamMember
              name="Rajesh Patel"
              role="Head of Product"
              image="/api/placeholder/300/300"
              bio="10+ years in EdTech, Former Amazon Product Manager"
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Powered by Cutting-Edge Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TechCard name="React" description="Frontend Framework" />
            <TechCard name="Node.js" description="Backend Runtime" />
            <TechCard name="TensorFlow" description="Machine Learning" />
            <TechCard name="MongoDB" description="Database" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Shaping the Future of Recruitment
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Whether you're a student seeking opportunities or a company looking for talent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register?role=student"
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Your Journey
            </a>
            <a
              href="/contact"
              className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-800 transition-colors border-2 border-white"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component: Value Card
const ValueCard = ({ icon: Icon, title, description, color }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color]} mb-6`}>
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// Component: Impact Stat
const ImpactStat = ({ number, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
    <div className="text-lg text-blue-100">{label}</div>
  </div>
);

// Component: Team Member
const TeamMember = ({ name, role, image, bio }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-blue-600 font-semibold mb-3">{role}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  </div>
);

// Component: Tech Card
const TechCard = ({ name, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
    <div className="text-2xl font-bold text-gray-900 mb-2">{name}</div>
    <div className="text-gray-600">{description}</div>
  </div>
);

export default About;