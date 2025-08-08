# Supabase 部署指南

## 1. 创建 Supabase 项目

### 1.1 注册 Supabase 账户
1. 访问 [Supabase官网](https://supabase.com)
2. 点击 "Start your project" 注册账户
3. 使用 GitHub 或邮箱注册

### 1.2 创建新项目
1. 登录后点击 "New Project"
2. 选择组织（如果没有，创建一个）
3. 填写项目信息：
   - **项目名称**: `ryan-yang-blog`
   - **数据库密码**: 设置一个强密码（请记住）
   - **地区**: 选择离您最近的地区（推荐 `Northeast Asia (Tokyo)`）
4. 点击 "Create new project"

## 2. 配置数据库

### 2.1 运行数据库初始化脚本
1. 在 Supabase 控制台中，进入 "SQL Editor"
2. 复制 `supabase-setup.sql` 文件的内容
3. 粘贴到 SQL Editor 中
4. 点击 "Run" 执行脚本

### 2.2 验证表结构
1. 进入 "Table Editor"
2. 确认以下表已创建：
   - `posts` - 博客文章表
   - `comments` - 评论表
   - `analytics` - 分析数据表

## 3. 获取 API 密钥

### 3.1 获取项目 URL 和 API 密钥
1. 在 Supabase 控制台中，进入 "Settings" → "API"
2. 复制以下信息：
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: 以 `eyJ...` 开头的长字符串

## 4. 配置环境变量

### 4.1 创建环境变量文件
在项目根目录创建 `.env.local` 文件：

```bash
# Supabase 配置
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4.2 更新 .env.example
创建 `.env.example` 文件作为模板：

```bash
# Supabase 配置
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## 5. 更新组件以使用 Supabase

### 5.1 更新 FeaturedPosts 组件
```typescript
import { useEffect, useState } from 'react'
import { postService } from '../lib/supabaseService'
import { Post } from '../lib/supabase'

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const featuredPosts = await postService.getFeaturedPosts()
        setPosts(featuredPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 5.2 更新评论组件
```typescript
import { useState, useEffect } from 'react'
import { commentService } from '../lib/supabaseService'
import { Comment } from '../lib/supabase'

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: '', content: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const fetchedComments = await commentService.getCommentsByPostId(postId)
      setComments(fetchedComments)
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await commentService.createComment({
        post_id: postId,
        author: newComment.author,
        content: newComment.content
      })
      setNewComment({ author: '', content: '' })
      fetchComments()
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">评论</h3>
      
      {/* 评论表单 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="您的姓名"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="写下您的评论..."
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          发表评论
        </button>
      </form>

      {/* 评论列表 */}
      {loading ? (
        <div>加载评论中...</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-gray-800">{comment.author}</strong>
                <span className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## 6. 部署到 Vercel

### 6.1 配置 Vercel 环境变量
1. 在 Vercel 项目设置中，进入 "Environment Variables"
2. 添加以下环境变量：
   - `REACT_APP_SUPABASE_URL`: 您的 Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY`: 您的 Supabase anon key

### 6.2 部署
1. 推送代码到 GitHub
2. 在 Vercel 中连接您的 GitHub 仓库
3. 配置构建设置：
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. 点击 "Deploy"

## 7. 测试和验证

### 7.1 本地测试
```bash
# 启动开发服务器
npm start
```

### 7.2 验证功能
1. 访问首页，确认特色文章正常显示
2. 访问博客详情页，测试评论功能
3. 检查 Supabase 控制台中的数据

## 8. 监控和维护

### 8.1 数据库监控
- 在 Supabase 控制台中监控数据库使用情况
- 查看 "Logs" 了解应用性能

### 8.2 备份策略
- Supabase 提供自动备份
- 可以设置自定义备份策略

## 9. 故障排除

### 常见问题
1. **环境变量未生效**: 重启开发服务器
2. **CORS 错误**: 检查 Supabase 项目设置
3. **权限错误**: 确认 RLS 策略配置正确

### 获取帮助
- [Supabase 文档](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 10. 成本优化

### 免费额度
- 每月 500MB 数据库存储
- 每月 2GB 带宽
- 每月 50,000 行读取
- 每月 50,000 行写入

### 升级建议
- 监控使用情况，在接近限制时考虑升级
- 使用 Supabase 的分析功能优化查询

---

**注意**: 请确保将 `.env.local` 文件添加到 `.gitignore` 中，避免敏感信息泄露。
