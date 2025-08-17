import React, { useState, useEffect } from 'react';
import { BarChart, Users, Eye, MousePointer, TrendingUp, Calendar, Globe, MessageCircle } from 'lucide-react';

interface AnalyticsData {
  totalVisitors: number;
  todayVisitors: number;
  pageViews: number;
  quoteRequests: number;
  contactForms: number;
  chatSessions: number;
  topPages: Array<{ page: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  recentActivity: Array<{ action: string; timestamp: string; page: string }>;
}

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics/dashboard?range=${timeRange}`);
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
          <p className="text-gray-600">Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <BarChart className="mr-3 text-blue-600" size={32} />
              Analytics Dashboard
            </h1>
            
            <div className="flex space-x-2">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalVisitors.toLocaleString()}</p>
              </div>
              <Users className="text-blue-600" size={32} />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-sm text-green-600">+12% from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.todayVisitors}</p>
              </div>
              <Calendar className="text-green-600" size={32} />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-sm text-green-600">+8% from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.pageViews.toLocaleString()}</p>
              </div>
              <Eye className="text-purple-600" size={32} />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-sm text-green-600">+15% from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quote Requests</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.quoteRequests}</p>
              </div>
              <MousePointer className="text-orange-600" size={32} />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-sm text-green-600">+25% conversion rate</span>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Forms</h3>
              <MessageCircle className="text-blue-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analytics.contactForms}</p>
            <p className="text-sm text-gray-600 mt-2">Messages received</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Chat Sessions</h3>
              <MessageCircle className="text-green-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analytics.chatSessions}</p>
            <p className="text-sm text-gray-600 mt-2">Live conversations</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {((analytics.quoteRequests / analytics.totalVisitors) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 mt-2">Visitors to leads</p>
          </div>
        </div>

        {/* Top Pages and Countries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
            <div className="space-y-3">
              {analytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 truncate">{page.page}</span>
                  <span className="text-gray-900 font-medium">{page.views}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="mr-2 text-blue-600" size={20} />
              Top Countries
            </h3>
            <div className="space-y-3">
              {analytics.topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{country.country}</span>
                  <span className="text-gray-900 font-medium">{country.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="text-gray-900 font-medium">{activity.action}</span>
                  <span className="text-gray-600 ml-2">on {activity.page}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;