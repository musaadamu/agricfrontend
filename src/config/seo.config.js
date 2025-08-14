// SEO Configuration for NIJOBED
export const SEO_CONFIG = {
  // Domain configuration (use environment variables in production)
  DOMAIN: process.env.REACT_APP_DOMAIN || 'www.nijobed.com.ng',
  BASE_URL: process.env.REACT_APP_FRONTEND_URL || 'https://www.nijobed.com.ng',
  
  // Default SEO settings
  DEFAULT_TITLE: process.env.REACT_APP_SITE_NAME ?
    `${process.env.REACT_APP_SITE_NAME} - Nigerian Journal of Business and Entrepreneurship Education` :
    'Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)',
  DEFAULT_DESCRIPTION: process.env.REACT_APP_SITE_DESCRIPTION ||
    'NIJOBED is Nigeria\'s premier academic journal publishing cutting-edge research in business education, entrepreneurship, and related fields. Explore the latest scholarly articles and research findings.',
  DEFAULT_KEYWORDS: 'business education, entrepreneurship, academic journal, research, Nigeria, NIJOBED, business studies, education research, scholarly articles',
  DEFAULT_AUTHOR: 'Nigerian Journal of Business and Entrepreneurship Education',
  DEFAULT_IMAGE: '/images/logo.JPG',
  
  // Social media handles
  SOCIAL_MEDIA: {
    twitter: process.env.REACT_APP_TWITTER_HANDLE || '@nijobed',
    facebook: process.env.REACT_APP_FACEBOOK_PAGE || 'nijobed',
    linkedin: process.env.REACT_APP_LINKEDIN_PAGE || 'company/nijobed'
  },

  // Contact information
  CONTACT: {
    email: process.env.REACT_APP_CONTACT_EMAIL || 'editor@nijobed.com.ng',
    phone: '+234-XXX-XXX-XXXX',
    address: 'Nigeria'
  },
  
  // Journal specific information
  JOURNAL_INFO: {
    fullName: 'Nigerian Journal of Business and Entrepreneurship Education',
    abbreviation: 'NIJOBED',
    issn: 'XXXX-XXXX', // Replace with actual ISSN when available
    publisher: 'Nigerian Journal of Business and Entrepreneurship Education',
    language: 'en',
    country: 'Nigeria',
    subjects: [
      'Business Education',
      'Entrepreneurship',
      'Business Studies',
      'Educational Research',
      'Economic Development',
      'Management Studies'
    ]
  },
  
  // Page-specific SEO configurations
  PAGES: {
    home: {
      title: 'Home - Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)',
      description: 'Welcome to NIJOBED, Nigeria\'s premier academic journal for business and entrepreneurship education research. Discover cutting-edge research and scholarly articles.',
      keywords: 'business education, entrepreneurship, academic journal, research, Nigeria, NIJOBED, home',
      path: '/'
    },
    journals: {
      title: 'Published Journals - NIJOBED',
      description: 'Browse our collection of published academic journals covering business education, entrepreneurship, and related fields. Access peer-reviewed research articles.',
      keywords: 'published journals, academic articles, business research, entrepreneurship studies, peer-reviewed',
      path: '/journals'
    },
    archive: {
      title: 'Journal Archive - NIJOBED',
      description: 'Explore our comprehensive archive of past journal publications. Access historical research in business education and entrepreneurship.',
      keywords: 'journal archive, past publications, historical research, business education archive',
      path: '/archive'
    },
    about: {
      title: 'About Us - NIJOBED',
      description: 'Learn about the Nigerian Journal of Business and Entrepreneurship Education, our mission, vision, and commitment to advancing academic research.',
      keywords: 'about NIJOBED, mission, vision, academic journal, business education',
      path: '/about'
    },
    contact: {
      title: 'Contact Us - NIJOBED',
      description: 'Get in touch with the NIJOBED editorial team. Contact information for submissions, inquiries, and collaboration opportunities.',
      keywords: 'contact NIJOBED, editorial team, submissions, inquiries',
      path: '/contact'
    },
    guide: {
      title: 'Submission Guide - NIJOBED',
      description: 'Complete guide for authors submitting manuscripts to NIJOBED. Learn about our submission process, formatting requirements, and review procedures.',
      keywords: 'submission guide, manuscript submission, author guidelines, formatting requirements',
      path: '/guide'
    },
    editorialBoard: {
      title: 'Editorial Board - NIJOBED',
      description: 'Meet our distinguished editorial board members and their expertise in business education and entrepreneurship research.',
      keywords: 'editorial board, editors, academic experts, business education experts',
      path: '/editorial-board'
    },
    login: {
      title: 'Login - NIJOBED',
      description: 'Login to your NIJOBED account to access submission portal, manage your manuscripts, and track review status.',
      keywords: 'login, user account, submission portal, manuscript management',
      path: '/login',
      noIndex: true
    },
    register: {
      title: 'Register - NIJOBED',
      description: 'Create your NIJOBED account to submit manuscripts, access exclusive content, and join our academic community.',
      keywords: 'register, create account, manuscript submission, academic community',
      path: '/register',
      noIndex: true
    },
    dashboard: {
      title: 'Dashboard - NIJOBED',
      description: 'Access your NIJOBED dashboard to manage submissions, track review status, and update your profile.',
      keywords: 'dashboard, user portal, manuscript management, submissions',
      path: '/dashboard',
      noIndex: true
    }
  },
  
  // Structured data templates
  STRUCTURED_DATA: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Nigerian Journal of Business and Entrepreneurship Education",
      "alternateName": "NIJOBED",
      "url": "https://www.nijobed.com.ng",
      "logo": "https://www.nijobed.com.ng/images/logo.JPG",
      "description": "NIJOBED is Nigeria's premier academic journal publishing cutting-edge research in business education, entrepreneurship, and related fields.",
      "sameAs": [
        "https://twitter.com/nijobed",
        "https://facebook.com/nijobed",
        "https://linkedin.com/company/nijobed"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Editorial Office",
        "email": "editor@nijobed.com.ng"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Nigeria"
      }
    },
    
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Nigerian Journal of Business and Entrepreneurship Education",
      "alternateName": "NIJOBED",
      "url": "https://www.nijobed.com.ng",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.nijobed.com.ng/journals?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    
    periodical: {
      "@context": "https://schema.org",
      "@type": "Periodical",
      "name": "Nigerian Journal of Business and Entrepreneurship Education",
      "alternateName": "NIJOBED",
      "issn": "XXXX-XXXX",
      "publisher": {
        "@type": "Organization",
        "name": "Nigerian Journal of Business and Entrepreneurship Education"
      },
      "url": "https://www.nijobed.com.ng"
    }
  },
  
  // Meta tag configurations
  META_TAGS: {
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',
    language: 'English',
    robots: 'index, follow',
    revisitAfter: '7 days',
    distribution: 'global',
    rating: 'general',
    author: 'Nigerian Journal of Business and Entrepreneurship Education'
  },
  
  // Open Graph defaults
  OPEN_GRAPH: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NIJOBED'
  },
  
  // Twitter Card defaults
  TWITTER: {
    card: 'summary_large_image',
    site: '@nijobed',
    creator: '@nijobed'
  }
};

// Helper functions
export const getFullUrl = (path = '') => {
  return `${SEO_CONFIG.BASE_URL}${path}`;
};

export const getImageUrl = (imagePath) => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${SEO_CONFIG.BASE_URL}${imagePath}`;
};

export const getPageConfig = (pageName) => {
  return SEO_CONFIG.PAGES[pageName] || SEO_CONFIG.PAGES.home;
};

export default SEO_CONFIG;
