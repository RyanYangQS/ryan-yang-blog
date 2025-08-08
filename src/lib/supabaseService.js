import { supabase, isSupabaseAvailable } from './supabase.js'

// 博客文章相关操作
export const postService = {
  // 获取所有文章
  async getAllPosts() {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning empty posts array')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching posts:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  },

  // 获取特色文章
  async getFeaturedPosts() {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning empty featured posts array')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(3)
      
      if (error) {
        console.error('Error fetching featured posts:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      return []
    }
  },

  // 根据slug获取文章
  async getPostBySlug(slug) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning null for post')
      return null
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) {
        console.error('Error fetching post by slug:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching post by slug:', error)
      return null
    }
  },

  // 创建文章
  async createPost(post) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot create post')
      throw new Error('Supabase not available')
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  },

  // 更新文章
  async updatePost(id, updates) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot update post')
      throw new Error('Supabase not available')
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating post:', error)
      throw error
    }
  },

  // 删除文章
  async deletePost(id) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot delete post')
      throw new Error('Supabase not available')
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  }
}

// 评论相关操作
export const commentService = {
  // 获取文章的所有评论
  async getCommentsByPostId(postId) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning empty comments array')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('Error fetching comments:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching comments:', error)
      return []
    }
  },

  // 创建评论（需要用户登录）
  async createComment(comment) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot create comment')
      throw new Error('Supabase not available')
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([comment])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  },

  // 删除评论
  async deleteComment(id) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot delete comment')
      throw new Error('Supabase not available')
    }

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  }
}

// 点赞相关操作
export const likeService = {
  // 获取文章的点赞数量
  async getPostLikes(postId) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning 0 likes')
      return 0
    }

    try {
      const { count, error } = await supabase
        .from('post_likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId)
      
      if (error) {
        console.error('Error fetching post likes:', error)
        return 0
      }
      return count || 0
    } catch (error) {
      console.error('Error fetching post likes:', error)
      return 0
    }
  },

  // 检查用户是否已点赞
  async isPostLikedByUser(postId, userId) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning false for like status')
      return false
    }

    try {
      const { data, error } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single()
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking like status:', error)
        return false
      }
      return !!data
    } catch (error) {
      console.error('Error checking like status:', error)
      return false
    }
  },

  // 点赞文章
  async likePost(postId, userId) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot like post')
      throw new Error('Supabase not available')
    }

    try {
      const { data, error } = await supabase
        .from('post_likes')
        .insert([{ post_id: postId, user_id: userId }])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error liking post:', error)
      throw error
    }
  },

  // 取消点赞
  async unlikePost(postId, userId) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot unlike post')
      throw new Error('Supabase not available')
    }

    try {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId)
      
      if (error) throw error
    } catch (error) {
      console.error('Error unliking post:', error)
      throw error
    }
  }
}

// 用户资料相关操作
export const userService = {
  // 获取用户资料
  async getUserProfile(userId) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning null for user profile')
      return null
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  },

  // 创建或更新用户资料
  async upsertUserProfile(profile) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, cannot upsert user profile')
      throw new Error('Supabase not available')
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert([profile])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error upserting user profile:', error)
      throw error
    }
  }
}

// 分析数据相关操作
export const analyticsService = {
  // 记录页面访问
  async recordPageView(page, userAgent, ipAddress) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, skipping page view recording')
      return
    }

    try {
      const { error } = await supabase
        .from('analytics')
        .insert([{
          page,
          user_agent: userAgent,
          ip_address: ipAddress,
          timestamp: new Date().toISOString()
        }])
      
      if (error) {
        console.error('Error recording page view:', error)
      }
    } catch (error) {
      console.error('Error recording page view:', error)
    }
  },

  // 获取页面访问统计
  async getPageViews(page) {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning empty page views array')
      return []
    }

    try {
      let query = supabase
        .from('analytics')
        .select('*')
        .order('timestamp', { ascending: false })
      
      if (page) {
        query = query.eq('page', page)
      }
      
      const { data, error } = await query
      
      if (error) {
        console.error('Error fetching page views:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching page views:', error)
      return []
    }
  },

  // 获取访问统计摘要
  async getAnalyticsSummary() {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available, returning default analytics summary')
      return {
        totalViews: 0,
        uniquePages: 0,
        recentViews: 0
      }
    }

    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
      
      if (error) {
        console.error('Error fetching analytics summary:', error)
        return {
          totalViews: 0,
          uniquePages: 0,
          recentViews: 0
        }
      }
      
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
    } catch (error) {
      console.error('Error fetching analytics summary:', error)
      return {
        totalViews: 0,
        uniquePages: 0,
        recentViews: 0
      }
    }
  }
}
