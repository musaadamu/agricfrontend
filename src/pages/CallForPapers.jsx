import React from 'react';
import { Link } from 'react-router-dom';

const CallForPapers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Header */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-orange-800/20 to-red-900/20 blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-red-900 to-orange-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="relative px-4 sm:px-8 lg:px-12 py-12 sm:py-16 text-white">
              <div className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Call for Papers
                </h1>
                <p className="text-lg sm:text-xl text-orange-100 font-medium max-w-3xl leading-relaxed">
                  The Journal of Vocational Teacher Education (JOVOTE) invites submissions from distinguished scholars for its annual journal publication for 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About the Journal */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-900 to-orange-800 px-4 sm:px-8 py-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3 sm:mr-4 text-lg sm:text-xl">
                  📖
                </div>
                About the Journal
              </h2>
            </div>
            <div className="p-4 sm:p-8">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                This is a multidisciplinary journal for School of Secondary Education (Vocational), Federal College of Education (Technical) Potiskum. 
                It is open to scholars from Vocational Education and related disciplines.
              </p>
            </div>
          </div>
        </div>

        {/* Authors' Guidelines */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-900 mb-4">Authors' Guidelines</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🌐",
                title: "Language",
                content: "Articles must be written in English"
              },
              {
                icon: "📄",
                title: "Length",
                content: "Articles must not exceed 12 pages on A4 paper size, with diagrams, figures and illustrations"
              },
              {
                icon: "📐",
                title: "Formatting",
                content: "Use 1.5 spacing with Font size 12 using Times New Roman"
              },
              {
                icon: "📚",
                title: "Citation Style",
                content: "Use 7th APA style for all references and citations"
              },
              {
                icon: "✅",
                title: "Originality",
                content: "Article submitted to JOVOTE for publication should not be forwarded to any publication body elsewhere and must be original"
              },
              {
                icon: "📋",
                title: "Submission Format",
                content: "Submit your article in Word or PDF format with clear structure and proper formatting"
              }
            ].map((guideline, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
                  <div className="text-3xl text-white text-center mb-2">{guideline.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-3">{guideline.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{guideline.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Details */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-900 mb-4">Submission Details</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 p-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center">
                  <span className="text-2xl mr-3">📧</span>
                  Submission Email
                </h3>
                <p className="text-gray-700">
                  Submit your article to: <a href="mailto:jovote2025@gmail.com" className="font-bold text-red-600 hover:underline">jovote2025@gmail.com</a>
                </p>
                <p className="text-gray-600 text-sm mt-2">Include evidence of payment with your submission</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center">
                    <span className="text-2xl mr-3">💰</span>
                    Vetting Fees
                  </h3>
                  <p className="text-gray-700 font-semibold text-lg">₦5,000.00</p>
                  <p className="text-gray-600 text-sm mt-2">Initial manuscript vetting fee</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center">
                    <span className="text-2xl mr-3">📰</span>
                    Publication Fees
                  </h3>
                  <p className="text-gray-700 font-semibold text-lg">₦25,000.00</p>
                  <p className="text-gray-600 text-sm mt-2">After successful vetting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-900 mb-4">Account Details</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-900 to-orange-800 px-4 sm:px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <span className="text-3xl mr-3">🏦</span>
                Keystone Bank PLC
              </h3>
            </div>
            <div className="p-4 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <span className="text-gray-700 font-semibold">Account Name:</span>
                  <span className="text-red-900 font-bold">Journal of Vocational Teacher Education</span>
                </div>
                <div className="flex items-center justify-between bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <span className="text-gray-700 font-semibold">Account Number:</span>
                  <span className="text-red-900 font-bold text-lg">1012512411</span>
                </div>
                <p className="text-gray-600 text-sm mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  ⚠️ Share your receipt with the secretary and attach a copy to your manuscript.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-900 mb-4">Contact Information</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
                <h3 className="text-lg font-bold text-white">Dr. Victor Madu U.</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 flex items-center">
                  <span className="text-xl mr-3">📱</span>
                  <a href="tel:+2348034942253" className="hover:underline text-red-600 font-semibold">08034942253</a>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
                <h3 className="text-lg font-bold text-white">Halima Abdullahi</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 flex items-center">
                  <span className="text-xl mr-3">📱</span>
                  <a href="tel:+2348065386688" className="hover:underline text-red-600 font-semibold">08065386688</a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-lg border border-orange-100 p-6">
            <p className="text-gray-700 flex items-center">
              <span className="text-2xl mr-3">📧</span>
              <a href="mailto:jovote2025@gmail.com" className="hover:underline text-red-600 font-semibold text-lg">jovote2025@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-900 to-orange-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Submit?</h2>
            <p className="text-lg mb-6 opacity-90">
              Prepare your manuscript according to our guidelines and submit it today!
            </p>
            <Link
              to="/submission"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Your Paper
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-orange-200">
          <p className="text-gray-600">
            © 2025 Journal of Vocational Teacher Education (JOVOTE) | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallForPapers;

