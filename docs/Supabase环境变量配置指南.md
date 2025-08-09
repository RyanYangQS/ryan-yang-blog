# Supabase 环境变量配置指南

## 🚨 问题描述

访问统计每次更新代码都从1开始，这是因为 Supabase 环境变量没有正确配置，导致统计功能无法正常工作。

## 🔍 问题根源

### 1. 环境变量缺失
- `REACT_APP_SUPABASE_URL` 已配置
- `REACT_APP_SUPABASE_ANON_KEY` 未配置
- 导致 Supabase 连接失败

### 2. 当前配置状态
```bash
# 已配置
REACT_APP_SUPABASE_URL=https://kiykximyydhhwnrjqamd.supabase.co

# 未配置
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## ✅ 解决方案

### 步骤 1：获取 Supabase Anon Key

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目：`kiykximyydhhwnrjqamd`
3. 进入 **Settings** → **API**
4. 复制 **anon public key**

### 步骤 2：本地环境变量配置

创建或更新 `.env.local` 文件：

```env
REACT_APP_SUPABASE_URL=https://kiykximyydhhwnrjqamd.supabase.co
REACT_APP_SUPABASE_ANON_KEY=你的真实anon-key
```

### 步骤 3：Vercel 环境变量配置

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目 `ryan-yang-blog`
3. 进入 **Settings** → **Environment Variables**
4. 添加以下环境变量：

```env
# 变量名
REACT_APP_SUPABASE_URL

# 变量值
https://kiykximyydhhwnrjqamd.supabase.co

# 环境
Production, Preview, Development
```

```env
# 变量名
REACT_APP_SUPABASE_ANON_KEY

# 变量值
你的真实anon-key

# 环境
Production, Preview, Development
```

### 步骤 4：重新部署

1. 在 Vercel Dashboard 中点击 **Deployments**
2. 找到最新的部署
3. 点击 **Redeploy** 按钮
4. 等待部署完成

## 🔧 验证配置

### 1. 本地测试
```bash
# 启动开发服务器
npm start

# 检查控制台输出
# 应该看到 Supabase 连接成功的信息
```

### 2. 功能测试
- 访问统计页面
- 检查数据是否正常显示
- 测试评论功能
- 验证用户认证

### 3. 部署验证
- 访问部署的网站
- 检查统计功能
- 确认数据持久化

## 📊 预期效果

### 配置前
- ❌ 访问统计显示 "1"
- ❌ 评论功能异常
- ❌ 用户认证失败
- ❌ 数据不持久化

### 配置后
- ✅ 访问统计正常显示
- ✅ 评论功能正常工作
- ✅ 用户认证可用
- ✅ 数据持久化存储

## 🚨 常见问题

### 1. 环境变量不生效
**解决方案**：
- 确保变量名正确（以 `REACT_APP_` 开头）
- 重新部署项目
- 清除浏览器缓存

### 2. Supabase 连接失败
**解决方案**：
- 检查 URL 和 Key 是否正确
- 确认 Supabase 项目状态
- 验证网络连接

### 3. 数据仍然显示为1
**解决方案**：
- 检查 Supabase 数据库是否有数据
- 验证 API 权限设置
- 查看浏览器控制台错误

## 📈 监控和维护

### 1. Supabase 监控
- 定期检查 Supabase 控制台
- 监控数据库使用量
- 查看 API 调用统计

### 2. 错误监控
- 定期检查 Vercel 部署日志
- 监控应用性能
- 设置错误告警

### 3. 数据备份
- 定期备份 Supabase 数据
- 监控存储空间使用
- 检查数据完整性

## 🎯 最佳实践

### 1. 环境变量管理
- 使用 `.env.local` 进行本地开发
- 在 Vercel 中正确配置生产环境变量
- 定期检查环境变量配置

### 2. 安全考虑
- 不要将 anon key 提交到代码仓库
- 定期轮换 API 密钥
- 监控异常访问

### 3. 性能优化
- 使用 Supabase 缓存功能
- 优化查询性能
- 实现数据分页

## 📞 技术支持

如果问题仍然存在：

1. **检查 Supabase 项目状态**
2. **验证环境变量配置**
3. **查看浏览器控制台错误**
4. **联系技术支持**

---

*配置时间：2025-01-08*
*配置人员：杨青松*
*状态：等待 anon key 配置*
