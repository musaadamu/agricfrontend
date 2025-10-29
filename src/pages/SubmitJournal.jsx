import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaCheck, FaTimes, FaSpinner, FaInfoCircle } from 'react-icons/fa';
import SubmissionForm from '../components/SubmissionForm';
import { toast } from 'react-hot-toast';

const SubmitJournal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [submissionData, setSubmissionData] = useState({
        title: '',
        abstract: '',
        authors: [''],
        keywords: [''],
        submitted_by: '',
        manuscript: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);

    const steps = [
        { number: 1, title: 'Basic Information', description: 'Title, abstract, and authors' },
        { number: 2, title: 'Keywords & Details', description: 'Keywords and additional information' },
        { number: 3, title: 'Manuscript Upload', description: 'Upload your manuscript file' },
        { number: 4, title: 'Review & Submit', description: 'Review and submit your journal' }
    ];

    const handleStepChange = (step) => {
        setCurrentStep(step);
    };

    const handleDataChange = (data) => {
        setSubmissionData(prev => ({ ...prev, ...data }));
    };

    const handleSubmit = async (finalData) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', finalData.title);
            formData.append('abstract', finalData.abstract);
            formData.append('authors', JSON.stringify(finalData.authors.filter(author => author.trim())));
            formData.append('keywords', JSON.stringify(finalData.keywords.filter(keyword => keyword.trim())));
            formData.append('submitted_by', finalData.submitted_by);

            if (finalData.manuscript) {
                formData.append('manuscript', finalData.manuscript);
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/submit`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                setSubmissionResult({
                    success: true,
                    journal: result.data.journal,
                    message: result.message
                });
                toast.success('Journal submitted successfully!');
                setCurrentStep(5); // Success step
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionResult({
                success: false,
                message: error.message || 'Failed to submit journal'
            });
            toast.error(error.message || 'Failed to submit journal');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setCurrentStep(1);
        setSubmissionData({
            title: '',
            abstract: '',
            authors: [''],
            keywords: [''],
            submitted_by: '',
            manuscript: null
        });
        setSubmissionResult(null);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Submit Your Journal
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Share your agricultural research with the global community
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex items-center">
                                    <div className="flex flex-col items-center min-w-0">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                                currentStep >= step.number
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}
                                        >
                                            {currentStep > step.number ? (
                                                <FaCheck />
                                            ) : (
                                                step.number
                                            )}
                                        </div>
                                        <div className="mt-2 text-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {step.title}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {step.description}
                                            </div>
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`w-16 h-1 mx-4 transition-all duration-300 ${
                                                currentStep > step.number
                                                    ? 'bg-red-600'
                                                    : 'bg-gray-200'
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {currentStep <= 4 && !submissionResult && (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-md p-8"
                        >
                            <SubmissionForm
                                currentStep={currentStep}
                                data={submissionData}
                                onStepChange={handleStepChange}
                                onDataChange={handleDataChange}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmitJournal;