import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  updateMetaTags, 
  injectStructuredData, 
  getPageSEO,
  generateJournalSEO,
  generateJournalStructuredData,
  generateBreadcrumbStructuredData
} from '../utils/seo';

// Custom hook for managing SEO
export const useSEO = (customSEO = {}, structuredData = null, breadcrumbs = null) => {
  const location = useLocation();
  
  useEffect(() => {
    // Get page name from pathname
    const pageName = getPageNameFromPath(location.pathname);
    
    // Get default SEO for the page
    const defaultPageSEO = getPageSEO(pageName);
    
    // Merge with custom SEO data
    const seoData = { ...defaultPageSEO, ...customSEO };
    
    // Update meta tags
    updateMetaTags(seoData);
    
    // Inject structured data if provided
    if (structuredData) {
      injectStructuredData(structuredData);
    }
    
    // Inject breadcrumb structured data if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = generateBreadcrumbStructuredData(breadcrumbs);
      injectStructuredData(breadcrumbData);
    }
    
    // Scroll to top on route change for better UX
    window.scrollTo(0, 0);
    
  }, [location.pathname, customSEO, structuredData, breadcrumbs]);
};

// Custom hook specifically for journal pages
export const useJournalSEO = (journal, breadcrumbs = null) => {
  const location = useLocation();
  
  useEffect(() => {
    if (journal) {
      // Generate journal-specific SEO data
      const journalSEO = generateJournalSEO(journal);
      
      // Generate journal structured data
      const journalStructuredData = generateJournalStructuredData(journal);
      
      // Update meta tags
      updateMetaTags(journalSEO);
      
      // Inject structured data
      injectStructuredData(journalStructuredData);
      
      // Inject breadcrumb structured data if provided
      if (breadcrumbs && breadcrumbs.length > 0) {
        const breadcrumbData = generateBreadcrumbStructuredData(breadcrumbs);
        // For multiple structured data, we need to combine them
        const combinedData = [journalStructuredData, breadcrumbData];
        injectStructuredData(combinedData);
      }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
  }, [journal, location.pathname, breadcrumbs]);
};

// Helper function to extract page name from pathname
const getPageNameFromPath = (pathname) => {
  const path = pathname.toLowerCase();
  
  if (path === '/' || path === '') return 'home';
  if (path.startsWith('/journals') && path !== '/journals') return 'journalDetail';
  if (path === '/journals') return 'journals';
  if (path === '/archive') return 'archive';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  if (path === '/guide') return 'guide';
  if (path === '/editorial-board') return 'editorialBoard';
  if (path === '/login') return 'login';
  if (path === '/register') return 'register';
  
  return 'home'; // fallback
};

// Hook for managing page loading states and SEO
export const usePageSEO = (pageName, customSEO = {}, isLoading = false) => {
  const location = useLocation();
  
  useEffect(() => {
    if (!isLoading) {
      const defaultPageSEO = getPageSEO(pageName);
      const seoData = { ...defaultPageSEO, ...customSEO };
      updateMetaTags(seoData);
    }
  }, [pageName, customSEO, isLoading, location.pathname]);
};

// Hook for managing dynamic content SEO (like search results)
export const useDynamicSEO = (title, description, keywords = '', customData = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    if (title && description) {
      const seoData = {
        title,
        description,
        keywords,
        url: `https://nijobed.com${location.pathname}`,
        ...customData
      };
      
      updateMetaTags(seoData);
    }
  }, [title, description, keywords, customData, location.pathname]);
};

export default useSEO;
