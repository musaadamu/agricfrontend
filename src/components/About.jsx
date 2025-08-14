import React from 'react';
import SEOWrapper from './SEO/SEOWrapper';
import { getPageSEO } from '../utils/seo';
import { SEO_CONFIG } from '../config/seo.config';

const About = () => {
  const aboutSEO = getPageSEO('about');

  const aboutStructuredData = {
    ...SEO_CONFIG.STRUCTURED_DATA.organization,
    "@type": "AboutPage",
    "mainEntity": SEO_CONFIG.STRUCTURED_DATA.organization
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://www.nijobed.com.ng/' },
    { name: 'About Us', url: 'https://www.nijobed.com.ng/about' }
  ];

  return (
    <SEOWrapper
      title={aboutSEO.title}
      description={aboutSEO.description}
      keywords={aboutSEO.keywords}
      structuredData={aboutStructuredData}
      breadcrumbs={breadcrumbs}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Header */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-indigo-800/20 to-blue-900/20 blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="relative px-4 sm:px-8 lg:px-12 py-12 sm:py-16 text-white">
              <div className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Nigerian Journal of Business and<br className="block sm:hidden" />
                  <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                    Entrepreneurship Education
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 font-medium max-w-3xl leading-relaxed">
                  Advancing Research in Business and Entrepreneurship Education Through 
                  Innovation, Excellence, and Global Academic Collaboration
                </p>
                <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium">
                    📚 Peer-Reviewed Excellence
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium">
                    🌍 International Reach
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium">
                    🚀 Innovation Focused
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Our Vision & Mission</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                    🎯
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Vision</h3>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  To be a leading international journal promoting excellence in business, management, 
                  and entrepreneurship education research and innovation, setting global standards 
                  for academic excellence and practical application.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                    🚀
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Mission</h3>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  To publish high-quality, peer-reviewed research that contributes to the advancement 
                  of business and entrepreneurship education, fostering innovation and excellence in 
                  teaching, learning, and enterprise development across global contexts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About the Journal */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-800 px-4 sm:px-8 py-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3 sm:mr-4 text-lg sm:text-xl">
                  📖
                </div>
                About the Journal
              </h2>
            </div>
            <div className="p-4 sm:p-8">
              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2">
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Nigerian Journal of Business and Entrepreneurship Education is a premier peer-reviewed 
                      academic journal focused on advancing research in business, management, and entrepreneurship 
                      education. Our journal serves as a platform for sharing innovative research, teaching 
                      methodologies, and best practices in business and entrepreneurship education.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Our international editorial board comprises distinguished scholars and practitioners from 
                      leading institutions worldwide, ensuring rigorous academic standards and diverse perspectives 
                      in business and entrepreneurship education research.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 flex items-center">
                    <span className="mr-2">📞</span>
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 mt-1 text-sm sm:text-base">📍</span>
                      <div className="text-xs sm:text-sm whitespace-pre-line break-words">
                        The Editor-in-Chief
                        <br />Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)
                        <br />School of Secondary Education (Business),
                        <br />Federal College of Education (Technical),
                        <br />Potiskum, Yobe State.
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 text-sm sm:text-base">📧</span>
                      <a href="mailto:sbefcetpotiskum@gmail.com" className="hover:underline text-blue-700 text-xs sm:text-sm break-all">sbefcetpotiskum@gmail.com</a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 text-sm sm:text-base">📱</span>
                      <span className="text-xs sm:text-sm break-words">+2347035694303; +2348128161859</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Details */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Journal Details</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "📅",
                title: "Publication Frequency",
                content: "Quarterly (4 issues per year)",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🔍",
                title: "Peer Review Process",
                content: "Double-blind peer review by business and entrepreneurship education experts",
                gradient: "from-indigo-500 to-blue-500"
              },
              {
                icon: "🌐",
                title: "Open Access",
                content: "Full open access with immediate online publication",
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                icon: "⚖️",
                title: "Publication Ethics",
                content: "Adherence to international publication standards and ethics",
                gradient: "from-blue-500 to-indigo-500"
              }
            ].map((detail, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`bg-gradient-to-r ${detail.gradient} p-4`}>
                  <div className="text-3xl text-white text-center mb-2">{detail.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">{detail.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{detail.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Focus Areas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Research Focus Areas</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "💼",
                title: "Business Education",
                content: "Business Administration, Management, Marketing, Human Resources, Strategic Planning",
                gradient: "from-blue-50 to-cyan-50",
                border: "border-blue-200"
              },
              {
                icon: "🚀",
                title: "Entrepreneurship Education",
                content: "Entrepreneurial Mindset, Venture Creation, Innovation Management, Startup Development",
                gradient: "from-indigo-50 to-blue-50",
                border: "border-indigo-200"
              },
              {
                icon: "👥",
                title: "Leadership Education",
                content: "Organizational Leadership, Strategic Management, Change Management, Team Building",
                gradient: "from-cyan-50 to-blue-50",
                border: "border-cyan-200"
              },
              {
                icon: "💰",
                title: "Financial Literacy",
                content: "Personal Finance, Investment Strategies, Financial Planning, Economic Education",
                gradient: "from-blue-50 to-indigo-50",
                border: "border-blue-200"
              }
            ].map((area, index) => (
              <div key={index} className={`bg-gradient-to-br ${area.gradient} rounded-xl p-6 border ${area.border} shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-md">
                    {area.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">{area.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{area.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Location</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-800 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  📍
                </div>
                Federal College of Education (Technical), Potiskum
              </h3>
            </div>
            <div className="p-0">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.964964357751!2d11.031963!3d11.713964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10f4c7e2e2e2e2e3%3A0x7e2e2e2e2e2e2e2e!2sFederal%20College%20of%20Education%20(Technical)%20Potiskum!5e0!3m2!1sen!2sng!4v1701876008045!5m2!1sen!2sng"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Federal College of Education Technical Potiskum Location"
                  className="rounded-b-2xl"
                ></iframe>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-800">Potiskum, Yobe State, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-blue-200">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Join Our Academic Community</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be part of a global network of researchers, educators, and practitioners advancing 
              business and entrepreneurship education worldwide.
            </p>
          </div>
          <div className="flex justify-center space-x-8 text-sm text-gray-500 mb-4">
            <span>© 2025 NIJOBED</span>
            <span>•</span>
            <span>Academic Excellence</span>
            <span>•</span>
            <span>Global Impact</span>
          </div>
        </div>
      </div>
    </div>
    </SEOWrapper>
  );
};

export default About;