import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      src: "/images/image1.JPG",
      alt: "Business Education Research",
      title: "Advancing Business Education Research",
      description: "Leading research in business, management, and entrepreneurship education"
    },
    {
      src: "/images/image2.JPG",
      alt: "Academic Excellence",
      title: "Fostering Academic Excellence",
      description: "Promoting quality research and innovation"
    },
    {
      src: "/images/image3.JPG",
      alt: "Business Innovation",
      title: "Driving Business Innovation",
      description: "Advancing teaching and learning in business and entrepreneurship"
    },
    {
      src: "/images/image4.JPG",
      alt: "Business Research Community",
      title: "Building Business Research Community",
      description: "Fostering collaboration in business and entrepreneurship education"
    },
    {
      src: "/images/image5.JPG",
      alt: "Future of Business Education",
      title: "Shaping the Future of Business Education",
      description: "Innovating business and entrepreneurship education in Nigeria"
    }
  ];

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="modern-carousel-container">
      <div 
        className="carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides */}
        <div className="carousel-slides">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="carousel-image"
              />
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <h2 className="carousel-title">{slide.title}</h2>
                  <p className="carousel-description">{slide.description}</p>
                  <div className="carousel-buttons">
                    <button className="btn-primary">Explore Research</button>
                    <button className="btn-secondary">Submit Article</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button className="carousel-nav prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <button className="carousel-nav next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>

        {/* Play/Pause */}
        <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          )}
        </button>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="slide-counter">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Carousel;