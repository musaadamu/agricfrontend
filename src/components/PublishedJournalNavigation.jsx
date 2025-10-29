import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, Upload, Settings, Archive, 
  Search, BarChart3, FileText, Users, Menu, X,
  ArrowLeft, Calendar, Tags, Download
} from 'lucide-react';
import './Navigation.css';

const PublishedJournalNavigation = ({ user }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getPublishedJournalItems = () => {
    const publicItems = [
      { path: '/published-journal-home', label: 'Home', icon: Home },
      { path: '/published-journals', label: 'Browse Journals', icon: BookOpen },
      { path: '/published-journal-archive', label: 'Archive', icon: Archive },
      { path: '/published-journal-search', label: 'Advanced Search', icon: Search },
      { path: '/published-journal-stats', label: 'Statistics', icon: BarChart3 },
    ];

    const authenticatedItems = [
      { path: '/submit-journal', label: 'Submit Journal', icon: FileText },
    ];

    // Admin items for published journal system
    const adminItems =
      user && user.role && user.role.toLowerCase() === 'admin'
        ? [
            { path: '/manage-published-journals', label: 'Manage Journals', icon: Settings },
            { path: '/published-journal-upload', label: 'Upload Journal', icon: Upload },
            { path: '/published-journal-bulk', label: 'Bulk Operations', icon: FileText },
          ]
        : [];

    let items = [...publicItems];
    if (user) {
      items = [...items, ...authenticatedItems, ...adminItems];
    }
    return items;
  };

  const getUserItems = () => {
    if (user) {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: Users },
        { path: '/logout', label: 'Logout', icon: ArrowLeft, className: 'user-cta' },
      ];
    } else {
      return [
        { path: '/login', label: 'Login', icon: Users },
        { path: '/register', label: 'Register', icon: FileText, className: 'user-cta' },
      ];
    }
  };

  const navigationItems = getPublishedJournalItems();
  const userItems = getUserItems();

  return (
    <nav className="modern-navigation published-journal-nav">
      <div className="nav-container">
        {/* Brand */}
        <div className="nav-brand">
          <Link to="/published-journal-home" className="brand-link">
            <div className="brand-logo">
              <img src="/images/logo.JPG" alt="Journal Logo" className="logo-img" />
            </div>
            <div className="brand-text">
              <h1 className="brand-title">JOVOTE</h1>
              <span className="brand-subtitle">Published Journals</span>
            </div>
          </Link>
        </div>

        {/* Back to Main Site Link */}
        <div className="back-to-main">
          <Link 
            to="/" 
            className="back-link flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Main Site
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-content">
          <div className="nav-primary">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'nav-item-active' : ''}`}
                  title={item.label}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="nav-user">
            {userItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${item.className || ''} ${isActive(item.path) ? 'nav-item-active' : ''}`}
                  title={item.label}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {/* Back to Main Site - Mobile */}
            <Link 
              to="/" 
              className="mobile-nav-item back-to-main-mobile"
              onClick={closeMobileMenu}
            >
              <ArrowLeft className="nav-icon" />
              <span className="nav-label">Back to Main Site</span>
            </Link>

            {/* Navigation Items */}
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-item ${isActive(item.path) ? 'mobile-nav-item-active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}

            {/* User Items */}
            <div className="mobile-user-section">
              {userItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-item ${item.className || ''} ${isActive(item.path) ? 'mobile-nav-item-active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <Icon className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublishedJournalNavigation;
