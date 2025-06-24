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
import './Home.css';
import Carousel from "../components/Carousel.jsx"; // Assuming this is your Carousel component, adjust if the filename is 'ImprovedCarousel.jsx'
import './WelcomeSection.css';
import './FeaturedArticles.css';

export default function HomePage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <div className="main-container">
                    <main className="main-content">
                        {/* Journal Title */}
                        <div className="journal-title-container">
                            <h1 className="journal-main-title">
                                {isMobile ? (
                                    <>
                                        Nigerian Journal of Business<br />
                                        and Entrepreneurship Education <br />
                                        <span className="journal-abbr">(NIJOBED)</span>
                                    </>
                                ) : (
                                    <>Nigerian Journal of Business and Entrepreneurship Education <span className="journal-abbr">(NIJOBED)</span></>
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
                                    <h2>Advancing Academic Excellence</h2>
                                    <p>Promoting innovative research across disciplines, connecting researchers across academic boundaries, and publishing research that shapes our understanding of the world.</p>
                                </div>
                            </div>
                        )}

                        {/* Enhanced Welcome Section */}
                        <div className="welcome-section-enhanced">
                            <div className="welcome-content-full">
                                <div className="welcome-text-container">
                                    <h1 className="welcome-heading-enhanced">
                                        Promoting Excellence in <span className="highlight-text">Business & Entrepreneurship Education</span>
                                    </h1>
                                    <p className="welcome-description">
                                        The Nigerian Journal of Business and Entrepreneurship Education serves as a premier scholarly platform, 
                                        fostering groundbreaking research, innovative methodologies, and evidence-based practices in business 
                                        education, entrepreneurial development, and economic advancement across Nigeria and beyond.
                                    </p>
                                </div> 
                                <div className="welcome-actions-enhanced">
                                    <Link to="/submission" className="action-button primary-enhanced">
                                        <span>Submit Your Research</span>
                                        <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </Link>
                                    <Link to="/about" className="action-button secondary-enhanced">
                                        <span>Explore Our Journal</span>
                                        <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Featured Articles Section */}
                        <div className="featured-articles-section">
                            <h1 className="featured-title">Current Published Journals</h1>
                            <p className="featured-subtitle">Discover the latest research from Nigerian Journal of Business and Entrepreneurship Education</p>
                            <div className="search-bar">
                                <input type="text" className="search-input" placeholder="Search articles by keyword, title, author..." />
                            </div>
                            <div className="filter-section">
                                <span className="filter-item active">All</span>
                                <span className="filter-item">Finance</span>
                                <span className="filter-item">Economics</span>
                                <span className="filter-item">Accounting</span>
                                <span className="filter-item">Entrepreneurship</span>
                                <span className="filter-item">Marketing</span>
                                <span className="filter-item">Management</span>
                                <span className="filter-item">Office Practice</span>
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