import React from "react";

export default function EditorialBoard() {
  const editorialBoard = [
    {
      name: "Dr. Oliver U. Ihedioha",
      affiliation: "Federal College of Education (Tech) Potiskum",
      role: "Editor In-chief"
    },
    {
      name: "Prof. Adamu Ibrahim",
      affiliation: "Abubakar Tafawa Balewa University Bauchi",
      role: "Editor"
    },
    {
      name: "As. Prof. Albdukareem Alhassan",
      affiliation: "Federal University of Lafiya Nasarawa State",
      role: "Editor"
    },
    {
      name: "Dr Umar Inuwa",
      affiliation: "Abubakar Tafawa Balewa University Bauchi",
      role: "Editor"
    },
    {
      name: "Dr Suleiman Dauda",
      affiliation: "Federal University Gashua, Yobe State",
      role: "Editor"
    },
    {
      name: "Dr Baraya Abdulmutallib Umar",
      affiliation: "Abubakar Tafawa Balewa University Bauchi",
      role: "Editor"
    },
    {
      name: "As. Prof. Karimu Ishola",
      affiliation: "Federal University Gashua, Yobe State",
      role: "Editor"
    },
    {
      name: "Prof.  Ahmad Aliyu Deba",
      affiliation: "Abubakar Tafawa Balewa University Bauchi",
      role: "Editor"
    },
    {
      name: "Dr. Mohammed Madu Yunusa",
      affiliation: "Federal College of Education (Tech) Potiskum",
      role: "Editor"
    },
    {
      name: "Haj. Hindatu Aisha Bako",
      affiliation: "Federal College of Education (Tech) Potiskum",
      role: "Editor"
    },
    {
      name: "Mr. Joseph Olorunmolu Oye",
      affiliation: "Federal College of Education (Tech) Potiskum",
      role: "Editor"
    },
    {
      name: "Dr. Ahmadu Musa Maluri",
      affiliation: "Federal College of Education (Tech) Potiskum",
      role: "Secretary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-900">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-primary-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-primary-900 mb-2">
              Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)
            </h1>
            <p className="text-lg text-primary-700 mb-1">Editorial Board</p>
            <p className="text-sm text-primary-500 font-medium">ISSN: 2636-7157</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-lg text-primary-800 leading-relaxed text-center">
            The Editorial Board comprises distinguished scholars and professionals dedicated to advancing the field of business and entrepreneurship education in Nigeria and beyond.
          </p>
        </div>

        {/* Editorial Board List */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-primary-800 mb-6 text-center">Editorial Board Members</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {editorialBoard.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-primary-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-lg font-bold text-primary-900 mb-1">{member.name}</h4>
                <p className="text-primary-700 mb-1">{member.affiliation}</p>
                <span className="inline-block text-xs font-semibold text-secondary-600 bg-secondary-100 rounded px-2 py-1">{member.role}</span>
              </div>
            ))}
          </div>
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