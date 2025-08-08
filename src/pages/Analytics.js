import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, Eye, TrendingUp, Calendar, Activity, RefreshCw } from "lucide-react";
import analyticsService from "../lib/analyticsService";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueUsers: 0,
    topPages: {},
    dailyStats: []
  });
  const [realTimeStats, setRealTimeStats] = useState({
    onlineUsers: 0,
    totalViews: 0,
    todayViews: 0
  });
  const [loading, setLoading] = useState(true);
  const [period] = useState(7);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getHistoricalStats(period);
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
      // 如果API失败，使用本地数据
      const localData = analyticsService.getLocalHistoricalStats(period);
      setStats(localData);
    } finally {
      setLoading(false);
    }
  }, [period]);

  const loadRealTimeStats = useCallback(async () => {
    try {
      const data = await analyticsService.getRealTimeStats();
      setRealTimeStats(data);
    } catch (error) {
      console.error("Error loading real-time stats:", error);
      // 如果API失败，使用本地数据
      const localData = analyticsService.getLocalStats();
      setRealTimeStats(localData);
    }
  }, []);

  useEffect(() => {
    loadStats();
    loadRealTimeStats();

    const interval = setInterval(loadRealTimeStats, 30000);
    return () => clearInterval(interval);
  }, [loadStats, loadRealTimeStats]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">加载统计数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">访问统计</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">实时监控网站访问数据和用户行为分析</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">在线用户</p>
                <p className="text-3xl font-bold text-green-400">{formatNumber(realTimeStats.onlineUsers)}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">实时更新</span>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">今日访问</p>
                <p className="text-3xl font-bold text-blue-400">{formatNumber(realTimeStats.todayViews)}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">今日数据</span>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">总访问量</p>
                <p className="text-3xl font-bold text-purple-400">{formatNumber(realTimeStats.totalViews)}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">历史累计</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <BarChart3 className="w-6 h-6" />
                <span>历史统计</span>
              </h3>
              <button onClick={loadStats} className="p-2 text-gray-400 hover:text-white transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">总访问量</span>
                <span className="text-white font-semibold">{formatNumber(stats.totalViews)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">独立用户</span>
                <span className="text-white font-semibold">{formatNumber(stats.uniqueUsers)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <span>热门页面</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.topPages || {}).slice(0, 5).map(([page, count], index) => (
                <div key={page} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm truncate flex-1">{page === "/" ? "首页" : page}</span>
                  <span className="text-primary-400 font-semibold ml-4">{formatNumber(count)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
