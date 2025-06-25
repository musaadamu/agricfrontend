import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiSend, FiMessageCircle } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Contact Us</h1>
          <p className="text-slate-600 text-lg">Get in touch with the editorial team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-slate-700 mb-6">Contact Information</h3>
            <div className="space-y-4 text-slate-600">
              <p className="flex items-start gap-3">
                <FiMapPin className="text-blue-500 mt-1" />
                <span>
                  The Editor-in-Chief<br />
                  Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)<br />
                  School of Secondary Education (Business),<br />
                  Federal College of Education (Technical),<br />
                  Potiskum, Yobe State.
                </span>
              </p>
              <p className="flex items-center gap-3">
                <FiMail className="text-blue-500" />
                <a href="mailto:sbefcetpotiskum@gmail.com">sbefcetpotiskum@gmail.com</a>
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="text-blue-500" />
                <span>+2347035694303; +2348128161859</span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Follow Us</h3>
              <div className="flex gap-4 text-blue-600 text-xl">
                <a href="#" className="hover:text-blue-800"><FiFacebook /></a>
                <a href="#" className="hover:text-blue-800"><FiTwitter /></a>
                <a href="#" className="hover:text-blue-800"><FiInstagram /></a>
                <a href="#" className="hover:text-blue-800"><FiLinkedin /></a>
                <a href="#" className="hover:text-blue-800"><FiYoutube /></a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-slate-700 mb-6">Message to Editor</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <FiSend className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
