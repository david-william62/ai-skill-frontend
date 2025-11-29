import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  Calendar, 
  DollarSign,
  Users,
  Search,
  Filter,
  Plus
} from 'lucide-react';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/recruiter/internships', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setInternships(data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/recruiter/internships/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setInternships(internships.filter(int => int._id !== id));
        alert('Internship deleted successfully');
      } else {
        alert('Failed to delete internship');
      }
    } catch (error) {
      console.error('Error deleting internship:', error);
      alert('An error occurred');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/recruiter/internships/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setInternships(internships.map(int => 
          int._id === id ? { ...int, status: newStatus } : int
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || internship.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Internships</h1>
            <p className="text-gray-600 mt-2">Manage your internship postings</p>
          </div>
          <Link
            to="/recruiter/post-internship"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Post New Internship
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Internships List */}
        {filteredInternships.length > 0 ? (
          <div className="space-y-4">
            {filteredInternships.map((internship) => (
              <div key={internship._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {internship.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          internship.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : internship.status === 'closed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {internship.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{internship.company}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-gray-400" />
                          {internship.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          {internship.duration}
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-2 text-gray-400" />
                          ₹{internship.stipend}/month
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-gray-400" />
                          {internship.applicationsCount || 0} applications
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {internship.skills?.slice(0, 5).map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => window.location.href = `/recruiter/internships/${internship._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => window.location.href = `/recruiter/internships/${internship._id}/edit`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(internship._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Posted on {new Date(internship.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={internship.status}
                        onChange={(e) => handleStatusChange(internship._id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                      </select>
                      <Link
                        to={`/recruiter/internships/${internship._id}/applications`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Applications ({internship.applicationsCount || 0})
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Briefcase size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by posting your first internship'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/recruiter/post-internship"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Post Your First Internship
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipList;