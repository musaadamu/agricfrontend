// SEO utility functions for dynamic meta tag management
import { SEO_CONFIG, getFullUrl, getImageUrl } from '../config/seo.config.js';

export const DEFAULT_SEO = {
  title: SEO_CONFIG.DEFAULT_TITLE,
  description: SEO_CONFIG.DEFAULT_DESCRIPTION,
  keywords: SEO_CONFIG.DEFAULT_KEYWORDS,
  author: SEO_CONFIG.DEFAULT_AUTHOR,
  image: SEO_CONFIG.DEFAULT_IMAGE,
  url: SEO_CONFIG.BASE_URL,
  type: "website",
  siteName: SEO_CONFIG.JOURNAL_INFO.abbreviation
};

export const PAGE_SEO = {
  home: {
    ...SEO_CONFIG.PAGES.home,
    url: getFullUrl(SEO_CONFIG.PAGES.home.path)
  },
  journals: {
    ...SEO_CONFIG.PAGES.journals,
    url: getFullUrl(SEO_CONFIG.PAGES.journals.path)
  },
  archive: {
    ...SEO_CONFIG.PAGES.archive,
    url: getFullUrl(SEO_CONFIG.PAGES.archive.path)
  },
  about: {
    ...SEO_CONFIG.PAGES.about,
    url: getFullUrl(SEO_CONFIG.PAGES.about.path)
  },
  contact: {
    ...SEO_CONFIG.PAGES.contact,
    url: getFullUrl(SEO_CONFIG.PAGES.contact.path)
  },
  guide: {
    ...SEO_CONFIG.PAGES.guide,
    url: getFullUrl(SEO_CONFIG.PAGES.guide.path)
  },
  editorialBoard: {
    ...SEO_CONFIG.PAGES.editorialBoard,
    url: getFullUrl(SEO_CONFIG.PAGES.editorialBoard.path)
  },
  login: {
    ...SEO_CONFIG.PAGES.login,
    url: getFullUrl(SEO_CONFIG.PAGES.login.path)
  },
  register: {
    ...SEO_CONFIG.PAGES.register,
    url: getFullUrl(SEO_CONFIG.PAGES.register.path)
  },
  dashboard: {
    ...SEO_CONFIG.PAGES.dashboard,
    url: getFullUrl(SEO_CONFIG.PAGES.dashboard.path)
  }
};

// Function to update document meta tags
export const updateMetaTags = (seoData) => {
  const data = { ...DEFAULT_SEO, ...seoData };
  
  // Update title
  document.title = data.title;
  
  // Update meta tags
  updateMetaTag('name', 'description', data.description);
  updateMetaTag('name', 'keywords', data.keywords);
  updateMetaTag('name', 'author', data.author);
  
  // Update Open Graph tags
  updateMetaTag('property', 'og:title', data.title);
  updateMetaTag('property', 'og:description', data.description);
  updateMetaTag('property', 'og:image', data.image);
  updateMetaTag('property', 'og:url', data.url);
  updateMetaTag('property', 'og:type', data.type);
  updateMetaTag('property', 'og:site_name', data.siteName);
  
  // Update Twitter tags
  updateMetaTag('property', 'twitter:title', data.title);
  updateMetaTag('property', 'twitter:description', data.description);
  updateMetaTag('property', 'twitter:image', data.image);
  updateMetaTag('property', 'twitter:url', data.url);
  
  // Update canonical URL
  updateCanonicalUrl(data.url);
};

// Helper function to update individual meta tags
const updateMetaTag = (attribute, name, content) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

// Helper function to update canonical URL
const updateCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }
};

// Function to generate journal-specific SEO data
export const generateJournalSEO = (journal) => {
  if (!journal) return DEFAULT_SEO;

  const title = `${journal.title} - ${SEO_CONFIG.JOURNAL_INFO.abbreviation}`;
  const description = journal.abstract ?
    `${journal.abstract.substring(0, 155)}...` :
    `Read "${journal.title}" published in the ${SEO_CONFIG.JOURNAL_INFO.fullName}.`;

  const keywords = journal.keywords ?
    [...journal.keywords, SEO_CONFIG.JOURNAL_INFO.abbreviation, 'business education', 'entrepreneurship'].join(', ') :
    SEO_CONFIG.DEFAULT_KEYWORDS;

  const authors = journal.authors ? journal.authors.join(', ') : `${SEO_CONFIG.JOURNAL_INFO.abbreviation} Authors`;

  return {
    title,
    description,
    keywords,
    author: authors,
    url: getFullUrl(`/journals/${journal._id}`),
    type: 'article',
    image: getImageUrl(DEFAULT_SEO.image)
  };
};

// Function to generate structured data for journals
export const generateJournalStructuredData = (journal) => {
  if (!journal) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": journal.title,
    "description": journal.abstract,
    "author": journal.authors ? journal.authors.map(author => ({
      "@type": "Person",
      "name": author
    })) : [],
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.JOURNAL_INFO.fullName,
      "logo": {
        "@type": "ImageObject",
        "url": getImageUrl(SEO_CONFIG.DEFAULT_IMAGE)
      }
    },
    "datePublished": journal.publishedDate,
    "keywords": journal.keywords ? journal.keywords.join(', ') : '',
    "url": getFullUrl(`/journals/${journal._id}`),
    "isPartOf": {
      "@type": "Periodical",
      "name": SEO_CONFIG.JOURNAL_INFO.fullName,
      "issn": SEO_CONFIG.JOURNAL_INFO.issn
    }
  };
};

// Function to inject structured data into the page
export const injectStructuredData = (data) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  if (data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
};

// Function to get page-specific SEO data
export const getPageSEO = (pageName) => {
  return PAGE_SEO[pageName] || DEFAULT_SEO;
};

// Function to generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Function to preload critical resources
export const preloadCriticalResources = () => {
  const resources = [
    { href: '/images/logo.JPG', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
  ];
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'style') {
      link.onload = function() { this.rel = 'stylesheet'; };
    }
    document.head.appendChild(link);
  });
};
