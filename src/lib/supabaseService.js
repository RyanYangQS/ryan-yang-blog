import { supabase } from './supabase.js'

// 博客文章相关操作
export const postService = {
  // 获取所有文章
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // 获取特色文章
  async getFeaturedPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(3)
    
    if (error) throw error
    return data || []
  },

  // 根据slug获取文章
  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  // 创建文章
  async createPost(post) {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 更新文章
  async updatePost(id, updates) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 删除文章
  async deletePost(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// 评论相关操作
export const commentService = {
  // 获取文章的所有评论
  async getCommentsByPostId(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  // 创建评论（需要用户登录）
  async createComment(comment) {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 删除评论
  async deleteComment(id) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// 点赞相关操作
export const likeService = {
  // 获取文章的点赞数量
  async getPostLikes(postId) {
    const { count, error } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)
    
    if (error) throw error
    return count || 0
  },

  // 检查用户是否已点赞
  async isPostLikedByUser(postId, userId) {
    const { data, error } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return !!data
  },

  // 点赞文章
  async likePost(postId, userId) {
    const { data, error } = await supabase
      .from('post_likes')
      .insert([{ post_id: postId, user_id: userId }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 取消点赞
  async unlikePost(postId, userId) {
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId)
    
    if (error) throw error
  }
}

// 用户资料相关操作
export const userService = {
  // 获取用户资料
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // 创建或更新用户资料
  async upsertUserProfile(profile) {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([profile])
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// 分析数据相关操作
export const analyticsService = {
  // 记录页面访问
  async recordPageView(page, userAgent, ipAddress) {
    const { error } = await supabase
      .from('analytics')
      .insert([{
        page,
        user_agent: userAgent,
        ip_address: ipAddress,
        timestamp: new Date().toISOString()
      }])
    
    if (error) throw error
  },

  // 获取页面访问统计
  async getPageViews(page) {
    let query = supabase
      .from('analytics')
      .select('*')
      .order('timestamp', { ascending: false })
    
    if (page) {
      query = query.eq('page', page)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  },

  // 获取访问统计摘要
  async getAnalyticsSummary() {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
    
    if (error) throw error
    
    const views = data || []
    const uniquePages = new Set(views.map(v => v.page)).size
    const recentViews = views.filter(v => {
      const viewDate = new Date(v.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return viewDate > weekAgo
    }).length
    
    return {
      totalViews: views.length,
      uniquePages,
      recentViews
    }
  }
}
