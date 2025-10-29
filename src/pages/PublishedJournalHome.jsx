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
        setStats({
          totalJournals: data.data.overview.totalJournals,
          currentYearJournals: data.data.overview.currentYearJournals,
          totalDownloads: data.data.overview.totalDownloads,
          currentQuarter: Math.ceil((new Date().getMonth() + 1) / 3)
        });
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
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      icon: Calendar,
      label: `${currentYear} Journals`,
      value: stats.currentYearJournals,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: stats.totalDownloads,
      color: 'bg-amber-500',
      textColor: 'text-amber-600'
    },
    {
      icon: TrendingUp,
      label: `Q${currentQuarter} ${currentYear}`,
      value: 'Current',
      color: 'bg-rose-500',
      textColor: 'text-rose-600'
    }
  ];

  const quickActions = [
    {
      title: 'Browse All Journals',
      description: 'Explore our complete collection of vocational education research',
      icon: BookOpen,
      link: '/published-journals',
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Submit Your Journal',
      description: 'Submit your vocational education research for publication',
      icon: FileText,
      link: '/submit-journal',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      requiresAuth: true
    },
    {
      title: 'Advanced Search',
      description: 'Find specific journals using advanced filters',
      icon: Search,
      link: '/published-journal-search',
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      title: 'View Archive',
      description: 'Access journals from previous years',
      icon: Calendar,
      link: '/published-journal-archive',
      color: 'bg-rose-50 border-rose-200 hover:bg-rose-100',
      iconColor: 'text-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      {/* Navigation */}
      <PublishedJournalNavigation user={user} />

      {/* Main Content */}
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-24 shadow-2xl overflow-hidden">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10"
              style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(234, 88, 12, 0.3) 0%, transparent 50%)'
              }}>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                JOVOTE Research Portal
              </h1>
              <p className="text-2xl md:text-3xl mb-8 text-gray-300 font-semibold">
                Journal of Vocational Teacher Education
              </p>
              <p className="text-lg mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore cutting-edge research in vocational teacher education. Access peer-reviewed articles from leading scholars at the Federal College of Education (Technical), Potiskum.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative z-20">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search journals by title, author, keywords..."
                    className="flex-1 px-8 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 shadow-lg"
                  />
                  <button
                    type="submit"
                    className="px-10 py-4 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-all font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Search size={22} />
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-12">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-600 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 text-sm font-bold uppercase tracking-wide">{stat.label}</p>
                      <p className="text-4xl font-bold text-red-900 mt-3">
                        {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      </p>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.color}`}>
                      <Icon className="text-white" size={32} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-red-900 mb-10 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const isDisabled = action.requiresAuth && !user;

                return (
                  <motion.div
                    key={index}
                    whileHover={!isDisabled ? { y: -8 } : {}}
                  >
                    <Link
                      to={isDisabled ? '/login' : action.link}
                      className={`block p-8 rounded-2xl border-2 transition-all duration-200 h-full ${
                        isDisabled
                          ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                          : action.color + ' hover:shadow-xl'
                      }`}
                      onClick={isDisabled ? (e) => {
                        e.preventDefault();
                        toast.error('Please login to submit journals');
                      } : undefined}
                    >
                      <Icon className={`${action.iconColor} mb-6`} size={40} />
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{action.description}</p>
                      {isDisabled && (
                        <p className="text-red-600 text-xs font-semibold mt-4 uppercase tracking-wide">Login required</p>
                      )}
                    </Link>
                  </motion.div>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-bold text-red-900">Latest Research</h2>
                <p className="text-red-700 mt-2">Recently published vocational education research</p>
              </div>
              <Link
                to="/published-journals"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all font-bold flex items-center gap-2 shadow-lg whitespace-nowrap"
              >
                <span>View All Journals</span>
                <BookOpen size={22} />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-8 animate-pulse border border-red-100">
                    <div className="h-6 bg-red-200 rounded-lg mb-6"></div>
                    <div className="h-4 bg-red-100 rounded mb-3"></div>
                    <div className="h-4 bg-red-100 rounded mb-6"></div>
                    <div className="flex gap-3">
                      <div className="h-12 bg-red-200 rounded-lg flex-1"></div>
                      <div className="h-12 bg-orange-200 rounded-lg flex-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentJournals.map((journal) => (
                  <PublishedJournalCard key={journal._id} journal={journal} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-red-200"
              >
                <BookOpen className="mx-auto text-red-300 mb-6" size={64} />
                <h3 className="text-2xl font-bold text-red-900 mb-3">No Journals Yet</h3>
                <p className="text-red-700 text-lg">Published journals will appear here once available.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublishedJournalHome;
