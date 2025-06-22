import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaJournalWhills,
  FaUpload,
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
  FaCog,
  FaCloudUploadAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import "./Navigation.css";

const Navigation = ({ user, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoPath = "/images/logo.JPG";

  useEffect(() => {
    const handleResize = () => {
      // Set mobile state based on window width
      setIsMobile(window.innerWidth <= 1024);
      // Close mobile menu if resized to desktop
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- Consolidated Navigation Links ---
  // Ensuring all desired links are in one array for horizontal display
  const mainNavigationLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/journals", label: "Journals", icon: <FaJournalWhills /> },
    { to: "/submission", label: "Submit", icon: <FaUpload /> },
    { to: "/editorial-board", label: "Editorial", icon: <FaUsers /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> }, // Formerly secondary
    { to: "/archive", label: "Archive", icon: <FaArchive /> },         // Formerly secondary
    { to: "/guide", label: "Guide", icon: <FaBook /> },               // Formerly secondary
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },         // Formerly secondary
    { to: "/manage-journals", label: "Manage", icon: <FaCog /> },     // Formerly secondary
    { to: "/journals/uploads", label: "Upload", icon: <FaCloudUploadAlt /> } // Formerly secondary
  ];

  // User navigation links (remain unchanged)
  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
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
        {/* Only display on desktop sizes (window width > 1024px) */}
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
        {/* Display on mobile sizes (window width <= 1024px) */}
        {isMobile && (
          <div className="nav-mobile-controls">
            {toggleSidebar && (
              <button
                className="sidebar-toggle-btn"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <FaBars />
              </button>
            )}

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