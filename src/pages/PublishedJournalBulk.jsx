import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, Download, Trash2, Archive, CheckSquare, 
  Square, Search, Filter, Calendar, Users 
} from 'lucide-react';
import PublishedJournalNavigation from '../components/PublishedJournalNavigation';
import { toast } from 'react-hot-toast';

const PublishedJournalBulk = () => {
  const [journals, setJournals] = useState([]);
  const [selectedJournals, setSelectedJournals] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    quarter: '',
    status: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const storedUser = localStorage.getItem('authUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    fetchJournals();
  }, [currentPage, searchQuery, filters]);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.append(key, value);
        }
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/admin/all?${params}`);
      const data = await response.json();

      if (data.success) {
        setJournals(data.data.journals);
        setTotalPages(data.data.totalPages);
      } else {
        toast.error(data.message || 'Failed to fetch journals');
      }
    } catch (error) {
      console.error('Error fetching journals:', error);
      toast.error('Failed to fetch journals');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedJournals.size === journals.length) {
      setSelectedJournals(new Set());
    } else {
      setSelectedJournals(new Set(journals.map(j => j._id)));
    }
  };

  const handleSelectJournal = (journalId) => {
    const newSelected = new Set(selectedJournals);
    if (newSelected.has(journalId)) {
      newSelected.delete(journalId);
    } else {
      newSelected.add(journalId);
    }
    setSelectedJournals(newSelected);
  };

  const handleBulkAction = async (action) => {
    if (selectedJournals.size === 0) {
      toast.error('Please select journals first');
      return;
    }

    const confirmMessage = {
      delete: 'Are you sure you want to delete the selected journals?',
      archive: 'Are you sure you want to archive the selected journals?',
      publish: 'Are you sure you want to publish the selected journals?',
      unpublish: 'Are you sure you want to unpublish the selected journals?'
    };

    if (!window.confirm(confirmMessage[action])) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/admin/bulk-${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          journalIds: Array.from(selectedJournals)
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Successfully ${action}ed ${selectedJournals.size} journal(s)`);
        setSelectedJournals(new Set());
        fetchJournals();
      } else {
        toast.error(result.message || `Failed to ${action} journals`);
      }
    } catch (error) {
      console.error(`Bulk ${action} error:`, error);
      toast.error(`Failed to ${action} journals`);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      
      if (selectedJournals.size > 0) {
        params.append('journalIds', Array.from(selectedJournals).join(','));
      }

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.append(key, value);
        }
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/admin/export?${params}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `journals-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Export completed successfully');
      } else {
        toast.error('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed');
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const quarters = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublishedJournalNavigation user={user} />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bulk Operations</h1>
            <p className="text-xl text-gray-600">
              Manage multiple journals efficiently with bulk operations
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search journals..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={filters.quarter}
                onChange={(e) => setFilters(prev => ({ ...prev, quarter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Quarters</option>
                {quarters.map(quarter => (
                  <option key={quarter} value={quarter}>Q{quarter}</option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Bulk Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleBulkAction('delete')}
                disabled={selectedJournals.size === 0 || loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete Selected ({selectedJournals.size})
              </button>

              <button
                onClick={() => handleBulkAction('archive')}
                disabled={selectedJournals.size === 0 || loading}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Archive size={16} />
                Archive Selected
              </button>

              <button
                onClick={handleExport}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Export {selectedJournals.size > 0 ? 'Selected' : 'All'}
              </button>
            </div>
          </motion.div>

          {/* Journals Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        {selectedJournals.size === journals.length && journals.length > 0 ? (
                          <CheckSquare size={16} className="text-red-600" />
                        ) : (
                          <Square size={16} />
                        )}
                        Select All
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Authors</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Volume</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-500">Loading journals...</p>
                      </td>
                    </tr>
                  ) : journals.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        No journals found
                      </td>
                    </tr>
                  ) : (
                    journals.map((journal) => (
                      <tr key={journal._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleSelectJournal(journal._id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {selectedJournals.has(journal._id) ? (
                              <CheckSquare size={16} />
                            ) : (
                              <Square size={16} />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {journal.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 truncate max-w-xs">
                            {journal.authors?.join(', ') || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {journal.volume_year} Q{journal.volume_quarter}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            journal.status === 'published' ? 'bg-green-100 text-green-800' :
                            journal.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                            journal.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {journal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(journal.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublishedJournalBulk;
