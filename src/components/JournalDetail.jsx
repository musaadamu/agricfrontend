import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { downloadJournalFile } from '../utils/fileDownload';
// Temporarily comment out SEO imports
// import { useJournalSEO } from '../hooks/useSEO';
// import { generateJournalSEO, generateJournalStructuredData } from '../utils/seo';
// import SEOWrapper from './SEO/SEOWrapper';
import './JournalDetails.css';

const JournalDetail = () => {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Temporarily comment out SEO setup
    // const breadcrumbs = [ ... ];
    // useJournalSEO(journal, breadcrumbs);

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const response = await api.journals.getById(id);
                setJournal(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJournal();
    }, [id]);

    // Unified download handler using downloadJournalFile utility
    const handleDownload = async (fileType) => {
        if (!journal) return;
        try {
            const baseUrl = api.defaults.baseURL || 'https://schoolofbusinessbackend.onrender.com/api';
            const title = journal.title || 'journal';
            // If the journal has a direct Cloudinary URL for this fileType, use it as a first option
            let cloudinaryUrl = null;
            if (fileType === 'pdf' && journal.pdfCloudinaryUrl) cloudinaryUrl = journal.pdfCloudinaryUrl;
            if (fileType === 'docx' && journal.docxCloudinaryUrl) cloudinaryUrl = journal.docxCloudinaryUrl;
            const success = await downloadJournalFile(baseUrl, id, fileType, title, cloudinaryUrl);
            if (!success) {
                toast.error(`Failed to download ${fileType.toUpperCase()} file`);
            }
        } catch (err) {
            toast.error(`Failed to download ${fileType.toUpperCase()} file`);
        }
    };

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

    // Temporarily comment out SEO generation
    // const journalSEO = journal ? generateJournalSEO(journal) : null;
    // const journalStructuredData = journal ? generateJournalStructuredData(journal) : null;

    return (
        // <SEOWrapper ...>
            <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>
            <div className="space-y-3">
                <p className="text-justify"><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
                <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>
                {/* Download buttons section */}
                <div className="flex flex-wrap gap-4 my-4">
                    {/* PDF download button */}
                    <button
                        onClick={() => handleDownload('pdf')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download PDF
                    </button>
                    {/* DOCX download button */}
                    <button
                        onClick={() => handleDownload('docx')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download DOCX
                    </button>
                </div>
                <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
                <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
                <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>

                {/* Authors section with structured data markup */}
                {journal?.authors && journal.authors.length > 0 && (
                    <div>
                        <strong>Authors:</strong>
                        <span itemScope itemType="https://schema.org/Person">
                            {journal.authors.map((author, index) => (
                                <span key={index} itemProp="name">
                                    {author}{index < journal.authors.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </span>
                    </div>
                )}
            </div>
        </div>
        // </SEOWrapper>
    );
};

export default JournalDetail;
