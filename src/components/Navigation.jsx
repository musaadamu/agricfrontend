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
  FaChevronDown,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import "./Navigation.css";

const Navigation = ({ user, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logoPath = "/images/logo.JPG";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Core navigation links with icons
  const coreNavLinks = [
    { to: "/", label: "Home", icon: <FaHome />, priority: 1 },
    { to: "/journals", label: "Journals", icon: <FaJournalWhills />, priority: 2 },
    { to: "/submission", label: "Submit", icon: <FaUpload />, priority: 3 },
    { to: "/editorial-board", label: "Editorial", icon: <FaUsers />, priority: 4 },
    { to: "/about", label: "About", icon: <FaInfoCircle />, priority: 5 }
  ];

  // Secondary navigation links for dropdown
  const secondaryNavLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/archive", label: "Archive", icon: <FaArchive /> },
    { to: "/guide", label: "Guide", icon: <FaBook /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
    { to: "/manage-journals", label: "Manage", icon: <FaCog /> },
    { to: "/journals/uploads", label: "Upload", icon: <FaCloudUploadAlt /> }
  ];

  // User navigation links
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
        {!isMobile && (
          <div className="nav-content">
            {/* Primary Navigation */}
            <div className="nav-primary">
              {coreNavLinks.map((link) => (
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
              
              {/* More Dropdown */}
              <div className="dropdown-container">
                <button 
                  className={`dropdown-trigger ${dropdownOpen ? 'dropdown-active' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="nav-icon"><FaCog /></span>
                  <span className="nav-label">More</span>
                  <FaChevronDown className={`dropdown-icon ${dropdownOpen ? 'rotated' : ''}`} />
                </button>
                
                <div className={`dropdown-menu ${dropdownOpen ? 'dropdown-open' : ''}`}>
                  <div className="dropdown-header">
                    <span>Additional Options</span>
                  </div>
                  {secondaryNavLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="dropdown-icon">{link.icon}</span>
                      <span className="dropdown-label">{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            
            {/* User Section */}
            <div className="nav-user">
              {userNavLinks.map((link, index) => (
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
              {/* Primary Links */}
              <div className="mobile-section">
                <h4 className="mobile-section-title">Main Navigation</h4>
                <div className="mobile-links">
                  {coreNavLinks.map((link) => (
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
              
              {/* Secondary Links */}
              <div className="mobile-section">
                <h4 className="mobile-section-title">Additional Options</h4>
                <div className="mobile-links">
                  {secondaryNavLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="mobile-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      <span className="mobile-link-text">{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
              
              {/* User Links */}
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