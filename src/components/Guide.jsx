import React from 'react';

const Guide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)
        </h1>
        <p className="text-lg text-gray-600">Author Guidelines</p>
        <p className="text-sm text-gray-500 mt-2">
          Published by the School of Secondary Education (Business), Federal College of Education (Technical), Potiskum
        </p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Journal Scope</h2>
        <p className="text-gray-700">
          Papers submitted to NIJOBED are reviewed for contribution to Business Education, Entrepreneurship Education, 
          Teacher Education and general knowledge. The journal accepts scholarly articles relevant to research reports in 
          Business, Entrepreneurship, Marketing, Sciences, Vocational and Technology Teacher Education.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms of Acceptance of Articles</h2>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Length</h3>
            <p className="text-gray-700">Manuscripts should not exceed 15 pages of A4 paper, including references and appendices.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Formatting</h3>
            <p className="text-gray-700">Text must be typed using Times New Roman font, size 12, with 1.5 lines spacing, and printed on one side of the paper only.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Originality</h3>
            <p className="text-gray-700">All submitted articles must be original works of the author(s) and written in clear, concise UK English.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Abstract</h3>
            <p className="text-gray-700">An abstract of no more than 250 words should be provided on a separate page.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Submission</h3>
            <p className="text-gray-700">Three hard copies of the manuscript and a soft copy in Microsoft Word format on a CD-ROM containing the finalised version must be submitted.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Exclusivity</h3>
            <p className="text-gray-700">Only articles not previously published elsewhere will be considered.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Copyright</h3>
            <p className="text-gray-700">NIJOBED retains the copyright for all accepted articles.</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manuscript Requirements</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Typing</h3>
            <p className="text-gray-700">Manuscripts must be professionally typed and not reproduced using cyclostyling.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Cover Page</h3>
            <p className="text-gray-700">Should include the article title, author(s), name(s), and professional designation(s).</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Author Information</h3>
            <p className="text-gray-700">Authors must provide their complete contact address, GSM number, and email address.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Assessment Fee</h3>
            <p className="text-gray-700">A non-refundable fee of five thousand Naira (₦5,000.00) must accompany each submission.</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="text-xl font-bold text-green-800 mb-4">Contact Information</h2>
        
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-green-700">Payment Address:</h3>
            <p className="text-gray-700">
              The Editor-in-Chief<br/>
              Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)<br/>
              School of Secondary Education (Business),<br/>
              Federal College of Education (Technical),<br/>
              Potiskum, Yobe State.
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-green-700">Contact Details:</h3>
            <p className="text-gray-700">
              <strong>Email:</strong> sbefcetpotiskum@gmail.com<br/>
              <strong>Phone:</strong> +2347035694303; +2348128161859
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
        <ul className="list-disc list-inside text-yellow-700 space-y-1">
          <li>All manuscripts must be original and not previously published</li>
          <li>Use UK English throughout the manuscript</li>
          <li>Include both hard copies and digital format on CD-ROM</li>
          <li>Assessment fee of ₦5,000.00 is non-refundable</li>
          <li>Ensure professional presentation and formatting</li>
        </ul>
      </div>
    </div>
  );
};

export default Guide;