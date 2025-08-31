import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaDownload, 
    FaCalendarAlt, 
    FaUsers, 
    FaTags, 
    FaFileAlt, 
    FaExternalLinkAlt,
    FaEye,
    FaCopy
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PublishedJournalCard = ({ journal }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format authors display
    const formatAuthors = (authors) => {
        if (!authors || authors.length === 0) return 'Unknown Author';
        if (authors.length === 1) return authors[0];
        if (authors.length === 2) return authors.join(' and ');
        return `${authors[0]} et al.`;
    };

    // Get quarter display
    const getQuarterDisplay = (year, quarter) => {
        const quarters = {
            1: 'Q1',
            2: 'Q2', 
            3: 'Q3',
            4: 'Q4'
        };
        return `${year} - ${quarters[quarter]}`;
    };

    // Handle file download using backend API
    const handleDownload = async (fileType = 'pdf') => {
        if (!journal.pdfCloudinaryUrl && !journal.content_file_path && !journal.docxCloudinaryUrl) {
            toast.error('No file available for download');
            return;
        }

        try {
            setDownloading(true);

            // Use the backend download endpoint for better error handling and logging
            const downloadEndpoint = `${import.meta.env.VITE_API_BASE_URL}/api/published-journals/${journal._id}/download/${fileType}`;

            console.log('Downloading from endpoint:', downloadEndpoint);

            // Create a temporary link and trigger download through backend
            const link = document.createElement('a');
            link.href = downloadEndpoint;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success(`${fileType.toUpperCase()} download started`);
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download file');

            // Fallback to direct URL download if backend fails
            try {
                const fallbackUrl = fileType === 'pdf'
                    ? (journal.pdfCloudinaryUrl || journal.content_file_path)
                    : journal.docxCloudinaryUrl;

                if (fallbackUrl) {
                    const link = document.createElement('a');
                    link.href = fallbackUrl;
                    link.download = `${journal.title.replace(/[^a-zA-Z0-9]/g, '_')}.${fileType}`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    toast.success('Fallback download started');
                }
            } catch (fallbackError) {
                console.error('Fallback download error:', fallbackError);
                toast.error('All download methods failed');
            }
        } finally {
            setDownloading(false);
        }
    };

    // Copy DOI to clipboard
    const copyDOI = async () => {
        if (!journal.doi) {
            toast.error('No DOI available');
            return;
        }

        try {
            await navigator.clipboard.writeText(journal.doi);
            toast.success('DOI copied to clipboard');
        } catch (error) {
            toast.error('Failed to copy DOI');
        }
    };

    // Truncate text
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <motion.div
            layout
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            whileHover={{ y: -2 }}
        >
            {/* Header with Volume Badge */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
                <div className="flex justify-between items-start mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                        Volume {getQuarterDisplay(journal.volume_year, journal.volume_quarter)}
                    </div>
                    {journal.doi && (
                        <button
                            onClick={copyDOI}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                            title="Copy DOI"
                        >
                            <FaCopy className="text-sm" />
                        </button>
                    )}
                </div>
                
                <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">
                    {journal.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm opacity-90">
                    <FaUsers className="text-xs" />
                    <span>{formatAuthors(journal.authors)}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Abstract */}
                <div className="mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {isExpanded 
                            ? journal.abstract 
                            : truncateText(journal.abstract, 150)
                        }
                        {journal.abstract && journal.abstract.length > 150 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-green-600 hover:text-green-700 ml-1 font-medium"
                            >
                                {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                        )}
                    </p>
                </div>

                {/* Keywords */}
                {journal.keywords && journal.keywords.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <FaTags className="text-gray-400 text-xs" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Keywords
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {journal.keywords.slice(0, 3).map((keyword, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                >
                                    {keyword}
                                </span>
                            ))}
                            {journal.keywords.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                    +{journal.keywords.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-xs" />
                        <span>Published: {formatDate(journal.publication_date)}</span>
                    </div>
                    
                    {journal.page_numbers && (
                        <div className="flex items-center gap-2">
                            <FaFileAlt className="text-xs" />
                            <span>Pages: {journal.page_numbers}</span>
                        </div>
                    )}

                    {journal.doi && (
                        <div className="flex items-center gap-2">
                            <FaExternalLinkAlt className="text-xs" />
                            <span className="font-mono text-xs">DOI: {journal.doi}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    {/* PDF Download Button */}
                    <button
                        onClick={() => handleDownload('pdf')}
                        disabled={downloading || (!journal.pdfCloudinaryUrl && !journal.content_file_path)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {downloading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Downloading...
                            </>
                        ) : (
                            <>
                                <FaDownload />
                                PDF
                            </>
                        )}
                    </button>

                    {/* DOCX Download Button (if available) */}
                    {journal.docxCloudinaryUrl && (
                        <button
                            onClick={() => handleDownload('docx')}
                            disabled={downloading}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {downloading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <FaDownload />
                                    DOCX
                                </>
                            )}
                        </button>
                    )}

                    <button
                        onClick={() => {
                            // Navigate to detailed view (implement if needed)
                            window.location.href = `/published-journals/${journal._id}`;
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <FaEye />
                        View
                    </button>
                </div>
            </div>

            {/* Status Badge (if not published) */}
            {journal.status !== 'published' && (
                <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        journal.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                        journal.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                        journal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {journal.status.replace('_', ' ').toUpperCase()}
                    </span>
                </div>
            )}
        </motion.div>
    );
};

export default PublishedJournalCard;
