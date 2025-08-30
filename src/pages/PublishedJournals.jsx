import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaSearch, FaFilter, FaCalendarAlt, FaUsers, FaTags } from 'react-icons/fa';
import PublishedJournalCard from '../components/PublishedJournalCard';
import VolumeSelector from '../components/VolumeSelector';
import { toast } from 'react-hot-toast';

const PublishedJournals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedQuarter, setSelectedQuarter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [totalJournals, setTotalJournals] = useState(0);
    const [quarterlyStats, setQuarterlyStats] = useState([]);

    // Fetch published journals
    const fetchJournals = async (page = 1, quarter = 'all', search = '') => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '12'
            });

            if (quarter !== 'all') {
                params.append('quarter', quarter);
            }

            if (search.trim()) {
                params.append('search', search.trim());
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals?${params}`);
            const data = await response.json();

            if (data.success) {
                setJournals(data.data.journals);
                setCurrentPage(data.data.currentPage);
                setTotalPages(data.data.totalPages);
                setCurrentYear(data.data.currentYear);
                setTotalJournals(data.data.totalJournals);
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

    // Fetch statistics
    const fetchStats = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/stats/overview`);
            const data = await response.json();

            if (data.success) {
                setQuarterlyStats(data.data.quarterlyStats);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchJournals(1, selectedQuarter, searchQuery);
        fetchStats();
    }, [selectedQuarter]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchJournals(1, selectedQuarter, searchQuery);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchJournals(page, selectedQuarter, searchQuery);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleQuarterChange = (quarter) => {
        setSelectedQuarter(quarter);
        setCurrentPage(1);
    };

    const getQuarterName = (quarter) => {
        const quarters = {
            1: 'Q1 (Jan-Mar)',
            2: 'Q2 (Apr-Jun)',
            3: 'Q3 (Jul-Sep)',
            4: 'Q4 (Oct-Dec)'
        };
        return quarters[quarter] || `Quarter ${quarter}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Published Journals {currentYear}
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Explore our collection of peer-reviewed agricultural research publications
                        </p>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-2xl font-bold">{totalJournals}</div>
                                <div className="text-sm opacity-90">Total Published</div>
                            </div>
                            {quarterlyStats.map((stat) => (
                                <div key={stat._id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl font-bold">{stat.count}</div>
                                    <div className="text-sm opacity-90">{getQuarterName(stat._id)}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search journals by title, author, or keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Search
                            </button>
                        </form>

                        {/* Volume Selector */}
                        <VolumeSelector
                            selectedQuarter={selectedQuarter}
                            onQuarterChange={handleQuarterChange}
                            currentYear={currentYear}
                        />
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-gray-600">
                        Showing {journals.length} of {totalJournals} journals
                        {selectedQuarter !== 'all' && (
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {getQuarterName(selectedQuarter)}
                            </span>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.location.href = '/journal-archive'}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <FaCalendarAlt />
                            View Archive
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                )}

                {/* Journals Grid */}
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    >
                        {journals.map((journal, index) => (
                            <motion.div
                                key={journal._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <PublishedJournalCard journal={journal} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && journals.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No journals found</h3>
                        <p className="text-gray-500">
                            {searchQuery ? 'Try adjusting your search terms' : 'No journals published yet for this period'}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === page
                                            ? 'bg-green-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublishedJournals;
