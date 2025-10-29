import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaSearch, FaCalendarAlt, FaArchive } from 'react-icons/fa';
import PublishedJournalCard from '../components/PublishedJournalCard';
import { toast } from 'react-hot-toast';

const PublishedJournalArchive = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');
    const [availableYears, setAvailableYears] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJournals, setTotalJournals] = useState(0);
    const [selectedQuarter, setSelectedQuarter] = useState('all');

    // Fetch available years
    const fetchAvailableYears = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/stats/overview`);
            const data = await response.json();
            
            if (data.success && data.data.availableYears) {
                setAvailableYears(data.data.availableYears);
                if (data.data.availableYears.length > 0) {
                    setSelectedYear(data.data.availableYears[0].toString());
                }
            }
        } catch (error) {
            console.error('Error fetching available years:', error);
        }
    };

    // Fetch archived journals
    const fetchArchivedJournals = async (year, page = 1, quarter = 'all') => {
        if (!year) return;
        
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '12'
            });

            if (quarter !== 'all') {
                params.append('quarter', quarter);
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/archive/${year}?${params}`);
            const data = await response.json();

            if (data.success) {
                setJournals(data.data.journals);
                setCurrentPage(data.data.currentPage);
                setTotalPages(data.data.totalPages);
                setTotalJournals(data.data.totalJournals);
            } else {
                toast.error(data.message || 'Failed to fetch archived journals');
            }
        } catch (error) {
            console.error('Error fetching archived journals:', error);
            toast.error('Failed to fetch archived journals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvailableYears();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            setCurrentPage(1);
            fetchArchivedJournals(selectedYear, 1, selectedQuarter);
        }
    }, [selectedYear, selectedQuarter]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleQuarterChange = (quarter) => {
        setSelectedQuarter(quarter);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchArchivedJournals(selectedYear, page, selectedQuarter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <FaArchive className="text-6xl mx-auto mb-4 opacity-80" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Published Journal Archive
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Explore our historical collection of published research
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Year and Quarter Selector */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-gray-500" />
                                <label className="text-sm font-medium text-gray-700">Select Year:</label>
                            </div>
                            <select
                                value={selectedYear}
                                onChange={(e) => handleYearChange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                                <option value="">Choose a year</option>
                                {availableYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        {selectedYear && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">Quarter:</span>
                                <div className="flex gap-1">
                                    {['all', '1', '2', '3', '4'].map((quarter) => (
                                        <button
                                            key={quarter}
                                            onClick={() => handleQuarterChange(quarter)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                                selectedQuarter === quarter
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {quarter === 'all' ? 'All' : `Q${quarter}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedYear && (
                        <div className="mt-4 text-sm text-gray-600">
                            Showing {totalJournals} archived journals for {selectedYear}
                            {selectedQuarter !== 'all' && ` - ${getQuarterName(selectedQuarter)}`}
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                )}

                {/* Journals Grid */}
                {!loading && journals.length > 0 && (
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
                {!loading && journals.length === 0 && selectedYear && (
                    <div className="text-center py-12">
                        <FaArchive className="text-gray-400 text-6xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No archived journals found</h3>
                        <p className="text-gray-500">
                            No journals were published in {selectedYear}
                            {selectedQuarter !== 'all' && ` during ${getQuarterName(selectedQuarter)}`}
                        </p>
                    </div>
                )}

                {/* No Year Selected */}
                {!selectedYear && (
                    <div className="text-center py-12">
                        <FaCalendarAlt className="text-gray-400 text-6xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Year</h3>
                        <p className="text-gray-500">
                            Choose a year from the dropdown above to view archived journals
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
                                            ? 'bg-red-600 text-white'
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

export default PublishedJournalArchive;
