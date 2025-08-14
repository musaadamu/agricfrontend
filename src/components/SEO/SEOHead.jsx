import { useEffect } from 'react';
import { updateMetaTags, injectStructuredData, DEFAULT_SEO } from '../../utils/seo';

const SEOHead = ({
  title,
  description,
  keywords,
  author,
  image,
  url,
  type = 'website',
  siteName = 'NIJOBED',
  structuredData = null,
  noIndex = false,
  canonical = null
}) => {
  useEffect(() => {
    // Merge with defaults
    const seoData = {
      title: title || DEFAULT_SEO.title,
      description: description || DEFAULT_SEO.description,
      keywords: keywords || DEFAULT_SEO.keywords,
      author: author || DEFAULT_SEO.author,
      image: image || DEFAULT_SEO.image,
      url: url || DEFAULT_SEO.url,
      type,
      siteName
    };

    // Update meta tags
    updateMetaTags(seoData);

    // Handle robots meta tag
    const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow';
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsTag) {
      robotsTag.setAttribute('content', robotsContent);
    } else {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      robotsTag.setAttribute('content', robotsContent);
      document.head.appendChild(robotsTag);
    }

    // Handle canonical URL
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonical);
      } else {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        canonicalTag.setAttribute('href', canonical);
        document.head.appendChild(canonicalTag);
      }
    }

    // Add academic citation meta tags
    const citationTags = [
      { name: 'citation_journal_title', content: 'Nigerian Journal of Business and Entrepreneurship Education' },
      { name: 'citation_journal_abbrev', content: 'NIJOBED' },
      { name: 'citation_publisher', content: 'Nigerian Journal of Business and Entrepreneurship Education' }
    ];

    citationTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (element) {
        element.setAttribute('content', tag.content);
      } else {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        element.setAttribute('content', tag.content);
        document.head.appendChild(element);
      }
    });

    // Inject structured data
    if (structuredData) {
      injectStructuredData(structuredData);
    }

  }, [title, description, keywords, author, image, url, type, siteName, structuredData, noIndex, canonical]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
