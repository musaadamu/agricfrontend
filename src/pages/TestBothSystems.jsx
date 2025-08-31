import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaUpload,
    FaDownload,
    FaCheck,
    FaTimes,
    FaSpinner,
    FaExchangeAlt,
    FaFileAlt,
    FaFilePdf
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TestBothSystems = () => {
    const [testResults, setTestResults] = useState({
        existing: { upload: null, download: null },
        published: { upload: null, download: null }
    });
    const [testing, setTesting] = useState({
        existingUpload: false,
        publishedUpload: false,
        existingDownload: false,
        publishedDownload: false
    });
    const [uploadedJournals, setUploadedJournals] = useState({
        existing: null,
        published: null
    });

    // Test existing system upload
    const testExistingUpload = async () => {
        setTesting(prev => ({ ...prev, existingUpload: true }));
        
        try {
            // Create test file
            const testContent = 'Test journal content for existing system';
            const testFile = new File([testContent], 'test-existing.pdf', { type: 'application/pdf' });
            
            const formData = new FormData();
            formData.append('title', 'Test Journal - Existing System');
            formData.append('abstract', 'This is a test journal for the existing system.');
            formData.append('authors', 'Test Author, System Tester');
            formData.append('keywords', 'test, existing system');
            formData.append('pdfFile', testFile);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/journals`, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setTestResults(prev => ({
                    ...prev,
                    existing: { ...prev.existing, upload: 'success' }
                }));
                setUploadedJournals(prev => ({ ...prev, existing: result }));
                toast.success('Existing system upload successful!');
            } else {
                throw new Error(result.message || 'Upload failed');
            }
            
        } catch (error) {
            console.error('Existing system upload error:', error);
            setTestResults(prev => ({
                ...prev,
                existing: { ...prev.existing, upload: 'error' }
            }));
            toast.error(`Existing system upload failed: ${error.message}`);
        } finally {
            setTesting(prev => ({ ...prev, existingUpload: false }));
        }
    };

    // Test published system upload
    const testPublishedUpload = async () => {
        setTesting(prev => ({ ...prev, publishedUpload: true }));
        
        try {
            // Create test file
            const testContent = 'Test journal content for published system';
            const testFile = new File([testContent], 'test-published.pdf', { type: 'application/pdf' });
            
            const formData = new FormData();
            formData.append('title', 'Test Journal - Published System');
            formData.append('abstract', 'This is a test journal for the enhanced published system.');
            formData.append('authors', JSON.stringify(['Dr. Test Author', 'Prof. System Tester']));
            formData.append('keywords', JSON.stringify(['test', 'published system', 'enhanced']));
            formData.append('submitted_by', 'System Tester');
            formData.append('manuscript', testFile);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/submit`, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                setTestResults(prev => ({
                    ...prev,
                    published: { ...prev.published, upload: 'success' }
                }));
                setUploadedJournals(prev => ({ ...prev, published: result.data.journal }));
                toast.success('Published system upload successful!');
            } else {
                throw new Error(result.message || 'Upload failed');
            }
            
        } catch (error) {
            console.error('Published system upload error:', error);
            setTestResults(prev => ({
                ...prev,
                published: { ...prev.published, upload: 'error' }
            }));
            toast.error(`Published system upload failed: ${error.message}`);
        } finally {
            setTesting(prev => ({ ...prev, publishedUpload: false }));
        }
    };

    // Test existing system download
    const testExistingDownload = async () => {
        if (!uploadedJournals.existing) {
            toast.error('Please upload a journal to the existing system first');
            return;
        }

        setTesting(prev => ({ ...prev, existingDownload: true }));
        
        try {
            const journalId = uploadedJournals.existing._id || uploadedJournals.existing.id;
            const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/api/journals/${journalId}/download/pdf`;
            
            // Test if download endpoint is accessible
            const response = await fetch(downloadUrl, { method: 'HEAD' });
            
            if (response.ok || response.status === 302) {
                setTestResults(prev => ({
                    ...prev,
                    existing: { ...prev.existing, download: 'success' }
                }));
                
                // Trigger actual download
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toast.success('Existing system download successful!');
            } else {
                throw new Error(`Download failed with status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Existing system download error:', error);
            setTestResults(prev => ({
                ...prev,
                existing: { ...prev.existing, download: 'error' }
            }));
            toast.error(`Existing system download failed: ${error.message}`);
        } finally {
            setTesting(prev => ({ ...prev, existingDownload: false }));
        }
    };

    // Test published system download
    const testPublishedDownload = async () => {
        if (!uploadedJournals.published) {
            toast.error('Please upload a journal to the published system first');
            return;
        }

        setTesting(prev => ({ ...prev, publishedDownload: true }));
        
        try {
            const journalId = uploadedJournals.published._id;
            const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/api/published-journals/${journalId}/download/pdf`;
            
            // Test if download endpoint is accessible
            const response = await fetch(downloadUrl, { method: 'HEAD' });
            
            if (response.ok || response.status === 302) {
                setTestResults(prev => ({
                    ...prev,
                    published: { ...prev.published, download: 'success' }
                }));
                
                // Trigger actual download
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toast.success('Published system download successful!');
            } else {
                throw new Error(`Download failed with status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Published system download error:', error);
            setTestResults(prev => ({
                ...prev,
                published: { ...prev.published, download: 'error' }
            }));
            toast.error(`Published system download failed: ${error.message}`);
        } finally {
            setTesting(prev => ({ ...prev, publishedDownload: false }));
        }
    };

    // Run all tests
    const runAllTests = async () => {
        toast.info('Running comprehensive tests for both systems...');
        await testExistingUpload();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        await testPublishedUpload();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        await testExistingDownload();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        await testPublishedDownload();
        toast.success('All tests completed!');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return <FaCheck className="text-green-600" />;
            case 'error':
                return <FaTimes className="text-red-600" />;
            default:
                return <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <FaExchangeAlt className="text-6xl mx-auto mb-4 opacity-80" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Journal Systems Comparison Test
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Test and compare upload/download functionality between the existing and published journal systems
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Test Controls */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Comparison Tests</h2>
                            <p className="text-gray-600">
                                Test upload and download functionality for both journal systems
                            </p>
                        </div>
                        <button
                            onClick={runAllTests}
                            disabled={Object.values(testing).some(t => t)}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            {Object.values(testing).some(t => t) ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Testing...
                                </>
                            ) : (
                                <>
                                    <FaExchangeAlt />
                                    Run All Tests
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Test Results Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Existing System */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FaFileAlt className="text-blue-600" />
                            Existing Journal System
                        </h3>

                        {/* Upload Test */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">Upload Test</span>
                                {getStatusIcon(testResults.existing.upload)}
                            </div>
                            <button
                                onClick={testExistingUpload}
                                disabled={testing.existingUpload}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {testing.existingUpload ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <FaUpload />
                                        Test Upload
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Download Test */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">Download Test</span>
                                {getStatusIcon(testResults.existing.download)}
                            </div>
                            <button
                                onClick={testExistingDownload}
                                disabled={testing.existingDownload || !uploadedJournals.existing}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {testing.existingDownload ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Testing...
                                    </>
                                ) : (
                                    <>
                                        <FaDownload />
                                        Test Download
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Journal Info */}
                        {uploadedJournals.existing && (
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-medium text-blue-900 mb-2">Uploaded Journal</h4>
                                <p className="text-sm text-blue-800">
                                    <strong>ID:</strong> {uploadedJournals.existing._id || uploadedJournals.existing.id}
                                </p>
                                <p className="text-sm text-blue-800">
                                    <strong>Title:</strong> {uploadedJournals.existing.title}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Published System */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FaFilePdf className="text-purple-600" />
                            Published Journal System
                        </h3>

                        {/* Upload Test */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">Upload Test</span>
                                {getStatusIcon(testResults.published.upload)}
                            </div>
                            <button
                                onClick={testPublishedUpload}
                                disabled={testing.publishedUpload}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {testing.publishedUpload ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <FaUpload />
                                        Test Upload
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Download Test */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">Download Test</span>
                                {getStatusIcon(testResults.published.download)}
                            </div>
                            <button
                                onClick={testPublishedDownload}
                                disabled={testing.publishedDownload || !uploadedJournals.published}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {testing.publishedDownload ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Testing...
                                    </>
                                ) : (
                                    <>
                                        <FaDownload />
                                        Test Download
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Journal Info */}
                        {uploadedJournals.published && (
                            <div className="bg-purple-50 rounded-lg p-4">
                                <h4 className="font-medium text-purple-900 mb-2">Uploaded Journal</h4>
                                <p className="text-sm text-purple-800">
                                    <strong>ID:</strong> {uploadedJournals.published._id}
                                </p>
                                <p className="text-sm text-purple-800">
                                    <strong>Title:</strong> {uploadedJournals.published.title}
                                </p>
                                <p className="text-sm text-purple-800">
                                    <strong>DOI:</strong> {uploadedJournals.published.doi}
                                </p>
                                <p className="text-sm text-purple-800">
                                    <strong>Volume:</strong> {uploadedJournals.published.volume_year} - Q{uploadedJournals.published.volume_quarter}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Testing Instructions
                    </h3>
                    <div className="text-gray-700 space-y-2">
                        <p>• Click "Run All Tests" to test both systems automatically</p>
                        <p>• Or test each system individually using the buttons above</p>
                        <p>• Upload tests create sample journals in each system</p>
                        <p>• Download tests verify that files can be downloaded successfully</p>
                        <p>• Green checkmarks indicate successful tests</p>
                        <p>• Red X marks indicate failed tests</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestBothSystems;
