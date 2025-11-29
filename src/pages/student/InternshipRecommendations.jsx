import React, { useEffect, useState } from "react";
import { Search, Filter, Briefcase, MapPin, Clock, SlidersHorizontal } from "lucide-react";
import { useStudent } from "../../context/StudentContext";
import InternshipCard from "../../components/cards/InternshipCard";
import Loader from "../../components/common/Loader";

export default function InternshipRecommendations() {
  const { recommendations, loading, fetchRecommendations } = useStudent();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    duration: "",
    minMatch: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Sample data
  const internships = recommendations.length > 0 ? recommendations : [
    {
      id: 1,
      title: "Machine Learning Engineer Intern",
      company: "TechCorp AI",
      location: "Remote",
      duration: "3 months",
      stipend: "₹25,000/month",
      deadline: "Dec 30, 2024",
      matchScore: 92,
      skills: ["Python", "TensorFlow", "Machine Learning", "SQL"],
      description: "Work on cutting-edge ML models and deploy them to production...",
    },
    {
      id: 2,
      title: "Full Stack Developer Intern",
      company: "StartupXYZ",
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹30,000/month",
      deadline: "Jan 15, 2025",
      matchScore: 87,
      skills: ["React", "Node.js", "MongoDB", "JavaScript"],
      description: "Build and maintain web applications using modern technologies...",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "DataInsights Co",
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹20,000/month",
      deadline: "Jan 5, 2025",
      matchScore: 85,
      skills: ["Python", "SQL", "Tableau", "Excel"],
      description: "Analyze business data and create actionable insights...",
    },
    {
      id: 4,
      title: "Frontend Developer Intern",
      company: "DesignHub",
      location: "Remote",
      duration: "3 months",
      stipend: "₹22,000/month",
      deadline: "Dec 28, 2024",
      matchScore: 78,
      skills: ["React", "TypeScript", "CSS", "Figma"],
      description: "Create beautiful and responsive user interfaces...",
    },
  ];

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = 
      !filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesMinMatch = internship.matchScore >= filters.minMatch;

    return matchesSearch && matchesLocation && matchesMinMatch;
  });

  if (loading) return <Loader size="lg" text="Finding best matches..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <Briefcase className="mr-3 text-cyan-400" />
          Internship Recommendations
        </h1>
        <p className="text-white/60">
          AI-powered internship matches based on your skills and preferences.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
          <input
            type="text"
            placeholder="Search internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition"
        >
          <SlidersHorizontal size={20} className="mr-2" />
          Filters
        </button>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Location</label>
              <input
                type="text"
                placeholder="e.g., Remote, Bangalore"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">All</option>
                <option value="1-3">1-3 months</option>
                <option value="3-6">3-6 months</option>
                <option value="6+">6+ months</option>
              </select>
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">
                Minimum Match: {filters.minMatch}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minMatch}
                onChange={(e) => setFilters({ ...filters, minMatch: parseInt(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-white/60">
        Found <span className="text-cyan-400 font-semibold">{filteredInternships.length}</span> matching internships
      </p>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInternships.map((internship) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            showMatchScore={true}
            onApply={(id) => alert(`Applied to internship ${id}`)}
          />
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <Briefcase size={48} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No internships match your criteria.</p>
          <p className="text-white/40 text-sm">Try adjusting your </p>
        </div>
        )
      }
    </div>
  );
}
