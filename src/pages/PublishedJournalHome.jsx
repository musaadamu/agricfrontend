import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Download, Search, Calendar, BarChart3, 
  FileText, Users, Award, TrendingUp, Clock, Tag
} from 'lucide-react';
import PublishedJournalNavigation from '../components/PublishedJournalNavigation';
import PublishedJournalCard from '../components/PublishedJournalCard';
import { toast } from 'react-hot-toast';

const PublishedJournalHome = () => {
  const [recentJournals, setRecentJournals] = useState([]);
  const [stats, setStats] = useState({
    totalJournals: 0,
    currentYearJournals: 0,
    totalDownloads: 0,
    currentQuarter: 1
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const storedUser = localStorage.getItem('authUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    fetchRecentJournals();
    fetchStats();
  }, []);

  const fetchRecentJournals = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals?limit=6`);
      const data = await response.json();
      
      if (data.success) {
        setRecentJournals(data.data.journals);
      }
    } catch (error) {
      console.error('Error fetching recent journals:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/stats/overview`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/published-journals?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const currentYear = new Date().getFullYear();
  const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3);

  const quickStats = [
    {
      icon: BookOpen,
      label: 'Total Journals',
      value: stats.totalJournals,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      icon: Calendar,
      label: `${currentYear} Journals`,
      value: stats.currentYearJournals,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: stats.totalDownloads,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      label: `Q${currentQuarter} ${currentYear}`,
      value: 'Current',
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Browse All Journals',
      description: 'Explore our complete collection of published journals',
      icon: BookOpen,
      link: '/published-journals',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Submit Your Journal',
      description: 'Submit your research for publication consideration',
      icon: FileText,
      link: '/submit-journal',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      requiresAuth: true
    },
    {
      title: 'Advanced Search',
      description: 'Find specific journals using advanced filters',
      icon: Search,
      link: '/published-journal-search',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'View Archive',
      description: 'Access journals from previous years',
      icon: Calendar,
      link: '/published-journal-archive',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <PublishedJournalNavigation user={user} />

      {/* Main Content */}
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Published Journals Portal
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Nigerian Journal of Business and Entrepreneurship Education (NIJOBED)
              </p>
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                Discover cutting-edge research in business, entrepreneurship, and education. 
                Access peer-reviewed articles from leading scholars and practitioners.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search journals by title, author, keywords..."
                    className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2"
                  >
                    <Search size={20} />
                    Search
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const isDisabled = action.requiresAuth && !user;
                
                return (
                  <Link
                    key={index}
                    to={isDisabled ? '/login' : action.link}
                    className={`block p-6 rounded-lg border-2 transition-all duration-200 ${
                      isDisabled 
                        ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed' 
                        : action.color
                    }`}
                    onClick={isDisabled ? (e) => {
                      e.preventDefault();
                      toast.error('Please login to submit journals');
                    } : undefined}
                  >
                    <Icon className={`${action.iconColor} mb-4`} size={32} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                    {isDisabled && (
                      <p className="text-red-500 text-xs mt-2">Login required</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Journals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Recent Publications</h2>
              <Link
                to="/published-journals"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                View All
                <BookOpen size={20} />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : recentJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentJournals.map((journal) => (
                  <PublishedJournalCard key={journal._id} journal={journal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Journals Yet</h3>
                <p className="text-gray-500">Published journals will appear here once available.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublishedJournalHome;
