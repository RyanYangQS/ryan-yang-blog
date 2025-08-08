# Next.js迁移指南

## 🎯 推荐方案：Next.js SSR

基于你的需求（评论、点赞、访客统计、SEO优化），推荐使用 **Next.js SSR** 方案。

## 🏗️ 架构设计

### 技术栈
- **前端**：Next.js 14 (App Router)
- **后端**：Next.js API Routes
- **数据库**：MongoDB Atlas
- **认证**：NextAuth.js
- **状态管理**：SWR
- **UI**：Tailwind CSS + Framer Motion

### 优势
- ✅ 优秀的SEO支持
- ✅ 服务端渲染
- ✅ 内置API路由
- ✅ 自动优化
- ✅ 开发体验好

## 📋 迁移步骤

### 1. 创建Next.js项目
```bash
npx create-next-app@latest ryan-yang-blog-next --typescript --tailwind --app
cd ryan-yang-blog-next
npm install framer-motion lucide-react chart.js react-chartjs-2 next-auth @next-auth/mongodb-adapter mongodb swr
```

### 2. 项目结构
```
src/
├── app/
│   ├── page.tsx                    # 首页
│   ├── blog/
│   │   ├── page.tsx               # 博客列表
│   │   └── [slug]/page.tsx        # 博客详情
│   ├── skills/page.tsx             # 技能页面
│   ├── resume/page.tsx             # 简历页面
│   └── api/                        # API路由
│       ├── posts/route.ts          # 文章API
│       ├── comments/route.ts       # 评论API
│       ├── analytics/route.ts      # 统计API
│       └── auth/[...nextauth]/route.ts # 认证API
├── components/                      # 组件
├── lib/                            # 工具函数
├── models/                         # 数据模型
└── types/                          # TypeScript类型
```

### 3. 数据库设计

#### MongoDB集合
```javascript
// 文章集合
posts: {
  _id: ObjectId,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  author: ObjectId,
  tags: [String],
  status: String, // draft, published
  viewCount: Number,
  likeCount: Number,
  commentCount: Number,
  createdAt: Date,
  updatedAt: Date
}

// 评论集合
comments: {
  _id: ObjectId,
  postId: ObjectId,
  author: {
    name: String,
    email: String,
    avatar: String
  },
  content: String,
  parentId: ObjectId, // 回复功能
  likeCount: Number,
  isApproved: Boolean,
  createdAt: Date
}

// 访问统计集合
analytics: {
  _id: ObjectId,
  page: String,
  url: String,
  userAgent: String,
  sessionId: String,
  timestamp: Date
}
```

### 4. API路由实现

#### 文章API
```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'

export async function GET(request: NextRequest) {
  await dbConnect()
  const posts = await Post.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .populate('author', 'name avatar')
  return NextResponse.json(posts)
}
```

#### 评论API
```typescript
// app/api/posts/[slug]/comments/route.ts
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect()
  const body = await request.json()
  const comment = await Comment.create({
    postId: post._id,
    author: body.author,
    content: body.content
  })
  return NextResponse.json(comment, { status: 201 })
}
```

#### 统计API
```typescript
// app/api/analytics/route.ts
export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  const analytics = await Analytics.create(body)
  return NextResponse.json(analytics, { status: 201 })
}
```

### 5. 前端组件

#### 评论组件
```typescript
// components/CommentSection.tsx
'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const { data: session } = useSession()
  const { data: comments, mutate } = useSWR(`/api/posts/${postSlug}/comments`)
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    await fetch(`/api/posts/${postSlug}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content: comment })
    })
    mutate()
    setComment('')
  }

  return (
    <div>
      {/* 评论表单 */}
      {/* 评论列表 */}
    </div>
  )
}
```

#### 统计组件
```typescript
// components/Analytics.tsx
'use client'
import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        page: window.location.pathname,
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    })
  }, [])
  return null
}
```

### 6. 认证系统

#### NextAuth配置
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
```

### 7. 环境变量
```bash
# .env.local
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

### 8. Vercel部署
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

## 📈 实施计划

### 第一阶段（2-3周）：基础迁移
1. 创建Next.js项目
2. 迁移现有组件
3. 设置路由结构
4. 配置数据库连接

### 第二阶段（3-4周）：后端功能
1. 实现API路由
2. 添加评论系统
3. 集成访客统计
4. 设置用户认证

### 第三阶段（2-3周）：优化完善
1. SEO优化
2. 性能优化
3. 错误处理
4. 测试部署

## 🎉 优势总结

1. **SEO友好**：服务端渲染，搜索引擎友好
2. **性能优秀**：自动优化，更好的用户体验
3. **开发效率**：内置功能丰富，开发体验好
4. **扩展性强**：适合复杂业务需求
5. **部署简单**：继续使用Vercel，配置简单

这个方案能够满足你的所有需求：评论系统、点赞功能、访客统计、SEO优化，同时保持良好的性能和用户体验。
