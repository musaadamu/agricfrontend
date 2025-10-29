import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaEye, 
    FaEdit, 
    FaTrash, 
    FaCheck, 
    FaTimes, 
    FaSearch, 
    FaFilter,
    FaDownload,
    FaClipboardList
} from 'react-icons/fa';
import AdminReviewPanel from '../components/AdminReviewPanel';
import { toast } from 'react-hot-toast';

const ManagePublishedJournals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('submitted');
    const [selectedJournals, setSelectedJournals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusCounts, setStatusCounts] = useState({});
    const [showReviewPanel, setShowReviewPanel] = useState(false);
    const [selectedJournal, setSelectedJournal] = useState(null);

    const tabs = [
        { id: 'submitted', label: 'Submitted', color: 'red' },
        { id: 'under_review', label: 'Under Review', color: 'yellow' },
        { id: 'accepted', label: 'Accepted', color: 'green' },
        { id: 'published', label: 'Published', color: 'purple' },
        { id: 'rejected', label: 'Rejected', color: 'red' }
    ];

    // Fetch journals based on status
    const fetchJournals = async (status = 'submitted', page = 1, search = '') => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                status: status === 'all' ? 'all' : status
            });

            if (search.trim()) {
                params.append('search', search.trim());
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/admin/pending?${params}`);
            const data = await response.json();

            if (data.success) {
                setJournals(data.data.journals);
                setCurrentPage(data.data.currentPage);
                setTotalPages(data.data.totalPages);
                setStatusCounts(data.data.statusCounts || {});
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

    useEffect(() => {
        fetchJournals(activeTab, 1, searchQuery);
    }, [activeTab]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setCurrentPage(1);
        setSelectedJournals([]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchJournals(activeTab, 1, searchQuery);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchJournals(activeTab, page, searchQuery);
    };

    // Handle journal selection
    const handleJournalSelect = (journalId) => {
        setSelectedJournals(prev => 
            prev.includes(journalId) 
                ? prev.filter(id => id !== journalId)
                : [...prev, journalId]
        );
    };

    const handleSelectAll = () => {
        if (selectedJournals.length === journals.length) {
            setSelectedJournals([]);
        } else {
            setSelectedJournals(journals.map(j => j._id));
        }
    };

    // Update journal status
    const updateJournalStatus = async (journalId, newStatus, reviewNotes = '') => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/${journalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    review_notes: reviewNotes,
                    reviewed_by: 'Admin' // You can get this from user context
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`Journal ${newStatus} successfully`);
                fetchJournals(activeTab, currentPage, searchQuery);
            } else {
                toast.error(data.message || 'Failed to update journal');
            }
        } catch (error) {
            console.error('Error updating journal:', error);
            toast.error('Failed to update journal');
        }
    };

    // Bulk update journals
    const handleBulkUpdate = async (newStatus) => {
        if (selectedJournals.length === 0) {
            toast.error('Please select journals to update');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/bulk-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    journalIds: selectedJournals,
                    updateData: {
                        status: newStatus,
                        reviewed_by: 'Admin'
                    }
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`${data.data.modifiedCount} journals updated successfully`);
                setSelectedJournals([]);
                fetchJournals(activeTab, currentPage, searchQuery);
            } else {
                toast.error(data.message || 'Failed to update journals');
            }
        } catch (error) {
            console.error('Error updating journals:', error);
            toast.error('Failed to update journals');
        }
    };

    // Publish journal
    const handlePublish = async (journalId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/publish/${journalId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reviewed_by: 'Admin'
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Journal published successfully');
                fetchJournals(activeTab, currentPage, searchQuery);
            } else {
                toast.error(data.message || 'Failed to publish journal');
            }
        } catch (error) {
            console.error('Error publishing journal:', error);
            toast.error('Failed to publish journal');
        }
    };

    // Delete journal
    const handleDelete = async (journalId) => {
        if (!confirm('Are you sure you want to delete this journal? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/${journalId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Journal deleted successfully');
                fetchJournals(activeTab, currentPage, searchQuery);
            } else {
                toast.error(data.message || 'Failed to delete journal');
            }
        } catch (error) {
            console.error('Error deleting journal:', error);
            toast.error('Failed to delete journal');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            submitted: 'bg-red-100 text-red-800',
            under_review: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-green-100 text-green-800',
            published: 'bg-purple-100 text-purple-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <FaClipboardList className="text-5xl mx-auto mb-4 opacity-80" />
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Manage Published Journals
                        </h1>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            Review, approve, and manage journal submissions
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                    {statusCounts[tab.id] && (
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                            activeTab === tab.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {statusCounts[tab.id]}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Search and Actions */}
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                                <div className="relative flex-1">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search journals by title, author, or keywords..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Search
                                </button>
                            </form>

                            {/* Bulk Actions */}
                            {selectedJournals.length > 0 && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleBulkUpdate('under_review')}
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                    >
                                        Mark as Under Review
                                    </button>
                                    <button
                                        onClick={() => handleBulkUpdate('accepted')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleBulkUpdate('rejected')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                )}

                {/* Journals Table */}
                {!loading && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedJournals.length === journals.length && journals.length > 0}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Authors
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {journals.map((journal) => (
                                        <tr key={journal._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedJournals.includes(journal._id)}
                                                    onChange={() => handleJournalSelect(journal._id)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                                    {journal.title}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-1">
                                                    Volume {journal.volume_year} - Q{journal.volume_quarter}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {journal.authors && journal.authors.length > 0 
                                                        ? journal.authors.slice(0, 2).join(', ')
                                                        : 'Unknown'
                                                    }
                                                    {journal.authors && journal.authors.length > 2 && (
                                                        <span className="text-gray-500"> +{journal.authors.length - 2} more</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(journal.status)}`}>
                                                    {journal.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(journal.submission_date)}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedJournal(journal);
                                                            setShowReviewPanel(true);
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        title="Review"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    
                                                    {journal.status === 'accepted' && (
                                                        <button
                                                            onClick={() => handlePublish(journal._id)}
                                                            className="text-purple-600 hover:text-purple-900"
                                                            title="Publish"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    )}
                                                    
                                                    <button
                                                        onClick={() => handleDelete(journal._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {journals.length === 0 && (
                            <div className="text-center py-12">
                                <FaClipboardList className="text-gray-400 text-6xl mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">No journals found</h3>
                                <p className="text-gray-500">
                                    {searchQuery ? 'Try adjusting your search terms' : `No journals with status "${activeTab}"`}
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing page {currentPage} of {totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Review Panel Modal */}
            {showReviewPanel && selectedJournal && (
                <AdminReviewPanel
                    journal={selectedJournal}
                    onClose={() => {
                        setShowReviewPanel(false);
                        setSelectedJournal(null);
                    }}
                    onUpdate={(journalId, status, notes) => {
                        updateJournalStatus(journalId, status, notes);
                        setShowReviewPanel(false);
                        setSelectedJournal(null);
                    }}
                />
            )}
        </div>
    );
};

export default ManagePublishedJournals;
