import { supabase, RealtimeStats } from './supabase'

// 检查 Supabase 连接是否可用
const isSupabaseAvailable = () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
  return !!(supabaseUrl && supabaseAnonKey)
}

// Supabase统计服务
class SupabaseAnalyticsService {
  // 记录页面访问
  async trackPageView(page: string, additionalData: any = {}) {
    // 检查 Supabase 是否可用
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, skipping page view tracking')
      return false
    }

    try {
      const { error } = await supabase
        .from('analytics')
        .insert({
          page,
          url: additionalData.url || window.location.href,
          user_agent: additionalData.userAgent || navigator.userAgent,
          referrer: additionalData.referrer || document.referrer,
          session_id: additionalData.sessionId,
          user_id: additionalData.userId,
          screen_size: additionalData.screenSize || `${window.screen.width}x${window.screen.height}`,
          viewport_size: additionalData.viewportSize || `${window.innerWidth}x${window.innerHeight}`,
          language: additionalData.language || navigator.language,
          timezone: additionalData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: new Date().toISOString()
        })

      if (error) {
        console.error('Error tracking page view:', error)
        return false
      }

      console.log('Page view tracked to Supabase:', page)
      return true
    } catch (error) {
      console.error('Error tracking page view:', error)
      return false
    }
  }

  // 记录用户事件
  async trackUserEvent(action: string, data: any = {}) {
    // 检查 Supabase 是否可用
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, skipping user event tracking')
      return false
    }

    try {
      const { error } = await supabase
        .from('user_events')
        .insert({
          session_id: data.sessionId,
          user_id: data.userId,
          action,
          page: data.page || window.location.pathname,
          data: data.eventData || {},
          timestamp: new Date().toISOString()
        })

      if (error) {
        console.error('Error tracking user event:', error)
        return false
      }

      console.log('User event tracked:', action)
      return true
    } catch (error) {
      console.error('Error tracking user event:', error)
      return false
    }
  }

  // 更新或创建用户会话
  async updateUserSession(sessionId: string, userId?: string, userAgent?: string) {
    // 检查 Supabase 是否可用
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, skipping user session update')
      return false
    }

    try {
      const sessionData = {
        session_id: sessionId,
        user_id: userId,
        user_agent: userAgent || navigator.userAgent,
        last_activity: new Date().toISOString()
      }

      // 使用upsert操作，如果session_id存在则更新，不存在则插入
      const { error } = await supabase
        .from('user_sessions')
        .upsert(sessionData, {
          onConflict: 'session_id',
          ignoreDuplicates: false
        })

      if (error) {
        console.error('Error updating user session:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error updating user session:', error)
      return false
    }
  }

  // 发送心跳
  async sendHeartbeat(sessionId: string, userId?: string, lastActivity?: number) {
    // 检查 Supabase 是否可用
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, skipping heartbeat')
      return false
    }

    try {
      const { error } = await supabase
        .from('heartbeat_logs')
        .insert({
          session_id: sessionId,
          user_id: userId,
          last_activity: new Date(lastActivity || Date.now()).toISOString(),
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })

      if (error) {
        console.error('Error sending heartbeat:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error sending heartbeat:', error)
      return false
    }
  }

  // 获取实时统计
  async getRealTimeStats(): Promise<RealtimeStats | null> {
    // 检查 Supabase 是否可用
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning default real-time stats')
      return {
        online_users: 1,
        today_views: 1,
        today_users: 1,
        total_views: 1
      }
    }

    try {
      // 获取在线用户数（最近5分钟活跃的会话）
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      const { data: onlineUsers, error: onlineError } = await supabase
        .from('user_sessions')
        .select('session_id')
        .gte('last_activity', fiveMinutesAgo)

      // 获取今日访问量（今日的所有访问记录）
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const { data: todayViews, error: todayError } = await supabase
        .from('analytics')
        .select('session_id')
        .gte('timestamp', today.toISOString())

      // 获取今日独立用户数
      const { data: todayUsers, error: usersError } = await supabase
        .from('analytics')
        .select('user_id')
        .gte('timestamp', today.toISOString())
        .not('user_id', 'is', null)

      // 获取总访问量（所有时间的访问记录）
      const { data: totalViews, error: totalError } = await supabase
        .from('analytics')
        .select('session_id')

      if (onlineError || todayError || usersError || totalError) {
        console.error('Error fetching real-time stats:', { onlineError, todayError, usersError, totalError })
        return null
      }

      const uniqueOnlineUsers = new Set(onlineUsers?.map(u => u.session_id) || [])
      const uniqueTodayViews = new Set(todayViews?.map(v => v.session_id) || [])
      const uniqueTodayUsers = new Set(todayUsers?.map(u => u.user_id) || [])
      const uniqueTotalViews = new Set(totalViews?.map(v => v.session_id) || [])

      const result = {
        online_users: uniqueOnlineUsers.size || 1,
        today_views: uniqueTodayViews.size || 1,
        today_users: uniqueTodayUsers.size || 1,
        total_views: uniqueTotalViews.size || 1
      }

      console.log('Real-time stats result:', result)
      return result
    } catch (error) {
      console.error('Error fetching real-time stats:', error)
      return null
    }
  }

  // 获取历史统计
  async getHistoricalStats(days: number = 7) {
    // 检查 Supabase 是否可用
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning default historical stats')
      return {
        totalViews: 1,
        uniqueUsers: 1,
        uniqueSessions: 1,
        topPages: {},
        dailyStats: [],
        period: `${days}天`
      }
    }

    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      console.log('Fetching historical stats for', days, 'days from', startDate.toISOString())

      // 获取总访问量
      const { data: totalViews, error: totalError } = await supabase
        .from('analytics')
        .select('*')
        .gte('timestamp', startDate.toISOString())

      if (totalError) {
        console.error('Error fetching total views:', totalError)
        return null
      }

      // 获取独立会话数
      const { data: uniqueSessions, error: sessionsError } = await supabase
        .from('analytics')
        .select('session_id')
        .gte('timestamp', startDate.toISOString())
        .not('session_id', 'is', null)

      if (sessionsError) {
        console.error('Error fetching unique sessions:', sessionsError)
        return null
      }

      // 获取独立用户数
      const { data: uniqueUsers, error: usersError } = await supabase
        .from('analytics')
        .select('user_id')
        .gte('timestamp', startDate.toISOString())
        .not('user_id', 'is', null)

      if (usersError) {
        console.error('Error fetching unique users:', usersError)
        return null
      }

      // 获取热门页面
      const { data: topPages, error: pagesError } = await supabase
        .from('analytics')
        .select('page, timestamp')
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: false })

      if (pagesError) {
        console.error('Error fetching top pages:', pagesError)
        return null
      }

      // 计算页面访问统计
      const pageViews = topPages?.reduce((acc: any, curr) => {
        if (curr.page) {
          acc[curr.page] = (acc[curr.page] || 0) + 1
        }
        return acc
      }, {}) || {}

      console.log('Page views calculated:', pageViews)
      console.log('Raw top pages data:', topPages)

      // 获取每日统计
      const { data: dailyStats, error: dailyError } = await supabase
        .from('analytics_summary')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (dailyError) {
        console.error('Error fetching daily stats:', dailyError)
        // 不返回null，继续使用其他数据
      }

      const uniqueSessionSet = new Set(uniqueSessions?.map(s => s.session_id) || [])
      const uniqueUserSet = new Set(uniqueUsers?.map(u => u.user_id) || [])

      const result = {
        totalViews: totalViews?.length || 0,
        uniqueUsers: uniqueUserSet.size,
        uniqueSessions: uniqueSessionSet.size,
        topPages: pageViews,
        dailyStats: dailyStats || [],
        period: `${days}天`
      }

      console.log('Historical stats result:', result)
      return result
    } catch (error) {
      console.error('Error fetching historical stats:', error)
      return null
    }
  }

  // 获取页面访问统计
  async getPageStats(page?: string, days: number = 7) {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      let query = supabase
        .from('analytics')
        .select('*')
        .gte('timestamp', startDate.toISOString())

      if (page) {
        query = query.eq('page', page)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching page stats:', error)
        return null
      }

      return {
        totalViews: data?.length || 0,
        uniqueSessions: new Set(data?.map(a => a.session_id) || []).size,
        uniqueUsers: new Set(data?.map(a => a.user_id) || []).size
      }
    } catch (error) {
      console.error('Error fetching page stats:', error)
      return null
    }
  }

  // 清理过期数据
  async cleanupOldData() {
    try {
      const { error } = await supabase.rpc('cleanup_old_analytics_data')
      
      if (error) {
        console.error('Error cleaning up old data:', error)
        return false
      }

      console.log('Old analytics data cleaned up successfully')
      return true
    } catch (error) {
      console.error('Error cleaning up old data:', error)
      return false
    }
  }
}

// 创建全局实例
const supabaseAnalyticsService = new SupabaseAnalyticsService()

export default supabaseAnalyticsService
