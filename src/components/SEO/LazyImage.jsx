import { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/images/placeholder.jpg',
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(true); // Still set to loaded to remove placeholder
  };

  return (
    <div ref={imgRef} className={`lazy-image-container ${className}`} {...props}>
      {!isLoaded && (
        <img
          src={placeholder}
          alt={alt}
          className={`lazy-image-placeholder ${className}`}
          style={{ filter: 'blur(5px)', transition: 'filter 0.3s' }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            position: isLoaded ? 'static' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
