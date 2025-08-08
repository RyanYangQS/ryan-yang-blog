import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
}
