import api from './api';

export const recruiterService = {
  getProfile: async () => {
    return api.get('/recruiter/profile');
  },

  updateProfile: async (profileData) => {
    return api.put('/recruiter/profile', profileData);
  },

  getInternships: async () => {
    return api.get('/recruiter/internships');
  },

  getInternshipById: async (id) => {
    return api.get(`/recruiter/internships/${id}`);
  },

  createInternship: async (internshipData) => {
    return api.post('/recruiter/internships', internshipData);
  },

  updateInternship: async (id, internshipData) => {
    return api.put(`/recruiter/internships/${id}`, internshipData);
  },

  deleteInternship: async (id) => {
    return api.delete(`/recruiter/internships/${id}`);
  },

  getShortlistedStudents: async (internshipId) => {
    return api.get(`/recruiter/internships/${internshipId}/shortlisted`);
  },

  getApplicants: async (internshipId) => {
    return api.get(`/recruiter/internships/${internshipId}/applicants`);
  },

  shortlistStudent: async (internshipId, studentId) => {
    return api.post(`/recruiter/internships/${internshipId}/shortlist`, { studentId });
  },

  rejectStudent: async (internshipId, studentId) => {
    return api.post(`/recruiter/internships/${internshipId}/reject`, { studentId });
  },
};