import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container bg-primary-50 text-primary-900">
      <div className="about-header bg-primary-700 text-white rounded-lg p-8 shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-2">Nigerian Journal of Business and Entrepreneurship Education</h1>
        <p className="subtitle text-white text-lg">Advancing Research in Business and Entrepreneurship Education</p>
      </div>

      <section className="about-section">
        <div className="vision-mission">
          <div className="vision">
            <h3 className="text-primary-800">Vision</h3>
            <p>To be a leading international journal promoting excellence in business, management, and entrepreneurship education research and innovation.</p>
          </div>
          <div className="mission">
            <h3 className="text-primary-800">Mission</h3>
            <p>To publish high-quality, peer-reviewed research that contributes to the advancement of business and entrepreneurship education, fostering innovation and excellence in teaching, learning, and enterprise development across global contexts.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="text-primary-800">About the Journal</h2>
        <div className="institution-content">
          <div>
            <p>Nigerian Journal of Business and Entrepreneurship Education is a premier peer-reviewed academic journal focused on advancing research in business, management, and entrepreneurship education. Our journal serves as a platform for sharing innovative research, teaching methodologies, and best practices in business and entrepreneurship education.</p>
            <p>Our international editorial board comprises distinguished scholars and practitioners from leading institutions worldwide, ensuring rigorous academic standards and diverse perspectives in business and entrepreneurship education research.</p>
          </div>
          <div className="contact-details bg-primary-100 rounded-lg p-4 mt-4">
            <h3 className="text-primary-800">Contact Information</h3>
            <p>Location: Federal College of Education Technical Potiskum Yobe State</p>
            <p>Email: contact@ijristme.org</p>
            <p>Phone: +234 8138614901</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="text-primary-800">Journal Details</h2>
        <div className="journal-details">
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Publication Frequency</h3>
            <p>Quarterly (4 issues per year)</p>
          </div>
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Peer Review Process</h3>
            <p>Double-blind peer review by business and entrepreneurship education experts</p>
          </div>
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Open Access</h3>
            <p>Full open access with immediate online publication</p>
          </div>
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Publication Ethics</h3>
            <p>Adherence to international publication standards and ethics</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="text-primary-800">Research Focus Areas</h2>
        <div className="journal-details">
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Business Education</h3>
            <p>Business Administration, Management, Marketing, Human Resources</p>
          </div>
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Entrepreneurship Education</h3>
            <p>Entrepreneurial Mindset, Venture Creation, Innovation Management</p>
          </div>
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Leadership Education</h3>
            <p>Organizational Leadership, Strategic Management, Change Management</p>
          </div>
          <div className="detail-card bg-white border border-primary-100">
            <h3 className="text-primary-700">Financial Literacy</h3>
            <p>Personal Finance, Investment Strategies, Financial Planning</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="text-primary-800">Our Location</h2>
        <div className="location-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.964964357751!2d11.031963!3d11.713964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10f4c7e2e2e2e2e3%3A0x7e2e2e2e2e2e2e2e!2sFederal%20College%20of%20Education%20(Technical)%20Potiskum!5e0!3m2!1sen!2sng!4v1701876008045!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Federal College of Education Technical Potiskum Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default About;
