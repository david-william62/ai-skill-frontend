import api from './api';

export const resumeService = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    return api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  parse: async (resumeId) => {
    return api.get(`/resume/parse/${resumeId}`);
  },

  getExtractedSkills: async () => {
    return api.get('/resume/skills');
  },

  downloadResume: async () => {
    return api.get('/resume/download', {
      responseType: 'blob',
    });
  },
};