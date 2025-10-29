import React from "react";

export default function EditorialBoard() {
  const editorialBoard = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 text-red-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 shadow-lg border-b border-red-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              Journal of Vocational Teacher Education (JOVOTE)
            </h1>
            <p className="text-lg text-red-100 mb-1">Editorial Board</p>
            <p className="text-sm text-red-200 font-medium">ISSN: 978799-416</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-red-600">
          <p className="text-lg text-red-900 leading-relaxed text-center">
            The Editorial Board comprises distinguished scholars and professionals dedicated to advancing the field of vocational teacher education and technical education in Nigeria and beyond.
          </p>
        </div>

        {/* Editorial Board List */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-red-900 mb-6 text-center">Editorial Board Members</h3>
          {editorialBoard.length === 0 ? (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg shadow-md border-l-4 border-orange-600 p-8 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h4 className="text-xl font-bold text-red-900 mb-2">Editorial Board Coming Soon</h4>
              <p className="text-red-700">
                The Editorial Board members will be announced shortly. Please check back soon for updates.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {editorialBoard.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border-l-4 border-red-600 p-6 hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-lg font-bold text-red-900 mb-1">{member.name}</h4>
                  <p className="text-red-700 mb-1">{member.affiliation}</p>
                  <span className="inline-block text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 rounded px-2 py-1">{member.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
            <p className="text-primary-700 text-sm">
              For editorial inquiries or manuscript submissions, please contact the Editorial Secretary or visit our journal's submission guidelines page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}