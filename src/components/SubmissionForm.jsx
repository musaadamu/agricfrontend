import React, { useState, useRef } from 'react';
import { FaPlus, FaTimes, FaUpload, FaFileAlt, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const SubmissionForm = ({ currentStep, data, onStepChange, onDataChange, onSubmit, isSubmitting }) => {
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    // Validation functions
    const validateStep1 = () => {
        const newErrors = {};
        
        if (!data.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (data.title.length < 10) {
            newErrors.title = 'Title must be at least 10 characters';
        }
        
        if (!data.abstract.trim()) {
            newErrors.abstract = 'Abstract is required';
        } else if (data.abstract.length < 100) {
            newErrors.abstract = 'Abstract must be at least 100 characters';
        }
        
        const validAuthors = data.authors.filter(author => author.trim());
        if (validAuthors.length === 0) {
            newErrors.authors = 'At least one author is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        
        const validKeywords = data.keywords.filter(keyword => keyword.trim());
        if (validKeywords.length === 0) {
            newErrors.keywords = 'At least one keyword is required';
        }
        
        if (!data.submitted_by.trim()) {
            newErrors.submitted_by = 'Submitter name is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};

        if (!data.pdfFile && !data.docxFile) {
            newErrors.files = 'Please upload at least one file (PDF or DOCX)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        onDataChange({ [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Handle array inputs (authors, keywords)
    const handleArrayChange = (field, index, value) => {
        const newArray = [...data[field]];
        newArray[index] = value;
        onDataChange({ [field]: newArray });
    };

    const addArrayItem = (field) => {
        const newArray = [...data[field], ''];
        onDataChange({ [field]: newArray });
    };

    const removeArrayItem = (field, index) => {
        if (data[field].length > 1) {
            const newArray = data[field].filter((_, i) => i !== index);
            onDataChange({ [field]: newArray });
        }
    };

    // Handle file upload with enhanced validation
    const handleFileChange = (event, fileType) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', {
                name: file.name,
                type: file.type,
                size: file.size,
                fileType: fileType
            });

            // Validate file type based on fileType parameter
            let allowedTypes = [];
            let allowedExtensions = [];

            if (fileType === 'pdf') {
                allowedTypes = ['application/pdf'];
                allowedExtensions = ['.pdf'];
            } else if (fileType === 'docx') {
                allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                allowedExtensions = ['.doc', '.docx'];
            }

            const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
                toast.error(`Please upload a ${fileType.toUpperCase()} file`);
                console.error('Invalid file type:', file.type, 'Extension:', fileExtension);
                return;
            }

            // Validate file size (50MB)
            const maxSize = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSize) {
                toast.error(`File size must be less than 50MB. Current size: ${formatFileSize(file.size)}`);
                console.error('File too large:', file.size, 'bytes');
                return;
            }

            // Validate minimum file size (1KB)
            if (file.size < 1024) {
                toast.error('File appears to be too small. Please check your file.');
                console.error('File too small:', file.size, 'bytes');
                return;
            }

            console.log('File validation passed');
            onDataChange({ [fileType === 'pdf' ? 'pdfFile' : 'docxFile']: file });
            if (errors.files) {
                setErrors(prev => ({ ...prev, files: '' }));
            }
            toast.success(`${fileType.toUpperCase()} file "${file.name}" selected successfully`);
        }
    };

    // Navigation functions
    const handleNext = () => {
        let isValid = false;
        
        switch (currentStep) {
            case 1:
                isValid = validateStep1();
                break;
            case 2:
                isValid = validateStep2();
                break;
            case 3:
                isValid = validateStep3();
                break;
            default:
                isValid = true;
        }
        
        if (isValid) {
            onStepChange(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        onStepChange(currentStep - 1);
    };

    const handleSubmit = () => {
        if (validateStep1() && validateStep2() && validateStep3()) {
            onSubmit(data);
        }
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                    
                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Journal Title *
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter the title of your journal article"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    {/* Abstract */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Abstract *
                        </label>
                        <textarea
                            value={data.abstract}
                            onChange={(e) => handleInputChange('abstract', e.target.value)}
                            rows={6}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                errors.abstract ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Provide a comprehensive abstract of your research (minimum 100 characters)"
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors.abstract && <p className="text-red-500 text-sm">{errors.abstract}</p>}
                            <p className="text-gray-500 text-sm">{data.abstract.length} characters</p>
                        </div>
                    </div>

                    {/* Authors */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Authors *
                        </label>
                        {data.authors.map((author, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => handleArrayChange('authors', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder={`Author ${index + 1} name`}
                                />
                                {data.authors.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('authors', index)}
                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('authors')}
                            className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                            <FaPlus /> Add Author
                        </button>
                        {errors.authors && <p className="text-red-500 text-sm mt-1">{errors.authors}</p>}
                    </div>
                </div>
            )}

            {/* Step 2: Keywords & Details */}
            {currentStep === 2 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Keywords & Details</h2>
                    
                    {/* Keywords */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Keywords *
                        </label>
                        {data.keywords.map((keyword, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => handleArrayChange('keywords', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder={`Keyword ${index + 1}`}
                                />
                                {data.keywords.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('keywords', index)}
                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('keywords')}
                            className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                            <FaPlus /> Add Keyword
                        </button>
                        {errors.keywords && <p className="text-red-500 text-sm mt-1">{errors.keywords}</p>}
                    </div>

                    {/* Submitted By */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Submitted By *
                        </label>
                        <input
                            type="text"
                            value={data.submitted_by}
                            onChange={(e) => handleInputChange('submitted_by', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                errors.submitted_by ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Your name or organization"
                        />
                        {errors.submitted_by && <p className="text-red-500 text-sm mt-1">{errors.submitted_by}</p>}
                    </div>
                </div>
            )}

            {/* Step 3: Manuscript Upload */}
            {currentStep === 3 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Manuscript Upload</h2>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            ℹ️ You can upload PDF and/or DOCX files (max 50MB each). At least one file is required.
                        </p>
                    </div>

                    {/* PDF File Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            PDF File (Optional)
                        </label>

                        {!data.pdfFile ? (
                            <div
                                onClick={() => document.getElementById('pdfInput')?.click()}
                                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                            >
                                <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                                <p className="text-sm font-medium text-gray-600">Click to upload PDF</p>
                                <p className="text-xs text-gray-500">Max: 50MB</p>
                            </div>
                        ) : (
                            <div className="border border-green-300 rounded-lg p-4 bg-green-50">
                                <div className="flex items-center gap-3">
                                    <FaFileAlt className="text-green-600 text-xl" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{data.pdfFile.name}</p>
                                        <p className="text-xs text-gray-600">{formatFileSize(data.pdfFile.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onDataChange({ pdfFile: null });
                                            toast.info('PDF file removed.');
                                        }}
                                        className="text-red-600 hover:bg-red-100 p-2 rounded-lg"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        )}

                        <input
                            id="pdfInput"
                            type="file"
                            onChange={(e) => handleFileChange(e, 'pdf')}
                            accept=".pdf,application/pdf"
                            className="hidden"
                        />
                    </div>

                    {/* DOCX File Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            DOCX File (Optional)
                        </label>

                        {!data.docxFile ? (
                            <div
                                onClick={() => document.getElementById('docxInput')?.click()}
                                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-gray-300 hover:border-green-400 hover:bg-green-50"
                            >
                                <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                                <p className="text-sm font-medium text-gray-600">Click to upload DOCX</p>
                                <p className="text-xs text-gray-500">Max: 50MB</p>
                            </div>
                        ) : (
                            <div className="border border-green-300 rounded-lg p-4 bg-green-50">
                                <div className="flex items-center gap-3">
                                    <FaFileAlt className="text-green-600 text-xl" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{data.docxFile.name}</p>
                                        <p className="text-xs text-gray-600">{formatFileSize(data.docxFile.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onDataChange({ docxFile: null });
                                            toast.info('DOCX file removed.');
                                        }}
                                        className="text-red-600 hover:bg-red-100 p-2 rounded-lg"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        )}

                        <input
                            id="docxInput"
                            type="file"
                            onChange={(e) => handleFileChange(e, 'docx')}
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="hidden"
                        />
                    </div>

                    {errors.files && <p className="text-red-500 text-sm mt-1">{errors.files}</p>}
                </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>
                    
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Title</h3>
                            <p className="text-gray-700">{data.title}</p>
                        </div>

                        {/* Abstract */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Abstract</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">{data.abstract}</p>
                        </div>

                        {/* Authors */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Authors</h3>
                            <p className="text-gray-700">{data.authors.filter(a => a.trim()).join(', ')}</p>
                        </div>

                        {/* Keywords */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.keywords.filter(k => k.trim()).map((keyword, index) => (
                                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Submitted By */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Submitted By</h3>
                            <p className="text-gray-700">{data.submitted_by}</p>
                        </div>

                        {/* Files */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Uploaded Files</h3>
                            <div className="space-y-2">
                                {data.pdfFile && (
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <FaFileAlt className="text-blue-600" />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{data.pdfFile.name}</p>
                                            <p className="text-sm text-gray-600">{formatFileSize(data.pdfFile.size)} • PDF</p>
                                        </div>
                                    </div>
                                )}
                                {data.docxFile && (
                                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                        <FaFileAlt className="text-green-600" />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{data.docxFile.name}</p>
                                            <p className="text-sm text-gray-600">{formatFileSize(data.docxFile.size)} • DOCX</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                {currentStep < 4 ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <FaCheck />
                                Submit Journal
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SubmissionForm;
