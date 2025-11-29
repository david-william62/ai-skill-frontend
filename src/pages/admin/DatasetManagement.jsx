import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  Trash2,
  RefreshCw,
  Database,
  Check,
  X,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

const DatasetManagement = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/datasets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setDatasets(data);
    } catch (error) {
      console.error('Error fetching datasets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('dataset', file);
    formData.append('type', type);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/datasets/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        alert('Dataset uploaded successfully');
        fetchDatasets();
        setShowUploadModal(false);
      } else {
        alert('Failed to upload dataset');
      }
    } catch (error) {
      console.error('Error uploading dataset:', error);
      alert('An error occurred during upload');
    }
  };

  const handleDeleteDataset = async (datasetId) => {
    if (!window.confirm('Are you sure you want to delete this dataset?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/datasets/${datasetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setDatasets(datasets.filter(d => d._id !== datasetId));
        alert('Dataset deleted successfully');
      } else {
        alert('Failed to delete dataset');
      }
    } catch (error) {
      console.error('Error deleting dataset:', error);
    }
  };

  const handleProcessDataset = async (datasetId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/datasets/${datasetId}/process`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Dataset processing started');
        fetchDatasets();
      } else {
        alert('Failed to process dataset');
      }
    } catch (error) {
      console.error('Error processing dataset:', error);
    }
  };

  const exportDataset = async (datasetId, filename) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/datasets/${datasetId}/export`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
    } catch (error) {
      console.error('Error exporting dataset:', error);
    }
  };

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || dataset.type === filterType;
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
            <h1 className="text-3xl font-bold text-gray-900">Dataset Management</h1>
            <p className="text-gray-600 mt-2">Manage training datasets for the ML model</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload size={20} className="mr-2" />
            Upload Dataset
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Datasets</p>
                <p className="text-2xl font-bold text-gray-900">{datasets.length}</p>
              </div>
              <Database className="text-blue-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Processed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {datasets.filter(d => d.status === 'processed').length}
                </p>
              </div>
              <Check className="text-green-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Processing</p>
                <p className="text-2xl font-bold text-gray-900">
                  {datasets.filter(d => d.status === 'processing').length}
                </p>
              </div>
              <RefreshCw className="text-yellow-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Failed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {datasets.filter(d => d.status === 'failed').length}
                </p>
              </div>
              <X className="text-red-600" size={32} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="internship">Internship Data</option>
              <option value="student">Student Data</option>
              <option value="application">Application Data</option>
              <option value="training">Training Data</option>
            </select>
          </div>
        </div>

        {/* Datasets Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dataset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Records
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDatasets.map((dataset) => (
                <tr key={dataset._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="text-blue-600 mr-3" size={20} />
                      <div className="text-sm font-medium text-gray-900">{dataset.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {dataset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {dataset.recordCount?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      dataset.status === 'processed' ? 'bg-green-100 text-green-800' :
                      dataset.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      dataset.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {dataset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(dataset.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {dataset.status === 'uploaded' && (
                        <button
                          onClick={() => handleProcessDataset(dataset._id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Process Dataset"
                        >
                          <RefreshCw size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => exportDataset(dataset._id, dataset.name)}
                        className="text-green-600 hover:text-green-900"
                        title="Export Dataset"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteDataset(dataset._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Dataset"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDatasets.length === 0 && (
            <div className="text-center py-12">
              <Database className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No datasets found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by uploading a new dataset
              </p>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <UploadDatasetModal
            onClose={() => setShowUploadModal(false)}
            onUpload={handleFileUpload}
          />
        )}
      </div>
    </div>
  );
};

// Upload Dataset Modal Component
const UploadDatasetModal = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [datasetType, setDatasetType] = useState('internship');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    setUploading(true);
    await onUpload(file, datasetType);
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Dataset</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dataset Type
              </label>
              <select
                value={datasetType}
                onChange={(e) => setDatasetType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="internship">Internship Data</option>
                <option value="student">Student Data</option>
                <option value="application">Application Data</option>
                <option value="training">Training Data</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".csv,.json"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV or JSON up to 10MB</p>
                  {file && (
                    <p className="text-sm text-green-600 mt-2">Selected: {file.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="text-yellow-600 mr-2" size={20} />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Important:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Ensure data is properly formatted</li>
                    <li>Remove any sensitive information</li>
                    <li>Verify data quality before upload</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatasetManagement;