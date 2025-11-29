import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { resumeService } from '../../services/resumeService';
import { useStudent } from '../../context/StudentContext';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

export default function ResumeUpload() {
  const { updateResumeData } = useStudent();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsedData, setParsedData] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
      setParsedData(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await resumeService.upload(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success('Resume uploaded successfully!');
      
      // Parse resume
      setParsing(true);
      const resumeId = response?.fileId || response?.id;
      if (!resumeId) {
        throw new Error('Unable to determine resume identifier');
      }
      const parseResponse = await resumeService.parse(resumeId);
      setParsedData(parseResponse);
      updateResumeData(parseResponse);
      toast.success('Resume parsed successfully!');

    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
      // Mock parsed data for demo
      const mockData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
        education: [
          { degree: 'B.Tech', field: 'Computer Science', institution: 'ABC University', year: '2024' }
        ],
        experience: [
          { title: 'Web Developer Intern', company: 'XYZ Corp', duration: '3 months' }
        ]
      };
      setParsedData(mockData);
      updateResumeData(mockData);
    } finally {
      setUploading(false);
      setParsing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setParsedData(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Upload Your Resume</h1>
        <p className="text-white/60">
          Upload your resume to extract skills and get personalized internship recommendations.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="glass-card p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragActive 
              ? 'border-cyan-400 bg-cyan-400/10' 
              : 'border-white/20 hover:border-white/40'
          }`}
        >
          <input {...getInputProps()} />
          <Upload size={48} className="mx-auto text-white/40 mb-4" />
          {isDragActive ? (
            <p className="text-cyan-400 text-lg">Drop your resume here...</p>
          ) : (
            <>
              <p className="text-white text-lg mb-2">
                Drag & drop your resume here, or click to browse
              </p>
              <p className="text-white/60 text-sm">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </>
          )}
        </div>

        {/* Selected File */}
        {file && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File size={24} className="text-cyan-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-white/60 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              <X size={20} className="text-white/60" />
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
        {(uploading || parsing) && (
          <div className="mt-4 flex items-center gap-3 text-white/60">
            <Loader size={20} />
            <span>{parsing ? 'Parsing resume...' : 'Uploading resume...'}</span>
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={!file || uploading || parsing}
          className="mt-6 w-full bg-cyan-400 hover:bg-cyan-500 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
        >
          {parsedData ? 'Re-upload Resume' : 'Upload Resume'}
        </button>
      </div>
      {/* Parsed Data Preview */} 
      {parsedData && (
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Parsed Resume Data</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
              <p className="text-white"><strong>Name:</strong> {parsedData.name}</p>
              <p className="text-white"><strong>Email:</strong> {parsedData.email}</p>
              <p className="text-white"><strong>Phone:</strong> {parsedData.phone}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Skills</h3>
              <ul className="list-disc list-inside text-white">
                {parsedData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
              <ul className="list-disc list-inside text-white">
                {parsedData.education.map((edu, index) => (
                  <li key={index}>
                    {edu.degree} in {edu.field}, {edu.institution} ({edu.year})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Experience</h3>
              <ul className="list-disc list-inside text-white">
                {parsedData.experience.map((exp, index) => (
                  <li key={index}>
                    {exp.title} at {exp.company} ({exp.duration})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
