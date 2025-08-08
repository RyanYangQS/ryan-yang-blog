# Vercel部署指南

## 🎯 部署架构

### 技术栈
- **前端**：Next.js 14 (部署在Vercel)
- **后端**：Next.js API Routes (Serverless Functions)
- **数据库**：MongoDB Atlas (云数据库)
- **认证**：NextAuth.js
- **文件存储**：Vercel Blob Storage

## 📋 部署步骤

### 1. 数据库设置 (MongoDB Atlas)

#### 1.1 创建MongoDB Atlas账户
1. 访问 [MongoDB Atlas](https://www.mongodb.com/atlas)
2. 注册账户并创建免费集群
3. 选择云提供商和地区（推荐选择离用户最近的地区）

#### 1.2 配置数据库
```bash
# 1. 创建数据库用户
用户名: ryan-yang-blog
密码: [设置强密码]

# 2. 配置网络访问
IP地址: 0.0.0.0/0 (允许所有IP访问，生产环境建议限制)

# 3. 获取连接字符串
mongodb+srv://ryan-yang-blog:<password>@cluster0.xxxxx.mongodb.net/ryan-yang-blog?retryWrites=true&w=majority
```

#### 1.3 创建集合
在MongoDB Atlas控制台中创建以下集合：
- `posts` - 文章数据
- `comments` - 评论数据
- `analytics` - 访问统计数据
- `users` - 用户数据（NextAuth自动创建）

### 2. 项目准备

#### 2.1 安装依赖
```bash
# 确保所有依赖已安装
npm install

# 检查package.json中的scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### 2.2 环境变量配置
创建 `.env.local` 文件：
```bash
# MongoDB
MONGODB_URI=mongodb+srv://ryan-yang-blog:<password>@cluster0.xxxxx.mongodb.net/ryan-yang-blog?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth (可选)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Google OAuth (可选)
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

### 3. Vercel部署

#### 3.1 创建Vercel账户
1. 访问 [Vercel](https://vercel.com)
2. 使用GitHub账户登录
3. 导入你的GitHub仓库

#### 3.2 项目设置
```bash
# 1. 连接GitHub仓库
# 在Vercel控制台中点击"New Project"
# 选择你的GitHub仓库

# 2. 配置构建设置
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 3.3 环境变量配置
在Vercel项目设置中添加环境变量：

```bash
# 必需的环境变量
MONGODB_URI=mongodb+srv://ryan-yang-blog:<password>@cluster0.xxxxx.mongodb.net/ryan-yang-blog?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app

# 可选的环境变量
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

#### 3.4 域名配置
1. 在Vercel项目设置中添加自定义域名
2. 配置DNS记录指向Vercel
3. 更新 `NEXTAUTH_URL` 为你的域名

### 4. OAuth认证配置

#### 4.1 GitHub OAuth (推荐)
1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建新的OAuth App
3. 配置回调URL：`https://your-domain.vercel.app/api/auth/callback/github`
4. 获取Client ID和Client Secret

#### 4.2 Google OAuth (可选)
1. 访问 [Google Cloud Console](https://console.cloud.google.com)
2. 创建新项目或选择现有项目
3. 启用Google+ API
4. 创建OAuth 2.0凭据
5. 配置授权重定向URI：`https://your-domain.vercel.app/api/auth/callback/google`

### 5. 部署验证

#### 5.1 本地测试
```bash
# 启动开发服务器
npm run dev

# 测试API端点
curl http://localhost:3000/api/posts
curl http://localhost:3000/api/analytics
```

#### 5.2 生产环境测试
```bash
# 测试部署的API
curl https://your-domain.vercel.app/api/posts
curl https://your-domain.vercel.app/api/analytics
```

### 6. 监控和日志

#### 6.1 Vercel监控
- 访问Vercel控制台查看部署状态
- 监控函数执行时间和错误
- 查看访问统计和性能指标

#### 6.2 MongoDB监控
- 在MongoDB Atlas控制台查看数据库性能
- 监控连接数和查询性能
- 设置告警规则

## 🔧 故障排除

### 常见问题

#### 1. 数据库连接失败
```bash
# 检查MONGODB_URI格式
# 确保网络访问配置正确
# 验证用户名和密码
```

#### 2. API路由404错误
```bash
# 检查文件路径是否正确
# 确保API文件在正确位置
# 验证导出格式
```

#### 3. 环境变量未生效
```bash
# 重新部署项目
# 检查环境变量名称
# 验证变量值格式
```

#### 4. 认证问题
```bash
# 检查OAuth配置
# 验证回调URL
# 确保NEXTAUTH_URL正确
```

## 📊 性能优化

### 1. 数据库优化
```javascript
// 添加索引
db.posts.createIndex({ "slug": 1 })
db.comments.createIndex({ "postId": 1 })
db.analytics.createIndex({ "createdAt": -1 })
```

### 2. API优化
```typescript
// 添加缓存
export async function GET(request: NextRequest) {
  const cacheKey = `posts:${page}:${limit}`
  const cached = await redis.get(cacheKey)
  if (cached) {
    return NextResponse.json(JSON.parse(cached))
  }
  // ... 获取数据
  await redis.setex(cacheKey, 300, JSON.stringify(data))
}
```

### 3. 前端优化
```typescript
// 使用SWR进行数据获取
const { data, error } = useSWR('/api/posts', fetcher)

// 图片优化
import Image from 'next/image'
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
```

## 💰 成本估算

### 免费套餐限制
- **Vercel**: 100GB带宽/月，Serverless Functions 100小时/月
- **MongoDB Atlas**: 512MB存储，共享集群
- **NextAuth**: 免费

### 升级建议
- **Vercel Pro**: $20/月，无限带宽和函数执行时间
- **MongoDB Atlas**: $9/月，2GB存储，专用集群
- **自定义域名**: $12/年

## 🎉 部署完成检查清单

- [ ] MongoDB Atlas集群创建并配置
- [ ] 环境变量在Vercel中正确设置
- [ ] OAuth应用配置完成
- [ ] 自定义域名配置
- [ ] API端点测试通过
- [ ] 数据库连接正常
- [ ] 认证功能工作
- [ ] 评论系统正常
- [ ] 访问统计记录
- [ ] 性能监控设置

## 📞 技术支持

如果遇到问题，可以：
1. 查看Vercel部署日志
2. 检查MongoDB Atlas连接状态
3. 查看NextAuth.js文档
4. 在GitHub Issues中提问

部署完成后，你的博客将具备完整的后端功能，包括评论、统计、用户认证等！
