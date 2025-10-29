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
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white py-20 shadow-2xl">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                            JOVOTE Research Collection
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
                            Peer-reviewed vocational teacher education research from leading scholars
                        </p>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/25 transition-all"
                            >
                                <div className="text-4xl font-bold mb-2">{totalJournals}</div>
                                <div className="text-sm opacity-90 font-medium">Total Published</div>
                            </motion.div>
                            {quarterlyStats.map((stat) => (
                                <motion.div
                                    key={stat._id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/25 transition-all"
                                >
                                    <div className="text-4xl font-bold mb-2">{stat.count}</div>
                                    <div className="text-sm opacity-90 font-medium">{getQuarterName(stat._id)}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-l-4 border-red-600"
                >
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="flex-1 w-full flex gap-3">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 text-lg" />
                                <input
                                    type="text"
                                    placeholder="Search by title, author, keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all font-semibold shadow-lg"
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
                </motion.div>

                {/* Results Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="text-gray-700 font-medium">
                        <span className="text-2xl font-bold text-red-600">{journals.length}</span>
                        <span className="text-gray-600"> of </span>
                        <span className="text-2xl font-bold text-red-600">{totalJournals}</span>
                        <span className="text-gray-600"> journals</span>
                        {selectedQuarter !== 'all' && (
                            <span className="ml-3 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-800 rounded-full text-sm font-semibold border border-red-200">
                                {getQuarterName(selectedQuarter)}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => window.location.href = '/published-journal-archive'}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all font-semibold flex items-center gap-2 shadow-lg"
                        >
                            <FaCalendarAlt />
                            View Archive
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">Loading journals...</p>
                        </div>
                    </div>
                )}

                {/* Journals Grid */}
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-red-200"
                    >
                        <div className="text-red-300 text-7xl mb-6">📚</div>
                        <h3 className="text-2xl font-bold text-red-900 mb-3">No journals found</h3>
                        <p className="text-red-700 text-lg">
                            {searchQuery ? 'Try adjusting your search terms or filters' : 'No journals published yet for this period'}
                        </p>
                    </motion.div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center items-center gap-3 mt-12 pb-8"
                    >
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-50 transition-all font-semibold"
                        >
                            ← Previous
                        </button>

                        <div className="flex gap-2 flex-wrap justify-center">
                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                                            currentPage === page
                                                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                                                : 'border-2 border-red-200 text-red-600 hover:bg-red-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-50 transition-all font-semibold"
                        >
                            Next →
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PublishedJournals;
