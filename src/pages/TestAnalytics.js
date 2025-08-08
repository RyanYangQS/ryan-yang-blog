import React, { useState, useEffect } from 'react';
import analyticsService from '../lib/analyticsService';

const TestAnalytics = () => {
  const [localData, setLocalData] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 模拟一些访问数据
    analyticsService.trackPageView('/test', { test: true });
    analyticsService.trackUserAction('test_click', { element: 'button' });
    
    // 显示本地存储的数据
    const analytics = JSON.parse(localStorage.getItem('analytics_data') || '{}');
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const sessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
    
    setLocalData({
      analytics,
      sessions,
      totalEvents: events.length
    });
    setEvents(events.slice(-10)); // 显示最近10个事件
  }, []);

  const addTestData = () => {
    analyticsService.trackPageView('/test', { test: true });
    analyticsService.trackUserAction('test_action', { timestamp: Date.now() });
    
    // 刷新显示
    const analytics = JSON.parse(localStorage.getItem('analytics_data') || '{}');
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const sessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
    
    setLocalData({
      analytics,
      sessions,
      totalEvents: events.length
    });
    setEvents(events.slice(-10));
  };

  const clearData = () => {
    localStorage.removeItem('analytics_data');
    localStorage.removeItem('analytics_events');
    localStorage.removeItem('active_sessions');
    setLocalData({});
    setEvents([]);
  };

  return (
    <div className="min-h-screen pt-20 bg-dark-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">统计功能测试</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">本地存储数据</h2>
            <pre className="text-sm bg-dark-800 p-4 rounded overflow-auto">
              {JSON.stringify(localData, null, 2)}
            </pre>
          </div>
          
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">最近事件</h2>
            <div className="space-y-2">
              {events.map((event, index) => (
                <div key={index} className="text-sm bg-dark-800 p-2 rounded">
                  <div className="font-semibold">{event.action}</div>
                  <div className="text-gray-400">{event.page}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={addTestData}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            添加测试数据
          </button>
          <button
            onClick={clearData}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            清除所有数据
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestAnalytics;
