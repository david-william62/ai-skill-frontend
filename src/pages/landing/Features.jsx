import React from 'react';
import { 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp,
  Users,
  Target,
  Award,
  Search,
  BarChart2,
  CheckCircle,
  Cpu,
  Globe
} from 'lucide-react';

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Smart Matching
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover how our AI-powered platform revolutionizes internship recruitment
            </p>
          </div>
        </div>
      </section>

      {/* AI Matching Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold mb-6">
                <Brain className="mr-2" size={20} />
                AI-Powered
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Intelligent Matching Algorithm
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our advanced machine learning algorithm analyzes multiple factors including skills, 
                experience, preferences, and company requirements to create perfect matches.
              </p>
              <div className="space-y-4">
                <FeaturePoint text="95%+ matching accuracy" />
                <FeaturePoint text="Real-time profile analysis" />
                <FeaturePoint text="Continuous learning and improvement" />
                <FeaturePoint text="Personalized recommendations" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
              <img 
                src="/api/placeholder/500/400" 
                alt="AI Matching" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive features designed for both students and recruiters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="Smart Search"
              description="Advanced filters and AI-powered search to find exactly what you're looking for in seconds."
              color="blue"
            />
            <FeatureCard
              icon={Target}
              title="Precise Matching"
              description="Get matched with opportunities that align with your skills, interests, and career goals."
              color="green"
            />
            <FeatureCard
              icon={Shield}
              title="Verified Companies"
              description="All companies are verified and vetted to ensure legitimate opportunities for students."
              color="purple"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Career Insights"
              description="Access analytics and insights about market trends, salary ranges, and career paths."
              color="orange"
            />
            <FeatureCard
              icon={Users}
              title="Easy Application"
              description="Apply to multiple internships with a single click using your saved profile."
              color="pink"
            />
            <FeatureCard
              icon={Award}
              title="Skill Assessment"
              description="Take skill tests and earn badges to showcase your expertise to recruiters."
              color="indigo"
            />
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Features for Students
            </h2>
            <p className="text-xl text-gray-600">
              Tools designed to accelerate your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StudentFeature
              icon={Cpu}
              title="AI Resume Builder"
              description="Create ATS-friendly resumes with AI-powered suggestions and templates tailored to your target roles."
            />
            <StudentFeature
              icon={BarChart2}
              title="Application Tracker"
              description="Keep track of all your applications in one place with status updates and reminders."
            />
            <StudentFeature
              icon={Brain}
              title="Skill Gap Analysis"
              description="Identify skills you need to develop based on your target roles and industry trends."
            />
            <StudentFeature
              icon={Globe}
              title="Remote Opportunities"
              description="Access internships from companies worldwide with our global remote work filter."
            />
          </div>
        </div>
      </section>

      {/* For Recruiters Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Features for Recruiters
            </h2>
            <p className="text-xl text-gray-600">
              Streamline your hiring process with powerful tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecruiterFeature
              icon={Users}
              title="Candidate Pool"
              description="Access a vast pool of pre-screened, qualified candidates actively seeking internships."
            />
            <RecruiterFeature
              icon={Target}
              title="Smart Filtering"
              description="Use AI-powered filters to quickly identify candidates that match your requirements."
            />
            <RecruiterFeature
              icon={BarChart2}
              title="Analytics Dashboard"
              description="Track application metrics, candidate quality, and hiring funnel performance."
            />
            <RecruiterFeature
              icon={Zap}
              title="Quick Shortlisting"
              description="Automated shortlisting based on your criteria saves hours of manual screening."
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600">
              Leveraging the latest in AI and web technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechStack name="Machine Learning" description="TensorFlow & scikit-learn" />
            <TechStack name="Natural Language Processing" description="Advanced text analysis" />
            <TechStack name="Cloud Computing" description="Scalable infrastructure" />
            <TechStack name="Real-time Updates" description="WebSocket technology" />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Data is Safe With Us
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                We take security seriously and implement industry-leading practices 
                to protect your information.
              </p>
              <div className="space-y-4">
                <SecurityFeature text="End-to-end encryption" />
                <SecurityFeature text="GDPR compliant" />
                <SecurityFeature text="Regular security audits" />
                <SecurityFeature text="Secure payment processing" />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8">
              <Shield className="mx-auto mb-6 text-white" size={100} />
              <p className="text-center text-lg text-blue-100">
                256-bit SSL encryption protecting all your data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students and companies already benefiting from our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register?role=student"
              className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="/demo"
              className="bg-gray-200 text-gray-900 font-semibold py-4 px-8 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component: Feature Point
const FeaturePoint = ({ text }) => (
  <div className="flex items-center">
    <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={24} />
    <span className="text-gray-700 text-lg">{text}</span>
  </div>
);

// Component: Feature Card
const FeatureCard = ({ icon: Icon, title, description, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color]} mb-6`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// Component: Student Feature
const StudentFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Component: Recruiter Feature
const RecruiterFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="bg-green-100 text-green-600 p-3 rounded-lg flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Component: Tech Stack
const TechStack = ({ name, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
    <div className="text-lg font-bold text-gray-900 mb-2">{name}</div>
    <div className="text-sm text-gray-600">{description}</div>
  </div>
);

// Component: Security Feature
const SecurityFeature = ({ text }) => (
  <div className="flex items-center">
    <CheckCircle className="text-blue-200 mr-3 flex-shrink-0" size={24} />
    <span className="text-lg">{text}</span>
  </div>
);

export default Features;