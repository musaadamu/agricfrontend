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
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-red-100 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02 }}
        >
            {/* Header with Volume Badge */}
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-600 text-white p-6">
                <div className="flex justify-between items-start mb-3">
                    <div className="bg-white/25 backdrop-blur-md rounded-full px-4 py-2 text-sm font-bold border border-white/30">
                        {getQuarterDisplay(journal.volume_year, journal.volume_quarter)}
                    </div>
                    {journal.doi && (
                        <button
                            onClick={copyDOI}
                            className="bg-white/25 backdrop-blur-md rounded-full p-2 hover:bg-white/40 transition-all border border-white/30"
                            title="Copy DOI"
                        >
                            <FaCopy className="text-sm" />
                        </button>
                    )}
                </div>
                
                <h3 className="text-xl font-bold leading-tight mb-3 line-clamp-2 text-white">
                    {journal.title}
                </h3>

                <div className="flex items-center gap-2 text-sm opacity-95 text-white/90">
                    <FaUsers className="text-xs" />
                    <span className="font-medium">{formatAuthors(journal.authors)}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Abstract */}
                <div className="mb-5 flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {isExpanded
                            ? journal.abstract
                            : truncateText(journal.abstract, 150)
                        }
                        {journal.abstract && journal.abstract.length > 150 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-red-600 hover:text-red-700 ml-2 font-semibold transition-colors"
                            >
                                {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                        )}
                    </p>
                </div>

                {/* Keywords */}
                {journal.keywords && journal.keywords.length > 0 && (
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                            <FaTags className="text-red-500 text-xs" />
                            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                                Keywords
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {journal.keywords.slice(0, 3).map((keyword, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 rounded-full text-xs font-medium border border-red-200"
                                >
                                    {keyword}
                                </span>
                            ))}
                            {journal.keywords.length > 3 && (
                                <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 rounded-full text-xs font-medium border border-red-200">
                                    +{journal.keywords.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className="space-y-2 mb-6 text-sm text-gray-600 border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-xs text-red-500" />
                        <span className="font-medium">Published: {formatDate(journal.publication_date)}</span>
                    </div>

                    {journal.page_numbers && (
                        <div className="flex items-center gap-2">
                            <FaFileAlt className="text-xs text-red-500" />
                            <span className="font-medium">Pages: {journal.page_numbers}</span>
                        </div>
                    )}

                    {journal.doi && (
                        <div className="flex items-center gap-2">
                            <FaExternalLinkAlt className="text-xs text-red-500" />
                            <span className="font-mono text-xs">DOI: {journal.doi}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                    {/* PDF View Button */}
                    {journal.pdfCloudinaryUrl && (
                        <button
                            onClick={() => window.open(journal.pdfCloudinaryUrl, '_blank')}
                            disabled={downloading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-md"
                        >
                            <FaEye className="text-sm" />
                            <span>PDF</span>
                        </button>
                    )}

                    {/* View Details Button */}
                    <button
                        onClick={() => {
                            window.location.href = `/published-journals/${journal._id}`;
                        }}
                        className="flex-1 px-4 py-3 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 font-semibold"
                    >
                        <FaEye className="text-sm" />
                        <span>View</span>
                    </button>
                </div>
            </div>

            {/* Status Badge (if not published) */}
            {journal.status !== 'published' && (
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        journal.status === 'under_review' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                        journal.status === 'accepted' ? 'bg-green-100 text-green-800 border border-green-300' :
                        journal.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-300' :
                        'bg-gray-100 text-gray-800 border border-gray-300'
                    }`}>
                        {journal.status.replace('_', ' ')}
                    </span>
                </div>
            )}
        </motion.div>
    );
};

export default PublishedJournalCard;
