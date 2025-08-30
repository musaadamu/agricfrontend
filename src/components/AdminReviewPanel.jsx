import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTimes, 
    FaCheck, 
    FaDownload, 
    FaFileAlt, 
    FaUsers, 
    FaTags, 
    FaCalendarAlt,
    FaEdit
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const AdminReviewPanel = ({ journal, onClose, onUpdate }) => {
    const [reviewNotes, setReviewNotes] = useState(journal.review_notes || '');
    const [selectedStatus, setSelectedStatus] = useState(journal.status);
    const [pageNumbers, setPageNumbers] = useState(journal.page_numbers || '');
    const [isUpdating, setIsUpdating] = useState(false);

    const statusOptions = [
        { value: 'submitted', label: 'Submitted', color: 'blue' },
        { value: 'under_review', label: 'Under Review', color: 'yellow' },
        { value: 'accepted', label: 'Accepted', color: 'green' },
        { value: 'published', label: 'Published', color: 'purple' },
        { value: 'rejected', label: 'Rejected', color: 'red' }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return 'Unknown size';
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownload = async () => {
        try {
            const downloadUrl = journal.pdfCloudinaryUrl || journal.docxCloudinaryUrl || journal.content_file_path;
            
            if (!downloadUrl) {
                toast.error('No file available for download');
                return;
            }

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${journal.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            toast.success('Download started');
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download file');
        }
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            await onUpdate(journal._id, selectedStatus, reviewNotes, pageNumbers);
            toast.success('Journal updated successfully');
        } catch (error) {
            toast.error('Failed to update journal');
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            submitted: 'bg-blue-100 text-blue-800 border-blue-200',
            under_review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            accepted: 'bg-green-100 text-green-800 border-green-200',
            published: 'bg-purple-100 text-purple-800 border-purple-200',
            rejected: 'bg-red-100 text-red-800 border-red-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2">Review Journal</h2>
                                <p className="text-indigo-100">
                                    Submission ID: {journal._id}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Journal Details */}
                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Title</h3>
                                    <p className="text-gray-700 leading-relaxed">{journal.title}</p>
                                </div>

                                {/* Abstract */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Abstract</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                                        <p className="text-gray-700 text-sm leading-relaxed">{journal.abstract}</p>
                                    </div>
                                </div>

                                {/* Authors */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <FaUsers className="text-indigo-600" />
                                        Authors
                                    </h3>
                                    <div className="space-y-1">
                                        {journal.authors && journal.authors.map((author, index) => (
                                            <div key={index} className="text-gray-700">
                                                {index + 1}. {author}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Keywords */}
                                {journal.keywords && journal.keywords.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <FaTags className="text-indigo-600" />
                                            Keywords
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {journal.keywords.map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Metadata */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <FaCalendarAlt className="text-indigo-600" />
                                        Submission Details
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Submitted:</span>
                                            <span className="text-gray-900">{formatDate(journal.submission_date)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Volume:</span>
                                            <span className="text-gray-900">{journal.volume_year} - Quarter {journal.volume_quarter}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Submitted by:</span>
                                            <span className="text-gray-900">{journal.submitted_by || 'Unknown'}</span>
                                        </div>
                                        {journal.file_size && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">File size:</span>
                                                <span className="text-gray-900">{formatFileSize(journal.file_size)}</span>
                                            </div>
                                        )}
                                        {journal.doi && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">DOI:</span>
                                                <span className="text-gray-900 font-mono text-xs">{journal.doi}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* File Download */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <FaFileAlt className="text-indigo-600" />
                                        Manuscript
                                    </h3>
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        <FaDownload />
                                        Download Manuscript
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Review Actions */}
                            <div className="space-y-6">
                                {/* Current Status */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Status</h3>
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(journal.status)}`}>
                                        {journal.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>

                                {/* Status Update */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <FaEdit className="text-indigo-600" />
                                        Update Status
                                    </h3>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Page Numbers */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Numbers</h3>
                                    <input
                                        type="text"
                                        value={pageNumbers}
                                        onChange={(e) => setPageNumbers(e.target.value)}
                                        placeholder="e.g., 1-15"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Review Notes */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Notes</h3>
                                    <textarea
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                        rows={6}
                                        placeholder="Add your review comments here..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Previous Review Notes */}
                                {journal.review_notes && journal.review_notes !== reviewNotes && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Previous Review Notes</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 text-sm">{journal.review_notes}</p>
                                            {journal.reviewed_by && (
                                                <p className="text-gray-500 text-xs mt-2">
                                                    Reviewed by: {journal.reviewed_by}
                                                    {journal.review_date && ` on ${formatDate(journal.review_date)}`}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            {isUpdating ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <FaCheck />
                                    Update Journal
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AdminReviewPanel;
