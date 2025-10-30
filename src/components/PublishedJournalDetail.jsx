import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaArrowLeft, FaCalendarAlt, FaUsers, FaTags, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PublishedJournalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/${id}`);
                const data = await response.json();

                if (data.success) {
                    setJournal(data.data.journal);
                } else {
                    setError(data.message || 'Failed to fetch journal');
                    toast.error(data.message || 'Failed to fetch journal');
                }
            } catch (err) {
                console.error('Error fetching journal:', err);
                setError(err.message);
                toast.error('Failed to fetch journal details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJournal();
        }
    }, [id]);

    const handleDownload = async (fileType = 'pdf') => {
        if (!journal) return;

        try {
            setDownloading(true);
            const downloadEndpoint = `${import.meta.env.VITE_API_BASE_URL}/api/published-journals/${id}/download/${fileType}`;

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
        } finally {
            setDownloading(false);
        }
    };

    const handleViewPDF = () => {
        if (!journal?.pdfCloudinaryUrl) {
            toast.error('PDF file not available');
            return;
        }

        // Open PDF in new tab for viewing
        window.open(journal.pdfCloudinaryUrl, '_blank');
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getQuarterDisplay = (year, quarter) => {
        const quarters = { 1: 'Q1', 2: 'Q2', 3: 'Q3', 4: 'Q4' };
        return `${year} - ${quarters[quarter]}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-red-600 text-lg font-semibold">Loading journal...</p>
                </div>
            </div>
        );
    }

    if (error || !journal) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg font-semibold mb-4">{error || 'Journal not found'}</p>
                    <button
                        onClick={() => navigate('/published-journals')}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Back to Journals
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/published-journals')}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 font-semibold transition-colors"
                >
                    <FaArrowLeft /> Back to Journals
                </motion.button>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-600 text-white p-8">
                        <div className="mb-4">
                            <span className="inline-block bg-white/25 backdrop-blur-md rounded-full px-4 py-2 text-sm font-bold border border-white/30">
                                {getQuarterDisplay(journal.volume_year, journal.volume_quarter)}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{journal.title}</h1>
                        <p className="text-white/90 text-lg">{journal.authors?.join(', ')}</p>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                        {/* Abstract */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
                            <p className="text-gray-700 leading-relaxed text-justify">{journal.abstract}</p>
                        </div>

                        {/* Metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-b border-gray-200">
                            <div className="flex items-start gap-3">
                                <FaCalendarAlt className="text-red-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Published</p>
                                    <p className="text-gray-900 font-semibold">{formatDate(journal.publication_date)}</p>
                                </div>
                            </div>

                            {journal.page_numbers && (
                                <div className="flex items-start gap-3">
                                    <FaTags className="text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Pages</p>
                                        <p className="text-gray-900 font-semibold">{journal.page_numbers}</p>
                                    </div>
                                </div>
                            )}

                            {journal.doi && (
                                <div className="flex items-start gap-3">
                                    <FaExternalLinkAlt className="text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">DOI</p>
                                        <p className="text-gray-900 font-mono text-sm">{journal.doi}</p>
                                    </div>
                                </div>
                            )}

                            {journal.keywords && journal.keywords.length > 0 && (
                                <div className="flex items-start gap-3">
                                    <FaTags className="text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Keywords</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {journal.keywords.map((keyword, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {/* View PDF Button */}
                            {journal.pdfCloudinaryUrl && (
                                <button
                                    onClick={handleViewPDF}
                                    disabled={downloading}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-md"
                                >
                                    <FaEye className="text-sm" />
                                    <span>View PDF</span>
                                </button>
                            )}

                            {/* Download PDF Button */}
                            {journal.pdfCloudinaryUrl && (
                                <button
                                    onClick={() => handleDownload('pdf')}
                                    disabled={downloading}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-md"
                                >
                                    {downloading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            <span>Downloading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaDownload className="text-sm" />
                                            <span>Download PDF</span>
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Download DOCX Button */}
                            {journal.docxCloudinaryUrl && (
                                <button
                                    onClick={() => handleDownload('docx')}
                                    disabled={downloading}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-md"
                                >
                                    {downloading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    ) : (
                                        <>
                                            <FaDownload className="text-sm" />
                                            <span>Download DOCX</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PublishedJournalDetail;

