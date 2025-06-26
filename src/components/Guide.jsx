import React from 'react';

const Guide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent blur-3xl"></div>
          <div className="relative">
            <div className="inline-block p-2 bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl shadow-xl mb-6">
              <div className="bg-white rounded-xl px-8 py-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight">
                  Nigerian Journal of Business and<br />Entrepreneurship Education
                </h1>
                <div className="text-2xl font-semibold text-blue-800 mt-2">
                  (NIJOBED)
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-700 font-medium mb-2">Author Guidelines & Submission Requirements</p>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Published by the School of Secondary Education (Business)<br />
              Federal College of Education (Technical), Potiskum
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Journal Scope */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-800 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                Journal Scope & Focus
              </h2>
            </div>
            <div className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Papers submitted to NIJOBED are rigorously reviewed for their contribution to Business Education, 
                Entrepreneurship Education, Teacher Education, and advancing general knowledge. The journal welcomes 
                scholarly articles encompassing research reports in Business, Entrepreneurship, Marketing, Sciences, 
                Vocational and Technology Teacher Education.
              </p>
            </div>
          </div>
        </div>

        {/* Terms of Acceptance */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Terms of Acceptance</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                icon: "📄",
                title: "Length Requirements",
                content: "Manuscripts should not exceed 15 pages of A4 paper, including references and appendices.",
                gradient: "from-blue-50 to-indigo-50"
              },
              {
                icon: "⚙️",
                title: "Formatting Standards",
                content: "Text must be typed using Times New Roman font, size 12, with 1.5 line spacing, printed on one side only.",
                gradient: "from-indigo-50 to-blue-50"
              },
              {
                icon: "✨",
                title: "Originality Requirement",
                content: "All submitted articles must be original works of the author(s) and written in clear, concise UK English.",
                gradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: "📝",
                title: "Abstract Specification",
                content: "An abstract of no more than 250 words should be provided on a separate page.",
                gradient: "from-cyan-50 to-blue-50"
              },
              {
                icon: "📤",
                title: "Submission Format",
                content: "Three hard copies of the manuscript and a soft copy in Microsoft Word format on CD-ROM required.",
                gradient: "from-blue-50 to-indigo-50"
              },
              {
                icon: "🔒",
                title: "Exclusivity Policy",
                content: "Only articles not previously published elsewhere will be considered for review.",
                gradient: "from-indigo-50 to-purple-50"
              }
            ].map((item, index) => (
              <div key={index} className={`bg-gradient-to-br ${item.gradient} rounded-xl p-6 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl bg-white rounded-lg p-3 shadow-md">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manuscript Requirements */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Manuscript Requirements</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Professional Typing",
                content: "Manuscripts must be professionally typed and not reproduced using cyclostyling methods.",
                icon: "⌨️"
              },
              {
                title: "Cover Page Details",
                content: "Should include the article title, author(s) name(s), and professional designation(s).",
                icon: "📋"
              },
              {
                title: "Author Information",
                content: "Authors must provide complete contact address, GSM number, and email address.",
                icon: "👤"
              },
              {
                title: "Assessment Fee",
                content: "A non-refundable fee of five thousand Naira (₦5,000.00) must accompany each submission.",
                icon: "💳"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <div className="text-2xl">📧</div>
                </div>
                <h2 className="text-2xl font-bold">Contact Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-blue-100">Payment & Submission Address</h3>
                  <div className="space-y-2 text-blue-50 text-sm sm:text-base">
                    <p className="font-semibold">The Editor-in-Chief</p>
                    <p className="break-words">Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)</p>
                    <p className="break-words">School of Secondary Education (Business)</p>
                    <p className="break-words">Federal College of Education (Technical)</p>
                    <p>Potiskum, Yobe State</p>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-blue-100">Contact Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">📧</span>
                      </div>
                      <p className="text-blue-50 text-sm sm:text-base break-all">sbefcetpotiskum@gmail.com</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">📱</span>
                      </div>
                      <div className="text-blue-50 text-sm sm:text-base">
                        <p className="break-all">+2347035694303</p>
                        <p className="break-all">+2348128161859</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
              ⚠️
            </div>
            <h3 className="text-2xl font-bold text-amber-800">Important Submission Notes</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "All manuscripts must be original and not previously published",
              "Use UK English throughout the manuscript",
              "Include both hard copies and digital format on CD-ROM",
              "Assessment fee of ₦5,000.00 is non-refundable",
              "Ensure professional presentation and formatting",
              "NIJOBED retains copyright for all accepted articles"
            ].map((note, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-amber-800 font-medium">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-blue-200">
          <p className="text-gray-600 mb-4">
            © 2025 Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>Federal College of Education (Technical), Potiskum</span>
            <span>•</span>
            <span>Professional Academic Publishing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;