import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Users, Calendar, Tag, Save, X } from 'lucide-react';
import PublishedJournalNavigation from '../components/PublishedJournalNavigation';
import { toast } from 'react-hot-toast';

const PublishedJournalUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: [''],
    keywords: [''],
    volume_year: new Date().getFullYear(),
    volume_quarter: Math.ceil((new Date().getMonth() + 1) / 3),
    submitted_by: '',
    status: 'published'
  });
  const [files, setFiles] = useState({
    manuscript: null,
    supplementary: []
  });
  const [loading, setLoading] = useState(false);

  const storedUser = localStorage.getItem('authUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === 'manuscript') {
      setFiles(prev => ({ ...prev, manuscript: selectedFiles[0] }));
    } else if (name === 'supplementary') {
      setFiles(prev => ({ ...prev, supplementary: Array.from(selectedFiles) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      
      // Add form data
      submitData.append('title', formData.title);
      submitData.append('abstract', formData.abstract);
      submitData.append('authors', JSON.stringify(formData.authors.filter(a => a.trim())));
      submitData.append('keywords', JSON.stringify(formData.keywords.filter(k => k.trim())));
      submitData.append('volume_year', formData.volume_year);
      submitData.append('volume_quarter', formData.volume_quarter);
      submitData.append('submitted_by', formData.submitted_by);
      submitData.append('status', formData.status);

      // Add files
      if (files.manuscript) {
        submitData.append('manuscript', files.manuscript);
      }
      
      files.supplementary.forEach((file, index) => {
        submitData.append(`supplementary_${index}`, file);
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/admin/upload`, {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Journal uploaded successfully!');
        // Reset form
        setFormData({
          title: '',
          abstract: '',
          authors: [''],
          keywords: [''],
          volume_year: new Date().getFullYear(),
          volume_quarter: Math.ceil((new Date().getMonth() + 1) / 3),
          submitted_by: '',
          status: 'published'
        });
        setFiles({ manuscript: null, supplementary: [] });
      } else {
        toast.error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const quarters = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublishedJournalNavigation user={user} />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Published Journal</h1>
            <p className="text-xl text-gray-600">
              Add a new journal directly to the published collection
            </p>
          </motion.div>

          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="text-blue-600" />
                  Basic Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Journal Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter journal title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Abstract *
                  </label>
                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter journal abstract..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submitted By
                  </label>
                  <input
                    type="text"
                    name="submitted_by"
                    value={formData.submitted_by}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter submitter name..."
                  />
                </div>
              </div>

              {/* Authors */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="text-green-600" />
                  Authors
                </h3>
                {formData.authors.map((author, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'authors')}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Author ${index + 1}`}
                    />
                    {formData.authors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'authors')}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('authors')}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  + Add Author
                </button>
              </div>

              {/* Keywords */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Tag className="text-purple-600" />
                  Keywords
                </h3>
                {formData.keywords.map((keyword, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'keywords')}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Keyword ${index + 1}`}
                    />
                    {formData.keywords.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'keywords')}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('keywords')}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  + Add Keyword
                </button>
              </div>

              {/* Volume Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="text-orange-600" />
                  Volume Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      name="volume_year"
                      value={formData.volume_year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quarter
                    </label>
                    <select
                      name="volume_quarter"
                      value={formData.volume_quarter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {quarters.map(quarter => (
                        <option key={quarter} value={quarter}>Q{quarter}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Upload className="text-indigo-600" />
                  Files
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manuscript File *
                  </label>
                  <input
                    type="file"
                    name="manuscript"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplementary Files (Optional)
                  </label>
                  <input
                    type="file"
                    name="supplementary"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc,.xlsx,.csv"
                    multiple
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Upload Journal
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublishedJournalUpload;
