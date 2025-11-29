import api from './api';

export const recommendationService = {
  getRecommendations: async () => {
    return api.get('/recommendations');
  },

  getRecommendationById: async (id) => {
    return api.get(`/recommendations/${id}`);
  },

  getSkillGap: async (internshipId) => {
    return api.get(`/recommendations/skill-gap/${internshipId}`);
  },

  getMatchScore: async (internshipId) => {
    return api.get(`/recommendations/match-score/${internshipId}`);
  },

  getLearningResources: async (skill) => {
    return api.get(`/recommendations/resources/${skill}`);
  },
};