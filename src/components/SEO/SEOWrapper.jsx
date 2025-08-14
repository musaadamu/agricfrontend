import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEOHead from './SEOHead';
import PerformanceOptimizer from './PerformanceOptimizer';
import { useSEO } from '../../hooks/useSEO';
import { getPageSEO } from '../../utils/seo';
import { SEO_CONFIG } from '../../config/seo.config';

const SEOWrapper = ({ 
  children, 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  noIndex = false,
  structuredData = null,
  breadcrumbs = null,
  customSEO = {}
}) => {
  const location = useLocation();

  // Get page name from pathname
  const getPageName = (pathname) => {
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
    if (path === '/dashboard') return 'dashboard';
    return 'home';
  };

  const pageName = getPageName(location.pathname);
  const defaultPageSEO = getPageSEO(pageName);

  // Merge SEO data
  const seoData = {
    ...defaultPageSEO,
    ...customSEO,
    ...(title && { title }),
    ...(description && { description }),
    ...(keywords && { keywords }),
    ...(image && { image }),
    type,
    url: `${SEO_CONFIG.BASE_URL}${location.pathname}`,
    noIndex: noIndex || defaultPageSEO.noIndex || false
  };

  // Use SEO hook
  useSEO(seoData, structuredData, breadcrumbs);

  // Add page-specific structured data
  useEffect(() => {
    let pageStructuredData = null;

    switch (pageName) {
      case 'home':
        pageStructuredData = {
          ...SEO_CONFIG.STRUCTURED_DATA.website,
          description: seoData.description
        };
        break;
      case 'about':
        pageStructuredData = {
          ...SEO_CONFIG.STRUCTURED_DATA.organization,
          description: seoData.description
        };
        break;
      case 'journals':
        pageStructuredData = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": seoData.title,
          "description": seoData.description,
          "url": seoData.url,
          "isPartOf": {
            "@type": "WebSite",
            "name": SEO_CONFIG.JOURNAL_INFO.fullName,
            "url": SEO_CONFIG.BASE_URL
          }
        };
        break;
      default:
        pageStructuredData = structuredData;
    }

    if (pageStructuredData && !structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(pageStructuredData);
      script.setAttribute('data-page', pageName);
      document.head.appendChild(script);

      return () => {
        const existingScript = document.querySelector(`script[data-page="${pageName}"]`);
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [pageName, seoData, structuredData]);

  // Add breadcrumb structured data
  useEffect(() => {
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbData);
      script.setAttribute('data-breadcrumb', 'true');
      document.head.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[data-breadcrumb="true"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [breadcrumbs]);

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        author={seoData.author}
        image={seoData.image}
        url={seoData.url}
        type={seoData.type}
        noIndex={seoData.noIndex}
        structuredData={structuredData}
        canonical={seoData.url}
      />
      <PerformanceOptimizer />
      {children}
    </>
  );
};

export default SEOWrapper;
