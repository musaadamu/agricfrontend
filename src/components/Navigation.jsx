import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaJournalWhills,
  FaUpload,        // For JournalSubmission
  FaUsers,
  FaInfoCircle,
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt,
  FaArchive,
  FaBook,
  FaEnvelope,
  FaCog,            // For ManageJournal
  FaCloudUploadAlt, // For JournalUpload (Admin)
  FaBars,
  FaTimes
} from 'react-icons/fa';
import "./Navigation.css";

// Removed toggleSidebar prop as it's not passed from App.js
const Navigation = ({ user }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoPath = "/images/logo.JPG"; // Ensure this path is correct relative to public folder

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- CONSOLIDATED AND CORRECTED MAIN NAVIGATION LINKS ---
  // Based on your App.js routes
  const mainNavigationLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/journals", label: "Journals", icon: <FaJournalWhills /> },
    { to: "/submission", label: "Submit Paper", icon: <FaUpload /> }, // User/Author submission
    { to: "/editorial-board", label: "Editorial", icon: <FaUsers /> },
    { to: "/about", label: "About Us", icon: <FaInfoCircle /> },
    { to: "/archive", label: "Archive", icon: <FaArchive /> },
    { to: "/guide", label: "Guide", icon: <FaBook /> },
    { to: "/contact", label: "Contact Us", icon: <FaEnvelope /> },
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> }, // Common dashboard link
    { to: "/manage-journals", label: "Manage Journals", icon: <FaCog /> }, // Admin-specific management
    { to: "/journals/uploads", label: "Upload Journals", icon: <FaCloudUploadAlt /> } // Admin-specific upload
  ];

  // User navigation links - now specifically handling login/register vs. profile/logout
  // Dashboard is removed from here if user is logged in to avoid duplication with main nav.
  const userNavLinks = user ? [
    { to: "/updateprofile", label: "Profile", icon: <FaUser /> },
    { to: "/logout", label: "Logout", icon: <FaSignOutAlt /> }
  ] : [
    { to: "/register", label: "Register", icon: <FaUserPlus /> },
    { to: "/login", label: "Login", icon: <FaSignInAlt /> }
  ];

  return (
    <nav className="modern-navigation">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-brand">
          <NavLink to="/" className="brand-link">
            <div className="brand-logo">
              <img src={logoPath} alt="IJIRSTME" className="logo-img" />
            </div>
            <div className="brand-text">
              <span className="brand-title">IJIRSTME</span>
              <span className="brand-subtitle">Journal of Research</span>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="nav-content">
            {/* Primary Navigation - All main links displayed horizontally */}
            <div className="nav-primary">
              {mainNavigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'nav-item-active' : ''}`
                  }
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </NavLink>
              ))}
            </div>

            {/* User Section */}
            <div className="nav-user">
              {userNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `user-item ${isActive ? 'user-item-active' : ''} ${
                      link.label === 'Login' || link.label === 'Register' ? 'user-cta' : ''
                    }`
                  }
                  title={link.label}
                >
                  <span className="user-icon">{link.icon}</span>
                  <span className="user-label">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Controls */}
        {isMobile && (
          <div className="nav-mobile-controls">
            {/* Removed toggleSidebar button here as prop is no longer passed */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div className={`mobile-overlay ${mobileMenuOpen ? 'overlay-open' : ''}`}>
          <div className="mobile-menu">
            <div className="mobile-header">
              <div className="mobile-brand">
                <img src={logoPath} alt="IJIRSTME" className="mobile-logo" />
                <div className="mobile-brand-text">
                  <span className="mobile-title">IJIRSTME</span>
                  <span className="mobile-subtitle">Navigation Menu</span>
                </div>
              </div>
              <button
                className="mobile-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mobile-content">
              {/* All Main Navigation Links in Mobile */}
              <div className="mobile-section">
                <h4 className="mobile-section-title">Main Navigation</h4>
                <div className="mobile-links">
                  {mainNavigationLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `mobile-link ${isActive ? 'mobile-link-active' : ''}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      <span className="mobile-link-text">{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* User Links in Mobile */}
              <div className="mobile-section">
                <h4 className="mobile-section-title">Account</h4>
                <div className="mobile-links">
                  {userNavLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `mobile-link ${isActive ? 'mobile-link-active' : ''} ${
                          link.label === 'Login' || link.label === 'Register' ? 'mobile-cta' : ''
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      <span className="mobile-link-text">{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;