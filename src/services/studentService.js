import api from './api';

export const studentService = {
  getProfile: async () => {
    return api.get('/student/profile');
  },

  updateProfile: async (profileData) => {
    return api.put('/student/profile', profileData);
  },

  getSkills: async () => {
    return api.get('/student/skills');
  },

  updateSkills: async (skills) => {
    return api.put('/student/skills', { skills });
  },

  getQuizzes: async () => {
    return api.get('/student/quizzes');
  },

  getQuizById: async (quizId) => {
    return api.get(`/student/quizzes/${quizId}`);
  },

  submitQuiz: async (quizId, answers) => {
    return api.post(`/student/quizzes/${quizId}/submit`, { answers });
  },

  getQuizResults: async () => {
    return api.get('/student/quiz-results');
  },

  applyToInternship: async (internshipId) => {
    return api.post(`/student/apply/${internshipId}`);
  },

  getApplications: async () => {
    return api.get('/student/applications');
  },
};