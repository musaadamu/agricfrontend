// SEO Configuration for JOVOTE
export const SEO_CONFIG = {
  // Domain configuration (use environment variables in production)
  DOMAIN: process.env.REACT_APP_DOMAIN || 'agricfrontend.vercel.app',
  BASE_URL: process.env.REACT_APP_FRONTEND_URL || 'https://agricfrontend.vercel.app',
  
  // Default SEO settings
  DEFAULT_TITLE: process.env.REACT_APP_SITE_NAME ?
    `${process.env.REACT_APP_SITE_NAME} - Journal of Vocational Teacher Education` :
    'Journal of Vocational Teacher Education (JOVOTE)',
  DEFAULT_DESCRIPTION: process.env.REACT_APP_SITE_DESCRIPTION ||
    'JOVOTE is a premier academic journal publishing cutting-edge research in vocational teacher education, technical education, and related fields. Explore the latest scholarly articles and research findings.',
  DEFAULT_KEYWORDS: 'vocational education, teacher education, academic journal, research, Nigeria, JOVOTE, technical education, education research, scholarly articles',
  DEFAULT_AUTHOR: 'Journal of Vocational Teacher Education',
  DEFAULT_IMAGE: '/images/logo.JPG',
  
  // Social media handles
  SOCIAL_MEDIA: {
    twitter: process.env.REACT_APP_TWITTER_HANDLE || '@jovote',
    facebook: process.env.REACT_APP_FACEBOOK_PAGE || 'jovote',
    linkedin: process.env.REACT_APP_LINKEDIN_PAGE || 'company/jovote'
  },

  // Contact information
  CONTACT: {
    email: process.env.REACT_APP_CONTACT_EMAIL || 'jovote2025@gmail.com',
    phone: '+234-803-494-2253',
    address: 'Potiskum, Yobe State, Nigeria'
  },
  
  // Journal specific information
  JOURNAL_INFO: {
    fullName: 'Journal of Vocational Teacher Education',
    abbreviation: 'JOVOTE',
    issn: '978799-416',
    publisher: 'Journal of Vocational Teacher Education',
    language: 'en',
    country: 'Nigeria',
    subjects: [
      'Vocational Education',
      'Teacher Education',
      'Technical Education',
      'Educational Research',
      'Skills Development',
      'Professional Development'
    ]
  },
  
  // Page-specific SEO configurations
  PAGES: {
    home: {
      title: 'Home - Journal of Vocational Teacher Education (JOVOTE)',
      description: 'Welcome to JOVOTE, Nigeria\'s premier academic journal for vocational teacher education research. Discover cutting-edge research and scholarly articles.',
      keywords: 'vocational education, teacher education, academic journal, research, Nigeria, JOVOTE, home',
      path: '/'
    },
    journals: {
      title: 'Published Journals - JOVOTE',
      description: 'Browse our collection of published academic journals covering vocational education, teacher training, and related fields. Access peer-reviewed research articles.',
      keywords: 'published journals, academic articles, vocational research, teacher education studies, peer-reviewed',
      path: '/journals'
    },
    archive: {
      title: 'Journal Archive - JOVOTE',
      description: 'Explore our comprehensive archive of past journal publications. Access historical research in vocational education and teacher training.',
      keywords: 'journal archive, past publications, historical research, vocational education archive',
      path: '/archive'
    },
    about: {
      title: 'About Us - JOVOTE',
      description: 'Learn about the Journal of Vocational Teacher Education, our mission, vision, and commitment to advancing academic research.',
      keywords: 'about JOVOTE, mission, vision, academic journal, vocational education',
      path: '/about'
    },
    contact: {
      title: 'Contact Us - JOVOTE',
      description: 'Get in touch with the JOVOTE editorial team. Contact information for submissions, inquiries, and collaboration opportunities.',
      keywords: 'contact JOVOTE, editorial team, submissions, inquiries',
      path: '/contact'
    },
    guide: {
      title: 'Submission Guide - JOVOTE',
      description: 'Complete guide for authors submitting manuscripts to JOVOTE. Learn about our submission process, formatting requirements, and review procedures.',
      keywords: 'submission guide, manuscript submission, author guidelines, formatting requirements',
      path: '/guide'
    },
    editorialBoard: {
      title: 'Editorial Board - JOVOTE',
      description: 'Meet our distinguished editorial board members and their expertise in vocational education and teacher training research.',
      keywords: 'editorial board, editors, academic experts, vocational education experts',
      path: '/editorial-board'
    },
    login: {
      title: 'Login - JOVOTE',
      description: 'Login to your JOVOTE account to access submission portal, manage your manuscripts, and track review status.',
      keywords: 'login, user account, submission portal, manuscript management',
      path: '/login',
      noIndex: true
    },
    register: {
      title: 'Register - JOVOTE',
      description: 'Create your JOVOTE account to submit manuscripts, access exclusive content, and join our academic community.',
      keywords: 'register, create account, manuscript submission, academic community',
      path: '/register',
      noIndex: true
    },
    dashboard: {
      title: 'Dashboard - JOVOTE',
      description: 'Access your JOVOTE dashboard to manage submissions, track review status, and update your profile.',
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
      "name": "Journal of Vocational Teacher Education",
      "alternateName": "JOVOTE",
      "url": "https://agricfrontend.vercel.app",
      "logo": "https://agricfrontend.vercel.app/images/logo.JPG",
      "description": "JOVOTE is a premier academic journal publishing cutting-edge research in vocational teacher education, technical education, and related fields.",
      "sameAs": [
        "https://twitter.com/jovote",
        "https://facebook.com/jovote",
        "https://linkedin.com/company/jovote"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Editorial Office",
        "email": "jovote2025@gmail.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Nigeria"
      }
    },
    
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Journal of Vocational Teacher Education",
      "alternateName": "JOVOTE",
      "url": "https://agricfrontend.vercel.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://agricfrontend.vercel.app/journals?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    periodical: {
      "@context": "https://schema.org",
      "@type": "Periodical",
      "name": "Journal of Vocational Teacher Education",
      "alternateName": "JOVOTE",
      "issn": "978799-416",
      "publisher": {
        "@type": "Organization",
        "name": "Journal of Vocational Teacher Education"
      },
      "url": "https://agricfrontend.vercel.app"
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
    author: 'Journal of Vocational Teacher Education'
  },

  // Open Graph defaults
  OPEN_GRAPH: {
    type: 'website',
    locale: 'en_US',
    siteName: 'JOVOTE'
  },

  // Twitter Card defaults
  TWITTER: {
    card: 'summary_large_image',
    site: '@jovote',
    creator: '@jovote'
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
