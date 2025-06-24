import axios from 'axios';
import { toast } from 'react-toastify';
import { isProduction } from '../services/api';

// Direct Cloudinary URL for fallback
const CLOUDINARY_DIRECT_URL = 'https://res.cloudinary.com/dxnp54kf2/raw/schoolofbusiness/v1750334083/adati_draft_copy_cxwh09.docx';

/**
 * Utility function to download files from the server
 * @param {string} url - The full URL to download the file from
 * @param {string} filename - The filename to save the file as
 * @param {string} fileType - The file type (e.g., 'pdf', 'docx')
 * @returns {Promise<boolean>} - True if download was successful, false otherwise
 */
export const downloadFile = async (url, filename, fileType) => {
    const toastId = toast.loading(`Downloading ${fileType.toUpperCase()} file...`);
    try {
        // If URL is the direct Cloudinary URL, use it directly
        if (url === CLOUDINARY_DIRECT_URL) {
            window.open(url, '_blank');
            toast.update(toastId, {
                render: 'Download started',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
            return true;
        }
        const token = localStorage.getItem('authToken');
        // If the URL is relative, prepend the correct base URL
        if (url.startsWith('/')) {
            const baseUrl = isProduction() 
                ? 'https://schoolofbusinessbackend.onrender.com' 
                : 'http://localhost:5000';
            url = `${baseUrl}${url}`;
        }
        // For Cloudinary URLs, use direct download
        const isCloudinary = url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
        if (isCloudinary) {
            window.open(url, '_blank');
            toast.update(toastId, {
                render: 'Download started',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
            return true;
        }
        // For other URLs, use axios to handle the download
        const headers = {
            'Authorization': token ? `Bearer ${token}` : '',
            'Accept': '*/*'
        };
        const axiosConfig = {
            method: 'GET',
            url,
            responseType: 'blob',
            headers,
            timeout: 120000, // Increased timeout for remote servers
            withCredentials: false,
            maxRedirects: 5,
            validateStatus: status => status < 400
        };
        const response = await axios(axiosConfig);
        if (response.status !== 200) {
            throw new Error(`Server returned status ${response.status}`);
        }
        if (!response.data || response.data.size === 0) {
            throw new Error('Received empty file');
        }
        // Create a download link
        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
            link.remove();
        }, 100);
        toast.update(toastId, {
            render: `File downloaded as ${fileType.toUpperCase()}`,
            type: 'success',
            isLoading: false,
            autoClose: 3000
        });
        return true;
    } catch (err) {
        let errorMessage = `Failed to download ${fileType.toUpperCase()} file`;
        if (err.response) {
            errorMessage = `Server error (${err.response.status}): ${err.response.data?.message || 'Unknown error'}`;
        } else if (err.request) {
            errorMessage = 'No response from server. Check your network connection.';
        }
        toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000
        });
        return false;
    }
};

/**
 * Utility function to download journal files (tries both API and direct endpoints for both PDF and DOCX)
 * @param {string} baseUrl - The base URL of the API
 * @param {string} journalId - The ID of the journal
 * @param {string} fileType - The file type (e.g., 'pdf', 'docx')
 * @param {string} title - The title to use for the filename
 * @param {string} cloudinaryUrl - Optional direct Cloudinary URL to use
 * @returns {Promise<boolean>} - True if download was successful, false otherwise
 */
export const downloadJournalFile = async (baseUrl, journalId, fileType, title, cloudinaryUrl = null) => {
    const filename = `${title || 'journal'}.${fileType}`;
    const isProductionEnv = isProduction();
    const isLocalBackend = window.location.hostname === 'localhost';
    const urlsToTry = [];
    // Try provided Cloudinary URL first if available
    if (cloudinaryUrl) {
        urlsToTry.push(cloudinaryUrl);
    }
    // Try direct file endpoint (for both prod and local)
    if (!isLocalBackend) {
        urlsToTry.push(
            `https://schoolofbusinessbackend.onrender.com/direct-file/journals/${journalId}.${fileType}`,
            `https://schoolofbusinessbackend.onrender.com/api/journals/${journalId}/download/${fileType}`
        );
    } else {
        urlsToTry.push(
            `http://localhost:5000/direct-file/journals/${journalId}.${fileType}`,
            `http://localhost:5000/api/journals/${journalId}/download/${fileType}`
        );
    }
    // Try all URLs in order
    let lastError = null;
    for (const url of urlsToTry) {
        try {
            const success = await downloadFile(url, filename, fileType);
            if (success) return true;
        } catch (error) {
            lastError = error;
        }
    }
    // Fallback to direct Cloudinary URL for docx if all else fails
    if (fileType === 'docx') {
        await downloadFile(CLOUDINARY_DIRECT_URL, 'journal_document', 'docx');
    }
    if (lastError) throw lastError;
    return false;
};

export default {
    downloadFile,
    downloadJournalFile
};
