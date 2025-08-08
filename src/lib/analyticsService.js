// 访客统计服务
class AnalyticsService {
  constructor() {
    this.sessionId = this.getSessionId();
    this.userId = this.getUserId();
    this.isOnline = false;
    this.lastActivity = Date.now();
    this.activityInterval = null;
  }

  // 获取或创建会话ID
  getSessionId() {
    let sessionId = localStorage.getItem('analytics_sessionId');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('analytics_sessionId', sessionId);
    }
    return sessionId;
  }

  // 获取用户ID
  getUserId() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      return userData.id || userData.email;
    }
    return null;
  }

  // 记录页面访问
  async trackPageView(page, additionalData = {}) {
    try {
      const data = {
        page,
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: Date.now(),
        ...additionalData
      };

      // 发送到后端API
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // 更新本地存储的访问记录
      this.updateLocalAnalytics(page);
      
      console.log('Page view tracked:', page);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  // 记录用户行为
  async trackUserAction(action, data = {}) {
    try {
      const eventData = {
        action,
        page: window.location.pathname,
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: Date.now(),
        ...data
      };

      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      console.log('User action tracked:', action);
    } catch (error) {
      console.error('Error tracking user action:', error);
      // 使用本地存储记录事件
      this.trackLocalEvent(action, data);
    }
  }

  // 本地记录事件
  trackLocalEvent(action, data = {}) {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const eventData = {
      action,
      page: window.location.pathname,
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: Date.now(),
      data
    };
    
    events.push(eventData);
    
    // 只保留最近1000个事件
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));
    console.log('Local event tracked:', action);
  }

  // 更新本地统计
  updateLocalAnalytics(page) {
    const analytics = JSON.parse(localStorage.getItem('analytics_data') || '{}');
    
    // 更新页面访问次数
    analytics.pageViews = analytics.pageViews || {};
    analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;
    
    // 更新总访问次数
    analytics.totalViews = (analytics.totalViews || 0) + 1;
    
    // 更新今日访问次数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = today.toISOString().split('T')[0];
    
    analytics.dailyViews = analytics.dailyViews || {};
    analytics.dailyViews[todayKey] = (analytics.dailyViews[todayKey] || 0) + 1;
    analytics.todayViews = analytics.dailyViews[todayKey] || 0;
    
    // 更新最后访问时间
    analytics.lastVisit = Date.now();
    
    localStorage.setItem('analytics_data', JSON.stringify(analytics));
  }

  // 获取本地统计数据
  getLocalAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('analytics_data') || '{}');
    return {
      totalViews: analytics.totalViews || 0,
      pageViews: analytics.pageViews || {},
      lastVisit: analytics.lastVisit || null
    };
  }

  // 开始在线状态监控
  startOnlineMonitoring() {
    if (this.isOnline) return;
    
    this.isOnline = true;
    this.lastActivity = Date.now();
    
    // 每30秒发送一次心跳
    this.activityInterval = setInterval(() => {
      this.sendHeartbeat();
    }, 30000);

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.sendHeartbeat();
      }
    });

    // 监听用户活动
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        this.lastActivity = Date.now();
      });
    });
  }

  // 停止在线状态监控
  stopOnlineMonitoring() {
    if (this.activityInterval) {
      clearInterval(this.activityInterval);
      this.activityInterval = null;
    }
    this.isOnline = false;
  }

  // 发送心跳
  async sendHeartbeat() {
    try {
      await fetch('/api/analytics/heartbeat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          userId: this.userId,
          lastActivity: this.lastActivity,
          timestamp: Date.now()
        }),
      });
    } catch (error) {
      console.error('Error sending heartbeat:', error);
      // 使用本地存储模拟心跳
      this.updateLocalHeartbeat();
    }
  }

  // 更新本地心跳
  updateLocalHeartbeat() {
    const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
    const sessionData = {
      sessionId: this.sessionId,
      userId: this.userId,
      lastActivity: this.lastActivity,
      timestamp: Date.now()
    };
    
    // 更新或添加当前会话
    const existingIndex = activeSessions.findIndex(s => s.sessionId === this.sessionId);
    if (existingIndex >= 0) {
      activeSessions[existingIndex] = sessionData;
    } else {
      activeSessions.push(sessionData);
    }
    
    // 清理超时的会话（5分钟超时）
    const now = Date.now();
    const timeout = 5 * 60 * 1000; // 5分钟
    const filteredSessions = activeSessions.filter(s => now - s.lastActivity < timeout);
    
    localStorage.setItem('active_sessions', JSON.stringify(filteredSessions));
  }

  // 获取实时统计
  async getRealTimeStats() {
    try {
      // 先发送心跳确保在线状态
      await this.sendHeartbeat();
      
      const response = await fetch('/api/analytics/realtime');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
      // 使用本地存储的模拟数据
      return this.getLocalStats();
    }
  }

  // 获取本地统计（模拟数据）
  getLocalStats() {
    const analytics = JSON.parse(localStorage.getItem('analytics_data') || '{}');
    const now = Date.now();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 获取今日访问次数
    const todayViews = analytics.todayViews || 0;
    
    // 获取总访问次数
    const totalViews = analytics.totalViews || 0;
    
    // 模拟在线用户数（基于活跃会话）
    const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
    const onlineUsers = Math.max(activeSessions.length, 1);
    
    return {
      onlineUsers,
      totalViews: Math.max(totalViews, 1),
      todayViews: Math.max(todayViews, 1),
      timestamp: now
    };
  }

  // 获取历史统计
  async getHistoricalStats(days = 7) {
    try {
      const response = await fetch(`/api/analytics/history?days=${days}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching historical stats:', error);
      // 使用本地存储的历史数据
      return this.getLocalHistoricalStats(days);
    }
  }

  // 获取本地历史统计
  getLocalHistoricalStats(days = 7) {
    const analytics = JSON.parse(localStorage.getItem('analytics_data') || '{}');
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    
    // 计算总访问量
    const totalViews = analytics.totalViews || 0;
    
    // 计算独立用户数（基于会话）
    const uniqueSessions = new Set(events.map(e => e.sessionId));
    const uniqueUsers = uniqueSessions.size;
    
    // 计算热门页面
    const pageViews = analytics.pageViews || {};
    const topPages = Object.entries(pageViews)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .reduce((acc, [page, count]) => {
        acc[page] = count;
        return acc;
      }, {});
    
    // 计算每日统计
    const dailyStats = [];
    const dailyViews = analytics.dailyViews || {};
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      dailyStats.unshift({
        date: dateKey,
        views: dailyViews[dateKey] || 0
      });
    }
    
    return {
      totalViews: Math.max(totalViews, 1),
      uniqueUsers: Math.max(uniqueUsers, 1),
      topPages,
      dailyStats,
      period: `${days}天`
    };
  }
}

// 创建全局实例
const analyticsService = new AnalyticsService();

export default analyticsService;
