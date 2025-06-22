import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaResearchgate, 
  FaOrcid, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaArrowUp,
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaAward
} from 'react-icons/fa';
import { FiMail, FiExternalLink, FiSend } from 'react-icons/fi';
import { BiTime } from 'react-icons/bi';
import "./Footer.css";
import "./NewFooter.css";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="journal-footer">
      {/* Journal Impact Banner */}
      <div className="footer-impact-banner">
        <div className="impact-container">
          <div className="impact-stats">
            <div className="impact-stat">
              <FaBookOpen className="impact-icon" />
              <div className="impact-text">
                <span className="impact-number">500+</span>
                <span className="impact-label">Research Articles</span>
              </div>
            </div>
            <div className="impact-stat">
              <FaUsers className="impact-icon" />
              <div className="impact-text">
                <span className="impact-number">1,200+</span>
                <span className="impact-label">Active Researchers</span>
              </div>
            </div>
            <div className="impact-stat">
              <FaGraduationCap className="impact-icon" />
              <div className="impact-text">
                <span className="impact-number">50+</span>
                <span className="impact-label">Partner Institutions</span>
              </div>
            </div>
            <div className="impact-stat">
              <FaAward className="impact-icon" />
              <div className="impact-text">
                <span className="impact-number">95%</span>
                <span className="impact-label">Citation Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="brand-header">
                <img src="/images/logo.JPG" alt="NIJOBED Journal Logo" className="footer-logo-img" />
                <div className="brand-info">
                  <h3 className="brand-title">NIJOBED</h3>
                  <p className="brand-subtitle">Nigerian Journal of Business and Entrepreneurship Education</p>
                </div>
              </div>
              
              <p className="brand-description">
                Pioneering scholarly excellence in business education and entrepreneurial research. 
                Committed to advancing knowledge that drives economic growth and innovation across Africa.
              </p>

              <div className="journal-identifiers">
                <div className="issn-info">
                  <span className="issn-label">ISSN:</span>
                  <span className="issn-value">1234-5678</span>
                  <span className="issn-type">(Online)</span>
                </div>
                <div className="issn-info">
                  <span className="issn-label">Print:</span>
                  <span className="issn-value">8765-4321</span>
                </div>
              </div>
            </div>

            {/* Right Side Content - Horizontal Layout */}
            <div className="footer-right-content">
              {/* Top Row - Research Areas and Navigation */}
              <div className="footer-top-row">
                {/* Research Areas */}
                <div className="footer-section research-section">
                  <h4 className="section-title">Research Focus</h4>
                  <div className="research-areas">
                    <div className="research-area">Business Education</div>
                    <div className="research-area">Entrepreneurship</div>
                    <div className="research-area">Economic Development</div>
                    <div className="research-area">Innovation Studies</div>
                    <div className="research-area">Financial Management</div>
                    <div className="research-area">Strategic Management</div>
                  </div>
                </div>

                {/* Quick Navigation */}
                <div className="footer-section nav-section">
                  <h4 className="section-title">Navigation</h4>
                  <div className="nav-columns">
                    <div className="nav-column">
                      <h5 className="nav-heading">For Authors</h5>
                      <ul className="nav-links">
                        <li><Link to="/submission">Submit Article</Link></li>
                        <li><Link to="/author-guidelines">Guidelines</Link></li>
                        <li><Link to="/peer-review">Review Process</Link></li>
                        <li><Link to="/open-access">Open Access</Link></li>
                      </ul>
                    </div>
                    <div className="nav-column">
                      <h5 className="nav-heading">For Readers</h5>
                      <ul className="nav-links">
                        <li><Link to="/journals">Browse Issues</Link></li>
                        <li><Link to="/archives">Archives</Link></li>
                        <li><Link to="/search">Advanced Search</Link></li>
                        <li><Link to="/alerts">Article Alerts</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row - Contact Info and Social/Newsletter */}
              <div className="footer-bottom-row">
                {/* Contact & Connect */}
                <div className="footer-section contact-section">
                  <h4 className="section-title">Connect</h4>
                  
                  <div className="contact-info">
                    <div className="contact-item">
                      <FaMapMarkerAlt className="contact-icon" />
                      <div className="contact-details">
                        <span className="contact-label">Editorial Office</span>
                        <span className="contact-text">University of Lagos, Akoka, Lagos, Nigeria</span>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <FiMail className="contact-icon" />
                      <div className="contact-details">
                        <span className="contact-label">Email</span>
                        <a href="mailto:editor@nijobed.org" className="contact-text">editor@nijobed.org</a>
                      </div>
                    </div>

                    <div className="contact-item">
                      <BiTime className="contact-icon" />
                      <div className="contact-details">
                        <span className="contact-label">Response Time</span>
                        <span className="contact-text">Within 48 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social & Newsletter Combined */}
                <div className="footer-section social-newsletter-section">
                  <h4 className="section-title">Follow Our Research</h4>
                  
                  <div className="social-connect">
                    <h5 className="social-title">Connect With Us</h5>
                    <div className="social-links">
                      <a href="#" className="social-link" aria-label="Facebook">
                        <FaFacebook />
                      </a>
                      <a href="#" className="social-link" aria-label="Twitter">
                        <FaTwitter />
                      </a>
                      <a href="#" className="social-link" aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                      <a href="#" className="social-link" aria-label="ResearchGate">
                        <FaResearchgate />
                      </a>
                      <a href="#" className="social-link" aria-label="ORCID">
                        <FaOrcid />
                      </a>
                    </div>
                  </div>

                  {/* Newsletter Subscription */}
                  <div className="newsletter-section">
                    <h5 className="newsletter-title">Research Updates</h5>
                    <p className="newsletter-desc">Get notified about new publications</p>
                    <form onSubmit={handleSubscribe} className="newsletter-form">
                      <div className="form-group">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          className="newsletter-input"
                          required
                        />
                        <button type="submit" className="newsletter-btn" disabled={isSubscribed}>
                          {isSubscribed ? 'Subscribed!' : <FiSend />}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="bottom-content">
            <div className="copyright-section">
              <p className="copyright-text">
                © {currentYear} Nigerian Journal of Business and Entrepreneurship Education. 
                <span className="rights-text">All rights reserved.</span>
              </p>
              <p className="publisher-text">
                Published by <strong>Center for Entrepreneurship and Leadership Studies</strong>
              </p>
            </div>

            <div className="legal-links">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
              <Link to="/ethics" className="legal-link">Ethics Guidelines</Link>
              <Link to="/accessibility" className="legal-link">Accessibility</Link>
            </div>

            <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;