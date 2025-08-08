# Next.js迁移实施指南

## 🚀 第一阶段：项目迁移

### 1. 创建Next.js项目

```bash
# 创建新的Next.js项目
npx create-next-app@latest ryan-yang-blog-next --typescript --tailwind --app --src-dir --import-alias "@/*"

# 进入项目目录
cd ryan-yang-blog-next

# 安装额外依赖
npm install framer-motion lucide-react chart.js react-chartjs-2 gray-matter react-markdown react-syntax-highlighter rehype-highlight remark-gfm next-auth @next-auth/mongodb-adapter mongodb swr
```

### 2. 项目结构迁移

#### 目录结构
```
ryan-yang-blog-next/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 首页
│   │   ├── blog/
│   │   │   ├── page.tsx               # 博客列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # 博客详情
│   │   ├── skills/
│   │   │   └── page.tsx               # 技能页面
│   │   ├── resume/
│   │   │   └── page.tsx               # 简历页面
│   │   ├── navigation/
│   │   │   └── page.tsx               # 前端导航页面
│   │   └── api/                       # API路由
│   │       ├── posts/
│   │       │   ├── route.ts
│   │       │   └── [slug]/
│   │       │       └── route.ts
│   │       ├── comments/
│   │       │   └── route.ts
│   │       ├── analytics/
│   │       │   └── route.ts
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts
│   ├── components/                     # 组件
│   ├── lib/                           # 工具函数
│   ├── types/                         # TypeScript类型
│   └── content/                       # 内容文件
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
└── .env.local
```

### 3. 配置文件设置

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
}

module.exports = nextConfig
```

#### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-900': '#0a0a0a',
        'dark-800': '#1a1a1a',
        'dark-700': '#2a2a2a',
        'dark-600': '#3a3a3a',
        'primary-500': '#3b82f6',
        'primary-600': '#2563eb',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}
```

### 4. 组件迁移

#### 迁移现有组件
```bash
# 复制现有组件到新项目
cp -r ../RyanYangQS/src/components/* src/components/
cp -r ../RyanYangQS/src/content/* src/content/
```

#### 更新组件导入
```typescript
// 更新所有组件中的导入路径
// 从: import { motion } from 'framer-motion';
// 到: import { motion } from 'framer-motion';

// 更新路由相关
// 从: import { Link } from 'react-router-dom';
// 到: import Link from 'next/link';
```

### 5. 路由迁移

#### 首页 (src/app/page.tsx)
```typescript
import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import FeaturedPosts from '@/components/FeaturedPosts'
import SkillsOverview from '@/components/SkillsOverview'
import FrontendNavigationPreview from '@/components/FrontendNavigationPreview'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <FrontendNavigationPreview />
        <StatsSection />
        <FeaturedPosts />
        <SkillsOverview />
      </Suspense>
    </div>
  )
}
```

#### 博客页面 (src/app/blog/page.tsx)
```typescript
import { Suspense } from 'react'
import BlogList from '@/components/BlogList'

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogList />
      </Suspense>
    </div>
  )
}
```

#### 博客详情页面 (src/app/blog/[slug]/page.tsx)
```typescript
import { Suspense } from 'react'
import BlogDetail from '@/components/BlogDetail'
import { notFound } from 'next/navigation'

interface BlogPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  try {
    return (
      <div className="min-h-screen pt-20">
        <Suspense fallback={<div>Loading...</div>}>
          <BlogDetail slug={params.slug} />
        </Suspense>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
```

## 🗄️ 第二阶段：数据库集成

### 1. MongoDB设置

#### 安装MongoDB依赖
```bash
npm install mongodb mongoose
```

#### 数据库连接 (src/lib/mongodb.ts)
```typescript
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
```

#### 数据模型定义

##### 文章模型 (src/models/Post.ts)
```typescript
import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  publishedAt: {
    type: Date,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
```

##### 评论模型 (src/models/Comment.ts)
```typescript
import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  content: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
```

##### 用户模型 (src/models/User.ts)
```typescript
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, {
  timestamps: true,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
```

##### 统计模型 (src/models/Analytics.ts)
```typescript
import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  ip: {
    type: String,
  },
  referrer: {
    type: String,
  },
  sessionId: {
    type: String,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema)
```

### 2. API路由实现

#### 文章API (src/app/api/posts/route.ts)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'published'
    
    const skip = (page - 1) * limit
    
    const posts = await Post.find({ status })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar')
    
    const total = await Post.countDocuments({ status })
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { title, slug, content, excerpt, tags, author } = body
    
    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      tags,
      author,
      status: 'draft',
    })
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
```

#### 文章详情API (src/app/api/posts/[slug]/route.ts)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: PostPageProps
) {
  try {
    await dbConnect()
    
    const post = await Post.findOne({ 
      slug: params.slug,
      status: 'published'
    }).populate('author', 'name avatar')
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // 增加访问量
    await Post.findByIdAndUpdate(post._id, {
      $inc: { viewCount: 1 }
    })
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}
```

#### 评论API (src/app/api/posts/[slug]/comments/route.ts)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Comment from '@/models/Comment'
import Post from '@/models/Post'

interface CommentPageProps {
  params: {
    slug: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: CommentPageProps
) {
  try {
    await dbConnect()
    
    const post = await Post.findOne({ slug: params.slug })
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    const comments = await Comment.find({
      postId: post._id,
      isApproved: true,
    }).sort({ createdAt: -1 })
    
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: CommentPageProps
) {
  try {
    await dbConnect()
    
    const post = await Post.findOne({ slug: params.slug })
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    const body = await request.json()
    const { author, content, parentId } = body
    
    const comment = await Comment.create({
      postId: post._id,
      author,
      content,
      parentId,
    })
    
    // 更新文章评论数
    await Post.findByIdAndUpdate(post._id, {
      $inc: { commentCount: 1 }
    })
    
    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
```

#### 统计API (src/app/api/analytics/route.ts)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Analytics from '@/models/Analytics'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { page, url, userAgent, referrer, sessionId } = body
    
    const analytics = await Analytics.create({
      page,
      url,
      userAgent,
      referrer,
      sessionId,
    })
    
    return NextResponse.json(analytics, { status: 201 })
  } catch (error) {
    console.error('Error creating analytics:', error)
    return NextResponse.json(
      { error: 'Failed to create analytics' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const days = parseInt(searchParams.get('days') || '7')
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const query: any = {
      createdAt: { $gte: startDate }
    }
    
    if (page) {
      query.page = page
    }
    
    const analytics = await Analytics.find(query)
    
    const stats = {
      totalViews: analytics.length,
      uniqueSessions: new Set(analytics.map(a => a.sessionId)).size,
      topPages: analytics.reduce((acc, curr) => {
        acc[curr.page] = (acc[curr.page] || 0) + 1
        return acc
      }, {}),
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
```

## 🔐 第三阶段：认证系统

### 1. NextAuth.js设置

#### 安装依赖
```bash
npm install next-auth @next-auth/mongodb-adapter
```

#### 认证配置 (src/app/api/auth/[...nextauth]/route.ts)
```typescript
import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
})

export { handler as GET, handler as POST }
```

#### MongoDB适配器 (src/lib/mongodb-adapter.ts)
```typescript
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
```

### 2. 认证组件

#### 登录组件 (src/components/Auth/LoginButton.tsx)
```typescript
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-300">
          {session.user?.name}
        </span>
        <Button
          onClick={() => signOut()}
          variant="outline"
          size="sm"
        >
          退出
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => signIn()}
      variant="outline"
      size="sm"
    >
      登录
    </Button>
  )
}
```

#### 会话提供者 (src/app/providers.tsx)
```typescript
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```

#### 根布局更新 (src/app/layout.tsx)
```typescript
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
```

## 📊 第四阶段：前端组件

### 1. 评论组件

#### 评论区域 (src/components/CommentSection.tsx)
```typescript
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'

interface Comment {
  _id: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  content: string
  createdAt: string
  likeCount: number
}

interface CommentSectionProps {
  postSlug: string
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() || !session) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          author: {
            name: session.user?.name,
            email: session.user?.email,
            avatar: session.user?.image,
          },
        }),
      })

      if (response.ok) {
        const newComment = await response.json()
        setComments([newComment, ...comments])
        setComment('')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-6 h-6 text-primary-400" />
        <h3 className="text-2xl font-bold text-white">评论</h3>
      </div>

      {session ? (
        <motion.form
          onSubmit={handleSubmit}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex space-x-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="写下你的评论..."
              className="flex-1 p-4 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="px-6 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.form>
      ) : (
        <div className="mb-8 p-6 bg-dark-800 rounded-lg text-center">
          <p className="text-gray-300 mb-4">请登录后发表评论</p>
          <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors duration-200">
            登录
          </button>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-dark-800 rounded-lg border border-dark-600"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {comment.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-white">
                    {comment.author.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

### 2. 统计组件

#### 访问统计 (src/components/Analytics.tsx)
```typescript
'use client'

import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
            url: window.location.href,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            sessionId: getSessionId(),
          }),
        })
      } catch (error) {
        console.error('Error tracking page view:', error)
      }
    }

    trackPageView()
  }, [])

  return null
}

function getSessionId(): string {
  let sessionId = localStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15)
    localStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}
```

## 🚀 部署配置

### 1. 环境变量 (.env.local)
```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ryan-yang-blog?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Google OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

### 2. Vercel部署配置 (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "NEXTAUTH_URL": "https://your-domain.vercel.app",
    "GITHUB_ID": "@github-id",
    "GITHUB_SECRET": "@github-secret",
    "GOOGLE_ID": "@google-id",
    "GOOGLE_SECRET": "@google-secret"
  }
}
```

## 📈 性能优化

### 1. 图片优化
```typescript
import Image from 'next/image'

// 使用Next.js的Image组件
<Image
  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  alt="Hero Image"
  width={1000}
  height={600}
  priority
  className="rounded-lg"
/>
```

### 2. 数据获取优化
```typescript
// 使用SWR进行数据获取
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function BlogList() {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading posts</div>

  return (
    <div>
      {data?.posts.map(post => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  )
}
```

## 🎉 总结

通过这个详细的迁移指南，你可以：

1. **保持现有功能**：所有现有的UI和功能都会保留
2. **添加后端功能**：评论、统计、用户认证
3. **提升SEO**：服务端渲染，更好的搜索引擎友好性
4. **优化性能**：自动代码分割、图片优化、缓存
5. **简化部署**：继续使用Vercel，配置简单

这个方案既满足了你的功能需求，又保持了良好的开发体验和性能表现。
