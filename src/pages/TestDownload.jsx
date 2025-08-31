import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TestDownload = () => {
    const [downloadStatus, setDownloadStatus] = useState({});
    const [testing, setTesting] = useState(false);

    // Test URLs for download functionality
    const testUrls = [
        {
            id: 'cloudinary-sample',
            name: 'Cloudinary Sample Image',
            url: 'https://res.cloudinary.com/dv2rs4pwy/image/upload/v1/sample.jpg',
            description: 'Your Cloudinary account sample file'
        },
        {
            id: 'public-pdf',
            name: 'Public PDF Sample',
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            description: 'W3C test PDF file'
        },
        {
            id: 'alternative-pdf',
            name: 'Alternative PDF Sample',
            url: 'https://www.africau.edu/images/default/sample.pdf',
            description: 'Alternative public PDF'
        }
    ];

    const handleDownload = async (testUrl) => {
        setDownloadStatus(prev => ({ ...prev, [testUrl.id]: 'downloading' }));
        
        try {
            // Test if URL is accessible first
            const response = await fetch(testUrl.url, { method: 'HEAD' });
            
            if (response.ok) {
                // If accessible, trigger download
                const link = document.createElement('a');
                link.href = testUrl.url;
                link.download = `test_${testUrl.id}.${testUrl.url.split('.').pop()}`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                setDownloadStatus(prev => ({ ...prev, [testUrl.id]: 'success' }));
                toast.success(`Download started: ${testUrl.name}`);
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.error('Download error:', error);
            setDownloadStatus(prev => ({ ...prev, [testUrl.id]: 'error' }));
            toast.error(`Download failed: ${testUrl.name}`);
        }
    };

    const testAllUrls = async () => {
        setTesting(true);
        
        for (const testUrl of testUrls) {
            await handleDownload(testUrl);
            // Wait a bit between tests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        setTesting(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'downloading':
                return <FaSpinner className="animate-spin text-blue-600" />;
            case 'success':
                return <FaCheck className="text-green-600" />;
            case 'error':
                return <FaTimes className="text-red-600" />;
            default:
                return <FaDownload className="text-gray-600" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'downloading':
                return 'Downloading...';
            case 'success':
                return 'Success';
            case 'error':
                return 'Failed';
            default:
                return 'Test Download';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <FaDownload className="text-6xl mx-auto mb-4 opacity-80" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Download Functionality Test
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Test the journal download functionality with various file types
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Test Controls */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Tests</h2>
                            <p className="text-gray-600">
                                Test different file URLs to verify download functionality works in the browser
                            </p>
                        </div>
                        <button
                            onClick={testAllUrls}
                            disabled={testing}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            {testing ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Testing All...
                                </>
                            ) : (
                                <>
                                    <FaDownload />
                                    Test All Downloads
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Test URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testUrls.map((testUrl) => (
                        <motion.div
                            key={testUrl.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-lg shadow-md p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {testUrl.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {testUrl.description}
                                    </p>
                                    <div className="bg-gray-50 rounded p-2 mb-4">
                                        <code className="text-xs text-gray-700 break-all">
                                            {testUrl.url}
                                        </code>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDownload(testUrl)}
                                disabled={downloadStatus[testUrl.id] === 'downloading'}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                    downloadStatus[testUrl.id] === 'success'
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : downloadStatus[testUrl.id] === 'error'
                                        ? 'bg-red-100 text-red-700 border border-red-300'
                                        : downloadStatus[testUrl.id] === 'downloading'
                                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                                }`}
                            >
                                {getStatusIcon(downloadStatus[testUrl.id])}
                                {getStatusText(downloadStatus[testUrl.id])}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        How to Use This Test
                    </h3>
                    <div className="text-blue-800 space-y-2">
                        <p>• Click individual "Test Download" buttons to test specific URLs</p>
                        <p>• Click "Test All Downloads" to test all URLs sequentially</p>
                        <p>• Green status = Download successful</p>
                        <p>• Red status = Download failed (URL not accessible)</p>
                        <p>• Blue status = Download in progress</p>
                    </div>
                </div>

                {/* Sample Journal Data */}
                <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">
                        Sample Journal with Working Download
                    </h3>
                    <div className="text-green-800 space-y-2">
                        <p>If the Cloudinary URL works, you can use this sample journal document:</p>
                        <div className="bg-white rounded p-4 mt-3">
                            <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "title": "Test Journal with Working Download",
  "abstract": "This is a test journal to verify download functionality...",
  "authors": ["Test Author"],
  "keywords": ["test", "download"],
  "pdfCloudinaryUrl": "https://res.cloudinary.com/dv2rs4pwy/image/upload/v1/sample.jpg",
  "status": "published",
  "volume_year": 2025,
  "volume_quarter": 3,
  "doi": "10.1234/test.2025.3.001"
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDownload;
