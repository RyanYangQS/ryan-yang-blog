// 访客统计服务 - 使用Supabase
import supabaseAnalyticsService from './supabaseAnalyticsService.ts'

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
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        sessionId: this.sessionId,
        userId: this.userId,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...additionalData
      };

      // 使用Supabase服务记录页面访问
      const success = await supabaseAnalyticsService.trackPageView(page, data);
      
      if (success) {
        // 更新用户会话
        await supabaseAnalyticsService.updateUserSession(this.sessionId, this.userId, navigator.userAgent);
      }

      console.log('Page view tracked to Supabase:', page);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  // 记录用户行为
  async trackUserAction(action, data = {}) {
    try {
      const eventData = {
        sessionId: this.sessionId,
        userId: this.userId,
        page: window.location.pathname,
        eventData: data
      };

      const success = await supabaseAnalyticsService.trackUserEvent(action, eventData);

      if (success) {
        console.log('User action tracked to Supabase:', action);
      }
    } catch (error) {
      console.error('Error tracking user action:', error);
    }
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
      const success = await supabaseAnalyticsService.sendHeartbeat(
        this.sessionId, 
        this.userId, 
        this.lastActivity
      );

      if (!success) {
        console.error('Failed to send heartbeat to Supabase');
      }
    } catch (error) {
      console.error('Error sending heartbeat:', error);
    }
  }

  // 获取实时统计
  async getRealTimeStats() {
    try {
      // 先发送心跳确保在线状态
      await this.sendHeartbeat();
      
      const stats = await supabaseAnalyticsService.getRealTimeStats();
      
      if (stats) {
        return {
          onlineUsers: stats.online_users || 1,
          totalViews: stats.total_views || 1,
          todayViews: stats.today_views || 1,
          timestamp: Date.now()
        };
      } else {
        // 如果Supabase没有数据，返回默认值
        console.log('No Supabase real-time data available, returning defaults');
        return {
          onlineUsers: 1,
          totalViews: 1,
          todayViews: 1,
          timestamp: Date.now()
        };
      }
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
      return {
        onlineUsers: 1,
        totalViews: 1,
        todayViews: 1,
        timestamp: Date.now()
      };
    }
  }

  // 获取历史统计
  async getHistoricalStats(days = 7) {
    try {
      const stats = await supabaseAnalyticsService.getHistoricalStats(days);
      
      if (stats) {
        return {
          totalViews: stats.totalViews || 1,
          uniqueUsers: stats.uniqueUsers || 1,
          uniqueSessions: stats.uniqueSessions || 1,
          topPages: stats.topPages || {},
          dailyStats: stats.dailyStats || [],
          period: stats.period || `${days}天`
        };
      } else {
        // 如果Supabase没有数据，返回默认值
        console.log('No Supabase historical data available, returning defaults');
        return {
          totalViews: 1,
          uniqueUsers: 1,
          uniqueSessions: 1,
          topPages: {},
          dailyStats: [],
          period: `${days}天`
        };
      }
    } catch (error) {
      console.error('Error fetching historical stats:', error);
      // 返回默认值而不是本地数据
      return {
        totalViews: 1,
        uniqueUsers: 1,
        uniqueSessions: 1,
        topPages: {},
        dailyStats: [],
        period: `${days}天`
      };
    }
  }
}

// 创建全局实例
const analyticsService = new AnalyticsService();

export default analyticsService;
