import React, { useState, useEffect } from 'react';
import './Carousel.css';

export default function Carousel({
  images = [],
  autoplaySpeed = 5000,
  height = 500,
  activeIndex = 0,
  setActiveIndex = () => {}
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use the specified images from the images folder
  const defaultImages = [
    {
      src: "/images/image1.JPG.JPG",
      alt: "COELSN Journal",
      title: "Advancing Academic Excellence",
      description: "Promoting innovative research across disciplines"
    },
    {
      src: "/images/image2.JPG.JPG",
      alt: "Academic Research",
      title: "Interdisciplinary Collaboration",
      description: "Connecting researchers across academic boundaries"
    },
    {
      src: "/images/image3.JPG.JPG",
      alt: "Research Development",
      title: "Global Research Impact",
      description: "Publishing research that shapes our understanding of the world"
    }
  ];

  // Use default images if none provided
  const carouselImages = images.length > 0 ? images : defaultImages;

  // Process images to ensure they have all required properties
  const processedImages = carouselImages.map((image, index) => {
    return {
      src: image.src || '',
      fallbackSrc: image.fallbackSrc || '',
      alt: image.alt || `Slide ${index + 1}`,
      title: image.title || '',
      description: image.description || ''
    };
  });

  // Handle image loading
  const handleImageLoad = (index) => {
    console.log(`Image ${index} loaded successfully`);
  };

  // Handle image error
  const handleImageError = (index) => {
    console.log(`Image ${index} failed to load`);
  };

  // Auto-advance slides
  useEffect(() => {
    if (autoplaySpeed <= 0) return;

    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setActiveIndex((current) =>
          current === processedImages.length - 1 ? 0 : current + 1
        );

        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      }
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplaySpeed, processedImages.length, isTransitioning, setActiveIndex]); // Added setActiveIndex to dependency array

  // If no images available, show placeholder
  if (processedImages.length === 0) {
    return (
      <div className="modern-carousel">
        <div className="carousel-header">
          {/* Removed title prop, as it's not defined or passed to this component */}
        </div>
        <div className="carousel-placeholder">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-carousel" style={{ height: `${height}px` }}>
      {/* Main carousel content */}
      <div className="carousel-content">
        {/* Image slides */}
        <div className="carousel-slides">
          {processedImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === activeIndex ? "active" : ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="carousel-image"
                onLoad={() => handleImageLoad(index)}
                onError={(e) => {
                  console.log(`Using fallback image for: ${image.alt}`);
                  e.target.onerror = null; // Prevent infinite loop

                  const imagePath = image.src.substring(0, image.src.lastIndexOf('/') + 1);
                  const imageName = image.src.substring(image.src.lastIndexOf('/') + 1);

                  const variations = [
                    imagePath + imageName.toLowerCase(),
                    imagePath + imageName.toUpperCase(),
                    imagePath + imageName.replace('.JPG', '.jpg'),
                    imagePath + imageName.replace('.jpg', '.JPG'),
                    imagePath + imageName.replace('.JPG', '.jpeg'),
                    imagePath + imageName.replace('.jpg', '.jpeg'),
                    imagePath + 'Image' + imageName.substring(5),
                    imagePath + 'image' + imageName.substring(5),
                  ];

                  if (variations.length > 0) {
                    console.log('Trying alternative image path:', variations[0]);
                    e.target.src = variations[0];
                  } else {
                    e.target.src = image.fallbackSrc || "/images/image1.JPG.JPG";
                  }

                  handleImageError(index);
                }}
                style={{ objectPosition: 'center center' }}
              />

              {/* Removed: No caption overlay */}
              {/* Removed: Progress bar for current slide - keeping it if you want it*/}
              {index === activeIndex && (
                <div className="carousel-progress">
                  <div
                    className="carousel-progress-bar"
                    style={{
                      animationDuration: `${autoplaySpeed}ms`,
                      animationPlayState: isTransitioning ? 'paused' : 'running'
                    }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}