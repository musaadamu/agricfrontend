// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import JournalList from "../components/JournalList.jsx";
// import './Home.css';
// import Carousel from "../components/Carousel.jsx";
// import './WelcomeSection.css';
// import './FeaturedArticles.css';

// export default function HomePage() {
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//     // Handle window resize
//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return (
//         <div className="home-container">
//             <div className="min-h-screen bg-gray-50 text-gray-900">
//                 <div className="main-container">
//                     <main className="main-content">
//                         {/* Journal Title */}
//                         <div className="journal-title-container">
//                             <h1 className="journal-main-title">Nigerian Journal of Business and Entrepreneurship Education</h1>
//                         </div>

//                         {/* Modern Carousel Section */}
//                         <div className="home-carousel-wrapper">
//                             <Carousel />
//                         </div>

//                         {/* Enhanced Welcome Section */}
//                         <div className="welcome-section-enhanced">
//                             <div className="welcome-content-full">
//                                 <div className="welcome-text-container">

//                                     <h1 className="welcome-heading-enhanced">
//                                         Advancing Excellence in <span className="highlight-text">Business & Entrepreneurship Education</span>
//                                     </h1>
//                                     <p className="welcome-description">
//                                         The Nigerian Journal of Business and Entrepreneurship Education serves as a premier scholarly platform, 
//                                         fostering groundbreaking research, innovative methodologies, and evidence-based practices in business 
//                                         education, entrepreneurial development, and economic advancement across Nigeria and beyond.
//                                     </p>
//                                 </div> 
//                                 <div className="welcome-actions-enhanced">
//                                     <Link to="/submission" className="action-button primary-enhanced">
//                                         <span>Submit Your Research</span>
//                                         <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                         </svg>
//                                     </Link>
//                                     <Link to="/about" className="action-button secondary-enhanced">
//                                         <span>Explore Our Journal</span>
//                                         <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Featured Articles Section */}
//                         <div className="featured-articles-section">
//                             <h1 className="featured-title">Featured Articles</h1>
//                             <p className="featured-subtitle">Discover the latest research from Nigerian Journal of Business and Entrepreneurship Education</p>
//                             <div className="search-bar">
//                                 <input type="text" className="search-input" placeholder="Search articles by keyword, title, author..." />
//                             </div>
//                             <div className="filter-section">
//                                 <span className="filter-item active">All</span>
//                                 <span className="filter-item">Finance</span>
//                                 <span className="filter-item">Economics</span>
//                                 <span className="filter-item">Accounting</span>
//                                 <span className="filter-item">Entrepreneurship</span>
//                                 <span className="filter-item">Marketing</span>
//                                 <span className="filter-item">Management</span>
//                                 <span className="filter-item">Office Practice</span>
//                             </div>
//                             <JournalList />
//                             <div className="no-results">No journals found matching your criteria.</div>
//                             <Link to="/journals" className="view-all-button">View All Articles →</Link>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import JournalList from "../components/JournalList.jsx";
// Temporarily comment out SEO imports to fix deployment
// import SEOHead from "../components/SEO/SEOHead.jsx";
// import { useSEO } from "../hooks/useSEO.js";
// import { getPageSEO } from "../utils/seo.js";
import './Home.css';
import Carousel from "../components/Carousel.jsx"; // Assuming this is your Carousel component, adjust if the filename is 'ImprovedCarousel.jsx'
import './WelcomeSection.css';
import './FeaturedArticles.css';

export default function HomePage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Temporarily comment out SEO setup
    // const homeSEO = getPageSEO('home');
    // const homeStructuredData = { ... };
    // useSEO(homeSEO, homeStructuredData);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="home-container">
            {/* Temporarily comment out SEO component */}
            {/* <SEOHead title={...} /> */}
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <div className="main-container">
                    <main className="main-content">
                        {/* Journal Title */}
                        <div className="journal-title-container">
                            <h1 className="journal-main-title responsive-journal-title">
                                {isMobile ? (
                                    <>
                                        Journal of Vocational<br />
                                        Teacher Education <br />
                                        <span className="journal-abbr">(JOVOTE)</span>
                                    </>
                                ) : (
                                    <>Journal of Vocational Teacher Education <span className="journal-abbr">(JOVOTE)</span></>
                                )}
                            </h1>
                        </div>

                        {/* Modern Carousel Section */}
                        <div className="home-carousel-wrapper">
                            <Carousel />
                        </div>

                        {/* Carousel Caption displayed below on smaller devices only */}
                        {isMobile && (
                            <div className="carousel-caption-container carousel-caption-hidden-desktop">
                                <div className="carousel-caption-box">
                                    <h2>Empowering Vocational Excellence</h2>
                                    <p>Advancing innovative research in vocational teacher education, connecting educators across technical disciplines, and publishing research that transforms vocational education in Nigeria and beyond.</p>
                                </div>
                            </div>
                        )}

                        {/* Enhanced Welcome Section */}
                        <div className="welcome-section-enhanced">
                            <div className="welcome-content-full">
                                <div className="welcome-text-container">
                                    <h1 className="welcome-heading-enhanced">
                                        Transforming <span className="highlight-text">Vocational Teacher Education</span>
                                    </h1>
                                    <p className="welcome-description">
                                        JOVOTE is the premier multidisciplinary platform for the School of Secondary Education (Vocational), Federal College of Education (Technical) Potiskum.
                                        We champion cutting-edge research, innovative pedagogical approaches, and evidence-based practices that elevate vocational and technical education across Nigeria and the African continent.
                                    </p>
                                </div>
                                <div className="welcome-actions-enhanced">
                                    <Link to="/submission" className="action-button primary-enhanced">
                                        <span>Contribute Your Research</span>
                                        <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </Link>
                                    <Link to="/about" className="action-button secondary-enhanced">
                                        <span>Learn More</span>
                                        <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Published Journal Portal Access */}
                        <div className="published-journal-portal-section mb-16">
                            <div className="bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl p-8 text-white text-center">
                                <h2 className="text-3xl font-bold mb-4">JOVOTE Published Research Collection</h2>
                                <p className="text-lg mb-6 opacity-90">
                                    Explore our curated collection of peer-reviewed vocational education research with powerful search capabilities, comprehensive statistics, and easy submission tools.
                                </p>
                                <Link
                                    to="/published-journal-home"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Explore Published Research
                                </Link>
                            </div>
                        </div>

                        {/* Featured Articles Section */}
                        <div className="featured-articles-section">
                            <h1 className="featured-title">Latest Research Contributions</h1>
                            <p className="featured-subtitle">Explore cutting-edge research and innovative practices in vocational and technical education from JOVOTE</p>
                            <div className="search-bar">
                                <input type="text" className="search-input" placeholder="Search articles by keyword, title, author..." />
                            </div>
                            <div className="filter-section">
                                <span className="filter-item active">All</span>
                                <span className="filter-item">Vocational Education</span>
                                <span className="filter-item">Teacher Training</span>
                                <span className="filter-item">Curriculum Development</span>
                                <span className="filter-item">Technical Education</span>
                                <span className="filter-item">Skills Development</span>
                                <span className="filter-item">Educational Technology</span>
                                <span className="filter-item">Pedagogy</span>
                            </div>
                            <JournalList />
                            <div className="no-results">No journals found matching your criteria.</div>
                            <Link to="/journals" className="view-all-button">View All Articles →</Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}