import React, { useState } from 'react';
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
  FaAward,
  FaUser,
  FaBuilding,
  FaChevronRight
} from 'react-icons/fa';
import { FiMail, FiSend, FiClock } from 'react-icons/fi';

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
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Impact Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-emerald-700 py-6 relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {[
              { icon: FaBookOpen, number: '500+', label: 'Research Articles' },
              { icon: FaUsers, number: '1,200+', label: 'Active Researchers' },
              { icon: FaGraduationCap, number: '50+', label: 'Partner Institutions' },
              { icon: FaAward, number: '95%', label: 'Citation Rate' }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">
                <stat.icon className="text-2xl text-amber-400 min-w-8" />
                <div>
                  <div className="text-xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-blue-100 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src="images/logo.JPG" 
                  alt="NIJOBED Journal Logo" 
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white/20 shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    NIJOBED
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Nigerian Journal of Business and Entrepreneurship Education
                  </p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed text-slate-300">
                Pioneering scholarly excellence in business education and entrepreneurial research. 
                Committed to advancing knowledge that drives economic growth and innovation across Africa.
              </p>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate-400 font-semibold">ISSN:</span>
                  <span className="font-mono text-sm text-white font-semibold">1234-5678</span>
                  <span className="text-xs text-slate-500 italic">(Online)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-semibold">Print:</span>
                  <span className="font-mono text-sm text-white font-semibold">8765-4321</span>
                </div>
              </div>
            </div>

            {/* Research Areas */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white border-b-2 border-blue-500 pb-1 w-fit">
                Research Areas
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Business Education',
                  'Entrepreneurship',
                  'Innovation Studies',
                  'Economic Development',
                  'Leadership Research',
                  'Digital Business'
                ].map((area, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white px-3 py-1 rounded-full text-xs font-medium text-center transition-transform duration-200 hover:scale-105">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white border-b-2 border-blue-500 pb-1 w-fit">
                Quick Links
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <h5 className="text-sm font-semibold text-slate-100 mb-2">Authors</h5>
                  <ul className="space-y-1">
                    {['Submit Article', 'Guidelines', 'Peer Review', 'Publication Ethics'].map((link, index) => (
                      <li key={index}>
                        <a href="#" className="text-xs text-slate-300 hover:text-blue-400 transition-all duration-200 flex items-center gap-1 group">
                          <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-100 mb-2">Readers</h5>
                  <ul className="space-y-1">
                    {['Current Issue', 'Archives', 'Search', 'Subscribe'].map((link, index) => (
                      <li key={index}>
                        <a href="#" className="text-xs text-slate-300 hover:text-blue-400 transition-all duration-200 flex items-center gap-1 group">
                          <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact & Connect */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white border-b-2 border-blue-500 pb-1 w-fit">
                Contact & Connect
              </h4>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-sm text-emerald-400 mt-0.5 min-w-4" />
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Payment Address</div>
                    <div className="text-xs text-slate-200 whitespace-pre-line">
                      The Editor-in-Chief
                      <br />Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)
                      <br />School of Secondary Education (Business),
                      <br />Federal College of Education (Technical),
                      <br />Potiskum, Yobe State.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FiMail className="text-sm text-blue-400 mt-0.5 min-w-4" />
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Email</div>
                    <a href="mailto:sbefcetpotiskum@gmail.com" className="text-xs text-blue-300 hover:text-blue-400 transition-colors">
                      sbefcetpotiskum@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FaPhone className="text-sm text-amber-400 mt-0.5 min-w-4" />
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Phone</div>
                    <div className="text-xs text-slate-200">+2347035694303; +2348128161859</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4">
                <h5 className="text-sm font-semibold text-slate-100 mb-2">Follow Us</h5>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { icon: FaFacebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                    { icon: FaTwitter, color: 'hover:bg-sky-500', label: 'Twitter' },
                    { icon: FaLinkedin, color: 'hover:bg-blue-700', label: 'LinkedIn' },
                    { icon: FaResearchgate, color: 'hover:bg-teal-600', label: 'ResearchGate' },
                    { icon: FaOrcid, color: 'hover:bg-lime-600', label: 'ORCID' }
                  ].map((social, index) => (
                    <a key={index} href="#" className={`w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 ${social.color} hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1 text-sm`} aria-label={social.label}>
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h5 className="text-sm font-semibold text-white mb-1">Stay Updated</h5>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  Subscribe for new publications and research opportunities.
                </p>
                <div className="w-full">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
                    />
                    <button 
                      onClick={handleSubscribe}
                      disabled={isSubscribed}
                      className={`px-3 py-2 rounded-md text-white text-xs font-semibold transition-all duration-300 min-w-12 flex items-center justify-center ${
                        isSubscribed 
                          ? 'bg-emerald-600 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25'
                      }`}
                    >
                      {isSubscribed ? '✓' : <FiSend />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black/30 border-t border-white/10 py-4 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-300 mb-1">
                © {currentYear} Nigerian Journal of Business and Entrepreneurship Education. 
                <span className="text-slate-400 font-medium"> All rights reserved.</span>
              </p>
              <p className="text-xs text-slate-400">
                Published by <strong>Center for Entrepreneurship and Leadership Studies</strong>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {['Privacy Policy', 'Terms of Service', 'Ethics Guidelines', 'Accessibility'].map((link, index) => (
                <a key={index} href="#" className="text-xs text-slate-300 hover:text-blue-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 flex items-center justify-center z-50"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;