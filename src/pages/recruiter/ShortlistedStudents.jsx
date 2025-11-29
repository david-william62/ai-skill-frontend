import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Award, 
  Briefcase, 
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ShortlistedStudents = () => {
  const [shortlisted, setShortlisted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInternship, setFilterInternship] = useState('all');
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetchShortlistedStudents();
    fetchInternships();
  }, []);

  const fetchShortlistedStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/recruiter/shortlisted', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setShortlisted(data);
    } catch (error) {
      console.error('Error fetching shortlisted students:', error);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/recruiter/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchShortlistedStudents(); // Refresh the list
        alert(`Application ${status} successfully`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredStudents = shortlisted.filter(application => {
    const matchesSearch = 
      application.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.student?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterInternship === 'all' || 
                          application.internship?._id === filterInternship;
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shortlisted Students</h1>
          <p className="text-gray-600 mt-2">
            Manage your shortlisted candidates ({shortlisted.length})
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterInternship}
                onChange={(e) => setFilterInternship(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Internships</option>
                {internships.map(int => (
                  <option key={int._id} value={int._id}>{int.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Students List */}
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredStudents.map((application) => (
              <div key={application._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-blue-100 rounded-full p-3">
                        <User size={24} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {application.student?.name}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          Applied for: <span className="font-medium">{application.internship?.title}</span>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail size={16} className="mr-2 text-gray-400" />
                            {application.student?.email}
                          </div>
                          {application.student?.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone size={16} className="mr-2 text-gray-400" />
                              {application.student.phone}
                            </div>
                          )}
                        </div>

                        {application.student?.skills && application.student.skills.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <Award size={16} className="mr-2 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {application.student.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {application.coverLetter && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {application.coverLetter}
                            </p>
                          </div>
                        )}

                        <div className="text-sm text-gray-500">
                          Shortlisted on {new Date(application.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      {application.student?.resume && (
                        <a
                          href={application.student.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <Download size={16} className="mr-2" />
                          Resume
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-end space-x-3">
                    <button
                      onClick={() => updateApplicationStatus(application._id, 'rejected')}
                      className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application._id, 'accepted')}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No shortlisted students</h3>
            <p className="text-gray-600">
              {searchTerm || filterInternship !== 'all' 
                ? 'No students match your filters' 
                : 'Shortlisted students will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistedStudents;