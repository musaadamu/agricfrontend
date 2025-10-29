import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiSend, FiMessageCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We will respond shortly.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900 mb-2">Contact Us</h1>
          <p className="text-red-700 text-lg">Get in touch with the JOVOTE editorial team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-red-600">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Contact Information</h3>
            <div className="space-y-4 text-red-800">
              <p className="flex items-start gap-3">
                <FiMapPin className="text-red-600 mt-1 flex-shrink-0" />
                <span>
                  The Editor-in-Chief<br />
                  Journal of Vocational Teacher Education (JOVOTE)<br />
                  School of Secondary Education (Vocational),<br />
                  Federal College of Education (Technical),<br />
                  Potiskum, Yobe State.
                </span>
              </p>
              <p className="flex items-center gap-3">
                <FiMail className="text-red-600 flex-shrink-0" />
                <a href="mailto:jovote2025@gmail.com" className="hover:text-red-700">jovote2025@gmail.com</a>
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="text-red-600 flex-shrink-0" />
                <span>Chairman: Dr. Victor Madu U. - 08034942253 | Secretary: Halima Abdullahi - 08065386688</span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-red-900 mb-4">Follow Us</h3>
              <div className="flex gap-4 text-red-600 text-xl">
                <a href="#" className="hover:text-red-800 transition-colors"><FiFacebook /></a>
                <a href="#" className="hover:text-red-800 transition-colors"><FiTwitter /></a>
                <a href="#" className="hover:text-red-800 transition-colors"><FiInstagram /></a>
                <a href="#" className="hover:text-red-800 transition-colors"><FiLinkedin /></a>
                <a href="#" className="hover:text-red-800 transition-colors"><FiYoutube /></a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-orange-600">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Message to Editor</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
