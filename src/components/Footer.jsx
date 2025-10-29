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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Impact Banner - JOVOTE Performance Metrics */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 py-8 relative border-b-4 border-red-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-1">JOVOTE Journal Performance</h3>
            <p className="text-red-100 text-sm">Advancing Vocational Teacher Education</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {[
              { icon: FaBookOpen, number: '12+', label: 'Published Volumes', color: 'from-red-400 to-red-600' },
              { icon: FaUsers, number: '200+', label: 'Contributing Authors', color: 'from-orange-400 to-orange-600' },
              { icon: FaGraduationCap, number: '35+', label: 'Vocational Programs', color: 'from-amber-400 to-amber-600' },
              { icon: FaAward, number: '98%', label: 'Peer Review Quality', color: 'from-red-500 to-orange-500' }
            ].map((stat, index) => (
              <div key={index} className={`relative overflow-hidden p-4 bg-white/15 rounded-2xl backdrop-blur-md border border-white/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/30 cursor-pointer group`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <stat.icon className="text-3xl text-white mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-red-100 font-medium mt-1">{stat.label}</div>
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
                  alt="JOVOTE Journal Logo"
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white/20 shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    JOVOTE
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Journal of Vocational Teacher Education
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                Advancing scholarly excellence in vocational teacher education and technical research.
                Committed to advancing knowledge that transforms vocational education across Nigeria and Africa.
              </p>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate-400 font-semibold">ISSN:</span>
                  <span className="font-mono text-sm text-white font-semibold">978799-416</span>
                  <span className="text-xs text-slate-500 italic">(Online)</span>
                </div>
              </div>
            </div>

            {/* Research Areas */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white border-b-2 border-red-500 pb-1 w-fit">
                Research Areas
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Vocational Education',
                  'Teacher Training',
                  'Technical Education',
                  'Curriculum Development',
                  'Pedagogical Research',
                  'Skills Development'
                ].map((area, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-700 to-orange-700 text-white px-3 py-1 rounded-full text-xs font-medium text-center transition-transform duration-200 hover:scale-105">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white border-b-2 border-red-500 pb-1 w-fit">
                Quick Links
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <h5 className="text-sm font-semibold text-slate-100 mb-2">Authors</h5>
                  <ul className="space-y-1">
                    {['Submit Article', 'Guidelines', 'Peer Review', 'Publication Ethics'].map((link, index) => (
                      <li key={index}>
                        <a href="#" className="text-xs text-slate-300 hover:text-red-400 transition-all duration-200 flex items-center gap-1 group">
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
                        <a href="#" className="text-xs text-slate-300 hover:text-red-400 transition-all duration-200 flex items-center gap-1 group">
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
              <h4 className="text-base font-bold text-white border-b-2 border-red-500 pb-1 w-fit">
                Contact & Connect
              </h4>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-sm text-orange-400 mt-0.5 min-w-4" />
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Payment Address</div>
                    <div className="text-xs text-slate-200 whitespace-pre-line">
                      The Editor-in-Chief
                      <br />Journal of Vocational Teacher Education (JOVOTE)
                      <br />School of Secondary Education (Vocational),
                      <br />Federal College of Education (Technical),
                      <br />Potiskum, Yobe State.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FiMail className="text-sm text-red-400 mt-0.5 min-w-4" />
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Email</div>
                    <a href="mailto:jovote2025@gmail.com" className="text-xs text-red-300 hover:text-red-400 transition-colors">
                      jovote2025@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FaPhone className="text-sm text-amber-400 mt-0.5 min-w-4" />
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Phone</div>
                    <div className="text-xs text-slate-200">+234 803 494 2253; +234 806 538 6688</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4">
                <h5 className="text-sm font-semibold text-slate-100 mb-2">Follow Us</h5>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { icon: FaFacebook, color: 'hover:bg-red-600', label: 'Facebook' },
                    { icon: FaTwitter, color: 'hover:bg-orange-500', label: 'Twitter' },
                    { icon: FaLinkedin, color: 'hover:bg-red-700', label: 'LinkedIn' },
                    { icon: FaResearchgate, color: 'hover:bg-amber-600', label: 'ResearchGate' },
                    { icon: FaOrcid, color: 'hover:bg-orange-600', label: 'ORCID' }
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
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all"
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={isSubscribed}
                      className={`px-3 py-2 rounded-md text-white text-xs font-semibold transition-all duration-300 min-w-12 flex items-center justify-center ${
                        isSubscribed
                          ? 'bg-emerald-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/25'
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
                © {currentYear} Journal of Vocational Teacher Education (JOVOTE).
                <span className="text-slate-400 font-medium"> All rights reserved.</span>
              </p>
              <p className="text-xs text-slate-400">
                Published by <strong>School of Secondary Education (Vocational), FCET Potiskum</strong>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {['Privacy Policy', 'Terms of Service', 'Ethics Guidelines', 'Accessibility'].map((link, index) => (
                <a key={index} href="#" className="text-xs text-slate-300 hover:text-red-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 flex items-center justify-center z-50"
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