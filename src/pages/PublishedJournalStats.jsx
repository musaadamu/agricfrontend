import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Calendar, Download,
  BookOpen, Users, Award, Clock
} from 'lucide-react';
import PublishedJournalNavigation from '../components/PublishedJournalNavigation';
import { toast } from 'react-hot-toast';

const PublishedJournalStats = () => {
  const [stats, setStats] = useState({
    overview: {
      totalJournals: 0,
      currentYearJournals: 0,
      totalSubmissions: 0,
      pendingReviews: 0,
      totalDownloads: 0,
      avgDownloads: 0,
      totalAuthors: 0,
      currentYear: new Date().getFullYear()
    },
    quarterlyStats: [],
    yearlyStats: [],
    topJournals: [],
    recentActivity: {},
    statusDistribution: {},
    availableYears: [],
    monthlyTrends: [],
    generatedAt: null,
    requestedYear: new Date().getFullYear()
  });
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const storedUser = localStorage.getItem('authUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    fetchStats();
  }, [selectedYear]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      console.log(`📊 Fetching statistics for year: ${selectedYear}`);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/published-journals/stats/overview?year=${selectedYear}`);
      const data = await response.json();

      if (data.success) {
        console.log('📈 Statistics received:', data.data);
        setStats(data.data);
      } else {
        console.error('❌ Failed to fetch statistics:', data.message);
        toast.error(data.message || 'Failed to fetch statistics');
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      toast.error('Failed to load statistics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const overviewCards = [
    {
      title: 'Total Published',
      value: stats.overview.totalJournals,
      subtitle: 'Published Journals',
      icon: BookOpen,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Downloads',
      value: stats.overview.totalDownloads,
      subtitle: `Avg: ${stats.overview.avgDownloads}/journal`,
      icon: Download,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Unique Authors',
      value: stats.overview.totalAuthors,
      subtitle: 'Contributing Authors',
      icon: Users,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: `${selectedYear} Journals`,
      value: stats.overview.currentYearJournals,
      subtitle: `of ${stats.overview.totalSubmissions} submissions`,
      icon: Calendar,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Pending Reviews',
      value: stats.overview.pendingReviews,
      subtitle: 'Awaiting Review',
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const quarterNames = ['Q1', 'Q2', 'Q3', 'Q4'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublishedJournalNavigation user={user} />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 h-32"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublishedJournalNavigation user={user} />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Journal Statistics</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive analytics and insights about published journals
            </p>
          </motion.div>

          {/* Year Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </motion.div>

          {/* Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
          >
            {overviewCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                      </p>
                      {card.subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${card.color}`}>
                      <Icon className="text-white" size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Quarterly Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-blue-600" />
              {selectedYear} Quarterly Breakdown
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {quarterNames.map((quarter, index) => {
                const quarterData = stats.quarterlyStats.find(q => q.quarter === index + 1) || { count: 0, downloads: 0 };
                return (
                  <div key={quarter} className="text-center p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{quarter}</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{quarterData.count}</p>
                        <p className="text-sm text-gray-600">Journals</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-600">{quarterData.downloads}</p>
                        <p className="text-sm text-gray-600">Downloads</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Performing Journals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="text-yellow-600" />
              Top Performing Journals
            </h2>
            
            {stats.topJournals.length > 0 ? (
              <div className="space-y-4">
                {stats.topJournals.map((journal, index) => (
                  <div key={journal._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{journal.title}</h3>
                        <p className="text-sm text-gray-600">
                          {journal.authors.join(', ')} • {journal.volume_year} Q{journal.volume_quarter}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{journal.downloadCount || 0}</p>
                      <p className="text-sm text-gray-600">downloads</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No journal data available for the selected year.</p>
            )}
          </motion.div>

          {/* Status Distribution & Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Status Distribution */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="text-blue-600" />
                Status Distribution
              </h2>

              <div className="space-y-4">
                {Object.entries(stats.statusDistribution).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'published' ? 'bg-green-500' :
                        status === 'under_review' ? 'bg-yellow-500' :
                        status === 'submitted' ? 'bg-blue-500' :
                        status === 'archived' ? 'bg-gray-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium text-gray-900 capitalize">
                        {status.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-700">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="text-orange-600" />
                Recent Activity (30 days)
              </h2>

              <div className="space-y-4">
                {Object.entries(stats.recentActivity).length > 0 ? (
                  Object.entries(stats.recentActivity).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900 capitalize">
                        {status.replace('_', ' ')} Journals
                      </span>
                      <span className="text-lg font-bold text-blue-600">{count}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Yearly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Yearly Trends
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.yearlyStats.length > 0 ? (
                stats.yearlyStats.map((yearData) => (
                  <div key={yearData.year} className="text-center p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{yearData.year}</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{yearData.count}</p>
                        <p className="text-sm text-gray-600">Journals Published</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-600">{yearData.downloads}</p>
                        <p className="text-sm text-gray-600">Total Downloads</p>
                      </div>
                      {yearData.avgDownloads && (
                        <div>
                          <p className="text-sm font-medium text-purple-600">{yearData.avgDownloads}</p>
                          <p className="text-xs text-gray-500">Avg Downloads</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No yearly data available</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublishedJournalStats;
