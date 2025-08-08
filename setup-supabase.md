# Supabase 快速设置指南

## 🚀 5分钟快速设置

### 1. 创建 Supabase 项目
1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub 登录
4. 创建新项目：
   - 项目名：`ryan-yang-blog`
   - 数据库密码：设置一个强密码
   - 地区：选择 `Northeast Asia (Tokyo)`

### 2. 获取 API 密钥
1. 项目创建完成后，进入 "Settings" → "API"
2. 复制以下信息：
   ```
   Project URL: https://your-project-id.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 3. 配置环境变量
在项目根目录创建 `.env.local` 文件：
```bash
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. 初始化数据库
1. 在 Supabase 控制台中，进入 "SQL Editor"
2. 复制 `supabase-setup.sql` 文件内容
3. 粘贴到 SQL Editor 并点击 "Run"

### 5. 测试连接
重启开发服务器：
```bash
npm start
```

访问 `http://localhost:3001` 查看应用是否正常工作。

## 📊 免费额度说明

Supabase 免费计划包含：
- ✅ 每月 500MB 数据库存储
- ✅ 每月 2GB 带宽
- ✅ 每月 50,000 行读取
- ✅ 每月 50,000 行写入
- ✅ 实时订阅功能
- ✅ 内置认证系统
- ✅ 自动备份

## 🔧 故障排除

### 常见问题

**1. 环境变量未生效**
```bash
# 重启开发服务器
npm start
```

**2. CORS 错误**
- 检查 Supabase 项目设置
- 确认 API 密钥正确

**3. 数据库连接失败**
- 检查网络连接
- 确认项目 URL 和密钥正确

### 获取帮助
- 📖 [Supabase 文档](https://supabase.com/docs)
- 💬 [Discord 社区](https://discord.supabase.com)
- 🐛 [GitHub Issues](https://github.com/supabase/supabase/issues)

## 🎯 下一步

1. **自定义数据**：在 Supabase 控制台中添加更多博客文章
2. **部署到 Vercel**：按照 `Supabase部署指南.md` 进行部署
3. **添加功能**：实现用户认证、实时通知等功能

---

**提示**：记得将 `.env.local` 添加到 `.gitignore` 中，避免敏感信息泄露。
