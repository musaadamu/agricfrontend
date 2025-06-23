// Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Info, 
  HelpCircle, 
  Mail, 
  Archive, 
  Users,
  LogIn, 
  UserPlus, 
  User, 
  LogOut,
  LayoutDashboard,
  Upload,
  Settings,
  FileText,
  Menu,
  X
} from 'lucide-react';
import './Navigation.css';

const Navigation = ({ user }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const publicItems = [
      { path: '/', label: 'Home', icon: Home },
      { path: '/journals', label: 'Journals', icon: BookOpen },
      { path: '/archive', label: 'Archive', icon: Archive },
      { path: '/editorial-board', label: 'Editorial Board', icon: Users },
      { path: '/about', label: 'About', icon: Info },
      { path: '/guide', label: 'Guide', icon: HelpCircle },
      { path: '/contact', label: 'Contact', icon: Mail },
    ];

    const authenticatedItems = [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/submission', label: 'Submit Article', icon: FileText },
      { path: '/updateprofile', label: 'Profile', icon: User },
    ];

    const adminItems = [
      { path: '/journals/uploads', label: 'Upload Journal', icon: Upload },
      { path: '/manage-journals', label: 'Manage Journals', icon: Settings },
    ];

    let items = [...publicItems];

    if (user) {
      items = [...items, ...authenticatedItems];
      
      // Add admin-only items if user is admin
      if (user.role === 'admin') {
        items = [...items, ...adminItems];
      }
    }

    return items;
  };

  const getUserItems = () => {
    if (user) {
      return [
        { path: '/logout', label: 'Logout', icon: LogOut, className: 'user-cta' }
      ];
    } else {
      return [
        { path: '/login', label: 'Login', icon: LogIn },
        { path: '/register', label: 'Register', icon: UserPlus, className: 'user-cta' }
      ];
    }
  };

  const navigationItems = getNavigationItems();
  const userItems = getUserItems();

  return (
    <nav className="modern-navigation">
      <div className="nav-container">
        {/* Brand */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">
              <img 
                src="images/logo.JPG" 
                alt="Journal Logo" 
                className="logo-img"
              />
            </div>
            <div className="brand-text">
              <h1 className="brand-title">NIJOBED</h1>
              <span className="brand-subtitle">Academic Journal</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-content">
          {/* Primary Navigation */}
          <div className="nav-primary">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'nav-item-active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Navigation */}
          <div className="nav-user">
            {userItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`user-item ${item.className || ''} ${isActive(item.path) ? 'user-item-active' : ''}`}
                >
                  <Icon className="user-icon" />
                  <span className="user-label">{item.label}</span>
                </Link>
              );
            })}
            {user && (
              <span className="user-item user-welcome">
                <User className="user-icon" />
                <span className="user-label">Welcome, {user.name}</span>
              </span>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="nav-mobile-controls">
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Open mobile menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Overlay and Menu */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'overlay-open' : ''}`}>
        <div className="mobile-menu">
          {/* Mobile Header */}
          <div className="mobile-header">
            <div className="mobile-brand">
              <img 
                src="images/logo.JPG" 
                alt="Journal Logo" 
                className="mobile-logo"
              />
              <div className="mobile-brand-text">
                <h2 className="mobile-title">NIJOBED</h2>
                <span className="mobile-subtitle">Academic Journal</span>
              </div>
            </div>
            <button
              className="mobile-close"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <X />
            </button>
          </div>

          {/* Mobile Content */}
          <div className="mobile-content">
            {/* User Welcome Section */}
            {user && (
              <div className="mobile-section">
                <h3 className="mobile-section-title">Welcome, {user.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', padding: '0 0.75rem' }}>
                  Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            )}

            {/* Navigation Links */}
            <div className="mobile-section">
              <h3 className="mobile-section-title">Navigation</h3>
              <div className="mobile-links">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`mobile-link ${isActive(item.path) ? 'mobile-link-active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <Icon className="mobile-link-icon" />
                      <span className="mobile-link-text">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Actions */}
            <div className="mobile-section">
              <h3 className="mobile-section-title">Account</h3>
              <div className="mobile-links">
                {userItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`mobile-link ${item.className === 'user-cta' ? 'mobile-cta' : ''} ${isActive(item.path) ? 'mobile-link-active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <Icon className="mobile-link-icon" />
                      <span className="mobile-link-text">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;