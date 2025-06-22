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
  // Ensuring all desired links appear exactly once and are in a logical order
  const mainNavigationLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/journals", label: "Journals", icon: <FaJournalWhills /> },
    { to: "/submission", label: "Submit", icon: <FaUpload /> },
    { to: "/editorial-board", label: "Editorial", icon: <FaUsers /> },
    { to: "/about", label: "About Us", icon: <FaInfoCircle /> }, // Corrected label
    { to: "/archive", label: "Archive", icon: <FaArchive /> },   // Re-added
    { to: "/guide", label: "Guide", icon: <FaBook /> },
    { to: "/contact", label: "Contact Us", icon: <FaEnvelope /> }, // Re-added and corrected label
    // Dashboard, Manage, and Upload (Journals) were originally secondary and should be included
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> }, // Ensures single instance
    { to: "/manage-journals", label: "Manage", icon: <FaCog /> },
    { to: "/journals/uploads", label: "Upload Papers", icon: <FaCloudUploadAlt /> } // Clarified label for submission distinction
  ];


  // User navigation links (remain unchanged, as they depend on 'user' prop)
  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> }, // This Dashboard might be redundant if user is logged in and it's already in mainNavLinks
    { to: "/updateprofile", label: "Profile", icon: <FaUser /> },
    { to: "/logout", label: "Logout", icon: <FaSignOutAlt /> }
  ] : [
    { to: "/register", label: "Register", icon: <FaUserPlus /> },
    { to: "/login", label: "Login", icon: <FaSignInAlt /> }
  ];

  // CONSIDERATION: Handle duplicate 'Dashboard' if user is logged in
  // If 'user' is logged in, and 'Dashboard' is in mainNavigationLinks,
  // the 'userNavLinks' Dashboard might be a duplicate.
  // A common pattern is to have the Dashboard link only appear in the main nav OR user menu, not both.
  // For now, I've kept it as per your original structure, but it's something to review.
  // If you want to remove the dashboard from userNavLinks when mainNavLinks has it,
  // you'd filter userNavLinks. Example:
  /*
  const filteredUserNavLinks = user ?
    userNavLinks.filter(link => link.to !== "/dashboard")
    : userNavLinks;
  // And then use filteredUserNavLinks in the render
  */


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
              {userNavLinks.map((link) => ( // Using original userNavLinks
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
                  {userNavLinks.map((link) => ( // Using original userNavLinks
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