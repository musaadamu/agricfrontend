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
    FiAlertCircle
} from 'react-icons/fi';
import './JournalList.css';

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
        if (!dateString) return 'Date not available';
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
                        className="btn-reset-search"
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
                    <h1>Research Excellence Hub</h1>
                    <p>
                        Explore impactful research, case studies, and insights from the Nigerian Journal of Business and Entrepreneurship Education (NIJOBED). Discover innovative approaches and evidence-based practices shaping the future of business and entrepreneurship education in Nigeria and beyond.
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
            <div className="search-control-panel">
                <div className="search-bar-wrapper">
                    <div className="search-input-container">
                        <FiSearch className="search-icon-left" />
                        <input
                            type="text"
                            placeholder="Search by title, abstract, author, or keywords..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="main-search-input"
                        />
                    </div>
                    <button className="search-action-btn">
                        <FiSearch />
                        Search
                    </button>
                </div>

                <div className="filter-toggle">
                    <button
                        className="filter-button"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FiFilter /> Filter Articles
                    </button>
                </div>

                {showFilters && (
                    <div className="filter-panel">
                        <h3>Filter Articles</h3>
                        <div className="filter-options">
                            <div className="filter-group">
                                <label><FiBook /> Journal</label>
                                <select
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
                                <label><FiCalendar /> Publication Year</label>
                                <select
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
                                <label><FiUser /> Author Name</label>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="e.g., Dr. Smith"
                                    value={filters.author}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>
                        <div className="filter-actions">
                            <button className="apply-filters" onClick={applyFilters}>Apply Filters</button>
                            <button className="reset-filters" onClick={resetFilters}>Reset</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            {filteredJournals.length === 0 ? (
                <div className="no-results-state">
                    <FiSearch className="no-results-icon" />
                    <h3 className="no-results-title">No Research Papers Found</h3>
                    <p className="no-results-message">
                        We couldn't find any papers matching your search criteria. 
                        Try adjusting your filters or search terms.
                    </p>
                    <button className="btn-reset-search" onClick={resetFilters}>
                        Clear All Filters
                    </button>
                </div>
            ) : (
                <>
                    {/* Journals Display */}
                    <div className="journals-horizontal-section">
                        <div className="section-title">
                            <h2>Latest Research Publications</h2>
                            <p className="section-subtitle">
                                Showing {filteredJournals.length} of {pagination.totalJournals} research papers
                            </p>
                        </div>

                        <div className="journals-horizontal-grid">
                            {filteredJournals.map((journal, index) => (
                                <div key={journal._id || index} className="journal-horizontal-card">
                                    <div className="journal-card-content">
                                        <div className="journal-title-section">
                                            <Link 
                                                to={`/journals/${journal._id}`} 
                                                className="journal-title-link-new"
                                            >
                                                <h3 className="journal-title-new">
                                                    {journal.title || 'Untitled Research Paper'}
                                                </h3>
                                            </Link>
                                        </div>

                                        <div className="journal-metadata">
                                            <div className="meta-item">
                                                <FiCalendar />
                                                <span>{formatDate(journal.publicationDate)}</span>
                                            </div>
                                            <div className="meta-item">
                                                <FiBook />
                                                <span>{journal.journalName || 'IJIRSTEM'}</span>
                                            </div>
                                            {journal.volume && (
                                                <div className="meta-item">
                                                    <span>Vol. {journal.volume}</span>
                                                </div>
                                            )}
                                        </div>

                                        {journal.abstract && (
                                            <div className="journal-abstract-new">
                                                {journal.abstract}
                                            </div>
                                        )}

                                        <div className="journal-authors-new">
                                            <div className="authors-label">
                                                <FiUser />
                                                Authors
                                            </div>
                                            <div className="authors-list">
                                                {formatAuthors(journal.authors)}
                                            </div>
                                        </div>

                                        {journal.keywords && journal.keywords.length > 0 && (
                                            <div className="journal-keywords-new">
                                                <div className="keywords-container">
                                                    {journal.keywords.slice(0, 5).map((keyword, idx) => (
                                                        <span key={idx} className="keyword-chip">
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="journal-actions-new">
                                            <Link 
                                                to={`/journals/${journal._id}`}
                                                className="action-btn btn-view"
                                            >
                                                <FiEye />
                                                View Details
                                            </Link>
                                            <button 
                                                className="action-btn btn-download"
                                                onClick={() => handleDownload(journal)}
                                            >
                                                <FiDownload />
                                                Download
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
                                    Showing page {pagination.currentPage} of {pagination.totalPages} 
                                    ({pagination.totalJournals} total papers)
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