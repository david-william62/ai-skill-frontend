import React, { createContext, useContext, useState, useCallback } from 'react';
import { recruiterService } from '../services/recruiterService';

const RecruiterContext = createContext(null);

export function RecruiterProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [internships, setInternships] = useState([]);
  const [shortlistedStudents, setShortlistedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await recruiterService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (profileData) => {
    try {
      const updated = await recruiterService.updateProfile(profileData);
      setProfile(updated);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const fetchInternships = useCallback(async () => {
    setLoading(true);
    try {
      const data = await recruiterService.getInternships();
      setInternships(data);
    } catch (error) {
      console.error('Failed to fetch internships:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createInternship = async (internshipData) => {
    try {
      const newInternship = await recruiterService.createInternship(internshipData);
      setInternships((prev) => [...prev, newInternship]);
      return { success: true, internship: newInternship };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateInternship = async (id, internshipData) => {
    try {
      const updated = await recruiterService.updateInternship(id, internshipData);
      setInternships((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const deleteInternship = async (id) => {
    try {
      await recruiterService.deleteInternship(id);
      setInternships((prev) => prev.filter((item) => item.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const fetchShortlisted = useCallback(async (internshipId) => {
    setLoading(true);
    try {
      const data = await recruiterService.getShortlistedStudents(internshipId);
      setShortlistedStudents(data);
    } catch (error) {
      console.error('Failed to fetch shortlisted students:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <RecruiterContext.Provider
      value={{
        profile,
        internships,
        shortlistedStudents,
        loading,
        fetchProfile,
        updateProfile,
        fetchInternships,
        createInternship,
        updateInternship,
        deleteInternship,
        fetchShortlisted,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
}

export const useRecruiter = () => {
  const context = useContext(RecruiterContext);
  if (!context) {
    throw new Error('useRecruiter must be used within RecruiterProvider');
  }
  return context;
};