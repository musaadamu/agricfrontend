import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    FiSearch,
    FiFilter,
    FiDownload,
    FiEye,
    FiCalendar,
    FiUser,
    FiBook,
    FiChevronLeft,
    FiChevronRight,
    FiFileText,
    FiTrendingUp,
    FiAward,
    FiGlobe,
    FiAlertCircle,
    FiXCircle // Added for clear filter button
} from 'react-icons/fi';
import './JournalList.css'; // This will contain our new styles

// Import the API service and utilities
import api from '../services/api';
import { downloadFile } from '../utils/fileDownload';

// Add Cloudinary URL for direct access as a last resort
const CLOUDINARY_DIRECT_URL = 'https://res.cloudinary.com/dxnp54kf2/raw/schoolofbusiness/v1750334083/adati_draft_copy_cxwh09.docx';

const JournalList = () => {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [filteredJournals, setFilteredJournals] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJournals: 0,
        limit: 8 // Changed to 8 for better horizontal layout
    });

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        journal: 'all',
        year: 'any',
        author: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    // Define fetchJournals with useCallback to avoid dependency issues
    const fetchJournals = useCallback(async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            console.log('Fetching journals using API service');
            const response = await api.journals.getAll({
                page,
                limit: 8,
                sortBy: 'createdAt',
                order: 'desc'
            });

            console.log('API Response:', response.data);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            // Handle both array response and paginated response formats
            const journalsData = Array.isArray(response.data) ?
                response.data :
                response.data.journals || [];

            // Ensure we have valid pagination data with fallbacks for each property
            const paginationData = {
                currentPage: Number(response.data.pagination?.currentPage || page || 1),
                totalPages: Number(response.data.pagination?.totalPages || Math.ceil(journalsData.length / 8) || 1),
                totalJournals: Number(response.data.pagination?.totalJournals || journalsData.length || 0),
                limit: 8
            };

            console.log('Pagination data:', paginationData);

            setJournals(journalsData);
            setFilteredJournals(journalsData);
            setPagination(paginationData);
        } catch (err) {
            console.error('Fetch journals error:', err);
            let errorMsg = 'Failed to fetch journals';

            if (err.response) {
                errorMsg = err.response.data?.message ||
                    (err.response.status === 401 ? 'Unable to fetch all journals. Some features may require login.' :
                        err.response.status === 404 ? 'Journal endpoint not found' :
                            'Server error occurred');
            } else if (err.request) {
                errorMsg = 'Network error - unable to reach server';
            } else {
                errorMsg = err.message || 'Error fetching journals';
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJournals();
    }, [fetchJournals]);

    // Apply search and filters
    useEffect(() => {
        if (!journals.length) return;

        let results = [...journals];

        // Apply search term
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            results = results.filter(journal =>
                (journal.title && journal.title.toLowerCase().includes(term)) ||
                (journal.abstract && journal.abstract.toLowerCase().includes(term)) ||
                (journal.authors && journal.authors.some(author =>
                    author.name && author.name.toLowerCase().includes(term)
                ))
            );
        }

        // Apply journal filter
        if (filters.journal !== 'all') {
            results = results.filter(journal =>
                journal.journalName && journal.journalName === filters.journal
            );
        }

        // Apply year filter
        if (filters.year !== 'any') {
            const year = parseInt(filters.year);
            results = results.filter(journal => {
                const journalYear = journal.publicationDate ?
                    new Date(journal.publicationDate).getFullYear() : null;
                return journalYear === year;
            });
        }

        // Apply author filter
        if (filters.author.trim()) {
            const authorTerm = filters.author.toLowerCase();
            results = results.filter(journal =>
                journal.authors && journal.authors.some(author =>
                    author.name && author.name.toLowerCase().includes(authorTerm)
                )
            );
        }

        setFilteredJournals(results);
    }, [searchTerm, filters, journals]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        // Filters are already applied via useEffect
        setShowFilters(false);
    };

    const resetFilters = () => {
        setFilters({
            journal: 'all',
            year: 'any',
            author: ''
        });
        setSearchTerm('');
    };

    // Handle downloads with fallback to direct URL
    const handleDownload = async (journal) => {
        try {
            // First try the journal's URL if available
            if (journal.pdfCloudinaryUrl || journal.pdfWebViewLink) {
                const url = journal.pdfCloudinaryUrl || journal.pdfWebViewLink;
                const result = await downloadFile(url, journal.title, 'pdf');
                if (result) return;
            }

            // If primary download fails or no URL available, try direct URL
            console.log('Using direct Cloudinary URL as fallback');
            await downloadFile(CLOUDINARY_DIRECT_URL, 'journal_document', 'docx');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Download failed. Please try again later.');
        }
    };

    // Pagination handlers
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            fetchJournals(page);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const { currentPage, totalPages } = pagination;

        // Previous button
        buttons.push(
            <button
                key="prev"
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FiChevronLeft />
            </button>
        );

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
                buttons.push(
                    <button
                        key={i}
                        className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            } else if (
                i === currentPage - 3 ||
                i === currentPage + 3
            ) {
                buttons.push(
                    <span key={`ellipsis-${i}`} className="pagination-ellipsis">
                        ...
                    </span>
                );
            }
        }

        // Next button
        buttons.push(
            <button
                key="next"
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FiChevronRight />
            </button>
        );

        return buttons;
    };

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format authors helper
    const formatAuthors = (authors) => {
        if (!authors || !Array.isArray(authors) || authors.length === 0) {
            return 'Authors not specified';
        }

        return authors
            .map(author => author.name || author)
            .filter(Boolean)
            .join(', ');
    };

    // Get unique journal names and years for filters
    const journalNames = [...new Set(journals.filter(j => j.journalName).map(j => j.journalName))];
    const publicationYears = [...new Set(journals
        .filter(j => j.publicationDate)
        .map(j => new Date(j.publicationDate).getFullYear())
    )].sort((a, b) => b - a);

    if (loading) {
        return (
            <div className="journal-showcase-container">
                <div className="loading-state">
                    <div className="loading-spinner-new"></div>
                    <p className="loading-text">Discovering amazing research for you...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="journal-showcase-container">
                <div className="error-state">
                    <FiAlertCircle className="error-icon" />
                    <p className="error-message">{error}</p>
                    <button
                        className="btn-primary" // Changed class for better styling
                        onClick={() => fetchJournals()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="journal-showcase-container">
            {/* Hero Header */}
            <div className="journal-hero-header">
                <div className="journal-hero-content">
                    <h1 className="journal-hero-title-responsive responsive-hero-title">Research Excellence Hub</h1>
                    <p className="journal-hero-desc-responsive journal-hero-desc-white">
                        Explore impactful research, case studies, and insights from the <span className="journal-full-title">Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)</span>. Discover innovative approaches and evidence-based practices shaping the future of business and entrepreneurship education in Nigeria and beyond.
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">
                                <FiFileText />
                                {pagination.totalJournals}
                            </span>
                            <span className="stat-label">Research Papers</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">
                                <FiTrendingUp />
                                {publicationYears.length}
                            </span>
                            <span className="stat-label">Years of Excellence</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">
                                <FiAward />
                                100+
                            </span>
                            <span className="stat-label">Expert Authors</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">
                                <FiGlobe />
                                Global
                            </span>
                            <span className="stat-label">Impact</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Panel */}
            <div className="search-filter-section">
                <div className="search-bar-group">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by title, abstract, author..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <button className="search-button">Search</button>
                </div>

                <div className="filter-controls">
                    <button
                        className="filter-toggle-button"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FiFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    {Object.values(filters).some(f => f !== 'all' && f !== 'any' && f !== '') || searchTerm ? (
                        <button className="clear-filters-button" onClick={resetFilters}>
                            <FiXCircle /> Clear Filters
                        </button>
                    ) : null}
                </div>

                {showFilters && (
                    <div className="filter-dropdown-panel">
                        <div className="filter-group">
                            <label htmlFor="journal-select"><FiBook /> Journal</label>
                            <select
                                id="journal-select"
                                name="journal"
                                value={filters.journal}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Journals</option>
                                {journalNames.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="year-select"><FiCalendar /> Publication Year</label>
                            <select
                                id="year-select"
                                name="year"
                                value={filters.year}
                                onChange={handleFilterChange}
                            >
                                <option value="any">Any Year</option>
                                {publicationYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="author-input"><FiUser /> Author Name</label>
                            <input
                                id="author-input"
                                type="text"
                                name="author"
                                placeholder="e.g., Dr. Smith"
                                value={filters.author}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="filter-actions-dropdown">
                            <button className="btn-primary" onClick={applyFilters}>Apply Filters</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            {filteredJournals.length === 0 ? (
                <div className="no-results-state">
                </div>
            ) : (
                <>
                    {/* Journals Display */}
                    <div className="journals-display-section">
                        <div className="section-header">
                            <h2 className="section-title">Latest Research Publications</h2>
                            <p className="section-subtitle">
                                Showing {filteredJournals.length} of {pagination.totalJournals} research papers
                            </p>
                        </div>
                        <div className="journal-list-horizontal flex flex-col space-y-6 max-w-full mx-auto">
                            {filteredJournals.map((journal, index) => (
                                <div key={journal._id || index} className="journal-card-horizontal flex flex-col md:flex-row w-full max-w-full border border-gray-300 rounded-lg shadow-md p-4 md:p-6 bg-white transition-all duration-200">
                                    <div className="flex-1 md:pr-6">
                                        <div className="journal-card-header text-center md:text-left">
                                            <Link to={`/journals/${journal._id}`} className="journal-card-title-link">
                                                <h3 className="journal-card-title text-lg md:text-xl font-semibold text-gray-900 break-words">
                                                    {journal.title || 'Untitled Research Paper'}
                                                </h3>
                                            </Link>
                                        </div>
                                        <div className="journal-card-meta flex flex-wrap gap-2 md:gap-4 mt-2 text-xs md:text-sm text-gray-600 justify-center md:justify-start">
                                            <span className="meta-item flex items-center gap-1"><FiCalendar /> {journal.publicationDate ? formatDate(journal.publicationDate) : ''}</span>
                                            <span className="meta-item flex items-center gap-1"><FiBook /> {journal.journalName || 'NIJOBED'}</span>
                                            {journal.volume && <span className="meta-item">Vol. {journal.volume}</span>}
                                        </div>
                                        {journal.abstract && (
                                            <>
                                                <h4 className="journal-card-abstract-title mt-3 font-semibold text-gray-700">Abstract</h4>
                                                <p className="journal-card-abstract mt-1 text-gray-600 text-justify text-xs md:text-base">
                                                    {journal.abstract.length > 200 ? journal.abstract.substring(0, 200) + '...' : journal.abstract}
                                                </p>
                                            </>
                                        )}
                                        <div className="journal-card-authors mt-3 text-gray-700 flex items-center gap-1 justify-center md:justify-start text-xs md:text-base">
                                            <FiUser /> <strong>Authors:</strong> {formatAuthors(journal.authors)}
                                        </div>
                                        <div className="journal-card-actions flex flex-col md:flex-row justify-center md:justify-start items-center gap-2 md:space-x-2 mt-4">
                                            <Link
                                                to={`/journals/${journal._id}`}
                                                className="action-button view-button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto text-center"
                                            >
                                                <FiEye /> View Details
                                            </Link>
                                            <button
                                                className="action-button download-button bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition font-semibold shadow-md w-full md:w-auto text-center"
                                                onClick={() => handleDownload(journal)}
                                            >
                                                <FiDownload /> Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="pagination-section">
                            <div className="pagination-wrapper">
                                <div className="pagination-controls">
                                    {renderPaginationButtons()}
                                </div>
                                <div className="pagination-info">
                                    Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalJournals} total papers)
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default JournalList;
