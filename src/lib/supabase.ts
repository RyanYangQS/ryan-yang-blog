import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// 检查环境变量，但不抛出错误
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Some features may not work properly.')
  console.warn('Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY')
}

// 创建 Supabase 客户端，即使环境变量缺失也创建
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// 检查 Supabase 连接是否可用
export const isSupabaseAvailable = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

// 类型定义
export interface Comment {
  id: string
  post_id: string
  author: string
  content: string
  created_at: string
  user_id?: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  published_at: string
  created_at: string
  updated_at: string
  tags: string[]
  featured: boolean
}

export interface UserProfile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface PostLike {
  id: string
  post_id: string
  user_id: string
  created_at: string
}

export interface Analytics {
  id: string
  page: string
  timestamp: string
  user_agent?: string
  ip_address?: string
  session_id?: string
  user_id?: string
  url?: string
  referrer?: string
  screen_size?: string
  viewport_size?: string
  language?: string
  timezone?: string
}

export interface UserSession {
  id: string
  session_id: string
  user_id?: string
  user_agent?: string
  ip_address?: string
  last_activity: string
  created_at: string
  updated_at: string
}

export interface UserEvent {
  id: string
  session_id: string
  user_id?: string
  action: string
  page?: string
  data?: any
  timestamp: string
}

export interface HeartbeatLog {
  id: string
  session_id: string
  user_id?: string
  last_activity: string
  user_agent?: string
  ip_address?: string
  timestamp: string
}

export interface AnalyticsSummary {
  total_views: number
  unique_sessions: number
  unique_users: number
  date: string
  page: string
  page_views: number
}

export interface RealtimeStats {
  online_users: number
  today_views: number
  today_users: number
  total_views?: number
}
