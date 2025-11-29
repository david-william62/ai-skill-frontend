import React, { createContext, useContext, useState, useCallback } from 'react';
import { studentService } from '../services/studentService';
import { resumeService } from '../services/resumeService';
import { recommendationService } from '../services/RecommendationService';

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [skillGap, setSkillGap] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateResumeData = useCallback((data) => {
    setResumeData(data);
    if (Array.isArray(data?.skills) && data.skills.length) {
      setSkills(data.skills);
    } else if (Array.isArray(data?.extractedSkills) && data.extractedSkills.length) {
      setSkills(data.extractedSkills);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await studentService.getProfile();
      setProfile(data);
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (profileData) => {
    try {
      const updated = await studentService.updateProfile(profileData);
      setProfile(updated);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const uploadResume = async (file) => {
    try {
      const result = await resumeService.upload(file);
      const extracted = result?.extractedSkills || result?.skills || [];
      if (extracted.length) {
        setSkills(extracted);
      }
      updateResumeData(result);
      return { success: true, skills: extracted };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await recommendationService.getRecommendations();
      setRecommendations(data);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSkillGap = useCallback(async (internshipId) => {
    if (!internshipId) {
      console.warn('fetchSkillGap called without an internship identifier');
      return null;
    }

    setLoading(true);
    try {
      const data = await recommendationService.getSkillGap(internshipId);
      setSkillGap(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch skill gap:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitQuiz = async (quizId, answers) => {
    try {
      const result = await studentService.submitQuiz(quizId, answers);
      setQuizResults((prev) => [...prev, result]);
      return { success: true, result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        skills,
        recommendations,
        skillGap,
        quizResults,
        resumeData,
        loading,
        fetchProfile,
        updateProfile,
        uploadResume,
        updateResumeData,
        fetchRecommendations,
        fetchSkillGap,
        submitQuiz,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within StudentProvider');
  }
  return context;
};